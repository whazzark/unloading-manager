module.exports = {
  root: true,
  extends: [
    "next",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:prettier/recommended",
    "plugin:unicorn/recommended",
    "plugin:storybook/recommended",
  ],
  parserOptions: {
    project: "**/tsconfig.json"
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/consistent-type-imports": ["error", {
      prefer: "type-imports"
    }],
    "@typescript-eslint/padding-line-between-statements": ["error", {
      blankLine: "always",
      prev: "type",
      next: ["interface", "type"]
    }],
    "consistent-return": "off",
    "import/order": ["error", {
      alphabetize: {
        order: "asc",
        caseInsensitive: true
      },
      groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
      pathGroups: [{
        pattern: "react{,-native}",
        group: "external",
        position: "before"
      }],
      pathGroupsExcludedImportTypes: ["type"],
      "newlines-between": "always"
    }],
    "arrow-body-style": ["error", "always"],
    "import/prefer-default-export": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-underscore-dangle": "off",
    "newline-before-return": "error",
    "newline-after-var": "error",
    "padding-line-between-statements": "off",
    "prettier/prettier": [
      "error",
      {

    }],
    "react-hooks/exhaustive-deps": "error",
    "react/function-component-definition": [2, { "namedComponents": "function-declaration" }],
    "react/jsx-boolean-value": "off",
    "react/jsx-fragments": ["error", "element"],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-no-useless-fragment": "off",
    "react/jsx-sort-props": ["error", {
      callbacksLast: true,
      shorthandFirst: true,
      multiline: "last",
      ignoreCase: false,
      noSortAlphabetically: true,
      reservedFirst: true
    }],
    "react/jsx-wrap-multilines": ["error", {
      declaration: "parens-new-line",
      assignment: "parens-new-line",
      return: "parens-new-line",
      arrow: "parens-new-line",
      condition: "parens-new-line",
      logical: "parens-new-line",
    }],
    "react/no-unused-class-component-methods": "off",
    "react/require-default-props": "off",
    "space-before-blocks": "error",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/filename-case": ["error", {
      cases: {
        kebabCase: true,
        pascalCase: true
      }
    }],
    "unicorn/prefer-module": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-empty-file": "off",
  }
};
