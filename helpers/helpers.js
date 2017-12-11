(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "d3-timer", "lodash"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    const d3_timer_1 = require("d3-timer");
    const _ = require("lodash");
    function testDom(height, width) {
        let element = $("<div></div>")
            .attr("id", "item")
            .css("width", width)
            .css("height", height)
            .css("position", "relative")
            .addClass("visual");
        setFixtures(element[0].outerHTML);
        return $("#item");
    }
    exports.testDom = testDom;
    var ClickEventType;
    (function (ClickEventType) {
        ClickEventType[ClickEventType["Default"] = 0] = "Default";
        ClickEventType[ClickEventType["CtrlKey"] = 1] = "CtrlKey";
        ClickEventType[ClickEventType["AltKey"] = 2] = "AltKey";
        ClickEventType[ClickEventType["ShiftKey"] = 4] = "ShiftKey";
        ClickEventType[ClickEventType["MetaKey"] = 8] = "MetaKey";
    })(ClickEventType = exports.ClickEventType || (exports.ClickEventType = {}));
    var MouseEventType;
    (function (MouseEventType) {
        MouseEventType[MouseEventType["click"] = 0] = "click";
        MouseEventType[MouseEventType["mousedown"] = 1] = "mousedown";
        MouseEventType[MouseEventType["mouseup"] = 2] = "mouseup";
        MouseEventType[MouseEventType["mouseover"] = 3] = "mouseover";
        MouseEventType[MouseEventType["mousemove"] = 4] = "mousemove";
        MouseEventType[MouseEventType["mouseout"] = 5] = "mouseout";
    })(MouseEventType = exports.MouseEventType || (exports.MouseEventType = {}));
    function d3Click(element, x, y, eventType, button) {
        mouseEvent.call(element, MouseEventType.click, x, y, eventType, button);
    }
    exports.d3Click = d3Click;
    function d3MouseDown(element, x, y, eventType, button) {
        mouseEvent.call(element, MouseEventType.mousedown, x, y, eventType, button);
    }
    exports.d3MouseDown = d3MouseDown;
    function d3MouseUp(element, x, y, eventType, button) {
        mouseEvent.call(element, MouseEventType.mouseup, x, y, eventType);
    }
    exports.d3MouseUp = d3MouseUp;
    function d3MouseOver(element, x, y, eventType, button) {
        mouseEvent.call(element, MouseEventType.mouseover, x, y, eventType, button);
    }
    exports.d3MouseOver = d3MouseOver;
    function d3MouseMove(element, x, y, eventType, button) {
        mouseEvent.call(element, MouseEventType.mousemove, x, y, eventType, button);
    }
    exports.d3MouseMove = d3MouseMove;
    function d3MouseOut(element, x, y, eventType, button) {
        mouseEvent.call(element, MouseEventType.mouseout, x, y, eventType, button);
    }
    exports.d3MouseOut = d3MouseOut;
    function d3KeyEvent(element, typeArg, keyArg, keyCode) {
        keyEvent.call(element, typeArg, keyArg, keyCode);
    }
    exports.d3KeyEvent = d3KeyEvent;
    function d3TouchStart(element, touchList) {
        this.each(function (i, e) {
            let evt = createTouchStartEvent(touchList);
            e.dispatchEvent(evt);
        });
    }
    exports.d3TouchStart = d3TouchStart;
    function d3TouchMove(element, touchList) {
        this.each(function (i, e) {
            let evt = createTouchMoveEvent(touchList);
            e.dispatchEvent(evt);
        });
    }
    exports.d3TouchMove = d3TouchMove;
    function d3TouchEnd(element, touchList) {
        this.each(function (i, e) {
            let evt = createTouchEndEvent(touchList);
            e.dispatchEvent(evt);
        });
    }
    exports.d3TouchEnd = d3TouchEnd;
    function d3ContextMenu(element, x, y) {
        this.each(function (i, e) {
            let evt = createContextMenuEvent(x, y);
            e.dispatchEvent(evt);
        });
    }
    exports.d3ContextMenu = d3ContextMenu;
    // Defining a simulated click event (see http://stackoverflow.com/questions/9063383/how-to-invoke-click-event-programmaticaly-in-d3)
    function mouseEvent(mouseEventType, x, y, eventType, button) {
        let clickEventType = eventType || ClickEventType.Default;
        this.each(function (i, e) {
            let evt = createMouseEvent(mouseEventType, clickEventType, x, y, button);
            e.dispatchEvent(evt);
        });
    }
    function keyEvent(typeArg, keyArg, keyCode) {
        this.each(function (i, e) {
            let evt = document.createEvent("KeyboardEvent");
            evt.initKeyboardEvent(typeArg, true, true, window, keyArg, KeyboardEvent.DOM_KEY_LOCATION_STANDARD, null, false, null);
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
    function createMouseEvent(mouseEventType, eventType, x, y, button = 0) {
        let clickEventType = eventType || ClickEventType.Default, evt = document.createEvent("MouseEvents");
        evt.initMouseEvent(MouseEventType[mouseEventType], // type
        true, // canBubble
        true, // cancelable
        window, // view
        0, // detail
        x, // screenX
        y, // screenY
        x, // clientX
        y, // clientY
        !!(clickEventType & ClickEventType.CtrlKey), // ctrlKey
        !!(clickEventType & ClickEventType.AltKey), // altKey
        !!(clickEventType & ClickEventType.ShiftKey), // shiftKey
        !!(clickEventType & ClickEventType.MetaKey), // metaKey
        button, // button
        null); // relatedTarget
        return evt;
    }
    exports.createMouseEvent = createMouseEvent;
    function createTouchStartEvent(touchList) {
        // NOTE: phantomjs does not support TouchEvent
        let evt = document.createEvent("UIEvent");
        evt.initUIEvent("touchstart", true, true, window, 1);
        if (touchList) {
            evt.touches = touchList;
        }
        return evt;
    }
    exports.createTouchStartEvent = createTouchStartEvent;
    function createTouchMoveEvent(touchList) {
        // NOTE: phantomjs does not support TouchEvent
        let evt = document.createEvent("UIEvent");
        evt.initUIEvent("touchmove", true, true, window, 1);
        if (touchList) {
            evt.touches = touchList;
        }
        return evt;
    }
    exports.createTouchMoveEvent = createTouchMoveEvent;
    function createTouchEndEvent(touchList) {
        // NOTE: phantomjs does not support TouchEvent
        let evt = document.createEvent("UIEvent");
        evt.initUIEvent("touchend", true, true, window, 1);
        if (touchList) {
            evt.touches = touchList;
        }
        return evt;
    }
    exports.createTouchEndEvent = createTouchEndEvent;
    function createContextMenuEvent(x, y) {
        let evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("contextmenu", // type
        true, // canBubble
        true, // cancelable
        window, // view
        0, // detail
        x, // screenX
        y, // screenY
        x, // clientX
        y, // clientY
        false, // ctrlKey
        false, // altKey
        false, // shiftKey
        false, // metaKey
        0, // button
        null); // relatedTarget
        return evt;
    }
    exports.createContextMenuEvent = createContextMenuEvent;
    function createTouchesList(touches) {
        const touchesList = touches;
        touches.item = (index) => {
            return this.arr[index];
        };
        return touchesList;
    }
    exports.createTouchesList = createTouchesList;
    function createTouch(x, y, element, id = 0) {
        return {
            pageX: x,
            pageY: y,
            screenX: x,
            screenY: y,
            clientX: x,
            clientY: y,
            target: element.get(0),
            identifier: id
        };
    }
    exports.createTouch = createTouch;
    function clickElement(element, ctrlKey = false) {
        let coordinates = element.offset(), width = element.outerWidth(), height = element.outerHeight(), eventType = ctrlKey
            ? ClickEventType.CtrlKey
            : ClickEventType.Default;
        /*
        element.d3Click(
            coordinates.left + (width / 2),
            coordinates.top + (height / 2),
            eventType);
            */
        d3Click(element, coordinates.left + (width / 2), coordinates.top + (height / 2), eventType);
    }
    exports.clickElement = clickElement;
    /**
     * Forces all D3 transitions to complete.
     * Normally, zero-delay transitions are executed after an instantaneous delay (<10ms).
     * This can cause a brief flicker if the browser renders the page twice: once at the end of the first event loop,
     * then again immediately on the first timer callback. By flushing the timer queue at the end of the first event loop,
     * you can run any zero-delay transitions immediately and avoid the flicker.
     *
     * These flickers are noticable on IE, and with a large number of webviews(not recommend you ever do this) on iOS.
     */
    function flushAllD3Transitions() {
        let now = Date.now;
        Date.now = function () { return Infinity; };
        // timer.flush();
        d3_timer_1.timerFlush();
        Date.now = now;
    }
    exports.flushAllD3Transitions = flushAllD3Transitions;
    function getRandomNumbers(count, min = 0, max = 1) {
        return _.range(count).map(x => getRandomNumber(min, max));
    }
    exports.getRandomNumbers = getRandomNumbers;
    function getRandomNumber(min, max, exceptionList, changeResult = x => x) {
        const cryptoObj = window.crypto || window.msCrypto;
        let randomValue = +("0." + cryptoObj.getRandomValues(new Uint8Array(1)));
        let result = changeResult(randomValue * (max - min) + min);
        if (exceptionList && exceptionList.length && _.includes(exceptionList, result)) {
            return getRandomNumber(min, max, exceptionList);
        }
        return result;
    }
    exports.getRandomNumber = getRandomNumber;
});
//# sourceMappingURL=helpers.js.map