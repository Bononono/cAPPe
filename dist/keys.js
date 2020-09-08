"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORAGE_DIRECTORY = exports.FILE_UPLOAD_SERVICE = exports.RESOURCE_ID = void 0;
const core_1 = require("@loopback/core");
exports.RESOURCE_ID = core_1.BindingKey.create('resourceId');
/**
 * Binding key for the file upload service
 */
exports.FILE_UPLOAD_SERVICE = core_1.BindingKey.create('services.FileUpload');
/**
 * Binding key for the storage directory
 */
exports.STORAGE_DIRECTORY = core_1.BindingKey.create('storage.directory');
//# sourceMappingURL=keys.js.map