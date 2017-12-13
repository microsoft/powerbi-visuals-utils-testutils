import Selector = powerbi.data.Selector;
import ISelectionId = powerbi.visuals.ISelectionId;
export declare class MockISelectionId implements ISelectionId {
    private key;
    constructor(key: string);
    equals(other: ISelectionId): boolean;
    includes(other: ISelectionId, ignoreHighlight?: boolean): boolean;
    getKey(): string;
    getSelector(): Selector;
    getSelectorsByColumn(): Selector;
    hasIdentity(): boolean;
}
