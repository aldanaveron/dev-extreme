/**
* DevExtreme (core/templates/template.d.ts)
* Version: 20.1.1
* Build date: Wed Mar 25 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export interface dxTemplateOptions {
    /**
     * @docid dxTemplateOptions.name
     * @type string
     * @prevFileNamespace DevExpress.core
     * @public
     */
    name?: string;
}
/**
 * @docid dxTemplate
 * @section uiWidgetMarkupComponents
 * @type object
 * @prevFileNamespace DevExpress.core
 * @public
 */
export type dxTemplate = Template;
export class Template {
    constructor(options?: dxTemplateOptions)
}

/**
 * @docid template
 * @type String|function|Node|jQuery
 * @section Common
 * @prevFileNamespace DevExpress.core
 * @public
 */
export type template = string | Function | Element | JQuery;
