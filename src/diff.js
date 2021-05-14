const now = require("performance-now");
require('colors');

function run(sourced, current) {
    const timeStart = now();

    const diff = require('diff');
 
    let outcomeUnedited = diff.diffWords(
        sourced,
        current
    );
    
    let outcomeCaseInsensitive = diff.diffWords(
        sourced.toLowerCase(),
        current.toLowerCase()
    );
    
    let outcomePunctuationStripped = diff.diffWords(
        sourced.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""),
        current.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    );
    
    let outcomeSpacesRemoved = diff.diffWords(
        sourced.replace(/\s/g, ''),
        current.replace(/\s/g, '')
    );
    
    sourced = sourced.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""),
    current = current.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    
    let outcome = diff.diffWords(
        sourced,
        current
    );

    // console.log('### DIFFERENCE - DIFF')
    // console.log('>>> outcomeUnedited             -', outcomeUnedited);
    // console.log('>>> outcomeCaseInsensitive      -', outcomeCaseInsensitive);
    // console.log('>>> outcomePunctuationStripped  -', outcomePunctuationStripped);
    // console.log('>>> outcomeSpacesRemoved        -', outcomeSpacesRemoved);
    // console.log('>>> outcome                     -', outcome);    

    function printDifference(result) {
        process.stderr.write('\n\n');
        result.forEach((part) => {
            const color = part.added ? 'green' : 'grey';
            if (part.removed) {
                //skip
            } else {
                process.stderr.write(part.value[color]);
            }
        });
    
        process.stderr.write('\n');
    
        result.forEach((part) => {
            const color = part.removed ? 'red' : 'grey';
            if (part.added) {
                //skip
            } else {
                process.stderr.write(part.value[color]);
            }
        });
        process.stderr.write('\n\n');
    }


    const timeEnd = now();
    
    printDifference(outcomeUnedited)
    
    return {
        time: (timeEnd - timeStart).toFixed(3),

    }
    
    // printDifference(outcome)
}

module.exports = run;