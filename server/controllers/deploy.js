"use strict";

module.exports = {
  async runDeploy(ctx) {
    const response = await strapi
      .plugin("vercel-deploy")
      .service("deploy")
      .runDeploy();

    if (response.error) {
      return ctx.internalServerError(`Server error: ${response.error}`);
    }

    ctx.body = response;
  },
  async getDeployments(ctx) {
    const response = await strapi
      .plugin("vercel-deploy")
      .service("deploy")
      .getDeployments();

    if (response.error) {
      return ctx.internalServerError(`Server error: ${response.error}`);
    }

    ctx.body = response;
  },
  deployAvailability(ctx) {
    const response = strapi
      .plugin("vercel-deploy")
      .service("deploy")
      .deployAvailability();

    if (response.error) {
      return ctx.internalServerError(`Server error: ${response.error}`);
    }

    ctx.body = response;
  },
};
