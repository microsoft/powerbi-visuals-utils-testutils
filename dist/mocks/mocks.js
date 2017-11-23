"use strict";
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
//}
//# sourceMappingURL=mocks.js.map