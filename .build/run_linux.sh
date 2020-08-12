#!/usr/bin/env bash
set -e

echo $PWD

npm ci
echo "npm run compile"
npm run compile
echo "init e2e test subpackage"
npm --prefix e2e/tests ci
echo "npm run coverage"
npm run coverage
docker exec nut-ci bash -c "bash $PWD/.build/build.sh ${PWD} ${TRAVIS_NODE_VERSION}"
