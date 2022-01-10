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
import ITooltipService = powerbi.extensibility.ITooltipService;
import IVisualEventService = powerbi.extensibility.IVisualEventService;

import { MockILocale } from "./mockILocale";
import { MockITooltipService } from "./mockITooltipService";
import { MockISelectionManager } from "./mockISelectionManager";
import { MockISelectionIdBuilder } from "./mockISelectionIdBuilder";
import { MockIAuthenticationService } from "./mockIAuthenticationService";
import { MockITelemetryService } from "./mockITelemetryService";
import { MockILocalizationManager } from "./mockILocalizationManager";
import { MockISelectionId } from "./mockISelectionId";
import { MockIColorPalette } from "./mockIColorPalette";
import { MockIVisualHost } from "./mockVisualHost";
import { MockIEventService } from "./mockIEventService";
import { MockIStorageService, ILocalVisualStorageService } from "./mockIStorageService";
import { MockHostCapabilities } from "./mockHostCapabilities";
// powerbi
import IColorInfo = powerbi.IColorInfo;

// powerbi.visuals
import ISelectionIdBuilder = powerbi.visuals.ISelectionIdBuilder;
import ISelectionId = powerbi.visuals.ISelectionId;

// powerbi.extensibility
import IColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import HostCapabilities = powerbi.extensibility.HostCapabilities;

export function createVisualHost(locale?: Object, allowInteractions?: boolean, colors?: IColorInfo[], isEnabled?: boolean, displayNames?: any, token?: string): IVisualHost {
    return new MockIVisualHost(
        createColorPalette(colors),
        createSelectionManager(),
        createTooltipService(isEnabled),
        createLocale(locale),
        createLocalizationManager(displayNames),
        createTelemetryService(),
        createAuthenticationService(token),
        createStorageService(),
        createEventService(),
        createHostCapabilities());
}

export function createColorPalette(colors?: IColorInfo[]): IColorPalette {
    return new MockIColorPalette(colors);
}

export function createSelectionId(key: string = ""): ISelectionId {
    return new MockISelectionId(key);
}

export function createSelectionIdBuilder(): ISelectionIdBuilder {
    return new MockISelectionIdBuilder();
}

export function createSelectionManager(): ISelectionManager {
    return new MockISelectionManager();
}

export function createTooltipService(isEnabled?: boolean): ITooltipService {
    return new MockITooltipService(isEnabled);
}

export function createLocale(locales?: Object): MockILocale {
    return new MockILocale(locales);
}

export function createLocalizationManager(displayNames?: any): powerbi.extensibility.ILocalizationManager {
    return new MockILocalizationManager(displayNames);
}

export function createTelemetryService(): powerbi.extensibility.ITelemetryService {
    return new MockITelemetryService();
}

export function createAuthenticationService(token?: string): powerbi.extensibility.IAuthenticationService {
    return new MockIAuthenticationService(token);
}

export function createStorageService(): ILocalVisualStorageService {
    return new MockIStorageService();
}

export function createEventService(): IVisualEventService {
    return new MockIEventService();
}

export function createHostCapabilities(): HostCapabilities {
    return new MockHostCapabilities();
}