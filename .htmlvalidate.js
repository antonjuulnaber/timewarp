"use strict";

/**
 * @file
 * This file confgures html-validate.
 */

module.exports = {

	extends: [
		"@atjn/htmlvalidate-config",
	],

	rules: {
		"heading-level": "off",
		"input-missing-label": "off",
	},

};
