#!/usr/bin/env bash
set -ex

patchVersion=$(npm --no-git-tag version patch)
nextVersion=${patchVersion}-next."$(date +%Y%m%d%H%M%S)"
echo "${nextVersion:1}"

node ./.build/bump_version.js "${nextVersion:1}"
