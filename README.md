# Oh Shit, Git!?!

> Quick access to “Oh Shit, Git!?!” solutions right inside VS Code.

<!-- ![](media/icon.jpg)   -->

## Features

- **Magic time machine** – run `Oh Shit Git: Magic time machine` to jump your repo back via `git reflog`.
- **Amend last commit** – run `Oh Shit Git: Amend last commit`.
- **Change commit message** – run `Oh Shit Git: Change commit message`.
- **…and 7 more commands** covering every “Oh shit” moment.

## Commands

| Command                                | Description                                           |
|----------------------------------------|-------------------------------------------------------|
| `Oh Shit Git: Magic time machine`      | `git reflog` + `git reset HEAD@{index}`               |
| `Oh Shit Git: Amend last commit`       | `git commit --amend --no-edit`                        |
| `Oh Shit Git: Change commit message`   | `git commit --amend`                                  |
| `Oh Shit Git: Commit should be on new branch` | `git branch …` + `git reset HEAD~ --hard`        |
| `Oh Shit Git: Committed to wrong branch`   | `git reset HEAD~ --soft` + `git stash` …        |
| `Oh Shit Git: Diff shows nothing`         | `git diff --staged`                                |
| `Oh Shit Git: Revert older commit`        | `git revert [hash]`                                |
| `Oh Shit Git: Undo file changes`          | `git checkout [hash] -- path/to/file`              |
| `Oh Shit Git: Fuck this noise`            | `git reset --hard origin/master && git clean -d --force` |

## Usage

1. Open the **Command Palette** (`Ctrl+Shift+P`) and start typing `Oh Shit Git: …` to run any command.  
2. Each command opens the relevant `.md` file in preview mode.

<!-- 
## Release Notes

### 0.0.1

- Initial release with 9 “Oh Shit” commands + Markdown previews. -->

---

© 2025 Your Name · [MIT License](LICENSE)  
