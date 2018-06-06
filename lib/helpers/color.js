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
export function getSolidColorStructuralObject(color) {
    return { solid: { color: color } };
}
export function assertColorsMatch(actual, expected, invert = false) {
    const rgbActual = parseColorString(actual), rgbExpected = parseColorString(expected);
    if (invert) {
        return expect(rgbActual).not.toEqual(rgbExpected);
    }
    return expect(rgbActual).toEqual(rgbExpected);
}
export function parseColorString(color) {
    if (color.indexOf("#") >= 0) {
        if (color.length === 7) {
            // #RRGGBB
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            if (result == null || result.length < 4) {
                return;
            }
            return {
                R: parseInt(result[1], 16),
                G: parseInt(result[2], 16),
                B: parseInt(result[3], 16),
            };
        }
        else if (color.length === 4) {
            // #RGB
            let result = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(color);
            if (result == null || result.length < 4) {
                return;
            }
            return {
                R: parseInt(result[1] + result[1], 16),
                G: parseInt(result[2] + result[2], 16),
                B: parseInt(result[3] + result[3], 16),
            };
        }
    }
    else if (color.indexOf("rgb(") >= 0) {
        // rgb(R, G, B)
        let result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(color);
        if (result == null || result.length < 4) {
            return;
        }
        return {
            R: parseInt(result[1], 10),
            G: parseInt(result[2], 10),
            B: parseInt(result[3], 10),
        };
    }
    else if (color.indexOf("rgba(") >= 0) {
        // rgba(R, G, B, A)
        let result = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)$/.exec(color);
        if (result == null || result.length < 5) {
            return;
        }
        return {
            R: parseInt(result[1], 10),
            G: parseInt(result[2], 10),
            B: parseInt(result[3], 10),
            A: parseFloat(result[4]),
        };
    }
}
//# sourceMappingURL=color.js.map