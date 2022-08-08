/**
 * @file
 * This file confgures html-validate.
 */

export default {

	extends: [
		"@atjn/htmlvalidate-config",
	],

	rules: {
		"heading-level": "off",
		"input-missing-label": "off",
	},

};
