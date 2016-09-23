editorApp.controller('EditorRowController', ['$scope', '$timeout', '$http', 'EditorManipulatorService', 'APP_CONFIG', function($scope, $timeout, $http, EditorManipulatorService, $appconfig) {

    // Defined in loop
    //$scope.nuggetRow = {};

    //$scope.rowTargetText = ''; // Model containing targetWithMarkup

    $scope.sourceWithMarkup = EditorManipulatorService.getAnnotatedText($scope.nuggetRow.source);

    $scope.targetWithMarkup = EditorManipulatorService.getAnnotatedText($scope.nuggetRow.target);

    $scope.$watch(function() {
        return $scope.targetWithMarkup;
    }, function() {
        $scope.rowTargetText = $scope.targetWithMarkup;
    });

    var timeout = null;

    // Detect target changes
    $scope.didChangeTargetText = function() {

        console.log('didChangeTargetText');

        if (timeout !== null) {
            $timeout.cancel(timeout);
        }

        // Ignore if empty
        if ( !$scope.rowTargetText )
            return;

        timeout = $timeout(function() {

            var src = EditorManipulatorService.getText($scope.nuggetRow.source);
            var srcArray = src.split(' ');
            var trg = EditorManipulatorService.getPureText($scope.rowTargetText);

            var trgArray = trg.split(' ');

            return $http({
                method: 'POST',
                url: $appconfig.jobcheck.base_url + '/analyze_job_segments',
                data: {
                    "src_segments": [src],
                    "trg_segments": [trg],
                    "src_lang": $scope.source_language.shortname,
                    "trg_lang": $scope.target_language.shortname,
                    "fast_analysis": true
                }
            }).then(function(response) {
                updateFromSmartCheck(response.data);
            });
        }, 700);

    };

    function updateFromSmartCheck(data) {

        var textWithoutErrors = EditorManipulatorService.removeSpellcheckErrors($scope.rowTargetText);

        if ( !data.qa_description.sentence_issues.spelling ) {
            $scope.rowTargetText = textWithoutErrors;
            return;
        }

        var spellcheckOpenTag = $appconfig.spellcheck.open_tag;
        var spellcheckCloseTag = $appconfig.spellcheck.close_tag;

        var spelling = data.qa_description.sentence_issues.spelling;

        var text = textWithoutErrors;
        var i;
        for (i = 0; i < spelling.length; i++) {
            var row = spelling[i];
            var errors = row.errors;

            text = text.replace(errors, spellcheckOpenTag + errors + spellcheckCloseTag);
        }

        $scope.rowTargetText = text;
    }

    // Push changes to main array collection
    $scope.$watch(function() {
        return $scope.rowTargetText;
    }, function() {
        $scope.nuggetRow.target.text = EditorManipulatorService.getPureText($scope.rowTargetText);
    });

}]);
