/**
 * DevExtreme (localization/globalize/message.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
require("./core");
var _globalize = require("globalize");
var _globalize2 = _interopRequireDefault(_globalize);
var _message = require("../message");
var _message2 = _interopRequireDefault(_message);
var _core = require("../core");
var _core2 = _interopRequireDefault(_core);
require("globalize/message");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
if (_globalize2.default && _globalize2.default.formatMessage) {
    var DEFAULT_LOCALE = "en";
    var originalLoadMessages = _globalize2.default.loadMessages;
    _globalize2.default.loadMessages = function(messages) {
        _message2.default.load(messages)
    };
    var globalizeMessageLocalization = {
        engine: function() {
            return "globalize"
        },
        ctor: function() {
            this.load(this._dictionary)
        },
        load: function(messages) {
            this.callBase(messages);
            originalLoadMessages(messages)
        },
        getMessagesByLocales: function() {
            return _globalize2.default.cldr.get("globalize-messages")
        },
        getFormatter: function(key, locale) {
            var currentLocale = locale || _core2.default.locale();
            var formatter = this._getFormatterBase(key, locale);
            if (!formatter) {
                formatter = this._formatterByGlobalize(key, locale)
            }
            if (!formatter && currentLocale !== DEFAULT_LOCALE) {
                formatter = this.getFormatter(key, DEFAULT_LOCALE)
            }
            return formatter
        },
        _formatterByGlobalize: function(key, locale) {
            var currentGlobalize = !locale || locale === _core2.default.locale() ? _globalize2.default : new _globalize2.default(locale);
            var result;
            if (this._messageLoaded(key, locale)) {
                result = currentGlobalize.messageFormatter(key)
            }
            return result
        },
        _messageLoaded: function(key, locale) {
            var currentCldr = locale ? new _globalize2.default(locale).cldr : _globalize2.default.locale();
            var value = currentCldr.get(["globalize-messages/{bundle}", key]);
            return !!value
        },
        _loadSingle: function(key, value, locale) {
            var data = {};
            data[locale] = {};
            data[locale][key] = value;
            this.load(data)
        }
    };
    _message2.default.inject(globalizeMessageLocalization)
}
