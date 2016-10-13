
# Boilerplate Blender

![Travis Build Status](https://travis-ci.org/ardentic/boilerplate-blender.svg?branch=master)

Simple boilerplate to quickly start web projects using modern standards. Uses Gulp to run Stylus, PostCSS, ESLint, Browserify and Modernizr.

## Installation

Install Gulp globally
```
npm install -g gulp-cli
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

* `npm start` - Start PHP server connected with browser sync
* `npm run build` - Build project to public folder
* `npm run clean` - Clean all compiled and bundled assets in public folder

The `NODE_ENV` setting will be used to determine the build environment when running `npm run build`. For production be sure to use `NODE_ENV=production`.

## Server

Running `npm start` without parameters will start the server in the current working directory on port 8000. Both the document root and the port can passed as parameters to `npm start`.

```
npm start -- --port=8010 --documentRoot=public
```

It is also possible to specify the port and the document root as environment variables in the `.env` file.

```
PORT=8010
DOCUMENT_ROOT=public
```

The command line arguments has precedence over the environment variables.
