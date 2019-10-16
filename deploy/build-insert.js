"use strict";

module.exports = {
	
	run: () => {
		const path = require("path");
		const c = require(path.join(__dirname, "controls.js"));
		
		const replace = require("replace-in-file");
		const crypto = require("crypto");
		
		c.log(c.path("../js/sw.js"));
		
		const rpl_sw_cache_id = replace({
			files: c.path("../js/sw.js"),
			from: /"!travis_insert_id!"/g,
			to: "\"cache-" + crypto.randomBytes(10).toString('hex') + "\""
		});
		
		if(rpl_sw_cache_id.hasChanged === true){
			c.log("Inserted new serviceworker cache id", true);
		}else{
			c.log(rpl_sw_cache_id.file, false);
			c.fail("Could not insert new  serviceworker cache id");
		}
	}
	
}