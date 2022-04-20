module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        babelOptions: {
            rootMode: 'upward',
            plugins: [
                [
                    '@babel/plugin-transform-react-jsx',
                ],
            ],
        },
    },
    parser: '@babel/eslint-parser',
    extends: [
        'eslint-config-ay',
        'eslint-config-ay/import',
    ],
    rules: { 'linebreak-style': 'off' },
    overrides: [{
        files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
        rules: {
            'no-console': 'off',
            'prefer-destructuring': ['error', {
                array: false,
                object: true,
            }],
            'constructor-super': 'off',
            'no-this-before-super': 'off',
            'id-length': 'off',
            'require-jsdoc-except/require-jsdoc': 0,
            'no-cond-assign': 0,
            'eol-last': 'off',
        },
        globals: {
            $adImport: 'readonly',
            $mappUtils: 'readonly',
            my: 'readonly',
            $moment: 'readonly',
            $adSensorsBeacon: 'readonly',
            $userInfoChanger: 'readonly',
            $openChat: 'readonly',
            $ayApi: 'readonly',
            Promise: 'readonly',
        },
    }],
};