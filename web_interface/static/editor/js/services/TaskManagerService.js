editorApp.factory('TaskManagerService', ['APP_CONFIG', '$http', function($appconfig, $http) {

    // Access the api and get the intended task
    function getTask() {
        return $http({
            method: 'GET',
            url: $appconfig.api.base_url + '/api/v1/task/',
        });
    }

    function postTask(task) {
        return $http({
            method: 'POST',
            url: $appconfig.api.base_url + '/api/v1/task/',
            data: task
        });
    }

    // Expose api
    return {
        getTask: getTask,
        postTask: postTask,
    };
}]);
