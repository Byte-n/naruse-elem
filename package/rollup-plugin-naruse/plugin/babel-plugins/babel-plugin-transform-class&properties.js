module.exports = function (babel) {
    const t = babel.types;
    let visitor; let _class;

    visitor = {
        // CLASS
        ClassDeclaration: {
            enter(path) {
                _class = { id: path.node.id, parentId: path.node.superClass, statics: [], methods: [], defineBody : [] };
            },
            exit(path) {
                // console.log(es5Class(_class));
                path.replaceWithMultiple(es5Class(_class));
            },
        },
        // SUPER CALL
        Super: superCall,
        // NEW.TARGET
        MetaProperty(path) {
            const { node } = path;
            if (node.meta.name === 'new' && node.property.name === 'target') {
                path.replaceWith(expression('this.constructor'));
            }
        },
        // METHODS
        ClassMethod(path) {
            const { node } = path;
            if (node.kind === 'constructor') {
                // CONSTRUCTOR
                _class.constructor = t.functionDeclaration(_class.id, node.params, node.body);
                return;
            }
            if (node.static) {
                // STATIC METHODS
                _class.statics.push(es5Method(node));
                return;
            }
            // PROTOTYPE METHODS
            _class.methods.push(es5Method(node));
        },
        // 属性
        ClassProperty(path) {
            const { node } = path;
            _class.defineBody.push(es5Property(node));
        },
    };

    // Utils

    function isString(value) {
        return typeof value === 'string';
    }

    function toIdentifier(key) {
        return t.identifier(key);
    }

    function toMember(target, property) {
        return t.memberExpression(target, property);
    }

    function expression() {
        let index = arguments.length - 1; let members = []; let member;
        do {
            member = arguments[index];
            members = isString(member)
                ? members.concat(member.split('.').reverse()
                    .map(toIdentifier))
                : members.concat([member]);
            index--;
        } while (index > -1);
        return members.reduceRight(toMember);
    }

    function objectAssign(target, members) {
        return t.expressionStatement(t.callExpression(
            // Object.assign(target, members)
            expression('Object.assign'), [target, t.objectExpression(members)]));
    }

    function objectCreate(parentClass) {
        return t.callExpression(
            expression('Object.create'), [parentClass]);
    }

    function assign(key, value) {
        // key = value
        return t.expressionStatement(t.assignmentExpression('=', key, value));
    }

    function es5Method(method) {
        const id = method.key;
        // foo: function foo(args) {/* code */}
        return t.objectProperty(id, t.functionExpression(id, method.params, method.body));
    }

    function es5Property(property) {
        const id = property.key.name;
        const value = property.value
        return t.expressionStatement(t.callExpression(
            expression('_defineProperty'), [toIdentifier('this'), t.stringLiteral(id), value]));
    }

    function superCall(path) {
        let
            targetPath = path.parentPath;
        const ParentClass = _class.parentId;
        let caller; let method;
        if (path.parent.type === 'MemberExpression') {
            method = targetPath.node.property;
            targetPath = targetPath.parentPath;
            if (path.getFunctionParent().node.static) {
                // caller => ParentClass.methodName.call
                caller = expression(ParentClass, method, 'call');
            } else {
                // caller => ParentClass.prototype.methodName.call
                caller = expression(ParentClass, 'prototype', method, 'call');
            }
        } else {
            // caller => ParentClass.call
            caller = expression(ParentClass, 'call');
        }
        targetPath.replaceWith(t.callExpression(
            // {super target}.apply(this, args)
            caller, [t.Identifier('this')].concat(targetPath.node.arguments)));
    }

    function es5Class(_class) {
        const _es5Class = []; const MyClass = _class.id;
        // constructor
        if (!_class.hasOwnProperty('constructor')) {
            _class.constructor = t.functionDeclaration(_class.id, [], t.blockStatement([]));
        }
        if (_class.defineBody.length > 0) {
            _class.constructor.body.body = _class.defineBody.concat(_class.constructor.body.body);
        }
        _es5Class.push(_class.constructor);
        // parent class
        if (_class.parentId) {
            // MyClass.prototype = Object.create(MyParentClass.prototype);
            _es5Class.push(assign(
                expression(MyClass, 'prototype'),
                objectCreate(expression(_class.parentId, 'prototype'))
            ));
            _class.methods.push(t.objectProperty(t.identifier('constructor'), MyClass));
        }
        // methods
        if (_class.methods.length > 0) {
            // Object.assign(MyClass.prototype, { /* my methods *//});
            _es5Class.push(objectAssign(expression(MyClass, 'prototype'), _class.methods));
        }
        // statics
        if (_class.statics.length > 0) {
            // Object.assign(MyClass, { /* my statics *//});
            _es5Class.push(objectAssign(MyClass, _class.statics));
        }

        return _es5Class;
    }

    return {
        name: 'transform-class',
        visitor,
    };
};
