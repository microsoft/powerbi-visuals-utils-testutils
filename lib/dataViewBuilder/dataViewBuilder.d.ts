/// <reference types="powerbi-visuals-tools" />
import DataView = powerbi.DataView;
import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import PrimitiveValue = powerbi.PrimitiveValue;
import DataViewScopeIdentity = powerbi.DataViewScopeIdentity;
import DataViewValueColumn = powerbi.DataViewValueColumn;
import DataViewValueColumns = powerbi.DataViewValueColumns;
import DataViewValueColumnGroup = powerbi.DataViewValueColumnGroup;
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
export interface DataViewBuilderValuesColumnOptions extends DataViewBuilderColumnOptions, DataViewBuilderSeriesData {
}
export interface DataViewBuilderSeriesData {
    values: PrimitiveValue[];
    highlights?: PrimitiveValue[];
    /** Client-computed maximum value for a column. */
    maxLocal?: any;
    /** Client-computed maximum value for a column. */
    minLocal?: any;
}
export declare function createCategoricalDataViewBuilder(): IDataViewBuilderCategorical;
export declare function createValueColumns(values?: DataViewValueColumn[], valueIdentityFields?: any[], source?: DataViewMetadataColumn): DataViewValueColumns;
export declare function setGrouped(values: DataViewValueColumns, groupedResult?: DataViewValueColumnGroup[]): void;
