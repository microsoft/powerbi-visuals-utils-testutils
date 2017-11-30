"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var dataViewBuilder_1 = require("./dataViewBuilder");
var _ = require("lodash");
var TestDataViewBuilder = /** @class */ (function () {
    function TestDataViewBuilder() {
        this.aggregateFunction = _.sum;
    }
    TestDataViewBuilder.setDefaultQueryName = function (source) {
        if (!source.queryName) {
            source.queryName = TestDataViewBuilder.DataViewName + "." + source.displayName;
        }
        return source;
    };
    TestDataViewBuilder.getDataViewBuilderColumnIdentitySources = function (options) {
        var optionsArray = (_.isArray(options) ? options : [options]);
        var fields = optionsArray.map(function () { }), optionsIdentityExpressions = optionsArray.map(function (opt) { return opt.values; }), identityExpressions = [];
        if (optionsIdentityExpressions.length > 1) {
            var identityExpressionsLength = optionsIdentityExpressions.length, identityExpressionsValuesLength = _.max(_.map(optionsIdentityExpressions, function (x) { return x.length; }));
            for (var vi = 0; vi < identityExpressionsValuesLength; vi++) {
                var current = optionsIdentityExpressions[0][vi];
                identityExpressions.push(current);
            }
        }
        else {
            identityExpressions = optionsIdentityExpressions[0];
        }
        return optionsArray.map(function (opt, i) { return ({
            fields: fields,
            identities: identityExpressions
        }); });
    };
    TestDataViewBuilder.getValuesTable = function (categories, values) {
        var columns = _.sortBy((categories || []).concat(values || []), function (x) { return x.source.index; }), maxLength = _.max(columns.map(function (x) { return x.values.length; }));
        return _.range(maxLength).map(function (i) { return columns.map(function (x) { return x.values[i]; }); });
    };
    TestDataViewBuilder.createDataViewBuilderColumnOptions = function (categoriesColumns, valuesColumns, filter, customizeColumns) {
        var filterColumns = filter
            ? function (options) { return _.isArray(options.values) && filter(options); }
            : function (options) { return _.isArray(options.values); };
        var resultCategoriesColumns = _.isEmpty(categoriesColumns) ? [] : _
            .flatten(categoriesColumns).filter(filterColumns);
        var resultValuesColumns = _.isEmpty(valuesColumns) ? [] : _
            .flatten(valuesColumns).filter(filterColumns);
        var allColumns = (resultCategoriesColumns || []).concat(resultValuesColumns || []);
        allColumns.forEach(function (x, i) { return x.source.index = i; });
        if (customizeColumns) {
            allColumns.forEach(function (column) { return customizeColumns(column.source); });
        }
        allColumns.forEach(function (column) {
            if (column.source.format) {
                var objects = column.source.objects = (column.source.objects || {});
                objects.general = objects.general || {};
                objects.general.formatString = objects.general.formatString || column.source.format;
            }
        });
        return {
            categories: resultCategoriesColumns.filter(function (x) { return !x.isGroup; }),
            grouped: resultCategoriesColumns.filter(function (x) { return x.isGroup; }),
            values: resultValuesColumns
        };
    };
    TestDataViewBuilder.setUpDataViewBuilderColumnOptions = function (options, aggregateFunction) {
        var resultOptions = _.clone(options);
        resultOptions.categories = resultOptions.categories && resultOptions.categories.map(function (x) { return _.clone(x); });
        resultOptions.values = resultOptions.values && resultOptions.values.map(function (x) { return _.clone(x); });
        resultOptions.grouped = resultOptions.grouped && resultOptions.grouped.map(function (x) { return _.clone(x); });
        if (!_.isEmpty(options.categories)) {
            resultOptions.categories.forEach(function (x) { return x.source = TestDataViewBuilder.setDefaultQueryName(x.source); });
            var allRows = TestDataViewBuilder.getValuesTable(options.categories, options.values);
            var categoriesLength_1 = options.categories.length;
            var grouped_1 = _.toArray(_.groupBy(allRows, function (x) { return _.take(x, categoriesLength_1); }));
            resultOptions.categories.forEach(function (c, i) { return c.values = grouped_1.map(function (x) { return x[0][i] === undefined ? null : x[0][i]; }); });
            if (!_.isEmpty(options.values) && _.isEmpty(options.grouped)) {
                resultOptions.values.forEach(function (c, i) {
                    return c.values = grouped_1.map(function (v) { return aggregateFunction(v.map(function (x) { return x[categoriesLength_1 + i] || 0; })); });
                });
            }
        }
        if (!_.isEmpty(options.values)) {
            resultOptions.values.forEach(function (x) { return x.source = TestDataViewBuilder.setDefaultQueryName(x.source); });
        }
        if (!_.isEmpty(options.grouped)) {
            resultOptions.grouped.forEach(function (x) { return x.source = TestDataViewBuilder.setDefaultQueryName(x.source); });
        }
        return resultOptions;
    };
    TestDataViewBuilder.setUpDataView = function (dataView, options) {
        if (!_.isEmpty(options.categories) && _.isEmpty(options.grouped)) {
            var category_1 = dataView.categorical.categories[0];
            // Tree. (completed only for one category)
            dataView.tree = {
                root: {
                    childIdentityFields: category_1.identityFields,
                    children: category_1.values.map(function (value, index) {
                        return {
                            values: [value],
                            name: value,
                            identity: category_1.identity && category_1.identity[index]
                        };
                    })
                }
            };
            // Table.
            dataView.table = {
                columns: dataView.categorical.categories.concat(dataView.categorical.values || []).map(function (x) { return x.source; }),
                identityFields: category_1.identityFields,
                rows: TestDataViewBuilder.getValuesTable(dataView.categorical.categories, dataView.categorical.values)
            };
            if (_.isEmpty(options.values)) {
                delete dataView.categorical.values;
            }
        }
        if (dataView.categorical.values) {
            var grouped_2 = dataView.categorical.values.grouped();
            dataView.categorical.values.grouped = function () { return grouped_2; };
        }
        return dataView;
    };
    TestDataViewBuilder.prototype.createCategoricalDataViewBuilder = function (categoriesColumns, valuesColumns, columnNames, customizeColumns) {
        var builder = dataViewBuilder_1.createCategoricalDataViewBuilder();
        var originalOptions = TestDataViewBuilder.createDataViewBuilderColumnOptions(categoriesColumns, valuesColumns, columnNames && (function (options) { return _.includes(columnNames, options.source.displayName); }), customizeColumns);
        var options = TestDataViewBuilder.setUpDataViewBuilderColumnOptions(originalOptions, this.aggregateFunction);
        if (!_.isEmpty(options.categories)) {
            var identityFrom_1 = TestDataViewBuilder.getDataViewBuilderColumnIdentitySources(options.categories);
            builder.withCategories(options.categories.map(function (category, i) { return ({
                source: category.source,
                values: category.values,
                objects: category.objects,
                identity: identityFrom_1[i].identities,
                identityFields: identityFrom_1[i].fields
            }); }));
        }
        if (!_.isEmpty(options.grouped)) {
            var groupedCategory_1 = options.grouped[0]; // Finished only for one category.
            var categoryValues_1 = originalOptions.categories
                && originalOptions.categories[0]
                && originalOptions.categories[0].values
                || [];
            var uniqueCategoryValues_1 = _.uniq(categoryValues_1) || [undefined], uniqueGroupedValues = _.uniq(groupedCategory_1.values);
            builder.withGroupedValues({
                groupColumn: {
                    source: groupedCategory_1.source,
                    values: uniqueGroupedValues,
                    identityFrom: TestDataViewBuilder.getDataViewBuilderColumnIdentitySources(groupedCategory_1)[0]
                },
                valueColumns: options.values.map(function (x) { return ({ source: x.source }); }),
                data: uniqueGroupedValues.map(function (groupedValue) { return options.values.map(function (column, columnIndex) {
                    return ({
                        values: column.values && uniqueCategoryValues_1
                            .map(function (categoryValue) {
                            var index = _.findIndex(_.range(categoryValues_1.length), function (i) { return categoryValues_1[i] === categoryValue && groupedCategory_1.values[i] === groupedValue; });
                            return column.values[index] === undefined ? null : column.values[index];
                        }),
                        highlights: column.highlights,
                        minLocal: column.minLocal,
                        maxLocal: column.maxLocal
                    });
                }); })
            });
        }
        else if (!_.isEmpty(options.values)) {
            builder.withValues({ columns: options.values });
        }
        var builderBuild = builder.build.bind(builder);
        builder.build = function () {
            return TestDataViewBuilder.setUpDataView(builderBuild(), options);
        };
        return builder;
    };
    TestDataViewBuilder.DataViewName = "Data";
    return TestDataViewBuilder;
}());
exports.TestDataViewBuilder = TestDataViewBuilder;
//# sourceMappingURL=testDataViewBuilder.js.map