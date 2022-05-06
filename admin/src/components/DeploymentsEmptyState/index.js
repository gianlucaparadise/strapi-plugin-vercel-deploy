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

import FormattedMessage from "../FormattedMessage";

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
      return (
        <FormattedMessage labelId="deployments-empty-state.missing-config-object" />
      );

    case "MISSING_CONFIG_VARIABLE":
      return (
        <>
          <FormattedMessage labelId="deployments-empty-state.missing-config-variable.intro" />
          <Link to="/settings/vercel-deploy">
            <FormattedMessage labelId="deployments-empty-state.missing-config-variable.link-text" />
          </Link>
          <FormattedMessage labelId="deployments-empty-state.missing-config-variable.outro" />
        </>
      );

    case "MISSING_DEPLOYMENTS":
      return (
        <FormattedMessage labelId="deployments-empty-state.missing-deployments" />
      );

    case "ERROR_DEPLOYMENTS":
      return (
        <FormattedMessage labelId="deployments-empty-state.error-deployments" />
      );

    case "ERROR_AVAILABILITY":
      return (
        <FormattedMessage labelId="deployments-empty-state.error-availability" />
      );

    case "ERROR_CONFIG":
      return (
        <FormattedMessage labelId="deployments-empty-state.error-config" />
      );

    default:
      return <FormattedMessage labelId="deployments-empty-state.default" />;
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
