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
    // powerbi.visuals
    import ISelectionIdBuilder = powerbi.visuals.ISelectionIdBuilder;
    import ISelectionId = powerbi.visuals.ISelectionId;

    // powerbi.extensibility.utils.test.mocks
    import MockISelectionId = powerbi.extensibility.utils.test.mocks.MockISelectionId;
    import MockISelectionIdBuilder = powerbi.extensibility.utils.test.mocks.MockISelectionIdBuilder;
    import createSelectionIdBuilder = powerbi.extensibility.utils.test.mocks.createSelectionIdBuilder;

    describe("MockISelectionIdBuilder", () => {
        let selectionIdBuilder: ISelectionIdBuilder;

        beforeEach(() => {
            selectionIdBuilder = createSelectionIdBuilder();
        });

        describe("withCategory", () => {
            it("should return an instance of ISelectionIdBuilder", () => {
                const result: ISelectionIdBuilder = selectionIdBuilder.withCategory(null, 0);

                expect(result instanceof MockISelectionIdBuilder);
            });
        });

        describe("withSeries", () => {
            it("should return an instance of ISelectionIdBuilder", () => {
                const result: ISelectionIdBuilder = selectionIdBuilder.withSeries(null, null);

                expect(result instanceof MockISelectionIdBuilder);
            });
        });

        describe("withMeasure", () => {
            it("should return an instance of ISelectionIdBuilder", () => {
                const result: ISelectionIdBuilder = selectionIdBuilder.withMeasure(null);

                expect(result instanceof MockISelectionIdBuilder);
            });
        });

        describe("createSelectionId", () => {
            it("should return an instance of MockISelectionId", () => {
                const selectionId: ISelectionId = selectionIdBuilder.createSelectionId();

                expect(selectionId instanceof MockISelectionId).toBeTruthy();
            });
        });
    });

    describe("createSelectionIdBuilder", () => {
        it("should return an instance of ISelectionIdBuilder", () => {
            const instance: ISelectionIdBuilder = createSelectionIdBuilder();

            expect(instance instanceof MockISelectionIdBuilder).toBeTruthy();
        });
    });
}
