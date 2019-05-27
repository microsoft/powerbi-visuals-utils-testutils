import { MockILocale } from "./mocks/mockILocale";
import { MockIAllowInteractions } from "./mocks/mockIAllowInteractions";
import { MockITooltipService } from "./mocks/mockITooltipService";
import { MockISelectionManager } from "./mocks/mockISelectionManager";
import { MockISelectionIdBuilder } from "./mocks/mockISelectionIdBuilder";
import { MockIAuthenticationService } from "./mocks/mockIAuthenticationService";
import { MockITelemetryService } from "./mocks/mockITelemetryService";
import { MockILocalizationManager } from "./mocks/mockILocalizationManager";
import { MockISelectionId } from "./mocks/mockISelectionId";
import { MockIColorPalette } from "./mocks/mockIColorPalette";
import { MockIVisualHost } from "./mocks/mockVisualHost";

import {
    testDom,
    createContextMenuEvent,
    createMouseEvent,
    createTouch,
    createTouchesList,
    createTouchEndEvent,
    createTouchMoveEvent,
    createTouchStartEvent,
    getRandomNumber,
    getRandomNumbers,
    clickElement,
    ClickEventType,
    MouseEventType
} from "./helpers/helpers";

import {
    assertColorsMatch,
    getSolidColorStructuralObject,
    RgbColor,
    parseColorString
} from "./helpers/color";

import {
    d3Click,
    d3TouchStart,
    d3TouchMove,
    d3TouchEnd,
    d3ContextMenu,
    d3MouseDown,
    d3MouseUp,
    d3MouseOver,
    d3MouseMove,
    d3MouseOut,
    d3KeyEvent
} from "./helpers/helpers";

import {
    renderTimeout
} from "./helpers/visualTestHelpers";

import {
    createVisualHost,
    createSelectionId,
    createAllowInteractions,
    createColorPalette,
    createLocale,
    createSelectionIdBuilder,
    createSelectionManager,
    createTooltipService
} from "./mocks/mocks";
import { setGrouped, createValueColumns, createCategoricalDataViewBuilder } from "./dataViewBuilder/dataViewBuilder";
import * as testDataViewBuilder from "./dataViewBuilder/testDataViewBuilder";
import * as visualBuilderBase from "./VisualBuilderBase";
import VisualBuilderBase = visualBuilderBase.VisualBuilderBase;

export {
    testDom,
    createContextMenuEvent,
    createMouseEvent,
    createTouch,
    createTouchesList,
    createTouchEndEvent,
    createTouchMoveEvent,
    createTouchStartEvent,
    clickElement,
    createVisualHost,
    createSelectionId,
    createAllowInteractions,
    createColorPalette,
    createLocale,
    createSelectionIdBuilder,
    createSelectionManager,
    createTooltipService,
    setGrouped,
    createValueColumns,
    createCategoricalDataViewBuilder,
    VisualBuilderBase,
    testDataViewBuilder,
    getRandomNumber,
    getRandomNumbers,
    MockILocale,
    MockIAllowInteractions,
    MockITooltipService,
    MockISelectionManager,
    MockISelectionIdBuilder,
    MockIAuthenticationService,
    MockITelemetryService,
    MockILocalizationManager,
    MockISelectionId,
    MockIColorPalette,
    MockIVisualHost,
    renderTimeout,
    assertColorsMatch,
    getSolidColorStructuralObject,
    RgbColor,
    parseColorString,

    d3Click,
    d3TouchStart,
    d3TouchMove,
    d3TouchEnd,
    d3ContextMenu,
    d3MouseDown,
    d3MouseUp,
    d3MouseOver,
    d3MouseMove,
    d3MouseOut,
    d3KeyEvent,

    ClickEventType,
    MouseEventType
};