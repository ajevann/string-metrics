require('colors');
const diff = require('diff');

let sourced = "And he shall be like a tree planted by the rivers of water that bringeth forth his fruit in his season; his leaf also shall not wither, and whatsoever he doeth shall prosper."
let current = "And he shall be like a tree planted by the streams of water, That bringeth forth its fruit in its season, Whose leaf also doth not wither; And whatsoever he doeth shall prosper."

const outcome = diff.diffWords(current, sourced);

outcome.forEach((part) => {
  const color = part.added ? 'green' : 'grey';
  if (part.removed) {
      //skip
  } else {
      process.stderr.write(part.value[color]);
  }
});

process.stderr.write('\n');

outcome.forEach((part) => {
    const color = part.removed ? 'red' : 'grey';
    if (part.added) {
        //skip
    } else {
        process.stderr.write(part.value[color]);
    }
  });

console.log();