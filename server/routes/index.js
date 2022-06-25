const pluginId = require("../helpers/pluginId");

module.exports = [
  {
    method: "GET",
    path: "/deploy/run",
    handler: "deploy.runDeploy",
    config: {
      policies: [`plugin::${pluginId}.checkConfigRoles`],
    },
  },
  {
    method: "GET",
    path: "/config",
    handler: "config.getConfig",
    config: {
      policies: [`plugin::${pluginId}.checkConfigRoles`],
    },
  },
  {
    method: "GET",
    path: "/deploy/list",
    handler: "deploy.getDeployments",
    config: {
      policies: [`plugin::${pluginId}.checkConfigRoles`],
    },
  },
  {
    method: "GET",
    path: "/deploy/availability",
    handler: "deploy.deployAvailability",
    config: {
      policies: [`plugin::${pluginId}.checkConfigRoles`],
    },
  },
];
