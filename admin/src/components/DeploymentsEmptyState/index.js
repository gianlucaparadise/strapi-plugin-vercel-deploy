/*
 *
 * DeploymentsEmptyState
 *
 */

import React, { memo } from "react";

import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Link } from "@strapi/design-system/Link";
import { Icon } from "@strapi/design-system/Icon";
import EmptyDocuments from "@strapi/icons/EmptyDocuments";
import EmptyPermissions from "@strapi/icons/EmptyPermissions";
import ExclamationMarkCircle from "@strapi/icons/ExclamationMarkCircle";
import EmotionUnhappy from "@strapi/icons/EmotionUnhappy";

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import('./typedefs').EmptyStateType} DeploymentsAvailability
 */

const wrapIcon = (icon) => (
  <Icon aria-hidden={true} as={icon} fontSize={"6rem"} />
);

/**
 * @param {DeploymentsAvailability} listDeployAvailability
 * @returns {JSX.Element}
 */
const getIcon = (listDeployAvailability) => {
  switch (listDeployAvailability) {
    case "MISSING_CONFIG_OBJECT":
      return wrapIcon(ExclamationMarkCircle);

    case "MISSING_CONFIG_VARIABLE":
      return wrapIcon(EmptyPermissions);

    case "MISSING_DEPLOYMENTS":
      return wrapIcon(EmptyDocuments);

    case "ERROR_DEPLOYMENTS":
    case "ERROR_AVAILABILITY":
    case "ERROR_CONFIG":
    default:
      return wrapIcon(EmotionUnhappy);
  }
};

/**
 * @param {DeploymentsAvailability} listDeployAvailability
 * @returns {string|JSX.Element}
 */
const getText = (listDeployAvailability) => {
  switch (listDeployAvailability) {
    case "MISSING_CONFIG_OBJECT":
      return "The config object is empty and this is unexpected";

    case "MISSING_CONFIG_VARIABLE":
      return (
        <>
          You did not set the Vercel API Token. Go to{" "}
          <Link to="/settings/vercel-deploy">Plugin settings</Link> for more
          info
        </>
      );

    case "MISSING_DEPLOYMENTS":
      return "There isn't any deployment in your account";

    case "ERROR_DEPLOYMENTS":
      return "There was an error while fetching the deployments. Please, retry.";

    case "ERROR_AVAILABILITY":
      return "There was an error while fetching the features availability. Please, retry.";

    case "ERROR_CONFIG":
      return "There was an error while fetching the configurations. Please, retry.";

    default:
      return "There was an unexpected error";
  }
};

/**
 * Displays an empty state for the list of containers
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeploymentsEmptyState = ({ type }) => {
  if (type === "AVAILABLE") {
    return <></>;
  }

  return <EmptyStateLayout icon={getIcon(type)} content={getText(type)} />;
};

export default memo(DeploymentsEmptyState);
