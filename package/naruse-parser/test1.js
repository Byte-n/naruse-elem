import run from './index.js';

// console.log(run(
//     `
//     console.log('测试语句');
//     exports.test = function () {
//         console.log(111);
//     };
//     exports.qqq = [
//         1,
//         2,
//         false,
//         null,
//         true,
//         {
//             q: 1,
//             w: 2
//         },
//         [1, 2]
//     ];
//     `
// ))
const cc = {
  nihao: '123',
}
const dd = run(
  `
  exports.qwer = function () {
    console.log(this.nihao);
  }
`, {
  cc
}
  )
const qq = dd.qwer.bind(cc);
console.log(qq())