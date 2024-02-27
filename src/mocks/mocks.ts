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
// powerbi
import IColorInfo = powerbi.IColorInfo;

// powerbi.visuals
import ISelectionIdBuilder = powerbi.visuals.ISelectionIdBuilder;
import ISelectionId = powerbi.visuals.ISelectionId;

// powerbi.extensibility
import IDownloadService = powerbi.extensibility.IDownloadService;
import IColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import ITooltipService = powerbi.extensibility.ITooltipService;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import IVisualEventService = powerbi.extensibility.IVisualEventService;
import ILocalVisualStorageService = powerbi.extensibility.ILocalVisualStorageService
import IVisualLicenseManager = powerbi.extensibility.IVisualLicenseManager;
import IVisualLocalStorageV2Service = powerbi.extensibility.IVisualLocalStorageV2Service
import IWebAccessService = powerbi.extensibility.IWebAccessService;
import IAcquireAADTokenService = powerbi.extensibility.IAcquireAADTokenService;
import ModalDialogResult = powerbi.extensibility.visual.ModalDialogResult
import HostCapabilities = powerbi.extensibility.HostCapabilities;
import IVisualSubSelectionService = powerbi.extensibility.IVisualSubSelectionService

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
import { MockIStorageService } from "./mockIStorageService";
import { MockIStorageV2Service } from "./mockIStorageV2Service";
import { MockHostCapabilities } from "./mockHostCapabilities";
import { MockDownloadService } from "./mockDownloadService";
import { MockIVisualLicenseManager } from "./mockIVisualLicenseManager";
import { MockIWebAccessService } from "./mockIWebAccessService";
import { MockIAcquireAADTokenService } from "./mockIAcquireAADTokenService";
import { MockSubSelectionService } from "./mockSubSelectionService";

export interface CreateVisualHostOptions {
    locale?: Object,
    allowInteractions?: boolean,
    colors?: IColorInfo[],
    isEnabled?: boolean,
    displayNames?: any,
    token?: string,
    modalDialogResult?: ModalDialogResult
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function createVisualHost({locale, allowInteractions, colors, isEnabled, displayNames, token, modalDialogResult}: CreateVisualHostOptions): IVisualHost {
    return new MockIVisualHost({
        colorPalette: createColorPalette(colors),
        selectionManager: createSelectionManager(),
        subSelectionService: createSubSelectionService(),
        tooltipServiceInstance: createTooltipService(isEnabled),
        localeInstance: createLocale(locale),
        localizationManager: createLocalizationManager(displayNames),
        telemetryService: createTelemetryService(),
        authService: createAuthenticationService(token),
        storageService: createStorageService(),
        storageV2Service: createStorageV2Service(),
        eventService: createEventService(),
        hostCapabilities: createHostCapabilities(allowInteractions),
        downloadService: createDownloadService(),
        licenseManager: licenseManager(),
        webAccessService: webAccessService(),
        acquireAADTokenService: acquireAADTokenService(),
        modalDialogResult
    })
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

// eslint-disable-next-line @typescript-eslint/ban-types
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

export function createStorageV2Service(): IVisualLocalStorageV2Service {
    return new MockIStorageV2Service();
}

export function createEventService(): IVisualEventService {
    return new MockIEventService();
}

export function createHostCapabilities(allowInteractions): HostCapabilities {
    return new MockHostCapabilities(allowInteractions);
}

export function createDownloadService(): IDownloadService {
    return new MockDownloadService();
}

export function licenseManager(): IVisualLicenseManager {
    return new MockIVisualLicenseManager();
}

export function webAccessService(): IWebAccessService {
    return new MockIWebAccessService();
}

export function acquireAADTokenService(): IAcquireAADTokenService {
    return new MockIAcquireAADTokenService();
}

export function createSubSelectionService(): IVisualSubSelectionService {
    return new MockSubSelectionService();
}
