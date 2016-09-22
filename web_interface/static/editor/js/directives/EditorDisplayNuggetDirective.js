editorApp.directive('editorDisplayNugget', ['APP_CONFIG', function($appconfig) {
    return {
        restrict: 'A',
        scope: {
            nugget: '=',
        },
        templateUrl: function(elem, attr) {
            return '/static/editor/js/directives/templates/editor-nugget.html';
        },
        controller: 'EditorDisplayNuggetController',
        link: function(scope, element, attrs, controller) {
        }
    };
}]);
