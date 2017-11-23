"use strict";
var visualTestHelpers_1 = require("./helpers/visualTestHelpers");
var helpers_1 = require("./helpers/helpers");
var mocks_1 = require("./mocks/mocks");
var lodash_1 = require("lodash");
// powerbitests
//import testDom = testDom;
// import flushAllD3Transitions = flushAllD3Transitions;
// powerbitests.customVisuals
//import renderTimeout = powerbi.extensibility.utils.test.helpers.renderTimeout;
//import createVisualHost = powerbi.extensibility.utils.test.mocks.createVisualHost;
//import createColorPalette = powerbi.extensibility.utils.test.mocks.createColorPalette;
var VisualBuilderBase = (function () {
    function VisualBuilderBase(width, height, guid, element) {
        if (width === void 0) { width = 800; }
        if (height === void 0) { height = 600; }
        if (element === void 0) { element = helpers_1.testDom(height, width); }
        this.element = element;
        if (guid) {
            this.element.addClass("visual-" + guid);
        }
        this.visualHost = mocks_1.createVisualHost();
        this.viewport = {
            height: height,
            width: width
        };
        this.init();
    }
    VisualBuilderBase.prototype.init = function () {
        this.visual = this.build({
            element: this.element.get(0),
            host: this.visualHost
        });
    };
    VisualBuilderBase.prototype.destroy = function () {
        if (this.visual && this.visual.destroy) {
            this.visual.destroy();
        }
    };
    VisualBuilderBase.prototype.update = function (dataView) {
        this.visual.update({
            dataViews: lodash_1._.isArray(dataView) ? dataView : [dataView],
            viewport: this.viewport
        });
    };
    VisualBuilderBase.prototype.updateRenderTimeout = function (dataViews, fn, timeout) {
        this.update(dataViews);
        return visualTestHelpers_1.renderTimeout(fn, timeout);
    };
    VisualBuilderBase.prototype.updateEnumerateObjectInstancesRenderTimeout = function (dataViews, options, fn, timeout) {
        this.update(dataViews);
        var enumeration = this.enumerateObjectInstances(options);
        return visualTestHelpers_1.renderTimeout(function () { return fn(enumeration); }, timeout);
    };
    VisualBuilderBase.prototype.updateFlushAllD3Transitions = function (dataViews) {
        this.update(dataViews);
        helpers_1.flushAllD3Transitions();
    };
    VisualBuilderBase.prototype.updateflushAllD3TransitionsRenderTimeout = function (dataViews, fn, timeout) {
        this.update(dataViews);
        helpers_1.flushAllD3Transitions();
        return visualTestHelpers_1.renderTimeout(fn, timeout);
    };
    VisualBuilderBase.prototype.enumerateObjectInstances = function (options) {
        var enumeration = this.visual.enumerateObjectInstances(options);
        if (!enumeration) {
            return enumeration;
        }
        var enumerationInstances = enumeration.instances;
        return lodash_1._.isArray(enumerationInstances)
            ? enumerationInstances
            : enumeration;
    };
    return VisualBuilderBase;
}());
exports.VisualBuilderBase = VisualBuilderBase;
//}
//# sourceMappingURL=VisualBuilderBase.js.map