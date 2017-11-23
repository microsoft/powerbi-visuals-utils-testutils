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
var jquery_1 = require("jquery");
var MockISelectionManager = (function () {
    function MockISelectionManager() {
        this.selectionIds = [];
    }
    MockISelectionManager.prototype.select = function (selectionId, multiSelect) {
        var _this = this;
        var selectionIds = [].concat(selectionId), deferred = jquery_1.$.Deferred();
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
        var deferred = jquery_1.$.Deferred();
        this.selectionIds = [];
        deferred.resolve();
        return deferred;
    };
    MockISelectionManager.prototype.getSelectionIds = function () {
        return this.selectionIds;
    };
    MockISelectionManager.prototype.applySelectionFilter = function () { };
    ;
    MockISelectionManager.prototype.containsSelection = function (id) {
        return this.selectionIds.some(function (selectionId) {
            return selectionId.equals(id);
        });
    };
    return MockISelectionManager;
}());
exports.MockISelectionManager = MockISelectionManager;
//}
//# sourceMappingURL=mockISelectionManager.js.map