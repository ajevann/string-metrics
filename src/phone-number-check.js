const diff = require('../utils/array-difference')

/**
 * 
 */
function run(sourced, current) {
    let regexp;
    regexp = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/gm;
    regexp = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\/\.0-9]{3,15}\b/gm;
    regexp = /\b(?=(?:^(?:\+?1\s*(?:[.-]\s*)?)?(?!(?:(?:.*\(.*)|(?:.*\).*)))(?:[2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))|(?:.*\((?:[2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\).*))(?:\+?1\s*(?:[.-]\s*)?)?(?:\(?([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\)?)\s*(?:[.-]\s*)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d{1,15}))?$\b/gim;
    let sres = [...sourced.matchAll(regexp)].map(e => e[0]);
    let cres = [...current.matchAll(regexp)].map(e => e[0]);
    
    console.log('>>>', [...current.matchAll(regexp)])

    console.log('>>> sres', sres)
    console.log('>>> cres', cres)

    let difference = diff(sres, cres);
    let all = [].concat(sres, cres)

    return {
        all,
        difference,
        calculated: difference.length > 0 ? 1 : 0,
        count: difference.length
    }
}

module.exports = run;