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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var test;
            (function (test) {
                test.DefaultWaitForRender = 10;
            })(test = utils.test || (utils.test = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var test;
            (function (test) {
                var mocks;
                (function (mocks) {
                    var MockIVisualHost = (function () {
                        function MockIVisualHost(colorPalette, selectionManager) {
                            this.colorPaletteInstance = colorPalette;
                            this.selectionManager = selectionManager;
                        }
                        MockIVisualHost.prototype.createSelectionIdBuilder = function () {
                            return mocks.createSelectionIdBuilder();
                        };
                        MockIVisualHost.prototype.createSelectionManager = function () {
                            return this.selectionManager;
                        };
                        Object.defineProperty(MockIVisualHost.prototype, "colorPalette", {
                            get: function () {
                                return this.colorPaletteInstance;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        MockIVisualHost.prototype.persistProperties = function (changes) { };
                        ;
                        return MockIVisualHost;
                    }());
                    mocks.MockIVisualHost = MockIVisualHost;
                })(mocks = test.mocks || (test.mocks = {}));
            })(test = utils.test || (utils.test = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var test;
            (function (test) {
                var mocks;
                (function (mocks) {
                    var MockIColorPalette = (function () {
                        function MockIColorPalette(colors) {
                            if (colors === void 0) { colors = MockIColorPalette.DefaultColors; }
                            this.colors = colors;
                        }
                        MockIColorPalette.prototype.getColor = function (key) {
                            return this.colors[key];
                        };
                        /**
                         * This array represents the default colors of the IColorPalette.
                         */
                        MockIColorPalette.DefaultColors = [
                            { value: "red" },
                            { value: "green" },
                            { value: "blue" }
                        ];
                        return MockIColorPalette;
                    }());
                    mocks.MockIColorPalette = MockIColorPalette;
                })(mocks = test.mocks || (test.mocks = {}));
            })(test = utils.test || (utils.test = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var test;
            (function (test) {
                var mocks;
                (function (mocks) {
                    var MockISelectionId = (function () {
                        function MockISelectionId(key) {
                            this.key = key;
                        }
                        MockISelectionId.prototype.equals = function (other) {
                            return this === other;
                        };
                        MockISelectionId.prototype.includes = function (other, ignoreHighlight) {
                            return this === other;
                        };
                        MockISelectionId.prototype.getKey = function () {
                            return this.key;
                        };
                        MockISelectionId.prototype.getSelector = function () {
                            return {};
                        };
                        MockISelectionId.prototype.getSelectorsByColumn = function () {
                            return {};
                        };
                        MockISelectionId.prototype.hasIdentity = function () {
                            return true;
                        };
                        return MockISelectionId;
                    }());
                    mocks.MockISelectionId = MockISelectionId;
                })(mocks = test.mocks || (test.mocks = {}));
            })(test = utils.test || (utils.test = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var test;
            (function (test) {
                var mocks;
                (function (mocks) {
                    var MockISelectionIdBuilder = (function () {
                        function MockISelectionIdBuilder() {
                        }
                        MockISelectionIdBuilder.prototype.withCategory = function (categoryColumn, index) {
                            return this;
                        };
                        MockISelectionIdBuilder.prototype.withSeries = function (seriesColumn, valueColumn) {
                            return this;
                        };
                        MockISelectionIdBuilder.prototype.withMeasure = function (measureId) {
                            return this;
                        };
                        MockISelectionIdBuilder.prototype.createSelectionId = function () {
                            return mocks.createSelectionId();
                        };
                        return MockISelectionIdBuilder;
                    }());
                    mocks.MockISelectionIdBuilder = MockISelectionIdBuilder;
                })(mocks = test.mocks || (test.mocks = {}));
            })(test = utils.test || (utils.test = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var test;
            (function (test) {
                var mocks;
                (function (mocks) {
                    var MockISelectionManager = (function () {
                        function MockISelectionManager() {
                            this.selectionIds = [];
                        }
                        MockISelectionManager.prototype.select = function (selectionId, multiSelect) {
                            var _this = this;
                            var selectionIds = [].concat(selectionId), deferred = $.Deferred();
                            selectionIds.forEach(function (id) {
                                if (_this.containsSelection(id)) {
                                    _this.selectionIds = multiSelect
                                        ? _this.selectionIds.filter(function (selectedId) {
                                            return selectedId.equals(id);
                                        })
                                        : _this.selectionIds.length > 1
                                            ? [id]
                                            : [];
                                }
                                else {
                                    if (multiSelect) {
                                        _this.selectionIds.push(id);
                                    }
                                    else {
                                        _this.selectionIds = [id];
                                    }
                                }
                            });
                            deferred.resolve(this.selectionIds);
                            return deferred;
                        };
                        MockISelectionManager.prototype.hasSelection = function () {
                            return this.selectionIds.length > 0;
                        };
                        MockISelectionManager.prototype.clear = function () {
                            var deferred = $.Deferred();
                            this.selectionIds = [];
                            deferred.resolve();
                            return deferred;
                        };
                        MockISelectionManager.prototype.getSelectionIds = function () {
                            return this.selectionIds;
                        };
                        MockISelectionManager.prototype.containsSelection = function (id) {
                            return this.selectionIds.some(function (selectionId) {
                                return selectionId.equals(id);
                            });
                        };
                        return MockISelectionManager;
                    }());
                    mocks.MockISelectionManager = MockISelectionManager;
                })(mocks = test.mocks || (test.mocks = {}));
            })(test = utils.test || (utils.test = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var test;
            (function (test) {
                var mocks;
                (function (mocks) {
                    // powerbi.extensibility.utils.test.mocks
                    var MockVisualHost = powerbi.extensibility.utils.test.mocks.MockIVisualHost;
                    var MockIColorPalette = powerbi.extensibility.utils.test.mocks.MockIColorPalette;
                    var MockISelectionId = powerbi.extensibility.utils.test.mocks.MockISelectionId;
                    var MockISelectionIdBuilder = powerbi.extensibility.utils.test.mocks.MockISelectionIdBuilder;
                    var MockISelectionManager = powerbi.extensibility.utils.test.mocks.MockISelectionManager;
                    function createVisualHost() {
                        return new MockVisualHost(createColorPalette());
                    }
                    mocks.createVisualHost = createVisualHost;
                    function createColorPalette(colors) {
                        return new MockIColorPalette(colors);
                    }
                    mocks.createColorPalette = createColorPalette;
                    function createSelectionId(key) {
                        if (key === void 0) { key = ""; }
                        return new MockISelectionId(key);
                    }
                    mocks.createSelectionId = createSelectionId;
                    function createSelectionIdBuilder() {
                        return new MockISelectionIdBuilder();
                    }
                    mocks.createSelectionIdBuilder = createSelectionIdBuilder;
                    function createSelectionManager() {
                        return new MockISelectionManager();
                    }
                    mocks.createSelectionManager = createSelectionManager;
                })(mocks = test.mocks || (test.mocks = {}));
            })(test = utils.test || (utils.test = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var test;
            (function (test) {
                var helpers;
                (function (helpers) {
                    function testDom(height, width) {
                        var element = $("<div></div>")
                            .attr("id", "item")
                            .css("width", width)
                            .css("height", height)
                            .css("position", "relative")
                            .addClass("visual");
                        setFixtures(element[0].outerHTML);
                        return $("#item");
                    }
                    helpers.testDom = testDom;
                    (function (ClickEventType) {
                        ClickEventType[ClickEventType["Default"] = 0] = "Default";
                        ClickEventType[ClickEventType["CtrlKey"] = 1] = "CtrlKey";
                        ClickEventType[ClickEventType["AltKey"] = 2] = "AltKey";
                        ClickEventType[ClickEventType["ShiftKey"] = 4] = "ShiftKey";
                        ClickEventType[ClickEventType["MetaKey"] = 8] = "MetaKey";
                    })(helpers.ClickEventType || (helpers.ClickEventType = {}));
                    var ClickEventType = helpers.ClickEventType;
                    (function (MouseEventType) {
                        MouseEventType[MouseEventType["click"] = 0] = "click";
                        MouseEventType[MouseEventType["mousedown"] = 1] = "mousedown";
                        MouseEventType[MouseEventType["mouseup"] = 2] = "mouseup";
                        MouseEventType[MouseEventType["mouseover"] = 3] = "mouseover";
                        MouseEventType[MouseEventType["mousemove"] = 4] = "mousemove";
                        MouseEventType[MouseEventType["mouseout"] = 5] = "mouseout";
                    })(helpers.MouseEventType || (helpers.MouseEventType = {}));
                    var MouseEventType = helpers.MouseEventType;
                    if (typeof jQuery !== "undefined" && jQuery) {
                        jQuery.fn.d3Click = function (x, y, eventType, button) {
                            mouseEvent.call(this, MouseEventType.click, x, y, eventType, button);
                        };
                        jQuery.fn.d3MouseDown = function (x, y, eventType, button) {
                            mouseEvent.call(this, MouseEventType.mousedown, x, y, eventType, button);
                        };
                        jQuery.fn.d3MouseUp = function (x, y, eventType, button) {
                            mouseEvent.call(this, MouseEventType.mouseup, x, y, eventType);
                        };
                        jQuery.fn.d3MouseOver = function (x, y, eventType, button) {
                            mouseEvent.call(this, MouseEventType.mouseover, x, y, eventType, button);
                        };
                        jQuery.fn.d3MouseMove = function (x, y, eventType, button) {
                            mouseEvent.call(this, MouseEventType.mousemove, x, y, eventType, button);
                        };
                        jQuery.fn.d3MouseOut = function (x, y, eventType, button) {
                            mouseEvent.call(this, MouseEventType.mouseout, x, y, eventType, button);
                        };
                        jQuery.fn.d3KeyEvent = function (typeArg, keyArg, keyCode) {
                            keyEvent.call(this, typeArg, keyArg, keyCode);
                        };
                        jQuery.fn.d3TouchStart = function (touchList) {
                            this.each(function (i, e) {
                                var evt = createTouchStartEvent(touchList);
                                e.dispatchEvent(evt);
                            });
                        };
                        jQuery.fn.d3TouchMove = function (touchList) {
                            this.each(function (i, e) {
                                var evt = createTouchMoveEvent(touchList);
                                e.dispatchEvent(evt);
                            });
                        };
                        jQuery.fn.d3TouchEnd = function (touchList) {
                            this.each(function (i, e) {
                                var evt = createTouchEndEvent(touchList);
                                e.dispatchEvent(evt);
                            });
                        };
                        jQuery.fn.d3ContextMenu = function (x, y) {
                            this.each(function (i, e) {
                                var evt = createContextMenuEvent(x, y);
                                e.dispatchEvent(evt);
                            });
                        };
                    }
                    // Defining a simulated click event (see http://stackoverflow.com/questions/9063383/how-to-invoke-click-event-programmaticaly-in-d3)
                    function mouseEvent(mouseEventType, x, y, eventType, button) {
                        var type = eventType || ClickEventType.Default;
                        this.each(function (i, e) {
                            var evt = createMouseEvent(mouseEventType, type, x, y, button);
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
                        var type = eventType || ClickEventType.Default, evt = document.createEvent("MouseEvents");
                        evt.initMouseEvent(MouseEventType[mouseEventType], // type
                        true, // canBubble
                        true, // cancelable
                        window, // view
                        0, // detail
                        x, // screenX
                        y, // screenY
                        x, // clientX
                        y, // clientY
                        !!(type & ClickEventType.CtrlKey), // ctrlKey
                        !!(type & ClickEventType.AltKey), // altKey
                        !!(type & ClickEventType.ShiftKey), // shiftKey
                        !!(type & ClickEventType.MetaKey), // metaKey
                        button, // button
                        null); // relatedTarget
                        return evt;
                    }
                    helpers.createMouseEvent = createMouseEvent;
                    function createTouchStartEvent(touchList) {
                        // NOTE: phantomjs does not support TouchEvent
                        var evt = document.createEvent("UIEvent");
                        evt.initUIEvent("touchstart", true, true, window, 1);
                        if (touchList) {
                            evt.touches = touchList;
                        }
                        return evt;
                    }
                    helpers.createTouchStartEvent = createTouchStartEvent;
                    function createTouchMoveEvent(touchList) {
                        // NOTE: phantomjs does not support TouchEvent
                        var evt = document.createEvent("UIEvent");
                        evt.initUIEvent("touchmove", true, true, window, 1);
                        if (touchList) {
                            evt.touches = touchList;
                        }
                        return evt;
                    }
                    helpers.createTouchMoveEvent = createTouchMoveEvent;
                    function createTouchEndEvent(touchList) {
                        // NOTE: phantomjs does not support TouchEvent
                        var evt = document.createEvent("UIEvent");
                        evt.initUIEvent("touchend", true, true, window, 1);
                        if (touchList) {
                            evt.touches = touchList;
                        }
                        return evt;
                    }
                    helpers.createTouchEndEvent = createTouchEndEvent;
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
                    helpers.createContextMenuEvent = createContextMenuEvent;
                    function createTouchesList(touches) {
                        var _this = this;
                        var touchesList = touches;
                        touches.item = function (index) {
                            return _this.arr[index];
                        };
                        return touchesList;
                    }
                    helpers.createTouchesList = createTouchesList;
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
                    helpers.createTouch = createTouch;
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
                        d3.timer.flush();
                        Date.now = now;
                    }
                    helpers.flushAllD3Transitions = flushAllD3Transitions;
                })(helpers = test.helpers || (test.helpers = {}));
            })(test = utils.test || (utils.test = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var test;
            (function (test) {
                var helpers;
                (function (helpers) {
                    // powerbi.extensibility.utils.test
                    var DefaultWaitForRender = powerbi.extensibility.utils.test.DefaultWaitForRender;
                    function renderTimeout(fn, timeout) {
                        if (timeout === void 0) { timeout = DefaultWaitForRender; }
                        return setTimeout(fn, timeout);
                    }
                    helpers.renderTimeout = renderTimeout;
                })(helpers = test.helpers || (test.helpers = {}));
            })(test = utils.test || (utils.test = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var test;
            (function (test) {
                // powerbitests
                var testDom = powerbi.extensibility.utils.test.helpers.testDom;
                var flushAllD3Transitions = powerbi.extensibility.utils.test.helpers.flushAllD3Transitions;
                // powerbitests.customVisuals
                var renderTimeout = powerbi.extensibility.utils.test.helpers.renderTimeout;
                var createVisualHost = powerbi.extensibility.utils.test.mocks.createVisualHost;
                var VisualBuilderBase = (function () {
                    function VisualBuilderBase(width, height, element) {
                        if (width === void 0) { width = 800; }
                        if (height === void 0) { height = 600; }
                        if (element === void 0) { element = testDom(height, width); }
                        this.element = element;
                        this.visualHost = createVisualHost();
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
                        return renderTimeout(fn, timeout);
                    };
                    VisualBuilderBase.prototype.updateEnumerateObjectInstancesRenderTimeout = function (dataViews, options, fn, timeout) {
                        this.update(dataViews);
                        var enumeration = this.enumerateObjectInstances(options);
                        return renderTimeout(function () { return fn(enumeration); }, timeout);
                    };
                    VisualBuilderBase.prototype.updateFlushAllD3Transitions = function (dataViews) {
                        this.update(dataViews);
                        flushAllD3Transitions();
                    };
                    VisualBuilderBase.prototype.updateflushAllD3TransitionsRenderTimeout = function (dataViews, fn, timeout) {
                        this.update(dataViews);
                        flushAllD3Transitions();
                        return renderTimeout(fn, timeout);
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
                test.VisualBuilderBase = VisualBuilderBase;
            })(test = utils.test || (utils.test = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
