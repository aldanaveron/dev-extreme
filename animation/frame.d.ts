/**
* DevExtreme (animation/frame.d.ts)
* Version: 20.1.1
* Build date: Wed Mar 25 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid utils.cancelAnimationFrame
 * @publicName cancelAnimationFrame(requestID)
 * @type method
 * @param1 requestID:number
 * @namespace DevExpress.utils
 * @module animation/frame
 * @export cancel
 * @prevFileNamespace DevExpress.animation
 * @public
 */
export function cancelAnimationFrame(requestID: number): void;

/**
 * @docid utils.requestAnimationFrame
 * @publicName requestAnimationFrame(callback)
 * @type method
 * @param1 callback:function
 * @return number
 * @namespace DevExpress.utils
 * @module animation/frame
 * @export request
 * @prevFileNamespace DevExpress.animation
 * @public
 */
export function requestAnimationFrame(callback: Function): number;
