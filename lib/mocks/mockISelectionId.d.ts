/// <reference types="powerbi-visuals-tools" />
import powerbi from "powerbi-visuals-tools";
import Selector = powerbi.data.Selector;
import SelectorsByColumn = powerbi.data.SelectorsByColumn;
import ISelectionId = powerbi.visuals.ISelectionId;
export declare class MockISelectionId implements ISelectionId {
    private key;
    constructor(key: string);
    equals(other: ISelectionId): boolean;
    includes(other: ISelectionId, ignoreHighlight?: boolean): boolean;
    getKey(): string;
    getSelector(): Selector;
    getSelectorsByColumn(): SelectorsByColumn;
    hasIdentity(): boolean;
}
