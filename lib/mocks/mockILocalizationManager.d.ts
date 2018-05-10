/// <reference types="powerbi-visuals-tools" />
import ILocalizationManager = powerbi.extensibility.ILocalizationManager;
export declare class MockILocalizationManager implements ILocalizationManager {
    private displayNames;
    private static DefaultDispalyNames;
    constructor(displayNames: any);
    getDisplayName(key: string): string;
}
