const norm = require('../utils/normalize');
const now = require("performance-now");

function run(sourced, current) {
    const timeStart = now();
    const { distance } = require('fastest-levenshtein')

    let outcomeUnedited = distance(
        sourced,
        current
    );
    
    let outcomeCaseInsensitive = distance(
        sourced.toLowerCase(),
        current.toLowerCase()
    );
    
    let outcomePunctuationStripped = distance(
        sourced.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""),
        current.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    );
    
    let outcomeSpacesRemoved = distance(
        sourced.replace(/\s/g, ''),
        current.replace(/\s/g, '')
    );
    
    sourced = sourced.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""),
    current = current.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    
    let outcome = distance(
        sourced,
        current
    );
    
    // console.log('### DISTANCE - FASTEST LEVENSHTEIN')
    // console.log('>>> outcomeUnedited             -', outcomeUnedited);
    // console.log('>>> outcomeCaseInsensitive      -', outcomeCaseInsensitive);
    // console.log('>>> outcomePunctuationStripped  -', outcomePunctuationStripped);
    // console.log('>>> outcomeSpacesRemoved        -', outcomeSpacesRemoved);
    // console.log('>>> outcome                     -', outcome);

    let min = 0;
    let max = Math.max(sourced.length, current.length);

    let calculated = 
        ((norm(outcomeUnedited, max, min, true)) * 0.05) +
        ((norm(outcomeCaseInsensitive, max, min, true)) * 0.05) +
        ((norm(outcomePunctuationStripped, max, min, true)) * 0.1) +
        ((norm(outcomeSpacesRemoved, max, min, true)) * 0.2) +
        ((norm(outcome, max, min, true)) * 0.7);

        console.log('result ', (2.0 * outcome) / (sourced.length + current.length - 2));

        // console.log('outcomeUnedited                   ', outcomeUnedited);
        // console.log('outcomeUnedited (norm)            ', norm(outcomeUnedited, max, min, true));
        // console.log('outcomeCaseInsensitive            ', outcomeCaseInsensitive);
        // console.log('outcomeCaseInsensitive (norm)     ', norm(outcomeCaseInsensitive, max, min, true));
        // console.log('outcomePunctuationStripped        ', outcomePunctuationStripped);
        // console.log('outcomePunctuationStripped (norm) ', norm(outcomePunctuationStripped, max, min, true));
        // console.log('outcomeSpacesRemoved              ', outcomeSpacesRemoved);
        // console.log('outcomeSpacesRemoved (norm)       ', norm(outcomeSpacesRemoved, max, min, true));
        // console.log('outcome                           ', outcome);
        // console.log('outcome (norm)                    ', norm(outcome, max, min, true));

    const timeEnd = now();

    return {
        time: (timeEnd - timeStart).toFixed(3),
        calculated: Math.round(calculated * 10000)/100,
        outcomeUnedited,
        outcomeCaseInsensitive,
        outcomePunctuationStripped,
        outcomeSpacesRemoved,
        outcome
    }
}

module.exports = run;