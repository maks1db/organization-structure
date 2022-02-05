/* eslint-disable camelcase */

process.env.TZ = 'UTC';

module.exports = {
    collectCoverageFrom: ['**/*.{ts,tsx}'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        'webpack.config.ts',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
    verbose: true,
    roots: ['<rootDir>'],
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    preset: 'ts-jest',
    testPathIgnorePatterns: ['node_modules', 'jestsetup', 'dist'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.(j|t)sx?$': 'babel-jest',
        '\\.js$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    globals: {
        'ts-jest': {
            babelConfig: true,
            isolatedModules: true,
        },
    },
    setupFiles: [`${__dirname}/utils/jest-setup`],
};
