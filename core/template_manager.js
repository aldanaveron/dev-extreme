/**
 * DevExtreme (core/template_manager.js)
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
exports.default = void 0;
var _renderer = require("./renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _type = require("./utils/type");
var _common = require("./utils/common");
var _extend = require("./utils/extend");
var _errors = require("./errors");
var _dom = require("./utils/dom");
var _function_template = require("./templates/function_template");
var _empty_template = require("./templates/empty_template");
var _inflector = require("./utils/inflector");
var _template_manager = require("./utils/template_manager");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}
var TEXT_NODE = 3;
var ANONYMOUS_TEMPLATE_NAME = "template";
var TEMPLATE_SELECTOR = '[data-options*="dxTemplate"]';
var TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
var DEPRECATED_WIDGET_NAMES = {
    button: true,
    tabs: true,
    dropDownMenu: true
};
var DX_POLYMORPH_WIDGET_TEMPLATE = new _function_template.FunctionTemplate(function(_ref) {
    var model = _ref.model,
        parent = _ref.parent;
    var widgetName = model.widget;
    if (!widgetName) {
        return (0, _renderer2.default)()
    }
    var widgetElement = (0, _renderer2.default)("<div>");
    var widgetOptions = model.options || {};
    if (DEPRECATED_WIDGET_NAMES[widgetName]) {
        var deprecatedName = widgetName;
        widgetName = (0, _inflector.camelize)("dx-" + widgetName);
        (0, _errors.log)("W0001", 'dxToolbar - "widget" item field', deprecatedName, "16.1", "Use: " + widgetName + "instead")
    }
    if (parent) {
        parent._createComponent(widgetElement, widgetName, widgetOptions)
    } else {
        widgetElement[widgetName](widgetOptions)
    }
    return widgetElement
});
var TemplateManager = function() {
    function TemplateManager(createElement, anonymousTemplateName) {
        _classCallCheck(this, TemplateManager);
        this._tempTemplates = [];
        this._defaultTemplates = {};
        this._anonymousTemplateName = anonymousTemplateName || ANONYMOUS_TEMPLATE_NAME;
        this._createElement = createElement || _template_manager.defaultCreateElement;
        this._createTemplateIfNeeded = this._createTemplateIfNeeded.bind(this)
    }
    _createClass(TemplateManager, [{
        key: "addDefaultTemplates",
        value: function(templates) {
            this._defaultTemplates = (0, _extend.extend)({}, this._defaultTemplates, templates)
        }
    }, {
        key: "dispose",
        value: function() {
            this._tempTemplates.forEach(function(tempTemplate) {
                tempTemplate.template.dispose && tempTemplate.template.dispose()
            });
            this._tempTemplates = []
        }
    }, {
        key: "extractTemplates",
        value: function($el) {
            var templates = this._extractTemplates($el);
            var anonymousTemplateMeta = this._extractAnonymousTemplate($el);
            return {
                templates: templates,
                anonymousTemplateMeta: anonymousTemplateMeta
            }
        }
    }, {
        key: "_extractTemplates",
        value: function($el) {
            var templateElements = $el.contents().filter(TEMPLATE_SELECTOR);
            var templatesMap = {};
            templateElements.each(function(_, template) {
                var templateOptions = (0, _dom.getElementOptions)(template).dxTemplate;
                if (!templateOptions) {
                    return
                }
                if (!templateOptions.name) {
                    throw (0, _errors.Error)("E0023")
                }(0, _renderer2.default)(template).addClass(TEMPLATE_WRAPPER_CLASS).detach();
                templatesMap[templateOptions.name] = templatesMap[templateOptions.name] || [];
                templatesMap[templateOptions.name].push(template)
            });
            var templates = [];
            for (var templateName in templatesMap) {
                var deviceTemplate = (0, _template_manager.findTemplateByDevice)(templatesMap[templateName]);
                if (deviceTemplate) {
                    templates.push({
                        name: templateName,
                        template: this._createTemplate(deviceTemplate)
                    })
                }
            }
            return templates
        }
    }, {
        key: "_extractAnonymousTemplate",
        value: function($el) {
            var $anonymousTemplate = $el.contents().detach();
            var $notJunkTemplateContent = $anonymousTemplate.filter(function(_, element) {
                var isTextNode = element.nodeType === TEXT_NODE;
                var isEmptyText = (0, _renderer2.default)(element).text().trim().length < 1;
                return !(isTextNode && isEmptyText)
            });
            return $notJunkTemplateContent.length > 0 ? {
                template: this._createTemplate($anonymousTemplate),
                name: this._anonymousTemplateName
            } : {}
        }
    }, {
        key: "_createTemplateIfNeeded",
        value: function(templateSource) {
            var cachedTemplate = this._tempTemplates.filter(function(tempTemplate) {
                return tempTemplate.source === (0, _template_manager.templateKey)(templateSource)
            })[0];
            if (cachedTemplate) {
                return cachedTemplate.template
            }
            var template = this._createTemplate(templateSource);
            this._tempTemplates.push({
                template: template,
                source: (0, _template_manager.templateKey)(templateSource)
            });
            return template
        }
    }, {
        key: "_createTemplate",
        value: function(templateSource) {
            return this._createElement((0, _template_manager.validateTemplateSource)(templateSource))
        }
    }, {
        key: "getTemplate",
        value: function(templateSource, templates, _ref2, context) {
            var _this = this;
            var isAsyncTemplate = _ref2.isAsyncTemplate,
                skipTemplates = _ref2.skipTemplates;
            if (!(0, _type.isFunction)(templateSource)) {
                return (0, _template_manager.acquireTemplate)(templateSource, this._createTemplateIfNeeded, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates)
            }
            return new _function_template.FunctionTemplate(function(options) {
                var templateSourceResult = templateSource.apply(context, (0, _template_manager.getNormalizedTemplateArgs)(options));
                if (!(0, _type.isDefined)(templateSourceResult)) {
                    return new _empty_template.EmptyTemplate
                }
                var dispose = false;
                var template = (0, _template_manager.acquireTemplate)(templateSourceResult, function(templateSource) {
                    if (templateSource.nodeType || (0, _type.isRenderer)(templateSource) && !(0, _renderer2.default)(templateSource).is("script")) {
                        return new _function_template.FunctionTemplate(function() {
                            return templateSource
                        })
                    }
                    dispose = true;
                    return _this._createTemplate(templateSource)
                }, templates, isAsyncTemplate, skipTemplates, _this._defaultTemplates);
                var result = template.render(options);
                dispose && template.dispose && template.dispose();
                return result
            })
        }
    }, {
        key: "anonymousTemplateName",
        get: function() {
            return this._anonymousTemplateName
        }
    }], [{
        key: "createDefaultOptions",
        value: function() {
            return {
                integrationOptions: {
                    watchMethod: function(fn, callback) {
                        var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        if (!options.skipImmediate) {
                            callback(fn())
                        }
                        return _common.noop
                    },
                    templates: {
                        "dx-polymorph-widget": DX_POLYMORPH_WIDGET_TEMPLATE
                    }
                }
            }
        }
    }]);
    return TemplateManager
}();
exports.default = TemplateManager;
