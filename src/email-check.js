const diff = require('../utils/array-difference')

/**
 * /\b([^\s]+@[^\s]+)\b/g
 */
function run(sourced, current) {
    let regexp = /\b([^\s]+@[^\s]+)\b/g
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