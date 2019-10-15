"use strict";

const build-insert = require(__dirname + "/deploy/build-insert.js");
const build-minify = require(__dirname + "/deploy/build-minify.js");

build-insert.run();
build-minify.run();