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
import { renderTimeout } from "./helpers/visualTestHelpers";
import { testDom, flushAllD3Transitions } from "./helpers/helpers";
import { createVisualHost } from "./mocks/mocks";
import * as _ from "lodash";
// powerbitests
// import testDom = testDom;
// import flushAllD3Transitions = flushAllD3Transitions;
// powerbitests.customVisuals
// import renderTimeout = powerbi.extensibility.utils.test.helpers.renderTimeout;
// import createVisualHost = powerbi.extensibility.utils.test.mocks.createVisualHost;
// import createColorPalette = powerbi.extensibility.utils.test.mocks.createColorPalette;
export class VisualBuilderBase {
    constructor(width = 800, height = 600, guid, element = testDom(height, width)) {
        this.element = element;
        if (guid) {
            this.element.addClass(`visual-${guid}`);
        }
        this.visualHost = createVisualHost();
        this.viewport = {
            height: height,
            width: width
        };
        this.init();
    }
    init() {
        this.visual = this.build({
            element: this.element.get(0),
            host: this.visualHost
        });
    }
    destroy() {
        if (this.visual && this.visual.destroy) {
            this.visual.destroy();
        }
    }
    update(dataView) {
        this.visual.update({
            dataViews: _.isArray(dataView) ? dataView : [dataView],
            viewport: this.viewport
        });
    }
    updateRenderTimeout(dataViews, fn, timeout) {
        this.update(dataViews);
        return renderTimeout(fn, timeout);
    }
    updateEnumerateObjectInstancesRenderTimeout(dataViews, options, fn, timeout) {
        this.update(dataViews);
        let enumeration = this.enumerateObjectInstances(options);
        return renderTimeout(() => fn(enumeration), timeout);
    }
    updateFlushAllD3Transitions(dataViews) {
        this.update(dataViews);
        flushAllD3Transitions();
    }
    updateflushAllD3TransitionsRenderTimeout(dataViews, fn, timeout) {
        this.update(dataViews);
        flushAllD3Transitions();
        return renderTimeout(fn, timeout);
    }
    enumerateObjectInstances(options) {
        let enumeration = this.visual.enumerateObjectInstances(options);
        if (!enumeration) {
            return enumeration;
        }
        let enumerationInstances = enumeration.instances;
        return _.isArray(enumerationInstances)
            ? enumerationInstances
            : enumeration;
    }
}
//# sourceMappingURL=VisualBuilderBase.js.map