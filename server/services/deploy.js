"use strict";

const axios = require("axios").default;
const { buildConfig, getFeatureAvailability } = require("./utils");

// axios.interceptors.request.use((request) => {
//   console.log("Starting Request", JSON.stringify(request, null, 2));
//   return request;
// });

/**
 * @typedef {import('../../types/typedefs').RunDeployResponse} RunDeployResponse
 * @typedef {import('../../types/typedefs').DeployAvailabilityResponse} DeployAvailabilityResponse
 * @typedef {import('../../types/typedefs').GetDeploymentsResponse} GetDeploymentsResponse
 */

module.exports = ({ strapi }) => ({
  /**
   * Trigger a deploy
   * @returns {RunDeployResponse}
   */
  async runDeploy() {
    try {
      const config = buildConfig(strapi);
      if (!config || !config.deployHook) {
        throw "missing configuration: deployHook";
      }

      const response = await axios.post(config.deployHook);

      const deployJobId = response?.data?.job?.id;
      if (!deployJobId) {
        throw new Error(
          `Deployment Id not received. Response: ${JSON.stringify(response)}`
        );
      }

      return {
        data: {
          deployJobId,
        },
      };
    } catch (error) {
      console.error("[vercel-deploy] Error while deploying -", error);
      return {
        error: "An error occurred",
      };
    }
  },

  /**
   * Fetch the list of deployments from Vercel
   * @returns {GetDeploymentsResponse}
   */
  async getDeployments() {
    try {
      const config = buildConfig(strapi);
      if (!config || !config.apiToken) {
        throw "missing configuration: deployHook";
      }

      const params = {};

      if (config.appFilter) {
        params.app = config.appFilter;
      }

      if (config.teamFilter) {
        params.teamId = config.teamFilter;
      }

      const response = await axios.get(
        "https://api.vercel.com/v6/deployments",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.apiToken}`,
          },
          params,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "[vercel-deploy] Error while fetching deployments -",
        error
      );
      return {
        error: "An error occurred",
      };
    }
  },

  /**
   * Build the availability for each feature
   * @returns {DeployAvailabilityResponse}
   */
  deployAvailability() {
    try {
      const config = buildConfig(strapi);
      const runDeployAvailability = getFeatureAvailability(
        config,
        "deployHook"
      );
      const listDeployAvailability = getFeatureAvailability(config, "apiToken");
      const filterDeployAvailabilityPerName = getFeatureAvailability(
        config,
        "appFilter"
      );
      const filterDeployAvailabilityPerTeam = getFeatureAvailability(
        config,
        "teamFilter"
      );

      return {
        data: {
          runDeploy: runDeployAvailability,
          listDeploy: listDeployAvailability,
          filterDeployPerAppName: filterDeployAvailabilityPerName,
          filterDeployPerTeamId: filterDeployAvailabilityPerTeam,
        },
      };
    } catch (error) {
      console.error(
        "[vercel-deploy] Error while building deploy availability -",
        error
      );
      return {
        error: "An error occurred",
      };
    }
  },
});
