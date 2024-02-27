import { MockILocale } from "./mocks/mockILocale";
import { MockITooltipService } from "./mocks/mockITooltipService";
import { MockISelectionManager } from "./mocks/mockISelectionManager";
import { MockISelectionIdBuilder } from "./mocks/mockISelectionIdBuilder";
import { MockIAuthenticationService } from "./mocks/mockIAuthenticationService";
import { MockITelemetryService } from "./mocks/mockITelemetryService";
import { MockILocalizationManager } from "./mocks/mockILocalizationManager";
import { MockISelectionId } from "./mocks/mockISelectionId";
import { MockIColorPalette } from "./mocks/mockIColorPalette";
import { MockIVisualHost } from "./mocks/mockVisualHost";
import { MockIEventService } from "./mocks/mockIEventService";
import { MockIStorageService } from "./mocks/mockIStorageService";
import { MockIStorageV2Service } from "./mocks/mockIStorageV2Service";
import { MockHostCapabilities } from "./mocks/mockHostCapabilities";
import { MockDownloadService } from "./mocks/mockDownloadService";
import { MockIVisualLicenseManager } from "./mocks/mockIVisualLicenseManager";
import { MockIWebAccessService } from "./mocks/mockIWebAccessService";
import { MockIAcquireAADTokenService } from "./mocks/mockIAcquireAADTokenService";
import { MockSubSelectionService } from "./mocks/mockSubSelectionService";

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
    PointerEventType,
    PointerType,
    pointerEvent,
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
    createColorPalette,
    createLocale,
    createSelectionIdBuilder,
    createSelectionManager,
    createTooltipService,
    createHostCapabilities,
    CreateVisualHostOptions
} from "./mocks/mocks";
import { setGrouped, createValueColumns, createCategoricalDataViewBuilder } from "./dataViewBuilder/dataViewBuilder";
import { MatrixDataViewBuilder} from "./dataViewBuilder/matrixBuilder";
import * as testDataViewBuilder from "./dataViewBuilder/testDataViewBuilder";
import * as visualBuilderBase from "./VisualBuilderBase";
import VisualBuilderBase = visualBuilderBase.VisualBuilderBase;

export {
    MatrixDataViewBuilder,

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
    createColorPalette,
    createLocale,
    createSelectionIdBuilder,
    createSelectionManager,
    createTooltipService,
    createHostCapabilities,
    CreateVisualHostOptions,
    setGrouped,
    createValueColumns,
    createCategoricalDataViewBuilder,
    VisualBuilderBase,
    testDataViewBuilder,
    getRandomNumber,
    getRandomNumbers,
    MockILocale,
    MockITooltipService,
    MockISelectionManager,
    MockISelectionIdBuilder,
    MockIAuthenticationService,
    MockITelemetryService,
    MockILocalizationManager,
    MockISelectionId,
    MockIColorPalette,
    MockIVisualHost,
    MockIEventService,
    MockIStorageService,
    MockIStorageV2Service,
    MockHostCapabilities,
    MockDownloadService,
    MockIVisualLicenseManager,
    MockIWebAccessService,
    MockIAcquireAADTokenService,
    MockSubSelectionService,
    renderTimeout,
    assertColorsMatch,
    getSolidColorStructuralObject,
    RgbColor,
    parseColorString,

    d3Click,
    d3TouchStart,
    d3TouchMove,
    d3TouchEnd,
    PointerEventType,
    PointerType,
    pointerEvent,
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