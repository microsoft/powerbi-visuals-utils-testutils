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

module powerbi.extensibility.utils.test.mocks {
    // powerbi.extensibility
    import ILocalizationManager = powerbi.extensibility.ILocalizationManager;

    export class MockILocalizationManager implements ILocalizationManager  {
        private displayNames: {[key: string]: string};

        private static DefaultDispalyNames = {
            "Visual_General": "General",
            "Visual_General_Bins": "Bins",
            "Visual_DataColors": "Data colors",
            "Visual_DataColors_Fill": "Fill",
            "Visual_XAxis": "X-Axis",
            "Visual_Show": "Show",
            "Visual_Color": "Color",
            "Visual_Title": "Title",
            "Visual_DisplayUnits": "Display Units",
            "Visual_Precision": "Decimal Places",
            "Visual_Style": "Style",
            "Visual_Style_ShowTitleOnly": "Show title only",
            "Visual_Style_ShowUnitOnly": "Show unit only",
            "Visual_Style_ShowBoth": "Show both",
            "Visual_YAxis": "Y-Axis",
            "Visual_YAxis_Start": "Start",
            "Visual_YAxis_End": "End",
            "Visual_XAxis_Start": "Start",
            "Visual_XAxis_End": "End",
            "Visual_Position": "Position",
            "Visual_Position_Left": "Left",
            "Visual_Position_Right": "Right",
            "Visual_DataLabels": "Data Labels",
            "Visual_TextSize": "Text Size",
            "Visual_Values": "Values",
            "Visual_Frequency": "Frequency",
            "Visual_Fill": "Fill"
        };

        constructor(displayNames) {
            this.displayNames = displayNames || {};
        }

        getDisplayName(key: string): string {
            let displayName: string = this.displayNames[key];
            if (displayName) {
                return displayName;
            }

            let defaultDisplayNames: {[key: string]: string} = MockILocalizationManager.DefaultDispalyNames;
            displayName = defaultDisplayNames[key];

            return displayName || key;
        }
    }
}