"use strict";

module.exports = {
	
	run: () => {
		const path = require("path");
		const c = require(path.join(__dirname, "controls.js"));
		
		const fs = require("fs");
		const crypto = require("crypto");
		
		c.log("Inserting serviceworker unique cache id");
		
		let file = c.path("../sw.js");
		fs.writeFileSync(file, fs.readFileSync(file, "utf-8").replace("\"!travis_insert_id!\"", "\"cache-" + crypto.randomBytes(5).toString('hex') + "\""));
	}
	
}