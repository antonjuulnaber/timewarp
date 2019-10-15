"use strict";

const insert = require(__dirname + "/deploy/build-insert.js");
const minify = require(__dirname + "/deploy/build-minify.js");

insert.run();
minify.run();