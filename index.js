(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./helpers/helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const helpers_1 = require("./helpers/helpers");
    exports.testDom = helpers_1.testDom;
    function d3_test() {
        console.log("d3_test");
    }
    exports.d3_test = d3_test;
    ;
});
//# sourceMappingURL=index.js.map