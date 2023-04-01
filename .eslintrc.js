module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "commonjs": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:node/recommended",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "node/no-extraneous-require": [0],
        "node/no-unsupported-features/es-syntax": [0],
        "node/no-extraneous-import":[0]
    },
    "globals": {
        "require": "readonly"
    }
};
