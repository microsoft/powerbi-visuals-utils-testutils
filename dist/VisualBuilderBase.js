"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var visualTestHelpers_1 = require("./helpers/visualTestHelpers");
var helpers_1 = require("./helpers/helpers");
var mocks_1 = require("./mocks/mocks");
var _ = require("lodash");
// powerbitests
// import testDom = testDom;
// import flushAllD3Transitions = flushAllD3Transitions;
// powerbitests.customVisuals
// import renderTimeout = powerbi.extensibility.utils.test.helpers.renderTimeout;
// import createVisualHost = powerbi.extensibility.utils.test.mocks.createVisualHost;
// import createColorPalette = powerbi.extensibility.utils.test.mocks.createColorPalette;
var VisualBuilderBase = /** @class */ (function () {
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
            dataViews: _.isArray(dataView) ? dataView : [dataView],
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
        return _.isArray(enumerationInstances)
            ? enumerationInstances
            : enumeration;
    };
    return VisualBuilderBase;
}());
exports.VisualBuilderBase = VisualBuilderBase;
//# sourceMappingURL=VisualBuilderBase.js.map