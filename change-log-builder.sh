#!/usr/bin/env bash

COMMITS=$(git log `git describe --tags --abbrev=0`..HEAD --oneline --pretty=format:'*  %s [View](https://github.com/sanusart/react-dropdown-select/commit/%H)' --reverse | grep -v Merge)

printf "### vPLACEHOLDER\n${COMMITS}\n\n" | cat - CHANGELOG.md > /tmp/temp-msg && mv /tmp/temp-msg CHANGELOG.md

