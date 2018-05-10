export class MockITooltipService {
    constructor(isEnabled = true) {
        this.isEnabled = isEnabled;
    }
    enabled() {
        return this.isEnabled;
    }
    show(options) { }
    move(options) { }
    hide(options) { }
}
//# sourceMappingURL=mockITooltipService.js.map