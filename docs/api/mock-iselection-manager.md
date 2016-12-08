# MockISelectionManager
> The ```MockISelectionManager``` provides fake implementation of ```ISelectionManager```.

The ```powerbi.extensibility.utils.test.mocks``` module provides the following functions and classes:

* [MockISelectionManager](#mockiselectionmanager-1)
* [createSelectionManager](#createselectionmanager)

## MockISelectionManager

This class implements [ISelectionManager](https://github.com/Microsoft/PowerBI-visuals-tools/blob/master/templates/visuals/.api/v1.3.0/PowerBI-visuals.d.ts#L1169) in order to test custom visuals without external dependencies such as Power BI Framework.
Please note, it's fake implementation of ```ISelectionManager```, in other words, it should be used only with unit tests.

```typescript
import IPromise = powerbi.IPromise;
import ISelectionId = powerbi.visuals.ISelectionId;
import ISelectionManager = powerbi.extensibility.ISelectionManager;

class MockISelectionManager implements ISelectionManager {
    select(selectionId: ISelectionId | ISelectionId[], multiSelect?: boolean): IPromise<ISelectionId[]>;
    hasSelection(): boolean;
    clear(): IPromise<{}>;
    getSelectionIds(): ISelectionId[];
    containsSelection(id: ISelectionId): boolean;
}
```

## createSelectionManager

This function creates and returns an instance of ```ISelectionManager``` (it's actually ```MockISelectionManager```).

```typescript
import mocks = powerbi.extensibility.utils.test.mocks;

mocks.createSelectionManager();

// returns: an instance of ISelectionManager.
```