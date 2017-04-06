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
                    var MockILocale = (function () {
                        function MockILocale(locales) {
                            if (locales === void 0) { locales = MockILocale.DefaultLocales; }
                            this.locales = locales;
                            this.locale = _.keys(locales)[0];
                        }
                        Object.defineProperty(MockILocale.prototype, "locale", {
                            get: function () {
                                return this.currentLocale;
                            },
                            set: function (key) {
                                this.currentLocale = this.locales[key] || MockILocale.DefaultLocales[key] || MockILocale.DefaultLocales["en"];
                            },
                            enumerable: true,
                            configurable: true
                        });
                        return MockILocale;
                    }());
                    MockILocale.DefaultLocales = {
                        "en": "en-US",
                        "ru": "ru-RU"
                    };
                    mocks.MockILocale = MockILocale;
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
                            return this.colors[key] || MockIColorPalette.DefaultColors[0];
                        };
                        return MockIColorPalette;
                    }());
                    /**
                     * This array represents the default colors of the IColorPalette.
                     */
                    MockIColorPalette.DefaultColors = [
                        { value: "red" },
                        { value: "green" },
                        { value: "blue" }
                    ];
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
                    mocks.MockITooltipService = MockITooltipService;
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
                    var MockIVisualHost = (function () {
                        function MockIVisualHost(colorPalette, selectionManager, tooltipServiceInstance, localeInstance) {
                            this.colorPaletteInstance = colorPalette;
                            this.selectionManager = selectionManager;
                            this.tooltipServiceInstance = tooltipServiceInstance;
                            this.localeInstance = localeInstance;
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
                        Object.defineProperty(MockIVisualHost.prototype, "locale", {
                            get: function () {
                                return this.localeInstance.locale;
                            },
                            set: function (language) {
                                this.localeInstance.locale = language;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        MockIVisualHost.prototype.persistProperties = function (changes) { };
                        ;
                        Object.defineProperty(MockIVisualHost.prototype, "tooltipService", {
                            get: function () {
                                return this.tooltipServiceInstance;
                            },
                            enumerable: true,
                            configurable: true
                        });
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
                    // powerbi.extensibility.utils.test.mocks
                    var MockVisualHost = powerbi.extensibility.utils.test.mocks.MockIVisualHost;
                    var MockIColorPalette = powerbi.extensibility.utils.test.mocks.MockIColorPalette;
                    var MockISelectionId = powerbi.extensibility.utils.test.mocks.MockISelectionId;
                    var MockISelectionIdBuilder = powerbi.extensibility.utils.test.mocks.MockISelectionIdBuilder;
                    var MockISelectionManager = powerbi.extensibility.utils.test.mocks.MockISelectionManager;
                    var MockITooltipService = powerbi.extensibility.utils.test.mocks.MockITooltipService;
                    var MockILocale = powerbi.extensibility.utils.test.mocks.MockILocale;
                    function createVisualHost(locale) {
                        return new MockVisualHost(createColorPalette(), createSelectionManager(), createTooltipService(true), createLocale(locale));
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
                    function createTooltipService(isEnabled) {
                        return new MockITooltipService(isEnabled);
                    }
                    mocks.createTooltipService = createTooltipService;
                    function createLocale(locales) {
                        return new MockILocale(locales);
                    }
                    mocks.createLocale = createLocale;
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
                    var ClickEventType;
                    (function (ClickEventType) {
                        ClickEventType[ClickEventType["Default"] = 0] = "Default";
                        ClickEventType[ClickEventType["CtrlKey"] = 1] = "CtrlKey";
                        ClickEventType[ClickEventType["AltKey"] = 2] = "AltKey";
                        ClickEventType[ClickEventType["ShiftKey"] = 4] = "ShiftKey";
                        ClickEventType[ClickEventType["MetaKey"] = 8] = "MetaKey";
                    })(ClickEventType = helpers.ClickEventType || (helpers.ClickEventType = {}));
                    var MouseEventType;
                    (function (MouseEventType) {
                        MouseEventType[MouseEventType["click"] = 0] = "click";
                        MouseEventType[MouseEventType["mousedown"] = 1] = "mousedown";
                        MouseEventType[MouseEventType["mouseup"] = 2] = "mouseup";
                        MouseEventType[MouseEventType["mouseover"] = 3] = "mouseover";
                        MouseEventType[MouseEventType["mousemove"] = 4] = "mousemove";
                        MouseEventType[MouseEventType["mouseout"] = 5] = "mouseout";
                    })(MouseEventType = helpers.MouseEventType || (helpers.MouseEventType = {}));
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
                    function clickElement(element, ctrlKey) {
                        if (ctrlKey === void 0) { ctrlKey = false; }
                        var coordinates = element.offset(), width = element.outerWidth(), height = element.outerHeight(), eventType = ctrlKey
                            ? helpers.ClickEventType.CtrlKey
                            : helpers.ClickEventType.Default;
                        element.d3Click(coordinates.left + (width / 2), coordinates.top + (height / 2), eventType);
                    }
                    helpers.clickElement = clickElement;
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
                    function getRandomNumbers(count, min, max) {
                        if (min === void 0) { min = 0; }
                        if (max === void 0) { max = 1; }
                        return _.range(count).map(function (x) { return getRandomNumber(min, max); });
                    }
                    helpers.getRandomNumbers = getRandomNumbers;
                    function getRandomNumber(min, max, exceptionList, changeResult) {
                        if (changeResult === void 0) { changeResult = function (x) { return x; }; }
                        var cryptoObj = window.crypto || window.msCrypto;
                        var randomValue = +("0." + cryptoObj.getRandomValues(new Uint8Array(1)));
                        var result = changeResult(randomValue * (max - min) + min);
                        if (exceptionList && exceptionList.length && _.includes(exceptionList, result)) {
                            return getRandomNumber(min, max, exceptionList);
                        }
                        return result;
                    }
                    helpers.getRandomNumber = getRandomNumber;
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
                    var color;
                    (function (color_1) {
                        function getSolidColorStructuralObject(color) {
                            return { solid: { color: color } };
                        }
                        color_1.getSolidColorStructuralObject = getSolidColorStructuralObject;
                        function assertColorsMatch(actual, expected, invert) {
                            if (invert === void 0) { invert = false; }
                            var rgbActual = parseColorString(actual), rgbExpected = parseColorString(expected);
                            if (invert) {
                                return expect(rgbActual).not.toEqual(rgbExpected);
                            }
                            return expect(rgbActual).toEqual(rgbExpected);
                        }
                        color_1.assertColorsMatch = assertColorsMatch;
                        function parseColorString(color) {
                            if (color.indexOf("#") >= 0) {
                                if (color.length === 7) {
                                    // #RRGGBB
                                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
                                    if (result == null || result.length < 4) {
                                        return;
                                    }
                                    return {
                                        R: parseInt(result[1], 16),
                                        G: parseInt(result[2], 16),
                                        B: parseInt(result[3], 16),
                                    };
                                }
                                else if (color.length === 4) {
                                    // #RGB
                                    var result = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(color);
                                    if (result == null || result.length < 4) {
                                        return;
                                    }
                                    return {
                                        R: parseInt(result[1] + result[1], 16),
                                        G: parseInt(result[2] + result[2], 16),
                                        B: parseInt(result[3] + result[3], 16),
                                    };
                                }
                            }
                            else if (color.indexOf("rgb(") >= 0) {
                                // rgb(R, G, B)
                                var result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(color);
                                if (result == null || result.length < 4) {
                                    return;
                                }
                                return {
                                    R: parseInt(result[1], 10),
                                    G: parseInt(result[2], 10),
                                    B: parseInt(result[3], 10),
                                };
                            }
                            else if (color.indexOf("rgba(") >= 0) {
                                // rgba(R, G, B, A)
                                var result = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)$/.exec(color);
                                if (result == null || result.length < 5) {
                                    return;
                                }
                                return {
                                    R: parseInt(result[1], 10),
                                    G: parseInt(result[2], 10),
                                    B: parseInt(result[3], 10),
                                    A: parseFloat(result[4]),
                                };
                            }
                        }
                        color_1.parseColorString = parseColorString;
                    })(color = helpers.color || (helpers.color = {}));
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
                    function VisualBuilderBase(width, height, guid, element) {
                        if (width === void 0) { width = 800; }
                        if (height === void 0) { height = 600; }
                        if (element === void 0) { element = testDom(height, width); }
                        this.element = element;
                        if (guid) {
                            this.element.addClass("visual-" + guid);
                        }
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
                var dataViewBuilder;
                (function (dataViewBuilder) {
                    function createCategoricalDataViewBuilder() {
                        return new CategoricalDataViewBuilder();
                    }
                    dataViewBuilder.createCategoricalDataViewBuilder = createCategoricalDataViewBuilder;
                    var CategoricalDataViewBuilder = (function () {
                        function CategoricalDataViewBuilder() {
                            this.categories = [];
                            this.staticMeasureColumns = [];
                            this.dynamicMeasureColumns = [];
                            this.columnIndex = 0;
                        }
                        CategoricalDataViewBuilder.prototype.withCategory = function (options) {
                            var categoryValues = options.values, identityFrom = options.identityFrom, sourceType = options.source.type;
                            var categoryColumn = {
                                source: options.source,
                                identityFields: options.identityFrom.fields,
                                identity: options.identityFrom.identities || [],
                                values: categoryValues,
                            };
                            if (!options.identityFrom.identities) {
                                for (var categoryIndex = 0, categoryLength = categoryValues.length; categoryIndex < categoryLength; categoryIndex++) {
                                    categoryColumn.identity.push(getScopeIdentity(identityFrom, categoryIndex, categoryValues[categoryIndex], sourceType));
                                }
                            }
                            if (!this.categories) {
                                this.categories = [];
                            }
                            this.categories.push(categoryColumn);
                            return this;
                        };
                        CategoricalDataViewBuilder.prototype.withCategories = function (categories) {
                            if (_.isEmpty(this.categories)) {
                                this.categories = categories;
                            }
                            else {
                                Array.prototype.push.apply(this.categories, categories);
                            }
                            return this;
                        };
                        /**
                         * Adds static series columns.
                         *
                         * Note that it is illegal to have both dynamic series and static series in a visual DataViewCategorical.  It is only legal to have them both in
                         * a query DataViewCategorical, where DataViewTransform is expected to split them up into separate visual DataViewCategorical objects.
                         */
                        CategoricalDataViewBuilder.prototype.withValues = function (options) {
                            var columns = options.columns;
                            for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                                var column = columns_1[_i];
                                this.staticMeasureColumns.push(column.source);
                            }
                            this.staticSeriesValues = columns;
                            return this;
                        };
                        /**
                         * Adds dynamic series columns.
                         *
                         * Note that it is illegal to have both dynamic series and static series in a visual DataViewCategorical.  It is only legal to have them both in
                         * a query DataViewCategorical, where DataViewTransform is expected to split them up into separate visual DataViewCategorical objects.
                         */
                        CategoricalDataViewBuilder.prototype.withGroupedValues = function (options) {
                            var groupColumn = options.groupColumn;
                            this.dynamicSeriesMetadata = {
                                column: groupColumn.source,
                                identityFrom: groupColumn.identityFrom,
                                values: groupColumn.values,
                            };
                            var valueColumns = options.valueColumns;
                            for (var _i = 0, valueColumns_1 = valueColumns; _i < valueColumns_1.length; _i++) {
                                var valueColumn = valueColumns_1[_i];
                                this.dynamicMeasureColumns.push(valueColumn.source);
                            }
                            this.dynamicSeriesValues = options.data;
                            return this;
                        };
                        CategoricalDataViewBuilder.prototype.fillData = function (dataViewValues) {
                            var categoryColumn = _.first(this.categories), categoryLength = (categoryColumn && categoryColumn.values)
                                ? categoryColumn.values.length
                                : 0;
                            if (this.hasDynamicSeries()) {
                                for (var seriesIndex = 0, seriesLength = this.dynamicSeriesMetadata.values.length; seriesIndex < seriesLength; seriesIndex++) {
                                    var seriesMeasures = this.dynamicSeriesValues[seriesIndex];
                                    for (var measureIndex = 0, measuresLen = this.dynamicMeasureColumns.length; measureIndex < measuresLen; measureIndex++) {
                                        var groupIndex = seriesIndex * measuresLen + measureIndex;
                                        applySeriesData(dataViewValues[groupIndex], seriesMeasures[measureIndex], categoryLength);
                                    }
                                }
                            }
                            if (this.hasStaticSeries()) {
                                // Note: when the target categorical has both dynamic and static series, append static measures at the end of the values array.
                                var staticColumnsStartingIndex = this.hasDynamicSeries()
                                    ? (this.dynamicSeriesValues.length * this.dynamicMeasureColumns.length)
                                    : 0;
                                for (var measureIndex = 0, measuresLen = this.staticMeasureColumns.length; measureIndex < measuresLen; measureIndex++) {
                                    applySeriesData(dataViewValues[staticColumnsStartingIndex + measureIndex], this.staticSeriesValues[measureIndex], categoryLength);
                                }
                            }
                        };
                        /**
                         * Returns the DataView with metadata and DataViewCategorical.
                         * Returns undefined if the combination of parameters is illegal, such as having both dynamic series and static series when building a visual DataView.
                         */
                        CategoricalDataViewBuilder.prototype.build = function () {
                            var metadataColumns = [];
                            var categorical = {};
                            var categoryMetadata = this.categories;
                            var dynamicSeriesMetadata = this.dynamicSeriesMetadata;
                            // --- Build metadata columns and value groups ---
                            for (var _i = 0, categoryMetadata_1 = categoryMetadata; _i < categoryMetadata_1.length; _i++) {
                                var columnMetadata = categoryMetadata_1[_i];
                                pushIfNotExists(metadataColumns, columnMetadata.source);
                            }
                            if (this.hasDynamicSeries()) {
                                // Dynamic series, or Dynamic & Static series.
                                pushIfNotExists(metadataColumns, dynamicSeriesMetadata.column);
                                // categorical.values = DataViewTransform.createValueColumns([], dynamicSeriesMetadata.identityFrom.fields, dynamicSeriesMetadata.column);
                                categorical.values = createValueColumns([], dynamicSeriesMetadata.identityFrom.fields, dynamicSeriesMetadata.column);
                                // For each series value we will make one column per measure
                                var seriesValues = dynamicSeriesMetadata.values;
                                for (var seriesIndex = 0; seriesIndex < seriesValues.length; seriesIndex++) {
                                    var seriesValue = seriesValues[seriesIndex];
                                    var seriesIdentity = getScopeIdentity(dynamicSeriesMetadata.identityFrom, seriesIndex, seriesValue, dynamicSeriesMetadata.column.type);
                                    for (var _a = 0, _b = this.dynamicMeasureColumns; _a < _b.length; _a++) {
                                        var measure = _b[_a];
                                        var column = _.toPlainObject(measure);
                                        column.groupName = seriesValue;
                                        pushIfNotExists(metadataColumns, column);
                                        categorical.values.push({
                                            source: column,
                                            values: [],
                                            identity: seriesIdentity,
                                        });
                                    }
                                }
                                // If there is no data we should add a column that contains a pointer to the dynamic measure columns, for consistency with the dsrReader
                                if (seriesValues.length === 0) {
                                    for (var _c = 0, _d = this.dynamicMeasureColumns; _c < _d.length; _c++) {
                                        var measure = _d[_c];
                                        var column = _.toPlainObject(measure);
                                        pushIfNotExists(metadataColumns, column);
                                        categorical.values.push({ source: column, values: [] });
                                    }
                                }
                                if (this.hasStaticSeries()) {
                                    // IMPORTANT: In the Dynamic & Static series case, the groups array shall not include any static group. This is to match the behavior of production code that creates query DataView objects.
                                    // Get the current return value of grouped() before adding static measure columns, an use that as the return value of this categorical.
                                    // Otherwise, the default behavior of DataViewValueColumns.grouped() from DataViewTransform.createValueColumns() is to create series groups from all measure columns.
                                    var dynamicSeriesGroups_1 = categorical.values.grouped();
                                    categorical.values.grouped = function () { return dynamicSeriesGroups_1; };
                                    this.appendStaticMeasureColumns(metadataColumns, categorical.values);
                                }
                            }
                            else {
                                // Static series only / no series
                                categorical.values = createValueColumns();
                                this.appendStaticMeasureColumns(metadataColumns, categorical.values);
                            }
                            var categories = this.categories;
                            if (!_.isEmpty(categories)) {
                                categorical.categories = categories;
                            }
                            // --- Fill in data point values ---
                            this.fillData(categorical.values);
                            var dataView = {
                                metadata: {
                                    columns: metadataColumns,
                                },
                                categorical: categorical,
                            };
                            if (this.isLegalDataView(dataView)) {
                                return dataView;
                            }
                        };
                        CategoricalDataViewBuilder.prototype.appendStaticMeasureColumns = function (metadataColumns, valueColumns) {
                            if (!_.isEmpty(this.staticMeasureColumns)) {
                                for (var _i = 0, _a = this.staticMeasureColumns; _i < _a.length; _i++) {
                                    var column = _a[_i];
                                    pushIfNotExists(metadataColumns, column);
                                    valueColumns.push({
                                        source: column,
                                        values: [],
                                    });
                                }
                            }
                        };
                        CategoricalDataViewBuilder.prototype.isLegalDataView = function (dataView) {
                            if (this.hasDynamicSeries()
                                && this.hasStaticSeries()
                                && CategoricalDataViewBuilder.isVisualDataView(dataView.metadata.columns)) {
                                // It is illegal to have both dynamic series and static series in a visual DataViewCategorical,
                                // because the DataViewValueColumns interface today cannot express that 100% (see its 'source' property and return value of its 'grouped()' function).
                                return false;
                            }
                            return true;
                        };
                        /**
                         * This function infers that if any metadata column has 'queryName',
                         * then the user of this builder is building a visual DataView (as opposed to query DataView).
                         *
                         * @param metadataColumns The complete collection of metadata columns in the categorical.
                         */
                        CategoricalDataViewBuilder.isVisualDataView = function (metadataColumns) {
                            return !_.isEmpty(metadataColumns) &&
                                _.some(metadataColumns, function (metadataColumn) { return !!metadataColumn.queryName; });
                        };
                        CategoricalDataViewBuilder.prototype.hasDynamicSeries = function () {
                            return !!this.dynamicSeriesMetadata; // In Map visual scenarios, you can have dynamic series without measure columns
                        };
                        CategoricalDataViewBuilder.prototype.hasStaticSeries = function () {
                            return !!this.staticSeriesValues;
                        };
                        return CategoricalDataViewBuilder;
                    }());
                    function getScopeIdentity(source, index, value, valueType) {
                        var identities = source.identities;
                        if (identities) {
                            return identities[index];
                        }
                        return {
                            expr: {},
                            key: ""
                        };
                    }
                    function pushIfNotExists(items, itemToAdd) {
                        if (_.includes(items, itemToAdd)) {
                            return;
                        }
                        items.push(itemToAdd);
                    }
                    function applySeriesData(target, source, categoryLength) {
                        var values = source.values;
                        target.values = values;
                        var highlights = source.highlights;
                        if (highlights) {
                            target.highlights = highlights;
                        }
                        var aggregates;
                        if (source.minLocal !== undefined) {
                            if (!aggregates)
                                aggregates = {};
                            aggregates.minLocal = source.minLocal;
                        }
                        if (source.maxLocal !== undefined) {
                            if (!aggregates)
                                aggregates = {};
                            aggregates.maxLocal = source.maxLocal;
                        }
                        if (aggregates) {
                            target.source.aggregates = aggregates;
                            _.extend(target, aggregates);
                        }
                    }
                    function createValueColumns(values, valueIdentityFields, source) {
                        if (values === void 0) { values = []; }
                        var result = values;
                        setGrouped(result);
                        if (valueIdentityFields) {
                            result.identityFields = valueIdentityFields;
                        }
                        if (source) {
                            result.source = source;
                        }
                        return result;
                    }
                    dataViewBuilder.createValueColumns = createValueColumns;
                    function setGrouped(values, groupedResult) {
                        values.grouped = groupedResult
                            ? function () { return groupedResult; }
                            : function () { return groupValues(values); };
                    }
                    dataViewBuilder.setGrouped = setGrouped;
                    /** Group together the values with a common identity. */
                    function groupValues(values) {
                        var groups = [], currentGroup;
                        for (var i = 0, len = values.length; i < len; i++) {
                            var value = values[i];
                            if (!currentGroup || currentGroup.identity !== value.identity) {
                                currentGroup = {
                                    values: []
                                };
                                if (value.identity) {
                                    currentGroup.identity = value.identity;
                                    var source = value.source;
                                    // allow null, which will be formatted as (Blank).
                                    if (source.groupName !== undefined)
                                        currentGroup.name = source.groupName;
                                    else if (source.displayName)
                                        currentGroup.name = source.displayName;
                                }
                                groups.push(currentGroup);
                            }
                            currentGroup.values.push(value);
                        }
                        return groups;
                    }
                })(dataViewBuilder = test.dataViewBuilder || (test.dataViewBuilder = {}));
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
                var dataViewBuilder;
                (function (dataViewBuilder) {
                    var TestDataViewBuilder = (function () {
                        function TestDataViewBuilder() {
                            this.aggregateFunction = _.sum;
                        }
                        TestDataViewBuilder.setDefaultQueryName = function (source) {
                            if (!source.queryName) {
                                source.queryName = TestDataViewBuilder.DataViewName + "." + source.displayName;
                            }
                            return source;
                        };
                        TestDataViewBuilder.getDataViewBuilderColumnIdentitySources = function (options) {
                            var optionsArray = (_.isArray(options) ? options : [options]);
                            var fields = optionsArray.map(function () { }), optionsIdentityExpressions = optionsArray.map(function (opt) { return opt.values; }), identityExpressions = [];
                            if (optionsIdentityExpressions.length > 1) {
                                var identityExpressionsLength = optionsIdentityExpressions.length, identityExpressionsValuesLength = _.max(_.map(optionsIdentityExpressions, function (x) { return x.length; }));
                                for (var vi = 0; vi < identityExpressionsValuesLength; vi++) {
                                    var current = optionsIdentityExpressions[0][vi];
                                    identityExpressions.push(current);
                                }
                            }
                            else {
                                identityExpressions = optionsIdentityExpressions[0];
                            }
                            return optionsArray.map(function (opt, i) { return ({
                                fields: fields,
                                identities: identityExpressions
                            }); });
                        };
                        TestDataViewBuilder.getValuesTable = function (categories, values) {
                            var columns = _.sortBy((categories || []).concat(values || []), function (x) { return x.source.index; }), maxLength = _.max(columns.map(function (x) { return x.values.length; }));
                            return _.range(maxLength).map(function (i) { return columns.map(function (x) { return x.values[i]; }); });
                        };
                        TestDataViewBuilder.createDataViewBuilderColumnOptions = function (categoriesColumns, valuesColumns, filter, customizeColumns) {
                            var filterColumns = filter
                                ? function (options) { return _.isArray(options.values) && filter(options); }
                                : function (options) { return _.isArray(options.values); };
                            var resultCategoriesColumns = _.isEmpty(categoriesColumns) ? [] : _
                                .flatten(categoriesColumns).filter(filterColumns);
                            var resultValuesColumns = _.isEmpty(valuesColumns) ? [] : _
                                .flatten(valuesColumns).filter(filterColumns);
                            var allColumns = (resultCategoriesColumns || []).concat(resultValuesColumns || []);
                            allColumns.forEach(function (x, i) { return x.source.index = i; });
                            if (customizeColumns) {
                                allColumns.forEach(function (column) { return customizeColumns(column.source); });
                            }
                            allColumns.forEach(function (column) {
                                if (column.source.format) {
                                    var objects = column.source.objects = (column.source.objects || {});
                                    objects.general = objects.general || {};
                                    objects.general.formatString = objects.general.formatString || column.source.format;
                                }
                            });
                            return {
                                categories: resultCategoriesColumns.filter(function (x) { return !x.isGroup; }),
                                grouped: resultCategoriesColumns.filter(function (x) { return x.isGroup; }),
                                values: resultValuesColumns
                            };
                        };
                        TestDataViewBuilder.setUpDataViewBuilderColumnOptions = function (options, aggregateFunction) {
                            var resultOptions = _.clone(options);
                            resultOptions.categories = resultOptions.categories && resultOptions.categories.map(function (x) { return _.clone(x); });
                            resultOptions.values = resultOptions.values && resultOptions.values.map(function (x) { return _.clone(x); });
                            resultOptions.grouped = resultOptions.grouped && resultOptions.grouped.map(function (x) { return _.clone(x); });
                            if (!_.isEmpty(options.categories)) {
                                resultOptions.categories.forEach(function (x) { return x.source = TestDataViewBuilder.setDefaultQueryName(x.source); });
                                var allRows = TestDataViewBuilder.getValuesTable(options.categories, options.values);
                                var categoriesLength_1 = options.categories.length;
                                var grouped_1 = _.toArray(_.groupBy(allRows, function (x) { return _.take(x, categoriesLength_1); }));
                                resultOptions.categories.forEach(function (c, i) { return c.values = grouped_1.map(function (x) { return x[0][i] === undefined ? null : x[0][i]; }); });
                                if (!_.isEmpty(options.values) && _.isEmpty(options.grouped)) {
                                    resultOptions.values.forEach(function (c, i) {
                                        return c.values = grouped_1.map(function (v) { return aggregateFunction(v.map(function (x) { return x[categoriesLength_1 + i] || 0; })); });
                                    });
                                }
                            }
                            if (!_.isEmpty(options.values)) {
                                resultOptions.values.forEach(function (x) { return x.source = TestDataViewBuilder.setDefaultQueryName(x.source); });
                            }
                            if (!_.isEmpty(options.grouped)) {
                                resultOptions.grouped.forEach(function (x) { return x.source = TestDataViewBuilder.setDefaultQueryName(x.source); });
                            }
                            return resultOptions;
                        };
                        TestDataViewBuilder.setUpDataView = function (dataView, options) {
                            if (!_.isEmpty(options.categories) && _.isEmpty(options.grouped)) {
                                var category_1 = dataView.categorical.categories[0];
                                // Tree. (completed only for one category)
                                dataView.tree = {
                                    root: {
                                        childIdentityFields: category_1.identityFields,
                                        children: category_1.values.map(function (value, index) {
                                            return {
                                                values: [value],
                                                name: value,
                                                identity: category_1.identity && category_1.identity[index]
                                            };
                                        })
                                    }
                                };
                                // Table.
                                dataView.table = {
                                    columns: dataView.categorical.categories.concat(dataView.categorical.values || []).map(function (x) { return x.source; }),
                                    identityFields: category_1.identityFields,
                                    rows: TestDataViewBuilder.getValuesTable(dataView.categorical.categories, dataView.categorical.values)
                                };
                                if (_.isEmpty(options.values)) {
                                    delete dataView.categorical.values;
                                }
                            }
                            if (dataView.categorical.values) {
                                var grouped_2 = dataView.categorical.values.grouped();
                                dataView.categorical.values.grouped = function () { return grouped_2; };
                            }
                            return dataView;
                        };
                        TestDataViewBuilder.prototype.createCategoricalDataViewBuilder = function (categoriesColumns, valuesColumns, columnNames, customizeColumns) {
                            var builder = dataViewBuilder.createCategoricalDataViewBuilder();
                            var originalOptions = TestDataViewBuilder.createDataViewBuilderColumnOptions(categoriesColumns, valuesColumns, columnNames && (function (options) { return _.includes(columnNames, options.source.displayName); }), customizeColumns);
                            var options = TestDataViewBuilder.setUpDataViewBuilderColumnOptions(originalOptions, this.aggregateFunction);
                            if (!_.isEmpty(options.categories)) {
                                var identityFrom_1 = TestDataViewBuilder.getDataViewBuilderColumnIdentitySources(options.categories);
                                builder.withCategories(options.categories.map(function (category, i) { return ({
                                    source: category.source,
                                    values: category.values,
                                    objects: category.objects,
                                    identity: identityFrom_1[i].identities,
                                    identityFields: identityFrom_1[i].fields
                                }); }));
                            }
                            if (!_.isEmpty(options.grouped)) {
                                var groupedCategory_1 = options.grouped[0]; // Finished only for one category.
                                var categoryValues_1 = originalOptions.categories
                                    && originalOptions.categories[0]
                                    && originalOptions.categories[0].values
                                    || [];
                                var uniqueCategoryValues_1 = _.uniq(categoryValues_1) || [undefined], uniqueGroupedValues = _.uniq(groupedCategory_1.values);
                                builder.withGroupedValues({
                                    groupColumn: {
                                        source: groupedCategory_1.source,
                                        values: uniqueGroupedValues,
                                        identityFrom: TestDataViewBuilder.getDataViewBuilderColumnIdentitySources(groupedCategory_1)[0]
                                    },
                                    valueColumns: options.values.map(function (x) { return ({ source: x.source }); }),
                                    data: uniqueGroupedValues.map(function (groupedValue) { return options.values.map(function (column, columnIndex) {
                                        return ({
                                            values: column.values && uniqueCategoryValues_1
                                                .map(function (categoryValue) {
                                                var index = _.findIndex(d3.range(categoryValues_1.length), function (i) { return categoryValues_1[i] === categoryValue && groupedCategory_1.values[i] === groupedValue; });
                                                return column.values[index] === undefined ? null : column.values[index];
                                            }),
                                            highlights: column.highlights,
                                            minLocal: column.minLocal,
                                            maxLocal: column.maxLocal
                                        });
                                    }); })
                                });
                            }
                            else if (!_.isEmpty(options.values)) {
                                builder.withValues({ columns: options.values });
                            }
                            var builderBuild = builder.build.bind(builder);
                            builder.build = function () {
                                return TestDataViewBuilder.setUpDataView(builderBuild(), options);
                            };
                            return builder;
                        };
                        return TestDataViewBuilder;
                    }());
                    TestDataViewBuilder.DataViewName = "Data";
                    dataViewBuilder.TestDataViewBuilder = TestDataViewBuilder;
                })(dataViewBuilder = test.dataViewBuilder || (test.dataViewBuilder = {}));
            })(test = utils.test || (utils.test = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
