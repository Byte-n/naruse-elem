const types = {
    num: 'num',
    string: 'string',
    name: 'name',
    bracketL: '[',
    bracketR: ']',
    braceL: '{',
    braceR: '}',
    parenL: '(',
    parenR: ')',
    comma: ',',
    semi: ';',
    colon: ':',
    dot: '.',
    question: '?',
    eq: '=',
    logicalOR: '||',
    logicalAND: '&&',
    bitwiseOR: '|',
    bitwiseXOR: '^',
    bitwiseAND: '&',
    plusMin: '+/-',
    incDec: '++/--',
    equality: '==/!=/===/!==',
    relational: '</>/<=/>=',
    prefix: '!/~',
    modulo: '%',
    star: '*',
    slash: '/',
    assign: '_=',
    _break: 'break',
    _continue: 'continue',
    _else: 'else',
    _for: 'for',
    _function: 'function',
    _if: 'if',
    _return: 'return',
    _var: 'var',
    _const: 'const',
    _let: 'let',
    _in: 'in',
    _instanceof: 'instanceof',
    _new: 'new',
    _import: 'import',
    _null: 'null',
    _true: 'true',
    _false: 'false',
    _void: 'void',
    _typeof: 'typeof',
    _delete: 'delete',
    _try: 'try',
    _catch: 'catch',
    _throw: 'throw',
    _finally: '_finally',
};
const emptyChar = ['\n', '\t', ' ', '\r'];
const isEmptyChar = (char) => emptyChar.includes(char);
const tt = types;
const keywords = [
    tt._break,
    tt._continue,
    tt._else,
    tt._for,
    tt._function,
    tt._if,
    tt._return,
    tt._const,
    tt._let,
    tt._null,
    tt._false,
    tt._true,
    tt._var,
    tt._in,
    tt._instanceof,
    tt._new,
];
const priority = {
    [tt.logicalOR]: 1,
    [tt.logicalAND]: 2,
    [tt.bitwiseOR]: 3,
    [tt.bitwiseAND]: 5,
    [tt.equality]: 6,
    [tt.relational]: 7,
    [tt.plusMin]: 9,
    [tt.modulo]: 10,
    [tt.star]: 10,
    [tt.slash]: 10,
    [tt._in]: 7,
    [tt._instanceof]: 7,
};
// 标记器
class Token {
    constructor (input) {
        this.input = input;
        this.pos = 0;
        this.tokens = [];
    }
    scan () {
        while (1) {
            const code = this.input[this.pos];
            if (isEmptyChar(code)) {
                this.pos++;
                continue;
            }
            if (!code) break;
            code.match(/[a-zA-Z_$]/) ? this.readWord() : this.getTokenFromCode(code.charCodeAt());
        }
        return this.tokens;
    }
    getTokenFromCode (code) {
        switch (code) {
            case 46: return this.readToken_dot();
            case 40: ++this.pos; return this.ftk(tt.parenL);
            case 41: ++this.pos; return this.ftk(tt.parenR);
            case 59: ++this.pos; return this.ftk(tt.semi);
            case 63: ++this.pos; return this.ftk(tt.question);
            case 44: ++this.pos; return this.ftk(tt.comma);
            case 91: ++this.pos; return this.ftk(tt.bracketL);
            case 93: ++this.pos; return this.ftk(tt.bracketR);
            case 123: ++this.pos; return this.ftk(tt.braceL);
            case 125: ++this.pos; return this.ftk(tt.braceR);
            case 58: ++this.pos; return this.ftk(tt.colon);
            case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: return this.readNumber(code);
            case 34: case 39: return this.readString(code);
            case 37: case 42: case 47: return this.readToken_mult_modulo_exp(code);
            case 124: case 38: return this.readToken_pipe_amp(code);
            case 43: case 45: return this.readToken_plus_min(code);
            case 60: case 62: return this.readToken_lt_gt(code);
            case 61: case 33: return this.readToken_eq_excl(code);
        }
        ++this.pos;
        console.warn(this.pos, `Unexpected character '${code}'`);
    }
    readWord () {
        let word = '';
        let code;
        while (code = this.input[this.pos]) {
            if (code.match(/[a-zA-Z0-9\_\$]/)) {
                word += code;
                this.pos++;
            } else break;
        }
        let type = tt.name;
        if (keywords.includes(word)) {
            type = word;
        }
        return this.ftk(type, word);
    }
    readToken_lt_gt (code) {
        const next = this.gnc();
        let size = 1;
        if (next === code) {
            size = code === 62 && this.gnc(2) === 62 ? 3 : 2;
            if (this.gnc(size) === 61) return this.finishOp(tt.assign, size + 1);
            return this.finishOp(tt.bitShift, size);
        }
        if (next === 61) size = 2;
        return this.finishOp(tt.relational, size);
    }
    readNumber (code) {
        let val = 0;
        while ((code > 47 && code < 58) || code === 46) {
            val++;
            code = this.gnc(val);
        }
        return this.finishOp(tt.num, parseFloat(val));
    }
    readString (code) {
        const startCode = code;
        let out = '';
        code = this.gnc();
        while (code !== startCode) {
            out += this.input[++this.pos];
            code = this.gnc();
        }
        this.pos = this.pos + 2;
        return this.ftk(tt.string, out);
    }
    readToken_mult_modulo_exp (code) {
        const next = this.gnc();
        const operator = String.fromCharCode(code);
        const tokentype = priority[operator] && operator;
        if (next === 61) {
            this.pos++;
            return this.finishOp(tt.assign, 2);
        }
        return this.finishOp(tokentype, 1);
    }
    finishOp (type, size) {
        const str = this.input.substring(this.pos, this.pos + size);
        this.pos += size;
        return this.ftk(type, str);
    }
    ftk (type, value) {
        this.tokens.push({ type, value, start: this.pos, end: this.pos + ((value && value.length) || type.length) });
    }
    readToken_pipe_amp (code) {
        const next = this.gnc();
        if (next === code) return this.finishOp(code === 124 ? tt.logicalOR : tt.logicalAND, 2);
        return this.finishOp(code === 124 ? tt.bitwiseOR : tt.bitwiseAND, 1);
    }
    readToken_dot () {
        const next = this.gnc();
        if (next >= 48 && next <= 57) return this.readNumber(true);
        this.pos++;
        return this.ftk(tt.dot);
    }
    gnc (size = 1) {
        return this.input[this.pos + size].charCodeAt();
    }
    readToken_plus_min (code) {
        const next = this.gnc();
        if (next === code) return this.finishOp(tt.incDec, 2);
        if (next === 61) return this.finishOp(tt.assign, 2);
        return this.finishOp(tt.plusMin, 1);
    }
    readToken_eq_excl (code) {
        const next = this.gnc();
        if (next === 61) return this.finishOp(tt.equality, this.gnc(2) === 61 ? 3 : 2);
        return this.finishOp(code === 61 ? tt.eq : tt.prefix, 1);
    }
}
// 解析器
export class Parser {
    constructor (code) {
        this.tokens = (new Token(code)).scan();
        this.index = -1;
    }
    parse () {
        const node = { body: [] };
        this.nextToken();
        return this.parseTopLevel(node);
    }
    eat (type) {
        if (this.type === type) {
            this.next();
            return true;
        }
        return false;
    }
    nextToken () {
        this.token = this.tokens[++this.index];
        this.type = this.token && this.token.type;
        this.value = this.token && this.token.value;
        this.start = this.token && this.token.start;
        this.end = this.token && this.token.end;
    }
    finishNode (node, type) {
        node.type = type;
        node.start = this.start || 0;
        node.end = this.end || 0;
        return node;
    }
    parseTopLevel (node) {
        while (this.type) {
            const stmt = this.parseStatement(true);
            node.body.push(stmt);
        }
        return this.finishNode(node, 'Program');
    }
    parseStatement (topLevel) {
        const node = {};
        switch (this.type) {
            case tt._break: case tt._continue: return this.parseBreakContinueStatement(node, this.value);
            case tt._for: return this.parseForStatement(node);
            case tt._function: {
                this.next();
                return this.parseFunctionStatement(node);
            }
            case tt._if: return this.parseIfStatement(node);
            case tt._return: return this.parseReturnStatement(node);
            case tt._const: case tt._var: case tt._let: return this.parseVarStatement(node, this.value);
            case tt.braceL: return this.parseBlock(node);
            case tt.semi: return this.parseEmptyStatement(node);
            default: {
                const expr = this.parseExpression();
                return this.parseExpressionStatement(node, expr);
            }
        }
    }
    parseExpressionStatement (node, expr) {
        node.expression = expr;
        this.eat(tt.semi);
        return this.finishNode(node, 'ExpressionStatement');
    }
    parseEmptyStatement (node) {
        this.next();
        return this.finishNode(node, 'EmptyStatement');
    }
    parseVarStatement (node, kind) {
        this.next();
        this.parseVar(node, false, kind);
        this.eat(tt.semi);
        return this.finishNode(node, 'VariableDeclaration');
    }
    parseVar (node, isFor, kind) {
        node.declarations = [];
        node.kind = kind;
        for (; ;) {
            const decl = {};
            this.parseVarId(decl, kind);
            if (this.eat(tt.eq)) {
                decl.init = this.parseMaybeAssign(isFor);
            } else {
                decl.init = null;
            }
            node.declarations.push(this.finishNode(decl, 'VariableDeclarator'));
            if (!this.eat(tt.comma)) break;
        }
        return node;
    }
    parseIdent () {
        const node = {};
        if (this.type === tt.name) {
            node.name = this.value;
        } else {
            this.raise('无法处理的token');
        }
        this.next();
        return this.finishNode(node, 'Identifier');
    }
    parseMaybeAssign (forInit) {
        const left = this.parseMaybeConditional(forInit);
        if (this.isAssign()) {
            const node = {};
            node.operator = this.value;
            node.left = left;
            this.next();
            node.right = this.parseMaybeAssign(forInit);
            return this.finishNode(node, 'AssignmentExpression');
        }
        return left;
    }
    parseMaybeConditional (forInit) {
        const expr = this.parseExprOps(forInit);
        if (this.eat(tt.question)) {
            const node = {};
            node.test = expr;
            node.consequent = this.parseMaybeAssign();
            this.expect(tt.colon);
            node.alternate = this.parseMaybeAssign(forInit);
            return this.finishNode(node, 'ConditionalExpression');
        }
        return expr;
    }
    parseExprOps (forInit) {
        const expr = this.parseMaybeUnary(forInit);
        return this.parseExprOp(expr, -1, forInit);
    }
    parseExprOp (left, minPrec, forInit) {
        const prec = priority[this.type];
        if (prec && (!forInit)) {
            if (prec > minPrec) {
                const logical = this.type === tt.logicalOR || this.type === tt.logicalAND;
                const coalesce = this.type === tt.coalesce;
                const op = this.value;
                this.next();
                const right = this.parseExprOp(this.parseMaybeUnary(forInit), prec, forInit);
                const node = this.buildBinary(left, right, op, logical || coalesce);
                return this.parseExprOp(node, minPrec, forInit);
            }
        }
        return left;
    }
    buildBinary (left, right, op, logical) {
        const node = {};
        node.left = left;
        node.operator = op;
        node.right = right;
        return this.finishNode(node, logical ? 'LogicalExpression' : 'BinaryExpression');
    }
    parseMaybeUnary (forInit) {
        let expr;
        if ([tt.incDec, tt.prefix, tt.plusMin].includes(this.type)) {
            const node = {}; const update = this.type === tt.incDec;
            node.operator = this.value;
            node.prefix = true;
            this.next();
            node.argument = this.parseMaybeUnary(forInit);
            expr = this.finishNode(node, update ? 'UpdateExpression' : 'UnaryExpression');
        } else {
            expr = this.parseExprSubscripts(forInit);
            while (this.type === tt.incDec) {
                const node = {};
                node.operator = this.value;
                node.prefix = false;
                node.argument = expr;
                this.next();
                expr = this.finishNode(node, 'UpdateExpression');
            }
        }
        return expr;
    }
    parseExprSubscripts (forInit) {
        const expr = this.parseExprAtom(forInit);
        const result = this.parseSubscripts(expr, false, forInit);
        return result;
    }
    parseSubscript (base, noCalls) {
        const computed = this.eat(tt.bracketL);
        if (computed || this.eat(tt.dot)) {
            const node = {};
            node.object = base;
            if (computed) {
                node.property = this.parseExpression();
                this.expect(tt.bracketR);
            } else {
                node.property = this.parseIdent();
            }
            node.computed = !!computed;
            base = this.finishNode(node, 'MemberExpression');
        } else if (!noCalls && this.eat(tt.parenL)) {
            const exprList = this.parseExprList(tt.parenR);
            const node = {};
            node.callee = base;
            node.arguments = exprList;
            base = this.finishNode(node, 'CallExpression');
        }
        return base;
    }
    parseExpression (forInit) {
        const expr = this.parseMaybeAssign(forInit);
        if (this.type === tt.comma) {
            const node = {};
            node.expressions = [expr];
            while (this.eat(tt.comma)) node.expressions.push(this.parseMaybeAssign(forInit));
            return this.finishNode(node, 'SequenceExpression');
        }
        return expr;
    }
    parseSubscripts (base, noCalls) {
        while (true) {
            const element = this.parseSubscript(base, noCalls);
            if (element === base) {
                return element;
            }
            base = element;
        }
    }
    parseLiteral (value) {
        const node = this.finishNode({ value: (this.type === tt.string ? String : parseFloat)(value) }, 'Literal');
        this.next();
        return node;
    }
    parseExprAtom (forInit) {
        const node = {};
        switch (this.type) {
            case tt.name:
                return this.parseIdent(false);
            case tt.num: case tt.string:
                return this.parseLiteral(this.value);
            case tt._null: case tt._true: case tt._false:
                node.value = this.type === tt._null ? null : this.type === tt._true;
                node.raw = this.type;
                this.next();
                return this.finishNode(node, 'Literal');
            case tt.parenL:
                return this.parseParenAndDistinguishExpression(forInit);
            case tt.bracketL:
                this.next();
                node.elements = this.parseExprList(tt.bracketR);
                return this.finishNode(node, 'ArrayExpression');
            case tt.braceL:
                return this.parseObj(false);
            case tt._function:
                this.next();
                return this.parseFunctionStatement(node);
            case tt._new:
                return this.parseNew();
            default:
                this.raise(`无法处理的token${this.type}`);
        }
    }
    parseNew () {
        const node = {};
        this.next();
        node.callee = this.parseSubscripts(this.parseExprAtom(), true);
        if (this.eat(tt.parenL)) node.arguments = this.parseExprList(tt.parenR);
        else node.arguments = [];
        return this.finishNode(node, 'NewExpression');
    }
    parseObj (isPattern) {
        const node = {}; let first = true;
        node.properties = [];
        this.next();
        while (!this.eat(tt.braceR)) {
            if (!first) {
                this.expect(tt.comma);
            } else first = false;
            const prop = this.parseProperty(isPattern);
            node.properties.push(prop);
        }
        return this.finishNode(node, isPattern ? 'ObjectPattern' : 'ObjectExpression');
    }
    parseProperty () {
        const prop = {};
        prop.key = this.type === tt.num || this.type === tt.string ? this.parseExprAtom() : this.parseIdent();
        if (this.eat(tt.colon)) {
            prop.value = this.parseMaybeAssign(false);
            prop.kind = 'init';
        } else this.raise('属性名后无效属性');
        return this.finishNode(prop, 'Property');
    }
    parseParenAndDistinguishExpression () {
        return this.parseParenExpression();
    }
    parseVarId (decl) {
        decl.id = this.parseIdent();
    }
    parseReturnStatement (node) {
        this.next();
        if (this.eat(tt.semi) || this.type === tt.braceR) node.argument = null;
        else node.argument = this.parseExpression();
        return this.finishNode(node, 'ReturnStatement');
    }
    parseIfStatement (node) {
        this.next();
        node.test = this.parseParenExpression();
        node.consequent = this.parseStatement();
        node.alternate = this.eat(tt._else) ? this.parseStatement() : null;
        return this.finishNode(node, 'IfStatement');
    }
    parseParenExpression () {
        this.expect(tt.parenL);
        const val = this.parseExpression();
        this.expect(tt.parenR);
        return val;
    }
    parseFunctionStatement (node) {
        node.id = this.type !== tt.name ? null : this.parseIdent();
        this.parseFunctionParams(node);
        this.parseFunctionBody(node);
        return this.finishNode(node, 'FunctionDeclaration');
    }
    parseFunctionParams (node) {
        this.expect(tt.parenL);
        node.params = this.parseBindingList(tt.parenR, false);
    }
    parseFunctionBody (node) {
        node.body = this.parseBlock(undefined);
    }
    parseBlock (node = {}) {
        node.body = [];
        // 支持单行代码块
        const hasL = this.eat(tt.braceL);
        while (this.type && this.type !== tt.braceR) {
            const stmt = this.parseStatement();
            node.body.push(stmt);
            if (!hasL) break;
        }
        this.next();
        return this.finishNode(node, 'BlockStatement');
    }
    parseBindingList (close) {
        const elts = []; let first = true;
        while (!this.eat(close)) {
            if (first) first = false;
            else this.expect(tt.comma);
            const elem = this.parseMaybeDefault();
            elts.push(elem);
        }
        return elts;
    }
    parseExprList (close) {
        const elts = []; let first = true;
        while (!this.eat(close)) {
            if (!first) {
                this.expect(tt.comma);
            } else first = false;
            elts.push(this.parseMaybeAssign(false));
        }
        return elts;
    }
    parseMaybeDefault (left) {
        left = left || this.parseIdent();
        if (!this.eat(tt.eq)) return left;
        const node = {};
        node.left = left;
        node.right = this.parseMaybeAssign();
        return this.finishNode(node, 'AssignmentPattern');
    }
    parseBreakContinueStatement (node, keyword) {
        const isBreak = keyword === 'break';
        this.next();
        return this.finishNode(node, isBreak ? 'BreakStatement' : 'ContinueStatement');
    }
    next () {
        this.nextToken();
    }
    parseForStatement (node) {
        this.next();
        this.expect(tt.parenL);
        if (this.type === tt.semi) {
            return this.parseFor(node, null);
        }
        if ([tt._const, tt._var, tt._let].includes(this.type)) {
            const init = { kind: this.type };
            this.next();
            this.parseVar(init, true, init.kind);
            this.finishNode(init, 'VariableDeclaration');
            return this.parseFor(node, init);
        }
        const init = this.parseExpression(true);
        return this.parseFor(node, init);
    }
    isAssign () {
        return [tt.assign, tt.eq].includes(this.type);
    }
    raise (str) {
        throw new Error(str);
    }
    parseFor (node, init) {
        node.init = init;
        this.expect(tt.semi);
        node.test = this.type === tt.semi ? null : this.parseExpression();
        this.expect(tt.semi);
        node.update = this.type === tt.parenR ? null : this.parseExpression();
        this.expect(tt.parenR);
        this.parseBlock(node);
        return this.finishNode(node, 'ForStatement');
    }
    expect (type) {
        this.eat(type) || this.raise(`unsupport type${type}`);
    }
}

export const parse = (code) => {
    return (new Parser(code)).parse();
};