"use strict";
//module powerbi.extensibility.utils.test.mocks {
var MockITooltipService = (function () {
    function MockITooltipService(isEnabled) {
        if (isEnabled === void 0) { isEnabled = true; }
        this.isEnabled = isEnabled;
    }
    MockITooltipService.prototype.enabled = function () {
        return this.isEnabled;
    };
    MockITooltipService.prototype.show = function (options) { };
    MockITooltipService.prototype.move = function (options) { };
    MockITooltipService.prototype.hide = function (options) { };
    return MockITooltipService;
}());
exports.MockITooltipService = MockITooltipService;
//}
//# sourceMappingURL=mockITooltipService.js.map