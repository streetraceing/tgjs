@echo off
call npm version patch --no-git-tag-version
call npm run build
call npm publish --access public