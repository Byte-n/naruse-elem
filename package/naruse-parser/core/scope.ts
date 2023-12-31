import type { Runner } from "./run";
import { isGeneratorFunction, isYieldResult } from "./signal";

export type Kind = 'const' | 'var' | 'let';

export class ScopeVar {
    public value: any;
    public kind: Kind;
    public reDeclare = false;
    constructor(kind: Kind, value: any, reDeclare = false) {
        this.value = value;
        this.kind = kind;
        this.reDeclare = reDeclare;
    }
    $set(value: any) {
        if (this.kind === 'const' && !this.reDeclare) {
            throw new Error('const value can not be changed');
        }
        this.value = value;
        this.reDeclare = false;
        return true;
    }
    $get() {
        return this.value;
    }
}

interface indexGeneratorStackDecorateData {
    index: number;
    [k: string]: any;
}

export type indexGeneratorStackDecorateFunction = (data: indexGeneratorStackDecorateData, saveData: (k: any, value: any) => void) => any

export const indexGeneratorStackDecorate = (fn: indexGeneratorStackDecorateFunction, scope: Scope) => {
    let data = { index: 0 };
    let saveData: (k: any, value: any) => void = () => { };
    // 入栈
    if (isGeneratorFunction(scope)) {
        data = scope.generatorStack.getStack();
        saveData = scope.generatorStack.saveStackData.bind(scope.generatorStack);
    }

    const result = fn(data, saveData);
    // 出栈
    if (isGeneratorFunction(scope)) {
        scope.generatorStack.popStack();
    }
    return result;
}

/** 用于保存迭代函数的栈 */
export class GeneratorStack {
    private runnerStack: indexGeneratorStackDecorateData[] = [];
    private yieldBackValues: { value: any }[] = [];
    private running = false;
    private currentIndex = 0;
    private currentStackIndex = 0;

    pushValue(value: any) {
        if (this.running) this.yieldBackValues.push({ value: value });
        this.running = true;
    }
    getValue() {
        const value = this.yieldBackValues[this.currentIndex];
        if (value) {
            this.currentIndex++;
            return value;
        }
        this.currentIndex = 0;
    }

    getStack(): indexGeneratorStackDecorateData {
        const runner = this.runnerStack[this.currentStackIndex];
        if (runner) return runner
        const newRunner = { index: 0 };
        this.runnerStack.push(runner);
        return newRunner;
    }

    popStack() {
        this.currentStackIndex--;
        this.runnerStack.pop();
    }

    saveStackData(key: string, value: any) {
        this.runnerStack[this.runnerStack.length - 1][key] = value;
    }
}

export const enum ScopeType {
    Program = 'program',
    Function = 'function',
    Block = 'block',
    Loop = 'loop',
    Switch = 'switch',
}

export class Scope {
    public type: ScopeType;
    public parent: Scope | null;
    public content: Record<string, any> = {};
    public prefix = '';
    // 标记为侵入式Scope，不用再多构造啦
    public invasive = false;
    public generator: boolean;
    public generatorStack: GeneratorStack;

    /** 在顶层绑定运行的 runner */
    public runner?: Runner;

    constructor(type: ScopeType, parent?: Scope, generator: boolean = false) {
        this.type = type;
        this.parent = parent || null;
        this.generator = generator;
        this.generatorStack = new GeneratorStack();
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

    public $const(raw_name: string, value: unknown, ) {
        const name = this.prefix + raw_name;
        const $var = this.content[name];
        if (!$var || ($var instanceof ScopeVar && $var.reDeclare)) {
            this.content[name] = new ScopeVar('const', value);
            return true;
        }
        return false;
    }

    public $var(raw_name: string, value: any, canReDeclare: boolean = false) {
        const name = this.prefix + raw_name;
        const scope: Scope = this.getClosetSomeScope(ScopeType.Function);
        const $var = scope.content[name];
        if (!$var) {
            this.content[name] = new ScopeVar('var', value, canReDeclare);
            return true;
            // #fix var 不允许重复声明
        } else if ($var instanceof ScopeVar) {
            $var.$set(value);
            return true;
        }
        return false;
    }
    public $declar(kind: Kind, raw_name: any, value: any, canReDeclare: boolean = false) {
        return ({
            var: () => this.$var(raw_name, value, canReDeclare),
            let: () => this.$let(raw_name, value),
            const: () => this.$const(raw_name, value),
        })[kind]();
    }
    /**
     * 获取最近的某种类型作用域
     */
    public getClosetSomeScope(type: ScopeType) {
        let scope: Scope = this;
        while (scope.parent !== null && scope.type !== type) {
            scope = scope.parent;
        }
        return scope;
    }
}

/**
 * 获取当前顶层作用域的 runner
 */
export const getScopeRunner = (scope: Scope) => {
    return scope.getClosetSomeScope(ScopeType.Program).runner;
}