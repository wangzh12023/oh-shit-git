# Oh shit, I tried to run a diff but nothing happened?!

If you know that you made changes to files, but `diff` is empty, you probably `add`-ed your files to staging and you need to use a special flag.

```
git diff --staged
```

File under ¯\\_(ツ)\_/¯ (yes, I know this is a feature, not a bug, but it's fucking baffling and non-obvious the first time it happens to you!)
