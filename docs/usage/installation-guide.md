# How to install
If you would like to install the Power BI visuals TestUtils to your custom visual please pay attention to these items:
* [Requirements](#requirements)
* [Installation](#installation)
* [Including declarations to the build flow](#including-declarations-to-the-build-flow)
* [Including artifacts to the unit test infrastructure](#including-artifacts-to-the-unit-test-infrastructure)

## Requirements
To use the package you should have the following things:
* [node.js](https://nodejs.org) (we recommend the latest LTS version)
* [npm](https://www.npmjs.com/) (the minimal supported version is 3.0.0)
* The custom visual created by [PowerBI-visuals-tools](https://github.com/Microsoft/PowerBI-visuals-tools)

## Installation
To install the package you should run the following command in the directory with your current custom visual:

```bash
npm install powerbi-visuals-utils-testutils --save
```

This command installs the package and adds a package as a dependency to your ```package.json```

After installation of the package, you should install the [typings](https://www.npmjs.com/package/typings) package as a global dependency by using the following command:
```bash
npm install typings -g
```

After that, you should run the following command in the directory with your current custom visual:
```bash
typings install --save --global dt~d3 dt~jasmine dt~jasmine-jquery dt~jquery dt~lodash
```

This command installs type declarations to the ```typings``` directory. These declarations are necessary for TypeScript compiler and Intellisense.

## Including declarations to the build flow
The package contains ```d.ts``` declarations file, it's necessary for TypeScript compiler and it helps to develop your visuals fast and confident. You should add the following files:
* ```typings/index.d.ts```
* ```node_modules/powerbi-visuals-utils-testutils/lib/index.d.ts```

## Including artifacts to the unit test infrastructure
To use the package with your custom visuals your should add the following files:
* ```node_modules/jquery/dist/jquery.min.js```
* ```node_modules/lodash/lodash.min.js```
* ```node_modules/d3/d3.min.js```
* ```node_modules/jasmine-jquery/lib/jasmine-jquery.js```
* ```node_modules/powerbi-visuals-utils-testutils/lib/index.js```

That's it. :rocket: :metal: That's a good time to read our [Usage Guide](./usage-guide.md).
