import {BindingKey} from '@loopback/core';
import {FileUploadHandler} from './types';

export const RESOURCE_ID = BindingKey.create<string>('resourceId');

/**
 * Binding key for the file upload service
 */
export const FILE_UPLOAD_SERVICE = BindingKey.create<FileUploadHandler>(
    'services.FileUpload',
);

/**
 * Binding key for the storage directory
 */
export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');
