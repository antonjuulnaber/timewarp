"use strict";

/**
 * @file
 * This is the main script file, it contains all the logic behind the inputs and outputs.
 */

/**
 * This is a shorthand function for `document.querySelector`, it simply makes it easier to work with the code.
 * 
 * @param {string} query - A CSS query selector .
 * @returns {object} - The DOM Element foudn by the selector.
 */
function q(query){
	return document.querySelector(query);
}

/**
 * This is a shorthand for converting a number into the correct format for the inputs and outputs.
 * It will turn the number (a minute or hour) into a string and add a `0` to the start of the string if necessary, to make sure the string os two characters long.
 * 
 * @param {number} number - The number to standardize.
 * @returns {string} - The standardized number.
 */
function p(number){
	return number.toString().padStart(2, "0");
}

/**
 * If the user pastes anything into the browser, this function tries to make sense of it, and put it into the correct inputs.
 * 
 * @param {object} event - The paste event.
 */
async function parsePaste(event){
	const regex = /(?<frontDelimiter>\b|\s|\D|^)(?<hour>[01]\d(?=[:;.,_ ])|2[0-3](?=[:;.,_ ])|\d(?=[:;.,_ ])|0(?=[0-5]\d)|[01]\d|2[0-3]|\d)[:;.,_\s]{0,3}(?<minute>[0-5]\d|\d?)(?<endDelimiter>\b|\s|\D|$)/mu;
	const match = (regex).exec(event.clipboardData.getData("Text"));
	const input = document.activeElement;
	
	if(input.tagName === "INPUT" && input.classList.contains("input") && match?.groups?.hour){
		input.value = `${p(match?.groups?.hour)}:${p(match?.groups?.minute || "00")}`;
		input.dispatchEvent(new Event("input"));
	}
}

/**
 * Toggles the page statre between "input mode" and "output mode".
 * Input mode does not show the result, indicating to the user that they have not given all the necessary information yet.
 * 
 * @param {boolean} validInput - Whether or not the inputs are currently valid.
 */
async function togglePageState(validInput){
	if(validInput){
		document.body.classList.add("foutput");
		document.body.classList.remove("finput");
	}else{
		document.body.classList.remove("foutput");
		document.body.classList.add("finput");
	}
}

/**
 * Takes the `start` and `end` inputs and calculates the timespan between them, them  outputs it directly in the `result` element.
 * NOTE: This function does not validate the inputs first. If they are false, it could fail.
 */
async function calculateHours(){
	const startInit = q("input#start").value.split(":", 2);
	const endInit = q("input#end").value.split(":", 2);
	const startRes = Number(startInit[0]) + (Number(startInit[1]) / 60);
	const endRes = Number(endInit[0]) + (Number(endInit[1]) / 60);
	let result = 0;
	if(startRes < endRes){
		result = endRes - startRes;
	}else{
		result = (24 - startRes) + endRes;
	}
	result = Math.round(result * 100) / 100;
	q("#result").value = result.toString().replace(".", ",");
}

/**
 * This function runs once on page load and is responsible for connecting all the different JS functions to the correct DOM listeners.
 */
async function prepareInputs(){
	for(const input of document.querySelectorAll("input.input")){
		input.addEventListener("input", () => {
			if(validateInputs()){
				calculateHours();
				togglePageState(true);
			}else{
				togglePageState(false);
			}
		});
	}
	document.addEventListener("paste", (event) => {
		event.preventDefault();
		parsePaste(event);
	});
	
	
	const inputs = [].slice.call(document.querySelectorAll("input.input"));
	const result = q("#result");
	for(const element of [ ...inputs, result ]){
		element.addEventListener("keydown", (event) => {
			if(event.key === "Enter"){
				event.preventDefault();
				copyResult();
			}
		});
	}
	q("#copy a").addEventListener("click", () => {
		copyResult();
	});
	
	result.addEventListener("input", () => {
		if(validateInputs()){
			calculateHours();
		}
	});
	result.addEventListener("mouseup", () => {
		setTimeout(() => {result.select();}, 10);
	});
}

/**
 * Takes whatever number is in the `result` element, and copies it to the clipboard.
 */
async function copyResult(){
	if(!validateInputs()) return;
	
	q("#copy").classList.remove("pressed");
	setTimeout(() => {q("#copy").classList.add("pressed");}, 20);
	
	q("#result").select();
	document.execCommand("copy");
}

/**
 * Validates all inputs against some RegEx rules.
 * 
 * @returns {boolean} - Wether or not the inputs passed the test.
 */
function validateInputs(){
	let valid = true;
	for(const input of document.querySelectorAll("input.input")){
		if(!input.value && !input.value.match(/^(?<timestamp>[01]\d|2[0123]|\d):\d{1,2}$/u)) valid = false;
	}
	return valid;
}

/**
 * Inserts the current time (+1 minute) into the `end` input.
 * The idea is that the user is probably registering some time that ended just now.
 */
async function insertTime(){
	const currentDate = new Date();
	currentDate.setMinutes(currentDate.getMinutes() + 1);
	
	q("input#end").value = `${p(currentDate.getHours())}:${p(currentDate.getMinutes())}`;
}

/**
 * Registers the servicerworker.
 */
async function registerServiceWorker(){
	if("serviceWorker" in navigator){
		navigator.serviceWorker.register("/serviceworker.js");
	}
}



document.addEventListener("DOMContentLoaded", () => {
	prepareInputs();
	insertTime();
	registerServiceWorker();
});
