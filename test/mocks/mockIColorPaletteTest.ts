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

/// <reference path="../_references.ts" />

module powerbi.extensibility.utils.test.mocks.test {
    // powerbi
    import IColorInfo = powerbi.IColorInfo;

    // powerbi.extensibility
    import IColorPalette = powerbi.extensibility.IColorPalette;

    // powerbi.extensibility.utils.test.mocks
    import MockIColorPalette = powerbi.extensibility.utils.test.mocks.MockIColorPalette;
    import createColorPalette = powerbi.extensibility.utils.test.mocks.createColorPalette;

    describe("MockIColorPalette", () => {
        let colorPalette: IColorPalette;

        beforeEach(() => {
            colorPalette = createColorPalette();
        });

        describe("getColor", () => {
            it("the method should be defined", () => {
                expect(colorPalette.getColor).toBeDefined();
            });

            it("should return red as a first color", () => {
                const color: IColorInfo = colorPalette.getColor("0");

                expect(color.value).toBe("red");
            });
        });
    });

    describe("createColorPalette", () => {
        it("should return an instance of MockIColorPalette", () => {
            const instance: IColorPalette = createColorPalette();

            expect(instance instanceof MockIColorPalette).toBeTruthy();
        });
    });
}
