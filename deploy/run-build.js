"use strict";

const insert = require(__dirname + "/build-insert.js");
const minify = require(__dirname + "/build-minify.js");

insert.run();
minify.run();