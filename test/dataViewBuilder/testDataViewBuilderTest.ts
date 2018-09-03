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

import { TestDataViewBuilder } from "../../src/dataViewBuilder/testDataViewBuilder";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;

describe("TestDataViewBuilder", () => {
    describe("getDataView", () => {
        let dataView: DataView;

        beforeEach(() => {
            const dataViewBuilder: TestDataViewBuilder = new TestDataViewBuilderImplementation();

            dataView = dataViewBuilder.getDataView();
        });

        it("should return a dataView", () => {
            expect(dataView).toBeDefined();
        });

        it("dataView.categorical should be correct", () => {
            expect(dataView.categorical).toBeDefined();

            expect(dataView.categorical.categories.length).toBe(1);

            expect(dataView.categorical.categories[0]).toBeDefined();
            expect(dataView.categorical.categories[0].identity.length).toBe(2);
            expect(dataView.categorical.categories[0].identityFields.length).toBe(1);

            expect(dataView.categorical.categories[0].source).toBeDefined();
            expect(dataView.categorical.categories[0].source.displayName).toBe(TestDataViewBuilderImplementation.ColumnSource);
            expect(dataView.categorical.categories[0].source.roles[TestDataViewBuilderImplementation.ColumnSource]).toBeTruthy();

            expect(dataView.categorical.categories[0].values).toBeDefined();
            expect(dataView.categorical.categories[0].values[0]).toBe(TestDataViewBuilderImplementation.Column1);
            expect(dataView.categorical.categories[0].values[1]).toBe(TestDataViewBuilderImplementation.Column2);

            expect(dataView.categorical.values).toBeDefined();
            expect(dataView.categorical.values.length).toBe(1);

            expect(dataView.categorical.values[0].source).toBeDefined();
            expect(dataView.categorical.values[0].source.displayName).toBe(TestDataViewBuilderImplementation.ColumnValue);
            expect(dataView.categorical.values[0].source.isMeasure).toBeTruthy();

            expect(dataView.categorical.values[0].values[0]).toBe(TestDataViewBuilderImplementation.Value1);
            expect(dataView.categorical.values[0].values[1]).toBe(TestDataViewBuilderImplementation.Value2);
        });

        it("dataView.metadata should be correct", () => {
            expect(dataView.metadata).toBeDefined();

            expect(dataView.metadata.columns).toBeDefined();
            expect(dataView.metadata.columns[0]).toBeDefined();
            expect(dataView.metadata.columns[1]).toBeDefined();

            expect(dataView.metadata.columns[0].displayName).toBe(TestDataViewBuilderImplementation.ColumnSource);
            expect(dataView.metadata.columns[0].roles[TestDataViewBuilderImplementation.ColumnSource]).toBeTruthy();

            expect(dataView.metadata.columns[1].displayName).toBe(TestDataViewBuilderImplementation.ColumnValue);
            expect(dataView.metadata.columns[1].roles[TestDataViewBuilderImplementation.ColumnValue]).toBeTruthy();
        });
    });
});

class TestDataViewBuilderImplementation extends TestDataViewBuilder {
    public static ColumnSource: string = "Source";
    public static ColumnValue: string = "Value";

    public static Column1: string = "Column1";
    public static Column2: string = "Column2";

    public static Value1: number = 3.14;
    public static Value2: number = 6.28;

    public columns: string[] = [
        TestDataViewBuilderImplementation.Column1,
        TestDataViewBuilderImplementation.Column2
    ];

    public values: number[] = [
        TestDataViewBuilderImplementation.Value1,
        TestDataViewBuilderImplementation.Value2
    ];

    public getDataView(columnNames?: string[]): DataView {
        return this.createCategoricalDataViewBuilder([
            {
                source: {
                    displayName: TestDataViewBuilderImplementation.ColumnSource,
                    roles: { [TestDataViewBuilderImplementation.ColumnSource]: true }
                },
                values: this.columns
            }
        ], [
                {
                    source: {
                        displayName: TestDataViewBuilderImplementation.ColumnValue,
                        roles: { [TestDataViewBuilderImplementation.ColumnValue]: true },
                        isMeasure: true
                    },
                    values: this.values
                }
            ], columnNames).build();
    }
}
