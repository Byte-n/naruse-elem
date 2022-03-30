module.exports = {
    root: true,
    env: { es6: true },
    extends: [
        'eslint-config-ay',
        'eslint-config-ay/import',
    ],
    rules: { 'linebreak-style': 'off' },
    overrides: [
        {
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
            },
            globals: {
                NaruseComponent: 'readonly',
                $adImport: 'readonly',
                $mappUtils: 'readonly',
                my: 'readonly',
                $moment: 'readonly',
                $adSensorsBeacon: 'readonly',
                $userInfoChanger: 'readonly',
                Promise: 'readonly',
            },
        },
    ],
};
