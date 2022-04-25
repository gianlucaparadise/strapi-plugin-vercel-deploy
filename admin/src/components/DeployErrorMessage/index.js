/**
 *
 * DeployErrorMessage
 *
 */

import React from "react";
import { Link } from "@strapi/design-system/Link";
import { Typography } from "@strapi/design-system/Typography";

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
      return "Unexpected config error: the config object is empty";

    case "MISSING_CONFIG_VARIABLE":
      return (
        <>
          Config error: You did not set the Vercel Deploy Hook. Go to{" "}
          <Link to="/settings/vercel-deploy">Plugin settings</Link> for more
          info
        </>
      );

    case "ERROR_AVAILABILITY":
      return "Unexpected availability error: please retry";

    case "ERROR_DEPLOY":
      return "Unexpected deploy error: please retry";

    default:
      return "Unexpected error";
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
