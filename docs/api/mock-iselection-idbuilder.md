# MockISelectionIdBuilder
> The ```MockISelectionIdBuilder``` provides fake implementation of ```ISelectionIdBuilder```.

The ```powerbi.extensibility.utils.test.mocks``` module provides the following functions and classes:

* [MockISelectionIdBuilder](#mockiselectionidbuilder-1)
* [createSelectionIdBuilder](#createselectionidbuilder)

## MockISelectionIdBuilder

This class implements [ISelectionIdBuilder](https://github.com/Microsoft/PowerBI-visuals-tools/blob/master/templates/visuals/.api/v1.3.0/PowerBI-visuals.d.ts#L271) in order to test custom visuals without external dependencies such as Power BI Framework.
Please note, it's fake implementation of ```ISelectionIdBuilder```, in other words, it should be used only with unit tests.

```typescript
import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;
import DataViewValueColumn = powerbi.DataViewValueColumn;
import DataViewValueColumnGroup = powerbi.DataViewValueColumnGroup;
import DataViewValueColumns = powerbi.DataViewValueColumns;
import ISelectionIdBuilder = powerbi.visuals.ISelectionIdBuilder;
import ISelectionId = powerbi.visuals.ISelectionId;

class MockISelectionIdBuilder implements ISelectionIdBuilder {
    withCategory(categoryColumn: DataViewCategoryColumn, index: number): this;
    withSeries(seriesColumn: DataViewValueColumns, valueColumn: DataViewValueColumn | DataViewValueColumnGroup): this;
    withMeasure(measureId: string): this;
    createSelectionId(): ISelectionId;
}
```

## createSelectionIdBuilder

This function creates and returns an instance of ```ISelectionIdBuilder``` (it's actually ```MockISelectionIdBuilder```).

```typescript
function createSelectionIdBuilder(): ISelectionIdBuilder;
```

### Example

```typescript
import mocks = powerbi.extensibility.utils.test.mocks;

mocks.createSelectionIdBuilder();

// returns: an instance of ISelectionIdBuilder.
```