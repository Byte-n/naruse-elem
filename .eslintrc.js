module.exports = {
    root: true,
    extends: [
        'eslint-config-ay',
        'eslint-config-ay/import',
    ],
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            rules: {
                'no-console': 'off',
                'prefer-destructuring': ['error', {
                    array: false,
                    object: true,
                }],
                'require-jsdoc': 'off',
                'constructor-super': 'off',
                'no-this-before-super': 'off',
                'require-jsdoc-except': 'off',
            },
            globals: {
                NaruseComponent: 'readonly',
                $adImport: 'readonly',
                $mappUtils: 'readonly',
                my: 'readonly',
                $moment: 'readonly',
            },
        },
    ],
};
