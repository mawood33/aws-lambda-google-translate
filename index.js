'use strict';

const async = require('async');

exports.handler = function( event, context, callback ) {
    async.waterfall([
        translateText
    ], (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    });

    function translateText(callback) {
        // Imports the Google Cloud client library
        const Translate = require('@google-cloud/translate');
    
        // Use your project's API key for client access to Google Translate
        const translate = new Translate({
            key: 'your api key'
        });
    
        translate
            .translate(event.text, event.target)
            .then(results => {
                let translations = results[0];
                translations = Array.isArray(translations)
                    ? translations
                    : [translations];
                callback(null, translations);
            })
            .catch(err => {
                callback(err);
            });
    }
}