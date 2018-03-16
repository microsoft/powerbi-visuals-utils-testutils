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

module powerbi.extensibility.utils.test.mocks {
    // powerbi
    import IPromise = powerbi.IPromise;

    // powerbi.visuals
    import ISelectionId = powerbi.visuals.ISelectionId;

    // powerbi.extensibility
    import ISelectionManager = powerbi.extensibility.ISelectionManager;

    export class MockISelectionManager implements ISelectionManager {
        private selectionIds: ISelectionId[] = [];

        public registerOnSelectCallback(callback: (ids: extensibility.ISelectionId[]) => void): void {
        }

        public select(selectionId: ISelectionId | ISelectionId[], multiSelect?: boolean): IPromise<ISelectionId[]> {
            let selectionIds: ISelectionId[] = [].concat(selectionId),
                deferred: JQueryDeferred<any> = $.Deferred();

            selectionIds.forEach((id: ISelectionId) => {
                if (this.containsSelection(id)) {
                    this.selectionIds = multiSelect
                        ? this.selectionIds.filter((selectedId: ISelectionId) => {
                            return selectedId.equals(id);
                        })
                        : this.selectionIds.length > 1
                            ? [id]
                            : [];
                } else {
                    if (multiSelect) {
                        this.selectionIds.push(id);
                    } else {
                        this.selectionIds = [id];
                    }
                }
            });

            deferred.resolve(this.selectionIds);

            return deferred as any;
        }

        public hasSelection(): boolean {
            return this.selectionIds.length > 0;
        }

        public clear(): IPromise<{}> {
            let deferred: JQueryDeferred<any> = $.Deferred();

            this.selectionIds = [];

            deferred.resolve();

            return deferred as any;
        }

        public getSelectionIds(): ISelectionId[] {
            return this.selectionIds;
        }

        public applySelectionFilter(): void {};

        public containsSelection(id: ISelectionId) {
            return this.selectionIds.some((selectionId: ISelectionId) => {
                return selectionId.equals(id);
            });
        }
    }
}
