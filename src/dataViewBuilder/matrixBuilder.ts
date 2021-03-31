
import powerbi from "powerbi-visuals-api";
import { ValueType } from "powerbi-visuals-utils-typeutils/lib/valueType";

import every from "lodash-es/every";
import map from "lodash-es/map";
import last from "lodash-es/last";
import range from "lodash-es/range";
import flatMap from "lodash-es/flatMap";

import DataViewMatrix = powerbi.DataViewMatrix;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import PrimitiveValue = powerbi.PrimitiveValue;
import DataViewMatrixNode = powerbi.DataViewMatrixNode;
import DataViewObjects = powerbi.DataViewObjects;


export interface ResourceTableMetadata {
    name: string;
    schemaName?: string;
}

export interface ResourceColumnMetadata {
    name: string;
    displayName: string;
    type: powerbi.ValueTypeDescriptor;
    format?: string;
}

interface ResourceMetadata {
    column: ResourceColumnMetadata[];
}

interface DataViewBuilderBaseColumnOptions {
    metadata: ResourceColumnMetadata;
    metadataObjects?: DataViewObjects;
    role: string;
    index?: number;
    queryName?: string;
    aggregates?: powerbi.DataViewColumnAggregates;
}

interface DataViewBuilderCompositeColumnOptions {
    columns: DataViewBuilderBaseColumnOptions[];
    dataObjects?: DataViewObjects[];
}

interface DataViewBuilderColumnOptions extends DataViewBuilderBaseColumnOptions {
    dataObjects?: DataViewObjects[];
}

interface LevelMetadata {
    sources: powerbi.DataViewMetadataColumn[];
    tableIndices: number[];
}

interface HierarchyMetadata {
    levels: LevelMetadata[];
}
// Data Format
// | columnName1 | columnName2 |
// |===========================|
// |        cat1 |             |
// |             |        cat2 |
// |             |        cat2 |
// |             |        cat2 |
export class DataTable {
    table: any[][];
    columnNames: string[];
    rowCount: number;
    constructor(table: any[][]) {
        // Assume the first row is a header row.
        this.columnNames = <string[]>table[0];
        this.rowCount = table.length - 1;

        // Drop the first (header) row
        this.table = table.slice(1);
    }
    public getColumnIndex(name: string): number {
        let index = this.columnNames.findIndex((c) => c === name);
        return index;
    }
    public forEachRow(iterator: (row: any[]) => void): void {
        for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
            iterator(this.table[rowIndex]);
        }
    }
}

export class ColumnMetadataBuilder {

    constructor(tableMetadata?: ResourceTableMetadata) {
        const tableName = tableMetadata?.name ?? "table";
        const schemaName = tableMetadata?.schemaName ?? undefined;
    }

    public buildCategoryColumnMetadata(columnOptions: DataViewBuilderBaseColumnOptions): DataViewMetadataColumn {
        let metadata = columnOptions.metadata;

        let column = this.buildBasicColumnMetadata(columnOptions);

        column.isMeasure = false;
        column.identityExprs = [column.expr];

        return column;
    }

    public buildValueColumnMetadata(columnOptions: DataViewBuilderBaseColumnOptions): DataViewMetadataColumn {
        let metadata = columnOptions.metadata;

        let column = this.buildBasicColumnMetadata(columnOptions);

        column.isMeasure = true;

        return column;
    }

    private buildBasicColumnMetadata(columnOptions: DataViewBuilderBaseColumnOptions): DataViewMetadataColumn {
        const column = columnOptions.metadata;
        const columnType = ValueType.fromDescriptor(column.type);

        const columnMetadata: DataViewMetadataColumn = {
            displayName: column.displayName,
            queryName: columnOptions.queryName ?? column.name,
            index: columnOptions.index,
            type: columnType,
            roles: { [columnOptions.role]: true },
            format: column.format,
        };

        if (columnOptions.metadataObjects)
            columnMetadata.objects = columnOptions.metadataObjects;

        if (columnOptions.aggregates)
            columnMetadata.aggregates = columnOptions.aggregates;

        return columnMetadata;
    }
}


export class MatrixDataViewBuilder {
    private highlights: PrimitiveValue[][];
    private level: PrimitiveValue[];
    private levelColumn: DataViewMetadataColumn;
    private levelIdentities: any[]; // DataViewScopeIdentity
    private levelObjects: DataViewObjects[];
    private values: PrimitiveValue[][];
    private valueColumns: DataViewMetadataColumn[];

    private objects: DataViewObjects;
    private readonly columnMetadataBuilder: ColumnMetadataBuilder;
    private rowGroupingOptions: DataViewBuilderCompositeColumnOptions[] = [];
    private columnGroupingOptions: DataViewBuilderCompositeColumnOptions[] = [];
    private valuesOptions: DataViewBuilderColumnOptions[];

    constructor(private readonly table: DataTable, tableMetadata?: ResourceTableMetadata) {
        if (!tableMetadata)
            tableMetadata = { name: "table" };

        this.columnMetadataBuilder = new ColumnMetadataBuilder(tableMetadata);
    }


    public withRowGroups(options: DataViewBuilderCompositeColumnOptions[]): this {
        this.rowGroupingOptions.push(...options);
        return this;
    }

    public withRowGroup(options: DataViewBuilderCompositeColumnOptions): this {
        return this.withRowGroups([options]);
    }

    public withColumnGroups(options: DataViewBuilderCompositeColumnOptions[]): this {
        this.columnGroupingOptions.push(...options);
        return this;
    }

    public withColumnGroup(options: DataViewBuilderCompositeColumnOptions): this {
        return this.withColumnGroups([options]);
    }

    public withValues(options: DataViewBuilderBaseColumnOptions[]): this {
        this.valuesOptions = options;
        return this;
    }


    public createRootMatrixNode(rows: string[][], rowNames: string[], columns?: [][], columnNames?: string[]): DataViewMatrixNode {
        let root = {
            children: []
        };
        const length = rows[0].length;
        if (rows.find(row => row.length !== length) || columns && columns.find(col => col.length !== length)) {
            throw "Invalid data input";
        }

        const depth: number = rows.length - 1;
        let identityIndexIterator = 0;
        let currentRoot: DataViewMatrixNode;
        for (let i = 0; i < length; i++) {
            currentRoot = root;
            for (let j = 0; j <= depth; j++) {
                const foundNode = currentRoot.children.filter(node => node.value === rows[i][j]);
                if (foundNode.length > 1) {
                    throw "Unexpected duplicate found";
                } else if (foundNode.length === 1) {
                    currentRoot = foundNode.pop();
                } else if (foundNode.length === 0) {
                    let newNode: DataViewMatrixNode = {
                        children: [],
                        identity: {
                            identityIndex: identityIndexIterator++
                        },
                        value: rows[i][j]
                    };
                    if (j === depth) {
                        // fill values
                    }
                    currentRoot.children.push(newNode);
                    currentRoot = newNode;
                }
            }
        }
        return root;
    }

    private buildLevelMetadata(columns: DataViewBuilderBaseColumnOptions[], isMeasure: boolean): LevelMetadata {
        let sources: powerbi.DataViewMetadataColumn[] = [];
        let tableIndices: number[] = [];
        for (let columnOptions of columns) {
            const sourceColumn = isMeasure
                ? this.columnMetadataBuilder.buildValueColumnMetadata(columnOptions)
                : this.columnMetadataBuilder.buildCategoryColumnMetadata(columnOptions);
            sources.push(sourceColumn);
            tableIndices.push(this.table.getColumnIndex(columnOptions.metadata.name));
        }

        return {
            sources: sources,
            tableIndices: tableIndices,
        };
    }

    private buildHierarchyMetadata(options: DataViewBuilderCompositeColumnOptions[]): HierarchyMetadata {
        let hierarchy: HierarchyMetadata = {
            levels: []
        };

        for (let levelOptions of options) {
            let columnSet: LevelMetadata = this.buildLevelMetadata(levelOptions.columns, false);
            hierarchy.levels.push(columnSet);
        }

        return hierarchy;
    }

    private sequenceEqual<T, U>(left: T[], right: U[], comparison: (x: T, y: U) => boolean): boolean {

        // Normalize falsy to null
        if (!left) { left = null; }
        if (!right) { right = null; }

        // T can be same as U, and it is possible for left and right to be the same array object...
        if (left === <any[]>right) {
            return true;
        }

        if (!!left !== !!right) {
            return false;
        }

        let len = left.length;
        if (len !== right.length) {
            return false;
        }

        let i = 0;
        while (i < len && comparison(left[i], right[i])) {
            ++i;
        }

        return i === len;
    }

    private findMatchingNodeInList(nodes: powerbi.DataViewMatrixNode[], values: any[]): powerbi.DataViewMatrixNode | undefined {
        for (let node of nodes) {
            if (this.sequenceEqual(node.levelValues, values, (a, b) => a.value === b))
                return node;
        }
    }
    private compareValue(a: any, b: any): number {
        if (a === b)
            return 0;

        if (a == null)
            return -1;

        if (b == null)
            return 1;

        if (a < b)
            return -1;

        if (a > b)
            return 1;

        return 0;
    }
    private insertInSortedOrder(node: powerbi.DataViewMatrixNode, list: powerbi.DataViewMatrixNode[]): void {
        for (let i = 0; i < list.length; i++) {
            let currNode = list[i];
            for (let j = 0; j < currNode.levelValues.length; j++) {
                let comparison = this.compareValue(node.levelValues[j].value, currNode.levelValues[j].value);
                if (comparison < 0) {
                    list.splice(i, 0, node);
                    return;
                }
                else if (comparison > 0) {
                    break;
                }
            }
        }

        list.push(node);
    }

    private ensureValueInHierarchy(
        hierarchy: HierarchyMetadata,
        node: powerbi.DataViewMatrixNode,
        row: any[],
        insertSorted: boolean): powerbi.DataViewMatrixNode {
        for (let levelIdx = 0; levelIdx < hierarchy.levels.length; levelIdx++) {
            const level = hierarchy.levels[levelIdx];
            // const columnExprs = level.sources.map((col) => <powerbi.data.SQExpr>col.expr);

            const isLeafLevel = levelIdx === hierarchy.levels.length - 1;

            // TODO: describe the difference here, or create value nodes separately
            if (isLeafLevel && every(level.sources, (source) => source.isMeasure)) {
                node.children = map(level.sources, (source, i) => {
                    let child: powerbi.DataViewMatrixNode = {
                        level: levelIdx,
                    };

                    // We omit the levelSourceIndex only when it is 0
                    if (i !== 0)
                        child.levelSourceIndex = i;

                    return child;
                });
            }
            else {
                if (!node.children) {
                    node.children = [];
                    // node.childIdentityFields = columnExprs;
                }

                const columnValues = level.tableIndices.map((index) => row[index]);
                let child = this.findMatchingNodeInList(node.children, columnValues);
                if (!child) {
                    child = {
                        level: levelIdx,
                        levelValues: columnValues.map((value, i) => ({
                            value: value,
                            levelSourceIndex: i
                        })),
                        // TODO: support a different column for identities to simulate GOK
                        // identity: mocks.dataViewScopeIdentityCompositeWithEquality(columnExprs, columnValues),
                    };

                    // DEPRECATED: these values are deprecated
                    child.value = last(columnValues);

                    // let levelSourceIndex = columnValues.length - 1;
                    // if (levelSourceIndex !== 0)
                    //     child.levelSourceIndex = levelSourceIndex;

                    if (insertSorted)
                        this.insertInSortedOrder(child, node.children);
                    else
                        node.children.push(child);
                }

                node = child;
            }
        }

        return node;
    }
    private findValueInHierarchy(
        isMatch: (node: powerbi.DataViewMatrixNode, level: number) => boolean,
        root: powerbi.DataViewMatrixNode,
        hierarchyDepth: number): number {
        let count = 0;
        let stack: {
            level: number;
            partialMatch: boolean;
            node: powerbi.DataViewMatrixNode
        }[] = [];

        stack.unshift({
            partialMatch: true,
            level: -1,
            node: root,
        });

        while (stack.length > 0) {
            const { node, level, partialMatch } = stack.shift();
            const atLeaf = level >= hierarchyDepth; // columnValues.length - 2;

            const match = partialMatch
                && (level === -1  // root node does not have levelValues
                    || isMatch(node, level));

            if (!atLeaf) {
                stack.unshift(...map(node.children, (child) => ({
                    partialMatch: match,
                    level: level + 1,
                    node: child,
                })));
            }
            else {
                if (match) {
                    return count;
                }
                else {
                    // Assumes there is only 1 level of children under this node, the nodes for the measures
                    count += node.children.length;
                }
            }
        }

        return count;
    }
    private forEachLeaf(node: powerbi.DataViewMatrixNode, visitor: (node: powerbi.DataViewMatrixNode) => void): void {
        if (node.children) {
            for (let child of node.children) {
                this.forEachLeaf(child, visitor);
            }
        }
        else {
            visitor(node);
        }
    }

    private readData(
        rowHierarchyMetadata: HierarchyMetadata,
        columnHierarchyMetadata: HierarchyMetadata,
        measureMetadata: LevelMetadata | undefined,
        table: DataTable): powerbi.DataViewMatrix {

        const columnLevels = columnHierarchyMetadata.levels.map((level) => ({
            sources: level.sources,
        }));

        // if (measureMetadata)
        //     columnLevels.push({ sources: measureMetadata.sources });

        const matrix: powerbi.DataViewMatrix = {
            columns: {
                levels: columnLevels,
                root: {}
            },
            rows: {
                levels: rowHierarchyMetadata.levels.map((level) => ({
                    sources: level.sources,
                })),
                root: {},
            },
            valueSources: measureMetadata?.sources ?? [],
        };

        // Fill in empty children array for dimensions that don't have any grouping
        if (matrix.columns.levels.length === 0)
            matrix.columns.root.children = [];
        if (matrix.rows.levels.length === 0)
            matrix.rows.root.children = [];

        // We do two passes over the data table,
        // The first pass fills in the group instances of row & column hierarchies.
        // The second pass fills in the measure values. We need to do this as a second pass
        // because the index of the measure value will depend on the column hierarchy.
        // See the doc for findValueInHierarchy

        // Pass 1
        table.forEachRow((row) => {
            this.ensureValueInHierarchy(
                columnHierarchyMetadata,
                matrix.columns.root,
                row,
                true,  // explicitly sort the column data
            );
            this.ensureValueInHierarchy(
                rowHierarchyMetadata,
                matrix.rows.root,
                row,
                false,  // rows are sorted in the order they appear in the data
            );
        });

        if (measureMetadata) {
            // We ignore the last level of values, we only want to find a matching path up to, but not including, the measure nodes
            const hierarchyDepth = columnLevels.length - 2;

            // Pass 1.5, fill in intersections with null values
            const leafCount = this.findValueInHierarchy(
                (_node) => false,
                matrix.columns.root,
                hierarchyDepth,
            );
            this.forEachLeaf(
                matrix.rows.root,
                (leafNode) => {
                    leafNode.values =
                        range(0, leafCount)
                            .reduce((bag, i) => {
                                // @ts-ignore: No Implicit Any
                                bag[i] = <powerbi.DataViewMatrixNodeValue>{ value: null };
                                return bag;
                            },
                                {});
                }
            );

            // Pass 2
            table.forEachRow((row) => {
                // Find the leaf node in the column heirarchy and calculate the index
                const columnValues: any[][] = [];
                for (const level of columnHierarchyMetadata.levels) {
                    columnValues.push(level.tableIndices.map((index) => row[index]));
                }

                const isMatch = (node: powerbi.DataViewMatrixNode, level: number) => {
                    return this.sequenceEqual(columnValues[level], node.levelValues, (value, levelValue) => value === levelValue.value);
                };

                const indexOfColumnLeaf = this.findValueInHierarchy(isMatch, matrix.columns.root, hierarchyDepth);
                // debug.assert((leafCount === 0 && indexOfColumnLeaf === 0) || indexOfColumnLeaf < leafCount, 'could not find leaf ');

                // Find the leaf node in the row hierarchy matching this data row
                // TODO: find? we shouldn't be adding nodes here
                const rowNode = this.ensureValueInHierarchy(
                    rowHierarchyMetadata,
                    matrix.rows.root,
                    row,
                    false,
                );

                if (rowNode.values == null)
                    rowNode.values = {};

                for (let i = 0; i < measureMetadata.tableIndices.length; i++) {
                    const tableIdx = measureMetadata.tableIndices[i];
                    const measureValue = row[tableIdx];

                    let valueNode: powerbi.DataViewMatrixNodeValue = {
                        value: measureValue,
                    };

                    // We omit the valueSourceIndex when it is 0
                    if (i !== 0)
                        valueNode.valueSourceIndex = i;

                    rowNode.values[indexOfColumnLeaf + i] = valueNode;
                }
            });
        }

        return matrix;
    }
    public build(): powerbi.DataView {
        // Build a column hierarchy based on metadata
        let columnHierarchyMetadata: HierarchyMetadata = { levels: [] };

        if (this.columnGroupingOptions) {
            columnHierarchyMetadata = this.buildHierarchyMetadata(this.columnGroupingOptions);
            // columnHierarchyMetadata = this.buildHierarchyMetadata(this.columnGroupingOptions);
        }

        // Build measures level
        // Append the measure level to column hierarchy
        let measureMetadata: LevelMetadata;
        if (this.valuesOptions) {
            measureMetadata = this.buildLevelMetadata(this.valuesOptions, true);
            columnHierarchyMetadata.levels.push(measureMetadata);
        }

        // Build a row hierarchy based on metadata
        let rowHierarchyMetadata = this.buildHierarchyMetadata(this.rowGroupingOptions);

        // Build nodes from data
        let matrix = this.readData(rowHierarchyMetadata, columnHierarchyMetadata, measureMetadata, this.table);

        return {
            metadata: {
                columns: [
                    ...flatMap(rowHierarchyMetadata.levels, (level) => level.sources),
                    ...flatMap(columnHierarchyMetadata.levels, (level) => level.sources),
                    // ...measureMetadata.sources,
                ],
                objects: this.objects,
            },
            matrix: matrix,
        };
    }


    public buildMatrix(): DataViewMatrix {
        let dataViewMatrix: DataViewMatrix = {
            rows: {
                levels: [{ sources: [this.levelColumn] }],
                root: {
                    children: [],
                    // childIdentityFields: [SQExprBuilder.fieldExpr({ column: { name: 'col', schema: 's', entity: 'e' } })],
                }
            },
            columns: {
                levels: [],
                root: undefined,
            },
            valueSources: []
        };

        for (let index in this.valueColumns) {
            dataViewMatrix.valueSources.push(this.valueColumns[index]);
        }

        let matrixRowsChildren = dataViewMatrix.rows.root.children;
        for (let index in this.level) {
            let node: DataViewMatrixNode = {
                values: [],
                level: 0,
                levelValues: [],
                value: this.level[index],
                // identity: mocks.dataViewScopeIdentity(this.level[index])
            };
            if (this.levelIdentities) {
                node.identity = this.levelIdentities[index];
            }

            if (this.levelObjects) {
                node.objects = this.levelObjects[index];
            }

            for (let i = 0; i < this.valueColumns.length; i++) {
                node.values[i] = { value: this.values[i][index], valueSourceIndex: i, highlight: this.highlights[i][index] };
            }

            matrixRowsChildren.push(node);
        }
        return dataViewMatrix;
    }
}
