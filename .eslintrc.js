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
            },
        },
    ],
};
