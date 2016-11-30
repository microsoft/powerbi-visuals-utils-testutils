# MockIColorPalette
> The ```MockIColorPalette``` provides fake implementation of ```IColorPalette```.

The ```powerbi.extensibility.utils.test.mocks``` module provides the following functions and classes:

* [MockIColorPalette](#mockicolorpalette-1)
* [createColorPalette](#createcolorpalette)

## MockIColorPalette

This class implements [IColorPalette](https://github.com/Microsoft/PowerBI-visuals-tools/blob/master/templates/visuals/.api/v1.3.0/PowerBI-visuals.d.ts#L1199) in order to test custom visuals without external dependencies such as Power BI Framework.
Please note, it's fake implementation of ```IColorPalette```, in other words, it should be used only with unit tests.

```typescript
import IColorPalette = powerbi.extensibility.IColorPalette;

class MockIColorPalette implements IColorPalette {
    /**
     * This array represents the default colors of IColorPalette.
     */
    private static DefaultColors;
    private colors;
    constructor(colors?: IColorInfo[]);
    getColor(key: string): IColorInfo;
}
```

## createColorPalette

This function creates and returns an instance of ```IColorPalette``` (it's actually ```MockIColorPalette```).

```typescript
function createColorPalette(colors?: IColorInfo[]): IColorPalette;
```

### Example

```typescript
import mocks = powerbi.extensibility.utils.test.mocks;

mocks.createColorPalette();

// returns: an instance of IColorPalette.
```
