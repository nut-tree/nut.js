#!/usr/bin/env bash
set -e

export NVM_DIR="$HOME/.nvm"
[[ -s "$NVM_DIR/nvm.sh" ]] && \. "$NVM_DIR/nvm.sh"

if [[ $# -lt 1 ]]; then
echo "No working directory provided, using default"
targetDir=$PWD
else
targetDir=$1
fi
if [[ $# -lt 2 ]]; then
echo "No node version provided, using default"
nodeVersion="lts/dubnium"
else
nodeVersion=$2
fi

echo "Entering working directory $targetDir"
cd $targetDir
echo "Installing node version $nodeVersion"
nvm install $nodeVersion

npm ci
npm --prefix e2e/plugin-test ci
E2E_TEST=1 npm run coverage -- --coverageDirectory=coverage/e2e
