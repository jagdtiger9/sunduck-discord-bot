import {defineConfig} from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
    {
        files: ["**/*.js"],
        plugins: {js},
        extends: ["js/recommended"],
        languageOptions: {
            ecmaVersion: 'latest',
        },
        env: {
            "browser": false,
            "node": true,
            "commonjs": true,
            "es6": true
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
        },
    },
])
