"use strict";
const c = require("./deploy/controls.js");

const live = require(c.path("live-test.js"));

live.test("https://timewarp.antonjuulnaber.dk");