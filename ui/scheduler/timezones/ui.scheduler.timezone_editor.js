/**
 * DevExtreme (ui/scheduler/timezones/ui.scheduler.timezone_editor.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../../../core/renderer");
var registerComponent = require("../../../core/component_registrator");
var extend = require("../../../core/utils/extend").extend;
var publisherMixin = require("../ui.scheduler.publisher_mixin");
var messageLocalization = require("../../../localization/message");
var Editor = require("../../editor/editor");
var SelectBox = require("../../select_box");
var TIMEZONE_EDITOR_CLASS = "dx-timezone-editor";
var TIMEZONE_DISPLAY_NAME_SELECTBOX_CLASS = "dx-timezone-display-name";
var TIMEZONE_IANA_ID_SELECTBOX_CLASS = "dx-timezone-iana-id";
var SchedulerTimezoneEditor = Editor.inherit({
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            value: null
        })
    },
    _createComponent: function(element, name, config) {
        config = config || {};
        this._extendConfig(config, {
            readOnly: this.option("readOnly")
        });
        return this.callBase(element, name, config)
    },
    _init: function() {
        this.callBase();
        this.$element().addClass(TIMEZONE_EDITOR_CLASS)
    },
    _render: function() {
        this._renderDisplayNameEditor();
        this._renderIanaIdEditor();
        this.callBase()
    },
    _renderDisplayNameEditor: function() {
        var noTzTitle = messageLocalization.format("dxScheduler-noTimezoneTitle");
        var value = this.invoke("getTimezoneDisplayNameById", this.option("value")) || noTzTitle;
        this._displayNameEditor = this._renderSelectBox(TIMEZONE_DISPLAY_NAME_SELECTBOX_CLASS, {
            items: [noTzTitle].concat(this.invoke("getTimezonesDisplayName")),
            value: value,
            onValueChanged: function(e) {
                this._processDisplayNameChanging(e.value)
            }.bind(this)
        })
    },
    _renderIanaIdEditor: function() {
        this._ianaIdEditor = this._renderSelectBox(TIMEZONE_IANA_ID_SELECTBOX_CLASS, {
            items: this._idsDataSource(),
            value: this.option("value"),
            onValueChanged: function(e) {
                this.option("value", e.value)
            }.bind(this),
            valueExpr: "id",
            displayExpr: "displayName",
            disabled: this._calculateIanaIdEditorDisabledState()
        })
    },
    _renderSelectBox: function(cssClass, options) {
        options = options || {};
        var $element = $("<div>").addClass(cssClass);
        var selectBox = this._createComponent($element, SelectBox, options);
        this.$element().append($element);
        return selectBox
    },
    _idsDataSource: function() {
        return this.invoke("getSimilarTimezones", this.option("value"))
    },
    _calculateIanaIdEditorDisabledState: function() {
        return !this.option("value")
    },
    _processDisplayNameChanging: function(displayName) {
        var tzIds = this.invoke("getTimezonesIdsByDisplayName", displayName);
        var tzId = tzIds.length ? tzIds[0].id : null;
        this.option("value", tzId);
        this._ianaIdEditor.option({
            value: tzId,
            items: this._idsDataSource(tzIds),
            disabled: this._calculateIanaIdEditorDisabledState()
        })
    },
    _optionChanged: function(args) {
        var value = args.value;
        switch (args.name) {
            case "value":
                this._ianaIdEditor.option({
                    value: value,
                    items: this._idsDataSource()
                });
                if (value) {
                    this._displayNameEditor.option("value", this.invoke("getTimezoneDisplayNameById", value))
                } else {
                    this._displayNameEditor.option("value", messageLocalization.format("dxScheduler-noTimezoneTitle"))
                }
                this.callBase(args);
                break;
            case "readOnly":
                this._displayNameEditor && this._displayNameEditor.option("readOnly", value);
                this._ianaIdEditor && this._ianaIdEditor.option("readOnly", value);
                break;
            default:
                this.callBase(args)
        }
    }
}).include(publisherMixin);
registerComponent("dxSchedulerTimezoneEditor", {}, SchedulerTimezoneEditor);
module.exports = SchedulerTimezoneEditor;
