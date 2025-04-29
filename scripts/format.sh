#!/bin/bash

format_check_all() {
  echo "Checking all files for formatting..."
  biome format
}

format_check_staged() {
  echo "Checking staged files for formatting..."
  git diff --cached --name-only --diff-filter=ACM \
    | grep '\.jsx$' \
    | grep -vE '^dist/|/dist/|^temp/|/temp/|^node_modules/|/node_modules/' \
    | xargs biome format
}

format_fix_all() {
  echo "Fixing all files..."
  biome format --fix
}

format_fix_staged() {
  echo "Fixing staged files..."
  git diff --cached --name-only --diff-filter=ACM \
    | grep '\.jsx$' \
    | xargs biome format --fix
}

# Check if any of the functions are called
if [ "$1" ]; then
  "$1"
else
  echo "Usage: $0 {format_check_all|format_check_staged|format_fix_all|format_fix_staged}"
  exit 1
fi
