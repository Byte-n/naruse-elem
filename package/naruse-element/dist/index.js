var e={79:e=>{function t(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=79,e.exports=t}},t={};function s(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,s),i.exports}s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{const e=new class{constructor(){this.listeners={}}on(e,t){void 0===this.listeners[e]&&(this.listeners[e]=[]),this.listeners[e].push(t)}off(e,t){if(void 0===this.listeners[e])return;const s=this.listeners[e].indexOf(t);-1!==s&&this.listeners[e].splice(s,1)}emit(e,...t){void 0!==this.listeners[e]&&this.listeners[e].forEach((e=>{e(...t)}))}};class t{constructor(e,t){this.state={},this.componentId=t,((e,t)=>{const s=Object.keys(e);s.includes("render")||console.error("naruse-fake-react-runtime 必须要一个render函数"),s.forEach((s=>{"constructor"===s&&(t.init=e[s].bind(t)),"function"==typeof e[s]?t[s]=e[s].bind(t):t[s]=e[s]}))})(e,this),e.constructor&&e.constructor.call(this),this._isFristRender=!0,this._isUpdating=!1}_render(){return[this.render&&this.render()||{},()=>{this._isFristRender?this.componentDidMount&&this.componentDidMount():this.componentDidUpdate&&this.componentDidUpdate(),this._isFristRender=!1}]}setState(t){t!==this.state&&(this.state={...this.state,...t},!this._isUpdating&&Promise.resolve().then((()=>{e.emit(`update-${this.componentId}`),this._isUpdating=!1})),this._isUpdating=!0)}}const r=function(e,t){const s=[];if(t.id===e)return s;if(t.childNodes&&t.childNodes.length){for(let r=0;r<t.childNodes.length;r++)if(t.childNodes[r].id===e)return s.push(r),s;for(let n=0;n<t.childNodes.length;n++){const i=r(e,t.childNodes[n]);if(i){s.push(n);for(let e=0;e<i.length;e++)s.push(i[e]);return s}}}},n=function(e,t){const s=e;return"object"!=typeof e?e:(s.id||(s.id=(e=>{let t=Date.now().toString(36);return t+=Math.random().toString(36).slice(2,16),t})()),s.parentId=t,Array.isArray(s.childNodes)&&s.childNodes.forEach((e=>n(e,s.id))),s)},i={tap:"onClick",longPress:"onLongClick",input:"onChange",blur:"onBlur",focus:"onFocus"},o=function(e,t){let s=!1;if(e.stopPropagetion=()=>{s=!0},!(e&&e.target&&e.target.id))return;const n=function(e,t){const s=r(e,t);if(!s)return;if(!s.length)return t;let n=t;return s.forEach((e=>{n=n.childNodes[e]})),n}(e.target.id,t);if(!n)return;const{type:a}=e,p=i[a];p||console.log("[naruse-element][warn]",`${p}事件不支持`);const h=n[p];h&&"function"==typeof h&&(console.log("[naruse-element][debugger]",`元素${n.naruseType}:触发${p}事件`),h.call(n,e)),s&&(console.log("[naruse-element][debugger]",`元素${n.naruseType}: 冒泡${p}事件`),o({...e,target:{id:n.parentId}},t))};function a(e){o(e,this.data.node)}const p={props:{code:'exports.render = function () { return h("view", null, "你好") }'},data:{node:{}},methods:{onTap:a,onLongPress:a,onInputInput:a,onInputBlur:a,onInputFocus:a}},h=["\n","\t"," ","\r"],c={num:"num",string:"string",name:"name",bracketL:"[",bracketR:"]",braceL:"{",braceR:"}",parenL:"(",parenR:")",comma:",",semi:";",colon:":",dot:".",question:"?",eq:"=",logicalOR:"||",logicalAND:"&&",bitwiseOR:"|",bitwiseXOR:"^",bitwiseAND:"&",plusMin:"+/-",incDec:"++/--",equality:"==/!=/===/!==",relational:"</>/<=/>=",prefix:"!/~",modulo:"%",star:"*",assign:"_=",_break:"break",_continue:"continue",_else:"else",_for:"for",_function:"function",_if:"if",_return:"return",_var:"var",_const:"const",_let:"let",_import:"import",_null:"null",_true:"true",_false:"false"},l=[c._break,c._continue,c._else,c._for,c._function,c._if,c._return,c._const,c._let,c._null,c._false,c._true,c._var],u={[c.logicalOR]:1,[c.logicalAND]:2,[c.bitwiseOR]:3,[c.bitwiseAND]:5,[c.equality]:6,[c.relational]:7,[c.plusMin]:9,[c.modulo]:10,[c.star]:10};class d{pos=0;input="";tokens=[];constructor(e){this.input=e}scan(){for(;;){const t=this.input[this.pos];if(e=t,h.includes(e))this.pos++;else{if(!t)break;t.match(/[a-zA-Z\_\$]/)?this.readWord():this.getTokenFromCode(t.charCodeAt())}}var e;return this.tokens}getTokenFromCode(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.ftk(c.parenL);case 41:return++this.pos,this.ftk(c.parenR);case 59:return++this.pos,this.ftk(c.semi);case 63:return++this.pos,this.ftk(c.question);case 44:return++this.pos,this.ftk(c.comma);case 91:return++this.pos,this.ftk(c.bracketL);case 93:return++this.pos,this.ftk(c.bracketR);case 123:return++this.pos,this.ftk(c.braceL);case 125:return++this.pos,this.ftk(c.braceR);case 58:return++this.pos,this.ftk(c.colon);case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(e);case 34:case 39:return this.readString(e);case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e)}++this.pos,console.warn(this.pos,"Unexpected character '"+e+"'")}readWord(){let e,t="";for(;(e=this.input[this.pos])&&e.match(/[a-zA-Z0-9\_\$]/);)t+=e,this.pos++;let s=c.name;return l.includes(t)&&(s=t),this.ftk(s,t)}readToken_lt_gt(e){let t=this.gnc(),s=1;return t===e?(s=62===e&&62===this.gnc(2)?3:2,61===this.gnc(s)?this.finishOp(c.assign,s+1):this.finishOp(c.bitShift,s)):(61===t&&(s=2),this.finishOp(c.relational,s))}readNumber(e){let t=0;for(;e>47&&e<58||46===e;)t++,e=this.gnc(t);return this.finishOp(c.num,parseFloat(t))}readString(e){const t=e;let s="";for(e=this.gnc();e!==t;)s+=this.input[++this.pos],e=this.gnc();return this.pos=this.pos+2,this.ftk(c.string,s)}readToken_mult_modulo_exp(e){let t=this.gnc();const s=42===e?c.star:c.modulo;return 61===t?(pos++,this.finishOp(c.assign,2)):this.finishOp(s,1)}finishOp(e,t){let s=this.input.substring(this.pos,this.pos+t);return this.pos+=t,this.ftk(e,s)}ftk(e,t){this.tokens.push({type:e,value:t})}readToken_pipe_amp(e){return this.gnc()===e?this.finishOp(124===e?c.logicalOR:c.logicalAND,2):this.finishOp(124===e?c.bitwiseOR:c.bitwiseAND,1)}readToken_dot(){let e=this.gnc();return e>=48&&e<=57?this.readNumber(!0):(this.pos++,this.ftk(c.dot))}gnc(e=1){return this.input[this.pos+e].charCodeAt()}readToken_plus_min(e){let t=this.gnc();return t===e?this.finishOp(c.incDec,2):61===t?this.finishOp(c.assign,2):this.finishOp(c.plusMin,1)}readToken_eq_excl(e){return 61===this.gnc()?this.finishOp(c.equality,61===this.gnc(2)?3:2):this.finishOp(61===e?c.eq:c.prefix,1)}}class f{tokens=[];index=-1;constructor(e){this.tokens=e}parse(){return this.nextToken(),this.parseTopLevel({body:[]})}eat(e){return this.type===e&&(this.next(),!0)}nextToken(){this.token=this.tokens[++this.index],this.type=this.token&&this.token.type,this.value=this.token&&this.token.value}finishNode(e,t){return e.type=t,e}parseTopLevel(e){for(;this.type;){let t=this.parseStatement(!0);e.body.push(t)}return this.finishNode(e,"Program")}parseStatement(e){let t={};switch(this.type){case c._break:case c._continue:return this.parseBreakContinueStatement(t,this.value);case c._for:return this.parseForStatement(t);case c._function:return this.next(),this.parseFunctionStatement(t);case c._if:return this.parseIfStatement(t);case c._return:return this.parseReturnStatement(t);case c._const:case c._var:case c._let:return this.parseVarStatement(t,this.value);case c.braceL:return this.parseBlock(t);case c.semi:return this.parseEmptyStatement(t);default:let e=this.parseExpression();return this.parseExpressionStatement(t,e)}}parseExpressionStatement(e,t){return e.expression=t,this.eat(c.semi),this.finishNode(e,"ExpressionStatement")}parseEmptyStatement(e){return this.next(),this.finishNode(e,"EmptyStatement")}parseVarStatement(e,t){return this.next(),this.parseVar(e,!1,t),this.eat(c.semi),this.finishNode(e,"VariableDeclaration")}parseVar(e,t,s){for(e.declarations=[],e.kind=s;;){let r={};if(this.parseVarId(r,s),this.eat(c.eq)?r.init=this.parseMaybeAssign(t):r.init=null,e.declarations.push(this.finishNode(r,"VariableDeclarator")),!this.eat(c.comma))break}return e}parseIdent(){let e={};return this.type===c.name?e.name=this.value:this.raise("无法处理的token"),this.next(),this.finishNode(e,"Identifier")}parseMaybeAssign(e){let t=this.parseMaybeConditional(e);if(this.isAssign()){let s={};return s.operator=this.value,s.left=t,this.next(),s.right=this.parseMaybeAssign(e),this.finishNode(s,"AssignmentExpression")}return t}parseMaybeConditional(e){let t=this.parseExprOps(e);if(this.eat(c.question)){let s={};return s.test=t,s.consequent=this.parseMaybeAssign(),this.expect(c.colon),s.alternate=this.parseMaybeAssign(e),this.finishNode(s,"ConditionalExpression")}return t}parseExprOps(e){let t=this.parseMaybeUnary(e);return this.parseExprOp(t,-1,e)}parseExprOp(e,t,s){let r=u[this.type];if(r&&!s&&r>t){let n=this.type===c.logicalOR||this.type===c.logicalAND,i=this.type===c.coalesce,o=this.value;this.next();let a=this.parseExprOp(this.parseMaybeUnary(s),r,s),p=this.buildBinary(e,a,o,n||i);return this.parseExprOp(p,t,s)}return e}buildBinary(e,t,s,r){let n={};return n.left=e,n.operator=s,n.right=t,this.finishNode(n,r?"LogicalExpression":"BinaryExpression")}parseMaybeUnary(e){let t;if([c.incDec,c.prefix,c.plusMin].includes(this.type)){let s={},r=this.type===c.incDec;s.operator=this.value,s.prefix=!0,this.next(),s.argument=this.parseMaybeUnary(e),t=this.finishNode(s,r?"UpdateExpression":"UnaryExpression")}else for(t=this.parseExprSubscripts(e);this.type===c.incDec;){let e={};e.operator=this.value,e.prefix=!1,e.argument=t,this.next(),t=this.finishNode(e,"UpdateExpression")}return t}parseExprSubscripts(e){let t=this.parseExprAtom(e);return this.parseSubscripts(t,!1,e)}parseSubscript(e,t){let s=this.eat(c.bracketL);if(s||this.eat(c.dot)){let t={};t.object=e,s?(t.property=this.parseExpression(),this.expect(c.bracketR)):t.property=this.parseIdent(),t.computed=!!s,e=this.finishNode(t,"MemberExpression")}else if(!t&&this.eat(c.parenL)){let t=this.parseExprList(c.parenR),s={};s.callee=e,s.arguments=t,e=this.finishNode(s,"CallExpression")}return e}parseExpression(e){let t=this.parseMaybeAssign(e);if(this.type===c.comma){let s={};for(s.expressions=[t];this.eat(c.comma);)s.expressions.push(this.parseMaybeAssign(e));return this.finishNode(s,"SequenceExpression")}return t}parseSubscripts(e,t){for(;;){let s=this.parseSubscript(e,t);if(s===e)return s;e=s}}parseLiteral(e){let t=this.finishNode({value:(this.type===c.string?String:parseFloat)(e)},"Literal");return this.next(),t}parseExprAtom(e){let t={};switch(this.type){case c.name:return this.parseIdent(!1);case c.num:case c.string:return this.parseLiteral(this.value);case c._null:case c._true:case c._false:return t.value=this.type===c._null?null:this.type===c._true,t.raw=this.type,this.next(),this.finishNode(t,"Literal");case c.parenL:return this.parseParenAndDistinguishExpression(e);case c.bracketL:return this.next(),t.elements=this.parseExprList(c.bracketR),this.finishNode(t,"ArrayExpression");case c.braceL:return this.parseObj(!1);case c._function:return this.next(),this.parseFunctionStatement(t);default:this.raise("无法处理的token"+this.type)}}parseObj(e){let t={},s=!0;for(t.properties=[],this.next();!this.eat(c.braceR);){s?s=!1:this.expect(c.comma);const r=this.parseProperty(e);t.properties.push(r)}return this.finishNode(t,e?"ObjectPattern":"ObjectExpression")}parseProperty(){let e={};return e.key=this.type===c.num||this.type===c.string?this.parseExprAtom():this.parseIdent(),this.eat(c.colon)?(e.value=this.parseMaybeAssign(!1),e.kind="init"):this.raise("属性名后无效属性"),this.finishNode(e,"Property")}parseParenAndDistinguishExpression(){return this.parseParenExpression()}parseVarId(e){e.id=this.parseIdent()}parseReturnStatement(e){return this.next(),this.eat(c.semi)||this.type===c.braceR?e.argument=null:e.argument=this.parseExpression(),this.finishNode(e,"ReturnStatement")}parseIfStatement(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement(),e.alternate=this.eat(c._else)?this.parseStatement():null,this.finishNode(e,"IfStatement")}parseParenExpression(){this.expect(c.parenL);let e=this.parseExpression();return this.expect(c.parenR),e}parseFunctionStatement(e){return e.id=this.type!==c.name?null:this.parseIdent(),this.parseFunctionParams(e),this.parseFunctionBody(e),this.finishNode(e,"FunctionDeclaration")}parseFunctionParams(e){this.expect(c.parenL),e.params=this.parseBindingList(c.parenR,!1)}parseFunctionBody(e){e.body=this.parseBlock(void 0)}parseBlock(e={}){for(e.body=[],this.expect(c.braceL);this.type&&this.type!==c.braceR;){let t=this.parseStatement();e.body.push(t)}return this.next(),this.finishNode(e,"BlockStatement")}parseBindingList(e){let t=[],s=!0;for(;!this.eat(e);){s?s=!1:this.expect(c.comma);let e=this.parseMaybeDefault();t.push(e)}return t}parseExprList(e){let t=[],s=!0;for(;!this.eat(e);)s?s=!1:this.expect(c.comma),t.push(this.parseMaybeAssign(!1));return t}parseMaybeDefault(e){if(e=e||this.parseIdent(),!this.eat(c.eq))return e;let t={};return t.left=e,t.right=this.parseMaybeAssign(),this.finishNode(t,"AssignmentPattern")}parseBreakContinueStatement(e,t){let s="break"===t;return this.next(),this.finishNode(e,s?"BreakStatement":"ContinueStatement")}next(){this.nextToken()}parseForStatement(e){if(this.next(),this.expect(c.parenL),this.type===c.semi)return this.parseFor(e,null);if([c._const,c._var,c._let].includes(this.type)){let t={kind:this.type};return this.next(),this.parseVar(t,!0,t.kind),this.finishNode(t,"VariableDeclaration"),this.parseFor(e,t)}let t=this.parseExpression(!0);return this.parseFor(e,t)}isAssign(){return[c.assign,c.eq].includes(this.type)}raise(e){throw new Error(e)}parseFor(e,t){return e.init=t,this.expect(c.semi),e.test=this.type===c.semi?null:this.parseExpression(),this.expect(c.semi),e.update=this.type===c.parenR?null:this.parseExpression(),this.expect(c.parenR),this.parseBlock(e),this.finishNode(e,"ForStatement")}expect(e){this.eat(e)||this.raise("unsupport type"+e)}}let m=0;const g={},y={},x={result:void 0},b={Program:(e,t)=>{for(const s of e.body)_(s,t)},Identifier:(e,t)=>{if("undefined"===e.name)return;const s=t.$find(e.name);if(s)return s.$get();throw`[Error] 变量'${e.name}' 未定义`},Literal:e=>e.value,BlockStatement:(e,t)=>{let s=t.invasived?t:new E("block",t);for(const t of e.body){const e=_(t,s);if(e===g||e===y||e===x)return e}},EmptyStatement:()=>{},ExpressionStatement:(e,t)=>{_(e.expression,t)},ReturnStatement:(e,t)=>(x.result=e.argument?_(e.argument,t):void 0,x),BreakStatement:()=>g,ContinueStatement:()=>y,IfStatement:(e,t)=>_(e.test,t)?_(e.consequent,t):e.alternate?_(e.alternate,t):void 0,ForStatement:(e,t)=>{const s=new E("loop",t);for(e.init&&_(e.init,s);!e.test||_(e.test,s);e.update?_(e.update,s):void 0){const t=_({type:"BlockStatement",body:e.body},s);if(t===g)break;if(t!==y&&t===x)return t}},FunctionDeclaration:(e,t)=>{const s=b.FunctionExpression(e,t),{name:r}=e.id||{name:"anonymous"+m++};if(!t.$const(r,s))throw`[Error] ${r} 重复定义`;return s},VariableDeclaration:(e,t)=>{const s=e.kind;for(const r of e.declarations){const{name:e}=r.id,n=r.init?_(r.init,t):void 0;if(!t.$declar(s,e,n))throw`[Error] ${e} 重复定义`}},ThisExpression:(e,t)=>{const s=t.$find("this");return s?s.$get():null},ArrayExpression:(e,t)=>e.elements.map((e=>_(e,t))),ObjectExpression:(e,t)=>{const s={};for(const r of e.properties){const e=r.kind;let n;"Literal"===r.key.type?n=_(r.key,t):"Identifier"===r.key.type&&(n=r.key.name);const i=_(r.value,t);"init"===e?s[n]=i:"set"===e?Object.defineProperty(s,n,{set:i}):"get"===e&&Object.defineProperty(s,n,{get:i})}return s},FunctionExpression:(e,t)=>function(...s){const r=new E("function",t);r.invasived=!0;for(let t=0;t<e.params.length;t++){const{name:n}=e.params[t];r.$const(n,s[t])}r.$const("this",this),r.$const("arguments",arguments);const n=_(e.body,r);if(n===x)return n.result},UnaryExpression:(e,t)=>({"-":()=>-_(e.argument,t),"+":()=>+_(e.argument,t),"!":()=>!_(e.argument,t),"~":()=>~_(e.argument,t)}[e.operator]()),UpdateExpression:(e,t)=>{const{prefix:s}=e;let r;if("Identifier"===e.argument.type){const{name:s}=e.argument;if(r=t.$find(s),!r)throw`${s} 未定义`}else if("MemberExpression"===e.argument.type){const s=e.argument,n=_(s.object,t);let i=s.computed?_(s.property,t):s.property.name;r={$set:e=>(n[i]=e,!0),$get:()=>n[i]}}return{"--":e=>(r.$set(e-1),s?--e:e--),"++":e=>(r.$set(e+1),s?++e:e++)}[e.operator](_(e.argument,t))},BinaryExpression:(e,t)=>({"==":(e,t)=>e==t,"!=":(e,t)=>e!=t,"===":(e,t)=>e===t,"!==":(e,t)=>e!==t,"<":(e,t)=>e<t,"<=":(e,t)=>e<=t,">":(e,t)=>e>t,">=":(e,t)=>e>=t,"+":(e,t)=>e+t,"-":(e,t)=>e-t,"*":(e,t)=>e*t,"/":(e,t)=>e/t,"%":(e,t)=>e%t,"|":(e,t)=>e|t,"^":(e,t)=>e^t,"&":(e,t)=>e&t,in:(e,t)=>e in t,instanceof:(e,t)=>e instanceof t}[e.operator](_(e.left,t),_(e.right,t))),AssignmentExpression:(e,t)=>{let s;if("Identifier"===e.left.type){const{name:r}=e.left,n=t.$find(r);if(!n)throw`${r} 未定义`;s=n}else{if("MemberExpression"!==e.left.type)throw"如果出现在这里，那就说明有问题了";{const r=e.left,n=_(r.object,t);let i=r.computed?_(r.property,t):r.property.name;s={$set:e=>(n[i]=e,!0),$get:()=>n[i]}}}return{"=":e=>(s.$set(e),e),"+=":e=>(s.$set(s.$get()+e),s.$get()),"-=":e=>(s.$set(s.$get()-e),s.$get()),"*=":e=>(s.$set(s.$get()*e),s.$get()),"/=":e=>(s.$set(s.$get()/e),s.$get()),"%=":e=>(s.$set(s.$get()%e),s.$get()),"|=":e=>(s.$set(s.$get()|e),s.$get()),"^=":e=>(s.$set(s.$get()^e),s.$get()),"&=":e=>(s.$set(s.$get()&e),s.$get())}[e.operator](_(e.right,t))},LogicalExpression:(e,t)=>({"||":()=>_(e.left,t)||_(e.right,t),"&&":()=>_(e.left,t)&&_(e.right,t)}[e.operator]()),MemberExpression:(e,t)=>{const{object:s,property:r,computed:n}=e;return n?_(s,t)[_(r,t)]:_(s,t)[r.name]},ConditionalExpression:(e,t)=>_(e.test,t)?_(e.consequent,t):_(e.alternate,t),CallExpression:(e,t)=>{const s=_(e.callee,t),r=e.arguments.map((e=>_(e,t)));if("MemberExpression"===e.callee.type){const n=_(e.callee.object,t);return s.apply(n,r)}{const e=t.$find("this");return s.apply(e?e.$get():null,r)}},NewExpression:(e,t)=>{const s=_(e.callee,t),r=e.arguments.map((e=>_(e,t)));return new(s.bind.apply(s,[null].concat(r)))},SequenceExpression:(e,t)=>{let s;for(const r of e.expressions)s=_(r,t);return s}};class k{value;kind;constructor(e,t){this.value=t,this.kind=e}$set(e){return"const"!==this.value&&(this.value=e,!0)}$get(){return this.value}}class E{content;parent;type;invasived;prefix="";constructor(e,t){this.type=e,this.parent=t||null,this.content={},this.invasived=!1}$find(e){const t=this.prefix+e;return this.content.hasOwnProperty(t)?this.content[t]:this.parent?this.parent.$find(e):null}$let(e,t){const s=this.prefix+e;return!this.content[s]&&(this.content[s]=new k("let",t),!0)}$const(e,t){const s=this.prefix+e;return!this.content[s]&&(this.content[s]=new k("const",t),!0)}$var(e,t){const s=this.prefix+e;let r=this;for(;null!==r.parent&&"function"!==r.type;)r=r.parent;return!r.content[s]&&(this.content[s]=new k("var",t),!0)}$declar(e,t,s){return{var:()=>this.$var(t,s),let:()=>this.$let(t,s),const:()=>this.$const(t,s)}[e]()}}const _=(e,t,s)=>{const r=b[e.type]||(e=>{console.log("不支持的node"+JSON.stringify(e,null,2))});return r(e,t,s)},$={console,setTimeout,setInterval,clearTimeout,clearInterval,encodeURI,encodeURIComponent,decodeURI,decodeURIComponent,Infinity:1/0,NaN:NaN,isFinite,isNaN,parseFloat,parseInt,Object,Boolean,Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError,Number,Math,Date,String,RegExp,Array,JSON,Promise};function v(e,t){for(var s=0;s<t.length;s++){var r=t[s];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const N={_classCallCheck:function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},_defineProperties:v,_createClass:function(e,t,s){return t&&v(e.prototype,t),s&&v(e,s),Object.defineProperty(e,"prototype",{writable:!1}),e}},S={text:(e,t)=>({content:t?t[0]:""})},O=(e,t,...s)=>{let r={};return S[e]&&(r=S[e](t,s)),s=(s=s.flat&&s.flat(1)||s).map((e=>"string"==typeof e||"number"==typeof e?{naruseType:"text",content:e}:e)),{naruseType:e,...t,childNodes:s,...r}},R=e=>new RegExp(e);let w=1;const I=function(r,i){if(this.props.code===this.code)return;console.log("[naruse-element] didUpdate 更新"),this.code=this.props.code;const o=this.$page.requireList||{},a=((e,t={})=>{const s=new E("block");s.$const("this",void 0);for(const e of Object.getOwnPropertyNames($))s.$const(e,$[e]);for(const e of Object.getOwnPropertyNames(t))s.$const(e,t[e]);const r={};s.$const("exports",r);const n=new d(e);n.scan();const i=new f(n.tokens);return _(i.parse(),s),r})(this.props.code,{...N,h:O,require:s(79),my,getApp,$createReg:R,...o});this.naruseComponentId=w++;const p=new t(a,this.naruseComponentId),[h,c]=p._render();this.setData({node:n(h,null)},(()=>{c()})),this.reRenderCallBack=()=>{console.log("[naruse-element] 重新渲染");const[e,t]=p._render();this.setData({node:n(e,null)},t)},e.on(`update-${this.naruseComponentId}`,this.reRenderCallBack)};Component({mixins:[{...p,didMount(){if(console.log("[naruse-element] didMount 装载"),this.props.code)try{I.call(this)}catch(e){console.error("[naruse-element] 初始化失败",e)}},didUpdate(){try{I.call(this)}catch(e){console.error("[naruse-element] 更新失败",e)}},didUnmount(){console.log("[naruse-element] didUnmount 卸载"),e.off(`update-${this.naruseComponentId}`,this.reRenderCallBack)}}]})})();