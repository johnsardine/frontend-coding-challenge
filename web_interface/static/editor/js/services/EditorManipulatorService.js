editorApp.factory('EditorManipulatorService', ['APP_CONFIG', function($appconfig) {

    // Get text or template
    function getNuggetText(nugget) {
        return nugget.text ? nugget.text : nugget.template;
    }

    // Extract nugget markup
    function getNuggetMarkup(nugget) {
        return nugget.annotations.markup ? nugget.annotations.markup : [];
    }

    // Extract nugget glossary
    function getNuggetGlossary(nugget) {
        return nugget.annotations.glossary ? nugget.annotations.glossary : [];
    }

    // Grabs the nugget text and inserts the markup annotations
    function getTextWithMarkup(nugget) {

        // Extract markup from nugget
        var annotations = getNuggetMarkup(nugget);

        // Extract text from nugget
        var inputText = getNuggetText(nugget);

        // Split input text for manipulation as array
        var inputTextAsArray = inputText.split('');

        // Insert markup
        var insertionCount = 0;
        for (var i = 0; i < annotations.length; i++) {

            var annotation = annotations[i];

            // Where to insert
            var position = annotation.position;

            // What to insert
            var tag = annotation.tag;

            // We need to compensate the position because we already inserted stuff into the initial array
            var contextPosition = position + insertionCount; // Position accounting with already inserted code

            inputTextAsArray.splice(contextPosition, 0, tag);
            ++insertionCount;
        }

        var outputText = inputTextAsArray.join('');

        return outputText;
    }

    // Grabs the nugget text and inserts the glossary annotations
    function getTextWithGlossary(nugget) {

        // Extract glossary from nugget
        var annotations = getNuggetGlossary(nugget);

        // Extract text from nugget
        var inputText = getNuggetText(nugget);

        // Split input text for manipulation as array
        var inputTextAsArray = inputText.split('');

        // Highlight glossary
        var insertionCount = 0;
        for (var i = 0; i < annotations.length; i++) {

            var annotation = annotations[i];

            var open_at = annotation.start;
            var close_at = open_at + annotation.length;

            // Get glossary tag format
            var open_tag = $appconfig.glossary.open_tag;
            var close_tag = $appconfig.glossary.close_tag;

            // Open - We need to compensate the position because we already inserted stuff into the initial array
            var openPosition = open_at + insertionCount;
            inputTextAsArray.splice(openPosition, 0, open_tag);
            ++insertionCount;

            // Close
            var closePosition = close_at + insertionCount;
            inputTextAsArray.splice(closePosition, 0, close_tag);
            ++insertionCount;
        }

        var outputText = inputTextAsArray.join('');

        return outputText;
    }

    // Expose api
    return {
        getText: getNuggetText,
        getTextWithMarkup: getTextWithMarkup,
        getTextWithGlossary: getTextWithGlossary,
    };
}]);
