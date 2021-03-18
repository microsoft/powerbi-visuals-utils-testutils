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
import { DataTable, MatrixDataViewBuilder, ResourceColumnMetadata } from "../../src/dataViewBuilder/matrixBuilder";

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

describe("test MatrixDataViewBuilder ", () => {
    describe("with 2 row groups and 2 measure groups", () => {
        let dataView: DataView;
        let dataTable = [
            ["Division", "Region", "Revenue Budget", "Total COGS"],
            ["Core", null, 421818.096, 736173.87],
            ["Core", "CENTRAL", 1191435, 1419847.51],
            ["Core", "EAST", 27199561.42, 35353245.96],
            ["Core", "NORTH", 35763040.53, 45951725.04],
            ["Core", "SOUTH", 2507806.098, 3151651.45],
            ["Core", "WEST", 374458.462, 688982.45],

            ["Growth", null, 52987.2, -19398.95],
            ["Growth", "CENTRAL", 219665.6, 254855.52],
            ["Growth", "EAST", 16373481.29, 18230138.93],
            ["Growth", "NORTH", 2585794.4, 3875087.19],
            ["Growth", "SOUTH", 6985752.48, 7881063.82],
            ["Growth", "WEST", 822250.324, 673989.44],

            ["Minor", null, 561907.556, 652561.44],
            ["Minor", "CENTRAL", 469392.84, 494907.02],
            ["Minor", "EAST", 2862202, 2894830.67],
            ["Minor", "NORTH", 16961930.3, 16632528.85],
            ["Minor", "SOUTH", 1339611, 1851610.18],
            ["Minor", "WEST", 638005.2, 322058.2],
        ];
        beforeEach(() => {
            const table = new DataTable(
                dataTable
            );

            let columns: { [name: string]: ResourceColumnMetadata } = {
                Measure1: {
                    name: "Revenue Budget",
                    displayName: "Revenue Budget",
                    type: { numeric: true },
                },
                Measure2: {
                    name: "Total COGS",
                    displayName: "Total COGS",
                    type: { numeric: true },
                },
                RowGroup1: {
                    name: "Division",
                    displayName: "Division",
                    type: { text: true },
                },
                RowGroup2: {
                    name: "Region",
                    displayName: "Region",
                    type: { text: true },
                },
            };
            let tableMetadata = {
                name: "table"
            };

            let builder = new MatrixDataViewBuilder(table, tableMetadata);

            dataView = builder
                .withRowGroup({
                    columns: [{
                        metadata: columns.RowGroup1,
                        role: "Rows",
                        index: 2,
                    }]
                })
                .withRowGroup({
                    columns: [{
                        metadata: columns.RowGroup2,
                        role: "Rows",
                        index: 3,
                    }]
                })
                .withValues([{
                    metadata: columns.Measure1,
                    role: "Values",
                    index: 0,
                }, {
                    metadata: columns.Measure2,
                    role: "Values",
                    index: 1,
                }])
                .build();
        });

        it("should build matrix object", () => {
            expect(dataView).toBeDefined();
        });

        it("columns should be empty", () => {
            const root = {
                children: [
                    {
                        level: 0
                    },
                    {
                        level: 0,
                        levelSourceIndex: 1
                    }
                ]
            };
            expect(dataView.matrix.columns.root).toEqual(root);
            expect(dataView.matrix.columns.levels[0].sources[0].displayName).toBe("Revenue Budget");
            expect(dataView.matrix.columns.levels[0].sources[1].displayName).toBe("Total COGS");
        });

        it("dataview should be populated with valid measures", () => {
            const root = dataView.matrix.rows.root;
            const coreIndex = root.children.findIndex(el => el.value === "Core");
            expect(root.children[coreIndex].children[1].values).toEqual({ 0: { value: 1191435 }, 1: { value: 1419847.51, valueSourceIndex: 1 } });
            expect(root.children[coreIndex].children[2].values).toEqual({ 0: { value: 27199561.42 }, 1: { value: 35353245.96, valueSourceIndex: 1 } });
            expect(root.children[coreIndex].children[3].values).toEqual({ 0: { value: 35763040.53 }, 1: { value: 45951725.04, valueSourceIndex: 1 } });
            expect(root.children[coreIndex].children[4].values).toEqual({ 0: { value: 2507806.098 }, 1: { value: 3151651.45, valueSourceIndex: 1 } });
            expect(root.children[coreIndex].children[5].values).toEqual({ 0: { value: 374458.462 }, 1: { value: 688982.45, valueSourceIndex: 1 } });

            const growthIndex = root.children.findIndex(el => el.value === "Growth");
            expect(root.children[growthIndex].children[1].values).toEqual({ 0: { value: 219665.6 }, 1: { value: 254855.52, valueSourceIndex: 1 } });
            expect(root.children[growthIndex].children[2].values).toEqual({ 0: { value: 16373481.29 }, 1: { value: 18230138.93, valueSourceIndex: 1 } });
            expect(root.children[growthIndex].children[3].values).toEqual({ 0: { value: 2585794.4 }, 1: { value: 3875087.19, valueSourceIndex: 1 } });
            expect(root.children[growthIndex].children[4].values).toEqual({ 0: { value: 6985752.48 }, 1: { value: 7881063.82, valueSourceIndex: 1 } });
            expect(root.children[growthIndex].children[5].values).toEqual({ 0: { value: 822250.324 }, 1: { value: 673989.44, valueSourceIndex: 1 } });

            const minorIndex = root.children.findIndex(el => el.value === "Minor");
            expect(root.children[minorIndex].children[1].values).toEqual({ 0: { value: 469392.84 }, 1: { value: 494907.02, valueSourceIndex: 1 } });
            expect(root.children[minorIndex].children[2].values).toEqual({ 0: { value: 2862202 }, 1: { value: 2894830.67, valueSourceIndex: 1 } });
            expect(root.children[minorIndex].children[3].values).toEqual({ 0: { value: 16961930.3 }, 1: { value: 16632528.85, valueSourceIndex: 1 } });
            expect(root.children[minorIndex].children[4].values).toEqual({ 0: { value: 1339611 }, 1: { value: 1851610.18, valueSourceIndex: 1 } });
            expect(root.children[minorIndex].children[5].values).toEqual({ 0: { value: 638005.2 }, 1: { value: 322058.2, valueSourceIndex: 1 } });

        });

        it("columns should be valid", () => {
            expect(dataView.matrix.columns.levels[0].sources[0].displayName).toBe("Revenue Budget");
            expect(dataView.matrix.columns.levels[0].sources[1].displayName).toBe("Total COGS");
        });
        it("rows should be valid", () => {
            expect(dataView.matrix.rows.levels[0].sources[0].displayName).toBe("Division");
            expect(dataView.matrix.rows.levels[1].sources[0].displayName).toBe("Region");
        });

    });
    describe("with 2 row groups, no column groups, no measures", () => {

        let dataView: DataView;

        beforeEach(() => {
            const table = new DataTable(
                [
                    ["Division", "Region"],
                    ["Core", null],
                    ["Core", "CENTRAL"],
                    ["Core", "EAST"],
                    ["Core", "NORTH"],
                    ["Core", "SOUTH"],
                    ["Core", "WEST"],

                    ["Growth", null],
                    ["Growth", "CENTRAL"],
                    ["Growth", "EAST"],
                    ["Growth", "NORTH"],
                    ["Growth", "SOUTH"],
                    ["Growth", "WEST"],

                    ["Minor", null],
                    ["Minor", "CENTRAL"],
                    ["Minor", "EAST"],
                    ["Minor", "NORTH"],
                    ["Minor", "SOUTH"],
                    ["Minor", "WEST"],
                ]
            );
            let columns: { [name: string]: ResourceColumnMetadata } = {
                RowGroup1: {
                    name: "Division",
                    displayName: "Division",
                    type: { text: true },
                },
                RowGroup2: {
                    name: "Region",
                    displayName: "Region",
                    type: { text: true },
                },
            };
            let tableMetadata = {
                name: "table"
            };

            let builder = new MatrixDataViewBuilder(table, tableMetadata);

            dataView = builder
                .withRowGroup({
                    columns: [{
                        metadata: columns.RowGroup1,
                        role: "Rows",
                        index: 0,
                    }]
                })
                .withRowGroup({
                    columns: [{
                        metadata: columns.RowGroup2,
                        role: "Rows",
                        index: 1,
                    }]
                })
                .build();
        });




        it("value sources should be empty", () => {
            expect(dataView.matrix.valueSources).toEqual([]);
        });

        it("columns should be empty", () => {
            const columns = {
                root: {
                    children: []
                },
                levels: []
            };
            expect(dataView.matrix.columns).toEqual(columns);

        });

        it("rows' levels' sources should be valid", () => {
            expect(dataView.matrix.rows.levels[0].sources[0].displayName).toBe("Division");
            expect(dataView.matrix.rows.levels[1].sources[0].displayName).toBe("Region");
        });

        it("rows' levels' depth should be valid", () => {
            expect(dataView.matrix.rows.root.children[0].level).toBe(0);
            expect(dataView.matrix.rows.root.children[1].level).toBe(0);
            expect(dataView.matrix.rows.root.children[2].level).toBe(0);
            expect(dataView.matrix.rows.root.children[0].children[0].level).toBe(1);
            expect(dataView.matrix.rows.root.children[1].children[0].level).toBe(1);
            expect(dataView.matrix.rows.root.children[2].children[0].level).toBe(1);
        });

        it("root should be valid", () => {
            const root = {
                children: [
                    {
                        level: 0,
                        levelValues: [
                            {
                                value: "Core",
                                levelSourceIndex: 0
                            }
                        ],
                        value: "Core",
                        children: [
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: null,
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: null,
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "CENTRAL",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "CENTRAL",
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "EAST",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "EAST",
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "NORTH",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "NORTH",
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "SOUTH",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "SOUTH",
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "WEST",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "WEST",
                            }
                        ]
                    },
                    {
                        level: 0,
                        levelValues: [
                            {
                                value: "Growth",
                                levelSourceIndex: 0
                            }
                        ],
                        value: "Growth",
                        children: [
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: null,
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: null,
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "CENTRAL",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "CENTRAL",
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "EAST",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "EAST",
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "NORTH",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "NORTH",
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "SOUTH",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "SOUTH",
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "WEST",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "WEST",
                            }
                        ]
                    },
                    {
                        level: 0,
                        levelValues: [
                            {
                                value: "Minor",
                                levelSourceIndex: 0
                            }
                        ],
                        value: "Minor",
                        children: [
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: null,
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: null,
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "CENTRAL",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "CENTRAL",
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "EAST",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "EAST",
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "NORTH",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "NORTH",
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "SOUTH",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "SOUTH",
                            },
                            {
                                level: 1,
                                levelValues: [
                                    {
                                        value: "WEST",
                                        levelSourceIndex: 0
                                    }
                                ],
                                value: "WEST",
                            }
                        ]
                    }
                ]
            };
            expect(dataView.matrix.rows.root).toEqual(root);
        });

        it("rows should be valid", () => {
            const rows = ["Core", "Growth", "Minor"];
            expect(rows).toContain(dataView.matrix.rows.root.children[0].value.toString());
            expect(rows).toContain(dataView.matrix.rows.root.children[1].value.toString());
            expect(rows).toContain(dataView.matrix.rows.root.children[2].value.toString());

            expect(dataView.matrix.rows.root.children[0].children[1].value).toBe("CENTRAL");
            expect(dataView.matrix.rows.root.children[0].children[2].value).toBe("EAST");
            expect(dataView.matrix.rows.root.children[0].children[3].value).toBe("NORTH");
            expect(dataView.matrix.rows.root.children[0].children[4].value).toBe("SOUTH");
            expect(dataView.matrix.rows.root.children[0].children[5].value).toBe("WEST");

            expect(dataView.matrix.rows.root.children[1].children[1].value).toBe("CENTRAL");
            expect(dataView.matrix.rows.root.children[1].children[2].value).toBe("EAST");
            expect(dataView.matrix.rows.root.children[1].children[3].value).toBe("NORTH");
            expect(dataView.matrix.rows.root.children[1].children[4].value).toBe("SOUTH");
            expect(dataView.matrix.rows.root.children[1].children[5].value).toBe("WEST");

            expect(dataView.matrix.rows.root.children[2].children[1].value).toBe("CENTRAL");
            expect(dataView.matrix.rows.root.children[2].children[2].value).toBe("EAST");
            expect(dataView.matrix.rows.root.children[2].children[3].value).toBe("NORTH");
            expect(dataView.matrix.rows.root.children[2].children[4].value).toBe("SOUTH");
            expect(dataView.matrix.rows.root.children[2].children[5].value).toBe("WEST");
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
