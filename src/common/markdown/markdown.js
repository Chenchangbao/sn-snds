import './markdown.css';
import 'highlight.js/styles/xcode.css';
import marked from 'marked';
import highlight from 'highlight.js';

function isTopMarkdownEle(ele) {
  return ele.parents('markdown, [markdown]').length == 0
}

function generateOptions(option) {
  option = option ? JSON.parse(option) : {
    // renderer: new marked.Renderer(),
    // gfm: true,
    // tables: true,
    // breaks: false,
    // pedantic: false,
    // sanitize: true,
    // smartLists: true,
    // smartypants: false
  };
  return option;
}

export default app => {
  marked.setOptions({
    highlight: (code, lang, callback) => {
      return highlight.highlightAuto(code).value;
    }
  });

  app.directive("snMarkdown", ['$timeout', function ($timeout) {
    return {
      restrict: "AE",
      priority: 10000,
      terminal: true,
      link: (scope, element, {option, content}) => {
        option = generateOptions(option);
        element.addClass('markdown');
        // 使用highlight后，markdown性能低下，所以加上timeout，降低因为markdown导致的页面渲染等待时间。
        content = content ? content.toString() : element.html().replace(/&gt;/g, '>');
        element.empty();
        $timeout(function() {
          element.html(marked(content, option));
        });
      }
    };
  }]);

  app.filter('snMarkdown', () => {
    return (content, option) => {
      option = generateOptions(option);
      return marked((content||'').toString(), option);
    }
  })
}
