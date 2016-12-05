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


module powerbi.extensibility.utils.test.dataViewBuilder {
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
        private aggregateFunction: (array: number[]) => number = _.sum;

        static setDefaultQueryName(source: DataViewMetadataColumn): DataViewMetadataColumn {
            if (!source.queryName) {
                source.queryName = TestDataViewBuilder.DataViewName + "." + source.displayName;
            }

            return source;
        }

        static getDataViewBuilderColumnIdentitySources(options: TestDataViewBuilderColumnOptions[] | TestDataViewBuilderColumnOptions): DataViewBuilderColumnIdentitySource[] {
            let optionsArray: TestDataViewBuilderColumnOptions[] = <any>(_.isArray(options) ? options : [options]);

            let fields = optionsArray.map(() => { }),
                optionsIdentityExpressions: any[][] = optionsArray.map((opt) => opt.values),
                identityExpressions: any[] = [];

            if (optionsIdentityExpressions.length > 1) {
                let identityExpressionsLength = optionsIdentityExpressions.length,
                    identityExpressionsValuesLength = _.max(_.map(optionsIdentityExpressions, x => x.length));

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
            let columns = _.sortBy((categories || []).concat(<DataViewCategoricalColumn[]>values || []), x => x.source.index),
                maxLength: number = _.max(columns.map(x => x.values.length));

            return _.range(maxLength).map(i => columns.map(x => x.values[i]));
        }

        static createDataViewBuilderColumnOptions(
            categoriesColumns: (TestDataViewBuilderCategoryColumnOptions | TestDataViewBuilderCategoryColumnOptions[])[],
            valuesColumns: (DataViewBuilderValuesColumnOptions | DataViewBuilderValuesColumnOptions[])[],
            filter?: (options: TestDataViewBuilderColumnOptions) => boolean,
            customizeColumns?: CustomizeColumnFn): DataViewBuilderAllColumnOptions {

            let filterColumns = filter
                ? (options) => _.isArray(options.values) && filter(options)
                : (options) => _.isArray(options.values);

            let resultCategoriesColumns = _.isEmpty(categoriesColumns) ? [] : (<TestDataViewBuilderCategoryColumnOptions[]>_
                .flatten(categoriesColumns)).filter(filterColumns);

            let resultValuesColumns = _.isEmpty(valuesColumns) ? [] : (<DataViewBuilderValuesColumnOptions[]>_
                .flatten(valuesColumns)).filter(filterColumns);

            let allColumns = (resultCategoriesColumns || []).concat(<DataViewCategoricalColumn[]>resultValuesColumns || []);

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

            let resultOptions = _.clone(options);

            resultOptions.categories = resultOptions.categories && resultOptions.categories.map(x => _.clone(x));
            resultOptions.values = resultOptions.values && resultOptions.values.map(x => _.clone(x));
            resultOptions.grouped = resultOptions.grouped && resultOptions.grouped.map(x => _.clone(x));

            if (!_.isEmpty(options.categories)) {
                resultOptions.categories.forEach(x => x.source = TestDataViewBuilder.setDefaultQueryName(x.source));
                let allRows: any[][] = TestDataViewBuilder.getValuesTable(options.categories, options.values);
                let categoriesLength = options.categories.length;
                let grouped = _.toArray(_.groupBy(allRows, x => _.take(x, categoriesLength)));
                resultOptions.categories.forEach((c, i) => c.values = grouped.map(x => x[0][i] === undefined ? null : x[0][i]));

                if (!_.isEmpty(options.values) && _.isEmpty(options.grouped)) { // Not completed for group categories
                    resultOptions.values.forEach((c, i) =>
                        c.values = grouped.map(v => aggregateFunction(v.map(x => x[categoriesLength + i] || 0))));
                }
            }

            if (!_.isEmpty(options.values)) {
                resultOptions.values.forEach(x => x.source = TestDataViewBuilder.setDefaultQueryName(x.source));
            }

            if (!_.isEmpty(options.grouped)) {
                resultOptions.grouped.forEach(x => x.source = TestDataViewBuilder.setDefaultQueryName(x.source));
            }

            return resultOptions;
        }

        static setUpDataView(dataView: DataView, options: DataViewBuilderAllColumnOptions): DataView {
            if (!_.isEmpty(options.categories) && _.isEmpty(options.grouped)) {
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
                        <powerbi.DataViewCategoricalColumn[]>dataView.categorical.values || []).map(x => x.source),
                    identityFields: category.identityFields,
                    rows: TestDataViewBuilder.getValuesTable(dataView.categorical.categories, dataView.categorical.values)
                };

                if (_.isEmpty(options.values)) {
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
                columnNames && (options => _.includes(columnNames, options.source.displayName)),
                customizeColumns);

            let options = TestDataViewBuilder.setUpDataViewBuilderColumnOptions(originalOptions, this.aggregateFunction);

            if (!_.isEmpty(options.categories)) {
                let identityFrom = TestDataViewBuilder.getDataViewBuilderColumnIdentitySources(options.categories);

                builder.withCategories(options.categories.map((category, i) => <DataViewCategoryColumn>{
                    source: category.source,
                    values: category.values,
                    objects: category.objects,
                    identity: identityFrom[i].identities,
                    identityFields: identityFrom[i].fields
                }));
            }

            if (!_.isEmpty(options.grouped)) {
                let groupedCategory = options.grouped[0]; // Finished only for one category.

                let categoryValues = originalOptions.categories
                    && originalOptions.categories[0]
                    && originalOptions.categories[0].values
                    || [];

                let uniqueCategoryValues = _.uniq(categoryValues) || [undefined],
                    uniqueGroupedValues = _.uniq(groupedCategory.values);

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
                                    let index = _.findIndex(d3.range(categoryValues.length),
                                        i => categoryValues[i] === categoryValue && groupedCategory.values[i] === groupedValue);
                                    return column.values[index] === undefined ? null : column.values[index];
                                }),
                            highlights: column.highlights,
                            minLocal: column.minLocal,
                            maxLocal: column.maxLocal
                        }))
                });
            } else if (!_.isEmpty(options.values)) {
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
}
