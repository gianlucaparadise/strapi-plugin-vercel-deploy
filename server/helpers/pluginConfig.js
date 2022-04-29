const pluginId = require("./pluginId");

/**
 * @typedef {import('../../types/typedefs').PluginConfigMap} PluginConfigMap
 */

const getPluginConfig = (strapi) => {
  return strapi.plugin(pluginId).config;
};

module.exports = getPluginConfig;
