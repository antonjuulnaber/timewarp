"use strict";
const path = require("path");

const minify = require(path.join(__dirname, "build-minify.js"));
const insert = require(path.join(__dirname, "build-insert.js"));

minify.run();
insert.run();
