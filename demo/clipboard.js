#!/usr/bin/env node

"use strict";
const { clipboard } = require("../dist");

(async () => {
    clipboard.copy("clipboard test!");
    console.log(clipboard.paste());
})();