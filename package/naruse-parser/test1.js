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
function qq () {};



console.log(qq);
Object.assign(qq.prototype, {
    ww: function () {
        return 'qwer';
    }
})


const ww = new qq();
console.log(ww instanceof qq);
console.log(ww.ww());

console.log(new RegExp('a'));
`));