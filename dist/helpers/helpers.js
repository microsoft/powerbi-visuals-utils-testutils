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
var d3_timer_1 = require("d3-timer");
var jquery_1 = require("jquery");
var jasmine_jquery_1 = require("jasmine-jquery");
var lodash_1 = require("lodash");
//module powerbi.extensibility.utils.test.helpers {
function testDom(height, width) {
    var element = jquery_1.$("<div></div>")
        .attr("id", "item")
        .css("width", width)
        .css("height", height)
        .css("position", "relative")
        .addClass("visual");
    jasmine_jquery_1.setFixtures(element[0].outerHTML);
    return jquery_1.$("#item");
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
if (typeof jquery_1.jQuery !== "undefined" && jquery_1.jQuery) {
    jquery_1.jQuery.fn.d3Click = function (x, y, eventType, button) {
        mouseEvent.call(this, MouseEventType.click, x, y, eventType, button);
    };
    jquery_1.jQuery.fn.d3MouseDown = function (x, y, eventType, button) {
        mouseEvent.call(this, MouseEventType.mousedown, x, y, eventType, button);
    };
    jquery_1.jQuery.fn.d3MouseUp = function (x, y, eventType, button) {
        mouseEvent.call(this, MouseEventType.mouseup, x, y, eventType);
    };
    jquery_1.jQuery.fn.d3MouseOver = function (x, y, eventType, button) {
        mouseEvent.call(this, MouseEventType.mouseover, x, y, eventType, button);
    };
    jquery_1.jQuery.fn.d3MouseMove = function (x, y, eventType, button) {
        mouseEvent.call(this, MouseEventType.mousemove, x, y, eventType, button);
    };
    jquery_1.jQuery.fn.d3MouseOut = function (x, y, eventType, button) {
        mouseEvent.call(this, MouseEventType.mouseout, x, y, eventType, button);
    };
    jquery_1.jQuery.fn.d3KeyEvent = function (typeArg, keyArg, keyCode) {
        keyEvent.call(this, typeArg, keyArg, keyCode);
    };
    jquery_1.jQuery.fn.d3TouchStart = function (touchList) {
        this.each(function (i, e) {
            var evt = createTouchStartEvent(touchList);
            e.dispatchEvent(evt);
        });
    };
    jquery_1.jQuery.fn.d3TouchMove = function (touchList) {
        this.each(function (i, e) {
            var evt = createTouchMoveEvent(touchList);
            e.dispatchEvent(evt);
        });
    };
    jquery_1.jQuery.fn.d3TouchEnd = function (touchList) {
        this.each(function (i, e) {
            var evt = createTouchEndEvent(touchList);
            e.dispatchEvent(evt);
        });
    };
    jquery_1.jQuery.fn.d3ContextMenu = function (x, y) {
        this.each(function (i, e) {
            var evt = createContextMenuEvent(x, y);
            e.dispatchEvent(evt);
        });
    };
}
// Defining a simulated click event (see http://stackoverflow.com/questions/9063383/how-to-invoke-click-event-programmaticaly-in-d3)
function mouseEvent(mouseEventType, x, y, eventType, button) {
    var clickEventType = eventType || ClickEventType.Default;
    this.each(function (i, e) {
        var evt = createMouseEvent(mouseEventType, clickEventType, x, y, button);
        e.dispatchEvent(evt);
    });
}
function keyEvent(typeArg, keyArg, keyCode) {
    this.each(function (i, e) {
        var evt = document.createEvent("KeyboardEvent");
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
function createMouseEvent(mouseEventType, eventType, x, y, button) {
    if (button === void 0) { button = 0; }
    var clickEventType = eventType || ClickEventType.Default, evt = document.createEvent("MouseEvents");
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
    var evt = document.createEvent("UIEvent");
    evt.initUIEvent("touchstart", true, true, window, 1);
    if (touchList) {
        evt.touches = touchList;
    }
    return evt;
}
exports.createTouchStartEvent = createTouchStartEvent;
function createTouchMoveEvent(touchList) {
    // NOTE: phantomjs does not support TouchEvent
    var evt = document.createEvent("UIEvent");
    evt.initUIEvent("touchmove", true, true, window, 1);
    if (touchList) {
        evt.touches = touchList;
    }
    return evt;
}
exports.createTouchMoveEvent = createTouchMoveEvent;
function createTouchEndEvent(touchList) {
    // NOTE: phantomjs does not support TouchEvent
    var evt = document.createEvent("UIEvent");
    evt.initUIEvent("touchend", true, true, window, 1);
    if (touchList) {
        evt.touches = touchList;
    }
    return evt;
}
exports.createTouchEndEvent = createTouchEndEvent;
function createContextMenuEvent(x, y) {
    var evt = document.createEvent("MouseEvents");
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
    var _this = this;
    var touchesList = touches;
    touches.item = function (index) {
        return _this.arr[index];
    };
    return touchesList;
}
exports.createTouchesList = createTouchesList;
function createTouch(x, y, element, id) {
    if (id === void 0) { id = 0; }
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
function clickElement(element, ctrlKey) {
    if (ctrlKey === void 0) { ctrlKey = false; }
    var coordinates = element.offset(), width = element.outerWidth(), height = element.outerHeight(), eventType = ctrlKey
        ? ClickEventType.CtrlKey
        : ClickEventType.Default;
    element.d3Click(coordinates.left + (width / 2), coordinates.top + (height / 2), eventType);
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
    var now = Date.now;
    Date.now = function () { return Infinity; };
    d3_timer_1.timer.flush();
    Date.now = now;
}
exports.flushAllD3Transitions = flushAllD3Transitions;
function getRandomNumbers(count, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    return lodash_1._.range(count).map(function (x) { return getRandomNumber(min, max); });
}
exports.getRandomNumbers = getRandomNumbers;
function getRandomNumber(min, max, exceptionList, changeResult) {
    if (changeResult === void 0) { changeResult = function (x) { return x; }; }
    var cryptoObj = window.crypto || window.msCrypto;
    var randomValue = +("0." + cryptoObj.getRandomValues(new Uint8Array(1)));
    var result = changeResult(randomValue * (max - min) + min);
    if (exceptionList && exceptionList.length && lodash_1._.includes(exceptionList, result)) {
        return getRandomNumber(min, max, exceptionList);
    }
    return result;
}
exports.getRandomNumber = getRandomNumber;
//# sourceMappingURL=helpers.js.map