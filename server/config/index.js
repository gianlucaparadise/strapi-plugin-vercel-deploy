"use strict";

/**
 * @typedef {import('../../types/typedefs').PluginConfigMap} PluginConfigMap
 */

module.exports = {
  default: {},
  /**
   *
   * @param {PluginConfigMap} config
   */
  validator(config) {
    if (config.deployHook && typeof config.deployHook !== "string") {
      throw new Error("Config property `deployHook` has to be a string");
    }
    if (config.apiToken && typeof config.apiToken !== "string") {
      throw new Error("Config property `apiToken` has to be a string");
    }
    if (config.appFilter && typeof config.appFilter !== "string") {
      throw new Error("Config property `appFilter` has to be a string");
    }
  },
};
