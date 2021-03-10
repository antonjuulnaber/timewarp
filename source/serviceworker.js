"use strict";

const currentCache = "!build_insert_id!";
const urlsToCache = [
	"/manifest.json",
	"/",
	"/style.css",
	"/script.js",
	"/images/logo.svg",
	"/images/logo_192.png",
	"/images/logo_512.png",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(currentCache).then((cache) => {
			return cache.addAll(urlsToCache);
		}).catch((e) => {
			console.error(`SW failed to install: could not load cache ${currentCache}: ${e}`);
		}),
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if(currentCache.indexOf(cacheName) === -1){
						return caches.delete(cacheName);
					}
				}),
			);
		}).catch((e) => {
			console.error(`SW failed to activate: could not remove legacy cache: ${e}`);
		}),
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(
			event.request,
		).then((response) => {
			if(response){
				return response;
			}
			return fetch(event.request);
		}).catch((e) => {
			console.error(`SW failed to fetch resource: ${e}`);
		}),
	);
});
