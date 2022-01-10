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

import { ILocalVisualStorageService } from "./mockIStorageService";
import { createSelectionIdBuilder } from "./mocks";
import { MockILocale } from "./mockILocale";
// powerbi
import VisualObjectInstancesToPersist = powerbi.VisualObjectInstancesToPersist;

// powerbi.visuals
import ISelectionIdBuilder = powerbi.visuals.ISelectionIdBuilder;

// powerbi.extensibility
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import IColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;
import IVisualEventService = powerbi.extensibility.IVisualEventService;
import HostCapabilities = powerbi.extensibility.HostCapabilities;

// powerbi.extensibility.visual
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

export class MockIVisualHost implements IVisualHost {
    private colorPaletteInstance: IColorPalette;
    private selectionManager: ISelectionManager;
    private tooltipServiceInstance: ITooltipService;
    private localeInstance: MockILocale;
    private localizationManager: powerbi.extensibility.ILocalizationManager;
    private telemetryService: powerbi.extensibility.ITelemetryService;
    private authService: powerbi.extensibility.IAuthenticationService;
    private localStorageService: ILocalVisualStorageService;
    private visualEventService: IVisualEventService;
    public hostCapabilities: HostCapabilities;

    constructor(
        colorPalette?: IColorPalette,
        selectionManager?: ISelectionManager,
        tooltipServiceInstance?: ITooltipService,
        localeInstance?: MockILocale,
        localizationManager?: powerbi.extensibility.ILocalizationManager,
        telemetryService?: powerbi.extensibility.ITelemetryService,
        authService?: powerbi.extensibility.IAuthenticationService,
        storageService?: ILocalVisualStorageService,
        eventService?: IVisualEventService,
        hostCapabilities?: HostCapabilities) {

        this.colorPaletteInstance = colorPalette;
        this.selectionManager = selectionManager;
        this.tooltipServiceInstance = tooltipServiceInstance;
        this.localeInstance = localeInstance;
        this.telemetryService = telemetryService;
        this.authService = authService;
        this.localizationManager = localizationManager;
        this.localStorageService = storageService;
        this.visualEventService = eventService;
        this.hostCapabilities = hostCapabilities;
    }

    public createSelectionIdBuilder(): ISelectionIdBuilder {
        return createSelectionIdBuilder();
    }

    public createSelectionManager(): ISelectionManager {
        return this.selectionManager;
    }

    public get colorPalette(): IColorPalette {
        return this.colorPaletteInstance;
    }

    public get locale(): string {
        return this.localeInstance.locale;
    }

    public set locale(language) {
        this.localeInstance.locale = language;
    }

    public applyJsonFilter(filter: powerbi.IFilter, objectName: string, propertyName: string, action: powerbi.FilterAction) {

    }

    public get telemetry() {
        return this.telemetryService;
    }

    public get authenticationService() {
        return this.authenticationService;
    }

    public persistProperties(changes: VisualObjectInstancesToPersist) { }

    public get tooltipService(): ITooltipService {
        return this.tooltipServiceInstance;
    }

    public launchUrl(url: string) {
        window.open(url);
    }

    public get storageService(): ILocalVisualStorageService {
        return this.localStorageService;
    }

    public get eventService(): IVisualEventService {
        return this.visualEventService;
    }

    public get instanceId() {
        return "instanceId";
    }

    public fetchMoreData() {
        return true;
    }

    public refreshHostData() {
    }

    public createLocalizationManager(): powerbi.extensibility.ILocalizationManager {
        return {
            getDisplayName: (key: string) => ""
        };
    }

    public switchFocusModeState: (on: boolean) => void;

    public hostEnv: powerbi.common.CustomVisualHostEnv = 1;

    public displayWarningIcon: (hoverText: string, detailedText: string) => void;

    public openModalDialog: (dialogId: string, options?: powerbi.extensibility.visual.DialogOpenOptions, initialState?: object) => powerbi.IPromise<powerbi.extensibility.visual.ModalDialogResult>;
}
