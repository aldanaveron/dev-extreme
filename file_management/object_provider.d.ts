/**
* DevExtreme (file_management/object_provider.d.ts)
* Version: 20.1.1
* Build date: Wed Mar 25 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import FileSystemProviderBase, {
    FileSystemProviderBaseOptions
} from './provider_base';

export interface ObjectFileSystemProviderOptions extends FileSystemProviderBaseOptions<ObjectFileSystemProvider> {
    /**
     * @docid ObjectFileSystemProviderOptions.contentExpr
     * @type string|function(fileSystemItem)
     * @prevFileNamespace DevExpress.fileManagement
     * @public
     */
    contentExpr?: string | Function;
    /**
     * @docid ObjectFileSystemProviderOptions.data
     * @type Array<any>
     * @prevFileNamespace DevExpress.fileManagement
     * @public
     */
    data?: Array<any>;
    /**
     * @docid ObjectFileSystemProviderOptions.itemsExpr
     * @type string|function(fileSystemItem)
     * @prevFileNamespace DevExpress.fileManagement
     * @public
     */
    itemsExpr?: string | Function;
}
/**
 * @docid ObjectFileSystemProvider
 * @inherits FileSystemProviderBase
 * @type object
 * @module file_management/object_provider
 * @namespace DevExpress.fileManagement
 * @export default
 * @prevFileNamespace DevExpress.fileManagement
 * @public
 */
export default class ObjectFileSystemProvider extends FileSystemProviderBase {
    constructor(options?: ObjectFileSystemProviderOptions)
}
