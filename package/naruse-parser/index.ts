import { Interpreter } from './core/main'


export { Interpreter }

export const run = (code, ctx: any = {}) => {
    const exports = {};
    ctx.exports = exports;
    const interpreter = new Interpreter(ctx);
    interpreter.evaluate(code);
    return exports;
}
export default run;