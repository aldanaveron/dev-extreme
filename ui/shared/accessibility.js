/**
 * DevExtreme (ui/shared/accessibility.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _utils = require("../../events/utils");
var eventUtils = _interopRequireWildcard(_utils);
var _extend = require("../../core/utils/extend");
var _dom_adapter = require("../../core/dom_adapter");
var _dom_adapter2 = _interopRequireDefault(_dom_adapter);

function _getRequireWildcardCache() {
    if ("function" !== typeof WeakMap) {
        return null
    }
    var cache = new WeakMap;
    _getRequireWildcardCache = function() {
        return cache
    };
    return cache
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj
    }
    if (null === obj || "object" !== _typeof(obj) && "function" !== typeof obj) {
        return {
            "default": obj
        }
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj)
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc)
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj)
    }
    return newObj
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var FOCUS_STATE_CLASS = "dx-state-focused";
var FOCUS_DISABLED_CLASS = "dx-cell-focus-disabled";
var FOCUSED_ROW_SELECTOR = ".dx-row-focused";
var GRID_ROW_SELECTOR = ".dx-datagrid-rowsview .dx-row";
var GRID_CELL_SELECTOR = "".concat(GRID_ROW_SELECTOR, " > td");
var TREELIST_ROW_SELECTOR = ".dx-treelist-rowsview .dx-row";
var TREELIST_CELL_SELECTOR = "".concat(TREELIST_ROW_SELECTOR, " > td");
var viewItemSelectorMap = {
    groupPanel: [".dx-datagrid-group-panel .dx-group-panel-item[tabindex]"],
    columnHeaders: [".dx-datagrid-headers .dx-header-row > td.dx-datagrid-action", ".dx-treelist-headers .dx-header-row > td.dx-treelist-action"],
    filterRow: [".dx-datagrid-headers .dx-datagrid-filter-row .dx-editor-cell .dx-texteditor-input", ".dx-treelist-headers .dx-treelist-filter-row .dx-editor-cell .dx-texteditor-input"],
    rowsView: ["".concat(FOCUSED_ROW_SELECTOR), "".concat(GRID_ROW_SELECTOR, "[tabindex]"), "".concat(GRID_CELL_SELECTOR, "[tabindex]"), "".concat(GRID_CELL_SELECTOR), "".concat(TREELIST_ROW_SELECTOR, "[tabindex]"), "".concat(TREELIST_CELL_SELECTOR, "[tabindex]"), "".concat(TREELIST_CELL_SELECTOR)],
    footer: [".dx-datagrid-total-footer .dx-datagrid-summary-item", ".dx-treelist-total-footer .dx-treelist-summary-item"],
    filterPanel: [".dx-datagrid-filter-panel .dx-icon-filter", ".dx-treelist-filter-panel .dx-icon-filter"],
    pager: [".dx-datagrid-pager [tabindex]", ".dx-treelist-pager [tabindex]"]
};
var isMouseDown = false;
var isHiddenFocusing = false;
var focusedElementInfo = null;

function processKeyDown(viewName, instance, event, action, $mainElement, executeKeyDown) {
    var isHandled = fireKeyDownEvent(instance, event.originalEvent, executeKeyDown);
    if (isHandled) {
        return
    }
    var keyName = eventUtils.normalizeKeyName(event);
    if ("enter" === keyName || "space" === keyName) {
        saveFocusedElementInfo(event.target, instance);
        action && action({
            event: event
        })
    } else {
        if ("tab" === keyName) {
            $mainElement.addClass(FOCUS_STATE_CLASS)
        } else {
            module.exports.selectView(viewName, instance, event)
        }
    }
}

function saveFocusedElementInfo(target, instance) {
    var $target = (0, _renderer2.default)(target);
    var ariaLabel = $target.attr("aria-label");
    var $activeElements = getActiveAccessibleElements(ariaLabel, instance.element());
    var targetIndex = $activeElements.index($target);
    focusedElementInfo = (0, _extend.extend)({}, {
        ariaLabel: ariaLabel,
        index: targetIndex
    }, {
        viewInstance: instance
    })
}

function getActiveAccessibleElements(ariaLabel, viewElement) {
    var $viewElement = (0, _renderer2.default)(viewElement);
    var $activeElements;
    if (ariaLabel) {
        $activeElements = $viewElement.find('[aria-label="'.concat(ariaLabel, '"][tabindex]'))
    } else {
        $activeElements = $viewElement.find("[tabindex]")
    }
    return $activeElements
}

function findFocusedViewElement(viewSelectors) {
    for (var index in viewSelectors) {
        var selector = viewSelectors[index];
        var $focusViewElement = (0, _renderer2.default)(selector).first();
        if ($focusViewElement.length) {
            return $focusViewElement
        }
    }
}

function fireKeyDownEvent(instance, event, executeAction) {
    var args = {
        event: event,
        handled: false
    };
    if (executeAction) {
        executeAction(args)
    } else {
        instance._createActionByOption("onKeyDown")(args)
    }
    return args.handled
}

function onDocumentVisibilityChange() {
    isHiddenFocusing = "visible" === _dom_adapter2.default.getDocument().visibilityState
}
module.exports = {
    subscribeVisibilityChange: function() {
        _events_engine2.default.on(_dom_adapter2.default.getDocument(), "visibilitychange", onDocumentVisibilityChange)
    },
    unsubscribeVisibilityChange: function() {
        _events_engine2.default.off(_dom_adapter2.default.getDocument(), "visibilitychange", onDocumentVisibilityChange)
    },
    hiddenFocus: function(element) {
        isHiddenFocusing = true;
        element.focus();
        isHiddenFocusing = false
    },
    registerKeyboardAction: function(viewName, instance, $element, selector, action, executeKeyDown) {
        if (instance.option("useLegacyKeyboardNavigation")) {
            return
        }
        var $mainElement = (0, _renderer2.default)(instance.element());
        _events_engine2.default.on($element, "keydown", selector, function(e) {
            return processKeyDown(viewName, instance, e, action, $mainElement, executeKeyDown)
        });
        _events_engine2.default.on($element, "mousedown", selector, function() {
            isMouseDown = true;
            $mainElement.removeClass(FOCUS_STATE_CLASS)
        });
        _events_engine2.default.on($element, "focusin", selector, function() {
            var needShowOverlay = !isMouseDown && !isHiddenFocusing;
            if (needShowOverlay) {
                $mainElement.addClass(FOCUS_STATE_CLASS)
            }
            isMouseDown = false
        })
    },
    restoreFocus: function(instance) {
        if (!instance.option("useLegacyKeyboardNavigation") && focusedElementInfo) {
            var viewInstance = focusedElementInfo.viewInstance;
            if (viewInstance) {
                var $activeElements = getActiveAccessibleElements(focusedElementInfo.ariaLabel, viewInstance.element());
                var $targetElement = $activeElements.eq(focusedElementInfo.index);
                focusedElementInfo = null;
                _events_engine2.default.trigger($targetElement, "focus")
            }
        }
    },
    selectView: function(viewName, instance, event) {
        var keyName = eventUtils.normalizeKeyName(event);
        if (event.ctrlKey && ("upArrow" === keyName || "downArrow" === keyName)) {
            var viewNames = Object.keys(viewItemSelectorMap);
            var viewItemIndex = viewNames.indexOf(viewName);
            while (viewItemIndex >= 0 && viewItemIndex < viewNames.length) {
                viewItemIndex = "upArrow" === keyName ? --viewItemIndex : ++viewItemIndex;
                var _viewName = viewNames[viewItemIndex];
                var viewSelectors = viewItemSelectorMap[_viewName];
                var $focusViewElement = findFocusedViewElement(viewSelectors);
                if ($focusViewElement && $focusViewElement.length) {
                    $focusViewElement.attr("tabindex", instance.option("tabindex") || 0);
                    _events_engine2.default.trigger($focusViewElement, "focus");
                    $focusViewElement.removeClass(FOCUS_DISABLED_CLASS);
                    break
                }
            }
        }
    },
    setTabIndex: function(instance, $element) {
        if (!instance.option("useLegacyKeyboardnavigation")) {
            $element.attr("tabindex", instance.option("tabindex") || 0)
        }
    }
};
