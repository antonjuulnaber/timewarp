"use strict";


module.exports = {
	
	run: () => {	
		const path = require('path');
		const c = require(path.join(__dirname, "controls.js"));
		const site_root = c.path("..");

		const fs = require("fs");
		const Linter = require("eslint").Linter;
		const linter = new Linter();
		
		const lint_rules_web = fs.readFileSync(c.path("lint-js_rules_web.json"));
		const lint_rules_node = fs.readFileSync(c.path("lint-js_rules_node.json"));

		const lint_dirs = [
			{
				"path": "/",
				"type": "web"
			},
			{
				"path": "/js",
				"type": "web"
			},
			{
				"path": "/data",
				"type": "web"
			},
			{
				"path": "/deploy",
				"type": "node"
			}
		];

		for(const dir of lint_dirs){
			if(!fs.existsSync(path.join(site_root, dir.path))) continue;
			const files = fs.readdirSync(path.join(site_root, dir.path));
			for(const file of files){
				const p = path.extname(file).toLowerCase();
				if(p === ".js" && dir.type === "web"){
					c.log("Linting " + path.join(dir.path, file));
					c.log(linter.verify(fs.readFileSync(path.join(site_root, dir.path, file)), lint_rules_web), "info");
				}else if(p === ".js" && dir.type === "node"){
					c.log("Linting " + path.join(dir.path, file));
					c.log(linter.verify(fs.readFileSync(path.join(site_root, dir.path, file)), lint_rules_node), "info");
				}
			}
		}
	}
}