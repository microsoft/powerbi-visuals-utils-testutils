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
    constructor(colorPalette?: IColorPalette, selectionManager?: ISelectionManager, tooltipServiceInstance?: ITooltipService, localeInstance?: MockILocale, allowInteractionsInstance?: MockIAllowInteractions);
    createSelectionIdBuilder(): ISelectionIdBuilder;
    createSelectionManager(): ISelectionManager;
    readonly colorPalette: IColorPalette;
    locale: string;
    persistProperties(changes: VisualObjectInstancesToPersist): void;
    readonly tooltipService: ITooltipService;
    allowInteractions(): boolean;
}
