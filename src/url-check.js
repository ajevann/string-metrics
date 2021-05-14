/**
 * (http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?
 * ([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?
 */

const diff = require('../utils/array-difference')

/**
 * /\b([^\s]+@[^\s]+)\b/g
 */
function run(sourced, current) {
    let regex;
    regex = /\b(www.|(http|ftp|https):\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?\b/gm; // Includes fuzzy for emails
    regex = /\b(www.|(http|ftp|https):\/\/)([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?\b/gm; // Excludes emails
    
    let sres = [...sourced.matchAll(regexp)].map(e => e[0]);
    let cres = [...current.matchAll(regexp)].map(e => e[0]);
    let difference = diff(sres, cres);

    return {
        difference,
        calculated: difference.length > 0 ? 1 : 0,
        count: difference.length
    }
}

module.exports = run;