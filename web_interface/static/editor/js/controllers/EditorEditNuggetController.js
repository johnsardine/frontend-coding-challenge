editorApp.controller('EditorEditNuggetController', ['$scope', 'EditorManipulatorService', '$http', 'APP_CONFIG', '$timeout', function($scope, EditorManipulatorService, $http, $appconfig, $timeout) {

    // The nugget - Defined in the directive
    //$scope.nugget = {};

    $scope.textWithMarkup = EditorManipulatorService.getTextWithMarkup($scope.nugget);
    $scope.textWithGlossary = EditorManipulatorService.getTextWithGlossary($scope.nugget);
    //$scope.textWithErrors = '<span class="editor-annotation editor-annotation--error">Atumj</span>';
    $scope.textWithErrors = '';

    // Stores model value here
    $scope.editableText = '';

    var timeout = null;

    function didChangeText() {

        if (timeout !== null) {
            $timeout.cancel(timeout);
        }

        timeout = $timeout(function() {
            return $http({
                method: 'POST',
                url: $appconfig.jobcheck.base_url + '/analyze_job_segments',
                data: {
                    "src_segments": ["Tuna fish"],
                    "trg_segments": ["Atumj em lara"],
                    "src_lang": "en",
                    "trg_lang": "pt",
                    "fast_analysis": true
                }
            }).then(function(response) {
                updateFromSmartCheck(response.data);
            });
        }, 500);
    }

    function updateFromSmartCheck(data) {
        console.log('smartcheck data', data);
    }

    $scope.$watch(function() {
        return $scope.editableText;
    }, function() {
        //didChangeText();
    });

}]);
