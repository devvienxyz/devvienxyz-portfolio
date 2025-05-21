# Dev Notes

## Pre-commit

If urgent, this can be overriden by running: `git commit --no-verify`.

## Development

```bash
pnpm dev

# To add a packagge to dependencies, do:
pnpm add <package_name>
# add -w to add to turbo workspace instead of local
# eg: pnpm add @tailwindcss/vite -w

# To add a package to dev dependencies, do:
pnpm add -D <package_name>
# eg: pnpm add -D globals -w
# eg: pnpm add -D gh-pages -w

# To uninstall a package:
pnpm remove <package_name>

#
pnpm dlx tailwindcss init -p

# verify package versions
pnpm list <packages>
# e.g: react react-dom

pnpm up  # Updates all dependencies, adhering to ranges specified in package.json
pnpm up --latest  # Updates all dependencies to their latest versions
pnpm up foo@2  # Updates foo to the latest version on v2
pnpm up "@babel/*"  # Updates all dependencies under the @babel scope

# update packages in all subdirectories
pnpm up --recursive
```

See more options and commands: <https://pnpm.io/cli>

## Release

```bash
pnpm release
```
