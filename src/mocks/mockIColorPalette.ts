/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

// powerbi.extensibility
import powerbi from "powerbi-visuals-api";
import IColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;
import IColorInfo = powerbi.IColorInfo;

export class MockIColorPalette implements IColorPalette {
    /**
     * This array represents the default colors of the IColorPalette.
     */
    private static DefaultColors: IColorInfo[] = [
        // First loop
        { value: "#01B8AA" },
        { value: "#374649" },
        { value: "#FD625E" },
        { value: "#F2C80F" },
        { value: "#5F6B6D" },
        { value: "#8AD4EB" },
        { value: "#FE9666" }, // Bethany"s Mango
        { value: "#A66999" },
        { value: "#3599B8" },
        { value: "#DFBFBF" },

        // Second loop
        { value: "#4AC5BB" },
        { value: "#5F6B6D" },
        { value: "#FB8281" },
        { value: "#F4D25A" },
        { value: "#7F898A" },
        { value: "#A4DDEE" },
        { value: "#FDAB89" },
        { value: "#B687AC" },
        { value: "#28738A" },
        { value: "#A78F8F" },

        // Third loop
        { value: "#168980" },
        { value: "#293537" },
        { value: "#BB4A4A" },
        { value: "#B59525" },
        { value: "#475052" },
        { value: "#6A9FB0" },
        { value: "#BD7150" },
        { value: "#7B4F71" },
        { value: "#1B4D5C" },
        { value: "#706060" },

        // Fourth loop
        { value: "#0F5C55" },
        { value: "#1C2325" },
        { value: "#7D3231" },
        { value: "#796419" },
        { value: "#303637" },
        { value: "#476A75" },
        { value: "#7E4B36" },
        { value: "#52354C" },
        { value: "#0D262E" },
        { value: "#544848" },
    ];

    private colors: IColorInfo[];
    private colorIndex: number = 0;

    constructor(colors: IColorInfo[] = []) {
        this.colors = colors;
    }

    public getColor(key: string): IColorInfo {
        let color = this.colors[key];
        if (color) {
            return color;
        }

        let colors = MockIColorPalette.DefaultColors;
        color = this.colors[key] = colors[this.colorIndex++];

        if (this.colorIndex >= colors.length) {
            this.colorIndex = 0;
        }

        return color;
    }

    isHighContrast: true;
    foreground: {value: "#333333" };
    foregroundLight: {value: "#FFF" };
    foregroundDark: {value: "#000" };
    foregroundNeutralLight: {value: "#EAEAEA" };
    foregroundNeutralDark: {value: "#212121" };
    foregroundNeutralSecondary: {value: "#666666" };
    foregroundNeutralSecondaryAlt: {value: "#777777" };
    foregroundNeutralSecondaryAlt2: {value: "#888888" };
    foregroundNeutralTertiary: {value: "#A6A6A6" };
    foregroundNeutralTertiaryAlt: {value: "#C8C8C8" };
    foregroundSelected: {value: "#333333" };
    foregroundButton: {value: "#666666" };
    background: {value: "#FFF" };
    backgroundLight: {value: "#EAEAEA" };
    backgroundNeutral: {value: "#C8C8C8" };
    backgroundDark: {value: "#000" };
    hyperlink: {value: "#1F3A93" };
    visitedHyperlink: {value: "#551A8B" };
    mapPushpin: {value: "#FF5F00" };
    shapeStroke: {value: "#01B8AA" };
    selection: {value: undefined };
    separator: {value: undefined };
    negative: {value: undefined };
    neutral: {value: undefined };
    positive: {value: undefined };

    public reset(): IColorPalette {
        return this;
    }
}