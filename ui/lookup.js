/**
 * DevExtreme (ui/lookup.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../core/renderer");
var eventsEngine = require("../events/core/events_engine");
var window = require("../core/utils/window").getWindow();
var support = require("../core/utils/support");
var commonUtils = require("../core/utils/common");
var domUtils = require("../core/utils/dom");
var each = require("../core/utils/iterator").each;
var extend = require("../core/utils/extend").extend;
var inkRipple = require("./widget/utils.ink_ripple");
var messageLocalization = require("../localization/message");
var devices = require("../core/devices");
var registerComponent = require("../core/component_registrator");
var eventUtils = require("../events/utils");
var DropDownList = require("./drop_down_editor/ui.drop_down_list");
var themes = require("./themes");
var clickEvent = require("../events/click");
var Popover = require("./popover");
var TextBox = require("./text_box");
var ChildDefaultTemplate = require("../core/templates/child_default_template").ChildDefaultTemplate;
var translator = require("../animation/translator");
var LOOKUP_CLASS = "dx-lookup";
var LOOKUP_SEARCH_CLASS = "dx-lookup-search";
var LOOKUP_SEARCH_WRAPPER_CLASS = "dx-lookup-search-wrapper";
var LOOKUP_FIELD_CLASS = "dx-lookup-field";
var LOOKUP_ARROW_CLASS = "dx-lookup-arrow";
var LOOKUP_FIELD_WRAPPER_CLASS = "dx-lookup-field-wrapper";
var LOOKUP_POPUP_CLASS = "dx-lookup-popup";
var LOOKUP_POPUP_WRAPPER_CLASS = "dx-lookup-popup-wrapper";
var LOOKUP_POPUP_SEARCH_CLASS = "dx-lookup-popup-search";
var LOOKUP_POPOVER_MODE = "dx-lookup-popover-mode";
var LOOKUP_EMPTY_CLASS = "dx-lookup-empty";
var LOOKUP_POPOVER_FLIP_VERTICAL_CLASS = "dx-popover-flipped-vertical";
var TEXTEDITOR_INPUT_CLASS = "dx-texteditor-input";
var POPUP_OPTION_MAP = {
    popupWidth: "width",
    popupHeight: "height"
};
var LIST_ITEM_SELECTED_CLASS = "dx-list-item-selected";
var MATERIAL_LOOKUP_LIST_ITEMS_COUNT = 4;
var MATERIAL_LOOKUP_LIST_PADDING = 8;
var Lookup = DropDownList.inherit({
    _supportedKeys: function() {
        return extend(this.callBase(), {
            space: function(e) {
                e.preventDefault();
                this._validatedOpening()
            },
            enter: function() {
                this._validatedOpening()
            }
        })
    },
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            title: "",
            titleTemplate: "title",
            onTitleRendered: null,
            placeholder: messageLocalization.format("Select"),
            searchPlaceholder: messageLocalization.format("Search"),
            searchEnabled: true,
            cleanSearchOnOpening: true,
            fullScreen: false,
            showCancelButton: true,
            showClearButton: false,
            clearButtonText: messageLocalization.format("Clear"),
            applyButtonText: messageLocalization.format("OK"),
            popupWidth: function() {
                return .8 * $(window).width()
            },
            popupHeight: function() {
                return .8 * $(window).height()
            },
            shading: true,
            closeOnOutsideClick: false,
            position: void 0,
            animation: {},
            pullRefreshEnabled: false,
            useNativeScrolling: true,
            pullingDownText: messageLocalization.format("dxList-pullingDownText"),
            pulledDownText: messageLocalization.format("dxList-pulledDownText"),
            refreshingText: messageLocalization.format("dxList-refreshingText"),
            pageLoadingText: messageLocalization.format("dxList-pageLoadingText"),
            onScroll: null,
            onPullRefresh: null,
            onPageLoading: null,
            pageLoadMode: "scrollBottom",
            nextButtonText: messageLocalization.format("dxList-nextButtonText"),
            grouped: false,
            groupTemplate: "group",
            usePopover: false,
            showDropDownButton: false,
            showPopupTitle: true,
            focusStateEnabled: false,
            itemCenteringEnabled: false,
            _scrollToSelectedItemEnabled: false,
            useHiddenSubmitElement: true
        })
    },
    _defaultOptionsRules: function() {
        var themeName = themes.current();
        return this.callBase().concat([{
            device: function() {
                return !support.nativeScrolling
            },
            options: {
                useNativeScrolling: false
            }
        }, {
            device: function(_device) {
                return !devices.isSimulator() && "desktop" === devices.real().deviceType && "generic" === _device.platform
            },
            options: {
                usePopover: true,
                popupHeight: "auto"
            }
        }, {
            device: {
                platform: "ios",
                phone: true
            },
            options: {
                fullScreen: true
            }
        }, {
            device: {
                platform: "ios",
                tablet: true
            },
            options: {
                popupWidth: function() {
                    return .4 * Math.min($(window).width(), $(window).height())
                },
                popupHeight: "auto",
                usePopover: true,
                useInkRipple: false
            }
        }, {
            device: function() {
                return "desktop" === devices.real().deviceType && !devices.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function() {
                return themes.isMaterial(themeName)
            },
            options: {
                usePopover: false,
                closeOnOutsideClick: true,
                popupWidth: function() {
                    return this._getPopupWidth()
                }.bind(this),
                popupHeight: function() {
                    return this._getPopupHeight(MATERIAL_LOOKUP_LIST_ITEMS_COUNT)
                }.bind(this),
                searchEnabled: false,
                showCancelButton: false,
                showPopupTitle: false,
                shading: false,
                itemCenteringEnabled: true,
                _scrollToSelectedItemEnabled: true
            }
        }])
    },
    _initTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            group: new ChildDefaultTemplate("group"),
            title: new ChildDefaultTemplate("title")
        })
    },
    _initMarkup: function() {
        this.$element().addClass(LOOKUP_CLASS).toggleClass(LOOKUP_POPOVER_MODE, this.option("usePopover"));
        this.callBase()
    },
    _inputWrapper: function() {
        return this.$element().find("." + LOOKUP_FIELD_WRAPPER_CLASS)
    },
    _dataSourceOptions: function() {
        return extend(this.callBase(), {
            paginate: true
        })
    },
    _fireContentReadyAction: commonUtils.noop,
    _popupWrapperClass: function() {
        return ""
    },
    _renderInput: function() {
        var fieldClickAction = this._createAction(function() {
            this._toggleOpenState()
        }.bind(this));
        this._$field = $("<div>").addClass(LOOKUP_FIELD_CLASS);
        eventsEngine.on(this._$field, eventUtils.addNamespace(clickEvent.name, this.NAME), function(e) {
            fieldClickAction({
                event: e
            })
        });
        var $arrow = $("<div>").addClass(LOOKUP_ARROW_CLASS);
        this._$fieldWrapper = $("<div>").addClass(LOOKUP_FIELD_WRAPPER_CLASS).append(this._$field).append($arrow).appendTo(this.$element());
        this.option("useInkRipple") && this._renderInkRipple()
    },
    _getInputContainer: function() {
        return this._$fieldWrapper
    },
    _renderInkRipple: function() {
        this._inkRipple = inkRipple.render()
    },
    _toggleOpenState: function() {
        this.callBase();
        if (!this.option("fullScreen") && this.option("_scrollToSelectedItemEnabled")) {
            this._setPopupPosition()
        }
    },
    _toggleActiveState: function($element, value, e) {
        this.callBase.apply(this, arguments);
        if (!this._inkRipple) {
            return
        }
        var config = {
            element: this._inputWrapper(),
            event: e
        };
        if (value) {
            this._inkRipple.showWave(config)
        } else {
            this._inkRipple.hideWave(config)
        }
    },
    _renderField: function() {
        var fieldTemplate = this._getTemplateByOption("fieldTemplate");
        if (fieldTemplate && this.option("fieldTemplate")) {
            this._renderFieldTemplate(fieldTemplate);
            return
        }
        this._updateField(this.option("displayValue") || this.option("placeholder"));
        this.$element().toggleClass(LOOKUP_EMPTY_CLASS, !this.option("selectedItem"))
    },
    _renderDisplayText: function(text) {
        if (this._input().length) {
            this.callBase(text)
        } else {
            this._updateField(text)
        }
    },
    _updateField: function(text) {
        this._$field.text(text)
    },
    _renderFieldTemplate: function(template) {
        this._$field.empty();
        var data = this._fieldRenderData();
        template.render({
            model: data,
            container: domUtils.getPublicElement(this._$field)
        })
    },
    _fieldRenderData: function() {
        return this.option("selectedItem")
    },
    _popupShowingHandler: function() {
        this.callBase.apply(this, arguments);
        if (this.option("cleanSearchOnOpening")) {
            if (this.option("searchEnabled") && this._searchBox.option("value")) {
                this._searchBox.option("value", "");
                this._searchCanceled()
            }
            this._list && this._list.option("focusedElement", null)
        }
        if (this.option("fullScreen") && this.option("_scrollToSelectedItemEnabled")) {
            this._popup.option("position").of = $(window)
        }
    },
    _scrollToSelectedItem: function() {
        var selectedIndex = this._list.option("selectedIndex");
        var listItems = this._list.option("items");
        var itemsCount = listItems.length;
        if (0 !== itemsCount) {
            if (this._list.option("grouped")) {
                this._list.scrollToItem({
                    group: itemsCount - 1,
                    item: listItems[itemsCount - 1].items.length - 1
                })
            } else {
                this._list.scrollToItem(itemsCount - 1)
            }
            this._list.scrollToItem(selectedIndex)
        }
    },
    _setPopupPosition: function() {
        if (!this.option("itemCenteringEnabled")) {
            return
        }
        var selectedIndex = this._list.option("selectedIndex");
        var flipped = this._popup._$wrapper.hasClass(LOOKUP_POPOVER_FLIP_VERTICAL_CLASS);
        if (selectedIndex === -1 || flipped) {
            return
        }
        var selectedListItem = $(this._list.element()).find("." + LIST_ITEM_SELECTED_CLASS);
        if (selectedListItem.offset().top < 0 || this._list.scrollTop() !== selectedListItem.position().top) {
            this._scrollToSelectedItem()
        }
        var differenceOfHeights = (selectedListItem.height() - $(this.element()).height()) / 2;
        var popupContentParent = $(this._popup.content()).parent();
        var differenceOfOffsets = selectedListItem.offset().top - popupContentParent.offset().top;
        var lookupTop = $(this.element()).offset().top;
        var popupOffsetY = differenceOfHeights;
        if (lookupTop > differenceOfOffsets) {
            popupOffsetY += differenceOfOffsets
        } else {
            this._scrollToSelectedItem()
        }
        var position = translator.locate(popupContentParent);
        translator.move(popupContentParent, {
            top: position.top - popupOffsetY
        })
    },
    _getPopupHeight: function(listItemsCount) {
        return this._list && this._list.itemElements() && this.option("itemCenteringEnabled") ? this._list.itemElements().height() * listItemsCount + 2 * MATERIAL_LOOKUP_LIST_PADDING + (this._$searchWrapper ? this._$searchWrapper.outerHeight() : 0) + (this._popup._$bottom ? this._popup._$bottom.outerHeight() : 0) + (this._popup._$title ? this._popup._$title.outerHeight() : 0) : "auto"
    },
    _getPopupWidth: function() {
        return this.option("itemCenteringEnabled") ? $(this.element()).outerWidth() : .8 * $(window).width()
    },
    _renderPopup: function() {
        if (this.option("usePopover")) {
            if (this.option("_scrollToSelectedItemEnabled") && !this.option("itemCenteringEnabled") || !this.option("fullScreen")) {
                this._renderPopover()
            }
        } else {
            this.callBase()
        }
        this._$popup.addClass(LOOKUP_POPUP_CLASS);
        this._popup._wrapper().addClass(LOOKUP_POPUP_WRAPPER_CLASS)
    },
    _popupOptionMap: function(optionName) {
        return POPUP_OPTION_MAP[optionName] || optionName
    },
    _renderPopover: function() {
        this._popup = this._createComponent(this._$popup, Popover, extend(this._popupConfig(), {
            showEvent: null,
            hideEvent: null,
            target: this.$element(),
            fullScreen: false,
            shading: false,
            closeOnTargetScroll: true,
            width: this._isInitialOptionValue("popupWidth") ? function() {
                return this.$element().outerWidth()
            }.bind(this) : this._popupConfig().width
        }));
        this._popup.on({
            showing: this._popupShowingHandler.bind(this),
            shown: this._popupShownHandler.bind(this),
            hiding: this._popupHidingHandler.bind(this),
            hidden: this._popupHiddenHandler.bind(this),
            contentReady: this._contentReadyHandler.bind(this)
        });
        if (this.option("_scrollToSelectedItemEnabled")) {
            this._popup._$arrow.remove()
        }
        this._setPopupContentId(this._popup.$content());
        this._contentReadyHandler()
    },
    _popupHidingHandler: function() {
        this.callBase();
        this.option("focusStateEnabled") && this.focus()
    },
    _popupHiddenHandler: function() {
        this.callBase();
        if (this.option("_scrollToSelectedItemEnabled")) {
            translator.resetPosition($(this._popup.content()).parent())
        }
    },
    _preventFocusOnPopup: commonUtils.noop,
    _popupConfig: function() {
        var result = extend(this.callBase(), {
            showTitle: this.option("showPopupTitle"),
            title: this.option("title"),
            titleTemplate: this._getTemplateByOption("titleTemplate"),
            onTitleRendered: this.option("onTitleRendered"),
            toolbarItems: this._getPopupToolbarItems(),
            fullScreen: this.option("fullScreen"),
            shading: this.option("shading"),
            closeOnTargetScroll: false,
            closeOnOutsideClick: this.option("closeOnOutsideClick"),
            onPositioned: null
        });
        delete result.animation;
        delete result.position;
        result.maxHeight = function() {
            return $(window).height()
        };
        if (this.option("_scrollToSelectedItemEnabled") && this.option("itemCenteringEnabled")) {
            result.position = {
                my: "left top",
                at: "left top",
                of: this.element()
            }
        }
        each(["position", "animation", "popupWidth", "popupHeight"], function(_, optionName) {
            if (void 0 !== this.option(optionName)) {
                result[this._popupOptionMap(optionName)] = this.option(optionName)
            }
        }.bind(this));
        return result
    },
    _getPopupToolbarItems: function() {
        var buttonsConfig = "useButtons" === this.option("applyValueMode") ? this._popupToolbarItemsConfig() : [];
        var cancelButton = this._getCancelButtonConfig();
        if (cancelButton) {
            buttonsConfig.push(cancelButton)
        }
        var clearButton = this._getClearButtonConfig();
        if (clearButton) {
            buttonsConfig.push(clearButton)
        }
        return this._applyButtonsLocation(buttonsConfig)
    },
    _popupToolbarItemsConfig: function() {
        return [{
            shortcut: "done",
            options: {
                onClick: this._applyButtonHandler.bind(this),
                text: this.option("applyButtonText")
            }
        }]
    },
    _getCancelButtonConfig: function() {
        return this.option("showCancelButton") ? {
            shortcut: "cancel",
            onClick: this._cancelButtonHandler.bind(this),
            options: {
                onInitialized: function(e) {
                    e.component.registerKeyHandler("escape", this.close.bind(this))
                }.bind(this),
                text: this.option("cancelButtonText")
            }
        } : null
    },
    _getClearButtonConfig: function() {
        return this.option("showClearButton") ? {
            shortcut: "clear",
            onClick: this._resetValue.bind(this),
            options: {
                text: this.option("clearButtonText")
            }
        } : null
    },
    _applyButtonHandler: function() {
        this.option("value", this._valueGetter(this._currentSelectedItem()));
        this.callBase()
    },
    _cancelButtonHandler: function() {
        this._refreshSelected();
        this.callBase()
    },
    _refreshPopupVisibility: function() {
        if (this.option("opened")) {
            this._updatePopupHeight()
        }
    },
    _dimensionChanged: function() {
        if (this.option("usePopover") && !this.option("popupWidth")) {
            this.option("popupWidth", this.$element().width())
        }
        this.callBase()
    },
    _updatePopupDimensions: function() {
        this._updatePopupHeight()
    },
    _input: function() {
        return this._$searchBox || this.callBase()
    },
    _renderPopupContent: function() {
        this.callBase();
        this._renderSearch()
    },
    _renderSearch: function() {
        var _this = this;
        var isSearchEnabled = this.option("searchEnabled");
        this._toggleSearchClass(isSearchEnabled);
        if (isSearchEnabled) {
            var $searchWrapper = this._$searchWrapper = $("<div>").addClass(LOOKUP_SEARCH_WRAPPER_CLASS);
            var $searchBox = this._$searchBox = $("<div>").addClass(LOOKUP_SEARCH_CLASS).appendTo($searchWrapper);
            var currentDevice = devices.current();
            var searchMode = currentDevice.android && currentDevice.version[0] >= 5 ? "text" : "search";
            var isKeyboardListeningEnabled = false;
            this._searchBox = this._createComponent($searchBox, TextBox, {
                onDisposing: function() {
                    return isKeyboardListeningEnabled = false
                },
                onFocusIn: function() {
                    return isKeyboardListeningEnabled = true
                },
                onFocusOut: function() {
                    return isKeyboardListeningEnabled = false
                },
                onKeyboardHandled: function(opts) {
                    return isKeyboardListeningEnabled && _this._list._keyboardHandler(opts)
                },
                mode: searchMode,
                showClearButton: true,
                valueChangeEvent: this.option("valueChangeEvent"),
                onValueChanged: this._searchHandler.bind(this)
            });
            this._registerSearchKeyHandlers();
            $searchWrapper.insertBefore(this._$list);
            this._setSearchPlaceholder()
        }
    },
    _removeSearch: function() {
        this._$searchWrapper && this._$searchWrapper.remove();
        delete this._$searchWrapper;
        this._$searchBox && this._$searchBox.remove();
        delete this._$searchBox;
        delete this._searchBox
    },
    _selectListItemHandler: function(e) {
        var $itemElement = $(this._list.option("focusedElement"));
        if (!$itemElement.length) {
            return
        }
        e.preventDefault();
        this._selectListItem(e.itemData, $itemElement)
    },
    _registerSearchKeyHandlers: function() {
        this._searchBox.registerKeyHandler("escape", this.close.bind(this));
        this._searchBox.registerKeyHandler("enter", this._selectListItemHandler.bind(this));
        this._searchBox.registerKeyHandler("space", this._selectListItemHandler.bind(this));
        this._searchBox.registerKeyHandler("end", commonUtils.noop);
        this._searchBox.registerKeyHandler("home", commonUtils.noop)
    },
    _toggleSearchClass: function(isSearchEnabled) {
        if (this._popup) {
            this._popup._wrapper().toggleClass(LOOKUP_POPUP_SEARCH_CLASS, isSearchEnabled)
        }
    },
    _setSearchPlaceholder: function() {
        if (!this._$searchBox) {
            return
        }
        var minSearchLength = this.option("minSearchLength");
        var placeholder = this.option("searchPlaceholder");
        if (minSearchLength && placeholder === messageLocalization.format("Search")) {
            placeholder = messageLocalization.getFormatter("dxLookup-searchPlaceholder")(minSearchLength)
        }
        this._searchBox.option("placeholder", placeholder)
    },
    _setAriaTargetForList: commonUtils.noop,
    _renderList: function() {
        this.callBase();
        this._list.registerKeyHandler("escape", function() {
            this.close()
        }.bind(this))
    },
    _listConfig: function() {
        return extend(this.callBase(), {
            tabIndex: 0,
            grouped: this.option("grouped"),
            groupTemplate: this._getTemplateByOption("groupTemplate"),
            pullRefreshEnabled: this.option("pullRefreshEnabled"),
            useNativeScrolling: this.option("useNativeScrolling"),
            pullingDownText: this.option("pullingDownText"),
            pulledDownText: this.option("pulledDownText"),
            refreshingText: this.option("refreshingText"),
            pageLoadingText: this.option("pageLoadingText"),
            onScroll: this.option("onScroll"),
            onPullRefresh: this.option("onPullRefresh"),
            onPageLoading: this.option("onPageLoading"),
            pageLoadMode: this.option("pageLoadMode"),
            nextButtonText: this.option("nextButtonText"),
            indicateLoading: this.option("searchEnabled"),
            onSelectionChanged: this._getSelectionChangedHandler()
        })
    },
    _getSelectionChangedHandler: function() {
        return this.option("showSelectionControls") ? this._selectionChangeHandler.bind(this) : commonUtils.noop
    },
    _listContentReadyHandler: function() {
        this.callBase.apply(this, arguments);
        this._refreshSelected()
    },
    _setFocusPolicy: function() {
        if (!this.option("focusStateEnabled")) {
            return
        }
        if (this.option("searchEnabled")) {
            this._searchBox.focus()
        } else {
            eventsEngine.trigger(this._$list, "focus")
        }
    },
    _focusTarget: function() {
        return this._$field
    },
    _keyboardEventBindingTarget: function() {
        return this._$field
    },
    _listItemClickHandler: function(e) {
        this._saveValueChangeEvent(e.event);
        this._selectListItem(e.itemData, e.event.currentTarget)
    },
    _selectListItem: function(itemData, target) {
        this._list.selectItem(target);
        if ("instantly" === this.option("applyValueMode")) {
            this._applyButtonHandler()
        }
    },
    _currentSelectedItem: function() {
        return this.option("grouped") ? this._list.option("selectedItems[0]").items[0] : this._list.option("selectedItems[0]")
    },
    _resetValue: function(e) {
        this._saveValueChangeEvent(e.event);
        this.option("value", null);
        this.option("opened", false)
    },
    _searchValue: function() {
        return this.option("searchEnabled") && this._searchBox ? this._searchBox.option("value") : ""
    },
    _renderInputValue: function() {
        return this.callBase().always(function() {
            this._refreshSelected()
        }.bind(this))
    },
    _renderPlaceholder: function() {
        if (0 === this.$element().find("." + TEXTEDITOR_INPUT_CLASS).length) {
            return
        }
        this.callBase()
    },
    _clean: function() {
        this._$fieldWrapper.remove();
        this._$searchBox = null;
        delete this._inkRipple;
        this.callBase()
    },
    _optionChanged: function(args) {
        var name = args.name;
        var value = args.value;
        switch (name) {
            case "dataSource":
                this.callBase.apply(this, arguments);
                this._renderField();
                break;
            case "searchEnabled":
                if (this._popup) {
                    this._removeSearch();
                    this._renderSearch()
                }
                break;
            case "searchPlaceholder":
                this._setSearchPlaceholder();
                break;
            case "minSearchLength":
                this._setSearchPlaceholder();
                this.callBase.apply(this, arguments);
                break;
            case "title":
            case "titleTemplate":
            case "onTitleRendered":
            case "shading":
            case "animation":
            case "position":
            case "closeOnOutsideClick":
                this._setPopupOption(name);
                break;
            case "fullScreen":
            case "usePopover":
            case "placeholder":
                this._invalidate();
                break;
            case "clearButtonText":
            case "showClearButton":
            case "showCancelButton":
                this._setPopupOption("toolbarItems", this._getPopupToolbarItems());
                break;
            case "applyValueMode":
                this.callBase.apply(this, arguments);
                break;
            case "popupWidth":
                this._setPopupOption("popupWidth", "auto" === value ? this.initialOption("popupWidth") : value);
                break;
            case "popupHeight":
                this._setPopupOption("popupHeight", "auto" === value ? this.initialOption("popupHeight") : value);
                break;
            case "pullRefreshEnabled":
            case "useNativeScrolling":
            case "pullingDownText":
            case "pulledDownText":
            case "refreshingText":
            case "pageLoadingText":
            case "onScroll":
            case "onPullRefresh":
            case "onPageLoading":
            case "nextButtonText":
            case "grouped":
            case "groupTemplate":
                this._setListOption(name);
                break;
            case "pageLoadMode":
                this._setListOption("pageLoadMode", this.option("pageLoadMode"));
                break;
            case "cleanSearchOnOpening":
            case "_scrollToSelectedItemEnabled":
                break;
            case "itemCenteringEnabled":
                if (this.option("_scrollToSelectedItemEnabled") && value) {
                    this.option("usePopover", false)
                }
                break;
            default:
                this.callBase.apply(this, arguments)
        }
    },
    focus: function() {
        this.option("opened") ? this._setFocusPolicy() : eventsEngine.trigger(this._focusTarget(), "focus")
    },
    field: function() {
        return this._$field
    }
});
registerComponent("dxLookup", Lookup);
module.exports = Lookup;
module.exports.default = module.exports;
