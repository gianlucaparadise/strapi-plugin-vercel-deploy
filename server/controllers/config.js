"use strict";

module.exports = {
  getConfig(ctx) {
    ctx.body = strapi.plugin("vercel-deploy").service("config").getConfig();
  },
};
