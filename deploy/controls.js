"use strict";

module.exports = {
	log: (msg, type) => {
		if(type === true) type = "passed";
		if(type === false) type = "failed";
		type = type || "passed";
		switch(type){
			case "passed":
				console.log("%c+ " + msg, "color:green");
				break;
			case "failed":
				console.error("%c- " + msg, "color:red");
				break;
			case "warning":
				console.error("%c! " + msg, "color:yellow");
				break;
			default:
				console.log("  " + msg);
				break;
		}
		return;
	},
	fail: (e) => {
		module.exports.log(e, "failed");
		process.exit(1);
	},
	path: (p) => {
		const path = require("path");
		return path.join(__dirname, p);
	}
}