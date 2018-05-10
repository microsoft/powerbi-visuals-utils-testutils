/// <reference types="powerbi-visuals-tools" />
import powerbi from "powerbi-visuals-tools";
import ITooltipService = powerbi.extensibility.ITooltipService;
import { MockILocale } from "./mockILocale";
import { MockIAllowInteractions } from "./mockIAllowInteractions";
import VisualObjectInstancesToPersist = powerbi.VisualObjectInstancesToPersist;
import ISelectionIdBuilder = powerbi.visuals.ISelectionIdBuilder;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import IColorPalette = powerbi.extensibility.IColorPalette;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
export declare class MockIVisualHost implements IVisualHost {
    private colorPaletteInstance;
    private selectionManager;
    private tooltipServiceInstance;
    private localeInstance;
    private allowInteractionsInstance;
    private localizationManager;
    private telemetryService;
    private authService;
    constructor(colorPalette?: IColorPalette, selectionManager?: ISelectionManager, tooltipServiceInstance?: ITooltipService, localeInstance?: MockILocale, allowInteractionsInstance?: MockIAllowInteractions, localizationManager?: powerbi.extensibility.ILocalizationManager, telemetryService?: powerbi.extensibility.ITelemetryService, authService?: powerbi.extensibility.IAuthenticationService);
    createSelectionIdBuilder(): ISelectionIdBuilder;
    createSelectionManager(): ISelectionManager;
    readonly colorPalette: IColorPalette;
    locale: string;
    applyJsonFilter(filter: powerbi.IFilter, objectName: string, propertyName: string, action: powerbi.FilterAction): void;
    readonly telemetry: powerbi.extensibility.ITelemetryService;
    readonly authenticationService: any;
    persistProperties(changes: VisualObjectInstancesToPersist): void;
    readonly tooltipService: ITooltipService;
    readonly allowInteractions: boolean;
    launchUrl(url: string): void;
    readonly instanceId: string;
    refreshHostData(): void;
    createLocalizationManager(): powerbi.extensibility.ILocalizationManager;
}
