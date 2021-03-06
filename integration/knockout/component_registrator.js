/**
 * DevExtreme (integration/knockout/component_registrator.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _knockout = require("knockout");
var _knockout2 = _interopRequireDefault(_knockout);
var _callbacks = require("../../core/utils/callbacks");
var _callbacks2 = _interopRequireDefault(_callbacks);
var _errors = require("../../core/errors");
var _errors2 = _interopRequireDefault(_errors);
var _inflector = require("../../core/utils/inflector");
var _inflector2 = _interopRequireDefault(_inflector);
var _type = require("../../core/utils/type");
var _component_registrator_callbacks = require("../../core/component_registrator_callbacks");
var _component_registrator_callbacks2 = _interopRequireDefault(_component_registrator_callbacks);
var _ui = require("../../ui/widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _template = require("./template");
var _editor = require("../../ui/editor/editor");
var _editor2 = _interopRequireDefault(_editor);
var _locker = require("../../core/utils/locker");
var _locker2 = _interopRequireDefault(_locker);
var _utils = require("./utils");
var _config = require("../../core/config");
var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var LOCKS_DATA_KEY = "dxKoLocks";
var CREATED_WITH_KO_DATA_KEY = "dxKoCreation";
var editorsBindingHandlers = [];
var registerComponentKoBinding = function(componentName, componentClass) {
    if (componentClass.subclassOf(_editor2.default)) {
        editorsBindingHandlers.push(componentName)
    }
    _knockout2.default.bindingHandlers[componentName] = {
        init: function(domNode, valueAccessor) {
            var $element = (0, _renderer2.default)(domNode);
            var optionChangedCallbacks = (0, _callbacks2.default)();
            var optionsByReference = {};
            var component;
            var knockoutConfig = (0, _config2.default)().knockout;
            var isBindingPropertyPredicateName = knockoutConfig && knockoutConfig.isBindingPropertyPredicateName;
            var isBindingPropertyPredicate;
            var ctorOptions = {
                onInitializing: function() {
                    optionsByReference = this._getOptionsByReference();
                    _knockout2.default.computed(function() {
                        var model = _knockout2.default.unwrap(valueAccessor());
                        if (component) {
                            component.beginUpdate()
                        }
                        isBindingPropertyPredicate = isBindingPropertyPredicateName && model && model[isBindingPropertyPredicateName];
                        unwrapModel(model);
                        if (component) {
                            component.endUpdate()
                        }
                    }, null, {
                        disposeWhenNodeIsRemoved: domNode
                    });
                    component = this
                },
                modelByElement: function($element) {
                    if ($element.length) {
                        var node = (0, _utils.getClosestNodeWithContext)($element.get(0));
                        return _knockout2.default.dataFor(node)
                    }
                },
                nestedComponentOptions: function(component) {
                    return {
                        modelByElement: component.option("modelByElement"),
                        nestedComponentOptions: component.option("nestedComponentOptions")
                    }
                },
                _optionChangedCallbacks: optionChangedCallbacks,
                integrationOptions: {
                    watchMethod: function(fn, callback, options) {
                        options = options || {};
                        var skipCallback = options.skipImmediate;
                        var watcher = _knockout2.default.computed(function() {
                            var newValue = _knockout2.default.unwrap(fn());
                            if (!skipCallback) {
                                callback(newValue)
                            }
                            skipCallback = false
                        });
                        return function() {
                            watcher.dispose()
                        }
                    },
                    templates: {
                        "dx-polymorph-widget": {
                            render: function(options) {
                                var widgetName = _knockout2.default.utils.unwrapObservable(options.model.widget);
                                if (!widgetName) {
                                    return
                                }
                                if ("button" === widgetName || "tabs" === widgetName || "dropDownMenu" === widgetName) {
                                    var deprecatedName = widgetName;
                                    widgetName = _inflector2.default.camelize("dx-" + widgetName);
                                    _errors2.default.log("W0001", "dxToolbar - 'widget' item field", deprecatedName, "16.1", "Use: '" + widgetName + "' instead")
                                }
                                var markup = (0, _renderer2.default)("<div>").attr("data-bind", widgetName + ": options").get(0);
                                (0, _renderer2.default)(options.container).append(markup);
                                _knockout2.default.applyBindings(options.model, markup)
                            }
                        }
                    },
                    createTemplate: function(element) {
                        return new _template.KoTemplate(element)
                    }
                }
            };
            var optionNameToModelMap = {};
            var applyModelValueToOption = function(optionName, modelValue, unwrap) {
                var locks = $element.data(LOCKS_DATA_KEY);
                var optionValue = unwrap ? _knockout2.default.unwrap(modelValue) : modelValue;
                if (_knockout2.default.isWriteableObservable(modelValue)) {
                    optionNameToModelMap[optionName] = modelValue
                }
                if (component) {
                    if (locks.locked(optionName)) {
                        return
                    }
                    locks.obtain(optionName);
                    try {
                        if (_knockout2.default.ignoreDependencies) {
                            _knockout2.default.ignoreDependencies(component.option, component, [optionName, optionValue])
                        } else {
                            component.option(optionName, optionValue)
                        }
                    } finally {
                        locks.release(optionName)
                    }
                } else {
                    ctorOptions[optionName] = optionValue
                }
            };
            var handleOptionChanged = function(args) {
                var optionName = args.fullName;
                var optionValue = args.value;
                if (!(optionName in optionNameToModelMap)) {
                    return
                }
                var $element = this._$element;
                var locks = $element.data(LOCKS_DATA_KEY);
                if (locks.locked(optionName)) {
                    return
                }
                locks.obtain(optionName);
                try {
                    optionNameToModelMap[optionName](optionValue)
                } finally {
                    locks.release(optionName)
                }
            };
            var createComponent = function() {
                optionChangedCallbacks.add(handleOptionChanged);
                $element.data(CREATED_WITH_KO_DATA_KEY, true).data(LOCKS_DATA_KEY, new _locker2.default);
                new componentClass($element, ctorOptions);
                ctorOptions = null
            };
            var unwrapModelValue = function(currentModel, propertyName, propertyPath) {
                if (propertyPath === isBindingPropertyPredicateName) {
                    return
                }
                if (!isBindingPropertyPredicate || isBindingPropertyPredicate(propertyPath, propertyName, currentModel)) {
                    var unwrappedPropertyValue;
                    _knockout2.default.computed(function() {
                        var propertyValue = currentModel[propertyName];
                        applyModelValueToOption(propertyPath, propertyValue, true);
                        unwrappedPropertyValue = _knockout2.default.unwrap(propertyValue)
                    }, null, {
                        disposeWhenNodeIsRemoved: domNode
                    });
                    if ((0, _type.isPlainObject)(unwrappedPropertyValue)) {
                        if (!optionsByReference[propertyPath]) {
                            unwrapModel(unwrappedPropertyValue, propertyPath)
                        }
                    }
                } else {
                    applyModelValueToOption(propertyPath, currentModel[propertyName], false)
                }
            };

            function unwrapModel(model, propertyPath) {
                for (var propertyName in model) {
                    if (Object.prototype.hasOwnProperty.call(model, propertyName)) {
                        unwrapModelValue(model, propertyName, propertyPath ? [propertyPath, propertyName].join(".") : propertyName)
                    }
                }
            }
            createComponent();
            return {
                controlsDescendantBindings: componentClass.subclassOf(_ui2.default)
            }
        }
    };
    if ("dxValidator" === componentName) {
        _knockout2.default.bindingHandlers.dxValidator.after = editorsBindingHandlers
    }
};
_component_registrator_callbacks2.default.add(function(name, componentClass) {
    registerComponentKoBinding(name, componentClass)
});
