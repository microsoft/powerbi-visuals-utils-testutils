import ITooltipService = powerbi.extensibility.ITooltipService;
import TooltipShowOptions = powerbi.extensibility.TooltipShowOptions;
import TooltipMoveOptions = powerbi.extensibility.TooltipMoveOptions;
import TooltipHideOptions = powerbi.extensibility.TooltipHideOptions;
export declare class MockITooltipService implements ITooltipService {
    private isEnabled;
    constructor(isEnabled?: boolean);
    enabled(): boolean;
    show(options: TooltipShowOptions): void;
    move(options: TooltipMoveOptions): void;
    hide(options: TooltipHideOptions): void;
}
