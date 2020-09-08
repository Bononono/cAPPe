import { ReferenceObject, SecuritySchemeObject } from '@loopback/rest';
export declare const OPERATION_SECURITY_SPEC: {
    jwt: never[];
}[];
export declare type SecuritySchemeObjects = {
    [securityScheme: string]: SecuritySchemeObject | ReferenceObject;
};
export declare const SECURITY_SCHEME_SPEC: SecuritySchemeObjects;
