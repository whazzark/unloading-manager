module.exports = {
    releaseCommitMessageFormat: "chore(release): {{currentTag}} 🎉",
    types: [
        {"type": "build", "section": ":hammer: Build"},
        {"type": "chore", "section": ":broom: Chore", "hidden": true},
        {"type": "ci", "section": ":repeat: Continuous Integration"},
        {"type": "docs", "section": ":book: Documentation"},
        {"type": "feat", "section": ":rotating_light: Features"},
        {"type": "fix", "section": ":bug: Bug Fixes"},
        {"type": "perf", "section": ":rocket: Performance"},
        {"type": "refactor", "section": ":construction: Refactor"},
        {"type": "revert", "section": ":recycle: Revert", "hidden": true},
        {"type": "style", "section": ":art: Style"},
        {"type": "test", "section": ":white_check_mark: Test"}
    ]
}
