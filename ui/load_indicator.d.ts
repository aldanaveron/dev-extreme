/**
* DevExtreme (ui/load_indicator.d.ts)
* Version: 20.1.1
* Build date: Wed Mar 25 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Widget, {
    WidgetOptions
} from './widget/ui.widget';

export interface dxLoadIndicatorOptions extends WidgetOptions<dxLoadIndicator> {
    /**
     * @docid dxLoadIndicatorOptions.indicatorSrc
     * @type string
     * @default ""
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    indicatorSrc?: string;
}
/**
 * @docid dxLoadIndicator
 * @inherits Widget
 * @module ui/load_indicator
 * @export default
 * @prevFileNamespace DevExpress.ui
 * @public
 */
export default class dxLoadIndicator extends Widget {
    constructor(element: Element, options?: dxLoadIndicatorOptions)
    constructor(element: JQuery, options?: dxLoadIndicatorOptions)
}

declare global {
interface JQuery {
    dxLoadIndicator(): JQuery;
    dxLoadIndicator(options: "instance"): dxLoadIndicator;
    dxLoadIndicator(options: string): any;
    dxLoadIndicator(options: string, ...params: any[]): any;
    dxLoadIndicator(options: dxLoadIndicatorOptions): JQuery;
}
}
export type Options = dxLoadIndicatorOptions;

/** @deprecated use Options instead */
export type IOptions = dxLoadIndicatorOptions;