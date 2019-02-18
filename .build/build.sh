#!/usr/bin/env bash
set -e

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

targetDir="/nut"
nodeVersion="lts/dubnium"

echo "Entering working directory"
cd $targetDir
echo "Installing node version $nodeVersion"
nvm install lts/dubnium
echo "npm ci"
npm ci > /dev/null 2>&1
echo "git fetch --unshallow"
git fetch --unshallow
echo "npm run compile"
npm run compile
echo "npm run coverage"
E2E_TEST=1 npm run coverage
