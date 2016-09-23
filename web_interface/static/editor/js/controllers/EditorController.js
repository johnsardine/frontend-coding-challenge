editorApp.controller('EditorController', ['$scope', 'TaskManagerService', function($scope, TaskManagerService) {

    $scope.task = {};

    // Language
    $scope.source_language = {};
    $scope.target_language = {};

    // Nuggets
    $scope.nuggets = [];

    /*
    Configures this editor context with the current task properties
     */
    function setupEditorForTask(task) {

        $scope.task = task;

        // Language
        $scope.source_language = task.source_language;
        $scope.target_language = task.target_language;

        // Merged Nuggets, will be working this as source > target rows
        $scope.nuggets = mergeSourceAndTarget(task.source_nuggets, task.target_nuggets);
    }

    function mergeSourceAndTarget(source, target) {
        /*
        {
            source: { (nugget) },
            target: { (nugget) },
        }
        */
        var output = [];

        var i;
        for (i in source) {
            var sourceRow = source[i];
            var targetRow = target[i];

            output.push({
                source: sourceRow,
                target: targetRow,
            });
        }

        return output;
    }

    function restoreSourceAndTarget(input) {
        var source = [];
        var target = [];

        var i;
        for (i in input) {
            var row = input[i];
            source.push( row.source );
            target.push( row.target );
        }

        return {
            source: source,
            target: target
        };
    }

    $scope.submitTask = function() {

        var splitOutput = restoreSourceAndTarget($scope.nuggets);

        var task = {};
        task.id = $scope.task.id;
        task.source_language = $scope.task.source_language;
        task.target_language = $scope.task.target_language;
        task.source_segments = splitOutput.source;
        task.target_segments = splitOutput.target;

        TaskManagerService.postTask(task).then(function() {
            loadTask();
        });
    };

    function loadTask() {
        TaskManagerService.getTask().then(function(response) {
            data = response.data;

            // Initial task display
            setupEditorForTask(data);
        });
    }

    // Starting point
    loadTask();

}]);
