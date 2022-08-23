import type estree from 'estree'
import {
    Identifier,
    Literal,
    Property,
    Program,
    FunctionDeclaration,
    FunctionExpression,
    ExpressionStatement,
    ObjectPattern,
    ArrayPattern,
    AssignmentPattern,
    ObjectExpression,
    ArrayExpression,
    AssignmentExpression,
    MemberExpression,
    RestElement,
    SpreadElement,
    DoWhileStatement,
    DebuggerStatement,
    ContinueStatement,
    BreakStatement,
    CallExpression,
    YieldExpression,
    ImportBatchSpecifier,
    ImportSpecifier,
    ImportDeclaration,
    ExportSpecifier,
    ExportBatchSpecifier,
    ExportDeclaration,
    ClassDeclaration,
    ClassExpression,
    ClassBody,
    TemplateElement,
    ArrowFunctionExpression,
    TemplateLiteral,
    MethodDefinition,
    SequenceExpression,
    ParenthesizedExpression,
    NewExpression,
    UpdateExpression,
    BinaryExpression,
    LogicalExpression,
    UnaryExpression,
    VariableDeclaration,
    IfStatement,
    ReturnStatement,
    SwitchCase,
    SwitchStatement,
    ThrowStatement,
    TaggedTemplateExpression,
    TryStatement,
    CatchClause,
    WhileStatement,
    EmptyStatement,
    LabeledStatement,
    BlockStatement,
    ForInStatement,
    ForOfStatement,
    ForStatement,
    VariableDeclarator,
    ThisExpression,
    ConditionalExpression,
    ImportExpression
} from '../expressionType/index'
import { createError, errorMessageList, EvaluateError } from './error.js';

let anonymousId = 0;
let thisRunner: { source: string, currentnode: any, traceId: number, traceStack: any[] };
const BREAK_SINGAL = {};
const CONTINUE_SINGAL = {};
const RETURN_SINGAL = { result: undefined };
const illegalFun = [setTimeout, setInterval, clearInterval, clearTimeout];

const isUndefinedOrNull = (val: any) => val === void 0 || val === null;


interface baseMap {
    [key: string]: Function
}


const evaluate_map: baseMap = {
    [Program]: (program: estree.Program, scope: Scope) => {
        for (const node of program.body) evaluate(node, scope);
    },
    [Identifier]: (node: estree.Identifier, scope: Scope) => {
        if (node.name === 'undefined') {
            return undefined;
        }
        const $var = scope.$find(node.name);
        if ($var) {
            return $var.$get();
        }
        throw createError(errorMessageList.notYetDefined, node.name, node, thisRunner.source);
    },
    [Literal]: (node: estree.Literal) => {
        return node.value;
    },
    [BlockStatement]: (block: estree.BlockStatement, scope: Scope) => {
        const new_scope = scope.invasived ? scope : new Scope('block', scope);
        for (const node of block.body) {
            const result = evaluate(node, new_scope);
            if (result === BREAK_SINGAL ||
                result === CONTINUE_SINGAL ||
                result === RETURN_SINGAL) {
                return result;
            }
        }
    },
    [EmptyStatement]: () => { },
    [ExpressionStatement]: (node: estree.ExpressionStatement, scope: Scope) => {
        evaluate(node.expression, scope);
    },
    [ReturnStatement]: (node: estree.ReturnStatement, scope: Scope) => {
        RETURN_SINGAL.result = node.argument ? evaluate(node.argument, scope) : undefined;
        return RETURN_SINGAL;
    },
    [BreakStatement]: () => {
        return BREAK_SINGAL;
    },
    [ContinueStatement]: () => {
        return CONTINUE_SINGAL;
    },
    [IfStatement]: (node: estree.IfStatement, scope: Scope) => {
        if (evaluate(node.test, scope)) return evaluate(node.consequent, scope);
        else if (node.alternate) return evaluate(node.alternate, scope);
    },
    [ForStatement]: (node: estree.ForStatement, scope: Scope) => {
        for (
            const new_scope = new Scope('loop', scope),
            init_val = node.init ? evaluate(node.init, new_scope) : null;
            node.test ? evaluate(node.test, new_scope) : true;
            node.update ? evaluate(node.update, new_scope) : void (0)
        ) {
            const result = evaluate({ type: 'BlockStatement', body: node.body }, new_scope);
            if (result === BREAK_SINGAL) {
                break;
            } else if (result === CONTINUE_SINGAL) {
                continue;
            } else if (result === RETURN_SINGAL) {
                return result;
            }
        }
    },
    [FunctionDeclaration]: (node: estree.FunctionDeclaration, scope: Scope) => {
        const func = evaluate_map[FunctionExpression](node, scope);
        const { name: func_name } = node.id || { name: `anonymous${anonymousId++}` };
        if (!scope.$var(func_name, func)) {
            throw createError(errorMessageList.duplicateDefinition, func_name, node, thisRunner.source);
        }
        return func;
    },
    [VariableDeclaration]: (node: estree.VariableDeclaration, scope: Scope) => {
        const { kind } = node;
        for (const declaration of node.declarations) {
            const { id, init } = declaration;
            const value = init ? evaluate(init, scope) : undefined;
            if (id.type === Identifier) {
                const { name } = id as estree.Identifier;
                if (!scope.$declar(kind, name, value)) {
                    throw createError(errorMessageList.duplicateDefinition, name, node, thisRunner.source);
                }
            } else {
                evaluate_map[id.type](id, scope, kind, value);
            }
        }
    },
    [ArrayPattern]: (node: estree.ArrayPattern, scope: Scope, kind?: Kind, value?: any[]) => {
        const { elements } = node;
        if (!Array.isArray(value)) {
            throw createError(errorMessageList.deconstructNotArray, value, node, thisRunner.source);
        }
        elements.forEach((element, index) => {
            if (!element) return;
            if (element.type === Identifier) {
                const { name } = element as estree.Identifier;
                if (!scope.$declar(kind as Kind, name, value[index])) {
                    throw createError(errorMessageList.duplicateDefinition, name, node, thisRunner.source);
                }
            } else {
                evaluate_map[element.type](element, scope, kind, value[index]);
            }
        })
    },
    [ObjectPattern]: (node: estree.ObjectPattern, scope: Scope, kind?: Kind, object?: any) => {
        const { properties } = node;
        properties.forEach(property => {
            if (property.type === Property) {
                const { key, value, computed } = property as unknown as estree.Property;
                const newKey = computed ? evaluate(key, scope) : (key as any).name;
                if (value.type === Identifier) {
                    const { name } = value as estree.Identifier;
                    if (!scope.$declar(kind as Kind, name, object[newKey])) {
                        throw createError(errorMessageList.duplicateDefinition, name, node, thisRunner.source);
                    }
                } else {
                    evaluate_map[value.type](value, scope, kind, object[newKey]);
                }
            }
        })
    },
    [AssignmentPattern]: (node: estree.AssignmentPattern, scope: Scope, kind?: Kind, init?: any) => {
        const { left, right } = node;
        const value = init === void 0 ? evaluate(right, scope) : init;
        if (left.type === Identifier) {
            const { name } = left as estree.Identifier;
            if (!scope.$declar(kind as Kind, name, value)) {
                throw createError(errorMessageList.duplicateDefinition, name, node, thisRunner.source);
            }
        } else {
            evaluate_map[left.type](left, scope, kind, value);
        }
    },
    [ThisExpression]: (node: estree.ThisExpression, scope: Scope) => {
        const this_val = scope.$find('this');
        return this_val ? this_val.$get() : null;
    },
    [ArrayExpression]: (node: estree.ArrayExpression, scope: Scope) => {
        return node.elements.map(item => item ? evaluate(item, scope) : null);
    },
    [ObjectExpression]: (node: estree.ObjectExpression, scope: Scope) => {
        const object: Record<any, any> = {};
        for (const property of node.properties) {
            if (property.type === Property) {
                const { kind, computed } = property;
                let key = computed ? evaluate(property.key, scope) : (property.key as any).name;
                const value = evaluate(property.value, scope);
                if (kind === 'init') {
                    object[key] = value;
                } else if (kind === 'set') {
                    Object.defineProperty(object, key, { set: value });
                } else if (kind === 'get') {
                    Object.defineProperty(object, key, { get: value });
                }
            } else {
                throw createError(errorMessageList.notSupportNode, property.type, node, thisRunner.source);
            }
        }
        return object;
    },
    [FunctionExpression]: (node: estree.FunctionExpression, scope: Scope, isArrowFunction = false) => {
        function func(this: any, ...args: any[]) {
            const new_scope = new Scope('function', scope);
            new_scope.invasived = true;
            node.params.forEach((param, index) => {
                if (param.type === Identifier) {
                    const { name } = param as estree.Identifier;
                    new_scope.$var(name, args[index]);
                } else {
                    evaluate_map[param.type](param, new_scope, 'var', args[index]);
                }
            })
            let result;
            if (isArrowFunction) {
                const parent_scope = scope.$find('this').$get();
                new_scope.$const('this', parent_scope ? parent_scope : null);
                result = evaluate(node.body, new_scope);
                if (node.body.type !== BlockStatement) {
                    return result;
                }
            } else {
                new_scope.$const('this', this);
                new_scope.$const('arguments', arguments);
                result = evaluate(node.body, new_scope);
            }
            if (result === RETURN_SINGAL) {
                return result.result;
            }
        };
        // 箭头函数的prototype属性指向的是父函数的prototype属性
        if (isArrowFunction) {
            Object.defineProperty(func, "prototype", { value: undefined });
        }

        // 矫正属性
        Object.defineProperty(func, "length", { value: node.params.length });
        // @ts-ignore
        Object.defineProperty(func, "toString", { value: () => thisRunner.source.slice(node.start, node.end) });
        return func;
    },
    [UnaryExpression]: (node: estree.UnaryExpression, scope: Scope) => {
        return ({
            '-': () => -evaluate(node.argument, scope),
            '+': () => +evaluate(node.argument, scope),
            '!': () => !evaluate(node.argument, scope),
            '~': () => ~evaluate(node.argument, scope),
            'void': () => void evaluate(node.argument, scope),
            'typeof': () => {
                if (node.argument.type === Identifier) {
                    const $var = scope.$find((node.argument as estree.Identifier).name)
                    return $var ? typeof $var.$get() : 'undefined'
                } else {
                    return typeof evaluate(node.argument, scope)
                }
            },
            'delete': () => {
                if (node.argument.type === MemberExpression) {
                    const { object, property, computed } = node.argument as estree.MemberExpression;
                    if (computed) {
                        return delete evaluate(object, scope)[evaluate(property, scope)]
                    } else {
                        // @ts-ignore
                        return delete evaluate(object, scope)[(property).name]
                    }
                } else if (node.argument.type === Identifier) {
                    const $this = scope.$find('this')
                    // @ts-ignore
                    if ($this) return $this.$get()[node.argument.name]
                }
            }
        })[node.operator]();
    },
    [UpdateExpression]: (node: estree.UpdateExpression, scope: Scope) => {
        const { prefix } = node;
        let $var: { $set: any; $get?: () => any; };
        if (node.argument.type === Identifier) {
            const { name } = node.argument;
            $var = scope.$find(name);
            if (!$var) throw createError(errorMessageList.notYetDefined, name, node, thisRunner.source);
        } else if (node.argument.type === MemberExpression) {
            const { argument } = node;
            const object = evaluate(argument.object, scope);
            const property = argument.computed
                ? evaluate(argument.property, scope)
                : (argument.property).name;
            $var = {
                $set(value: any) {
                    object[property] = value;
                    return true;
                },
                $get() {
                    return object[property];
                },
            };
        }
        return ({
            '--': (v: number) => ($var.$set(v - 1), (prefix ? --v : v--)),
            '++': (v: number) => ($var.$set(v + 1), (prefix ? ++v : v++)),
        })[node.operator](evaluate(node.argument, scope));
    },

    [BinaryExpression]: (node: estree.BinaryExpression, scope: Scope) => {
        return ({
            '==': (a: any, b: any) => a == b,
            '!=': (a: any, b: any) => a != b,
            '===': (a: any, b: any) => a === b,
            '!==': (a: any, b: any) => a !== b,
            '<': (a: number, b: number) => a < b,
            '<=': (a: number, b: number) => a <= b,
            '>': (a: number, b: number) => a > b,
            '>=': (a: number, b: number) => a >= b,
            '+': (a: any, b: any) => a + b,
            '-': (a: number, b: number) => a - b,
            '*': (a: number, b: number) => a * b,
            '**': (a: number, b: number) => a ** b,
            '/': (a: number, b: number) => a / b,
            '%': (a: number, b: number) => a % b,
            '|': (a: number, b: number) => a | b,
            '^': (a: number, b: number) => a ^ b,
            '&': (a: number, b: number) => a & b,
            '<<': (a: number, b: number) => a << b,
            '>>': (a: number, b: number) => a >> b,
            '>>>': (a: number, b: number) => a >>> b,
            in: (a: string, b: any) => a in b,
            instanceof: (a: any, b: any) => a instanceof b,
        })[node.operator](evaluate(node.left, scope), evaluate(node.right, scope));
    },

    [AssignmentExpression]: (node: estree.AssignmentExpression, scope: Scope) => {
        let $var: { $set: any; $get: any; };
        const { left } = node;
        if (left.type === Identifier) {
            const { name } = left as unknown as estree.Identifier;
            const $var_or_not = scope.$find(name);
            if (!$var_or_not) throw createError(errorMessageList.notYetDefined, name, node, thisRunner.source);
            $var = $var_or_not;
        } else if (left.type === MemberExpression) {
            const { object, property, computed } = left as unknown as estree.MemberExpression;
            const newObject = evaluate(object, scope);
            const newProperty = computed
                ? evaluate(property, scope)
                : property.name;
            $var = {
                $set(value: any) {
                    newObject[newProperty] = value;
                    return true;
                },
                $get() {
                    return newObject[newProperty];
                },
            };
        } else {
            throw createError(errorMessageList.notSupportNode, left.type, node, thisRunner.source);
        }

        return ({
            '=': (v: any) => ($var.$set(v), v),
            '+=': (v: any) => ($var.$set($var.$get() + v), $var.$get()),
            '-=': (v: number) => ($var.$set($var.$get() - v), $var.$get()),
            '*=': (v: number) => ($var.$set($var.$get() * v), $var.$get()),
            '**=': (v: number) => ($var.$set($var.$get() ** v), $var.$get()),
            '/=': (v: number) => ($var.$set($var.$get() / v), $var.$get()),
            '%=': (v: number) => ($var.$set($var.$get() % v), $var.$get()),
            '|=': (v: number) => ($var.$set($var.$get() | v), $var.$get()),
            '<<=': (v: number) => ($var.$set($var.$get() << v), $var.$get()),
            '>>=': (v: number) => ($var.$set($var.$get() >> v), $var.$get()),
            '>>>=': (v: number) => ($var.$set($var.$get() >>> v), $var.$get()),
            '^=': (v: number) => ($var.$set($var.$get() ^ v), $var.$get()),
            '&=': (v: number) => ($var.$set($var.$get() & v), $var.$get()),
        })[node.operator](evaluate(node.right, scope));
    },

    [LogicalExpression]: (node: estree.LogicalExpression, scope: Scope) => {
        return ({
            '||': () => evaluate(node.left, scope) || evaluate(node.right, scope),
            '&&': () => evaluate(node.left, scope) && evaluate(node.right, scope),
            '??': () => evaluate(node.left, scope) ?? evaluate(node.right, scope),
        })[node.operator]();
    },

    [MemberExpression]: (node: estree.MemberExpression, scope: Scope) => {
        const { object, property, computed } = node;
        if (computed) {
            return evaluate(object, scope)[evaluate(property, scope)];
        }
        return evaluate(object, scope)[property.name];
    },
    [ConditionalExpression]: (node: estree.ConditionalExpression, scope: Scope) => {
        return (
            evaluate(node.test, scope)
                ? evaluate(node.consequent, scope)
                : evaluate(node.alternate, scope)
        );
    },
    [CallExpression]: (node: estree.CallExpression, scope: Scope) => {
        let this_val = null;
        let func = null;
        // fix: ww().ww().ww()
        if (node.callee.type === MemberExpression) {
            const { object, property, computed } = (node.callee) as estree.MemberExpression;
            this_val = evaluate(object, scope);
            // @ts-ignore
            const funcName = !computed ? property.name : evaluate_map[property.type](property, scope);
            if (isUndefinedOrNull(this_val)) throw createError(errorMessageList.notHasSomeProperty, funcName, node, thisRunner.source);
            func = this_val[funcName];
        } else {
            this_val = scope.$find('this').$get();
            func = evaluate(node.callee, scope);
        }
        if (typeof func !== 'function') throw createError(errorMessageList.notCallableFunction, func, node, thisRunner.source);
        // fix: setTimeout.apply({}, '');
        if (illegalFun.includes(func)) this_val = null;
        return func.apply(this_val, node.arguments.map(arg => evaluate(arg, scope)));
    },
    [NewExpression]: (node: estree.NewExpression, scope: Scope) => {
        const Func = evaluate(node.callee, scope);
        const args = node.arguments.map(arg => evaluate(arg, scope));
        return new Func(...args);
    },
    [SequenceExpression]: (node: estree.SequenceExpression, scope: Scope) => {
        let last;
        for (const expr of node.expressions) {
            last = evaluate(expr, scope);
        }
        return last;
    },
    [ThrowStatement]: (node: estree.ThrowStatement, scope: Scope) => {
        throw evaluate(node.argument, scope)
    },
    [TryStatement]: (node: estree.TryStatement, scope: Scope) => {
        try {
            return evaluate(node.block, scope)
        } catch (err) {
            if (node.handler) {
                const { param } = node.handler
                const new_scope = new Scope('block', scope)
                new_scope.invasived = true
                new_scope.$const(param?.name, err)
                return evaluate(node.handler, new_scope)
            } else {
                throw err
            }
        } finally {
            if (node.finalizer)
                return evaluate(node.finalizer, scope)
        }
    },
    [CatchClause]: (node: estree.CatchClause, scope: Scope): any => {
        return evaluate(node.body, scope)
    },
    [SwitchStatement]: (node: estree.SwitchStatement, scope: Scope) => {
        const discriminant = evaluate(node.discriminant, scope)
        const new_scope = new Scope('switch', scope)

        let matched = false

        for (const $case of node.cases) {

            // 进行匹配相应的 case
            if (!matched &&
                (!$case.test || discriminant === evaluate($case.test, new_scope))) {
                matched = true
            }

            if (matched) {
                const result = evaluate($case, new_scope)

                if (result === BREAK_SINGAL) { break }
                else if (result === CONTINUE_SINGAL || result === RETURN_SINGAL) {
                    return result
                }
            }
        }
    },
    [SwitchCase]: (node: estree.SwitchCase, scope: Scope) => {
        for (const stmt of node.consequent) {
            const result = evaluate(stmt, scope)
            if (result === BREAK_SINGAL
                || result === CONTINUE_SINGAL
                || result === RETURN_SINGAL) {
                return result
            }
        }
    },
    [WhileStatement]: (node: estree.WhileStatement, scope: Scope) => {
        while (evaluate(node.test, scope)) {
            const new_scope = new Scope('loop', scope)
            new_scope.invasived = true
            const result = evaluate(node.body, new_scope)

            if (result === BREAK_SINGAL) { break }
            else if (result === CONTINUE_SINGAL) { continue }
            else if (result === RETURN_SINGAL) { return result }
        }
    },
    [DoWhileStatement]: (node: estree.DoWhileStatement, scope: Scope) => {
        do {
            const new_scope = new Scope('loop', scope)
            new_scope.invasived = true
            const result = evaluate(node.body, new_scope)
            if (result === BREAK_SINGAL) { break }
            else if (result === CONTINUE_SINGAL) { continue }
            else if (result === RETURN_SINGAL) { return result }
        } while (evaluate(node.test, scope))
    },
    [ArrowFunctionExpression]: (node: estree.ArrowFunctionExpression, scope: Scope) => {
        return evaluate_map[FunctionExpression](node, scope, true);
    },
    [ForInStatement]: (node: estree.ForInStatement, scope: Scope, isForOf: boolean = false) => {
        const kind = (<estree.VariableDeclaration>node.left).kind
        const id = (<estree.VariableDeclaration>node.left).declarations[0].id;

        const forInit = (value: any) => {
            const new_scope = new Scope('loop', scope)
            new_scope.invasived = true
            if (id.type === Identifier) {
                const name = (<estree.Identifier>id).name
                new_scope.$declar(kind, name, value)
            } else {
                evaluate_map[id.type](id, new_scope, kind, value)
            }
            return evaluate(node.body, new_scope);
        }

        const init = evaluate(node.right, scope);
        if (isForOf) {
            for (let index = 0; index < init.length; index++) {
                const result = forInit(init[index]);
                if (result === BREAK_SINGAL) { break }
                else if (result === CONTINUE_SINGAL) { continue }
                else if (result === RETURN_SINGAL) { return result }
            }
        } else {
            for (const value in init) {
                const result = forInit(value);
                if (result === BREAK_SINGAL) { break }
                else if (result === CONTINUE_SINGAL) { continue }
                else if (result === RETURN_SINGAL) { return result }
            }
        }
    },
    [TemplateLiteral]: (node: estree.TemplateLiteral, scope: Scope) => {
        const result = node.quasis.map((quasi, index) => {
            if (!quasi.tail) return quasi.value.raw + evaluate(node.expressions[index], scope)
            return quasi.value.raw;
        });
        return result.join('');
    },
    [ImportExpression]: (node: estree.ImportExpression, scope: Scope) => {
        const source = evaluate(node.source, scope)
        const importer = scope.$find('$$import');
        if (!importer) throw createError(errorMessageList.notHasImport, '$$import', node, thisRunner.source);
        return importer.$get()(source);
    },
    [ForOfStatement]: (node: estree.ForOfStatement, scope: Scope) => {
        return evaluate_map[ForInStatement](node, scope, true)
    },
};


type Kind = 'const' | 'var' | 'let';

class ScopeVar {
    public value: any;
    public kind: Kind;
    constructor(kind: Kind, value: any) {
        this.value = value;
        this.kind = kind;
    }
    $set(value: any) {
        if (this.value === 'const') {
            return false;
        }
        this.value = value;
        return true;
    }
    $get() {
        return this.value;
    }
}

export class Scope {
    public type;
    public parent: Scope | null;
    public content: Record<string, any> = {};
    public prefix = '';
    public invasived = false; // 标记为侵入式Scope，不用再多构造啦

    constructor(type: string, parent?: Scope) {
        this.type = type;
        this.parent = parent || null;
    }

    public $find(raw_name: string): any {
        const name = this.prefix + raw_name;
        if (this.content.hasOwnProperty(name)) {
            return this.content[name];
        } else if (this.parent) {
            return this.parent.$find(raw_name);
        }
        return null;
    }

    public $let(raw_name: string, value: any) {
        const name = this.prefix + raw_name;
        const $var = this.content[name];
        if (!$var) {
            this.content[name] = new ScopeVar('let', value);
            return true;
        } return false;
    }

    public $const(raw_name: string, value: unknown) {
        const name = this.prefix + raw_name;
        const $var = this.content[name];
        if (!$var) {
            this.content[name] = new ScopeVar('const', value);
            return true;
        } return false;
    }

    public $var(raw_name: string, value: (...args: any[]) => any) {
        const name = this.prefix + raw_name;
        let scope: Scope = this;

        while (scope.parent !== null && scope.type !== 'function') {
            scope = scope.parent;
        }

        const $var = scope.content[name];
        if (!$var) {
            this.content[name] = new ScopeVar('var', value);
            return true;
        } return false;
    }
    public $declar(kind: Kind, raw_name: any, value: any) {
        return ({
            var: () => this.$var(raw_name, value),
            let: () => this.$let(raw_name, value),
            const: () => this.$const(raw_name, value),
        })[kind]();
    }
}

function _evaluate(node: any, scope: Scope) {
    const func = evaluate_map[node.type];
    if (!func) throw createError(errorMessageList.notSupportNode, node.type, node, thisRunner.source);
    const res = evaluate_map[node.type](node, scope);
    thisRunner.currentNode = node;
    return res;
}

export function evaluate(node: any, scope: Scope, runner?: typeof thisRunner) {
    if (runner) thisRunner = runner;
    const thisId = thisRunner.traceId++;
    thisRunner.traceStack.push(thisId);
    try {
        const res = _evaluate(node, scope);
        thisRunner.traceStack.pop();
        return res;
    } catch (err) {
        if ((err as EvaluateError).isEvaluateError) {
            throw err;
        }
        if (thisRunner.traceStack[thisRunner.traceStack.length - 1] === thisId) {
            throw createError(errorMessageList.runTimeError, (err as Error)?.message, node, thisRunner.source)
        }
        throw err;
    }
}
