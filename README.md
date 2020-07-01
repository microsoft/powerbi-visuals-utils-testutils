# Microsoft Power BI visuals TestUtils
 [![Coverage Status](https://coveralls.io/repos/github/Microsoft/powerbi-visuals-utils-testutils/badge.svg?branch=master)](https://coveralls.io/github/Microsoft/powerbi-visuals-utils-testutils?branch=master) [![npm version](https://img.shields.io/npm/v/powerbi-visuals-utils-testutils.svg)](https://www.npmjs.com/package/powerbi-visuals-utils-testutils) [![npm](https://img.shields.io/npm/dm/powerbi-visuals-utils-testutils.svg)](https://www.npmjs.com/package/powerbi-visuals-utils-testutils)

> TestUtils is a set of mocks and fakes in order to simplify unit testing for Power BI custom visuals

## Usage
* [Usage Guide](https://docs.microsoft.com/en-us/power-bi/developer/visuals/utils-test)

## 2.3.0 Migration note

From version 2.3.0 `testDom` function returns `HTMLElement` instead of `JQuery` object. If you are using JQuery in tests, wrap the `testDom` calls with `$(...)` for compatibility:

```typescript
    // 2.2.1 and below
    let element: JQuery = testDom("100", "100");
    // 2.3.0 and above
    let element: JQuery = $(testDom("100", "100"));
```

The motivation is not to force JQuery usage. It might be not necessary in tests. In lots of cases `element.get(0)` is the next operation after receiving an element with `testDom`. Now JQuery is not required to use powerbi-visuals-utils-testutils, so you can drop this dependency. If you keep it, you can easily migrate your code to 2.3.* version using the example above.


## Contributing
* Read our [contribution guideline](./CONTRIBUTING.md) to find out how to contribute bugs fixes and improvements
* [Issue Tracker](https://github.com/Microsoft/powerbi-visuals-utils-testutils/issues)
* [Development workflow](./docs/dev/development-workflow.md)
* [How to build](./docs/dev/development-workflow.md#how-to-build)
* [How to run unit tests locally](./docs/dev/development-workflow.md#how-to-run-unit-tests-locally)

## License
See the [LICENSE](./LICENSE) file for license rights and limitations (MIT).
