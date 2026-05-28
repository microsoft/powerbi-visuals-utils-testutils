import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import powerbiVisualsPlugin from "eslint-plugin-powerbi-visuals";

export default [
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            "coverage/**",
            "test/**",
            "lib/**",
            "karma.conf.ts",
            "webpack.config.js",
            "eslint.config.mjs"
        ]
    },
    js.configs.recommended,
    ...tsPlugin.configs["flat/recommended"],
    powerbiVisualsPlugin.configs.recommended,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: import.meta.dirname
            }
        },
        rules: {
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-wrapper-object-types": "off",
            "no-useless-assignment": "off"
        }
    }
];
