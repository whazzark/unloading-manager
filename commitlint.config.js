module.exports = {
    parserPreset: 'conventional-changelog-conventionalcommits',
    rules: {
        'body-leading-blank': [1, 'always'],
        'body-max-line-length': [2, 'always', 100],
        'footer-leading-blank': [1, 'always'],
        'footer-max-line-length': [2, 'always', 100],
        'header-max-length': [2, 'always', 100],
        'scope-enum': [2, 'always', ['backend', 'documentation', 'frontend']],
        'subject-case': [2, 'always', ['sentence-case', 'start-case']],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'type-case': [0, 'always', 'upper-case'],
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
            ['Build', 'Chore', 'Ci', 'Docs', 'Feat', 'Fix', 'Perf', 'Refactor', 'Revert', 'Style', 'Test'],
        ],
    },
}
