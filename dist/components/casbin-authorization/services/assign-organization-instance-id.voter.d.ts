import { AuthorizationContext, AuthorizationDecision, AuthorizationMetadata } from '@loopback/authorization';
/**
 * Instance level authorizer for known endpoints
 * - 'organizations/{id}/show-balance'
 * - 'organizations/{id}/donate'
 * - 'organizations/{id}/withdraw'
 * This function is used to modify the authorization context.
 * It is not used for making a decision, so just returns ABSTAIN
 * @param authorizationCtx
 * @param metadata
 */
export declare function assignOrganizationInstanceId(authorizationCtx: AuthorizationContext, metadata: AuthorizationMetadata): Promise<AuthorizationDecision>;
