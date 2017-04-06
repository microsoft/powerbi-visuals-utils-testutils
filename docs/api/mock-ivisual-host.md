# MockIVisualHost
> The ```MockIVisualHost``` provides fake implementation of ```IVisualHost```.

The ```powerbi.extensibility.utils.test.mocks``` module provides the following functions and classes:

* [MockIVisualHost](#mockivisualhost-1)
* [createVisualHost](#createvisualhost)

## MockIVisualHost

This class implements [IVisualHost](https://github.com/Microsoft/PowerBI-visuals-tools/blob/master/templates/visuals/.api/v1.4.0/PowerBI-visuals.d.ts#L1262) in order to test custom visuals without external dependencies such as Power BI Framework.
Please note, it's fake implementation of ```IVisualHost```, in other words, it should be used only with unit tests.

```typescript
import VisualObjectInstancesToPersist = powerbi.VisualObjectInstancesToPersist;
import ISelectionIdBuilder = powerbi.visuals.ISelectionIdBuilder;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import IColorPalette = powerbi.extensibility.IColorPalette;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

class MockIVisualHost implements IVisualHost {
    constructor(colorPalette?: IColorPalette, selectionManager?: ISelectionManager);
    createSelectionIdBuilder(): ISelectionIdBuilder;
    createSelectionManager(): ISelectionManager;
    colorPalette: IColorPalette;
    locale: string;
    persistProperties(changes: VisualObjectInstancesToPersist): void;
}
```

## createVisualHost

This function creates and returns an instance of ```IVisualHost``` (it's actually ```MockIVisualHost```).

```typescript
function createVisualHost(): IVisualHost;
```

### Example

```typescript
import mocks = powerbi.extensibility.utils.test.mocks;

mocks.createVisualHost();

// returns: an instance of IVisualHost.
```
