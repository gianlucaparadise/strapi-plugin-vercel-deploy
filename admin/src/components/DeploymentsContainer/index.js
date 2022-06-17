/**
 *
 * DeploymentsContainer
 *
 */

import React from "react";
import { Loader } from "@strapi/design-system/Loader";
import { Flex } from "@strapi/design-system/Flex";

import { useDeployments } from "../../hooks/useDeployments";
import DeploymentsEmptyState from "../DeploymentsEmptyState";
import DeploymentsList from "../DeploymentsList";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";

/**
 * @typedef {import('./typedefs').Deployment} Deployment
 * @typedef {import('./typedefs').Props} Props
 */

/**
 * Displays the of deployments
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeploymentsContainer = ({ usePolling, onDeploymentsFetched }) => {
  const labelLoader = useFormattedMessage("deployments-container.loader");

  const [isLoadingDeployments, deployments, hasDeploymentsError] =
    useDeployments(usePolling, onDeploymentsFetched);

  const hasEmptyDeployments = !deployments || deployments?.length <= 0;

  if (isLoadingDeployments && hasEmptyDeployments) {
    return (
      <Flex justifyContent="center">
        <Loader>{labelLoader}</Loader>
      </Flex>
    );
  }

  if (hasDeploymentsError) {
    return <DeploymentsEmptyState type="ERROR_DEPLOYMENTS" />;
  }

  if (hasEmptyDeployments) {
    return <DeploymentsEmptyState type="MISSING_DEPLOYMENTS" />;
  }

  return <DeploymentsList deployments={deployments} usePolling={usePolling} />;
};

export default DeploymentsContainer;
