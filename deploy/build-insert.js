"use strict";

module.exports = {
	
	run: () => {
		const path = require("path");
		const c = require(path.join(__dirname, "controls.js"));
		
		const fs = require("fs");
		const crypto = require("crypto");
		
		c.log("Inserting serviceworker unique cache id");
		
		let file = c.path("../js/sw.js");
		fs.readFile(file, "utf-8", (e, data) => {
			if(e) c.fail(e);
			fs.writeFile(file, data.replace("\"!travis_insert_id!\"", "\"cache-" + crypto.randomBytes(10).toString('hex') + "\""), e => {
				if(e) c.fail(e);
			});
		});
	}
	
}