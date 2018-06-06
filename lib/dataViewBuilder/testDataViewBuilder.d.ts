/// <reference types="powerbi-visuals-tools" />
import powerbi from "powerbi-visuals-tools";
import DataView = powerbi.DataView;
import DataViewObjects = powerbi.DataViewObjects;
import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataViewValueColumn = powerbi.DataViewValueColumn;
import { DataViewBuilderColumnOptions, DataViewBuilderValuesColumnOptions, DataViewBuilderColumnIdentitySource, IDataViewBuilderCategorical } from "./dataViewBuilder";
export declare type CustomizeColumnFn = (source: DataViewMetadataColumn) => void;
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
export declare abstract class TestDataViewBuilder {
    static DataViewName: string;
    private aggregateFunction;
    static setDefaultQueryName(source: DataViewMetadataColumn): DataViewMetadataColumn;
    static getDataViewBuilderColumnIdentitySources(options: TestDataViewBuilderColumnOptions[] | TestDataViewBuilderColumnOptions): DataViewBuilderColumnIdentitySource[];
    static getValuesTable(categories?: DataViewCategoryColumn[], values?: DataViewValueColumn[]): any[][];
    static createDataViewBuilderColumnOptions(categoriesColumns: (TestDataViewBuilderCategoryColumnOptions | TestDataViewBuilderCategoryColumnOptions[])[], valuesColumns: (DataViewBuilderValuesColumnOptions | DataViewBuilderValuesColumnOptions[])[], filter?: (options: TestDataViewBuilderColumnOptions) => boolean, customizeColumns?: CustomizeColumnFn): DataViewBuilderAllColumnOptions;
    static setUpDataViewBuilderColumnOptions(options: DataViewBuilderAllColumnOptions, aggregateFunction: (array: number[]) => number): DataViewBuilderAllColumnOptions;
    static setUpDataView(dataView: DataView, options: DataViewBuilderAllColumnOptions): DataView;
    protected createCategoricalDataViewBuilder(categoriesColumns: (TestDataViewBuilderCategoryColumnOptions | TestDataViewBuilderCategoryColumnOptions[])[], valuesColumns: (DataViewBuilderValuesColumnOptions | DataViewBuilderValuesColumnOptions[])[], columnNames: string[], customizeColumns?: CustomizeColumnFn): IDataViewBuilderCategorical;
    abstract getDataView(columnNames?: string[]): DataView;
}
