module.exports = {
    customSyntax: "postcss-scss",
    extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
    plugins: ['stylelint-scss', 'stylelint-order', 'stylelint-config-rational-order/plugin'],
    rules: {
        'declaration-empty-line-before': null,
        indentation: 2,
        'order/properties-order': [[], { severity: 'warning' }],
        'plugin/rational-order': [
            true,
            {
                'border-in-box-model': true,
                'empty-line-between-groups': true,
                severity: 'warning',
            },
        ],
        'property-no-unknown': [
            true,
            {
                ignoreProperties: ['composes', 'compose-with'],
            },
        ],
        'value-keyword-case': null,
        'selector-class-pattern': null,
        'color-function-notation': null,
        'alpha-value-notation': null
    },
};
