"use strict";
const path = require("path");
const c = require(path.join(__dirname, "controls.js"));

const live-test = require(c.path("live-test.js"));

live-test.run("https://timewarp.antonjuulnaber.dk");