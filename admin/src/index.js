import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Vercel Deploy",
      },
      Component: async () => {
        const component = await import(
          /* webpackChunkName: "[request]" */ "./pages/App"
        );

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });

    const settingsBaseName = `${pluginId}-settings`;
    app.createSettingSection(
      {
        id: settingsBaseName,
        intlLabel: {
          id: `${settingsBaseName}.links-header`,
          defaultMessage: "Vercel Deploy",
        },
      },
      [
        // links
        {
          intlLabel: {
            id: `${settingsBaseName}.link-configuration-label`,
            defaultMessage: "Configuration",
          },
          id: `${settingsBaseName}-link-configuration`,
          to: `/settings/${pluginId}`,
          Component: async () => {
            const component = await import(
              /* webpackChunkName: "[request]" */ "./pages/SettingsApp"
            );

            return component;
          },
          permissions: [],
        },
      ]
    );

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
