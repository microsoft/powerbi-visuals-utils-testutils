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

    public showContextMenu(selectionId: ISelectionId, position: IPoint): IPromise<{}> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        }) as any;
    }

    public select(selectionId: ISelectionId | ISelectionId[], multiSelect?: boolean): IPromise<ISelectionId[]> {
        let selectionIds: ISelectionId[] = [].concat(selectionId);

        // if no multiselect reset current selection and save new passed selections;
        if (!multiSelect) {
            this.selectionIds = selectionIds;
        } else {
            // if multiselect then check all passed selections
            selectionIds.forEach( (id: ISelectionId) => {
                // if selectionManager has passed selection in list of current selections
                if (this.containsSelection(id)) {
                    // need to exclude from selection (selection of selected element should deselect element)
                    this.selectionIds = this.selectionIds.filter((selectedId: ISelectionId) => {
                        return !selectedId.equals(id);
                    });
                } else {
                    // otherwise include the new selection into current selections
                    this.selectionIds.push(id);
                }
            });
        }

        return new Promise((resolve, reject) => {
            resolve(this.selectionIds);
        }) as any;
    }

    public hasSelection(): boolean {
        return this.selectionIds.length > 0;
    }

    public clear(): IPromise<{}> {
        this.selectionIds = [];

        return new Promise<void>((resolve, reject) => {
            resolve();
        }) as any;
    }

    public getSelectionIds(): ISelectionId[] {
        return this.selectionIds;
    }

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
        this.callback(selections);
    }
}
