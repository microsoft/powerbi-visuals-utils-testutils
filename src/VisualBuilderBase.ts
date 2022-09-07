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

// powerbi
import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;
import IViewport = powerbi.IViewport;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

// powerbi.extensibility.visual
import IVisual = powerbi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

export abstract class VisualBuilderBase<T extends IVisual> {
    public element: HTMLElement;
    public viewport: IViewport;
    public visualHost: IVisualHost;

    protected visual: T;

    constructor(
        width: number = 800,
        height: number = 600,
        guid?: string,
        element: HTMLElement = testDom(height, width)) {

        this.element = element;

        if (guid) {
            this.element.classList.add(`visual-${guid}`);
        }

        this.visualHost = createVisualHost();

        this.viewport = {
            height: height,
            width: width
        };

        this.init();
    }

    protected abstract build(options: VisualConstructorOptions): T;

    public init(): void {
        this.visual = this.build({
            element: this.element,
            host: this.visualHost
        });
    }

    public destroy(): void {
        if (this.visual && this.visual.destroy) {
            this.visual.destroy();
        }
    }

    public update(dataView: DataView[] | DataView): void {
        this.visual.update({
            dataViews: Array.isArray(dataView) ? dataView : [dataView],
            viewport: this.viewport
        } as VisualUpdateOptions);
    }

    public updateRenderTimeout(dataViews: DataView[] | DataView, fn: (() => any), timeout?: number): number {
        this.update(dataViews);

        return renderTimeout(fn, timeout);
    }

    public updateEnumerateObjectInstancesRenderTimeout(
        dataViews: DataView[] | DataView,
        options: EnumerateVisualObjectInstancesOptions,
        fn: (enumeration: VisualObjectInstance[]) => void,
        timeout?: number): number {

        this.update(dataViews);

        const enumeration: VisualObjectInstance[] = this.enumerateObjectInstances(options);

        return renderTimeout(() => fn(enumeration), timeout);
    }

    public updateFlushAllD3Transitions(dataViews: DataView[] | DataView): void {
        this.update(dataViews);

        flushAllD3Transitions();
    }

    public updateflushAllD3TransitionsRenderTimeout(
        dataViews: DataView[] | DataView,
        fn: () => any,
        timeout?: number): number {

        this.update(dataViews);

        flushAllD3Transitions();

        return renderTimeout(fn, timeout);
    }

    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
        const enumeration: VisualObjectInstanceEnumeration = this.visual.enumerateObjectInstances(options);

        if (!enumeration) {
            return enumeration as VisualObjectInstance[];
        }

        const enumerationInstances: VisualObjectInstance[] =
            (enumeration as VisualObjectInstanceEnumerationObject).instances;

        return Array.isArray(enumerationInstances)
            ? enumerationInstances
            : enumeration as VisualObjectInstance[];
    }
}