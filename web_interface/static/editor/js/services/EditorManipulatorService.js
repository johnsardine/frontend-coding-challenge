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

    function applyNuggetGlossary(nugget, input) {

        var sourceText = getNuggetText(nugget);
        var glossary = getNuggetGlossary(nugget);

        // Find glossary words
        var glossaryOpenTag = $appconfig.glossary.open_tag;
        var glossaryCloseTag = $appconfig.glossary.close_tag;
        for (i = 0; i < glossary.length; i++) {
            var wordBounds = glossary[i];
            var word = sourceText.substr(wordBounds.start, wordBounds.length);
            input = input.replace(word, glossaryOpenTag + word + glossaryCloseTag);
        }
        return input;
    }

    // Grabs the nugget text and inserts the markup annotations
    function getTextWithMarkupAndGlossary(nugget) {

        // For loops
        var i;

        // Extract markup from nugget
        var markup = getNuggetMarkup(nugget);

        // Extract text from nugget
        var sourceText = getNuggetText(nugget);

        // Split input text for manipulation as array
        var sourceTextAsArray = sourceText.split('');

        // Insert markup
        var insertionCount = 0;
        for (i = 0; i < markup.length; i++) {

            var annotation = markup[i];

            // Where to insert
            var position = annotation.position;

            // What to insert
            var tag = annotation.tag;

            // We need to compensate the position because we already inserted stuff into the initial array
            var contextPosition = position + insertionCount; // Position accounting with already inserted code

            sourceTextAsArray.splice(contextPosition, 0, tag);
            ++insertionCount;
        }

        var outputTextWithMarkup = sourceTextAsArray.join('');

        var outputText = applyNuggetGlossary(nugget, outputTextWithMarkup);

        return outputText;
    }

    function applySlashes(input) {
        return input.replace('/', '\\/');
    }

    function getPureText(textWithAnnotations) {
        var div = document.createElement("div");
        div.innerHTML = textWithAnnotations;
        return div.textContent || div.innerText || "";
    }

    function removeSpellcheckErrors(input) {

        var spellcheckOpenTag = applySlashes($appconfig.spellcheck.open_tag);
        var spellcheckCloseTag = applySlashes($appconfig.spellcheck.close_tag);

        // Concatenate spellcheck tags
        var spellcheckMatchConcat = spellcheckOpenTag + '(.+?)' + spellcheckCloseTag;
        var matchspellcheckTerm = new RegExp(spellcheckMatchConcat, 'gi');

        var spellcheckTermsFound = input.match(matchspellcheckTerm);

        if ( spellcheckTermsFound ) {
            for (var i = 0; i < spellcheckTermsFound.length; i++) {
                var foundTag = spellcheckTermsFound[i];
                // FIXME: RegExp needs to be created again, perhaps some index error exists. Would not find second term
                var extractFromRegex = new RegExp(spellcheckMatchConcat, 'gi').exec(foundTag);

                if ( extractFromRegex ) {
                    // Replace error tag with just the text inside
                    input = input.replace(extractFromRegex[0], extractFromRegex[1]);
                }
            }
        }

        return input;
    }

    // Expose api
    return {
        getText: getNuggetText,
        getAnnotatedText: getTextWithMarkupAndGlossary,
        getPureText: getPureText,
        removeSpellcheckErrors: removeSpellcheckErrors,
    };
}]);
