/// <reference types="jquery" />
export declare function testDom(height: number | string, width: number | string): JQuery;
export declare enum ClickEventType {
    Default = 0,
    CtrlKey = 1,
    AltKey = 2,
    ShiftKey = 4,
    MetaKey = 8,
}
export declare enum MouseEventType {
    click = 0,
    mousedown = 1,
    mouseup = 2,
    mouseover = 3,
    mousemove = 4,
    mouseout = 5,
}
export declare function d3Click(element: JQuery, x: number, y: number, eventType?: ClickEventType, button?: number): void;
export declare function d3MouseDown(element: JQuery, x: number, y: number, eventType?: ClickEventType, button?: number): void;
export declare function d3MouseUp(element: JQuery, x: number, y: number, eventType?: ClickEventType, button?: number): void;
export declare function d3MouseOver(element: JQuery, x: number, y: number, eventType?: ClickEventType, button?: number): void;
export declare function d3MouseMove(element: JQuery, x: number, y: number, eventType?: ClickEventType, button?: number): void;
export declare function d3MouseOut(element: JQuery, x: number, y: number, eventType?: ClickEventType, button?: number): void;
export declare function d3KeyEvent(element: JQuery, typeArg: string, keyArg: string, keyCode: number): void;
export declare function d3TouchStart(element: JQuery, touchList?: TouchList): void;
export declare function d3TouchMove(element: JQuery, touchList?: TouchList): void;
export declare function d3TouchEnd(element: JQuery, touchList?: TouchList): void;
export declare function d3ContextMenu(element: JQuery, x: number, y: number): void;
/**
 * Creates mouse event
 * @param eventType {ClickEventType}.
 * @param x clientX.
 * @param y clientY.
 * @param eventName {string} Event name e.g click, mousedown ...
 */
export declare function createMouseEvent(mouseEventType: MouseEventType, eventType: ClickEventType, x: number, y: number, button?: number): MouseEvent;
export declare function createTouchStartEvent(touchList?: TouchList): UIEvent;
export declare function createTouchMoveEvent(touchList?: TouchList): UIEvent;
export declare function createTouchEndEvent(touchList?: TouchList): UIEvent;
export declare function createContextMenuEvent(x: number, y: number): MouseEvent;
export declare function createTouchesList(touches: Touch[]): TouchList;
export declare function createTouch(x: number, y: number, element: JQuery, id?: number): Touch;
export declare function clickElement(element: JQuery, ctrlKey?: boolean): void;
/**
 * Forces all D3 transitions to complete.
 * Normally, zero-delay transitions are executed after an instantaneous delay (<10ms).
 * This can cause a brief flicker if the browser renders the page twice: once at the end of the first event loop,
 * then again immediately on the first timer callback. By flushing the timer queue at the end of the first event loop,
 * you can run any zero-delay transitions immediately and avoid the flicker.
 *
 * These flickers are noticable on IE, and with a large number of webviews(not recommend you ever do this) on iOS.
 */
export declare function flushAllD3Transitions(): void;
export declare function getRandomNumbers(count: number, min?: number, max?: number): number[];
export declare function getRandomNumber(min: number, max: number, exceptionList?: number[], changeResult?: (value: any) => number): number;
export interface JQuery3dClicks extends JQuery {
    d3Click(x: number, y: number, eventType?: ClickEventType, button?: number): void;
    d3TouchStart(touchList?: TouchList): void;
    d3TouchMove(touchList?: TouchList): void;
    d3TouchEnd(touchList?: TouchList): void;
    d3ContextMenu(x: number, y: number): void;
    d3MouseDown(x: number, y: number, eventType?: ClickEventType, button?: number): void;
    d3MouseUp(x: number, y: number, eventType?: ClickEventType, button?: number): void;
    d3MouseOver(x: number, y: number, eventType?: ClickEventType, button?: number): void;
    d3MouseMove(x: number, y: number, eventType?: ClickEventType, button?: number): void;
    d3MouseOut(x: number, y: number, eventType?: ClickEventType, button?: number): void;
    d3KeyEvent(typeArg: string, keyArg: string, keyCode: number): void;
}
