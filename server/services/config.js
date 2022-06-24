"use strict";

const { buildConfig } = require("./utils");

/**
 * @typedef {import('../../types/typedefs').PluginConfig} PluginConfig
 */

module.exports = ({ strapi }) => ({
  /**
   * Build and return plugin config reading from process.env
   * @returns {PluginConfig}
   */
  getConfig() {
    return {
      data: buildConfig(strapi, true),
    };
  },
});
