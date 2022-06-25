/*
 *
 * DeploymentsEmptyState
 *
 */

import React, { memo } from "react";

import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { LinkButton } from "@strapi/design-system/LinkButton";
import EmptyDocuments from "@strapi/icons/EmptyDocuments";
import EmptyPermissions from "@strapi/icons/EmptyPermissions";
import ExclamationMarkCircle from "@strapi/icons/ExclamationMarkCircle";
import EmotionUnhappy from "@strapi/icons/EmotionUnhappy";
import ArrowRight from "@strapi/icons/ArrowRight";

import { useFormattedMessage } from "../../hooks/useFormattedMessage";

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import('./typedefs').EmptyStateType} DeploymentsAvailability
 */

const wrapIcon = (icon) => <div style={{ fontSize: "6rem" }}>{icon}</div>;

/**
 * @param {DeploymentsAvailability} listDeployAvailability
 * @returns {JSX.Element}
 */
const getIcon = (listDeployAvailability) => {
  switch (listDeployAvailability) {
    case "MISSING_CONFIG_OBJECT":
      return wrapIcon(<ExclamationMarkCircle />);

    case "MISSING_CONFIG_VARIABLE":
      return wrapIcon(<EmptyPermissions />);

    case "MISSING_DEPLOYMENTS":
      return wrapIcon(<EmptyDocuments />);

    case "ERROR_DEPLOYMENTS":
    case "ERROR_AVAILABILITY_GENERIC":
    case "ERROR_AVAILABILITY_FORBIDDEN":
    case "ERROR_CONFIG":
    default:
      return wrapIcon(<EmotionUnhappy />);
  }
};

/**
 * @param {DeploymentsAvailability} listDeployAvailability
 * @returns {string}
 */
const getTextId = (listDeployAvailability) => {
  switch (listDeployAvailability) {
    case "MISSING_CONFIG_OBJECT":
      return "deployments-empty-state.missing-config-object";

    case "MISSING_CONFIG_VARIABLE":
      return "deployments-empty-state.missing-config-variable";

    case "MISSING_DEPLOYMENTS":
      return "deployments-empty-state.missing-deployments";

    case "ERROR_DEPLOYMENTS":
      return "deployments-empty-state.error-deployments";

    case "ERROR_AVAILABILITY_GENERIC":
      return "deployments-empty-state.error-availability";

    case "ERROR_AVAILABILITY_FORBIDDEN":
      return "deployments-empty-state.error-forbidden";

    case "ERROR_CONFIG":
      return "deployments-empty-state.error-config";

    default:
      return "deployments-empty-state.default";
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

  const messageId = getTextId(type);
  const message = useFormattedMessage(messageId);

  const linkText = useFormattedMessage(
    "deployments-empty-state.missing-config-variable.link-text"
  );
  const action = type === "MISSING_CONFIG_VARIABLE" && (
    <LinkButton
      variant={"secondary"}
      startIcon={<ArrowRight />}
      to="/settings/vercel-deploy"
    >
      {linkText}
    </LinkButton>
  );

  return (
    <EmptyStateLayout icon={getIcon(type)} content={message} action={action} />
  );
};

export default memo(DeploymentsEmptyState);
