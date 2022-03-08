import { describe, it } from 'mocha'
import { expect } from 'chai'
import run from '../index.js'


describe('naruse-parser', () => {
    it('加减乘除测试', () => {
        const code = `
        exports.resPlus = 1 +1;
        exports.resDec = 1 - 1;
        exports.resDiv = 4 / 2;
        exports.resMul = 2 * 3;
        `
        const exports = run(code);
        expect(exports.resPlus, '加法测试').to.equal(2);
        expect(exports.resDec, '减法测试').to.equal(0);
        expect(exports.resDiv, '除法测试').to.equal(2);
        expect(exports.resMul, '乘法测试').to.equal(6);
    })
})