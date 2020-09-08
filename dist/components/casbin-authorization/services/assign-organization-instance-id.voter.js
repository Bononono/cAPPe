"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignOrganizationInstanceId = void 0;
const authorization_1 = require("@loopback/authorization");
const keys_1 = require("../../../keys");
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
async function assignOrganizationInstanceId(authorizationCtx, metadata) {
    var _a;
    const organizationId = authorizationCtx.invocationContext.args[0];
    const resourceId = getResourceName((_a = metadata.resource) !== null && _a !== void 0 ? _a : authorizationCtx.resource, organizationId);
    // resourceId will override the resource name from metadata
    authorizationCtx.invocationContext.bind(keys_1.RESOURCE_ID).to(resourceId);
    return authorization_1.AuthorizationDecision.ABSTAIN;
}
exports.assignOrganizationInstanceId = assignOrganizationInstanceId;
/**
 * Generate the resource name according to the naming convention
 * in casbin policy
 * @param resource resource name
 * @param id resource instance's id
 */
function getResourceName(resource, id) {
    // instance level name
    if (id)
        return `${resource}${id}`;
    // class level name
    return `${resource}*`;
}
//# sourceMappingURL=assign-organization-instance-id.voter.js.map