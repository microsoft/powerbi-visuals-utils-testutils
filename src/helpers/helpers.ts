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
import * as $ from "jquery";

import range from "lodash-es/range";
import includes from "lodash-es/includes";

export function testDom(height: number | string, width: number | string): JQuery {
    let element: JQuery = $("<div></div>")
        .attr("id", "item")
        .css("width", width)
        .css("height", height)
        .css("position", "relative")
        .addClass("visual");

    setFixtures(element[0].outerHTML);

    return $("#item");
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

export function d3Click(element: JQuery, x: number, y: number, eventType?: ClickEventType, button?: number): void {
    mouseEvent.call(element, MouseEventType.click, x, y, eventType, button);
}

export function d3MouseDown(element: JQuery, x: number, y: number, eventType?: ClickEventType, button?: number): void {
    mouseEvent.call(element, MouseEventType.mousedown, x, y, eventType, button);
}

export function d3MouseUp(element: JQuery, x: number, y: number, eventType?: ClickEventType, button?: number): void {
    mouseEvent.call(element, MouseEventType.mouseup, x, y, eventType);
}

export function d3MouseOver(element: JQuery, x: number, y: number, eventType?: ClickEventType, button?: number): void {
    mouseEvent.call(element, MouseEventType.mouseover, x, y, eventType, button);
}

export function d3MouseMove(element: JQuery, x: number, y: number, eventType?: ClickEventType, button?: number): void {
    mouseEvent.call(element, MouseEventType.mousemove, x, y, eventType, button);
}

export function d3MouseOut(element: JQuery, x: number, y: number, eventType?: ClickEventType, button?: number): void {
    mouseEvent.call(element, MouseEventType.mouseout, x, y, eventType, button);
}

export function d3KeyEvent(element: JQuery, typeArg: string, keyArg: string, keyCode: number): void {
    keyEvent.call(element, typeArg, keyArg, keyCode);
}

export function d3TouchStart(element: JQuery, touchList?: TouchList): void {
    this.each(function (i, e) {
        let evt = createTouchStartEvent(touchList);
        e.dispatchEvent(evt);
    });
}

export function d3TouchMove(element: JQuery, touchList?: TouchList): void {
    this.each(function (i, e) {
        let evt = createTouchMoveEvent(touchList);
        e.dispatchEvent(evt);
    });
}

export function d3TouchEnd(element: JQuery, touchList?: TouchList): void {
    this.each(function (i, e) {
        let evt = createTouchEndEvent(touchList);
        e.dispatchEvent(evt);
    });
}

export function d3ContextMenu(element: JQuery, x: number, y: number): void {
    this.each(function (i, e) {
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

    this.each(function (i, e) {
        let evt: MouseEvent = createMouseEvent(mouseEventType, clickEventType, x, y, button);

        e.dispatchEvent(evt);
    });
}

function keyEvent(typeArg: string, keyArg: string, keyCode: number): void {
    this.each(function (i, e) {
        let evt: KeyboardEvent = document.createEvent("KeyboardEvent");

        evt.initKeyboardEvent(
            typeArg,
            true,
            true,
            window,
            keyArg,
            KeyboardEvent.DOM_KEY_LOCATION_STANDARD,
            null,
            false,
            null);
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

    evt.initUIEvent("touchstart", true, true, window, 1);

    if (touchList) {
        (<any>evt).touches = touchList;
    }

    return evt;
}

export function createTouchMoveEvent(touchList?: TouchList): UIEvent {
    // NOTE: phantomjs does not support TouchEvent
    let evt: UIEvent = document.createEvent("UIEvent");

    evt.initUIEvent("touchmove", true, true, window, 1);

    if (touchList) {
        (<any>evt).touches = touchList;
    }

    return evt;
}

export function createTouchEndEvent(touchList?: TouchList): UIEvent {
    // NOTE: phantomjs does not support TouchEvent
    let evt: UIEvent = document.createEvent("UIEvent");

    evt.initUIEvent("touchend", true, true, window, 1);

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

export function createTouch(x: number, y: number, element: JQuery, id: number = 0): Touch {
    return {
        pageX: x,
        pageY: y,
        screenX: x,
        screenY: y,
        clientX: x,
        clientY: y,
        target: element.get(0),
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

export function clickElement(element: JQuery, ctrlKey: boolean = false): void {
    let coordinates: JQueryCoordinates = element.offset(),
        width: number = element.outerWidth(),
        height: number = element.outerHeight(),
        eventType: ClickEventType = ctrlKey
            ? ClickEventType.CtrlKey
            : ClickEventType.Default;
    /*
    element.d3Click(
        coordinates.left + (width / 2),
        coordinates.top + (height / 2),
        eventType);
        */

    d3Click(element,
        coordinates.left + (width / 2),
        coordinates.top + (height / 2),
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


export declare interface JQuery3dClicks extends JQuery {
    d3Click(
        x: number,
        y: number,
        eventType?: ClickEventType,
        button?: number): void;
    d3TouchStart(touchList?: TouchList): void;
    d3TouchMove(touchList?: TouchList): void;
    d3TouchEnd(touchList?: TouchList): void;
    d3ContextMenu(x: number, y: number): void;
    d3MouseDown(
        x: number,
        y: number,
        eventType?: ClickEventType,
        button?: number): void;
    d3MouseUp(
        x: number,
        y: number,
        eventType?: ClickEventType,
        button?: number): void;
    d3MouseOver(
        x: number,
        y: number,
        eventType?: ClickEventType,
        button?: number): void;
    d3MouseMove(
        x: number,
        y: number,
        eventType?: ClickEventType,
        button?: number): void;
    d3MouseOut(
        x: number,
        y: number,
        eventType?: ClickEventType,
        button?: number): void;
    d3KeyEvent(typeArg: string, keyArg: string, keyCode: number): void;
}
