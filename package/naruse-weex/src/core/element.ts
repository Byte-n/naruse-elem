// this file is copied from dist of rax in npm package, simplified and modified
export function isValidElement(object: any) {
    return typeof object === 'object' && object !== null && object.type && object.props;
}
var has = Function.call.bind(Object.prototype.hasOwnProperty);

function checkPropTypes(typeSpecs, values, location, componentName) {
    {
        for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
                var error;
                // Prop type validation may throw. In case they do, we don't want to
                // fail the render phase where it didn't fail before. So we log it.
                // After these have been cleaned up, we'll let them throw.
                try {
                    // This is intentionally an invariant that gets caught. It's the same
                    // behavior as without this statement except with a better message.
                    if (typeof typeSpecs[typeSpecName] !== 'function') {
                        var err = Error(
                            (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                            'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
                            'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
                        );
                        err.name = 'Invariant Violation';
                        throw err;
                    }
                    error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null);
                } catch (ex) {
                    error = ex;
                }
            }
        }
    }
}

function Element(type, key, ref, props, owner) {
    var element = {
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
    };
    {
        var propTypes = type.propTypes;

        // Validate its props provided by the propTypes definition
        if (propTypes) {
            var displayName = type.displayName || type.name;
            checkPropTypes(propTypes, props, 'prop', displayName);
        }

        // We make validation flag non-enumerable, so the test framework could ignore it
        Object.defineProperty(element, '__validated', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
        });

        // Props is immutable
        if (Object.freeze) {
            Object.freeze(props);
        }
    }
    return element;
}

const Host = {
    __mountID: 1,
    __isUpdating: false,
    // Inject
    driver: null,
    // Roots
    rootComponents: {},
    rootInstances: {},
    // Current owner component
    owner: null,
};

function traverseChildren(children, result) {
    if (Array.isArray(children)) {
        for (var i = 0, l = children.length; i < l; i++) {
            traverseChildren(children[i], result);
        }
    } else {
        result.push(children);
    }
}

function flattenChildren(children) {
    if (children == null) {
        return children;
    }
    var result = [];
    traverseChildren(children, result);

    // If length equal 1, return the only one.
    return result.length - 1 ? result : result[0];
}

const RESERVED_PROPS = {
    key: true,
    ref: true,
};

export function cloneElement(element: any, config: Record<string, any>, ...children: any[]) {
    if (!isValidElement(element)) {
        throw Error('cloneElement: not a valid element.');
    }

    // Original props are copied
    const props = Object.assign({}, element.props);

    // Reserved names are extracted
    let key = element.key;
    let ref = element.ref;

    // Owner will be preserved, unless ref is overridden
    let owner = element._owner;

    if (config) {
        // Should reset ref and owner if has a new ref
        if (config.ref !== undefined) {
            ref = config.ref;
            owner = Host.owner;
        }

        if (config.key !== undefined) {
            key = String(config.key);
        }

        // Resolve default props
        let defaultProps;
        if (element.type && element.type.defaultProps) {
            defaultProps = element.type.defaultProps;
        }
        // Remaining properties override existing props
        let propName;
        for (propName in config) {
            if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                if (config[propName] === undefined && defaultProps !== undefined) {
                    // Resolve default props
                    props[propName] = defaultProps[propName];
                } else {
                    props[propName] = config[propName];
                }
            }
        }
    }

    if (children.length) {
        props.children = flattenChildren(children);
    }

    // @ts-ignore
    return new Element(
        element.type,
        key,
        ref,
        props,
        owner
    );
};