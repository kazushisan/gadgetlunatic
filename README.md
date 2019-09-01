# gadgetlunatic

[![Netlify Status](https://api.netlify.com/api/v1/badges/6167cc58-9975-4a8e-8f29-8b5cb061ec6f/deploy-status)](https://app.netlify.com/sites/gadgetlunatic/deploys)

## What is this repo?

This repository contains the source code for `gadgetlunatic.com`, a personal webite / tech blog built with Hugo.

```
├── README.md
├── archetypes
├── config.toml
├── content # the articles
├── layouts
├── node_modules
├── package.json
├── resources
├── src # the Javascript and SCSS files that make the website
├── webpack.config.js
└── yarn.lock
```

## Prerequisites

- Hugo
- Node.js (v10.15.3)
- Yarn

## Setup

```bash
git clone https://github.com/kazushisan/gadgetlunatic.git
cd gadgetlunatic
yarn install
```

## Develop / Write

```bash
yarn start
```

The result can be seen on `http://localhost:1313`.

Webpack is used to bundle and handle assets under `/src`. To reduce disk writes, Webpack will not write write the bundled files to local storage during development. Instead, `webpack-dev-server` will start on `http://localhost:1314` and host the bundled files from memory.

Hugo will run a server on `http://localhost:1313` and reference the Javascript / SCSS files hosted on `http://localhost:1314`.

Therefore, make sure that `webpack-dev-server` is also running along with Hugo when developing or writing.

## Build

```bash
yarn build
```

Webpack will process Javascript/SCSS files and assets under `/src` and write to `/static`. It will also produce `/data/manifest.json` which includes the paths to bundled files.

Using this manifest, Hugo will build the articles to `/public`. Hugo will fail to build the website if `/data/manifest.json` is not present.

## Deploy

The website will deploy automatically when a commit is pushed to `origin/master`

`gadgetlunatic.com` is hosted as a static website using Netlify.

## Lint

Make sure that all Linters pass before making a commit.

```bash
yarn lint
# or to fix automatically,
yarn lint:fix
```

Uses ESLint, Prettier, Stylelint to lint Javascript and SCSS files.
