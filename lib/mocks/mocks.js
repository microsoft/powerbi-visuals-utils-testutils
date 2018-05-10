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