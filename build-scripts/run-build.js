/* eslint-disable */
"use strict";

/**
 * ESLint is disabled because these files will be replaced in the near future, so no reason to spend time fixing linting errors.
 */

const path = require("path");

const minify = require(path.join(__dirname, "build-minify.js"));
const insert = require(path.join(__dirname, "build-insert.js"));

minify.run();
insert.run();
