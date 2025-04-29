# [@devvienxyz/devvienxyz-portfolio](https://github.com/devvienxyz/devvienxyz-portfolio)

🚧 **Work in Progress**
This project is actively being developed.

## Setup

```bash
nvm use
npm install -g pnpm  # [optional] Skip if pnpm is already installed.
pnpm approve-builds
pnpm install
```

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
```

## Release

```bash
pnpm release
```

## Pre-commit

If urgent, this can be overriden by running: `git commit --no-verify`.

## Assets & Attribution

Pixel art and game assets provided by [Kenney](https://kenney.nl/assets), licensed under [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/).

Kenney provides high-quality, free-to-use game assets that help bring this project to life.

## Support My Work

If you find my projects helpful, consider supporting me:

<a href="https://www.buymeacoffee.com/devvienxyz" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="200" />
</a>
