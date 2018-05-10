/// <reference types="powerbi-visuals-tools" />
import powerbi from "powerbi-visuals-tools";
import IColorPalette = powerbi.extensibility.IColorPalette;
import IColorInfo = powerbi.IColorInfo;
export declare class MockIColorPalette implements IColorPalette {
    /**
     * This array represents the default colors of the IColorPalette.
     */
    private static DefaultColors;
    private colors;
    private colorIndex;
    constructor(colors?: IColorInfo[]);
    getColor(key: string): IColorInfo;
}
