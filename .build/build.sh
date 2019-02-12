#!/usr/bin/env bash

source ~/.nvmrc
cd /nut
npm ci
npm run compile
npm run coverage
