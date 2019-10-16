"use strict";

module.exports = {
	
	test: async (host) => {
		
		const path = await require("path");
		const c = await require(path.join(__dirname, "controls.js"));
		
		const puppeteer = await require("puppeteer");
		

		const ids = {
			"firstInput": "#start.input",
			"lsatInput": "#end.input",
			"output": "#result.output"
		}


		const browser = await puppeteer.launch();
		const page = await browser.newPage();


		page.on('error', e => {
			c.fail("The page threw an error during live testing: " + e);
		});

		page.on('pageerror', e => {
			c.fail("The page threw an error during live testing: " + e);
		})

		await page.goto(host).then(() => {
			c.log("Connected to website", true);
		}).catch(e => {
			c.fail("Could not connect to website: " + e);
		});
		
		await page.click(ids.firstInput);
		await page.keyboard.type("425");
		await page.keyboard.press("Enter");


		const result = await page.evaluate(document.querySelector("#result.output").value;);
		
		c.log(result, "info");

		if(result >= 1){
			c.log("Website succesfully recieved input, parsed and created output", true);
		}else{
			c.fail("Website did not produce satisfactory output: " + result);
			}
		
		
	}
}