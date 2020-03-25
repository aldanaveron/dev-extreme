/**
* DevExtreme (ui/widget/ui.search_box_mixin.d.ts)
* Version: 20.1.1
* Build date: Wed Mar 25 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxTextBoxOptions
} from '../text_box';

export interface SearchBoxMixinOptions<T = SearchBoxMixin> {
    /**
     * @docid SearchBoxMixinOptions.searchEditorOptions
     * @type dxTextBoxOptions
     * @default {}
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchEditorOptions?: dxTextBoxOptions;
    /**
     * @docid SearchBoxMixinOptions.searchEnabled
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchEnabled?: boolean;
    /**
     * @docid SearchBoxMixinOptions.searchExpr
     * @type getter|Array<getter>
     * @default null
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchExpr?: string | Function | Array<string | Function>;
    /**
     * @docid SearchBoxMixinOptions.searchMode
     * @type Enums.CollectionSearchMode
     * @default 'contains'
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchMode?: 'contains' | 'startswith' | 'equals';
    /**
     * @docid SearchBoxMixinOptions.searchTimeout
     * @type number
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchTimeout?: number;
    /**
     * @docid SearchBoxMixinOptions.searchValue
     * @type String
     * @default ""
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchValue?: string;
}
/**
 * @docid SearchBoxMixin
 * @module ui/widget/ui.search_box_mixin
 * @export default
 * @hidden
 * @prevFileNamespace DevExpress.ui
 */
export default class SearchBoxMixin {
    constructor(options?: SearchBoxMixinOptions)
}
