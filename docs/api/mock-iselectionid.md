# MockISelectionId
> The ```MockISelectionId``` provides fake implementation of ```ISelectionId```.

The ```powerbi.extensibility.utils.test.mocks``` module provides the following functions and classes:

* [MockISelectionId](#mockiselectionid-1)
* [createSelectionId](#createselectionid)

## MockISelectionId

This class implements [ISelectionId](https://github.com/Microsoft/PowerBI-visuals-tools/blob/master/templates/visuals/.api/v1.3.0/PowerBI-visuals.d.ts#L278) in order to test custom visuals without external dependencies such as Power BI Framework.
Please note, it's fake implementation of IVisualHost, in other words, it should be used only with unit tests.

```typescript
import Selector = powerbi.data.Selector;
import ISelectionId = powerbi.visuals.ISelectionId;

class MockISelectionId implements ISelectionId {
    private key;
    constructor(key: string);
    equals(other: ISelectionId): boolean;
    includes(other: ISelectionId, ignoreHighlight?: boolean): boolean;
    getKey(): string;
    getSelector(): Selector;
    getSelectorsByColumn(): Selector;
    hasIdentity(): boolean;
}
```

## createSelectionId

This function creates and returns an instance of ```ISelectionId``` (it's actually ```MockISelectionId```).

```typescript
function createSelectionId(key?: string): ISelectionId;
```

### Example

```typescript
import mocks = powerbi.extensibility.utils.test.mocks;

mocks.createSelectionId();

// returns: an instance of ISelectionId.
```