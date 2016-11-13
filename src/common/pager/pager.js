import './pager.css';
import pagerTmpl from './pager.html';
import miniPagerTmpl from './miniPager.html';
import tinyPagerTmpl from './tinyPager.html';

export default app => {
  app.directive('snPager', [ '$compile', function ($compile) {
    const REGEX = /\{page\}/g;
    const TYPE_DEFAULT = 'default',
          TYPE_MINI = 'mini',
          TYPE_TINY = 'tiny';
    // 默认分页配置项
    const DEFAULTS_DEFAULT = {
      'endPoint': 1, // 列表两端页码个数,仅支持1-3
      'maxVisible': 5, //最多显示页码个数, 须满足maxVisible >= (3 + 2 * endPoint) && maxVisible <= 20
      'showPrevNext': true,
      'showGoToPage': true,
      'hideIfEmpty': true,
      // 文字
      'textDots': '...',
      'textPrev': '上一页',
      'textNext': '下一页',
      'textTotalPages': '共{page}页', //{page}为占位符，代表总页数位置
      'textGoToPage': '，到第{page}页', // {page}为占位符，代表跳转页输入框位置
      'textGoToPageBtn': '确定',
      // 可以使用字体图标代替文字，一旦设置字体图标,将覆盖文字
      'textDotsClass': '',
      'textPrevClass': '',
      'textNextClass': '',
      'textGoToPageBtnClass': '',

      'ulClass': 'sn-pagination',
      'dotsClass': 'dots', //省略号的表现样式可能稍有不同，所以可以通过自定义样式来修改
      'infoClass': 'sn-pagination-info',
      'btnClass': 'btn btn-default',
      'disabledClass': 'disabled',
      'activeClass': 'active'
    };
    //小分页默认配置项
    const DEFAULTS_MINI = {
      'endPoint': 1,
      'maxVisible': 5,
      'hideIfEmpty': true,
      // 文字
      'textDots': '...',
      'textPrev': '上一页',
      'textNext': '下一页',
      'textPage': '第{page}页',
      // 可以使用字体图标代替文字，一旦设置字体图标,将覆盖文字
      'textDotsClass': '',
      'textPrevClass': '',
      'textNextClass': '',

      'ulClass': 'sn-pagination',
      'disabledClass': 'disabled',
      'activeClass': 'active'
    };
    //极简分页默认配置项
    const DEFAULTS_TINY = {
      'hideIfEmpty': true,
      // 文字
      'textPrev': '上一页',
      'textNext': '下一页',
      // 可以使用字体图标代替文字，一旦设置字体图标,将覆盖文字
      'textPrevClass': '',
      'textNextClass': '',

      'ulClass': 'sn-pagination',
      'disabledClass': 'disabled',
      'activeClass': 'active'
    }
    return {
      restrict: 'EA',
      scope: {
        page: '=',  //当前页码
        pageSize: '=', //每页显示条目数
        total: '=', //总条目数
        pagerType: '@', //分页组件类型
        settings: '=', // 其他配置
        pagingAction: '&'  //分页动作
      },
      // template: pagerTmpl,
      link: function (scope, element, attrs) {
        init(scope, element);

        scope.$watchCollection('[page,pageSize,total]', function (newVals, oldVals, scope) {
            renderPager(scope);

        });
      }
    };


    function init(scope, element) {
      let pagerType = (scope.pagerType || TYPE_DEFAULT).toLowerCase();
      let template;
      let defaults = null;

      switch (pagerType) {
        case TYPE_MINI:
          template = miniPagerTmpl;
          defaults = DEFAULTS_MINI;
          break;
        case TYPE_TINY:
          template = tinyPagerTmpl;
          defaults = DEFAULTS_TINY;
          break;
        case TYPE_DEFAULT:
        default:
          pagerType = TYPE_DEFAULT;
          template = pagerTmpl;
          defaults = DEFAULTS_DEFAULT;
      }

      scope.pagerType = pagerType;
      template = angular.element(template);

      element.append(template);
      $compile(template)(scope);


      // 配置项尽量丢在options下面，不要污染scope
      scope.options = angular.extend({}, defaults, scope.settings);

      setScopeValue(scope);
    }

    function setScopeValue(scope) {
      let {pagerType, options} = scope;

      options.endPoint = parseInt(options.endPoint, 10) || 1;
      options.maxVisible = parseInt(options.maxVisible, 10) || 5;

      //页码列表两端页码数只能取[1, 2, 3]中的值
      if (options.endPoint < 1) {
        options.endPoint = 1;
      } else if (options.endPoint > 3) {
        options.endPoint = 3;
      }
      // maxVisible不小于 (2*endPoint + 3)，且不超过20(人为限制)
      if (options.maxVisible < 2 * options.endPoint + 3) {
        options.maxVisible = 2 * options.endPoint + 3;
      } else if (options.maxVisible > 20) {
        options.maxVisible = 20;
      }

      if (pagerType === TYPE_DEFAULT) {
        // 用于存储分隔字符串结果，便于国际化
        let textGoToPageArr;

        //跳页按钮如果设置了字体图标，则覆盖文字
        options.textGoToPageBtn = options.textGoToPageBtnClass ? '' : options.textGoToPageBtn;
        // 跳页按钮可能设置了字体图标，所以需要将显示样式和字体图标样式合并用于最终效果呈现
        options.btnClass = options.btnClass + ' ' + options.textGoToPageBtnClass;
        // 跳转到第几页文本处理，便于国际化
        if (!angular.isString(options.textGoToPage)) {
          options.textGoToPage = '';
        }
        textGoToPageArr = options.textGoToPage.split(REGEX);
        scope.textGoToPageLeft = textGoToPageArr[0];
        scope.textGoToPageRight = textGoToPageArr.length > 1 ? textGoToPageArr[1] : '';

        if (!angular.isString(options.textTotalPages)) {
          options.textTotalPages = '';
        }

        // 跳页
        scope.goToPage = function() {
          validateTargetPage(scope);
          internalAction(scope, scope.targetPage);
        };
      } else if (pagerType == TYPE_MINI) {
        if (!angular.isString(options.textPage)) {
          options.textPage = '';
        }
      }

      // 上一页
      scope.prevPage = function() {
        if (scope.page > 1) {
          internalAction(scope, scope.page - 1);
        }
      };
      // 下一页
      scope.nextPage = function() {
        if (scope.page < scope.totalPages) {
          internalAction(scope, scope.page + 1);
        }
      };
      // 选择页
      scope.selectPage = function(page) {
        if (angular.isNumber(page)) {
          internalAction(scope, page);
        }
      };
    }

    function validateScope(scope) {
      let {pagerType, options} = scope;
      // 清空
      scope.list = [];
      scope.prev = null;
      scope.next = null;
      scope.current = null;

      scope.page = parseInt(scope.page, 10) || 1;
      scope.total = parseInt(scope.total, 10) || 0;
      scope.pageSize = parseInt(scope.pageSize, 10) || 10;

      //计算总页数
      scope.totalPages = Math.ceil(scope.total / scope.pageSize) || 1;

      //当前页不得超过总页数
      if (scope.page > scope.totalPages) {
        scope.page = scope.totalPages;
      } else if (scope.page < 1) {
        scope.page = 1;
      }

      scope.hidePager = options.hideIfEmpty && scope.total == 0;

      if (pagerType === TYPE_DEFAULT) {
        //跳转目标页为当前页+1,或最后一页
        scope.targetPage = scope.page == scope.totalPages ? scope.totalPages : scope.page + 1;
        scope.hideGoToPage = !options.showGoToPage || options.maxVisible >= scope.totalPages;
        scope.textTotalPages = options.textTotalPages.replace(REGEX, scope.totalPages);
      }
    }

    function addRange(start, end, scope) {
      let {pagerType, options} = scope;

      for (let i = start; i <= end; i++) {
        let item = {
          value: i,
          text: options.textPage ? options.textPage.replace(REGEX, i) : i,
          liClass: scope.page == i ? options.activeClass : ''
        };

        // 小分页当前页不显示
        if (pagerType !== TYPE_MINI || scope.page != i) {
          scope.list.push(item);
        }
        if (scope.page == i) {
          scope.current = item;
        }
      }
    }

    function addDots(scope) {
      let options = scope.options;
      scope.list.push({
        text: options.textDotsClass ? '' : options.textDots,
        liClass: options.dotsClass,
        aClass: options.textDotsClass
      });
    }

    function addBeginning(scope, next) {
      addRange(1, scope.options.endPoint, scope);

      // We ignore dots if the next value is 2
      // ie: 1 [...] 2 3 4 5 becomes just 1 2 3 4 5
      if (next != scope.options.endPoint + 1) {
          addDots(scope);
      }
    }

    function addEnd(scope, prev) {
      // We ignore dots if the previous value is one less that our start range
      // ie: 1 2 3 4 5 [...] 6  becomes just 1 2 3 4 5 6
      if (prev != scope.totalPages - scope.options.endPoint) {
        addDots(scope);
      }

      addRange(scope.totalPages - scope.options.endPoint + 1, scope.totalPages, scope);
    }

    function addPrevNext(scope) {
      let {pagerType, options} = scope;
      // 默认类型分页，上下页只有在总页码数超过最大显示页码数,且配置项showPrevNext为true时才显示
      // 小分页，上下页只要总页码数超过1就显示
      // 极简分页，上下页始终显示
      if (pagerType === TYPE_DEFAULT && (!options.showPrevNext || options.maxVisible >= scope.totalPages)) {
        return;
      }

      if (pagerType === TYPE_MINI && scope.totalPages <= 1) {
        return;
      }

      let disabled;

      // add prev
      disabled = scope.page == 1;

      scope.prev = {
        value: disabled ? 1 : scope.page - 1,
        text: options.textPrevClass ? '' : options.textPrev,
        liClass: disabled ? options.disabledClass: '',
        aClass: options.textPrevClass
      };

      //add next
      disabled = scope.page == scope.totalPages;

      scope.next = {
        value: disabled ? scope.totalPages : scope.page + 1,
        text: options.textNextClass ? '' : options.textNext,
        liClass: disabled ? options.disabledClass : '',
        aClass: options.textNextClass
      };
    }

    function validateTargetPage(scope) {
      let {targetPage, page, totalPages} = scope;

      targetPage = parseInt(targetPage, 10) || 1;

      if (targetPage < 1 || targetPage > totalPages) {
        scope.targetPage = page < totalPages ? page + 1 : totalPages;
      } else {
        scope.targetPage = targetPage; //转为数字类型
      }
    }

    function internalAction(scope, page) {

        // Block clicks we try to load the active page
        if (scope.page == page) {
            return;
        }

        // Update the page in scope
        scope.page = page;

        // Pass our parameters to the paging action
        scope.pagingAction({
            page: scope.page,
            pageSize: scope.pageSize,
            total: scope.total,
        });
    }

    function renderPager(scope) {
      validateScope(scope);

      addPrevNext(scope);

      if (scope.pagerType === TYPE_TINY) {
        return;
      }
      // 总页码数不超过最大显示页数
      if (scope.totalPages <= scope.options.maxVisible) {
        addRange(1, scope.totalPages, scope);
      } else {
        let start = 1, end = 1,
            {totalPages, page} = scope,
            {maxVisible, endPoint} = scope.options,
            pad = (maxVisible - 1) % 2, //用于修正maxVisible为偶数时当前页右侧相邻页数
            adjacent = (maxVisible - pad - 2 * endPoint - 1) / 2;

        //当前页在开头
        if (page <= endPoint + adjacent + 1) {
          start = 1;
          end = endPoint + adjacent * 2 + 1 + pad;
          addRange(start, end, scope);
          addEnd(scope, end);
        }
        //当前页在页码列表末端
        else if (page >= totalPages - endPoint - adjacent - pad) {
          start = totalPages - 2 * adjacent - pad - endPoint;
          end = totalPages;
          addBeginning(scope, start);
          addRange(start, end, scope);
        }
        //当前页在页码列表中间
        else {
          start = page - adjacent;
          end = page + adjacent + pad;
          addBeginning(scope, start);
          addRange(start, end, scope);
          addEnd(scope, end);
        }
      }
    }

  }]);

}
