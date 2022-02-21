const types = {
    num: "num",
    string: "string",
    name: 'name',
    bracketL: "[",
    bracketR: "]",
    braceL: "{",
    braceR: "}",
    parenL: "(",
    parenR: ")",
    comma: ",",
    semi: ";",
    colon: ":",
    dot: ".",
    question: "?",
    eq: "=",
    logicalOR: "||",
    logicalAND: "&&",
    bitwiseOR: "|",
    bitwiseXOR: "^",
    bitwiseAND: "&",
    plusMin: "+/-",
    incDec: "++/--",
    equality: "==/!=/===/!==",
    relational: "</>/<=/>=",
    prefix: "!/~",
    modulo: "%",
    star: "*",
    assign: "_=",
    _break: "break",
    _continue: "continue",
    _else: "else",
    _for: "for",
    _function: "function",
    _if: "if",
    _return: "return",
    _var: "var",
    _const: "const",
    _let: "let",
    _import: "import",
    _null: "null",
    _true: "true",
    _false: "false",
}
const emptyChar = ['\n', '\t', ' ', '\r']
const isEmptyChar = (char) => emptyChar.includes(char)
const tt = types
const keywords = [tt._break, tt._continue, tt._else, tt._for, tt._function, tt._if, tt._return, tt._const, tt._let, tt._null, tt._false, tt._true]
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
}
// 标记器
class Token {
    pos = 0
    input = ''
    tokens = []
    constructor(input) {
        this.input = input
    }
    scan() {
        while (1) {
            const code = this.input[this.pos]
            if (isEmptyChar(code)) {
                this.pos++
                continue
            }
            if (!code) break
            code.match(/[a-zA-Z]/) ? this.readWord() : this.getTokenFromCode(code.charCodeAt())
        }
        return this.tokens
    }
    getTokenFromCode(code) {
        switch (code) {
            case 46: return this.readToken_dot()
            case 40: ++this.pos; return this.ftk(tt.parenL)
            case 41: ++this.pos; return this.ftk(tt.parenR)
            case 59: ++this.pos; return this.ftk(tt.semi)
            case 63: ++this.pos; return this.ftk(tt.question)
            case 44: ++this.pos; return this.ftk(tt.comma)
            case 91: ++this.pos; return this.ftk(tt.bracketL)
            case 93: ++this.pos; return this.ftk(tt.bracketR)
            case 123: ++this.pos; return this.ftk(tt.braceL)
            case 125: ++this.pos; return this.ftk(tt.braceR)
            case 58: ++this.pos; return this.ftk(tt.colon)
            case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: return this.readNumber(code)
            case 34: case 39: return this.readString(code)
            case 37: case 42: return this.readToken_mult_modulo_exp(code)
            case 124: case 38: return this.readToken_pipe_amp(code)
            case 43: case 45: return this.readToken_plus_min(code)
            case 60: case 62: return this.readToken_lt_gt(code)
            case 61: case 33: return this.readToken_eq_excl(code)
        }
        throw new Error(this.pos, "Unexpected character '" + code + "'")
    }
    readWord() {
        let word = ''
        let code;
        while (code = this.input[this.pos]) {
            if (code.match(/[a-zA-Z0-9]/)) {
                word += code
                this.pos++
            }
            else break;
        }
        let type = tt.name
        if (keywords.includes(word)) {
            type = word
        }
        return this.ftk(type, word)
    }
    readToken_lt_gt(code) {
        let next = this.gnc()
        let size = 1
        if (next === code) {
            size = code === 62 && this.gnc(2) === 62 ? 3 : 2
            if (this.gnc(size) === 61) return this.finishOp(tt.assign, size + 1)
            return this.finishOp(tt.bitShift, size)
        }
        if (next === 61) size = 2
        return this.finishOp(tt.relational, size)
    }
    readNumber(code) {
        let val = 0
        while ((code > 47 && code < 58) || code === 46) {
            val++
            code = this.gnc(val)
        }
        return this.finishOp(tt.num, parseFloat(val))
    }
    readString(code) {
        const startCode = code;
        let out = ''
        code = this.gnc()
        while (code !== startCode) {
            out += this.input[++this.pos]
            code = this.gnc()
        }
        this.pos = this.pos + 2
        return this.ftk(tt.string, out)
    }
    readToken_mult_modulo_exp(code) {
        let next = this.gnc()
        const tokentype = code === 42 ? tt.star : tt.modulo
        if (next === 61) {
            pos++
            return this.finishOp(tt.assign, 2)
        }
        return this.finishOp(tokentype, 1)
    }
    finishOp(type, size) {
        let str = this.input.substring(this.pos, this.pos + size)
        this.pos += size
        return this.ftk(type, str)
    }
    ftk(type, value) {
        this.tokens.push({ type, value })
    }
    readToken_pipe_amp(code) {
        let next = this.gnc()
        if (next === code) return this.finishOp(code === 124 ? tt.logicalOR : tt.logicalAND, 2)
        return this.finishOp(code === 124 ? tt.bitwiseOR : tt.bitwiseAND, 1)
    }
    readToken_dot() {
        let next = this.gnc()
        if (next >= 48 && next <= 57) return this.readNumber(true)
        this.pos++
        return this.ftk(tt.dot)
    }
    gnc(size = 1) {
        return this.input[this.pos + size].charCodeAt()
    }
    readToken_plus_min(code) {
        let next = this.gnc()
        if (next === code) return this.finishOp(tt.incDec, 2)
        if (next === 61) return this.finishOp(tt.assign, 2)
        return this.finishOp(tt.plusMin, 1)
    }
    readToken_eq_excl(code) {
        let next = this.gnc()
        if (next === 61) return this.finishOp(tt.equality, this.gnc(2) === 61 ? 3 : 2)
        return this.finishOp(code === 61 ? tt.eq : tt.prefix, 1)
    }
}
// 解析器
class Parser {
    tokens = []
    index = -1
    constructor(tokens) {
        this.tokens = tokens
    }
    parse() {
        let node = { body: [] }
        this.nextToken()
        return this.parseTopLevel(node)
    }
    eat(type) {
        if (this.type === type) {
            this.next()
            return true
        } else {
            return false
        }
    }
    nextToken() {
        this.token = this.tokens[++this.index]
        this.type = this.token?.type
        this.value = this.token?.value
    }
    finishNode(node, type) {
        node.type = type
        return node
    }
    parseTopLevel(node) {
        while (this.type) {
            let stmt = this.parseStatement(true)
            node.body.push(stmt)
        }
        return this.finishNode(node, "Program")
    }
    parseStatement(topLevel) {
        let node = {}
        switch (this.type) {
            case tt._break: case tt._continue: return this.parseBreakContinueStatement(node, this.value)
            case tt._for: return this.parseForStatement(node)
            case tt._function: {
                this.next()
                return this.parseFunctionStatement(node)
            }
            case tt._if: return this.parseIfStatement(node)
            case tt._return: return this.parseReturnStatement(node)
            case tt._const: case tt._var: case tt._let: return this.parseVarStatement(node, this.value)
            case tt.braceL: return this.parseBlock(node)
            case tt.semi: return this.parseEmptyStatement(node)
            default:
                let expr = this.parseExpression()
                return this.parseExpressionStatement(node, expr)
        }
    }
    parseExpressionStatement(node, expr) {
        node.expression = expr
        this.eat(tt.semi) || this.next()
        return this.finishNode(node, "ExpressionStatement")
    }
    parseEmptyStatement(node) {
        this.next()
        return this.finishNode(node, "EmptyStatement")
    }
    parseVarStatement(node, kind) {
        this.next()
        this.parseVar(node, false, kind)
        this.eat(tt.semi)
        return this.finishNode(node, "VariableDeclaration")
    }
    parseVar(node, isFor, kind) {
        node.declarations = []
        node.kind = kind
        for (; ;) {
            let decl = {}
            this.parseVarId(decl, kind)
            if (this.eat(tt.eq)) {
                decl.init = this.parseMaybeAssign(isFor)
            } else {
                decl.init = null
            }
            node.declarations.push(this.finishNode(decl, "VariableDeclarator"))
            if (!this.eat(tt.comma)) break
        }
        return node
    }
    parseIdent() {
        let node = {}
        if (this.type === tt.name) {
            node.name = this.value
        } else {
            this.raise('无法处理的token')
        }
        this.next()
        return this.finishNode(node, "Identifier")
    }
    parseMaybeAssign(forInit) {
        let left = this.parseMaybeConditional(forInit)
        if (this.isAssign()) {
            let node = {}
            node.operator = this.value
            node.left = left
            this.next()
            node.right = this.parseMaybeAssign(forInit)
            return this.finishNode(node, "AssignmentExpression")
        }
        return left
    }
    parseMaybeConditional(forInit) {
        let expr = this.parseExprOps(forInit)
        if (this.eat(tt.question)) {
            let node = {}
            node.test = expr
            node.consequent = this.parseMaybeAssign()
            this.expect(tt.colon)
            node.alternate = this.parseMaybeAssign(forInit)
            return this.finishNode(node, "ConditionalExpression")
        }
        return expr
    }
    parseExprOps(forInit) {
        let expr = this.parseMaybeUnary(forInit)
        return this.parseExprOp(expr, -1, forInit)
    }
    parseExprOp(left, minPrec, forInit) {
        let prec = priority[this.type]
        if (prec && (!forInit)) {
            if (prec > minPrec) {
                let logical = this.type === tt.logicalOR || this.type === tt.logicalAND
                let coalesce = this.type === tt.coalesce
                let op = this.value
                this.next()
                let right = this.parseExprOp(this.parseMaybeUnary(forInit), prec, forInit)
                let node = this.buildBinary(left, right, op, logical || coalesce)
                return this.parseExprOp(node, minPrec, forInit)
            }
        }
        return left
    }
    buildBinary(left, right, op, logical) {
        let node = {}
        node.left = left
        node.operator = op
        node.right = right
        return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression")
    }
    parseMaybeUnary(forInit) {
        let expr
        if ([tt.incDec, tt.prefix, tt.plusMin].includes(this.type)) {
            let node = {}, update = this.type === tt.incDec
            node.operator = this.value
            node.prefix = true
            this.next()
            node.argument = this.parseMaybeUnary(forInit)
            expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression")
        } else {
            expr = this.parseExprSubscripts(forInit)
            while (this.type === tt.incDec) {
                let node = {}
                node.operator = this.value
                node.prefix = false
                node.argument = expr
                this.next()
                expr = this.finishNode(node, "UpdateExpression")
            }
        }
        return expr
    }
    parseExprSubscripts(forInit) {
        let expr = this.parseExprAtom(forInit)
        let result = this.parseSubscripts(expr, false, forInit)
        return result
    }
    parseSubscript(base, noCalls) {
        let computed = this.eat(tt.bracketL)
        if (computed || this.eat(tt.dot)) {
            let node = {}
            node.object = base
            if (computed) {
                node.property = this.parseExpression()
                this.expect(tt.bracketR)
            } else {
                node.property = this.parseIdent()
            }
            node.computed = !!computed
            base = this.finishNode(node, "MemberExpression")
        } else if (!noCalls && this.eat(tt.parenL)) {
            let exprList = this.parseExprList(tt.parenR)
            let node = {}
            node.callee = base
            node.arguments = exprList
            base = this.finishNode(node, "CallExpression")
        }
        return base
    }
    parseExpression(forInit) {
        let expr = this.parseMaybeAssign(forInit)
        if (this.type === tt.comma) {
            let node = {}
            node.expressions = [expr]
            while (this.eat(tt.comma)) node.expressions.push(this.parseMaybeAssign(forInit))
            return this.finishNode(node, "SequenceExpression")
        }
        return expr
    }
    parseSubscripts(base, noCalls) {
        while (true) {
            let element = this.parseSubscript(base, noCalls)
            if (element === base) {
                return element
            }
            base = element
        }
    }
    parseLiteral(value) {
        let node = this.finishNode({ value: (this.type === tt.string ? String : parseFloat)(value) }, "Literal")
        this.next()
        return node
    }
    parseExprAtom(forInit) {
        let node = {}
        switch (this.type) {
            case tt.name:
                return this.parseIdent(false)
            case tt.num: case tt.string:
                return this.parseLiteral(this.value)
            case tt._null: case tt._true: case tt._false:
                node.value = this.type === tt._null ? null : this.type === tt._true
                node.raw = this.type
                this.next()
                return this.finishNode(node, "Literal")
            case tt.parenL:
                return this.parseParenAndDistinguishExpression(forInit)
            case tt.bracketL:
                this.next()
                node.elements = this.parseExprList(tt.bracketR)
                return this.finishNode(node, "ArrayExpression")
            case tt.braceL:
                return this.parseObj(false)
            case tt._function:
                this.next()
                return this.parseFunctionStatement(node)
            default:
                this.raise('无法处理的token' + this.type)
        }
    }
    parseObj(isPattern) {
        let node = {}, first = true
        node.properties = []
        this.next()
        while (!this.eat(tt.braceR)) {
            if (!first) {
                this.expect(tt.comma)
            } else first = false
            const prop = this.parseProperty(isPattern)
            node.properties.push(prop)
        }
        return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression")
    }
    parseProperty() {
        let prop = {}
        prop.key = this.type === tt.num || this.type === tt.string ? this.parseExprAtom() : this.parseIdent()
        if (this.eat(tt.colon)) {
            prop.value = this.parseMaybeAssign(false)
            prop.kind = "init"
        } else this.raise('属性名后无效属性')
        return this.finishNode(prop, "Property")
    }
    parseParenAndDistinguishExpression() {
        return this.parseParenExpression()
    }
    parseVarId(decl) {
        decl.id = this.parseIdent()
    }
    parseReturnStatement(node) {
        this.next()
        if (this.eat(tt.semi) || this.eat(tt.braceR)) node.argument = null
        else node.argument = this.parseExpression();
        return this.finishNode(node, "ReturnStatement")
    }
    parseIfStatement(node) {
        this.next()
        node.test = this.parseParenExpression()
        node.consequent = this.parseStatement()
        node.alternate = this.eat(tt._else) ? this.parseStatement() : null
        return this.finishNode(node, "IfStatement")
    }
    parseParenExpression() {
        this.expect(tt.parenL)
        let val = this.parseExpression()
        this.expect(tt.parenR)
        return val
    }
    parseFunctionStatement(node) {
        node.id = this.type !== tt.name ? null : this.parseIdent()
        this.parseFunctionParams(node)
        this.parseFunctionBody(node)
        return this.finishNode(node, "FunctionDeclaration")
    }
    parseFunctionParams(node) {
        this.expect(tt.parenL)
        node.params = this.parseBindingList(tt.parenR, false)
    }
    parseFunctionBody(node) {
        node.body = this.parseBlock(undefined)
    }
    parseBlock(node = {}) {
        node.body = []
        this.expect(tt.braceL)
        while (this.type && this.type !== tt.braceR) {
            let stmt = this.parseStatement()
            node.body.push(stmt)
        }
        this.next()
        return this.finishNode(node, "BlockStatement")
    }
    parseBindingList(close) {
        let elts = [], first = true
        while (!this.eat(close)) {
            if (first) first = false
            else this.expect(tt.comma)
            let elem = this.parseMaybeDefault()
            elts.push(elem)
        }
        return elts
    }
    parseExprList(close) {
        let elts = [], first = true
        while (!this.eat(close)) {
            if (!first) {
                this.expect(tt.comma)
            } else first = false
            elts.push(this.parseMaybeAssign(false))
        }
        return elts
    }
    parseMaybeDefault(left) {
        left = left || this.parseIdent()
        if (!this.eat(tt.eq)) return left
        let node = {}
        node.left = left
        node.right = this.parseMaybeAssign()
        return this.finishNode(node, "AssignmentPattern")
    }
    parseBreakContinueStatement(node, keyword) {
        let isBreak = keyword === "break"
        this.next()
        return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement")
    }
    next() {
        this.nextToken()
    }
    parseForStatement(node) {
        this.next()
        this.expect(tt.parenL)
        if (this.type === tt.semi) {
            return this.parseFor(node, null)
        }
        if ([tt._const, tt._var, tt._let].includes(this.type)) {
            let init = { kind: this.type };
            this.next()
            this.parseVar(init, true, init.kind)
            this.finishNode(init, "VariableDeclaration")
            return this.parseFor(node, init)
        }
        let init = this.parseExpression(true);
        return this.parseFor(node, init)
    }
    isAssign() {
        return [tt.assign, tt.eq].includes(this.type)
    }
    raise(str) {
        throw new Error(str)
    }
    parseFor(node, init) {
        node.init = init
        this.expect(tt.semi)
        node.test = this.type === tt.semi ? null : this.parseExpression()
        this.expect(tt.semi)
        node.update = this.type === tt.parenR ? null : this.parseExpression()
        this.expect(tt.parenR)
        this.parseBlock(node)
        return this.finishNode(node, "ForStatement")
    }
    expect(type) {
        this.eat(type) || this.raise('unsupport type' + type)
    }
}
let anonymousId = 0;
const BREAK_SINGAL = {}
const CONTINUE_SINGAL = {}
const RETURN_SINGAL = { result: undefined }

const evaluate_map = {
    Program: (program, scope) => {
        for (const node of program.body) evaluate(node, scope)
    },
    Identifier: (node, scope) => {
        if (node.name === 'undefined') { return undefined } // 奇怪的问题
        const $var = scope.$find(node.name)
        if ($var) { return $var.$get() }
        else { throw `[Error] 变量'${node.name}' 未定义` }
    },
    Literal: (node) => {
        return node.value
    },
    BlockStatement: (block, scope) => {
        let new_scope = scope.invasived ? scope : new Scope('block', scope)
        for (const node of block.body) {
            const result = evaluate(node, new_scope)
            if (result === BREAK_SINGAL
                || result === CONTINUE_SINGAL
                || result === RETURN_SINGAL) {
                return result
            }
        }
    },
    EmptyStatement: () => { },
    ExpressionStatement: (node, scope) => {
        evaluate(node.expression, scope)
    },
    ReturnStatement: (node, scope) => {
        RETURN_SINGAL.result = node.argument ? evaluate(node.argument, scope) : undefined
        return RETURN_SINGAL
    },
    BreakStatement: () => {
        return BREAK_SINGAL
    },
    ContinueStatement: () => {
        return CONTINUE_SINGAL
    },

    IfStatement: (node, scope) => {
        if (evaluate(node.test, scope))
            return evaluate(node.consequent, scope)
        else if (node.alternate)
            return evaluate(node.alternate, scope)
    },
    ForStatement: (node, scope) => {
        for (
            const new_scope = new Scope('loop', scope),
            init_val = node.init ? evaluate(node.init, new_scope) : null;
            node.test ? evaluate(node.test, new_scope) : true;
            node.update ? evaluate(node.update, new_scope) : void (0)
        ) {
            const result = evaluate({ type: 'BlockStatement', body: node.body }, new_scope)
            if (result === BREAK_SINGAL) { break }
            else if (result === CONTINUE_SINGAL) { continue }
            else if (result === RETURN_SINGAL) { return result }
        }
    },
    FunctionDeclaration: (node, scope) => {
        const func = evaluate_map.FunctionExpression(node, scope)
        const { name: func_name } = node.id || { name: 'anonymous' + anonymousId++ }
        if (!scope.$const(func_name, func)) {
            throw `[Error] ${func_name} 重复定义`
        }
        return func
    },
    VariableDeclaration: (node, scope) => {
        const kind = node.kind
        for (const declartor of node.declarations) {
            const { name } = declartor.id
            const value = declartor.init ? evaluate(declartor.init, scope) : undefined
            if (!scope.$declar(kind, name, value)) {
                throw `[Error] ${name} 重复定义`
            }
        }
    },
    ThisExpression: (node, scope) => {
        const this_val = scope.$find('this')
        return this_val ? this_val.$get() : null
    },
    ArrayExpression: (node, scope) => {
        return node.elements.map(item => evaluate(item, scope))
    },
    ObjectExpression: (node, scope) => {
        const object = {}
        for (const property of node.properties) {
            const kind = property.kind
            let key;
            if (property.key.type === 'Literal') {
                key = evaluate(property.key, scope)
            } else if (property.key.type === 'Identifier') {
                key = property.key.name
            }
            const value = evaluate(property.value, scope)
            if (kind === 'init') {
                object[key] = value
            } else if (kind === 'set') {
                Object.defineProperty(object, key, { set: value });
            } else if (kind === 'get') {
                Object.defineProperty(object, key, { get: value });
            }
        }
        return object
    },

    FunctionExpression: (node, scope) => {
        return function (...args) {
            const new_scope = new Scope('function', scope)
            new_scope.invasived = true
            for (let i = 0; i < node.params.length; i++) {
                const { name } = node.params[i]
                new_scope.$const(name, args[i])
            }
            new_scope.$const('this', this)
            new_scope.$const('arguments', arguments)
            const result = evaluate(node.body, new_scope)
            if (result === RETURN_SINGAL) {
                return result.result
            }
        }
    },
    UnaryExpression: (node, scope) => {
        return ({
            '-': () => - evaluate(node.argument, scope),
            '+': () => + evaluate(node.argument, scope),
            '!': () => !evaluate(node.argument, scope),
            '~': () => ~evaluate(node.argument, scope),
        })[node.operator]()
    },
    UpdateExpression: (node, scope) => {
        const { prefix } = node
        let $var
        if (node.argument.type === 'Identifier') {
            const { name } = node.argument
            $var = scope.$find(name)
            if (!$var) throw `${name} 未定义`
        } else if (node.argument.type === 'MemberExpression') {
            const argument = node.argument
            const object = evaluate(argument.object, scope)
            let property = argument.computed
                ? evaluate(argument.property, scope)
                : (argument.property).name
            $var = {
                $set(value) {
                    object[property] = value
                    return true
                },
                $get() {
                    return object[property]
                }
            }
        }
        return ({
            '--': v => ($var.$set(v - 1), (prefix ? --v : v--)),
            '++': v => ($var.$set(v + 1), (prefix ? ++v : v++))
        })[node.operator](evaluate(node.argument, scope))
    },

    BinaryExpression: (node, scope) => {
        return ({
            "==": (a, b) => a == b,
            "!=": (a, b) => a != b,
            "===": (a, b) => a === b,
            "!==": (a, b) => a !== b,
            "<": (a, b) => a < b,
            "<=": (a, b) => a <= b,
            ">": (a, b) => a > b,
            ">=": (a, b) => a >= b,
            "<<": (a, b) => a << b,
            ">>": (a, b) => a >> b,
            ">>>": (a, b) => a >>> b,
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "*": (a, b) => a * b,
            "/": (a, b) => a / b,
            "%": (a, b) => a % b,
            "|": (a, b) => a | b,
            "^": (a, b) => a ^ b,
            "&": (a, b) => a & b,
            "in": (a, b) => a in b,
            "instanceof": (a, b) => a instanceof b
        })[node.operator](evaluate(node.left, scope), evaluate(node.right, scope))
    },

    AssignmentExpression: (node, scope) => {
        let $var
        if (node.left.type === 'Identifier') {
            const { name } = node.left
            const $var_or_not = scope.$find(name)
            if (!$var_or_not) throw `${name} 未定义`
            $var = $var_or_not
        } else if (node.left.type === 'MemberExpression') {
            const left = node.left
            const object = evaluate(left.object, scope)
            let property = left.computed
                ? evaluate(left.property, scope)
                : (left.property).name
            $var = {
                $set(value) {
                    object[property] = value
                    return true
                },
                $get() {
                    return object[property]
                }
            }
        } else { throw `如果出现在这里，那就说明有问题了` }

        return ({
            "=": (v) => ($var.$set(v), v),
            "+=": (v) => ($var.$set($var.$get() + v), $var.$get()),
            "-=": (v) => ($var.$set($var.$get() - v), $var.$get()),
            "*=": (v) => ($var.$set($var.$get() * v), $var.$get()),
            "/=": (v) => ($var.$set($var.$get() / v), $var.$get()),
            "%=": (v) => ($var.$set($var.$get() % v), $var.$get()),
            "|=": (v) => ($var.$set($var.$get() | v), $var.$get()),
            "^=": (v) => ($var.$set($var.$get() ^ v), $var.$get()),
            "&=": (v) => ($var.$set($var.$get() & v), $var.$get())
        })[node.operator](evaluate(node.right, scope))
    },

    LogicalExpression: (node, scope) => {
        return ({
            "||": () => evaluate(node.left, scope) || evaluate(node.right, scope),
            "&&": () => evaluate(node.left, scope) && evaluate(node.right, scope),
        })[node.operator]()
    },

    MemberExpression: (node, scope) => {
        const { object, property, computed } = node
        if (computed) {
            return evaluate(object, scope)[evaluate(property, scope)]
        } else {
            return evaluate(object, scope)[(property).name]
        }
    },

    ConditionalExpression: (node, scope) => {
        return (
            evaluate(node.test, scope)
                ? evaluate(node.consequent, scope)
                : evaluate(node.alternate, scope)
        )
    },

    CallExpression: (node, scope) => {
        const func = evaluate(node.callee, scope)
        const args = node.arguments.map(arg => evaluate(arg, scope))
        if (node.callee.type === 'MemberExpression') {
            const object = evaluate(node.callee.object, scope)
            return func.apply(object, args)
        } else {
            const this_val = scope.$find('this')
            return func.apply(this_val ? this_val.$get() : null, args)
        }
    },
    NewExpression: (node, scope) => {
        const func = evaluate(node.callee, scope)
        const args = node.arguments.map(arg => evaluate(arg, scope))
        return new (func.bind.apply(func, [null].concat(args)))
    },
    SequenceExpression: (node, scope) => {
        let last
        for (const expr of node.expressions) {
            last = evaluate(expr, scope)
        }
        return last
    },
}

class ScopeVar {
    value
    kind
    constructor(kind, value) {
        this.value = value
        this.kind = kind
    }
    $set(value) {
        if (this.value === 'const') {
            return false
        } else {
            this.value = value
            return true
        }
    }
    $get() {
        return this.value
    }
}

class PropVar {
    object
    property
    constructor(object, property) {
        this.object = object
        this.property = property
    }
    $set(value) { this.object[this.property] = value; return true }
    $get() { return this.object[this.property] }
    $delete() { delete this.object[this.property] }
}

class Scope {
    content
    parent
    type
    invasived
    prefix = '@'
    constructor(type, parent) {
        this.type = type
        this.parent = parent || null
        this.content = {}
        this.invasived = false
    }

    $find(raw_name) {
        const name = this.prefix + raw_name
        if (this.content.hasOwnProperty(name)) {
            return this.content[name]
        } else if (this.parent) {
            return this.parent.$find(raw_name)
        } else {
            return null
        }
    }

    $let(raw_name, value) {
        const name = this.prefix + raw_name
        const $var = this.content[name]
        if (!$var) {
            this.content[name] = new ScopeVar('let', value)
            return true
        } else { return false }
    }

    $const(raw_name, value) {
        const name = this.prefix + raw_name
        const $var = this.content[name]
        if (!$var) {
            this.content[name] = new ScopeVar('const', value)
            return true
        } else { return false }
    }

    $var(raw_name, value) {
        const name = this.prefix + raw_name
        let scope = this

        while (scope.parent !== null && scope.type !== 'function') {
            scope = scope.parent
        }

        const $var = scope.content[name]
        if (!$var) {
            this.content[name] = new ScopeVar('var', value)
            return true
        } else { return false }
    }
    $declar(kind, raw_name, value) {
        return ({
            'var': () => this.$var(raw_name, value),
            'let': () => this.$let(raw_name, value),
            'const': () => this.$const(raw_name, value)
        })[kind]()
    }
}

const evaluate = (node, scope, arg) => {
    const _evalute = evaluate_map[node.type] || ((node) => { console.log('不支持的node' + JSON.stringify(node, null, 2)) })
    return _evalute(node, scope, arg)
}
// 导出默认对象
const default_api = {
    console,
    setTimeout,
    setInterval,
    clearTimeout,
    clearInterval,
    encodeURI,
    encodeURIComponent,
    decodeURI,
    decodeURIComponent,
    Infinity,
    NaN,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    Object,
    Boolean,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    Number,
    Math,
    Date,
    String,
    RegExp,
    Array,
    JSON,
    Promise
}
const run = (code, append_api = {}) => {
    const scope = new Scope('block')
    scope.$const('this', this)
    for (const name of Object.getOwnPropertyNames(default_api)) {
        scope.$const(name, default_api[name])
    }
    for (const name of Object.getOwnPropertyNames(append_api)) {
        scope.$const(name, append_api[name])
    }
    const $exports = {}
    scope.$const('exports', $exports)
    const token = new Token(code);
    token.scan()
    const parser = new Parser(token.tokens)
    // console.log(JSON.stringify(parser.parse(), null, 2))
    evaluate(parser.parse(), scope)
    return $exports;
}
export default run;