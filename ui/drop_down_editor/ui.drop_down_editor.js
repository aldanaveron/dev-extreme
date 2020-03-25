/**
 * DevExtreme (ui/drop_down_editor/ui.drop_down_editor.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _guid = require("../../core/guid");
var _guid2 = _interopRequireDefault(_guid);
var _component_registrator = require("../../core/component_registrator");
var _component_registrator2 = _interopRequireDefault(_component_registrator);
var _common = require("../../core/utils/common");
var _selectors = require("../widget/selectors");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _dom = require("../../core/utils/dom");
var _ui = require("../widget/ui.errors");
var _ui2 = _interopRequireDefault(_ui);
var _position = require("../../animation/position");
var _position2 = require("../../core/utils/position");
var _ui3 = require("./ui.drop_down_button");
var _ui4 = _interopRequireDefault(_ui3);
var _ui5 = require("../widget/ui.widget");
var _ui6 = _interopRequireDefault(_ui5);
var _message = require("../../localization/message");
var _utils = require("../../events/utils");
var _text_box = require("../text_box");
var _text_box2 = _interopRequireDefault(_text_box);
var _click = require("../../events/click");
var _click2 = _interopRequireDefault(_click);
var _devices = require("../../core/devices");
var _devices2 = _interopRequireDefault(_devices);
var _function_template = require("../../core/templates/function_template");
var _popup = require("../popup");
var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DROP_DOWN_EDITOR_CLASS = "dx-dropdowneditor";
var DROP_DOWN_EDITOR_INPUT_WRAPPER = "dx-dropdowneditor-input-wrapper";
var DROP_DOWN_EDITOR_BUTTON_ICON = "dx-dropdowneditor-icon";
var DROP_DOWN_EDITOR_OVERLAY = "dx-dropdowneditor-overlay";
var DROP_DOWN_EDITOR_OVERLAY_FLIPPED = "dx-dropdowneditor-overlay-flipped";
var DROP_DOWN_EDITOR_ACTIVE = "dx-dropdowneditor-active";
var DROP_DOWN_EDITOR_FIELD_CLICKABLE = "dx-dropdowneditor-field-clickable";
var DROP_DOWN_EDITOR_FIELD_TEMPLATE_WRAPPER = "dx-dropdowneditor-field-template-wrapper";
var isIOs = "ios" === _devices2.default.current().platform;
var DropDownEditor = _text_box2.default.inherit({
    _supportedKeys: function() {
        return (0, _extend.extend)({}, this.callBase(), {
            tab: function(e) {
                if (!this.option("opened")) {
                    return
                }
                if ("instantly" === this.option("applyValueMode")) {
                    this.close();
                    return
                }
                var $focusableElement = e.shiftKey ? this._getLastPopupElement() : this._getFirstPopupElement();
                $focusableElement && _events_engine2.default.trigger($focusableElement, "focus");
                e.preventDefault()
            },
            escape: function(e) {
                if (this.option("opened")) {
                    e.preventDefault()
                }
                this.close();
                return true
            },
            upArrow: function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (e.altKey) {
                    this.close();
                    return false
                }
                return true
            },
            downArrow: function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (e.altKey) {
                    this._validatedOpening();
                    return false
                }
                return true
            },
            enter: function(e) {
                if (this.option("opened")) {
                    e.preventDefault();
                    this._valueChangeEventHandler(e)
                }
                return true
            }
        })
    },
    _getDefaultButtons: function() {
        return this.callBase().concat([{
            name: "dropDown",
            Ctor: _ui4.default
        }])
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            value: null,
            onOpened: null,
            onClosed: null,
            opened: false,
            acceptCustomValue: true,
            applyValueMode: "instantly",
            deferRendering: true,
            activeStateEnabled: true,
            dropDownButtonTemplate: "dropDownButton",
            fieldTemplate: null,
            openOnFieldClick: false,
            showDropDownButton: true,
            buttons: void 0,
            dropDownOptions: {},
            popupPosition: this._getDefaultPopupPosition(),
            onPopupInitialized: null,
            applyButtonText: (0, _message.format)("OK"),
            cancelButtonText: (0, _message.format)("Cancel"),
            buttonsLocation: "default",
            showPopupTitle: false,
            useHiddenSubmitElement: false
        })
    },
    _getDefaultPopupPosition: function(isRtlEnabled) {
        var position = (0, _position2.getDefaultAlignment)(isRtlEnabled);
        return {
            offset: {
                h: 0,
                v: -1
            },
            my: position + " top",
            at: position + " bottom",
            collision: "flip flip"
        }
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function(_device) {
                var isGeneric = "generic" === _device.platform;
                return isGeneric
            },
            options: {
                popupPosition: {
                    offset: {
                        v: 0
                    }
                }
            }
        }])
    },
    _inputWrapper: function() {
        return this.$element().find("." + DROP_DOWN_EDITOR_INPUT_WRAPPER)
    },
    _init: function() {
        this.callBase();
        this._initVisibilityActions();
        this._initPopupInitializedAction();
        this._updatePopupPosition(this.option("rtlEnabled"));
        this._options.cache("dropDownOptions", this.option("dropDownOptions"))
    },
    _updatePopupPosition: function(isRtlEnabled) {
        var _this$_getDefaultPopu = this._getDefaultPopupPosition(isRtlEnabled),
            my = _this$_getDefaultPopu.my,
            at = _this$_getDefaultPopu.at;
        var currentPosition = this.option("popupPosition");
        this.option("popupPosition", (0, _extend.extend)({}, currentPosition, {
            my: my,
            at: at
        }))
    },
    _initVisibilityActions: function() {
        this._openAction = this._createActionByOption("onOpened", {
            excludeValidators: ["disabled", "readOnly"]
        });
        this._closeAction = this._createActionByOption("onClosed", {
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _initPopupInitializedAction: function() {
        this._popupInitializedAction = this._createActionByOption("onPopupInitialized", {
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _initMarkup: function() {
        this._renderSubmitElement();
        this.callBase();
        this.$element().addClass(DROP_DOWN_EDITOR_CLASS);
        this.setAria("role", "combobox")
    },
    _render: function() {
        this.callBase();
        this._renderOpenHandler();
        this._attachFocusOutHandler();
        this._renderOpenedState()
    },
    _renderContentImpl: function() {
        if (!this.option("deferRendering")) {
            this._createPopup()
        }
    },
    _renderInput: function() {
        this.callBase();
        this.$element().wrapInner((0, _renderer2.default)("<div>").addClass(DROP_DOWN_EDITOR_INPUT_WRAPPER));
        this._$container = this.$element().children().eq(0);
        this._setDefaultAria()
    },
    _setDefaultAria: function() {
        this.setAria({
            haspopup: "true",
            autocomplete: "list"
        })
    },
    _readOnlyPropValue: function() {
        return !this.option("acceptCustomValue") || this.callBase()
    },
    _cleanFocusState: function() {
        this.callBase();
        if (this.option("fieldTemplate")) {
            this._detachFocusEvents()
        }
    },
    _getFieldTemplate: function() {
        return this.option("fieldTemplate") && this._getTemplateByOption("fieldTemplate")
    },
    _renderMask: function() {
        if (this.option("fieldTemplate")) {
            return
        }
        this.callBase()
    },
    _renderField: function() {
        var fieldTemplate = this._getFieldTemplate();
        fieldTemplate && this._renderTemplatedField(fieldTemplate, this._fieldRenderData())
    },
    _renderPlaceholder: function() {
        var hasFieldTemplate = !!this._getFieldTemplate();
        if (!hasFieldTemplate) {
            this.callBase()
        }
    },
    _renderValue: function() {
        if (this.option("useHiddenSubmitElement")) {
            this._setSubmitValue()
        }
        var promise = this.callBase();
        promise.always(this._renderField.bind(this))
    },
    _renderTemplatedField: function(fieldTemplate, data) {
        var _this = this;
        var isFocused = (0, _selectors.focused)(this._input());
        var $container = this._$container;
        this._detachKeyboardEvents();
        var beforeButtonsContainerParent = this._$beforeButtonsContainer && this._$beforeButtonsContainer[0].parentNode;
        var afterButtonsContainerParent = this._$afterButtonsContainer && this._$afterButtonsContainer[0].parentNode;
        beforeButtonsContainerParent && beforeButtonsContainerParent.removeChild(this._$beforeButtonsContainer[0]);
        afterButtonsContainerParent && afterButtonsContainerParent.removeChild(this._$afterButtonsContainer[0]);
        this._detachFocusEvents();
        $container.empty();
        var $templateWrapper = (0, _renderer2.default)("<div>").addClass(DROP_DOWN_EDITOR_FIELD_TEMPLATE_WRAPPER).appendTo($container);
        fieldTemplate.render({
            model: data,
            container: (0, _dom.getPublicElement)($templateWrapper),
            onRendered: function() {
                var $input = _this._input();
                if (!$input.length) {
                    throw _ui2.default.Error("E1010")
                }
                _this._refreshEvents();
                _this._refreshValueChangeEvent();
                _this._renderFocusState();
                isFocused && _events_engine2.default.trigger($input, "focus")
            }
        });
        $container.prepend(this._$beforeButtonsContainer);
        $container.append(this._$afterButtonsContainer)
    },
    _fieldRenderData: function() {
        return this.option("value")
    },
    _initTemplates: function() {
        this._templateManager.addDefaultTemplates({
            dropDownButton: new _function_template.FunctionTemplate(function(options) {
                var $icon = (0, _renderer2.default)("<div>").addClass(DROP_DOWN_EDITOR_BUTTON_ICON);
                (0, _renderer2.default)(options.container).append($icon)
            })
        });
        this.callBase()
    },
    _renderOpenHandler: function() {
        var $inputWrapper = this._inputWrapper();
        var eventName = (0, _utils.addNamespace)(_click2.default.name, this.NAME);
        var openOnFieldClick = this.option("openOnFieldClick");
        _events_engine2.default.off($inputWrapper, eventName);
        _events_engine2.default.on($inputWrapper, eventName, this._getInputClickHandler(openOnFieldClick));
        this.$element().toggleClass(DROP_DOWN_EDITOR_FIELD_CLICKABLE, openOnFieldClick);
        if (openOnFieldClick) {
            this._openOnFieldClickAction = this._createAction(this._openHandler.bind(this))
        }
    },
    _attachFocusOutHandler: function() {
        var _this2 = this;
        if (isIOs) {
            this._detachFocusOutEvents();
            _events_engine2.default.on(this._inputWrapper(), (0, _utils.addNamespace)("focusout", this.NAME), function(event) {
                var newTarget = event.relatedTarget;
                var popupWrapper = _this2.content ? (0, _renderer2.default)(_this2.content()).closest("." + DROP_DOWN_EDITOR_OVERLAY) : _this2._$popup;
                if (newTarget && _this2.option("opened")) {
                    var isNewTargetOutside = 0 === (0, _renderer2.default)(newTarget).closest("." + DROP_DOWN_EDITOR_OVERLAY, popupWrapper).length;
                    if (isNewTargetOutside) {
                        _this2.close()
                    }
                }
            })
        }
    },
    _detachFocusOutEvents: function() {
        isIOs && _events_engine2.default.off(this._inputWrapper(), (0, _utils.addNamespace)("focusout", this.NAME))
    },
    _getInputClickHandler: function(openOnFieldClick) {
        var _this3 = this;
        return openOnFieldClick ? function(e) {
            _this3._executeOpenAction(e)
        } : function(e) {
            _this3._focusInput()
        }
    },
    _openHandler: function() {
        this._toggleOpenState()
    },
    _executeOpenAction: function(e) {
        this._openOnFieldClickAction({
            event: e
        })
    },
    _keyboardEventBindingTarget: function() {
        return this._input()
    },
    _focusInput: function() {
        if (this.option("disabled")) {
            return false
        }
        if (this.option("focusStateEnabled") && !(0, _selectors.focused)(this._input())) {
            _events_engine2.default.trigger(this._input(), "focus")
        }
        return true
    },
    _toggleOpenState: function(isVisible) {
        if (!this._focusInput()) {
            return
        }
        if (!this.option("readOnly")) {
            isVisible = arguments.length ? isVisible : !this.option("opened");
            this.option("opened", isVisible)
        }
    },
    _renderOpenedState: function() {
        var opened = this.option("opened");
        if (opened) {
            this._createPopup()
        }
        this.$element().toggleClass(DROP_DOWN_EDITOR_ACTIVE, opened);
        this._setPopupOption("visible", opened);
        this.setAria({
            expanded: opened
        });
        this.setAria("owns", (opened || void 0) && this._popupContentId, this.$element())
    },
    _createPopup: function() {
        if (this._$popup) {
            return
        }
        this._$popup = (0, _renderer2.default)("<div>").addClass(DROP_DOWN_EDITOR_OVERLAY).addClass(this.option("customOverlayCssClass")).appendTo(this.$element());
        this._renderPopup();
        this._renderPopupContent()
    },
    _renderPopupContent: _common.noop,
    _renderPopup: function() {
        this._popup = this._createComponent(this._$popup, _popup2.default, (0, _extend.extend)(this._popupConfig(), this._options.cache("dropDownOptions")));
        this._popup.on({
            showing: this._popupShowingHandler.bind(this),
            shown: this._popupShownHandler.bind(this),
            hiding: this._popupHidingHandler.bind(this),
            hidden: this._popupHiddenHandler.bind(this),
            contentReady: this._contentReadyHandler.bind(this)
        });
        this._contentReadyHandler();
        this._setPopupContentId(this._popup.$content());
        this._bindInnerWidgetOptions(this._popup, "dropDownOptions")
    },
    _setPopupContentId: function($popupContent) {
        this._popupContentId = "dx-" + new _guid2.default;
        this.setAria("id", this._popupContentId, $popupContent)
    },
    _contentReadyHandler: _common.noop,
    _popupConfig: function() {
        return {
            onInitialized: this._popupInitializedHandler(),
            position: (0, _extend.extend)(this.option("popupPosition"), {
                of: this.$element()
            }),
            showTitle: this.option("showPopupTitle"),
            width: "auto",
            height: "auto",
            shading: false,
            closeOnTargetScroll: true,
            closeOnOutsideClick: this._closeOutsideDropDownHandler.bind(this),
            animation: {
                show: {
                    type: "fade",
                    duration: 0,
                    from: 0,
                    to: 1
                },
                hide: {
                    type: "fade",
                    duration: 400,
                    from: 1,
                    to: 0
                }
            },
            deferRendering: false,
            focusStateEnabled: false,
            showCloseButton: false,
            toolbarItems: this._getPopupToolbarItems(),
            onPositioned: this._popupPositionedHandler.bind(this),
            fullScreen: false,
            contentTemplate: null
        }
    },
    _popupInitializedHandler: function() {
        var _this4 = this;
        if (!this.option("onPopupInitialized")) {
            return
        }
        return function(e) {
            _this4._popupInitializedAction({
                popup: e.component
            })
        }
    },
    _popupPositionedHandler: function(e) {
        e.position && this._popup.overlayContent().toggleClass(DROP_DOWN_EDITOR_OVERLAY_FLIPPED, e.position.v.flip)
    },
    _popupShowingHandler: _common.noop,
    _popupHidingHandler: function() {
        this.option("opened", false)
    },
    _popupShownHandler: function() {
        this._openAction();
        if (this._$validationMessage) {
            this._$validationMessage.dxOverlay("option", "position", this._getValidationMessagePosition())
        }
    },
    _popupHiddenHandler: function() {
        this._closeAction();
        if (this._$validationMessage) {
            this._$validationMessage.dxOverlay("option", "position", this._getValidationMessagePosition())
        }
    },
    _getValidationMessagePosition: function() {
        var positionRequest = "below";
        if (this._popup && this._popup.option("visible")) {
            var _setupPosition = (0, _position.setup)(this.$element()),
                myTop = _setupPosition.top;
            var _setupPosition2 = (0, _position.setup)(this._popup.$content()),
                popupTop = _setupPosition2.top;
            positionRequest = myTop + this.option("popupPosition").offset.v > popupTop ? "below" : "above"
        }
        return this.callBase(positionRequest)
    },
    _closeOutsideDropDownHandler: function(_ref) {
        var target = _ref.target;
        var $target = (0, _renderer2.default)(target);
        var dropDownButton = this.getButton("dropDown");
        var $dropDownButton = dropDownButton && dropDownButton.$element();
        var isInputClicked = !!$target.closest(this.$element()).length;
        var isDropDownButtonClicked = !!$target.closest($dropDownButton).length;
        var isOutsideClick = !isInputClicked && !isDropDownButtonClicked;
        return isOutsideClick
    },
    _clean: function() {
        delete this._openOnFieldClickAction;
        if (this._$popup) {
            this._$popup.remove();
            delete this._$popup;
            delete this._popup
        }
        this.callBase()
    },
    _setPopupOption: function(optionName, value) {
        this._setWidgetOption("_popup", arguments)
    },
    _validatedOpening: function() {
        if (!this.option("readOnly")) {
            this._toggleOpenState(true)
        }
    },
    _getPopupToolbarItems: function() {
        return "useButtons" === this.option("applyValueMode") ? this._popupToolbarItemsConfig() : []
    },
    _getFirstPopupElement: function() {
        return this._popup._wrapper().find(".dx-popup-done.dx-button")
    },
    _getLastPopupElement: function() {
        return this._popup._wrapper().find(".dx-popup-cancel.dx-button")
    },
    _popupElementTabHandler: function(e) {
        var $element = (0, _renderer2.default)(e.currentTarget);
        if (e.shiftKey && $element.is(this._getFirstPopupElement()) || !e.shiftKey && $element.is(this._getLastPopupElement())) {
            _events_engine2.default.trigger(this._input(), "focus");
            e.preventDefault()
        }
    },
    _popupElementEscHandler: function() {
        _events_engine2.default.trigger(this._input(), "focus");
        this.close()
    },
    _popupButtonInitializedHandler: function(e) {
        e.component.registerKeyHandler("tab", this._popupElementTabHandler.bind(this));
        e.component.registerKeyHandler("escape", this._popupElementEscHandler.bind(this))
    },
    _popupToolbarItemsConfig: function() {
        var buttonsConfig = [{
            shortcut: "done",
            options: {
                onClick: this._applyButtonHandler.bind(this),
                text: this.option("applyButtonText"),
                onInitialized: this._popupButtonInitializedHandler.bind(this)
            }
        }, {
            shortcut: "cancel",
            options: {
                onClick: this._cancelButtonHandler.bind(this),
                text: this.option("cancelButtonText"),
                onInitialized: this._popupButtonInitializedHandler.bind(this)
            }
        }];
        return this._applyButtonsLocation(buttonsConfig)
    },
    _applyButtonsLocation: function(buttonsConfig) {
        var buttonsLocation = this.option("buttonsLocation");
        var resultConfig = buttonsConfig;
        if ("default" !== buttonsLocation) {
            var position = (0, _common.splitPair)(buttonsLocation);
            (0, _iterator.each)(resultConfig, function(_, element) {
                (0, _extend.extend)(element, {
                    toolbar: position[0],
                    location: position[1]
                })
            })
        }
        return resultConfig
    },
    _applyButtonHandler: function() {
        this.close();
        this.option("focusStateEnabled") && this.focus()
    },
    _cancelButtonHandler: function() {
        this.close();
        this.option("focusStateEnabled") && this.focus()
    },
    _updatePopupWidth: _common.noop,
    _popupOptionChanged: function(args) {
        var options = _ui6.default.getOptionsFromContainer(args);
        this._setPopupOption(options);
        if (Object.keys(options).indexOf("width") !== -1 && void 0 === options.width) {
            this._updatePopupWidth()
        }
    },
    _renderSubmitElement: function() {
        if (this.option("useHiddenSubmitElement")) {
            this._$submitElement = (0, _renderer2.default)("<input>").attr("type", "hidden").appendTo(this.$element())
        }
    },
    _setSubmitValue: function() {
        this._getSubmitElement().val(this.option("value"))
    },
    _getSubmitElement: function() {
        if (this.option("useHiddenSubmitElement")) {
            return this._$submitElement
        } else {
            return this.callBase()
        }
    },
    _dispose: function() {
        this._detachFocusOutEvents();
        this.callBase()
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "opened":
                this._renderOpenedState();
                break;
            case "onOpened":
            case "onClosed":
                this._initVisibilityActions();
                break;
            case "onPopupInitialized":
                this._initPopupInitializedAction();
                break;
            case "fieldTemplate":
                if ((0, _type.isDefined)(args.value)) {
                    this._renderField()
                } else {
                    this._invalidate()
                }
                break;
            case "acceptCustomValue":
            case "openOnFieldClick":
                this._invalidate();
                break;
            case "dropDownButtonTemplate":
            case "showDropDownButton":
                this._updateButtons(["dropDown"]);
                break;
            case "dropDownOptions":
                this._popupOptionChanged(args);
                this._options.cache("dropDownOptions", args.value);
                break;
            case "popupPosition":
            case "deferRendering":
                break;
            case "applyValueMode":
            case "applyButtonText":
            case "cancelButtonText":
            case "buttonsLocation":
                this._setPopupOption("toolbarItems", this._getPopupToolbarItems());
                break;
            case "showPopupTitle":
                this._setPopupOption("showTitle", args.value);
                break;
            case "useHiddenSubmitElement":
                if (this._$submitElement) {
                    this._$submitElement.remove();
                    this._$submitElement = void 0
                }
                this._renderSubmitElement();
                break;
            case "rtlEnabled":
                this._updatePopupPosition(args.value);
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    },
    open: function() {
        this.option("opened", true)
    },
    close: function() {
        this.option("opened", false)
    },
    field: function() {
        return (0, _dom.getPublicElement)(this._input())
    },
    content: function() {
        return this._popup ? this._popup.content() : null
    }
});
(0, _component_registrator2.default)("dxDropDownEditor", DropDownEditor);
module.exports = DropDownEditor;
module.exports.default = module.exports;
