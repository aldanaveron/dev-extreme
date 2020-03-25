/**
* DevExtreme (core/set_template_engine.d.ts)
* Version: 20.1.1
* Build date: Wed Mar 25 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid setTemplateEngine
 * @publicName setTemplateEngine(name)
 * @param1 templateEngineName:string
 * @namespace DevExpress
 * @module core/set_template_engine
 * @export default
 * @prevFileNamespace DevExpress.core
 * @public
 */
declare function setTemplateEngine(templateEngineName: string): void;

/**
 * @docid setTemplateEngine
 * @publicName setTemplateEngine(options)
 * @param1 templateEngineOptions:object
 * @param1_field1 compile:function(html, $element)
 * @param1_field2 render:function(template, data, index)
 * @namespace DevExpress
 * @module core/set_template_engine
 * @export default
 * @prevFileNamespace DevExpress.core
 * @public
 */
declare function setTemplateEngine(templateEngineOptions: { compile?: Function, render?: Function }): void;


export default setTemplateEngine;
