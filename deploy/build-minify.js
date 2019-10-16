"use strict";

module.exports = {
	
	run: () => {
		const path = require("path");
		const c = require(path.join(__dirname, "controls.js"));
		const site_root = c.path("..");

		const fs = require("fs");
		const rimraf = require("rimraf");
		const minify = require("minify");


		const remove_dirs = ["deploy"];
		const remove_files = [".travis.yml"];

		//Must have slashes after, and not before
		const minify_dirs = ["", "css/", "js/", "data/"];


		for(const dir of remove_dirs){
		  c.log("Removing /" + dir);
		  rimraf(path.join(site_root + dir), [], e => {if(e) c.log("Could not remove file: " + e, false);});
		}

		for(const file of remove_files){
		  c.log("Removing " + file);
		  fs.unlink(path.join(site_root, file), e => {if(e) c.log("Could not remove file: " + e, false);});
		}

		for(const dir of minify_dirs){
			fs.stat(site_root + dir, e => {
				if(!e){
					fs.readdir(site_root + dir, (e, files) => {	
						for(const file of files){
							let p = path.extname(file).toLowerCase();
							if(p === ".html" || p === ".css" || p === ".js"){
								c.log("Minifying " + dir + file);
								minify(path.join(site_root, dir, file)).then(minified => {
									fs.writeFile(path.join(site_root, dir, file), minified, e => {if(e) c.fail(e);});
								}).catch(e => {c.fail(e);});
							}else if(p === ".json"){
								c.log("Minifying " + dir + file);
								fs.readFile(path.join(site_root, dir, file), "utf-8", (e, data) => {
									if(e) c.fail(e);
									fs.writeFile(path.join(site_root, dir, file), JSON.stringify(JSON.parse(data)), e => {if(e) c.fail(e);});
								});
							}
						}
					});
				}
			});
		}
	}
}