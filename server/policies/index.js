"use strict";

const getPluginConfig = require("../helpers/pluginConfig");

module.exports = {
  checkConfigRoles(policyContext, _, { strapi }) {
    const pluginConfig = getPluginConfig(strapi);

    /** @type {Array} */
    const configRoles = pluginConfig("roles");
    if (!configRoles || configRoles.length <= 0) {
      return true;
    }

    /** @type {Array} */
    const userRoles = policyContext.state.user.roles;
    const hasRole = userRoles.find((r) => configRoles.includes(r.code));
    if (hasRole) {
      return true;
    }

    return false;
  },
};
