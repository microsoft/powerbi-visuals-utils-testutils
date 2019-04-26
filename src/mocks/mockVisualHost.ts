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

module powerbi.extensibility.utils.test.mocks {
    // powerbi
    import VisualObjectInstancesToPersist = powerbi.VisualObjectInstancesToPersist;

    // powerbi.visuals
    import ISelectionIdBuilder = powerbi.visuals.ISelectionIdBuilder;

    // powerbi.extensibility
    import ISelectionManager = powerbi.extensibility.ISelectionManager;
    import IColorPalette = powerbi.extensibility.IColorPalette;
    import ILocalizationManager = powerbi.extensibility.ILocalizationManager;
    import ITelemetryService = powerbi.extensibility.ITelemetryService;
    import IAuthenticationService = powerbi.extensibility.IAuthenticationService;

    // powerbi.extensibility.visual
    import IVisualHost = powerbi.extensibility.visual.IVisualHost;

    export class MockIVisualHost implements IVisualHost {
        private colorPaletteInstance: IColorPalette;
        private selectionManager: ISelectionManager;
        private tooltipServiceInstance: ITooltipService;
        private localeInstance: MockILocale;
        private allowInteractionsInstance: MockIAllowInteractions;
        private localizationManager: ILocalizationManager;
        private telemetryService: ITelemetryService;
        private authService: IAuthenticationService;
        private localStorageService: ILocalVisualStorageService;

        constructor(
            colorPalette?: IColorPalette,
            selectionManager?: ISelectionManager,
            tooltipServiceInstance?: ITooltipService,
            localeInstance?: MockILocale,
            allowInteractionsInstance?: MockIAllowInteractions,
            localizationManager?: ILocalizationManager,
            telemetryService?: ITelemetryService,
            authService?: IAuthenticationService,
            storageService?: ILocalVisualStorageService) {

            this.colorPaletteInstance = colorPalette;
            this.selectionManager = selectionManager;
            this.tooltipServiceInstance = tooltipServiceInstance;
            this.localeInstance = localeInstance;
            this.allowInteractionsInstance = allowInteractionsInstance;
            this.telemetryService = telemetryService;
            this.authService = authService;
            this.localizationManager = localizationManager;
            this.localStorageService = storageService;
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

        public persistProperties(changes: VisualObjectInstancesToPersist) { }

        public get tooltipService(): ITooltipService {
            return this.tooltipServiceInstance;
        }

        public get allowInteractions(): boolean {
            return this.allowInteractionsInstance.isEnabled;
        }

        public applyJsonFilter(filter: IFilter, objectName: string, propertyName: string, action: FilterAction) { }

        public launchUrl(url: string) { }

        public refreshHostData() { }

        public createLocalizationManager(): ILocalizationManager {
            return this.localizationManager;
        }

        public get telemetry(): ITelemetryService {
            return this.telemetryService;
        }

        public get authenticationService(): IAuthenticationService {
            return this.authService;
        }

        public get storageService(): ILocalVisualStorageService {
            return this.localStorageService;
        }

        public get instanceId(): string {
            return this.instanceId;
        }
    }
}
