/**
 * @typedef {import('../../../../types/typedefs').FeatureAvailability} FeatureAvailability
 * @typedef {import('../../../../types/typedefs').ApiErrorType} ApiErrorType
 */

/**
 * Describe the type of error state to display
 * @typedef {(FeatureAvailability|"ERROR_AVAILABILITY"|"ERROR_DEPLOY"|"ERROR_FORBIDDEN")} ErrorStateType
 */

/**
 * Callback to notify that the list of deployments has been fetched
 * @callback Deployed
 * @param {boolean} hasError This is true when at least one of the deployments is not in final a state
 * @returns {void}
 */

/**
 * DeployButton propd
 * @typedef {Object} Props
 * @property {FeatureAvailability} runDeployAvailability Availability of the runDeploy feature
 * @property {ApiErrorType} availabilityApiError Has error while retrieving availability
 * @property {Deployed} onDeployed Callback to notify that it has completed the deploy
 */

exports.unused = {};
