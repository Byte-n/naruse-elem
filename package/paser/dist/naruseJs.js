var e={d:(t,s)=>{for(var r in s)e.o(s,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:s[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{Z:()=>x});const s=["\n","\t"," ","\r"],r={num:"num",string:"string",name:"name",bracketL:"[",bracketR:"]",braceL:"{",braceR:"}",parenL:"(",parenR:")",comma:",",semi:";",colon:":",dot:".",question:"?",eq:"=",logicalOR:"||",logicalAND:"&&",bitwiseOR:"|",bitwiseXOR:"^",bitwiseAND:"&",plusMin:"+/-",incDec:"++/--",equality:"==/!=/===/!==",relational:"</>/<=/>=",prefix:"!/~",modulo:"%",star:"*",assign:"_=",_break:"break",_continue:"continue",_else:"else",_for:"for",_function:"function",_if:"if",_return:"return",_var:"var",_const:"const",_let:"let",_import:"import",_null:"null",_true:"true",_false:"false"},i=[r._break,r._continue,r._else,r._for,r._function,r._if,r._return,r._const,r._let,r._null,r._false,r._true],n={[r.logicalOR]:1,[r.logicalAND]:2,[r.bitwiseOR]:3,[r.bitwiseAND]:5,[r.equality]:6,[r.relational]:7,[r.plusMin]:9,[r.modulo]:10,[r.star]:10};class a{pos=0;input="";tokens=[];constructor(e){this.input=e}scan(){for(;;){const t=this.input[this.pos];if(e=t,s.includes(e))this.pos++;else{if(!t)break;t.match(/[a-zA-Z]/)?this.readWord():this.getTokenFromCode(t.charCodeAt())}}var e;return this.tokens}getTokenFromCode(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.ftk(r.parenL);case 41:return++this.pos,this.ftk(r.parenR);case 59:return++this.pos,this.ftk(r.semi);case 63:return++this.pos,this.ftk(r.question);case 44:return++this.pos,this.ftk(r.comma);case 91:return++this.pos,this.ftk(r.bracketL);case 93:return++this.pos,this.ftk(r.bracketR);case 123:return++this.pos,this.ftk(r.braceL);case 125:return++this.pos,this.ftk(r.braceR);case 58:return++this.pos,this.ftk(r.colon);case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(e);case 34:case 39:return this.readString(e);case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e)}throw new Error(this.pos,"Unexpected character '"+e+"'")}readWord(){let e,t="";for(;(e=this.input[this.pos])&&e.match(/[a-zA-Z0-9]/);)t+=e,this.pos++;let s=r.name;return i.includes(t)&&(s=t),this.ftk(s,t)}readToken_lt_gt(e){let t=this.gnc(),s=1;return t===e?(s=62===e&&62===this.gnc(2)?3:2,61===this.gnc(s)?this.finishOp(r.assign,s+1):this.finishOp(r.bitShift,s)):(61===t&&(s=2),this.finishOp(r.relational,s))}readNumber(e){let t=0;for(;e>47&&e<58||46===e;)t++,e=this.gnc(t);return this.finishOp(r.num,parseFloat(t))}readString(e){const t=e;let s="";for(e=this.gnc();e!==t;)s+=this.input[++this.pos],e=this.gnc();return this.pos=this.pos+2,this.ftk(r.string,s)}readToken_mult_modulo_exp(e){let t=this.gnc();const s=42===e?r.star:r.modulo;return 61===t?(pos++,this.finishOp(r.assign,2)):this.finishOp(s,1)}finishOp(e,t){let s=this.input.substring(this.pos,this.pos+t);return this.pos+=t,this.ftk(e,s)}ftk(e,t){this.tokens.push({type:e,value:t})}readToken_pipe_amp(e){return this.gnc()===e?this.finishOp(124===e?r.logicalOR:r.logicalAND,2):this.finishOp(124===e?r.bitwiseOR:r.bitwiseAND,1)}readToken_dot(){let e=this.gnc();return e>=48&&e<=57?this.readNumber(!0):(this.pos++,this.ftk(r.dot))}gnc(e=1){return this.input[this.pos+e].charCodeAt()}readToken_plus_min(e){let t=this.gnc();return t===e?this.finishOp(r.incDec,2):61===t?this.finishOp(r.assign,2):this.finishOp(r.plusMin,1)}readToken_eq_excl(e){return 61===this.gnc()?this.finishOp(r.equality,61===this.gnc(2)?3:2):this.finishOp(61===e?r.eq:r.prefix,1)}}class o{tokens=[];index=-1;constructor(e){this.tokens=e}parse(){return this.nextToken(),this.parseTopLevel({body:[]})}eat(e){return this.type===e&&(this.next(),!0)}nextToken(){this.token=this.tokens[++this.index],this.type=this.token?.type,this.value=this.token?.value}finishNode(e,t){return e.type=t,e}parseTopLevel(e){for(;this.type;){let t=this.parseStatement(!0);e.body.push(t)}return this.finishNode(e,"Program")}parseStatement(e){let t={};switch(this.type){case r._break:case r._continue:return this.parseBreakContinueStatement(t,this.value);case r._for:return this.parseForStatement(t);case r._function:return this.next(),this.parseFunctionStatement(t);case r._if:return this.parseIfStatement(t);case r._return:return this.parseReturnStatement(t);case r._const:case r._var:case r._let:return this.parseVarStatement(t,this.value);case r.braceL:return this.parseBlock(t);case r.semi:return this.parseEmptyStatement(t);default:let e=this.parseExpression();return this.parseExpressionStatement(t,e)}}parseExpressionStatement(e,t){return e.expression=t,this.eat(r.semi)||this.next(),this.finishNode(e,"ExpressionStatement")}parseEmptyStatement(e){return this.next(),this.finishNode(e,"EmptyStatement")}parseVarStatement(e,t){return this.next(),this.parseVar(e,!1,t),this.eat(r.semi),this.finishNode(e,"VariableDeclaration")}parseVar(e,t,s){for(e.declarations=[],e.kind=s;;){let i={};if(this.parseVarId(i,s),this.eat(r.eq)?i.init=this.parseMaybeAssign(t):i.init=null,e.declarations.push(this.finishNode(i,"VariableDeclarator")),!this.eat(r.comma))break}return e}parseIdent(){let e={};return this.type===r.name?e.name=this.value:this.raise("无法处理的token"),this.next(),this.finishNode(e,"Identifier")}parseMaybeAssign(e){let t=this.parseMaybeConditional(e);if(this.isAssign()){let s={};return s.operator=this.value,s.left=t,this.next(),s.right=this.parseMaybeAssign(e),this.finishNode(s,"AssignmentExpression")}return t}parseMaybeConditional(e){let t=this.parseExprOps(e);if(this.eat(r.question)){let s={};return s.test=t,s.consequent=this.parseMaybeAssign(),this.expect(r.colon),s.alternate=this.parseMaybeAssign(e),this.finishNode(s,"ConditionalExpression")}return t}parseExprOps(e){let t=this.parseMaybeUnary(e);return this.parseExprOp(t,-1,e)}parseExprOp(e,t,s){let i=n[this.type];if(i&&!s&&i>t){let n=this.type===r.logicalOR||this.type===r.logicalAND,a=this.type===r.coalesce,o=this.value;this.next();let p=this.parseExprOp(this.parseMaybeUnary(s),i,s),h=this.buildBinary(e,p,o,n||a);return this.parseExprOp(h,t,s)}return e}buildBinary(e,t,s,r){let i={};return i.left=e,i.operator=s,i.right=t,this.finishNode(i,r?"LogicalExpression":"BinaryExpression")}parseMaybeUnary(e){let t;if([r.incDec,r.prefix,r.plusMin].includes(this.type)){let s={},i=this.type===r.incDec;s.operator=this.value,s.prefix=!0,this.next(),s.argument=this.parseMaybeUnary(e),t=this.finishNode(s,i?"UpdateExpression":"UnaryExpression")}else for(t=this.parseExprSubscripts(e);this.type===r.incDec;){let e={};e.operator=this.value,e.prefix=!1,e.argument=t,this.next(),t=this.finishNode(e,"UpdateExpression")}return t}parseExprSubscripts(e){let t=this.parseExprAtom(e);return this.parseSubscripts(t,!1,e)}parseSubscript(e,t){let s=this.eat(r.bracketL);if(s||this.eat(r.dot)){let t={};t.object=e,s?(t.property=this.parseExpression(),this.expect(r.bracketR)):t.property=this.parseIdent(),t.computed=!!s,e=this.finishNode(t,"MemberExpression")}else if(!t&&this.eat(r.parenL)){let t=this.parseExprList(r.parenR),s={};s.callee=e,s.arguments=t,e=this.finishNode(s,"CallExpression")}return e}parseExpression(e){let t=this.parseMaybeAssign(e);if(this.type===r.comma){let s={};for(s.expressions=[t];this.eat(r.comma);)s.expressions.push(this.parseMaybeAssign(e));return this.finishNode(s,"SequenceExpression")}return t}parseSubscripts(e,t){for(;;){let s=this.parseSubscript(e,t);if(s===e)return s;e=s}}parseLiteral(e){let t=this.finishNode({value:(this.type===r.string?String:parseFloat)(e)},"Literal");return this.next(),t}parseExprAtom(e){let t={};switch(this.type){case r.name:return this.parseIdent(!1);case r.num:case r.string:return this.parseLiteral(this.value);case r._null:case r._true:case r._false:return t.value=this.type===r._null?null:this.type===r._true,t.raw=this.type,this.next(),this.finishNode(t,"Literal");case r.parenL:return this.parseParenAndDistinguishExpression(e);case r.bracketL:return this.next(),t.elements=this.parseExprList(r.bracketR),this.finishNode(t,"ArrayExpression");case r.braceL:return this.parseObj(!1);case r._function:return this.next(),this.parseFunctionStatement(t);default:this.raise("无法处理的token"+this.type)}}parseObj(e){let t={},s=!0;for(t.properties=[],this.next();!this.eat(r.braceR);){s?s=!1:this.expect(r.comma);const i=this.parseProperty(e);t.properties.push(i)}return this.finishNode(t,e?"ObjectPattern":"ObjectExpression")}parseProperty(){let e={};return e.key=this.type===r.num||this.type===r.string?this.parseExprAtom():this.parseIdent(),this.eat(r.colon)?(e.value=this.parseMaybeAssign(!1),e.kind="init"):this.raise("属性名后无效属性"),this.finishNode(e,"Property")}parseParenAndDistinguishExpression(){return this.parseParenExpression()}parseVarId(e){e.id=this.parseIdent()}parseReturnStatement(e){return this.next(),this.eat(r.semi)||this.eat(r.braceR)?e.argument=null:e.argument=this.parseExpression(),this.finishNode(e,"ReturnStatement")}parseIfStatement(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement(),e.alternate=this.eat(r._else)?this.parseStatement():null,this.finishNode(e,"IfStatement")}parseParenExpression(){this.expect(r.parenL);let e=this.parseExpression();return this.expect(r.parenR),e}parseFunctionStatement(e){return e.id=this.type!==r.name?null:this.parseIdent(),this.parseFunctionParams(e),this.parseFunctionBody(e),this.finishNode(e,"FunctionDeclaration")}parseFunctionParams(e){this.expect(r.parenL),e.params=this.parseBindingList(r.parenR,!1)}parseFunctionBody(e){e.body=this.parseBlock(void 0)}parseBlock(e={}){for(e.body=[],this.expect(r.braceL);this.type&&this.type!==r.braceR;){let t=this.parseStatement();e.body.push(t)}return this.next(),this.finishNode(e,"BlockStatement")}parseBindingList(e){let t=[],s=!0;for(;!this.eat(e);){s?s=!1:this.expect(r.comma);let e=this.parseMaybeDefault();t.push(e)}return t}parseExprList(e){let t=[],s=!0;for(;!this.eat(e);)s?s=!1:this.expect(r.comma),t.push(this.parseMaybeAssign(!1));return t}parseMaybeDefault(e){if(e=e||this.parseIdent(),!this.eat(r.eq))return e;let t={};return t.left=e,t.right=this.parseMaybeAssign(),this.finishNode(t,"AssignmentPattern")}parseBreakContinueStatement(e,t){let s="break"===t;return this.next(),this.finishNode(e,s?"BreakStatement":"ContinueStatement")}next(){this.nextToken()}parseForStatement(e){if(this.next(),this.expect(r.parenL),this.type===r.semi)return this.parseFor(e,null);if([r._const,r._var,r._let].includes(this.type)){let t={kind:this.type};return this.next(),this.parseVar(t,!0,t.kind),this.finishNode(t,"VariableDeclaration"),this.parseFor(e,t)}let t=this.parseExpression(!0);return this.parseFor(e,t)}isAssign(){return[r.assign,r.eq].includes(this.type)}raise(e){throw new Error(e)}parseFor(e,t){return e.init=t,this.expect(r.semi),e.test=this.type===r.semi?null:this.parseExpression(),this.expect(r.semi),e.update=this.type===r.parenR?null:this.parseExpression(),this.expect(r.parenR),this.parseBlock(e),this.finishNode(e,"ForStatement")}expect(e){this.eat(e)||this.raise("unsupport type"+e)}}let p=0;const h={},c={},u={result:void 0},l={Program:(e,t)=>{for(const s of e.body)m(s,t)},Identifier:(e,t)=>{if("undefined"===e.name)return;const s=t.$find(e.name);if(s)return s.$get();throw`[Error] 变量'${e.name}' 未定义`},Literal:e=>e.value,BlockStatement:(e,t)=>{let s=t.invasived?t:new d("block",t);for(const t of e.body){const e=m(t,s);if(e===h||e===c||e===u)return e}},EmptyStatement:()=>{},ExpressionStatement:(e,t)=>{m(e.expression,t)},ReturnStatement:(e,t)=>(u.result=e.argument?m(e.argument,t):void 0,u),BreakStatement:()=>h,ContinueStatement:()=>c,IfStatement:(e,t)=>m(e.test,t)?m(e.consequent,t):e.alternate?m(e.alternate,t):void 0,ForStatement:(e,t)=>{const s=new d("loop",t);for(e.init&&m(e.init,s);!e.test||m(e.test,s);e.update?m(e.update,s):void 0){const t=m({type:"BlockStatement",body:e.body},s);if(t===h)break;if(t!==c&&t===u)return t}},FunctionDeclaration:(e,t)=>{const s=l.FunctionExpression(e,t),{name:r}=e.id||{name:"anonymous"+p++};if(!t.$const(r,s))throw`[Error] ${r} 重复定义`;return s},VariableDeclaration:(e,t)=>{const s=e.kind;for(const r of e.declarations){const{name:e}=r.id,i=r.init?m(r.init,t):void 0;if(!t.$declar(s,e,i))throw`[Error] ${e} 重复定义`}},ThisExpression:(e,t)=>{const s=t.$find("this");return s?s.$get():null},ArrayExpression:(e,t)=>e.elements.map((e=>m(e,t))),ObjectExpression:(e,t)=>{const s={};for(const r of e.properties){const e=r.kind;let i;"Literal"===r.key.type?i=m(r.key,t):"Identifier"===r.key.type&&(i=r.key.name);const n=m(r.value,t);"init"===e?s[i]=n:"set"===e?Object.defineProperty(s,i,{set:n}):"get"===e&&Object.defineProperty(s,i,{get:n})}return s},FunctionExpression:(e,t)=>function(...s){const r=new d("function",t);r.invasived=!0;for(let t=0;t<e.params.length;t++){const{name:i}=e.params[t];r.$const(i,s[t])}r.$const("this",this),r.$const("arguments",arguments);const i=m(e.body,r);if(i===u)return i.result},UnaryExpression:(e,t)=>({"-":()=>-m(e.argument,t),"+":()=>+m(e.argument,t),"!":()=>!m(e.argument,t),"~":()=>~m(e.argument,t)}[e.operator]()),UpdateExpression:(e,t)=>{const{prefix:s}=e;let r;if("Identifier"===e.argument.type){const{name:s}=e.argument;if(r=t.$find(s),!r)throw`${s} 未定义`}else if("MemberExpression"===e.argument.type){const s=e.argument,i=m(s.object,t);let n=s.computed?m(s.property,t):s.property.name;r={$set:e=>(i[n]=e,!0),$get:()=>i[n]}}return{"--":e=>(r.$set(e-1),s?--e:e--),"++":e=>(r.$set(e+1),s?++e:e++)}[e.operator](m(e.argument,t))},BinaryExpression:(e,t)=>({"==":(e,t)=>e==t,"!=":(e,t)=>e!=t,"===":(e,t)=>e===t,"!==":(e,t)=>e!==t,"<":(e,t)=>e<t,"<=":(e,t)=>e<=t,">":(e,t)=>e>t,">=":(e,t)=>e>=t,"<<":(e,t)=>e<<t,">>":(e,t)=>e>>t,">>>":(e,t)=>e>>>t,"+":(e,t)=>e+t,"-":(e,t)=>e-t,"*":(e,t)=>e*t,"/":(e,t)=>e/t,"%":(e,t)=>e%t,"|":(e,t)=>e|t,"^":(e,t)=>e^t,"&":(e,t)=>e&t,in:(e,t)=>e in t,instanceof:(e,t)=>e instanceof t}[e.operator](m(e.left,t),m(e.right,t))),AssignmentExpression:(e,t)=>{let s;if("Identifier"===e.left.type){const{name:r}=e.left,i=t.$find(r);if(!i)throw`${r} 未定义`;s=i}else{if("MemberExpression"!==e.left.type)throw"如果出现在这里，那就说明有问题了";{const r=e.left,i=m(r.object,t);let n=r.computed?m(r.property,t):r.property.name;s={$set:e=>(i[n]=e,!0),$get:()=>i[n]}}}return{"=":e=>(s.$set(e),e),"+=":e=>(s.$set(s.$get()+e),s.$get()),"-=":e=>(s.$set(s.$get()-e),s.$get()),"*=":e=>(s.$set(s.$get()*e),s.$get()),"/=":e=>(s.$set(s.$get()/e),s.$get()),"%=":e=>(s.$set(s.$get()%e),s.$get()),"|=":e=>(s.$set(s.$get()|e),s.$get()),"^=":e=>(s.$set(s.$get()^e),s.$get()),"&=":e=>(s.$set(s.$get()&e),s.$get())}[e.operator](m(e.right,t))},LogicalExpression:(e,t)=>({"||":()=>m(e.left,t)||m(e.right,t),"&&":()=>m(e.left,t)&&m(e.right,t)}[e.operator]()),MemberExpression:(e,t)=>{const{object:s,property:r,computed:i}=e;return i?m(s,t)[m(r,t)]:m(s,t)[r.name]},ConditionalExpression:(e,t)=>m(e.test,t)?m(e.consequent,t):m(e.alternate,t),CallExpression:(e,t)=>{const s=m(e.callee,t),r=e.arguments.map((e=>m(e,t)));if("MemberExpression"===e.callee.type){const i=m(e.callee.object,t);return s.apply(i,r)}{const e=t.$find("this");return s.apply(e?e.$get():null,r)}},NewExpression:(e,t)=>{const s=m(e.callee,t),r=e.arguments.map((e=>m(e,t)));return new(s.bind.apply(s,[null].concat(r)))},SequenceExpression:(e,t)=>{let s;for(const r of e.expressions)s=m(r,t);return s}};class f{value;kind;constructor(e,t){this.value=t,this.kind=e}$set(e){return"const"!==this.value&&(this.value=e,!0)}$get(){return this.value}}class d{content;parent;type;invasived;prefix="@";constructor(e,t){this.type=e,this.parent=t||null,this.content={},this.invasived=!1}$find(e){const t=this.prefix+e;return this.content.hasOwnProperty(t)?this.content[t]:this.parent?this.parent.$find(e):null}$let(e,t){const s=this.prefix+e;return!this.content[s]&&(this.content[s]=new f("let",t),!0)}$const(e,t){const s=this.prefix+e;return!this.content[s]&&(this.content[s]=new f("const",t),!0)}$var(e,t){const s=this.prefix+e;let r=this;for(;null!==r.parent&&"function"!==r.type;)r=r.parent;return!r.content[s]&&(this.content[s]=new f("var",t),!0)}$declar(e,t,s){return{var:()=>this.$var(t,s),let:()=>this.$let(t,s),const:()=>this.$const(t,s)}[e]()}}const m=(e,t,s)=>{const r=l[e.type]||(e=>{console.log("不支持的node"+JSON.stringify(e,null,2))});return r(e,t,s)},y={console,setTimeout,setInterval,clearTimeout,clearInterval,encodeURI,encodeURIComponent,decodeURI,decodeURIComponent,Infinity:1/0,NaN:NaN,isFinite,isNaN,parseFloat,parseInt,Object,Boolean,Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError,Number,Math,Date,String,RegExp,Array,JSON,Promise},x=(e,t={})=>{const s=new d("block");s.$const("this",void 0);for(const e of Object.getOwnPropertyNames(y))s.$const(e,y[e]);for(const e of Object.getOwnPropertyNames(t))s.$const(e,t[e]);const r={};s.$const("exports",r);const i=new a(e);i.scan();const n=new o(i.tokens);return m(n.parse(),s),r};var g=t.Z;export{g as default};