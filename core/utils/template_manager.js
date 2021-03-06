/**
 * DevExtreme (core/utils/template_manager.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.acquireTemplate = exports.acquireIntegrationTemplate = exports.defaultCreateElement = exports.templateKey = exports.validateTemplateSource = exports.getNormalizedTemplateArgs = exports.addOneRenderedCall = exports.findTemplateByDevice = void 0;
var _renderer = require("../renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _type = require("./type");
var _common = require("./common");
var _extend = require("./extend");
var _child_default_template = require("../templates/child_default_template");
var _template_base = require("../templates/template_base");
var _empty_template = require("../templates/empty_template");
var _dom = require("./dom");
var _devices = require("../devices");
var _devices2 = _interopRequireDefault(_devices);
var _template = require("../templates/template");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var findTemplateByDevice = exports.findTemplateByDevice = function(templates) {
    var suitableTemplate = (0, _common.findBestMatches)(_devices2.default.current(), templates, function(template) {
        return (0, _dom.getElementOptions)(template).dxTemplate
    })[0];
    templates.forEach(function(template) {
        if (template !== suitableTemplate) {
            (0, _renderer2.default)(template).remove()
        }
    });
    return suitableTemplate
};
var addOneRenderedCall = exports.addOneRenderedCall = function(template) {
    var _render = template.render.bind(template);
    return (0, _extend.extend)({}, template, {
        render: function(options) {
            var templateResult = _render(options);
            options && options.onRendered && options.onRendered();
            return templateResult
        }
    })
};
var getNormalizedTemplateArgs = exports.getNormalizedTemplateArgs = function(options) {
    var args = [];
    if ("model" in options) {
        args.push(options.model)
    }
    if ("index" in options) {
        args.push(options.index)
    }
    args.push(options.container);
    return args
};
var validateTemplateSource = exports.validateTemplateSource = function(templateSource) {
    return "string" === typeof templateSource ? (0, _dom.normalizeTemplateElement)(templateSource) : templateSource
};
var templateKey = exports.templateKey = function(templateSource) {
    return (0, _type.isRenderer)(templateSource) && templateSource[0] || templateSource
};
var defaultCreateElement = exports.defaultCreateElement = function(element) {
    return new _template.Template(element)
};
var acquireIntegrationTemplate = exports.acquireIntegrationTemplate = function(templateSource, templates, isAsyncTemplate, skipTemplates) {
    var integrationTemplate = null;
    if (!skipTemplates || skipTemplates.indexOf(templateSource) === -1) {
        integrationTemplate = templates[templateSource];
        if (integrationTemplate && !(integrationTemplate instanceof _template_base.TemplateBase) && !isAsyncTemplate) {
            integrationTemplate = addOneRenderedCall(integrationTemplate)
        }
    }
    return integrationTemplate
};
var acquireTemplate = exports.acquireTemplate = function(templateSource, createTemplate, templates, isAsyncTemplate, skipTemplates, defaultTemplates) {
    if (null == templateSource) {
        return new _empty_template.EmptyTemplate
    }
    if (templateSource instanceof _child_default_template.ChildDefaultTemplate) {
        return defaultTemplates[templateSource.name]
    }
    if (templateSource instanceof _template_base.TemplateBase) {
        return templateSource
    }
    if ((0, _type.isFunction)(templateSource.render) && !(0, _type.isRenderer)(templateSource)) {
        return addOneRenderedCall(templateSource)
    }
    if (templateSource.nodeType || (0, _type.isRenderer)(templateSource)) {
        return createTemplate((0, _renderer2.default)(templateSource))
    }
    return acquireIntegrationTemplate(templateSource, templates, isAsyncTemplate, skipTemplates) || defaultTemplates[templateSource] || createTemplate(templateSource)
};
