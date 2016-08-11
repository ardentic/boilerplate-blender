
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

* `npm start` - Start PHP server connected with browser sync
* `npm run build` - Build project to public folder
* `npm run clean` - Clean all compiled and bundled assets in public folder

When running `npm run build` it will use the `NODE_ENV` to determine whether or not the build should be considered a production or development build.

## Server

Only running `npm start` will start the server in the current working directory on port 8000. Both directory and the port can passed as parameters to `npm start`.

```
npm start -- --port=8010 --documentRoot=public
```

It is also possible to specify the port and root directory as environment variables in the `.env` file.

```
PORT=8010
DOCUMENT_ROOT=public
```

The environment variables has precedence over the command line arguments.
