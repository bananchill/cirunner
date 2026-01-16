/* eslint-env node */
// Подключаем TS-конфиг Vue (нужен для корректной работы extends)
require('@vue/eslint-config-typescript');

const OFF = 'off';
const ERROR = 'error';
const WARN = 'warn';

module.exports = {
    // Запрещаем ESLint искать конфиги выше по дереву
    root: true,

    // Окружения выполнения
    env: {
        browser: true, // Vue-приложение в браузере
        node: true, // Vite config, tooling
        es2023: true, // Современный JS
    },

    extends: [
        // Vue 3: набор правил для приложений
        'plugin:vue/vue3-recommended',

        // TypeScript + Vue SFC (script / script setup)
        '@vue/eslint-config-typescript',

        // Общие правила монорепозитория (policy / import / sonar и т.д.)
        '../../.eslintrc.js',
    ],

    parserOptions: {
        ecmaVersion: 'latest', // Последний стандарт JS
        sourceType: 'module', // ES-модули
        extraFileExtensions: ['.vue'], // Разрешаем парсинг .vue файлов
    },

    rules: {
        /* ======================
         * Vue: архитектура и баги
         * ====================== */

        // Разрешаем односоставные имена компонентов (App, Home и т.п.)
        'vue/multi-word-component-names': ERROR,

        // Запрещаем мутировать props
        'vue/no-mutating-props': ERROR,

        // computed должен быть чистой функцией без side-effects
        'vue/no-side-effects-in-computed-properties': ERROR,

        // Предупреждаем о зарегистрированных, но неиспользуемых компонентах
        'vue/no-unused-components': WARN,

        // Ловит неиспользуемые переменные в template
        'vue/no-unused-vars': WARN,

        // Требует явно объявлять события emit()
        'vue/require-explicit-emits': ERROR,

        // Требует описывать типы props (даже при TS)
        'vue/require-prop-types': ERROR,

        // v-html потенциально опасен (XSS), но иногда нужен
        'vue/no-v-html': WARN,

        /* ======================
         * Vue <script setup>
         * ====================== */

        // Защищает переменные, используемые только в template
        'vue/script-setup-uses-vars': ERROR,

        /* ======================
         * TypeScript
         * ====================== */

        // Неиспользуемые переменные — warn, underscore игнорируется
        '@typescript-eslint/no-unused-vars': [
            WARN,
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],

        // Разделяем type-импорты и runtime-импорты
        // Улучшает tree-shaking и читаемость
        '@typescript-eslint/consistent-type-imports': [
            ERROR,
            {
                prefer: 'type-imports',
                fixStyle: 'separate-type-imports',
            },
        ],

        /* ======================
         * Импорты
         * ====================== */

        // Единый и детерминированный порядок импортов
        'import/order': [
            ERROR,
            {
                groups: [
                    'builtin', // fs, path
                    'external', // vue, pinia
                    'internal', // alias-пути проекта
                    ['parent', 'sibling', 'index'],
                    'type', // type imports
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],

        /* ======================
         * Чистота продакшена
         * ====================== */

        // console допустим в dev, но подсвечивается в prod
        'no-console': process.env.NODE_ENV === 'production' ? WARN : OFF,

        // debugger запрещён в продакшене
        'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : OFF,
    },

    overrides: [
        {
            // Специфика Vue SFC
            files: ['*.vue'],
            rules: {
                // Vue реактивность ломает это правило
                '@typescript-eslint/no-use-before-define': OFF,
            },
        },
        {
            // Конфиги сборщиков и тестов
            files: ['vite.config.*', 'vitest.config.*'],
            env: {
                node: true,
            },
        },
    ],
};

