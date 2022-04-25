"use strict";

/**
 * @typedef {import('../../types/typedefs').PluginConfigMap} PluginConfigMap
 * @typedef {import('../../types/typedefs').FeatureAvailability} FeatureAvailability
 */

/**
 * Build config map object
 * @returns {PluginConfigMap}
 */
const buildConfig = () => {
  return {
    deployHook: process.env.VERCEL_DEPLOY_PLUGIN_HOOK,
    apiToken: process.env.VERCEL_DEPLOY_PLUGIN_API_TOKEN,
    appFilter: process.env.VERCEL_DEPLOY_PLUGIN_APP_FILTER,
  };
};

/**
 * Return the availability for the input feature
 * @param {PluginConfigMap} configObj Configuration file
 * @param {keyof PluginConfigMap} configName Name of the config prop, it is a key of the object {@link PluginConfigMap}
 * @returns {FeatureAvailability}
 */
const getFeatureAvailability = (configObj, configName) => {
  if (!configObj) {
    return "MISSING_CONFIG_OBJECT";
  }

  if (!configObj[configName]) {
    return "MISSING_CONFIG_VARIABLE";
  }

  return "AVAILABLE";
};

module.exports = {
  buildConfig,
  getFeatureAvailability,
};
