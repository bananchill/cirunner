// @ts-check

const OFF = 'off';
const ERROR = 'error';
const WARN = 'warn';

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'prettier',
        'plugin:sonarjs/recommended',
    ],

    env: {
        es2023: true,
    },

    plugins: ['import', 'unused-imports', '@typescript-eslint', 'sonarjs'],

    settings: {
        // 'import/internal-regex': '^@(api|test)(\\/|$)',
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
            node: {
                extensions: ['.js', '.cjs', '.mjs', '.ts'],
            },
        },
    },

    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest', // Поддержка ES2022+
        sourceType: 'module', // Поддержка ES-модули
    },

    rules: {
        /* ===== БАЗА ===== */
        'no-console': OFF,
        'no-debugger': ERROR,
        'no-undef': ERROR,
        eqeqeq: ['error', 'always'],
        curly: ERROR,
        'no-implicit-coercion': ERROR,
        'no-else-return': ERROR,
        'no-duplicate-imports': [ERROR, { includeExports: true }],

        /* ===== ИМПОРТЫ ===== */
        'import/no-duplicates': ERROR,
        'import/newline-after-import': ERROR,
        'import/no-unresolved': OFF, // монорепа / алиасы

        'import/order': [
            WARN,
            {
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],

        /* ===== МЕРТВЫЙ КОД ===== */
        'unused-imports/no-unused-imports': ERROR,
        'no-unused-vars': 'off',

        /* ===== ЗАЩИТА ОТ ХАОСА ===== */
        'no-redeclare': ERROR,
        'no-shadow': ERROR,

        '@typescript-eslint/no-unused-vars': [
            ERROR,
            // Игнорирует параметры, начинающиеся с _
            {
                destructuredArrayIgnorePattern: '^_',
                argsIgnorePattern: '^_',
            },
        ],

        // Требует использование import type для импортов типов
        '@typescript-eslint/consistent-type-imports': ERROR,

        /* ===== SONAR ===== */

        // Запрещает одинаковые ветки if / switch
        'sonarjs/no-identical-conditions': ERROR,

        // Запрещает дублирующиеся тела функций
        'sonarjs/no-identical-functions': WARN,

        // Ловит копипаст
        'sonarjs/no-duplicated-branches': ERROR,

        // Запрещает пустые if / else / catch
        'sonarjs/no-empty-collection': ERROR,

        // Ограничение когнитивной сложности
        'sonarjs/cognitive-complexity': [WARN, 15],

        // Запрещает switch без default
        'sonarjs/no-small-switch': WARN,

        // Запрещает вложенные тернарники
        'sonarjs/no-nested-conditional': ERROR,

        // Запрещает логические выражения без скобок
        'sonarjs/no-mixed-operators': ERROR,

        // Запрещает бессмысленные boolean выражения
        'sonarjs/no-redundant-boolean': ERROR,

        // Запрещает одинаковые выражения в логике
        'sonarjs/no-identical-expressions': ERROR,
    },

    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            extends: ['plugin:@typescript-eslint/recommended'],
            rules: {
                '@typescript-eslint/no-unused-vars': OFF,
            },
        },
        {
            files: ['*.json', '*.json5'],
            parser: 'jsonc-eslint-parser',
            extends: ['plugin:jsonc/recommended-with-json'],
        },
    ],
};

