const now = require("performance-now");

function run(sourced, current) {

    // Uses the Sørensen–Dice coefficient

    const timeStart = now();

    let stringSimilarity = require("string-similarity");

    let outcomeUnedited = stringSimilarity.compareTwoStrings(
        sourced,
        current
    );

    let outcomeCaseInsensitive = stringSimilarity.compareTwoStrings(
        sourced.toLowerCase(),
        current.toLowerCase()
    );

    let outcomePunctuationStripped = stringSimilarity.compareTwoStrings(
        sourced.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""),
        current.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    );

    let outcomeSpacesRemoved = stringSimilarity.compareTwoStrings(
        sourced.replace(/\s/g, ''),
        current.replace(/\s/g, '')
    );

    sourced = sourced.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""),
    current = current.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")

    let outcome = stringSimilarity.compareTwoStrings(
        sourced,
        current
    );

    let outcomePercentage = Math.round(outcome * 10000)/100;

    // console.log('### RATIO - STRING SIMILARITY')

    // console.log('>>> outcomeUnedited             -', outcomeUnedited);
    // console.log('>>> outcomeCaseInsensitive      -', outcomeCaseInsensitive);
    // console.log('>>> outcomePunctuationStripped  -', outcomePunctuationStripped);
    // console.log('>>> outcomeSpacesRemoved        -', outcomeSpacesRemoved);
    // console.log('>>> outcome                     -', outcome);
    // console.log('>>> outcomePercentage           -', outcomePercentage);

    let calculated = 
        (outcomeUnedited * 0.05) +
        (outcomeCaseInsensitive * 0.05) +
        (outcomePunctuationStripped * 0.1) +
        (outcomeSpacesRemoved * 0.3) +
        (outcome * 0.5);

    const timeEnd = now();

    return {
        time: (timeEnd - timeStart).toFixed(3),
        calculated: Math.round(calculated * 10000)/100,
        outcomeUnedited,
        outcomeCaseInsensitive,
        outcomePunctuationStripped,
        outcomeSpacesRemoved,
        outcome,
        outcomePercentage
    }
}

module.exports = run;