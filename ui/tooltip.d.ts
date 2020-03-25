/**
* DevExtreme (ui/tooltip.d.ts)
* Version: 20.1.1
* Build date: Wed Mar 25 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxPopover, {
    dxPopoverOptions
} from './popover';

export interface dxTooltipOptions extends dxPopoverOptions<dxTooltip> {
}
/**
 * @docid dxTooltip
 * @inherits dxPopover
 * @hasTranscludedContent
 * @module ui/tooltip
 * @export default
 * @prevFileNamespace DevExpress.ui
 * @public
 */
export default class dxTooltip extends dxPopover {
    constructor(element: Element, options?: dxTooltipOptions)
    constructor(element: JQuery, options?: dxTooltipOptions)
}

declare global {
interface JQuery {
    dxTooltip(): JQuery;
    dxTooltip(options: "instance"): dxTooltip;
    dxTooltip(options: string): any;
    dxTooltip(options: string, ...params: any[]): any;
    dxTooltip(options: dxTooltipOptions): JQuery;
}
}
export type Options = dxTooltipOptions;

/** @deprecated use Options instead */
export type IOptions = dxTooltipOptions;