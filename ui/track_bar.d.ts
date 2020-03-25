/**
* DevExtreme (ui/track_bar.d.ts)
* Version: 20.1.1
* Build date: Wed Mar 25 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Editor, {
    EditorOptions
} from './editor/editor';

export interface dxTrackBarOptions<T = dxTrackBar> extends EditorOptions<T> {
    /**
     * @docid dxTrackBarOptions.max
     * @type number
     * @default 100
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    max?: number;
    /**
     * @docid dxTrackBarOptions.min
     * @type number
     * @default 0
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    min?: number;
}
/**
 * @docid dxTrackBar
 * @inherits Editor
 * @hidden
 * @prevFileNamespace DevExpress.ui
 */
export default class dxTrackBar extends Editor {
    constructor(element: Element, options?: dxTrackBarOptions)
    constructor(element: JQuery, options?: dxTrackBarOptions)
}
