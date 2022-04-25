# Vercel Deploy

Strapi v4 plugin to trigger and monitor a deployment on Vercel

## Environment Conifg

In order to use the plugin, you need to set the following environment variables:

- `VERCEL_DEPLOY_PLUGIN_HOOK`: Url of the git deploy hook exposed in Vercel.
  - You can follow [this](https://vercel.com/docs/git/deploy-hooks) guide to create a deploy hook on Vercel
  - Then you can save the hook url as process env variable (e.g. [this](https://devcenter.heroku.com/articles/config-vars) guide is for Heroku)

- `VERCEL_DEPLOY_PLUGIN_API_TOKEN`: API token of your Vercel account used to fetch the list of deployments 
  - Access tokens can be created and managed inside your [account settings](https://vercel.com/account/tokens)
  - Then you can save the hook url as process env variable (e.g. [this](https://devcenter.heroku.com/articles/config-vars) guide is for Heroku)

- `VERCEL_DEPLOY_PLUGIN_APP_FILTER`: Name of your Vercel App used to filter the list of deployments
  - Set the name of your [Vercel App](https://vercel.com/dashboard) to see only the deployments you need
  - Then you can save the hook url as process env variable (e.g. [this](https://devcenter.heroku.com/articles/config-vars) guide is for Heroku)

