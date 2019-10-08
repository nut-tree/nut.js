#!/usr/bin/env bash
set -e

echo $PWD

npm ci
npm run compile
npm test -- --testPathIgnorePatterns="<rootDir>/lib/expect/matchers/","<rootDir>/node_modules/"
