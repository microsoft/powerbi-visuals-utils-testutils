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
var mockILocale_1 = require("./mockILocale");
var mockIAllowInteractions_1 = require("./mockIAllowInteractions");
var mockITooltipService_1 = require("./mockITooltipService");
var mockISelectionManager_1 = require("./mockISelectionManager");
var mockISelectionIdBuilder_1 = require("./mockISelectionIdBuilder");
var mockISelectionId_1 = require("./mockISelectionId");
var mockIColorPalette_1 = require("./mockIColorPalette");
var mockVisualHost_1 = require("./mockVisualHost");
function createVisualHost(locale, allowInteractions) {
    return new mockVisualHost_1.MockIVisualHost(createColorPalette(), createSelectionManager(), createTooltipService(true), createLocale(locale), createAllowInteractions(allowInteractions));
}
exports.createVisualHost = createVisualHost;
function createColorPalette(colors) {
    return new mockIColorPalette_1.MockIColorPalette(colors);
}
exports.createColorPalette = createColorPalette;
function createSelectionId(key) {
    if (key === void 0) { key = ""; }
    return new mockISelectionId_1.MockISelectionId(key);
}
exports.createSelectionId = createSelectionId;
function createSelectionIdBuilder() {
    return new mockISelectionIdBuilder_1.MockISelectionIdBuilder();
}
exports.createSelectionIdBuilder = createSelectionIdBuilder;
function createSelectionManager() {
    return new mockISelectionManager_1.MockISelectionManager();
}
exports.createSelectionManager = createSelectionManager;
function createTooltipService(isEnabled) {
    return new mockITooltipService_1.MockITooltipService(isEnabled);
}
exports.createTooltipService = createTooltipService;
function createLocale(locales) {
    return new mockILocale_1.MockILocale(locales);
}
exports.createLocale = createLocale;
function createAllowInteractions(isEnabled) {
    return new mockIAllowInteractions_1.MockIAllowInteractions(isEnabled);
}
exports.createAllowInteractions = createAllowInteractions;
//# sourceMappingURL=mocks.js.map