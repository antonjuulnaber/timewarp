/* eslint-disable */
"use strict";

/**
 * ESLint is disabled because these files will be replaced in the near future, so no reason to spend time fixing linting errors.
 */

module.exports = {
	
	run: () => {		
		const path = require("path");
		const site_root = path.join(__dirname, "..");

		const fs = require("fs-extra");

		const minifier = require("minify");

		const minifier_options = {
			img: {
				maxSize: 512,
			},
		};


		const copy = [
			{
				"from": "/source",
				"to": "/public",
			},
		];

		const remove = [
			"/public/script.ts",
		];

		const minify = [
			"/public",
		];


		for(const command of copy){
			console.log(`Copying ${path.join(command.from)} to ${path.join(command.to)}`);
			fs.removeSync(path.join(site_root, command.to));
			fs.copySync(path.join(site_root, command.from), path.join(site_root, command.to));
		}

		for(const mount of remove){
			console.log(`Removing ${path.join(mount)}`);
			fs.removeSync(path.join(site_root, mount));
		}
		
		for(const mount of minify){
			const files = [];
			if(!fs.existsSync(path.join(site_root, mount))){
				console.warn(`${path.join(mount)} does not exist, cannot minify`);
				continue;
			}else if(fs.lstatSync(path.join(site_root, mount)).isFile()){
				files.push(mount);
			}else if(fs.lstatSync(path.join(site_root, mount)).isDirectory()){
				for(const file of fs.readdirSync(path.join(site_root, mount))){
					files.push(path.join(mount, file));
				}
			}else{
				continue;
			}
			for(const file of files){
				const ext = path.extname(file).toLowerCase();
				if(ext === ".html" || ext === ".css" || ext === ".js"){
					console.log(`Minifying ${path.join(file)}`);
					minifier(path.join(site_root, file), minifier_options).then(minified => {
						return fs.writeFileSync(path.join(site_root, file), minified);
					}).catch(error => {
						console.error(error);
					});
				}else if(ext === ".json"){
					console.log(`Minifying ${path.join(file)}`);
					fs.writeFileSync(path.join(site_root, file), JSON.stringify(JSON.parse(fs.readFileSync(path.join(site_root, file)))));
				}
			}
		}
	},
};
