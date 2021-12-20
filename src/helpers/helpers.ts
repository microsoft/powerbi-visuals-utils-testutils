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
import { timerFlush } from "d3-timer";
import { uuid } from "uuidv4";

import range from "lodash-es/range";
import includes from "lodash-es/includes";

function each(element: JQuery | HTMLElement, fn: (i: number, el: HTMLElement) => any) {
    if (element instanceof Element) {
        fn(0, element);
    } else {
        element.each(fn);
    }
}


export function testDom(height: number | string, width: number | string): HTMLElement {
    let element: HTMLElement = document.createElement("div"),
        heightWithUnits: string = isFinite( Number(height) ) ? `${Number(height)}px` : String(height),
        widthWithUnits: string = isFinite( Number(width) ) ? `${Number(width)}px` : String(width),
        id = "item" + uuid();

    element.id = id;
    element.style.height = heightWithUnits;
    element.style.width = widthWithUnits;
    element.style.position = "relative";
    element.className = "visual";

    document.body.appendChild(element);
    return document.getElementById(id);
}

export enum ClickEventType {
    Default = 0,
    CtrlKey = 1,
    AltKey = 2,
    ShiftKey = 4,
    MetaKey = 8,
}

export enum MouseEventType {
    click,
    mousedown,
    mouseup,
    mouseover,
    mousemove,
    mouseout,
}

export function d3Click(element: JQuery | HTMLElement | SVGElement, x: number, y: number, eventType?: ClickEventType, button?: number): void {
    mouseEvent.call(element, MouseEventType.click, x, y, eventType, button);
}

export function d3MouseDown(element: JQuery | HTMLElement, x: number, y: number, eventType?: ClickEventType, button?: number): void {
    mouseEvent.call(element, MouseEventType.mousedown, x, y, eventType, button);
}

export function d3MouseUp(element: JQuery | HTMLElement, x: number, y: number, eventType?: ClickEventType, button?: number): void {
    mouseEvent.call(element, MouseEventType.mouseup, x, y, eventType);
}

export function d3MouseOver(element: JQuery | HTMLElement, x: number, y: number, eventType?: ClickEventType, button?: number): void {
    mouseEvent.call(element, MouseEventType.mouseover, x, y, eventType, button);
}

export function d3MouseMove(element: JQuery | HTMLElement, x: number, y: number, eventType?: ClickEventType, button?: number): void {
    mouseEvent.call(element, MouseEventType.mousemove, x, y, eventType, button);
}

export function d3MouseOut(element: JQuery | HTMLElement, x: number, y: number, eventType?: ClickEventType, button?: number): void {
    mouseEvent.call(element, MouseEventType.mouseout, x, y, eventType, button);
}

export function d3KeyEvent(element: JQuery | HTMLElement, typeArg: string, keyArg: string, keyCode: number): void {
    keyEvent.call(element, typeArg, keyArg, keyCode);
}

export function d3TouchStart(element: JQuery | HTMLElement, touchList?: TouchList): void {
    each(this, function (i, e) {
        let evt = createTouchStartEvent(touchList);
        e.dispatchEvent(evt);
    });
}

export function d3TouchMove(element: JQuery | HTMLElement, touchList?: TouchList): void {
    each(this, function (i, e) {
        let evt = createTouchMoveEvent(touchList);
        e.dispatchEvent(evt);
    });
}

export function d3TouchEnd(element: JQuery | HTMLElement, touchList?: TouchList): void {
    each(this, function (i, e) {
        let evt = createTouchEndEvent(touchList);
        e.dispatchEvent(evt);
    });
}

export function d3ContextMenu(element: JQuery | HTMLElement, x: number, y: number): void {
    each(this, function (i, e) {
        let evt = createContextMenuEvent(x, y);
        e.dispatchEvent(evt);
    });
}

// Defining a simulated click event (see http://stackoverflow.com/questions/9063383/how-to-invoke-click-event-programmaticaly-in-d3)
function mouseEvent(
    mouseEventType: MouseEventType,
    x: number,
    y: number,
    eventType?: ClickEventType,
    button?: number): void {

    let clickEventType: ClickEventType = eventType || ClickEventType.Default;

    each(this, function (i, e) {
        let evt: MouseEvent = createMouseEvent(mouseEventType, clickEventType, x, y, button);

        e.dispatchEvent(evt);
    });
}

function keyEvent(typeArg: string, keyArg: string, keyCode: number): void {
    each(this, function (i, e) {
        let evt: KeyboardEvent = new KeyboardEvent(typeArg,
        {
            key: keyArg,
            bubbles: true,
            cancelable: true,
            location: KeyboardEvent.DOM_KEY_LOCATION_STANDARD,
            repeat: false,
            view: window,
        } as KeyboardEventInit);
        e.dispatchEvent(evt);
    });
}

/**
 * Creates mouse event
 * @param eventType {ClickEventType}.
 * @param x clientX.
 * @param y clientY.
 * @param eventName {string} Event name e.g click, mousedown ...
 */
export function createMouseEvent(
    mouseEventType: MouseEventType,
    eventType: ClickEventType,
    x: number,
    y: number,
    button: number = 0): MouseEvent {

    let clickEventType: ClickEventType = eventType || ClickEventType.Default,
        evt: MouseEvent = document.createEvent("MouseEvents");

    evt.initMouseEvent(
        MouseEventType[mouseEventType], // type
        true,   // canBubble
        true,   // cancelable
        window, // view
        0,      // detail
        x,      // screenX
        y,      // screenY
        x,      // clientX
        y,      // clientY
        !!(clickEventType & ClickEventType.CtrlKey),  // ctrlKey
        !!(clickEventType & ClickEventType.AltKey),  // altKey
        !!(clickEventType & ClickEventType.ShiftKey),  // shiftKey
        !!(clickEventType & ClickEventType.MetaKey),  // metaKey
        button,      // button
        null);  // relatedTarget

    return evt;
}

export function createTouchStartEvent(touchList?: TouchList): UIEvent {
    // NOTE: phantomjs does not support TouchEvent
    let evt: UIEvent = document.createEvent("UIEvent");

    evt.initEvent("touchstart", true, true);

    if (touchList) {
        (<any>evt).touches = touchList;
    }

    return evt;
}

export function createTouchMoveEvent(touchList?: TouchList): UIEvent {
    // NOTE: phantomjs does not support TouchEvent
    let evt: UIEvent = document.createEvent("UIEvent");

    evt.initEvent("touchmove", true, true);

    if (touchList) {
        (<any>evt).touches = touchList;
    }

    return evt;
}

export function createTouchEndEvent(touchList?: TouchList): UIEvent {
    // NOTE: phantomjs does not support TouchEvent
    let evt: UIEvent = document.createEvent("UIEvent");

    evt.initEvent("touchend", true, true);

    if (touchList) {
        (<any>evt).touches = touchList;
    }

    return evt;
}

export function createContextMenuEvent(x: number, y: number): MouseEvent {
    let evt: MouseEvent = document.createEvent("MouseEvents");

    evt.initMouseEvent(
        "contextmenu", // type
        true,   // canBubble
        true,   // cancelable
        window, // view
        0,      // detail
        x,      // screenX
        y,      // screenY
        x,      // clientX
        y,      // clientY
        false,  // ctrlKey
        false,  // altKey
        false,  // shiftKey
        false,  // metaKey
        0,      // button
        null);  // relatedTarget

    return evt;
}

export function createTouchesList(touches: Touch[]): TouchList {
    const touchesList: TouchList = <any>touches;

    (<any>touches).item = (index: number): any => {
        return this.arr[index];
    };

    return touchesList;
}

export function createTouch(x: number, y: number, element: JQuery | HTMLElement, id: number = 0): Touch {
    const newElement: HTMLElement = element.hasOwnProperty("get") ? (<any>element).get(0) : element;

    return {
        pageX: x,
        pageY: y,
        screenX: x,
        screenY: y,
        clientX: x,
        clientY: y,
        target: newElement,
        identifier: id,
        altitudeAngle: 1.5708,
        azimuthAngle: 1.5708,
        force: 1,
        radiusX: 1,
        radiusY: 1,
        rotationAngle: 0,
        touchType: "direct"
    };
}

export function clickElement(element: JQuery | HTMLElement, ctrlKey: boolean = false): void {
    const newElement: HTMLElement = element.hasOwnProperty("get") ? (<any>element).get(0) : element;


    let rect = newElement.getBoundingClientRect(),
        coordinatesTop: number = rect.top + document.body.scrollTop,
        coordinatesLeft: number = rect.left + document.body.scrollLeft,
        width: number = newElement.offsetWidth,
        height: number = newElement.offsetHeight,
        eventType: ClickEventType = ctrlKey
            ? ClickEventType.CtrlKey
            : ClickEventType.Default;

    d3Click(element,
        coordinatesLeft + (width / 2),
        coordinatesTop + (height / 2),
        eventType);
}

/**
 * Forces all D3 transitions to complete.
 * Normally, zero-delay transitions are executed after an instantaneous delay (<10ms).
 * This can cause a brief flicker if the browser renders the page twice: once at the end of the first event loop,
 * then again immediately on the first timer callback. By flushing the timer queue at the end of the first event loop,
 * you can run any zero-delay transitions immediately and avoid the flicker.
 *
 * These flickers are noticable on IE, and with a large number of webviews(not recommend you ever do this) on iOS.
 */
export function flushAllD3Transitions() {
    let now = Date.now;
    Date.now = function () { return Infinity; };
    // timer.flush();
    timerFlush();
    Date.now = now;
}

export function getRandomNumbers(count: number, min: number = 0, max: number = 1): number[] {
    return range(count).map(x => getRandomNumber(min, max));
}

export function getRandomNumber(
    min: number,
    max: number,
    exceptionList?: number[],
    changeResult: (value: any) => number = x => x): number {

    const cryptoObj = (<any>window).crypto || (<any>window).msCrypto;
    let randomValue = +("0." + cryptoObj.getRandomValues(new Uint8Array(1)));
    let result = changeResult(randomValue * (max - min) + min);

    if (exceptionList && exceptionList.length && includes(exceptionList, result)) {
        return getRandomNumber(min, max, exceptionList);
    }

    return result;
}