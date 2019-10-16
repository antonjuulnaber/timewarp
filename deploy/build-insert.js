"use strict";

module.exports = {
	
	run: () => {
		const path = require("path");
		const c = require(path.join(__dirname, "controls.js"));
		
		const fs = require("fs");
		const crypto = require("crypto");
		
		c.log(c.path("../js/sw.js"));
		
		fs.readFile(c.path("../js/sw.js"), "utf-8", (e, data) => {
			if(e) c.fail(e);
			fs.writeFile(file, data.replace("\"!travis_insert_id!\"", "\"cache-" + crypto.randomBytes(10).toString('hex') + "\""), e => {
				if(e) c.fail(e);
			});
		});
		
		/*
		const rpl_sw_cache_id = rt({
			files: c.path("../js/sw.js"),
			files: c.path("/home/travis/build/antonjuulnaber/timewarp/js/sw.js"),
			from: /"!travis_insert_id!"/g,
			to: "\"cache-" + crypto.randomBytes(10).toString('hex') + "\""
		}).then(r => {
			c.log("Results: " + r);
		}).catch(e => {
			c.fail("Could not insert new serviceworker cache id: " + e);
		});
		
		if(rpl_sw_cache_id.hasChanged === true){
			c.log("Inserted new serviceworker cache id", true);
		}else{
			c.log(rpl_sw_cache_id.tostring, false);
			c.fail("Could not insert new serviceworker cache id");
		}
		*/
	}
	
}