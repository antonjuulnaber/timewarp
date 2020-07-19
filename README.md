# Timewarp
[![Live Dependencies](https://img.shields.io/david/atjn/timewarp.svg?style=for-the-badge&label=Live%20Dependencies)](https://david-dm.org/atjn/timewarp)
[![Dev dependencies](https://img.shields.io/david/dev/atjn/timewarp?style=for-the-badge)](https://david-dm.org/atjn/timewarp?type=dev)
[![Build](https://img.shields.io/netlify/5bf06725-c9f2-478d-979e-598116ad3e4c?label=build&logo=netlify&style=for-the-badge)](https://app.netlify.com/sites/timewarp/deploys)

[![Website](https://img.shields.io/website?url=https%3A%2F%2Ftimewarp.atjn.dk&style=for-the-badge&logo=netlify)](https://timewarp.atjn.dk)
[![MDN Observatory](https://img.shields.io/mozilla-observatory/grade/timewarp.atjn.dk?publish&style=for-the-badge&logo=mozilla)](https://observatory.mozilla.org/analyze/timewarp.atjn.dk)
[![W3C HTML](https://img.shields.io/w3c-validation/html?label=HTML&targetUrl=https%3A%2F%2Ftimewarp.atjn.dk&style=for-the-badge&logo=w3c)](https://validator.nu/?doc=https%3A%2F%2Ftimewarp.atjn.dk&parser=html)

Timewarp is a tool for quickly converting time spent in hours and minutes to just hours (decimal).

Timewarp uses experimental CSS features that are currently under heavy development in browsers. While the app definetely works, expect it to be buggy, and make sure you're keeping your browser up to date. I hope that the features will be standardised before the end of this year, which would mean the app would also become stable by the end of the year.

I use this app every day, and i don't really expect anyone else to use it. If anyone wants to use it, and want to provide feedback or request features, feel free to do so, i'll definetely look into it :)

## Building
This repo only contains source files. In order to build the final project files, the repo must be build with node.js:
1. Open node.js on your system and navigate to the root of this repository.
2. Make sure all dependencies are installed. The quick and easy solution to this, is to run `npm install`, which will install the necessary dependencies locally for this repo only.
3. Run `npm run build`.
4. Serve all files in the `public` folder with a webserver. That should serve the entire app as intended.

### What happens during a build
When building, the script will perform the following steps:
1. Compile all typescript files to javascript.
2. Insert a unique ID in the serviceworker, differentiating the build from all other builds.
3. Minify html, css and js files.

### Building during development
It is possible to build a working copy during development by running `npm run build-dev`. The dev-build will update itself whenever changes are made in the source files. Practically speaking, the dev-build will be identical to a final build, but it is not minified, meaning there can in rare occasions be wierd errors in the final build that weren't catched in the dev-build.

### Images
Because of the complexity of minifying images properly, image minification is done manually. All original image sources should be saved in the `image-sources` folder, mimicking the structure and names of the images in the `public/images` folder. This way, it is easy to find correlating source and minified images, which is handy if the minified image should ever need to be changed in some way.
Whenever possible, files should be in `SVG` format, and should be minified using [SVGOMG](https://jakearchibald.github.io/svgomg/).
Failing that, files should be transcoded to `WebP` using [Squoosh.app](https://squoosh.app).
