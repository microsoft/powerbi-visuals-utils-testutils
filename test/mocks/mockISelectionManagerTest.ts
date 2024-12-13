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
import { createSelectionId } from "../../src/mocks/mocks";
import { MockISelectionManager } from "../../src/mocks/mockISelectionManager";

import ISelectionId = powerbi.visuals.ISelectionId;

describe("MockISelectionManager", () => {
    let selectionManager: MockISelectionManager;

    beforeEach(() => {
        selectionManager = new MockISelectionManager();
    });

    describe("clear", () => {
        it("should have an empty selection", () => {
            expect(selectionManager.hasSelection()).toBeFalsy();
        });

        it("should clear the selection", () => {
            const selectionId: ISelectionId = createSelectionId("1");

            selectionManager.select(selectionId);
            selectionManager.clear();

            expect(selectionManager.getSelectionIds()).toHaveSize(0);
            expect(selectionManager.hasSelection()).toBeFalsy();
        })
    });

    describe("hasSelection", () => {
        it("should return false when there is no selection", () => {
            expect(selectionManager.hasSelection()).toBeFalsy();
        });

        it("should return true when there is a selection", () => {
            const selectionId: ISelectionId = createSelectionId("1");

            selectionManager.select(selectionId);

            expect(selectionManager.hasSelection()).toBeTruthy();
        });

        it("should return false when the selection is cleared", () => {
            const selectionId: ISelectionId = createSelectionId("1");

            selectionManager.select(selectionId);
            selectionManager.clear();

            expect(selectionManager.hasSelection()).toBeFalsy();
        });

        it("should return false when selection is toggled", () => {
            const selectionId: ISelectionId = createSelectionId("1");

            selectionManager.select(selectionId);
            selectionManager.select(selectionId);

            expect(selectionManager.hasSelection()).toBeFalsy();
        });
    });

    describe("getSelectionIds", () => {
        it("should return an empty array when there is no selection", () => {
            expect(selectionManager.getSelectionIds()).toHaveSize(0);
        });

        it("should return an array with a selection", () => {
            const selectionId: ISelectionId = createSelectionId("1");

            selectionManager.select(selectionId);

            const selectedIds: ISelectionId[] = selectionManager.getSelectionIds();
            expect(selectedIds).toHaveSize(1);
        });
    });

    describe("containsSelection", () => {
        it("should return false when there is no selection", () => {
            const selectionId: ISelectionId = createSelectionId("1");

            expect(selectionManager.containsSelection(selectionId)).toBeFalsy();
        });

        it("should return true when the selection is present", () => {
            const selectionId: ISelectionId = createSelectionId("1");

            selectionManager.select(selectionId);

            expect(selectionManager.containsSelection(selectionId)).toBeTruthy();
        });

        it("should return false when the selection is not present", () => {
            const selectionId: ISelectionId = createSelectionId("1");
            const otherSelectionId: ISelectionId = createSelectionId("2");

            selectionManager.select(selectionId);

            expect(selectionManager.containsSelection(otherSelectionId)).toBeFalsy();
        });
    });

    describe("select", () => {
        it("should add a selection", () => {
            const selectionId: ISelectionId = createSelectionId("1");

            selectionManager.select(selectionId);

            const selectedIds: ISelectionId[] = selectionManager.getSelectionIds();
            expect(selectedIds).toHaveSize(1);
            expect(selectedIds[0]).toEqual(selectionId);
        });

        it("should toggle a selection", () => {
            const selectionId: ISelectionId = createSelectionId("1");

            selectionManager.select(selectionId);
            selectionManager.select(selectionId);

            const selectedIds: ISelectionId[] = selectionManager.getSelectionIds();
            expect(selectedIds).toHaveSize(0);
        });

        it("should replace a selection", () => {
            const selectionId0: ISelectionId = createSelectionId("0");
            const selectionId1: ISelectionId = createSelectionId("1");

            selectionManager.select(selectionId0);
            selectionManager.select(selectionId1);

            const selectedIds: ISelectionId[] = selectionManager.getSelectionIds();
            expect(selectedIds).toHaveSize(1);
            expect(selectedIds[0]).toEqual(selectionId1);
        });

        it("should not update the selection when selection array is empty", () => {
            const selectionId: ISelectionId = createSelectionId("1");

            selectionManager.select(selectionId);
            selectionManager.select([]);

            const selectedIds: ISelectionId[] = selectionManager.getSelectionIds();
            expect(selectedIds).toHaveSize(1);
            expect(selectedIds[0]).toEqual(selectionId);
        })

        it("should add multiple selections at once", () => {
            const selectionId0: ISelectionId = createSelectionId("0");
            const selectionId1: ISelectionId = createSelectionId("1");
            const selectionId2: ISelectionId = createSelectionId("2");

            selectionManager.select([selectionId0, selectionId1, selectionId2]);

            const selectedIds: ISelectionId[] = selectionManager.getSelectionIds();
            expect(selectedIds).toHaveSize(3);
            expect(selectedIds[0]).toEqual(selectionId0);
            expect(selectedIds[1]).toEqual(selectionId1);
            expect(selectedIds[2]).toEqual(selectionId2);
        });

        it("should add multiple selections with multiSelection", () => {
            const selectionId0: ISelectionId = createSelectionId("0");
            const selectionId1: ISelectionId = createSelectionId("1");
            const selectionId2: ISelectionId = createSelectionId("2");

            selectionManager.select(selectionId0);
            selectionManager.select(selectionId1, true);
            selectionManager.select(selectionId2, true);

            const selectedIds: ISelectionId[] = selectionManager.getSelectionIds();
            expect(selectedIds).toHaveSize(3);
            expect(selectedIds[0]).toEqual(selectionId0);
            expect(selectedIds[1]).toEqual(selectionId1);
            expect(selectedIds[2]).toEqual(selectionId2);
        });

        it("should toggle a selection with multiSelection", () => {
            const selectionId0: ISelectionId = createSelectionId("0");
            const selectionId1: ISelectionId = createSelectionId("1");
            const selectionId2: ISelectionId = createSelectionId("2");

            selectionManager.select([selectionId0, selectionId1, selectionId2]);
            selectionManager.select(selectionId2, true);

            const selectedIds: ISelectionId[] = selectionManager.getSelectionIds();
            expect(selectedIds).toHaveSize(2);
            expect(selectedIds[0]).toEqual(selectionId0);
            expect(selectedIds[1]).toEqual(selectionId1);
        });

        it("should replace a selection with passed array of selectionIds", () => {
            const selectionId0: ISelectionId = createSelectionId("0");
            const selectionId1: ISelectionId = createSelectionId("1");
            const selectionId2: ISelectionId = createSelectionId("2");
            const selectionId3: ISelectionId = createSelectionId("3");

            selectionManager.select([selectionId0, selectionId1]);
            selectionManager.select([selectionId2, selectionId3]);

            const selectedIds: ISelectionId[] = selectionManager.getSelectionIds();
            expect(selectedIds).toHaveSize(2);
            expect(selectedIds[0]).not.toEqual(selectionId0);
            expect(selectedIds[1]).not.toEqual(selectionId1);
            expect(selectedIds[0]).toEqual(selectionId2);
            expect(selectedIds[1]).toEqual(selectionId3);
        });

        it("should merge a selection with passed array of selectionIds", () => {
            const selectionId0: ISelectionId = createSelectionId("0");
            const selectionId1: ISelectionId = createSelectionId("1");
            const selectionId2: ISelectionId = createSelectionId("2");
            const selectionId3: ISelectionId = createSelectionId("3");

            selectionManager.select([selectionId0, selectionId1]);
            selectionManager.select([selectionId2, selectionId3], true);

            const selectedIds: ISelectionId[] = selectionManager.getSelectionIds();
            expect(selectedIds).toHaveSize(4);
            expect(selectedIds[0]).toEqual(selectionId0);
            expect(selectedIds[1]).toEqual(selectionId1);
            expect(selectedIds[2]).toEqual(selectionId2);
            expect(selectedIds[3]).toEqual(selectionId3);
        });
    });
});