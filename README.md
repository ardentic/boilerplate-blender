
# Boilerplate Blender

![Travis Build Status](https://travis-ci.org/ardentic/boilerplate-blender.svg?branch=master)

Simple boilerplate to quickly start web projects using modern standards. Uses Gulp to run Stylus, PostCSS, ESLint, Browserify and Modernizr.

## Installation

Install Gulp globally
```
npm install -g gulp
```

Install dependencies
```
npm install
```

Create local `.env` file
```
cp .env.example .env
```

## Usage

* `gulp` - Build project in development mode
* `gulp --production` - Build project in production mode
* `gulp clean` - Clean all compiled and bundled assets in public folder
* `gulp watch` - Watch for changes and build project in development mode
