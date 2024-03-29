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

import { testDom, getRandomNumber, getRandomNumbers, getUuid } from "../../src/helpers/helpers";

describe("testDom", () => {
    it("should return an element", () => {
        let element: HTMLElement = testDom(500, 500);

        expect(element).toBeDefined();
    });
});

describe("uuid", () => {
    it("should be unique across multiple tests", () => {
        const uuids: Uint16Array[] = [];
        const testsAmount = 1000;

        for (let i = 0; i < testsAmount; i++) {
            uuids.push(getUuid());
        }

        const uniqueUUids = [...new Set(uuids)];
        expect(uuids).toEqual(uniqueUUids);
    });
});

describe("getRandomNumber", () => {
    it("should return a number between min and max", () => {
        const min: number = 150,
            max: number = 300;

        let result: number = getRandomNumber(min, max);

        expect(result).toBeGreaterThan(min);
        expect(result).toBeLessThan(max);
    });
});

describe("getRandomNumbers", () => {
    it("should return an array with given length", () => {
        const min: number = 150,
            max: number = 300,
            length: number = 15;

        let result: number[] = getRandomNumbers(length, min, max);

        expect(result.length).toBe(length);
    });

    it("should return an array of number that are between min and max", () => {
        const min: number = 150,
            max: number = 300,
            length: number = 15;

        let result: number[] = getRandomNumbers(length, min, max);

        result.forEach((value: number) => {
            expect(value).toBeGreaterThanOrEqual(min);
            expect(value).toBeLessThanOrEqual(max);
        });
    });
});
