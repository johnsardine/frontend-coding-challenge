editorApp.controller('EditorDisplayNuggetController', ['$scope', 'EditorManipulatorService', '$http', 'APP_CONFIG', '$timeout', function($scope, EditorManipulatorService, $http, $appconfig, $timeout) {

    // The nugget - Defined in the directive
    //$scope.nugget = {};

    $scope.textWithMarkup = EditorManipulatorService.getTextWithMarkup($scope.nugget);
    $scope.textWithGlossary = EditorManipulatorService.getTextWithGlossary($scope.nugget);
    $scope.textWithErrors = '';

}]);
