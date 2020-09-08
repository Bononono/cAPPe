"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControlApplication = exports.PackageKey = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = tslib_1.__importDefault(require("path"));
const multer_1 = tslib_1.__importDefault(require("multer"));
const casbin_authorization_1 = require("./components/casbin-authorization");
const jwt_authentication_1 = require("./components/jwt-authentication");
const keys_1 = require("./keys");
const sequence_1 = require("./sequence");
exports.PackageKey = core_1.BindingKey.create('application.package');
class AccessControlApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        this.addSecuritySpec();
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        // Bind authentication and authorization related elements
        this.component(authentication_1.AuthenticationComponent);
        this.component(authorization_1.AuthorizationComponent);
        this.component(jwt_authentication_1.JWTAuthenticationComponent);
        this.component(casbin_authorization_1.CasbinAuthorizationComponent);
        // Configure file upload with multer options
        this.configureFileUpload(options.fileStorageDirectory);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
    addSecuritySpec() {
        this.api({
            openapi: '3.0.0',
            info: {
                title: 'access-control-example',
                version: require('.././package.json').version,
            },
            paths: {},
            components: { securitySchemes: jwt_authentication_1.SECURITY_SCHEME_SPEC },
            security: [
                {
                    jwt: [],
                },
            ],
            servers: [{ url: '/' }],
        });
    }
    /**
     * Configure `multer` options for file upload
     */
    configureFileUpload(destination) {
        // Upload files to `dist/.sandbox` by default
        destination = destination !== null && destination !== void 0 ? destination : path_1.default.join(__dirname, '../.sandbox');
        this.bind(keys_1.STORAGE_DIRECTORY).to(destination);
        const multerOptions = {
            storage: multer_1.default.diskStorage({
                destination,
                // Use the original file name as is
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                },
            }),
        };
        // Configure the file upload service with multer options
        this.configure(keys_1.FILE_UPLOAD_SERVICE).to(multerOptions);
    }
}
exports.AccessControlApplication = AccessControlApplication;
//# sourceMappingURL=application.js.map