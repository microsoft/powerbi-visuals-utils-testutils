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
var _ = require("lodash");
function createCategoricalDataViewBuilder() {
    return new CategoricalDataViewBuilder();
}
exports.createCategoricalDataViewBuilder = createCategoricalDataViewBuilder;
var CategoricalDataViewBuilder = /** @class */ (function () {
    function CategoricalDataViewBuilder() {
        this.categories = [];
        this.staticMeasureColumns = [];
        this.dynamicMeasureColumns = [];
        this.columnIndex = 0;
    }
    CategoricalDataViewBuilder.prototype.withCategory = function (options) {
        var categoryValues = options.values, identityFrom = options.identityFrom, sourceType = options.source.type;
        var categoryColumn = {
            source: options.source,
            identityFields: options.identityFrom.fields,
            identity: options.identityFrom.identities || [],
            values: categoryValues,
        };
        if (!options.identityFrom.identities) {
            for (var categoryIndex = 0, categoryLength = categoryValues.length; categoryIndex < categoryLength; categoryIndex++) {
                categoryColumn.identity.push(getScopeIdentity(identityFrom, categoryIndex, categoryValues[categoryIndex], sourceType));
            }
        }
        if (!this.categories) {
            this.categories = [];
        }
        this.categories.push(categoryColumn);
        return this;
    };
    CategoricalDataViewBuilder.prototype.withCategories = function (categories) {
        if (_.isEmpty(this.categories)) {
            this.categories = categories;
        }
        else {
            Array.prototype.push.apply(this.categories, categories);
        }
        return this;
    };
    /**
     * Adds static series columns.
     *
     * Note that it is illegal to have both dynamic series and static series in a visual DataViewCategorical.  It is only legal to have them both in
     * a query DataViewCategorical, where DataViewTransform is expected to split them up into separate visual DataViewCategorical objects.
     */
    CategoricalDataViewBuilder.prototype.withValues = function (options) {
        var columns = options.columns;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            this.staticMeasureColumns.push(column.source);
        }
        this.staticSeriesValues = columns;
        return this;
    };
    /**
     * Adds dynamic series columns.
     *
     * Note that it is illegal to have both dynamic series and static series in a visual DataViewCategorical.  It is only legal to have them both in
     * a query DataViewCategorical, where DataViewTransform is expected to split them up into separate visual DataViewCategorical objects.
     */
    CategoricalDataViewBuilder.prototype.withGroupedValues = function (options) {
        var groupColumn = options.groupColumn;
        this.dynamicSeriesMetadata = {
            column: groupColumn.source,
            identityFrom: groupColumn.identityFrom,
            values: groupColumn.values,
        };
        var valueColumns = options.valueColumns;
        for (var _i = 0, valueColumns_1 = valueColumns; _i < valueColumns_1.length; _i++) {
            var valueColumn = valueColumns_1[_i];
            this.dynamicMeasureColumns.push(valueColumn.source);
        }
        this.dynamicSeriesValues = options.data;
        return this;
    };
    CategoricalDataViewBuilder.prototype.fillData = function (dataViewValues) {
        var categoryColumn = _.first(this.categories), categoryLength = (categoryColumn && categoryColumn.values)
            ? categoryColumn.values.length
            : 0;
        if (this.hasDynamicSeries()) {
            for (var seriesIndex = 0, seriesLength = this.dynamicSeriesMetadata.values.length; seriesIndex < seriesLength; seriesIndex++) {
                var seriesMeasures = this.dynamicSeriesValues[seriesIndex];
                for (var measureIndex = 0, measuresLen = this.dynamicMeasureColumns.length; measureIndex < measuresLen; measureIndex++) {
                    var groupIndex = seriesIndex * measuresLen + measureIndex;
                    applySeriesData(dataViewValues[groupIndex], seriesMeasures[measureIndex], categoryLength);
                }
            }
        }
        if (this.hasStaticSeries()) {
            // Note: when the target categorical has both dynamic and static series, append static measures at the end of the values array.
            var staticColumnsStartingIndex = this.hasDynamicSeries()
                ? (this.dynamicSeriesValues.length * this.dynamicMeasureColumns.length)
                : 0;
            for (var measureIndex = 0, measuresLen = this.staticMeasureColumns.length; measureIndex < measuresLen; measureIndex++) {
                applySeriesData(dataViewValues[staticColumnsStartingIndex + measureIndex], this.staticSeriesValues[measureIndex], categoryLength);
            }
        }
    };
    /**
     * Returns the DataView with metadata and DataViewCategorical.
     * Returns undefined if the combination of parameters is illegal, such as having both dynamic series and static series when building a visual DataView.
     */
    CategoricalDataViewBuilder.prototype.build = function () {
        var metadataColumns = [];
        var categorical = {};
        var categoryMetadata = this.categories;
        var dynamicSeriesMetadata = this.dynamicSeriesMetadata;
        // --- Build metadata columns and value groups ---
        for (var _i = 0, categoryMetadata_1 = categoryMetadata; _i < categoryMetadata_1.length; _i++) {
            var columnMetadata = categoryMetadata_1[_i];
            pushIfNotExists(metadataColumns, columnMetadata.source);
        }
        if (this.hasDynamicSeries()) {
            // Dynamic series, or Dynamic & Static series.
            pushIfNotExists(metadataColumns, dynamicSeriesMetadata.column);
            // categorical.values = DataViewTransform.createValueColumns([], dynamicSeriesMetadata.identityFrom.fields, dynamicSeriesMetadata.column);
            categorical.values = createValueColumns([], dynamicSeriesMetadata.identityFrom.fields, dynamicSeriesMetadata.column);
            // For each series value we will make one column per measure
            var seriesValues = dynamicSeriesMetadata.values;
            for (var seriesIndex = 0; seriesIndex < seriesValues.length; seriesIndex++) {
                var seriesValue = seriesValues[seriesIndex];
                var seriesIdentity = getScopeIdentity(dynamicSeriesMetadata.identityFrom, seriesIndex, seriesValue, dynamicSeriesMetadata.column.type);
                for (var _a = 0, _b = this.dynamicMeasureColumns; _a < _b.length; _a++) {
                    var measure = _b[_a];
                    var column = _.toPlainObject(measure);
                    column.groupName = seriesValue;
                    pushIfNotExists(metadataColumns, column);
                    categorical.values.push({
                        source: column,
                        values: [],
                        identity: seriesIdentity,
                    });
                }
            }
            // If there is no data we should add a column that contains a pointer to the dynamic measure columns, for consistency with the dsrReader
            if (seriesValues.length === 0) {
                for (var _c = 0, _d = this.dynamicMeasureColumns; _c < _d.length; _c++) {
                    var measure = _d[_c];
                    var column = _.toPlainObject(measure);
                    pushIfNotExists(metadataColumns, column);
                    categorical.values.push({ source: column, values: [] });
                }
            }
            if (this.hasStaticSeries()) {
                // IMPORTANT: In the Dynamic & Static series case, the groups array shall not include any static group. This is to match the behavior of production code that creates query DataView objects.
                // Get the current return value of grouped() before adding static measure columns, an use that as the return value of this categorical.
                // Otherwise, the default behavior of DataViewValueColumns.grouped() from DataViewTransform.createValueColumns() is to create series groups from all measure columns.
                var dynamicSeriesGroups_1 = categorical.values.grouped();
                categorical.values.grouped = function () { return dynamicSeriesGroups_1; };
                this.appendStaticMeasureColumns(metadataColumns, categorical.values);
            }
        }
        else {
            // Static series only / no series
            categorical.values = createValueColumns();
            this.appendStaticMeasureColumns(metadataColumns, categorical.values);
        }
        var categories = this.categories;
        if (!_.isEmpty(categories)) {
            categorical.categories = categories;
        }
        // --- Fill in data point values ---
        this.fillData(categorical.values);
        var dataView = {
            metadata: {
                columns: metadataColumns,
            },
            categorical: categorical,
        };
        if (this.isLegalDataView(dataView)) {
            return dataView;
        }
    };
    CategoricalDataViewBuilder.prototype.appendStaticMeasureColumns = function (metadataColumns, valueColumns) {
        if (!_.isEmpty(this.staticMeasureColumns)) {
            for (var _i = 0, _a = this.staticMeasureColumns; _i < _a.length; _i++) {
                var column = _a[_i];
                pushIfNotExists(metadataColumns, column);
                valueColumns.push({
                    source: column,
                    values: [],
                });
            }
        }
    };
    CategoricalDataViewBuilder.prototype.isLegalDataView = function (dataView) {
        if (this.hasDynamicSeries()
            && this.hasStaticSeries()
            && CategoricalDataViewBuilder.isVisualDataView(dataView.metadata.columns)) {
            // It is illegal to have both dynamic series and static series in a visual DataViewCategorical,
            // because the DataViewValueColumns interface today cannot express that 100% (see its 'source' property and return value of its 'grouped()' function).
            return false;
        }
        return true;
    };
    /**
     * This function infers that if any metadata column has 'queryName',
     * then the user of this builder is building a visual DataView (as opposed to query DataView).
     *
     * @param metadataColumns The complete collection of metadata columns in the categorical.
     */
    CategoricalDataViewBuilder.isVisualDataView = function (metadataColumns) {
        return !_.isEmpty(metadataColumns) &&
            _.some(metadataColumns, function (metadataColumn) { return !!metadataColumn.queryName; });
    };
    CategoricalDataViewBuilder.prototype.hasDynamicSeries = function () {
        return !!this.dynamicSeriesMetadata; // In Map visual scenarios, you can have dynamic series without measure columns
    };
    CategoricalDataViewBuilder.prototype.hasStaticSeries = function () {
        return !!this.staticSeriesValues;
    };
    return CategoricalDataViewBuilder;
}());
function getScopeIdentity(source, index, value, valueType) {
    var identities = source.identities;
    if (identities) {
        return identities[index];
    }
    return {
        expr: {},
        key: ""
    };
}
function pushIfNotExists(items, itemToAdd) {
    if (_.includes(items, itemToAdd)) {
        return;
    }
    items.push(itemToAdd);
}
function applySeriesData(target, source, categoryLength) {
    var values = source.values;
    target.values = values;
    var highlights = source.highlights;
    if (highlights) {
        target.highlights = highlights;
    }
    var aggregates;
    if (source.minLocal !== undefined) {
        if (!aggregates)
            aggregates = {};
        aggregates.minLocal = source.minLocal;
    }
    if (source.maxLocal !== undefined) {
        if (!aggregates)
            aggregates = {};
        aggregates.maxLocal = source.maxLocal;
    }
    if (aggregates) {
        target.source.aggregates = aggregates;
        _.extend(target, aggregates);
    }
}
function createValueColumns(values, valueIdentityFields, source) {
    if (values === void 0) { values = []; }
    var result = values;
    setGrouped(result);
    if (valueIdentityFields) {
        result.identityFields = valueIdentityFields;
    }
    if (source) {
        result.source = source;
    }
    return result;
}
exports.createValueColumns = createValueColumns;
function setGrouped(values, groupedResult) {
    values.grouped = groupedResult
        ? function () { return groupedResult; }
        : function () { return groupValues(values); };
}
exports.setGrouped = setGrouped;
/** Group together the values with a common identity. */
function groupValues(values) {
    var groups = [], currentGroup;
    for (var i = 0, len = values.length; i < len; i++) {
        var value = values[i];
        if (!currentGroup || currentGroup.identity !== value.identity) {
            currentGroup = {
                values: []
            };
            if (value.identity) {
                currentGroup.identity = value.identity;
                var source = value.source;
                // allow null, which will be formatted as (Blank).
                if (source.groupName !== undefined)
                    currentGroup.name = source.groupName;
                else if (source.displayName)
                    currentGroup.name = source.displayName;
            }
            groups.push(currentGroup);
        }
        currentGroup.values.push(value);
    }
    return groups;
}
//# sourceMappingURL=dataViewBuilder.js.map