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
import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;
import DataViewObjects = powerbi.DataViewObjects;
import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import PrimitiveValue = powerbi.PrimitiveValue;
import DataViewValueColumn = powerbi.DataViewValueColumn;
import DataViewCategoricalColumn = powerbi.DataViewCategoricalColumn;

import { DataTable, MatrixDataViewBuilder, ResourceColumnMetadata } from "../dataViewBuilder/matrixBuilder";

import {
    DataViewBuilderColumnOptions, DataViewBuilderValuesColumnOptions,
    DataViewBuilderColumnIdentitySource, IDataViewBuilderCategorical,
    createCategoricalDataViewBuilder, DataViewBuilderCategoryColumnOptions,
    DataViewBuilderSeriesData
} from "./dataViewBuilder";

import isEmpty from "lodash-es/isEmpty";
import includes from "lodash-es/includes";
import uniq from "lodash-es/uniq";
import sum from "lodash-es/sum";
import map from "lodash-es/map";
import max from "lodash-es/max";
import sortBy from "lodash-es/sortBy";
import range from "lodash-es/range";
import clone from "lodash-es/clone";
import toArray from "lodash-es/toArray";
import groupBy from "lodash-es/groupBy";
import flatten from "lodash-es/flatten";
import take from "lodash-es/take";
import findIndex from "lodash-es/findIndex";

export type CustomizeColumnFn = (source: DataViewMetadataColumn) => void;

export interface TestDataViewBuilderColumnOptions extends DataViewBuilderColumnOptions {
    values: any[];
}

export interface TestDataViewBuilderCategoryColumnOptions extends TestDataViewBuilderColumnOptions {
    objects?: DataViewObjects[];
    isGroup?: boolean;
}

export interface DataViewBuilderAllColumnOptions {
    categories: TestDataViewBuilderCategoryColumnOptions[];
    grouped: TestDataViewBuilderCategoryColumnOptions[];
    values: DataViewBuilderValuesColumnOptions[];
}

export abstract class TestDataViewBuilder {
    static DataViewName: string = "Data";
    private aggregateFunction: (array: number[]) => number = sum;

    protected static createMatrixDataViewBuilder(table: DataTable) {
        const tableMetadata = {
            name: "table"
        };
        return new MatrixDataViewBuilder(table, tableMetadata);
    }

    static setDefaultQueryName(source: DataViewMetadataColumn): DataViewMetadataColumn {
        if (!source.queryName) {
            source.queryName = TestDataViewBuilder.DataViewName + "." + source.displayName;
        }

        return source;
    }

    static getDataViewBuilderColumnIdentitySources(options: TestDataViewBuilderColumnOptions[] | TestDataViewBuilderColumnOptions): DataViewBuilderColumnIdentitySource[] {
        let optionsArray: TestDataViewBuilderColumnOptions[] = <any>(Array.isArray(options) ? options : [options]);

        let fields = optionsArray.map(() => { }),
            optionsIdentityExpressions: any[][] = optionsArray.map((opt) => opt.values),
            identityExpressions: any[] = [];

        if (optionsIdentityExpressions.length > 1) {
            let identityExpressionsLength = optionsIdentityExpressions.length,
                identityExpressionsValuesLength = max(map(optionsIdentityExpressions, x => x.length));

            for (let vi = 0; vi < identityExpressionsValuesLength; vi++) {
                let current: any = optionsIdentityExpressions[0][vi];

                identityExpressions.push(current);
            }
        } else {
            identityExpressions = optionsIdentityExpressions[0];
        }

        return optionsArray.map((opt, i) => <DataViewBuilderColumnIdentitySource>{
            fields: fields,
            identities: identityExpressions
        });
    }

    static getValuesTable(categories?: DataViewCategoryColumn[], values?: DataViewValueColumn[]): any[][] {
        let columns = sortBy((categories || []).concat(<any>values || []), x => x.source.index),
            maxLength: number = max(columns.map(x => x.values.length));

        return range(maxLength).map(i => columns.map(x => x.values[i]));
    }

    static createDataViewBuilderColumnOptions(
        categoriesColumns: (TestDataViewBuilderCategoryColumnOptions | TestDataViewBuilderCategoryColumnOptions[])[],
        valuesColumns: (DataViewBuilderValuesColumnOptions | DataViewBuilderValuesColumnOptions[])[],
        filter?: (options: TestDataViewBuilderColumnOptions) => boolean,
        customizeColumns?: CustomizeColumnFn): DataViewBuilderAllColumnOptions {

        let filterColumns = filter
            ? (options) => Array.isArray(options.values) && filter(options)
            : (options) => Array.isArray(options.values);

        let resultCategoriesColumns = isEmpty(categoriesColumns) ? [] : (<TestDataViewBuilderCategoryColumnOptions[]>flatten(categoriesColumns)).filter(filterColumns);

        let resultValuesColumns = isEmpty(valuesColumns) ? [] : (<DataViewBuilderValuesColumnOptions[]>flatten(valuesColumns)).filter(filterColumns);

        let allColumns = (resultCategoriesColumns || []).concat(resultValuesColumns || []);

        allColumns.forEach((x: DataViewCategoricalColumn, i) => x.source.index = i);

        if (customizeColumns) {
            allColumns.forEach((column: TestDataViewBuilderColumnOptions) => customizeColumns(column.source));
        }

        allColumns.forEach((column: TestDataViewBuilderColumnOptions) => {
            if (column.source.format) {
                let objects = column.source.objects = (<any>column.source.objects || {});

                objects.general = objects.general || {};
                objects.general.formatString = objects.general.formatString || column.source.format;
            }
        });

        return {
            categories: resultCategoriesColumns.filter(x => !x.isGroup),
            grouped: resultCategoriesColumns.filter(x => x.isGroup),
            values: resultValuesColumns
        };
    }

    static setUpDataViewBuilderColumnOptions(
        options: DataViewBuilderAllColumnOptions,
        aggregateFunction: (array: number[]) => number): DataViewBuilderAllColumnOptions {

        let resultOptions = clone(options);

        resultOptions.categories = resultOptions.categories && resultOptions.categories.map(x => clone(x));
        resultOptions.values = resultOptions.values && resultOptions.values.map(x => clone(x));
        resultOptions.grouped = resultOptions.grouped && resultOptions.grouped.map(x => clone(x));

        if (!isEmpty(options.categories)) {
            resultOptions.categories.forEach(x => x.source = TestDataViewBuilder.setDefaultQueryName(x.source));
            let allRows: any[][] = TestDataViewBuilder.getValuesTable(options.categories, options.values);
            let categoriesLength = options.categories.length;
            let grouped = toArray(groupBy(allRows, x => take(x, categoriesLength)));
            resultOptions.categories.forEach((c, i) => c.values = grouped.map(x => x[0][i] === undefined ? null : x[0][i]));

            if (!isEmpty(options.values) && isEmpty(options.grouped)) { // Not completed for group categories
                resultOptions.values.forEach((c, i) =>
                    c.values = grouped.map(v => aggregateFunction(v.map(x => x[categoriesLength + i] || 0))));
            }
        }

        if (!isEmpty(options.values)) {
            resultOptions.values.forEach(x => x.source = TestDataViewBuilder.setDefaultQueryName(x.source));
        }

        if (!isEmpty(options.grouped)) {
            resultOptions.grouped.forEach(x => x.source = TestDataViewBuilder.setDefaultQueryName(x.source));
        }

        return resultOptions;
    }

    static setUpDataView(dataView: DataView, options: DataViewBuilderAllColumnOptions): DataView {
        if (!isEmpty(options.categories) && isEmpty(options.grouped)) {
            let category = dataView.categorical.categories[0];

            // Tree. (completed only for one category)
            dataView.tree = {
                root: {
                    childIdentityFields: category.identityFields,
                    children: category.values.map((value: PrimitiveValue, index: number) => {
                        return <any>{
                            values: [value],
                            name: value,
                            identity: category.identity && category.identity[index]
                        };
                    })
                }
            };

            // Table.
            dataView.table = {
                columns: dataView.categorical.categories.concat(
                    <any>dataView.categorical.values || []).map(x => x.source),
                identityFields: category.identityFields,
                rows: TestDataViewBuilder.getValuesTable(dataView.categorical.categories, dataView.categorical.values)
            };

            if (isEmpty(options.values)) {
                delete dataView.categorical.values;
            }
        }

        if (dataView.categorical.values) {
            let grouped = dataView.categorical.values.grouped();
            dataView.categorical.values.grouped = () => grouped;
        }

        return dataView;
    }

    protected createCategoricalDataViewBuilder(
        categoriesColumns: (TestDataViewBuilderCategoryColumnOptions | TestDataViewBuilderCategoryColumnOptions[])[],
        valuesColumns: (DataViewBuilderValuesColumnOptions | DataViewBuilderValuesColumnOptions[])[],
        columnNames: string[],
        customizeColumns?: CustomizeColumnFn): IDataViewBuilderCategorical {

        let builder = createCategoricalDataViewBuilder();

        let originalOptions = TestDataViewBuilder.createDataViewBuilderColumnOptions(
            categoriesColumns,
            valuesColumns,
            columnNames && (options => includes(columnNames, options.source.displayName)),
            customizeColumns);

        let options = TestDataViewBuilder.setUpDataViewBuilderColumnOptions(originalOptions, this.aggregateFunction);

        if (!isEmpty(options.categories)) {
            let identityFrom = TestDataViewBuilder.getDataViewBuilderColumnIdentitySources(options.categories);

            builder.withCategories(options.categories.map((category, i) => <DataViewCategoryColumn>{
                source: category.source,
                values: category.values,
                objects: category.objects,
                identity: identityFrom[i].identities,
                identityFields: identityFrom[i].fields
            }));
        }

        if (!isEmpty(options.grouped)) {
            let groupedCategory = options.grouped[0]; // Finished only for one category.

            let categoryValues = originalOptions.categories
                && originalOptions.categories[0]
                && originalOptions.categories[0].values
                || [];

            let uniqueCategoryValues = uniq(categoryValues) || [undefined],
                uniqueGroupedValues = uniq(groupedCategory.values);

            builder.withGroupedValues({
                groupColumn: {
                    source: groupedCategory.source,
                    values: uniqueGroupedValues,
                    identityFrom: TestDataViewBuilder.getDataViewBuilderColumnIdentitySources(groupedCategory)[0]
                } as DataViewBuilderCategoryColumnOptions,
                valueColumns: options.values.map(x => <TestDataViewBuilderColumnOptions>{ source: x.source }),
                data: uniqueGroupedValues.map(groupedValue => options.values.map((column, columnIndex) =>
                    <DataViewBuilderSeriesData>{
                        values: column.values && uniqueCategoryValues
                            .map(categoryValue => {
                                let index = findIndex(range(categoryValues.length),
                                    i => categoryValues[i] === categoryValue && groupedCategory.values[i] === groupedValue);
                                return column.values[index] === undefined ? null : column.values[index];
                            }),
                        highlights: column.highlights,
                        minLocal: column.minLocal,
                        maxLocal: column.maxLocal
                    }))
            });
        } else if (!isEmpty(options.values)) {
            builder.withValues({ columns: options.values });
        }

        let builderBuild = builder.build.bind(builder);

        builder.build = () => {
            return TestDataViewBuilder.setUpDataView(builderBuild(), options);
        };

        return builder;
    }

    public abstract getDataView(columnNames?: string[]): DataView;
}
