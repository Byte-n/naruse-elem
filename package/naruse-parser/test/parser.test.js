import { describe, it } from 'mocha';
import { expect } from 'chai';
import run from '../index.js';


describe('naruse-parser', () => {
    it('加减乘除测试', () => {
        const code = `
        exports.resPlus = 1 +1;
        exports.resDec = 1 - 1;
        exports.resDiv = 4 / 2;
        exports.resMul = 2 * 3;
        `;
        const exports = run(code);
        expect(exports.resPlus, '加法测试').to.equal(2);
        expect(exports.resDec, '减法测试').to.equal(0);
        expect(exports.resDiv, '除法测试').to.equal(2);
        expect(exports.resMul, '乘法测试').to.equal(6);
    });

    it('对象声明测试', () => {
        const code = `
        exports.array = { qq: 123, ww: 'cscsasd', dd: true, ee: null, ff: undefined };
        `;
        const exports = run(code);
        expect(exports.array, '基本类型测试').deep.equal({ qq: 123, ww: 'cscsasd', dd: true, ee: null, ff: undefined });
    });

    it('in 与 instanceof 测试', () => {
        const code = `
        const res1 = 'qq' in { qq: 123, ww: 'cscsasd', dd: true, ee: null, ff: undefined };
        const res7 = 'qwer' in { qq: 123, ww: 'cscsasd', dd: true, ee: null, ff: undefined };
        const res2 = 0 in [1];
        function Person() {}
        const res3 = Person instanceof Array;
        const res4 = [] instanceof Array;
        const res5 = {} instanceof Object;
        const res6 = {} instanceof Array;
        exports.res = [res1, res2, res3, res4, res5, res6, res7];
        `;
        const exports = run(code);
        expect(exports.res[0], '属性名存在对象内').to.eq(true);
        expect(exports.res[1], '下标判断').to.eq(true);
        expect(exports.res[2], '类型判断1').to.eq(false);
        expect(exports.res[3], '类型判断2').to.eq(true);
        expect(exports.res[4], '类型判断3').to.eq(true);
        expect(exports.res[5], '类型判断4').to.eq(false);
        expect(exports.res[6], '类型判断5').to.eq(false);
    });

    it('new 测试', () => {
        const code = `
        function qq (a,b) {
            this.a = a;
            this.b = b;
        };
        Object.assign(qq.prototype, {
            ww: function () {
                return 'qwer';
            },
            constructor: qq
        })
        const res2 = new qq(1,2);
        const res3 = res2 instanceof qq;
        const res4 = res2.ww();
        const res5 = new RegExp('a');
        exports.res = [res2, res3, res4, res5];
        `;
        const exports = run(code);
        expect(exports.res[0].a, '新建类属性1').to.eq(1);
        expect(exports.res[0].b, '新建类属性2').to.eq(2);
        expect(exports.res[1], '新建类判断').to.eq(true);
        expect(exports.res[2], '新建类方法').to.eq('qwer');
        expect(exports.res[3].test('a'), '新建类正则').to.eq(true);
    });
});
