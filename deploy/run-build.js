"use strict";
const path = require("path");
const c = require(path.join(__dirname, "controls.js"));

const insert = require(c.path("build-insert.js"));
const minify = require(c.path("build-minify.js"));

await insert.run();
await minify.run();