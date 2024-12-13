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

// powerbi
import powerbi from "powerbi-visuals-api";
import IPromise = powerbi.IPromise;

// powerbi.visuals
import ISelectionId = powerbi.visuals.ISelectionId;
import IPoint = powerbi.extensibility.IPoint;

// powerbi.extensibility
import ISelectionManager = powerbi.extensibility.ISelectionManager;

export class MockISelectionManager implements ISelectionManager {
    private selectionIds: ISelectionId[] = [];

    private callback: (ids: ISelectionId[]) => void;

    // eslint-disable-next-line @typescript-eslint/ban-types
    public toggleExpandCollapse(selectionId: ISelectionId): IPromise<{}> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        }) as any;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    public showContextMenu(selectionId: ISelectionId, position: IPoint): IPromise<{}> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        }) as any;
    }

    public select(selectionId: ISelectionId | ISelectionId[], multiSelect?: boolean): IPromise<ISelectionId[]> {
        const selectionIds: ISelectionId[] = Array.isArray(selectionId) ? selectionId : [selectionId];

        if (selectionIds.length === 0) {
            return new Promise((resolve, reject) => {
                resolve(this.selectionIds);
            }) as any;
        }

        const handleMultipleSelection = ((selectionIds: ISelectionId[]) => {
            if (multiSelect) {
                // add new selection and toggle existing selection
                selectionIds.forEach(id => {
                    const matchingIndex = this.selectionIds.findIndex(selectedId => selectedId.equals(id));
                    if (matchingIndex > -1) {
                        this.selectionIds.splice(matchingIndex, 1);
                    } else {
                        this.selectionIds.push(id);
                    }
                });
            } else {
                // replace the current selection with the new selection
                this.selectionIds = selectionIds;
            }
        });

        const handleSingleSelection = ((selectionId: ISelectionId) => {
            const matchingIndex = this.selectionIds.findIndex(selectedId => selectedId.equals(selectionId));
            if (matchingIndex > -1) {
                // the selection is already selected, so we need to deselect it
                if (multiSelect) {
                    this.selectionIds.splice(matchingIndex, 1);
                } else {
                    this.selectionIds = [];
                }
            } else {
                // the selection is off, so we need to select it
                if (multiSelect) {
                    this.selectionIds.push(selectionId);
                } else {
                    this.selectionIds = [selectionId];
                }
            }
        });

        if (selectionIds.length > 1) {
            handleMultipleSelection(selectionIds);
        } else {
            handleSingleSelection(selectionIds[0]);
        }

        return new Promise((resolve, reject) => {
            resolve(this.selectionIds);
        }) as any;
    }

    public hasSelection(): boolean {
        return this.selectionIds.length > 0;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    public clear(): IPromise<{}> {
        this.selectionIds = [];

        return new Promise<void>((resolve, reject) => {
            resolve();
        }) as any;
    }

    public getSelectionIds(): ISelectionId[] {
        return this.selectionIds;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public applySelectionFilter(): void { }

    public containsSelection(id: ISelectionId) {
        return this.selectionIds.some((selectionId: ISelectionId) => {
            return selectionId.equals(id);
        });
    }

    public registerOnSelectCallback(callback: (ids: ISelectionId[]) => void): void {
        this.callback = callback;
    }

    public simutateSelection(selections: ISelectionId[]): void {
        if (typeof this.callback === "function") {
            this.callback(selections);
        }
    }
}
