/**
 * DevExtreme (core/action.js)
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
var _config = require("./config");
var _config2 = _interopRequireDefault(_config);
var _window = require("./utils/window");
var _type = require("./utils/type");
var _iterator = require("./utils/iterator");
var _errors = require("./errors");
var _errors2 = _interopRequireDefault(_errors);

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
var Action = function() {
    function Action(action, config) {
        _classCallCheck(this, Action);
        config = config || {};
        this._action = action;
        this._context = config.context || (0, _window.getWindow)();
        this._beforeExecute = config.beforeExecute;
        this._afterExecute = config.afterExecute;
        this._component = config.component;
        this._validatingTargetName = config.validatingTargetName;
        var excludeValidators = this._excludeValidators = {};
        if (config.excludeValidators) {
            for (var i = 0; i < config.excludeValidators.length; i++) {
                excludeValidators[config.excludeValidators[i]] = true
            }
        }
    }
    _createClass(Action, [{
        key: "execute",
        value: function() {
            var e = {
                action: this._action,
                args: Array.prototype.slice.call(arguments),
                context: this._context,
                component: this._component,
                validatingTargetName: this._validatingTargetName,
                cancel: false,
                handled: false
            };
            var beforeExecute = this._beforeExecute;
            var afterExecute = this._afterExecute;
            var argsBag = e.args[0] || {};
            if (!("jQueryEvent" in argsBag) && argsBag.event && (0, _config2.default)().useJQuery) {
                Object.defineProperty(argsBag, "jQueryEvent", {
                    get: function() {
                        _errors2.default.log("W0003", "Handler argument", "jQueryEvent", "17.2", "Use the 'event' field instead");
                        return argsBag.event
                    },
                    set: function(value) {
                        _errors2.default.log("W0003", "Handler argument", "jQueryEvent", "17.2", "Use the 'event' field instead");
                        argsBag.event = value
                    }
                })
            }
            if (!this._validateAction(e)) {
                return
            }
            null === beforeExecute || void 0 === beforeExecute ? void 0 : beforeExecute.call(this._context, e);
            if (e.cancel) {
                return
            }
            var result = this._executeAction(e);
            if (argsBag.cancel) {
                return
            }
            null === afterExecute || void 0 === afterExecute ? void 0 : afterExecute.call(this._context, e);
            return result
        }
    }, {
        key: "_validateAction",
        value: function(e) {
            var excludeValidators = this._excludeValidators;
            var executors = Action.executors;
            for (var name in executors) {
                if (!excludeValidators[name]) {
                    var _executor$validate;
                    var executor = executors[name];
                    null === (_executor$validate = executor.validate) || void 0 === _executor$validate ? void 0 : _executor$validate.call(executor, e);
                    if (e.cancel) {
                        return false
                    }
                }
            }
            return true
        }
    }, {
        key: "_executeAction",
        value: function(e) {
            var result;
            var executors = Action.executors;
            for (var name in executors) {
                var _executor$execute;
                var executor = executors[name];
                null === (_executor$execute = executor.execute) || void 0 === _executor$execute ? void 0 : _executor$execute.call(executor, e);
                if (e.handled) {
                    result = e.result;
                    break
                }
            }
            return result
        }
    }], [{
        key: "registerExecutor",
        value: function(name, executor) {
            if ((0, _type.isPlainObject)(name)) {
                (0, _iterator.each)(name, Action.registerExecutor);
                return
            }
            Action.executors[name] = executor
        }
    }, {
        key: "unregisterExecutor",
        value: function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key]
            }(0, _iterator.each)(args, function() {
                delete Action.executors[this]
            })
        }
    }]);
    return Action
}();
exports.default = Action;
Action.executors = {};
var createValidatorByTargetElement = function(condition) {
    return function(e) {
        if (!e.args.length) {
            return
        }
        var args = e.args[0];
        var element = args[e.validatingTargetName] || args.element;
        if (element && condition((0, _renderer2.default)(element))) {
            e.cancel = true
        }
    }
};
Action.registerExecutor({
    disabled: {
        validate: createValidatorByTargetElement(function($target) {
            return $target.is(".dx-state-disabled, .dx-state-disabled *")
        })
    },
    readOnly: {
        validate: createValidatorByTargetElement(function($target) {
            return $target.is(".dx-state-readonly, .dx-state-readonly *")
        })
    },
    undefined: {
        execute: function(e) {
            if (!e.action) {
                e.result = void 0;
                e.handled = true
            }
        }
    },
    func: {
        execute: function(e) {
            if ((0, _type.isFunction)(e.action)) {
                e.result = e.action.call(e.context, e.args[0]);
                e.handled = true
            }
        }
    }
});
