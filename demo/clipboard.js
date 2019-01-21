#!/usr/bin/env node

"use strict";
const { Controller } = require("../dist");

(async () => {
    const controller = new Controller();
    controller.clipboard.copy("clipboard test!");
    console.log(controller.clipboard.paste());
})();