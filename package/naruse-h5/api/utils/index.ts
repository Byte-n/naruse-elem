export function shouldBeObject(target: unknown) {
    if (target && typeof target === 'object') return { flag: true }
    return {
        flag: false,
        msg: getParameterError({
            correct: 'Object',
            wrong: target
        })
    }
}

interface IParameterErrorParam {
    name?: string
    para?: string
    correct?: string
    wrong?: unknown
}
export function getParameterError({ name = '', para, correct, wrong }: IParameterErrorParam) {
    const parameter = para ? `parameter.${para}` : 'parameter'
    const errorType = upperCaseFirstLetter(wrong === null ? 'Null' : typeof wrong)
    if (name) {
        return `${name}:fail parameter error: ${parameter} should be ${correct} instead of ${errorType}`
    } else {
        return `parameter error: ${parameter} should be ${correct} instead of ${errorType}`
    }
}

function upperCaseFirstLetter(string) {
    if (typeof string !== 'string') return string
    string = string.replace(/^./, match => match.toUpperCase())
    return string
}

export function findDOM(inst?):  Document {
    return document;
}