/**
* DevExtreme (data/array_store.d.ts)
* Version: 20.1.1
* Build date: Wed Mar 25 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Store, {
    StoreOptions
} from './abstract_store';

export interface ArrayStoreOptions<T = ArrayStore> extends StoreOptions<T> {
    /**
     * @docid ArrayStoreOptions.data
     * @type Array<any>
     * @prevFileNamespace DevExpress.data
     * @public
     */
    data?: Array<any>;
}
/**
 * @docid ArrayStore
 * @inherits Store
 * @type object
 * @module data/array_store
 * @export default
 * @prevFileNamespace DevExpress.data
 * @public
 */
export default class ArrayStore extends Store {
    constructor(options?: ArrayStoreOptions)
    /**
     * @docid ArrayStoreMethods.clear
     * @publicName clear()
     * @prevFileNamespace DevExpress.data
     * @public
     */
    clear(): void;
    /**
     * @docid ArrayStoreMethods.createQuery
     * @publicName createQuery()
     * @return object
     * @prevFileNamespace DevExpress.data
     * @public
     */
    createQuery(): any;
}
