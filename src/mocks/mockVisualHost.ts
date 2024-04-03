/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars*/
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

import { createSelectionIdBuilder } from "./mocks";
import { MockILocale } from "./mockILocale";
// powerbi
import VisualObjectInstancesToPersist = powerbi.VisualObjectInstancesToPersist;
import DrillArgs = powerbi.DrillArgs;

// powerbi.visuals
import ISelectionIdBuilder = powerbi.visuals.ISelectionIdBuilder;
import CustomVisualOpaqueIdentity = powerbi.visuals.CustomVisualOpaqueIdentity;

// powerbi.extensibility
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import IColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;
import IVisualEventService = powerbi.extensibility.IVisualEventService;
import IDownloadService = powerbi.extensibility.IDownloadService;
import HostCapabilities = powerbi.extensibility.HostCapabilities;
import IVisualLicenseManager = powerbi.extensibility.IVisualLicenseManager;
import IWebAccessService = powerbi.extensibility.IWebAccessService;
import ILocalVisualStorageService = powerbi.extensibility.ILocalVisualStorageService;
import IVisualLocalStorageV2Service = powerbi.extensibility.IVisualLocalStorageV2Service;
import IVisualSubSelectionService = powerbi.extensibility.IVisualSubSelectionService;
import ICustomVisualsOpaqueUtils = powerbi.extensibility.ICustomVisualsOpaqueUtils;

// powerbi.extensibility.visual
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import ModalDialogResult = powerbi.extensibility.visual.ModalDialogResult
import DialogOpenOptions = powerbi.extensibility.visual.DialogOpenOptions
import CustomVisualApplyCustomSortArgs = powerbi.extensibility.visual.CustomVisualApplyCustomSortArgs;
import IAcquireAADTokenService = powerbi.extensibility.IAcquireAADTokenService;

export interface IMockVisualHostOptions {
    colorPalette?: IColorPalette,
    selectionManager?: ISelectionManager,
    tooltipServiceInstance?: ITooltipService,
    localeInstance?: MockILocale,
    localizationManager?: powerbi.extensibility.ILocalizationManager,
    telemetryService?: powerbi.extensibility.ITelemetryService,
    authService?: powerbi.extensibility.IAuthenticationService,
    storageService?: ILocalVisualStorageService,
    eventService?: IVisualEventService,
    hostCapabilities?: HostCapabilities,
    downloadService?: IDownloadService,
    licenseManager?: IVisualLicenseManager,
    webAccessService?: IWebAccessService,
    acquireAADTokenService?: IAcquireAADTokenService,
    modalDialogResult?: powerbi.extensibility.visual.ModalDialogResult,
    storageV2Service?: IVisualLocalStorageV2Service,
    subSelectionService?: IVisualSubSelectionService
}

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
    public downloadService: IDownloadService;
    public licenseManager: IVisualLicenseManager;
    public webAccessService: IWebAccessService;
    public acquireAADTokenService: IAcquireAADTokenService;
    public modalDialogResult: ModalDialogResult;
    public storageV2Service: IVisualLocalStorageV2Service;
    public subSelectionService: IVisualSubSelectionService;
    public hostEnv: powerbi.common.CustomVisualHostEnv = 1;

    constructor({
        colorPalette,
        selectionManager,
        subSelectionService,
        tooltipServiceInstance,
        localeInstance,
        localizationManager,
        telemetryService,
        authService,
        storageService,
        storageV2Service,
        eventService,
        hostCapabilities,
        downloadService,
        licenseManager,
        webAccessService,
        acquireAADTokenService,
        modalDialogResult,
    }: IMockVisualHostOptions) {

        this.colorPaletteInstance = colorPalette;
        this.selectionManager = selectionManager;
        this.subSelectionService = subSelectionService;
        this.tooltipServiceInstance = tooltipServiceInstance;
        this.localeInstance = localeInstance;
        this.telemetryService = telemetryService;
        this.authService = authService;
        this.localizationManager = localizationManager;
        this.localStorageService = storageService;
        this.visualEventService = eventService;
        this.storageV2Service = storageV2Service;
        this.hostCapabilities = hostCapabilities;
        this.downloadService = downloadService;
        this.licenseManager = licenseManager;
        this.webAccessService = webAccessService;
        this.acquireAADTokenService = acquireAADTokenService;
        this.modalDialogResult = modalDialogResult;
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

    public applyJsonFilter(filter: powerbi.IFilter, objectName: string, propertyName: string, action: powerbi.FilterAction) {}

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

    public refreshHostData() {}

    public createLocalizationManager(): powerbi.extensibility.ILocalizationManager {
        return {
            getDisplayName: (key: string) => ""
        };
    }
    
    public drill(args: DrillArgs): void {}

    public setCanDrill(drillAllowed: boolean): void {}

    public applyCustomSort(args: CustomVisualApplyCustomSortArgs): void {}

    public switchFocusModeState(on: boolean): void {}

    public displayWarningIcon(hoverText: string, detailedText: string): void {}

    public openModalDialog(dialogId: string, options?: DialogOpenOptions, initialState?: object): powerbi.IPromise<ModalDialogResult> {
        return new Promise<ModalDialogResult>((resolve, rejects) => {
            resolve(this.modalDialogResult)
        }) as any;
    }

    public createOpaqueUtils(): ICustomVisualsOpaqueUtils {
        return {
            compareCustomVisualOpaqueIdentities: (identity1: CustomVisualOpaqueIdentity, identity2: CustomVisualOpaqueIdentity) => true
        };
    }
}
