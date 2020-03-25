/**
* DevExtreme (file_management/remote_provider.d.ts)
* Version: 20.1.1
* Build date: Wed Mar 25 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import FileSystemProviderBase, {
    FileSystemProviderBaseOptions
} from './provider_base';

export interface RemoteFileSystemProviderOptions extends FileSystemProviderBaseOptions<RemoteFileSystemProvider> {
    /**
     * @docid RemoteFileSystemProviderOptions.endpointUrl
     * @type string
     * @prevFileNamespace DevExpress.fileManagement
     * @public
     */
    endpointUrl?: string;
    /**
     * @docid RemoteFileSystemProviderOptions.hasSubDirectoriesExpr
     * @type string|function(fileSystemItem)
     * @prevFileNamespace DevExpress.fileManagement
     * @public
     */
    hasSubDirectoriesExpr?: string | Function;
}
/**
 * @docid RemoteFileSystemProvider
 * @inherits FileSystemProviderBase
 * @type object
 * @module file_management/remote_provider
 * @namespace DevExpress.fileManagement
 * @export default
 * @prevFileNamespace DevExpress.fileManagement
 * @public
 */
export default class RemoteFileSystemProvider extends FileSystemProviderBase {
    constructor(options?: RemoteFileSystemProviderOptions)
}
