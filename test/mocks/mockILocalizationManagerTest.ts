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
    // powerbi.extensibility.utils.test.mocks
    import ILocalizationManager = powerbi.extensibility.ILocalizationManager;
    import MockILocalizationManager = powerbi.extensibility.utils.test.mocks.MockILocalizationManager;
    import createLocalizationManager = powerbi.extensibility.utils.test.mocks.createLocalizationManager;

    describe("MockILocalizationManager", () => {
        let localizationManager: ILocalizationManager;

        describe("with displayNames", () => {
            beforeAll(() => {
                localizationManager = createLocalizationManager({
                    "Utils_key": "Utils_value",
                });
            });

            describe("key is not member", () => {
                it("should return null", () => {
                    expectDisplayName(null, null);
                });

                it("should return undefined", () => {
                    expectDisplayName(undefined, undefined);
                });

                it("should return empty string", () => {
                    expectDisplayName("", "");
                });

                it("should return number", () => {
                    const num: string = 1 as any;
                    expectDisplayName(num, num);
                });

                it("should return display name by key", () => {
                    expectDisplayName("Utils_key", "Utils_value");
                });

                it("should return default display name for Visual_General", () => {
                    expectDisplayName("Visual_General", "General");
                });
            });
        });

        describe("without displayNames", () => {
            beforeAll(() => {
                localizationManager = createLocalizationManager();
            });

            describe("key is not member", () => {
                it("should return null", () => {
                    expectDisplayName(null, null);
                });

                it("should return undefined", () => {
                    expectDisplayName(undefined, undefined);
                });

                it("should return empty string", () => {
                    expectDisplayName("", "");
                });

                it("should return number", () => {
                    const num: string = 1 as any;
                    expectDisplayName(num, num);
                });

                it("should return default display name for Visual_General", () => {
                    expectDisplayName("Visual_General", "General");
                });
            });
        });

        function expectDisplayName(key: string, expectedValue: string) {
            expect(localizationManager.getDisplayName(key)).toBe(expectedValue);
        }
    });
}
