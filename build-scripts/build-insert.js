"use strict";

module.exports = {
	
	run: () => {
		const path = require("path");
		
		const fs = require("fs-extra");
		const crypto = require("crypto");
		
		console.log("Inserting serviceworker unique cache id");
		
		const file = path.join(__dirname, "../public/serviceworker.js");
		fs.writeFileSync(file, fs.readFileSync(file, "utf-8").replace("\"!build_insert_id!\"", `"cache-${crypto.randomBytes(5).toString("hex")}"`));
	},
	
};
