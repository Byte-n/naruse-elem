import { run } from './index.js';




const code = `

console.log("".concat("123"))
`


console.log(run(code, { $$import: (a) => a }));

