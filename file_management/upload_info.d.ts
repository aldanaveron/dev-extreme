/**
* DevExtreme (file_management/upload_info.d.ts)
* Version: 20.1.1
* Build date: Wed Mar 25 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid UploadInfo
 * @type object
 * @module file_management/upload_info
 * @namespace DevExpress.fileManagement
 * @export default
 * @prevFileNamespace DevExpress.fileManagement
 * @hidden
 */
export default interface UploadInfo {
    /**
     * @docid UploadInfo.bytesUploaded
     * @type Number
     * @prevFileNamespace DevExpress.fileManagement
     * @public
     */
    bytesUploaded: number;

    /**
     * @docid UploadInfo.chunkCount
     * @type Number
     * @prevFileNamespace DevExpress.fileManagement
     * @public
     */
    chunkCount: number;

    /**
     * @docid UploadInfo.customData
     * @type object
     * @prevFileNamespace DevExpress.fileManagement
     * @public
     */
    customData: any;

    /**
     * @docid UploadInfo.chunkBlob
     * @type Blob
     * @prevFileNamespace DevExpress.fileManagement
     * @public
     */
    chunkBlob: Blob;

    /**
     * @docid UploadInfo.chunkIndex
     * @type Number
     * @prevFileNamespace DevExpress.fileManagement
     * @public
     */
    chunkIndex: number;
}