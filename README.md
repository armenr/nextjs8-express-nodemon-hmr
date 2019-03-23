# NextJS + Express Custom Server + Nodemon + Working HMR

## Problem

I love NextJS. I have read all of their documentation. Everything makes lots of sense to me. Conceptually, I love what they're doing.

If you check example documentation and search through the web, you'll find that when you want to use a CUSTOM server with NextJS, the recommendation is to change the `dev` line in Package.json **from this:**

```
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "node ."
  },
```

**to this:**

```
  "scripts": {
    "dev": "node index.js",
    "build": "next build",
    "start": "node ."
  },
```

That's cool, **but what if you want to develop on the server, and have the changes compile on the fly?** You'd instead do this, right? -->

```
  "scripts": {
    "dev": "nodemon index.js",
    "build": "next build",
    "start": "node ."
  },
```

Unfortunately, when you run `nodemon index.js`, you run into the following **_major problem_:**

**Every change you make to any file inside the project folder triggers nodemon to restart & recompile everything.**

So, functionally, **you lose the benefit of Hot-Module-Replacement in NextJS - since any change to your front-end code triggers the entire server & everything to restart and recompile.** That's slow, and very annoying.

## Solution

Nodemon allows you to specify what to watch and/or what to ignore.

So, there are two ways to skin this cat:

1. **Opt-In**: Explicitly tell nodemon what to watch, which can get lengthy and annoying

2. **Opt-Out**: Explicitly tell nodemon what to ignore, which is more concise and simple.

We, have decided to go with the second option. We _want_ nodemon to trigger a full restart to pick up new server code, new modules, and new environment variables. We prefer to explicitly specify what NOT to watch, and default to watching everything else.

The result is that nodemon **WILL NOT** trigger a full restart when you make changes to your NextJS React application, leaving NextJS and its built-in webpack to leverage hot module reloading.

Nodemon **WILL** trigger a full restart when you DO make changes to environment variables, your express server, you configurations, installed packages and modules, etc.

We do it in the following way:

**Set up nodemon ignore list in package.json**

`package.json`:

```
"nodemonConfig": {
"verbose": false,
"ignore": [
"./.next",
"./frontend",
"./components",
"./pages",
".gitignore",
".env.dist",
"./node_modules"
  ]
}
```

**Move all front-end/application code into ./frontend & tell Express + NextJS where to find it**

`./index.js`

```
    const nextApp = next({
      dev: process.env.NODE_ENV !== 'production',
      dir: './frontend'
    });
```

## Getting Started

This boilerplate includes the `dotenv` NodeJS module. The `.env.dist` file is your standard `.env`, which gets copied during setup. Modify that to add new environment variables and ship a clean/sanitized `.env` template. Of course, `.env` files are included in .gitignore.

**Prerequisite:** Make sure you've got nodemon installed (although we've included it as a dev dependency anyway).

Step 1:

```
npm run setup
```

Step 2:

```
npm run dev:nodemon
```

Standard NextJS dev (optional):

```
npm run dev
```

## Pending

We intend to add a standard Docker file and flow here. It will include the ability to hook up your VSCode Debugger to the Docker instance for inspection and debugging.

## Credits/Maintainers

Thanks to Erik Davtyan for helping me step back from the problem (I was deep into the HMR code built into Next's source): [@erodactyl](https://github.com/erodactyl)

And I'll work to keep this thing updated: [@armenr](https://github.com/armenr)
