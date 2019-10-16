"use strict";

module.exports = {
	
	test: (host) => {
		
		const path = require("path");
		const c = require(path.join(__dirname, "controls.js"));
		
		const puppeteer = require("puppeteer");
		

		const ids = {
			"firstInput": "#start.input",
			"lsatInput": "#end.input",
			"output": "#result.output"
		}


		const browser = puppeteer.launch();
		const page = browser.newPage();


		page.on('error', e => {
			c.fail("The page threw an error during live testing: " + e);
		});

		page.on('pageerror', e => {
			c.fail("The page threw an error during live testing: " + e);
		})

		page.goto(host).then(() => {
			c.log("Connected to website", true);
			
			
			page.click(ids.firstInput);
			page.keyboard.type("425");
			page.keyboard.press("Enter");


			const result = page.evaluate(() => document.querySelector("#result.output").value);
			
			c.log(result, "info");

			if(result >= 1){
				c.log("Website succesfully recieved input, parsed and created output", true);
			}else{
				c.fail("Website did not produce satisfactory output: " + result);
			}

		
		}).catch(e => {
			c.fail("Could not connect to website: " + e);
		});
	}
}