"use strict";

module.exports = {
	
	run: () => {		
		const path = require('path');
		const c = require(path.join(__dirname, "controls.js"));
		const site_root = c.path("..");

		const fs = require("fs");
		const rimraf = require("rimraf");
		const minify = require("minify");


		const remove_dirs = ["deploy"];
		const remove_files = [".travis.yml"];

		const minify_dirs = ["/", "/css", "/js", "/data"];


		for(const dir of remove_dirs){
		  c.log("Removing " + dir);
		  rimraf.sync(path.join(site_root, dir));
		}

		for(const file of remove_files){
		  c.log("Removing " + file);
		  fs.unlinkSync(path.join(site_root, file));
		}

		for(const dir of minify_dirs){
			fs.stat(path.join(site_root, dir), e => {
				if(!e){
					fs.readdir(path.join(site_root, dir), (e, files) => {	
						for(const file of files){
							let p = path.extname(file).toLowerCase();
							if(p === ".html" || p === ".css" || p === ".js"){
								c.log("Minifying " + path.join(dir, file));
								minify(path.join(site_root, dir, file)).then(minified => {
									fs.writeFile(path.join(site_root, dir, file), minified, e => {if(e) c.fail("Failed to write to" + path.join(dir, file) + ": " + e);});
								}).catch(e => {c.fail("Failed to minify" + path.join(dir, file) + ": " + e);});
							}else if(p === ".json"){
								c.log("Minifying " + path.join(dir, file));
								fs.readFile(path.join(site_root, dir, file), "utf-8", (e, data) => {
									if(e) c.fail("Failed to read" + path.join(dir, file) + ": " + e);
									fs.writeFile(file, JSON.stringify(JSON.parse(data)), e => {if(e) c.fail("Failed to minify" + path.join(dir, file) + ": " + e);});
								});
							}
						}
					});
				}
			});
		}
	}
}