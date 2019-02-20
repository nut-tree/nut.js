#!/usr/bin/env node

"use strict";
const { clipboard } = require("../dist");

(async () => {
    await clipboard.copy("clipboard test!");
    console.log(await clipboard.paste());
})();