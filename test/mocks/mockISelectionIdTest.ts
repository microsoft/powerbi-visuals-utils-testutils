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
    // powerbi.data
    import Selector = powerbi.data.Selector;

    // powerbi.visuals
    import ISelectionId = powerbi.visuals.ISelectionId;

    // powerbi.extensibility.utils.test.mocks
    import MockISelectionId = powerbi.extensibility.utils.test.mocks.MockISelectionId;
    import createSelectionId = powerbi.extensibility.utils.test.mocks.createSelectionId;

    describe("MockISelectionId", () => {
        const key: string = "Custom_Key";

        let selectionId: ISelectionId;

        beforeEach(() => {
            selectionId = createSelectionId(key);
        });

        describe("equals", () => {
            it("should return true if the instances are the same", () => {
                expect(selectionId.equals(selectionId)).toBeTruthy();
            });
        });

        describe("includes", () => {
            it("should return true if the instances are the same", () => {
                expect(selectionId.includes(selectionId)).toBeTruthy();
            });
        });

        describe("getKey", () => {
            it("should return the given key", () => {
                expect(selectionId.getKey()).toBe(key);
            });
        });

        describe("getSelector", () => {
            it("should return a plain object", () => {
                const selector: Selector = selectionId.getSelector();

                expect(Object.keys(selector).length).toBe(0);
            });
        });

        describe("getSelectorsByColumn", () => {
            it("should return a plain object", () => {
                const selector: Selector = selectionId.getSelectorsByColumn();

                expect(Object.keys(selector).length).toBe(0);
            });
        });

        describe("hasIdentity", () => {
            it("should return true", () => {
                expect(selectionId.hasIdentity()).toBeTruthy();
            });
        });
    });

    describe("createSelectionId", () => {
        it("should return an instance of MockISelectionId", () => {
            const instance: ISelectionId = createSelectionId();

            expect(instance instanceof MockISelectionId).toBeTruthy();
        });
    });
}
