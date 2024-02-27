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
import IVisualLocalStorageV2Service = powerbi.extensibility.IVisualLocalStorageV2Service
import StorageV2ResultInfo = powerbi.extensibility.StorageV2ResultInfo
import { createStorageV2Service } from "../../src/mocks/mocks";

const keyToBeStored: string = "LS_KEY";
const objectToBeStored = {
    keyDigit: 1,
    keyString: "Hello",
    keyArray: [1, "s4", false],
    keyObject: {
        key0: 11,
        key1: "Hello",
        key2: {
            a: 13
        }
    }
};

describe("MockIStorageV2Service", () => {
    let mockStorageService: IVisualLocalStorageV2Service;
    const objectToBeStoredStringifyed: string = JSON.stringify(objectToBeStored);

    beforeAll(() => {
        mockStorageService = createStorageV2Service();
    });

    it("MockIStorageV2Service.remove method test", () => {
        localStorage.setItem(keyToBeStored, objectToBeStoredStringifyed);
        let localStorageItem: string | null = localStorage.getItem(keyToBeStored);
        expect(localStorageItem).toBeTruthy();

        mockStorageService.remove(keyToBeStored);
        localStorageItem = localStorage.getItem(keyToBeStored);
        expect(localStorageItem).toBeNull();
    });

    it("MockIStorageV2Service.set method test", (done) => {
        mockStorageService.set(keyToBeStored, objectToBeStoredStringifyed).then((data: StorageV2ResultInfo) => {
            const localStorageItem: string | null = localStorage.getItem(keyToBeStored);
            expect(localStorageItem).toBeTruthy();
            expect(localStorageItem).toEqual(objectToBeStoredStringifyed);
            expect(data.success).toBeTrue();
            done();
        });
    });

    it("MockIStorageV2Service.get method test", (done) => {
        const localStorageItem: string | null = localStorage.getItem(keyToBeStored);
        mockStorageService.get(keyToBeStored).then((data: string | null) => {
            expect(data).toEqual(localStorageItem);
            done();
        });
    });
});