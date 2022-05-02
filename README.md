# Vercel Deploy

Strapi v4 plugin to trigger and monitor a deployment on Vercel.

![Vercel Deploy Logo](./assets/strapi-vercel-deploy-logo.png "Vercel Deploy Logo")

## Plugin Preview

Home Page:

![Plugin Home Page](./assets/strapi-vercel-deploy-home.png "Plugin Home Page")

Settings Page:

![Plugin Settings Page](./assets/strapi-vercel-deploy-settings.png "Plugin Settings Page")

## Installation

### Install dependency

Run the following command in your Strapi project to install vercel-deploy:

```shell
yarn add strapi-plugin-vercel-deploy
# or
npm i -S strapi-plugin-vercel-deploy
```

### Enable plugin configuration

Open `config/plugins.js` file and add the vercel-deploy entry:

```js
module.exports = ({ env }) => ({
  "vercel-deploy": {
    enabled: true,
  },
});
```

### Run

You can now run Strapi:

```
yarn develop
```

You should see the **Vercel Deploy** menu in the left panel.

**N.B.** You _may_ need to run `yarn build` in order to see the new menu entries.

Then you can proceed with the plugin configuration.

## Plugin Configuration

### Config properties

Example:

```js
module.exports = ({ env }) => ({
  "vercel-deploy": {
    enabled: true,
    config: {
      deployHook:
        "https://api.vercel.com/v1/integrations/deploy/prj_<deploy-hook>",
      apiToken: "<vercel-api-token>",
      appFilter: "your-app-name-on-vercel",
    },
  },
});
```

The plugin is reading the following configuration variables to work:

- `deployHook`: Url of the git deploy hook exposed in Vercel.

  - You can follow [this](https://vercel.com/docs/git/deploy-hooks) guide to create a deploy hook on Vercel

- `apiToken`: API token of your Vercel account used to fetch the list of deployments

  - Access tokens can be created and managed inside your [account settings](https://vercel.com/account/tokens)

- `appFilter`: Name of your Vercel App used to filter the list of deployments
  - Set the name of your [Vercel App](https://vercel.com/dashboard) to see only the deployments you need

### Environment Configuration

You shouldn't disclose the api token and the deploy hook url for security reasons. Therefore, you shouldn't add these values to versioning in a public git repository. A suggested solution is to use environment variables. Example:

```js
module.exports = ({ env }) => ({
  "vercel-deploy": {
    enabled: true,
    config: {
      deployHook: process.env.VERCEL_DEPLOY_PLUGIN_HOOK,
      apiToken: process.env.VERCEL_DEPLOY_PLUGIN_API_TOKEN,
      appFilter: process.env.VERCEL_DEPLOY_PLUGIN_APP_FILTER,
    },
  },
});
```

#### Local development

For local development, you can add the config properties in your `.env` file:

```shell
VERCEL_DEPLOY_PLUGIN_HOOK="https://api.vercel.com/v1/integrations/deploy/prj_<deploy-hook>"
VERCEL_DEPLOY_PLUGIN_API_TOKEN="<vercel-api-token>"
VERCEL_DEPLOY_PLUGIN_APP_FILTER="your-app-name-on-vercel"
```

#### Server

You can save these values as process env variable on your server (e.g. [this](https://devcenter.heroku.com/articles/config-vars) guide is for Heroku).