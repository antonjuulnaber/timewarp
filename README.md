<p align="center">
  <img src="https://timewarp.atjn.dk/images/logo.svg" width="128px" height="128px" alt>
  <br>
  <h1 align="center">Timewarp</h1>
  <p align="center">A tool for quickly converting time spent in<br>hours and minutes to just hours (decimal)</p>
</p>

<p align="center">
  <a href="https://timewarp.atjn.dk">
    <img src="https://img.shields.io/website?url=https%3A%2F%2Ftimewarp.atjn.dk&label=Website&style=flat-square&logo=netlify" alt="Website status">
  </a>
  <a href="https://observatory.mozilla.org/analyze/timewarp.atjn.dk">
    <img src="https://img.shields.io/mozilla-observatory/grade/timewarp.atjn.dk?publish&label=Observatory&style=flat-square&logo=mozilla" alt="MDN Observatory status">
  </a>
  <a href="https://validator.nu/?doc=https%3A%2F%2Ftimewarp.atjn.dk&parser=html">
    <img src="https://img.shields.io/w3c-validation/html?label=HTML&targetUrl=https%3A%2F%2Ftimewarp.atjn.dk&style=flat-square&logo=w3c" alt="W3C HTML Validator status">
  </a>
  <br>
	<a href="https://github.com/atjn/timewarp/actions/workflows/code-quality.yml">
		<img src="https://img.shields.io/github/workflow/status/atjn/timewarp/Code%20quality?style=flat-square&label=tests" alt="tests status">
	</a>
  <a href="https://www.codacy.com/gh/atjn/timewarp/dashboard">
		<img src="https://img.shields.io/codacy/grade/d4785533451f4f5bb10eac89433133b4?style=flat-square" alt="code quality">
	</a>
  <a href="https://lgtm.com/projects/g/atjn/timewarp/context:javascript">
		<img src="https://img.shields.io/lgtm/grade/javascript/g/atjn/timewarp.svg?style=flat-square&logo=lgtm&label=security%20score" alt="lgtm js security score">
	</a>
	<br>
  <a href="https://david-dm.org/atjn/timewarp">
    <img src="https://img.shields.io/david/atjn/timewarp.svg?style=flat-square&label=Live%20Dependencies" alt="Live Dependencies status">
  </a>
  <a href="https://david-dm.org/atjn/timewarp?type=dev">
    <img src="https://img.shields.io/david/dev/atjn/timewarp?style=flat-square&label=Dev%20Dependencies" alt="Dev dependencies status">
  </a>
  <a href="https://app.netlify.com/sites/timewarp/deploys">
    <img src="https://img.shields.io/netlify/5bf06725-c9f2-478d-979e-598116ad3e4c?label=Build&logo=netlify&style=flat-square" alt="Build status">
  </a>
</p>

## Disclaimer
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
1. Insert a unique ID in the serviceworker, differentiating the build from all other builds.
2. Minify html, css and js files.

### Building during development
It is possible to build a working copy during development by running `npm run build-dev`. The dev-build will update itself whenever changes are made in the source files. Practically speaking, the dev-build will be identical to a final build, but it is not minified, meaning there can in rare occasions be wierd errors in the final build that weren't catched in the dev-build.

### Images
Because of the complexity of minifying images properly, image minification is done manually. All original image sources should be saved in the `image-sources` folder, mimicking the structure and names of the images in the `public/images` folder. This way, it is easy to find correlating source and minified images, which is handy if the minified image should ever need to be changed in some way.
Whenever possible, files should be in `SVG` format, and should be minified using [SVGOMG](https://jakearchibald.github.io/svgomg/).
Failing that, files should be transcoded to `WebP` using [Squoosh.app](https://squoosh.app).
