/**
 * @typedef {import("./typedefs").ErrorStateType} ErrorStateType
 * @typedef {import('../../components/Notifications/typedefs').NotificationConfig} NotificationConfig
 */

/**
 * @param {ErrorStateType} type
 * @returns {NotificationConfig} Error Notification
 */
export const getErrorNotification = (type) => {
  /** @type {NotificationConfig} */
  const baseConfig = {
    id: type,
    blockTransition: true,
    type: "warning",
  };

  switch (type) {
    case "MISSING_CONFIG_OBJECT":
      return {
        ...baseConfig,
        message: { id: "deploy-error-message.missing-config-object" },
      };

    case "MISSING_CONFIG_VARIABLE":
      return {
        ...baseConfig,
        message: { id: "deploy-error-message.missing-config-variable.intro" },
        link: {
          label: {
            id: "deploy-error-message.missing-config-variable.link-text",
          },
          url: "/settings/vercel-deploy",
        },
      };

    case "ERROR_AVAILABILITY":
      return {
        ...baseConfig,
        message: { id: "deploy-error-message.error-availability" },
      };

    case "ERROR_FORBIDDEN":
      return {
        ...baseConfig,
        message: { id: "deploy-error-message.error-forbidden" },
      };

    case "ERROR_DEPLOY":
      return {
        ...baseConfig,
        message: { id: "deploy-error-message.error-deploy" },
      };

    default:
      return {
        ...baseConfig,
        message: { id: "deploy-error-message.default" },
      };
  }
};
