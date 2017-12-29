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
    /** Utility for creating a DataView from columns of data. */
    export interface IDataViewBuilderCategorical {
        withCategory(options: DataViewBuilderCategoryColumnOptions): IDataViewBuilderCategorical;
        withCategories(categories: DataViewCategoryColumn[]): IDataViewBuilderCategorical;
        withValues(options: DataViewBuilderValuesOptions): IDataViewBuilderCategorical;
        withGroupedValues(options: DataViewBuilderGroupedValuesOptions): IDataViewBuilderCategorical;

        build(): DataView;
    }

    export interface DataViewBuilderColumnOptions {
        source: DataViewMetadataColumn;
    }


    export interface DataViewBuilderValuesOptions {
        columns: DataViewBuilderValuesColumnOptions[];
    }

    export interface DataViewBuilderGroupedValuesOptions {
        groupColumn: DataViewBuilderCategoryColumnOptions;
        valueColumns: DataViewBuilderColumnOptions[];
        data: DataViewBuilderSeriesData[][];
    }

    export interface DataViewBuilderCategoryColumnOptions extends DataViewBuilderColumnOptions {
        values: PrimitiveValue[];
        identityFrom: any;
    }

    /** Indicates the source set of identities. */
    export interface DataViewBuilderColumnIdentitySource {
        fields: any[];
        identities?: DataViewScopeIdentity[];
    }

    export interface DataViewBuilderValuesColumnOptions extends
        DataViewBuilderColumnOptions,
        DataViewBuilderSeriesData { }

    export interface DataViewBuilderSeriesData {
        values: PrimitiveValue[];
        highlights?: PrimitiveValue[];

        /** Client-computed maximum value for a column. */
        maxLocal?: any;

        /** Client-computed maximum value for a column. */
        minLocal?: any;
    }

    export function createCategoricalDataViewBuilder(): IDataViewBuilderCategorical {
        return new CategoricalDataViewBuilder();
    }

    interface ColumnMetadata {
        column: DataViewMetadataColumn;
        identityFrom: DataViewBuilderColumnIdentitySource;
        values: PrimitiveValue[];
    }

    class CategoricalDataViewBuilder implements IDataViewBuilderCategorical {
        private categories: DataViewCategoryColumn[];
        private staticMeasureColumns: DataViewMetadataColumn[];
        private dynamicMeasureColumns: DataViewMetadataColumn[];
        private dynamicSeriesMetadata: ColumnMetadata;
        private columnIndex: number;
        private staticSeriesValues: DataViewBuilderValuesColumnOptions[];
        private dynamicSeriesValues: DataViewBuilderSeriesData[][];

        constructor() {
            this.categories = [];
            this.staticMeasureColumns = [];
            this.dynamicMeasureColumns = [];
            this.columnIndex = 0;
        }

        public withCategory(options: DataViewBuilderCategoryColumnOptions): IDataViewBuilderCategorical {
            let categoryValues = options.values,
                identityFrom = options.identityFrom,
                sourceType = options.source.type;

            let categoryColumn: DataViewCategoryColumn = {
                source: options.source,
                identityFields: options.identityFrom.fields,
                identity: options.identityFrom.identities || [],
                values: categoryValues,
            };

            if (!options.identityFrom.identities) {
                for (let categoryIndex = 0, categoryLength = categoryValues.length;
                    categoryIndex < categoryLength;
                    categoryIndex++) {

                    categoryColumn.identity.push(getScopeIdentity(
                        identityFrom,
                        categoryIndex,
                        categoryValues[categoryIndex],
                        sourceType));
                }
            }

            if (!this.categories) {
                this.categories = [];
            }

            this.categories.push(categoryColumn);

            return this;
        }

        public withCategories(categories: DataViewCategoryColumn[]): IDataViewBuilderCategorical {
            if (_.isEmpty(this.categories)) {
                this.categories = categories;
            }
            else {
                Array.prototype.push.apply(this.categories, categories);
            }

            return this;
        }

        /**
         * Adds static series columns.
         *
         * Note that it is illegal to have both dynamic series and static series in a visual DataViewCategorical.  It is only legal to have them both in
         * a query DataViewCategorical, where DataViewTransform is expected to split them up into separate visual DataViewCategorical objects.
         */
        public withValues(options: DataViewBuilderValuesOptions): IDataViewBuilderCategorical {
            let columns = options.columns;

            for (let column of columns) {
                this.staticMeasureColumns.push(column.source);
            }

            this.staticSeriesValues = columns;

            return this;
        }

        /**
         * Adds dynamic series columns.
         *
         * Note that it is illegal to have both dynamic series and static series in a visual DataViewCategorical.  It is only legal to have them both in
         * a query DataViewCategorical, where DataViewTransform is expected to split them up into separate visual DataViewCategorical objects.
         */
        public withGroupedValues(options: DataViewBuilderGroupedValuesOptions): IDataViewBuilderCategorical {
            let groupColumn = options.groupColumn;

            this.dynamicSeriesMetadata = {
                column: groupColumn.source,
                identityFrom: groupColumn.identityFrom,
                values: groupColumn.values,
            };

            let valueColumns = options.valueColumns;
            for (let valueColumn of valueColumns) {
                this.dynamicMeasureColumns.push(valueColumn.source);
            }

            this.dynamicSeriesValues = options.data;

            return this;
        }

        private fillData(dataViewValues: DataViewValueColumns) {
            let categoryColumn = _.first(this.categories),
                categoryLength = (categoryColumn && categoryColumn.values)
                    ? categoryColumn.values.length
                    : 0;

            if (this.hasDynamicSeries()) {
                for (let seriesIndex = 0, seriesLength = this.dynamicSeriesMetadata.values.length;
                    seriesIndex < seriesLength;
                    seriesIndex++) {

                    let seriesMeasures = this.dynamicSeriesValues[seriesIndex];

                    for (let measureIndex = 0, measuresLen = this.dynamicMeasureColumns.length;
                        measureIndex < measuresLen;
                        measureIndex++) {

                        let groupIndex: number = seriesIndex * measuresLen + measureIndex;

                        applySeriesData(
                            dataViewValues[groupIndex],
                            seriesMeasures[measureIndex],
                            categoryLength);
                    }
                }
            }

            if (this.hasStaticSeries()) {
                // Note: when the target categorical has both dynamic and static series, append static measures at the end of the values array.
                let staticColumnsStartingIndex = this.hasDynamicSeries()
                    ? (this.dynamicSeriesValues.length * this.dynamicMeasureColumns.length)
                    : 0;

                for (let measureIndex = 0, measuresLen = this.staticMeasureColumns.length;
                    measureIndex < measuresLen;
                    measureIndex++) {

                    applySeriesData(
                        dataViewValues[staticColumnsStartingIndex + measureIndex],
                        this.staticSeriesValues[measureIndex],
                        categoryLength);
                }
            }
        }

        /**
         * Returns the DataView with metadata and DataViewCategorical.
         * Returns undefined if the combination of parameters is illegal, such as having both dynamic series and static series when building a visual DataView.
         */
        public build(): DataView {
            let metadataColumns: DataViewMetadataColumn[] = [];
            let categorical: DataViewCategorical = {};

            let categoryMetadata = this.categories;
            let dynamicSeriesMetadata = this.dynamicSeriesMetadata;

            // --- Build metadata columns and value groups ---
            for (let columnMetadata of categoryMetadata) {
                pushIfNotExists(metadataColumns, columnMetadata.source);
            }

            if (this.hasDynamicSeries()) {
                // Dynamic series, or Dynamic & Static series.
                pushIfNotExists(metadataColumns, dynamicSeriesMetadata.column);

                // categorical.values = DataViewTransform.createValueColumns([], dynamicSeriesMetadata.identityFrom.fields, dynamicSeriesMetadata.column);
                categorical.values = createValueColumns([], dynamicSeriesMetadata.identityFrom.fields, dynamicSeriesMetadata.column);

                // For each series value we will make one column per measure
                let seriesValues = dynamicSeriesMetadata.values;
                for (let seriesIndex = 0; seriesIndex < seriesValues.length; seriesIndex++) {
                    let seriesValue = seriesValues[seriesIndex];
                    let seriesIdentity = getScopeIdentity(dynamicSeriesMetadata.identityFrom, seriesIndex, seriesValue, dynamicSeriesMetadata.column.type);

                    for (let measure of this.dynamicMeasureColumns) {
                        let column = _.toPlainObject<DataViewMetadataColumn>(measure);

                        column.groupName = <string>seriesValue;

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
                    for (let measure of this.dynamicMeasureColumns) {
                        let column: DataViewMetadataColumn = _.toPlainObject<DataViewMetadataColumn>(measure);

                        pushIfNotExists(metadataColumns, column);

                        categorical.values.push({ source: column, values: [] });
                    }
                }

                if (this.hasStaticSeries()) {
                    // IMPORTANT: In the Dynamic & Static series case, the groups array shall not include any static group. This is to match the behavior of production code that creates query DataView objects.
                    // Get the current return value of grouped() before adding static measure columns, an use that as the return value of this categorical.
                    // Otherwise, the default behavior of DataViewValueColumns.grouped() from DataViewTransform.createValueColumns() is to create series groups from all measure columns.
                    let dynamicSeriesGroups: DataViewValueColumnGroup[] = categorical.values.grouped();

                    categorical.values.grouped = () => dynamicSeriesGroups;

                    this.appendStaticMeasureColumns(metadataColumns, categorical.values);
                }
            }
            else {
                // Static series only / no series
                categorical.values = createValueColumns();

                this.appendStaticMeasureColumns(metadataColumns, categorical.values);
            }

            let categories = this.categories;
            if (!_.isEmpty(categories)) {
                categorical.categories = categories;
            }

            // --- Fill in data point values ---
            this.fillData(categorical.values);

            let dataView: DataView = {
                metadata: {
                    columns: metadataColumns,
                },
                categorical: categorical,
            };

            if (this.isLegalDataView(dataView)) {
                return dataView;
            }
        }

        private appendStaticMeasureColumns(
            metadataColumns: DataViewMetadataColumn[],
            valueColumns: DataViewValueColumns): void {

            if (!_.isEmpty(this.staticMeasureColumns)) {
                for (let column of this.staticMeasureColumns) {
                    pushIfNotExists(metadataColumns, column);
                    valueColumns.push({
                        source: column,
                        values: [],
                    });
                }
            }
        }

        private isLegalDataView(dataView: DataView): boolean {
            if (this.hasDynamicSeries()
                && this.hasStaticSeries()
                && CategoricalDataViewBuilder.isVisualDataView(dataView.metadata.columns)) {
                // It is illegal to have both dynamic series and static series in a visual DataViewCategorical,
                // because the DataViewValueColumns interface today cannot express that 100% (see its 'source' property and return value of its 'grouped()' function).
                return false;
            }

            return true;
        }

        /**
         * This function infers that if any metadata column has 'queryName',
         * then the user of this builder is building a visual DataView (as opposed to query DataView).
         *
         * @param metadataColumns The complete collection of metadata columns in the categorical.
         */
        private static isVisualDataView(metadataColumns: DataViewMetadataColumn[]): boolean {
            return !_.isEmpty(metadataColumns) &&
                _.some(metadataColumns, (metadataColumn) => !!metadataColumn.queryName);
        }

        private hasDynamicSeries(): boolean {
            return !!this.dynamicSeriesMetadata; // In Map visual scenarios, you can have dynamic series without measure columns
        }

        private hasStaticSeries(): boolean {
            return !!this.staticSeriesValues;
        }
    }

    function getScopeIdentity(
        source: DataViewBuilderColumnIdentitySource,
        index: number,
        value: PrimitiveValue,
        valueType: ValueTypeDescriptor): DataViewScopeIdentity {

        let identities: DataViewScopeIdentity[] = source.identities;

        if (identities) {
            return identities[index];
        }

        return {
            expr: {},
            key: "",
            kind: DataRepetitionKind.ScopeIdentity
        };
    }

    function pushIfNotExists(items: DataViewMetadataColumn[], itemToAdd: DataViewMetadataColumn): void {
        if (_.includes(items, itemToAdd)) {
            return;
        }

        items.push(itemToAdd);
    }

    function applySeriesData(
        target: DataViewValueColumn,
        source: DataViewBuilderSeriesData,
        categoryLength: number): void {

        let values: PrimitiveValue[] = source.values;

        target.values = values;

        let highlights: PrimitiveValue[] = source.highlights;

        if (highlights) {
            target.highlights = highlights;
        }

        let aggregates: DataViewColumnAggregates;
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

    export function createValueColumns(
        values: DataViewValueColumn[] = [],
        valueIdentityFields?: any[],
        source?: DataViewMetadataColumn): DataViewValueColumns {

        let result = <DataViewValueColumns>values;
        setGrouped(result);

        if (valueIdentityFields) {
            result.identityFields = valueIdentityFields;
        }

        if (source) {
            result.source = source;
        }

        return result;
    }

    export function setGrouped(values: DataViewValueColumns, groupedResult?: DataViewValueColumnGroup[]): void {
        values.grouped = groupedResult
            ? () => groupedResult
            : () => groupValues(values);
    }

    /** Group together the values with a common identity. */
    function groupValues(values: DataViewValueColumn[]): DataViewValueColumnGroup[] {
        let groups: DataViewValueColumnGroup[] = [],
            currentGroup: DataViewValueColumnGroup;

        for (let i = 0, len = values.length; i < len; i++) {
            let value = values[i];

            if (!currentGroup || currentGroup.identity !== value.identity) {
                currentGroup = {
                    values: []
                };

                if (value.identity) {
                    currentGroup.identity = value.identity;

                    let source = value.source;

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
}
