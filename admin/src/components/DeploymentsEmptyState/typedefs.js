/**
 * @typedef {import('../../../../types/typedefs').FeatureAvailability} FeatureAvailability
 * @typedef {import('../../../../types/typedefs').ApiErrorType} ApiErrorType
 */

/**
 * Describe the type of empty state to display
 * @typedef {(FeatureAvailability|"MISSING_DEPLOYMENTS"|"ERROR_DEPLOYMENTS"|"ERROR_AVAILABILITY_GENERIC"|"ERROR_CONFIG"|"ERROR_AVAILABILITY_FORBIDDEN")} EmptyStateType
 */

/**
 * DeploymentsEmptyState Props
 * @typedef {Object} Props
 * @property {EmptyStateType} type
 */

exports.unused = {};
