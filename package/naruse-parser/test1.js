import run from './index.js';

// const dd = run(
//   `
//   exports.render = function () {
//     return h("view", null, "qwer");
//   }
// `, {
//   cc
// }
//   )
console.log(run(`
    exports.add = 4 / 2;

`));