"use strict";
const path = require("path");
const c = require(path.join(__dirname, "controls.js"));

const live = require(c.path("live-test.js"));

live.test("https://timewarp.antonjuulnaber.dk");