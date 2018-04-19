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
import { MockILocale } from "./mockILocale";
import { MockIAllowInteractions } from "./mockIAllowInteractions";
import { MockITooltipService } from "./mockITooltipService";
import { MockISelectionManager } from "./mockISelectionManager";
import { MockISelectionIdBuilder } from "./mockISelectionIdBuilder";
import { MockIAuthenticationService } from "./mockIAuthenticationService";
import { MockITelemetryService } from "./mockITelemetryService";
import { MockILocalizationManager } from "./mockILocalizationManager";
import { MockISelectionId } from "./mockISelectionId";
import { MockIColorPalette } from "./mockIColorPalette";
import { MockIVisualHost } from "./mockVisualHost";
export function createVisualHost(locale, allowInteractions, colors, isEnabled, displayNames, token) {
    return new MockIVisualHost(createColorPalette(colors), createSelectionManager(), createTooltipService(isEnabled), createLocale(locale), createAllowInteractions(allowInteractions), createLocalizationManager(displayNames), createTelemetryService(), createAuthenticationService(token));
}
export function createColorPalette(colors) {
    return new MockIColorPalette(colors);
}
export function createSelectionId(key = "") {
    return new MockISelectionId(key);
}
export function createSelectionIdBuilder() {
    return new MockISelectionIdBuilder();
}
export function createSelectionManager() {
    return new MockISelectionManager();
}
export function createTooltipService(isEnabled) {
    return new MockITooltipService(isEnabled);
}
export function createLocale(locales) {
    return new MockILocale(locales);
}
export function createAllowInteractions(isEnabled) {
    return new MockIAllowInteractions(isEnabled);
}
export function createLocalizationManager(displayNames) {
    return new MockILocalizationManager(displayNames);
}
export function createTelemetryService() {
    return new MockITelemetryService();
}
export function createAuthenticationService(token) {
    return new MockIAuthenticationService(token);
}
//# sourceMappingURL=mocks.js.map