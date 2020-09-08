import { BindingKey } from '@loopback/core';
import { FileUploadHandler } from './types';
export declare const RESOURCE_ID: BindingKey<string>;
/**
 * Binding key for the file upload service
 */
export declare const FILE_UPLOAD_SERVICE: BindingKey<FileUploadHandler>;
/**
 * Binding key for the storage directory
 */
export declare const STORAGE_DIRECTORY: BindingKey<string>;
