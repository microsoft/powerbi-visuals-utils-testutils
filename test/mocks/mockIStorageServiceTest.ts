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

import { ILocalVisualStorageService } from "../../src/mocks/mockIStorageService";
import { createStorageService } from "../../src/mocks/mocks";

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

describe("MockIStorageService", () => {
    let mockStorageService: ILocalVisualStorageService;
    const objectToBeStoredStringifyed: string = JSON.stringify(objectToBeStored);

    beforeAll(() => {
        mockStorageService = createStorageService();
    });

    it("MockIStorageService.remove method test", () => {
        localStorage.setItem(keyToBeStored, objectToBeStoredStringifyed);
        let localStorageItem: string = localStorage.getItem(keyToBeStored);
        expect(localStorageItem).toBeTruthy();

        mockStorageService.remove(keyToBeStored);
        localStorageItem = localStorage.getItem(keyToBeStored);
        expect(localStorageItem).toBeNull();
    });

    it("MockIStorageService.set method test", (done) => {
        mockStorageService.set(keyToBeStored, objectToBeStoredStringifyed).then((data: number) => {
            const localStorageItem: string = localStorage.getItem(keyToBeStored);
            expect(localStorageItem).toBeTruthy();
            expect(localStorageItem).toEqual(objectToBeStoredStringifyed);
            expect(data).toEqual(objectToBeStoredStringifyed.length);
            done();
        });
    });

    it("MockIStorageService.get method test", (done) => {
        const localStorageItem: string = localStorage.getItem(keyToBeStored);
        mockStorageService.get(keyToBeStored).then((data: string) => {
            expect(data).toEqual(localStorageItem);
            done();
        });
    });
});