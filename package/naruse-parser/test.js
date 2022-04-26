import { run } from './index.js/index.js';



const code = `
function ww (r) { console.log(123); r&&r(); };
function qq () { return 'then'; }
new Promise(ww)[qq()](ww);
`
console.log(run(code));

