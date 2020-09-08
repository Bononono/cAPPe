import {AuthorizationContext, AuthorizationDecision, AuthorizationMetadata,} from '@loopback/authorization';
import {RESOURCE_ID} from '../../../keys';

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
export async function assignOrganizationInstanceId(
    authorizationCtx: AuthorizationContext,
    metadata: AuthorizationMetadata,
) {
    const organizationId = authorizationCtx.invocationContext.args[0];
    const resourceId = getResourceName(
        metadata.resource ?? authorizationCtx.resource,
        organizationId,
    );
    // resourceId will override the resource name from metadata
    authorizationCtx.invocationContext.bind(RESOURCE_ID).to(resourceId);
    return AuthorizationDecision.ABSTAIN;
}

/**
 * Generate the resource name according to the naming convention
 * in casbin policy
 * @param resource resource name
 * @param id resource instance's id
 */
function getResourceName(resource: string, id?: number): string {
    // instance level name
    if (id) return `${resource}${id}`;
    // class level name
    return `${resource}*`;
}
