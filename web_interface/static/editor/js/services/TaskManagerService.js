editorApp.factory('TaskManagerService', ['APP_CONFIG', '$http', function($appconfig, $http) {

    // Access the api and get the intended task
    function getTask() {
        return $http({
            method: 'GET',
            url: $appconfig.api.base_url + '/api/v1/task/',
        });
    }

    // Expose api
    return {
        getTask: getTask,
    };
}]);
