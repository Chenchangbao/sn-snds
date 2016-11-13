import './tabs.less';
import tabsTmpl from './tabs.html';
import panelTmpl from './panel.html';

export default app => {
  app.directive('snTabs', ['$timeout', ($timeout) => {
    return {
      restrict: 'E',
      transclude: true,
      scope: true,
      controller: ['$scope', '$state', function($scope, $state) {
        let panels = $scope.panels = [];

        $scope.selectPanel = panel=> {
          for(let p of panels) {
            p.selected = false;
          }
          panel.selected = true;
          if(panel.state) {
            $state.go(panel.state, panel.params);
          }
        };

        this.addPanel = panel => {
          panels.length==0 && (panel.selected = true);
          panels.push(panel);
        };
      }],
      link: (scope, element, attrs) => {
        scope.ulStyle = {
          left: 0
        };
        let navContant = element.find('.nav-contant'),
            ul = element.find('.nav-contant > ul.nav'),
            leftStep = 40,
            distance = 0;
        scope.$watchCollection('panels', (newVal, oldVal) => {
          $timeout(() => {
            distance = ul.width() - navContant.width();
            scope.needBtn = distance > 0;
          }, 0);
        });

        scope.doPrev = () => {
          scope.ulStyle.left += leftStep;
          scope.ulStyle.left = Math.min(scope.ulStyle.left, 0);
        };

        scope.doNext = () => {
          scope.ulStyle.left -= leftStep;
          scope.ulStyle.left = Math.max(scope.ulStyle.left, -distance);
        };

        scope.canPrev = () => scope.ulStyle.left < 0;
        
        scope.canNext = () => (scope.ulStyle.left + distance) > 0;
      },
      template: tabsTmpl
    }
  }]);

  app.directive('snTabPanel', [() => {
    return {
      restrict: 'E',
      require: '^snTabs',
      transclude: true,
      scope: {
        title: '@t',
        state: '=',
        params: '='
      },
      link: (scope, element, attrs, snTabs) => {
        snTabs.addPanel(scope);
      },
      template: panelTmpl
    }
  }]);
}