editorApp.factory('NuggetModel', [function() {

    function Nugget(nugget) {
        this.id = nugget.id;
        this.text = nugget.text;
        this.template = nugget.template;
        this.annotations = {
            markup: [],
            glossary: [],
        };
    }

    return Nugget;

}]);
