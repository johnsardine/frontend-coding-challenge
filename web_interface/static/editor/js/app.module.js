var editorApp = angular.module('editor', ['ngSanitize']);

editorApp.constant('APP_CONFIG', {
    api: {
        base_url: '',
    },
    jobcheck: {
        base_url: 'https://jobcheck.unbabel.com'
    },
    glossary: {
        open_tag: '<span class="editor-annotation editor-annotation--glossary">',
        close_tag: '</span>',
    },
    spellcheck: {
        open_tag: '<span class="editor-annotation editor-annotation--error">',
        close_tag: '</span>',
    },
});
