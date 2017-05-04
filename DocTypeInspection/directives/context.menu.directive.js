angular.module('umbraco.directives')
  .config(function($provide) {
    $provide.decorator('umbContextMenuDirective', function($delegate, $controller) {
      var directive, link;
      directive = $delegate[0];

      var compile = directive.compile;
      directive.compile = function() {
        var link = compile.apply(this, arguments);
        return function(scope, elem, attrs) {
          link.apply(this, arguments);
          scope.$watch('currentNode', function(newValue, oldValue) {
                if (newValue) {
                  scope.id = newValue.id;
                }
            }, true);
        };
      };

        
      directive.templateUrl = '/App_Plugins/DocTypeInspection/Views/ContextMenuView.html';

      return $delegate;
    });
});