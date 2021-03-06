/**
 * DevExtreme (data/odata/context.js)
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
var _class = require("../../core/class");
var _class2 = _interopRequireDefault(_class);
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _errors = require("../errors");
var _errors2 = _interopRequireDefault(_errors);
var _store = require("./store");
var _store2 = _interopRequireDefault(_store);
var _request_dispatcher = require("./request_dispatcher");
var _request_dispatcher2 = _interopRequireDefault(_request_dispatcher);
var _utils = require("./utils");
var _deferred = require("../../core/utils/deferred");
require("./query_adapter");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ODataContext = _class2.default.inherit({
    ctor: function(options) {
        var _this = this;
        this._requestDispatcher = new _request_dispatcher2.default(options);
        this._errorHandler = options.errorHandler;
        (0, _iterator.each)(options.entities || [], function(entityAlias, entityOptions) {
            _this[entityAlias] = new _store2.default((0, _extend.extend)({}, options, {
                url: "".concat(_this._requestDispatcher.url, "/").concat(encodeURIComponent(entityOptions.name || entityAlias))
            }, entityOptions))
        })
    },
    get: function(operationName, params) {
        return this.invoke(operationName, params, "GET")
    },
    invoke: function(operationName) {
        var params = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        var httpMethod = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "POST";
        httpMethod = httpMethod.toLowerCase();
        var d = new _deferred.Deferred;
        var url = "".concat(this._requestDispatcher.url, "/").concat(encodeURIComponent(operationName));
        var payload;
        if (4 === this.version()) {
            if ("get" === httpMethod) {
                url = (0, _utils.formatFunctionInvocationUrl)(url, (0, _utils.escapeServiceOperationParams)(params, this.version()));
                params = null
            } else {
                if ("post" === httpMethod) {
                    payload = params;
                    params = null
                }
            }
        }(0, _deferred.when)(this._requestDispatcher.sendRequest(url, httpMethod, (0, _utils.escapeServiceOperationParams)(params, this.version()), payload)).done(function(r) {
            if ((0, _type.isPlainObject)(r) && operationName in r) {
                r = r[operationName]
            }
            d.resolve(r)
        }).fail(this._errorHandler).fail(_errors2.default._errorHandler).fail(d.reject);
        return d.promise()
    },
    objectLink: function(entityAlias, key) {
        var store = this[entityAlias];
        if (!store) {
            throw _errors2.default.errors.Error("E4015", entityAlias)
        }
        if (!(0, _type.isDefined)(key)) {
            return null
        }
        return {
            __metadata: {
                uri: store._byKeyUrl(key, true)
            }
        }
    },
    version: function() {
        return this._requestDispatcher.version
    }
});
exports.default = ODataContext;
module.exports.default = module.exports;
