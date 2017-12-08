"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var mocks_1 = require("./mocks");
var MockIVisualHost = /** @class */ (function () {
    function MockIVisualHost(colorPalette, selectionManager, tooltipServiceInstance, localeInstance, allowInteractionsInstance) {
        this.colorPaletteInstance = colorPalette;
        this.selectionManager = selectionManager;
        this.tooltipServiceInstance = tooltipServiceInstance;
        this.localeInstance = localeInstance;
        this.allowInteractionsInstance = allowInteractionsInstance;
    }
    MockIVisualHost.prototype.createSelectionIdBuilder = function () {
        return mocks_1.createSelectionIdBuilder();
    };
    MockIVisualHost.prototype.createSelectionManager = function () {
        return this.selectionManager;
    };
    Object.defineProperty(MockIVisualHost.prototype, "colorPalette", {
        get: function () {
            return this.colorPaletteInstance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockIVisualHost.prototype, "locale", {
        get: function () {
            return this.localeInstance.locale;
        },
        set: function (language) {
            this.localeInstance.locale = language;
        },
        enumerable: true,
        configurable: true
    });
    MockIVisualHost.prototype.persistProperties = function (changes) { };
    ;
    Object.defineProperty(MockIVisualHost.prototype, "tooltipService", {
        get: function () {
            return this.tooltipServiceInstance;
        },
        enumerable: true,
        configurable: true
    });
    MockIVisualHost.prototype.allowInteractions = function () {
        return this.allowInteractionsInstance.isEnabled;
    };
    return MockIVisualHost;
}());
exports.MockIVisualHost = MockIVisualHost;
//# sourceMappingURL=mockVisualHost.js.map