editorApp.directive('editorEditNugget', ['APP_CONFIG', function($appconfig) {
    return {
        restrict: 'A',
        scope: {
            nugget: '=',
        },
        templateUrl: function(elem, attr) {
            return '/static/editor/js/directives/templates/editor-nugget-edit.html';
        },
        controller: 'EditorEditNuggetController',
        link: function(scope, element, attrs, controller) {
        }
    };
}]);
