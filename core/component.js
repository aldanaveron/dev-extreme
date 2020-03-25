/**
 * DevExtreme (core/component.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _config = require("./config");
var _config2 = _interopRequireDefault(_config);
var _extend = require("./utils/extend");
var _index = require("./options/index");
var _utils = require("./options/utils");
var _class = require("./class");
var _class2 = _interopRequireDefault(_class);
var _action = require("./action");
var _action2 = _interopRequireDefault(_action);
var _errors = require("./errors");
var _errors2 = _interopRequireDefault(_errors);
var _callbacks = require("./utils/callbacks");
var _callbacks2 = _interopRequireDefault(_callbacks);
var _events_strategy = require("./events_strategy");
var _public_component = require("./utils/public_component");
var _public_component2 = _interopRequireDefault(_public_component);
var _postponed_operations = require("./postponed_operations");
var _type = require("./utils/type");
var _common = require("./utils/common");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var getEventName = function(actionName) {
    return actionName.charAt(2).toLowerCase() + actionName.substr(3)
};
var Component = _class2.default.inherit({
    _setDeprecatedOptions: function() {
        this._deprecatedOptions = {}
    },
    _getDeprecatedOptions: function() {
        return this._deprecatedOptions
    },
    _getDefaultOptions: function() {
        return {
            onInitialized: null,
            onOptionChanged: null,
            onDisposing: null,
            defaultOptionsRules: null
        }
    },
    _defaultOptionsRules: function() {
        return []
    },
    _setOptionsByDevice: function(rules) {
        this._options.applyRules(rules)
    },
    _convertRulesToOptions: function(rules) {
        return (0, _utils.convertRulesToOptions)(rules)
    },
    _isInitialOptionValue: function(name) {
        return this._options.isInitial(name)
    },
    _setOptionsByReference: function() {
        this._optionsByReference = {}
    },
    _getOptionsByReference: function() {
        return this._optionsByReference
    },
    ctor: function() {
        var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        var _optionChangedCallbacks = options._optionChangedCallbacks,
            _disposingCallbacks = options._disposingCallbacks;
        this.NAME = _public_component2.default.name(this.constructor);
        this._eventsStrategy = _events_strategy.EventsStrategy.create(this, options.eventsStrategy);
        this._updateLockCount = 0;
        this._optionChangedCallbacks = _optionChangedCallbacks || (0, _callbacks2.default)();
        this._disposingCallbacks = _disposingCallbacks || (0, _callbacks2.default)();
        this.postponedOperations = new _postponed_operations.PostponedOperations;
        this._createOptions(options)
    },
    _createOptions: function(options) {
        var _this = this;
        this.beginUpdate();
        try {
            this._setOptionsByReference();
            this._setDeprecatedOptions();
            this._options = new _index.Options(this._getDefaultOptions(), this._getDefaultOptions(), this._getOptionsByReference(), this._getDeprecatedOptions());
            this._options.onChanging(function(name, previousValue, value) {
                return _this._initialized && _this._optionChanging(name, previousValue, value)
            });
            this._options.onDeprecated(function(option, info) {
                return _this._logDeprecatedOptionWarning(option, info)
            });
            this._options.onChanged(function(name, value, previousValue) {
                return _this._notifyOptionChanged(name, value, previousValue)
            });
            this._options.onStartChange(function() {
                return _this.beginUpdate()
            });
            this._options.onEndChange(function() {
                return _this.endUpdate()
            });
            this._options.addRules(this._defaultOptionsRules());
            if (options && options.onInitializing) {
                options.onInitializing.apply(this, [options])
            }
            this._setOptionsByDevice(options.defaultOptionsRules);
            this._initOptions(options)
        } finally {
            this.endUpdate()
        }
    },
    _initOptions: function(options) {
        this.option(options)
    },
    _init: function() {
        var _this2 = this;
        this._createOptionChangedAction();
        this.on("disposing", function(args) {
            _this2._disposingCallbacks.fireWith(_this2, [args])
        })
    },
    _logDeprecatedOptionWarning: function(option, info) {
        var message = info.message || "Use the '".concat(info.alias, "' option instead");
        _errors2.default.log("W0001", this.NAME, option, info.since, message)
    },
    _logDeprecatedComponentWarning: function(since, alias) {
        _errors2.default.log("W0000", this.NAME, since, "Use the '".concat(alias, "' widget instead"))
    },
    _createOptionChangedAction: function() {
        this._optionChangedAction = this._createActionByOption("onOptionChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _createDisposingAction: function() {
        this._disposingAction = this._createActionByOption("onDisposing", {
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "onDisposing":
            case "onInitialized":
                break;
            case "onOptionChanged":
                this._createOptionChangedAction();
                break;
            case "defaultOptionsRules":
        }
    },
    _dispose: function() {
        this._optionChangedCallbacks.empty();
        this._createDisposingAction();
        this._disposingAction();
        this._eventsStrategy.dispose();
        this._options.dispose();
        this._disposed = true
    },
    _lockUpdate: function() {
        this._updateLockCount++
    },
    _unlockUpdate: function() {
        this._updateLockCount = Math.max(this._updateLockCount - 1, 0)
    },
    _isUpdateAllowed: function() {
        return 0 === this._updateLockCount
    },
    _isInitializingRequired: function() {
        return !this._initializing && !this._initialized
    },
    _commitUpdate: function() {
        this.postponedOperations.callPostponedOperations();
        this._isInitializingRequired() && this._initializeComponent()
    },
    _initializeComponent: function() {
        this._initializing = true;
        try {
            this._init()
        } finally {
            this._initializing = false;
            this._lockUpdate();
            this._createActionByOption("onInitialized", {
                excludeValidators: ["disabled", "readOnly"]
            })();
            this._unlockUpdate();
            this._initialized = true
        }
    },
    instance: function() {
        return this
    },
    beginUpdate: function() {
        this._lockUpdate()
    },
    endUpdate: function() {
        this._unlockUpdate();
        this._isUpdateAllowed() && this._commitUpdate()
    },
    _optionChanging: _common.noop,
    _notifyOptionChanged: function(option, value, previousValue) {
        if (this._initialized) {
            var optionNames = [option].concat(this._options.getAliasesByName(option));
            for (var i = 0; i < optionNames.length; i++) {
                var name = optionNames[i];
                var args = {
                    name: name.split(/[.[]/)[0],
                    fullName: name,
                    value: value,
                    previousValue: previousValue
                };
                this._optionChangedCallbacks.fireWith(this, [(0, _extend.extend)(this._defaultActionArgs(), args)]);
                this._optionChangedAction((0, _extend.extend)({}, args));
                if (!this._disposed && this._cancelOptionChange !== args.name) {
                    this._optionChanged(args)
                }
            }
        }
    },
    initialOption: function(name) {
        return this._options.initial(name)
    },
    _defaultActionConfig: function() {
        return {
            context: this,
            component: this
        }
    },
    _defaultActionArgs: function() {
        return {
            component: this
        }
    },
    _createAction: function(actionSource, config) {
        var _this3 = this;
        var action;
        return function(e) {
            if (!(0, _type.isDefined)(e)) {
                e = {}
            }
            if (!(0, _type.isPlainObject)(e)) {
                e = {
                    actionValue: e
                }
            }
            action = action || new _action2.default(actionSource, (0, _extend.extend)(config, _this3._defaultActionConfig()));
            return action.execute.call(action, (0, _extend.extend)(e, _this3._defaultActionArgs()))
        }
    },
    _createActionByOption: function(optionName, config) {
        var _this4 = this;
        var action;
        var eventName;
        var actionFunc;
        var result = function() {
            if (!eventName) {
                config = config || {};
                if ("string" !== typeof optionName) {
                    throw _errors2.default.Error("E0008")
                }
                if (0 === optionName.indexOf("on")) {
                    eventName = getEventName(optionName)
                }
                actionFunc = _this4.option(optionName)
            }
            if (!action && !actionFunc && !config.beforeExecute && !config.afterExecute && !_this4._eventsStrategy.hasEvent(eventName)) {
                return
            }
            if (!action) {
                var beforeExecute = config.beforeExecute;
                config.beforeExecute = function() {
                    for (var _len2 = arguments.length, props = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        props[_key2] = arguments[_key2]
                    }
                    beforeExecute && beforeExecute.apply(_this4, props);
                    _this4._eventsStrategy.fireEvent(eventName, props[0].args)
                };
                action = _this4._createAction(actionFunc, config)
            }
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key]
            }
            if ((0, _config2.default)().wrapActionsBeforeExecute) {
                var beforeActionExecute = _this4.option("beforeActionExecute") || _common.noop;
                var wrappedAction = beforeActionExecute(_this4, action, config) || action;
                return wrappedAction.apply(_this4, args)
            }
            return action.apply(_this4, args)
        };
        if ((0, _config2.default)().wrapActionsBeforeExecute) {
            return result
        }
        var onActionCreated = this.option("onActionCreated") || _common.noop;
        return onActionCreated(this, result, config) || result
    },
    on: function(eventName, eventHandler) {
        this._eventsStrategy.on(eventName, eventHandler);
        return this
    },
    off: function(eventName, eventHandler) {
        this._eventsStrategy.off(eventName, eventHandler);
        return this
    },
    hasActionSubscription: function(actionName) {
        return !!this._options.silent(actionName) || this._eventsStrategy.hasEvent(getEventName(actionName))
    },
    isOptionDeprecated: function(name) {
        return this._options.isDeprecated(name)
    },
    _setOptionWithoutOptionChange: function(name, value) {
        this._cancelOptionChange = name;
        this.option(name, value);
        this._cancelOptionChange = false
    },
    _getOptionValue: function(name, context) {
        var value = this.option(name);
        if ((0, _type.isFunction)(value)) {
            return value.bind(context)()
        }
        return value
    },
    option: function() {
        var _this$_options;
        return (_this$_options = this._options).option.apply(_this$_options, arguments)
    },
    resetOption: function(name) {
        this.beginUpdate();
        this._options.reset(name);
        this.endUpdate()
    }
});
module.exports = Component;
