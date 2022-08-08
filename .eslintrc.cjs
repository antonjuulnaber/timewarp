"use strict";

/**
 * @file
 * This file confgures ESLint.
 */

module.exports = {

  parserOptions: {
    sourceType: "module",
		ecmaVersion: "latest",
  },

	extends: [
		"@atjn/eslint-config",
	],

};
