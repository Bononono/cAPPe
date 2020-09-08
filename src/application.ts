import {AuthenticationComponent} from '@loopback/authentication';
import {AuthorizationComponent} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingKey} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import multer from 'multer';
import {CasbinAuthorizationComponent} from './components/casbin-authorization';
import {JWTAuthenticationComponent, SECURITY_SCHEME_SPEC,} from './components/jwt-authentication';
import {FILE_UPLOAD_SERVICE, STORAGE_DIRECTORY} from './keys';
import {MySequence} from './sequence';

export {ApplicationConfig};

/**
 * Information from package.json
 */
export interface PackageInfo {
    name: string;
    version: string;
    description: string;
}

export const PackageKey = BindingKey.create<PackageInfo>('application.package');

export class AccessControlApplication extends BootMixin(
    ServiceMixin(RepositoryMixin(RestApplication)),
) {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        // Set up the custom sequence
        this.sequence(MySequence);

        // Set up default home page
        this.static('/', path.join(__dirname, '../public'));

        this.addSecuritySpec();

        // Customize @loopback/rest-explorer configuration here
        this.configure(RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });

        this.component(RestExplorerComponent);
        // Bind authentication and authorization related elements
        this.component(AuthenticationComponent);
        this.component(AuthorizationComponent);
        this.component(JWTAuthenticationComponent);
        this.component(CasbinAuthorizationComponent);

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

    addSecuritySpec(): void {
        this.api({
            openapi: '3.0.0',
            info: {
                title: 'access-control-example',
                version: require('.././package.json').version,
            },
            paths: {},
            components: {securitySchemes: SECURITY_SCHEME_SPEC},
            security: [
                {
                    jwt: [],
                },
            ],
            servers: [{url: '/'}],
        });
    }

    /**
     * Configure `multer` options for file upload
     */
    protected configureFileUpload(destination?: string) {
        // Upload files to `dist/.sandbox` by default
        destination = destination ?? path.join(__dirname, '../.sandbox');
        this.bind(STORAGE_DIRECTORY).to(destination);
        const multerOptions: multer.Options = {
            storage: multer.diskStorage({
                destination,
                // Use the original file name as is
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                },
            }),
        };
        // Configure the file upload service with multer options
        this.configure(FILE_UPLOAD_SERVICE).to(multerOptions);
    }
}
