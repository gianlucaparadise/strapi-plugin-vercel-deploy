/**
 *
 * DeployErrorMessage
 *
 */

import React from "react";
import { Link } from "@strapi/design-system/Link";
import { Typography } from "@strapi/design-system/Typography";

import FormattedMessage from "../FormattedMessage";

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import("./typedefs").ErrorStateType} ErrorStateType
 */

/**
 * @param {ErrorStateType} type
 * @returns {string|JSX.Element} Error message
 */
const getMessage = (type) => {
  switch (type) {
    case "MISSING_CONFIG_OBJECT":
      return (
        <FormattedMessage labelId="deploy-error-message.missing-config-object" />
      );

    case "MISSING_CONFIG_VARIABLE":
      return (
        <>
          <FormattedMessage labelId="deploy-error-message.missing-config-variable.intro" />
          <Link to="/settings/vercel-deploy">
            <FormattedMessage labelId="deploy-error-message.missing-config-variable.link-text" />
          </Link>
          <FormattedMessage labelId="deploy-error-message.missing-config-variable.outro" />
        </>
      );

    case "ERROR_AVAILABILITY":
      return (
        <FormattedMessage labelId="deploy-error-message.error-availability" />
      );

    case "ERROR_DEPLOY":
      return <FormattedMessage labelId="deploy-error-message.error-deploy" />;

    default:
      return <FormattedMessage labelId="deploy-error-message.default" />;
  }
};

/**
 * Depending on the input status, display an error message
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeployErrorMessage = ({ type }) => {
  if (type === "AVAILABLE") {
    return <></>;
  }

  return (
    <Typography textColor="danger500" variant="pi">
      {getMessage(type)}
    </Typography>
  );
};

export default DeployErrorMessage;
