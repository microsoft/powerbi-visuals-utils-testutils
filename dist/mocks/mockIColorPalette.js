"use strict";
var MockIColorPalette = (function () {
    function MockIColorPalette(colors) {
        if (colors === void 0) { colors = []; }
        this.colorIndex = 0;
        this.colors = colors;
    }
    MockIColorPalette.prototype.getColor = function (key) {
        var color = this.colors[key];
        if (color) {
            return color;
        }
        var colors = MockIColorPalette.DefaultColors;
        color = this.colors[key] = colors[this.colorIndex++];
        if (this.colorIndex >= colors.length) {
            this.colorIndex = 0;
        }
        return color;
    };
    return MockIColorPalette;
}());
/**
 * This array represents the default colors of the IColorPalette.
 */
MockIColorPalette.DefaultColors = [
    // First loop
    { value: "#01B8AA" },
    { value: "#374649" },
    { value: "#FD625E" },
    { value: "#F2C80F" },
    { value: "#5F6B6D" },
    { value: "#8AD4EB" },
    { value: "#FE9666" },
    { value: "#A66999" },
    { value: "#3599B8" },
    { value: "#DFBFBF" },
    // Second loop
    { value: "#4AC5BB" },
    { value: "#5F6B6D" },
    { value: "#FB8281" },
    { value: "#F4D25A" },
    { value: "#7F898A" },
    { value: "#A4DDEE" },
    { value: "#FDAB89" },
    { value: "#B687AC" },
    { value: "#28738A" },
    { value: "#A78F8F" },
    // Third loop
    { value: "#168980" },
    { value: "#293537" },
    { value: "#BB4A4A" },
    { value: "#B59525" },
    { value: "#475052" },
    { value: "#6A9FB0" },
    { value: "#BD7150" },
    { value: "#7B4F71" },
    { value: "#1B4D5C" },
    { value: "#706060" },
    // Fourth loop
    { value: "#0F5C55" },
    { value: "#1C2325" },
    { value: "#7D3231" },
    { value: "#796419" },
    { value: "#303637" },
    { value: "#476A75" },
    { value: "#7E4B36" },
    { value: "#52354C" },
    { value: "#0D262E" },
    { value: "#544848" },
];
exports.MockIColorPalette = MockIColorPalette;
//}
//# sourceMappingURL=mockIColorPalette.js.map