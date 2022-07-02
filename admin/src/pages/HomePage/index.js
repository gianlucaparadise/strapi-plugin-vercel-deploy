/*
 *
 * HomePage
 *
 */

import React, { memo, useState } from "react";

import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout } from "@strapi/design-system/Layout";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Link } from "@strapi/design-system/Link";
import ArrowLeft from "@strapi/icons/ArrowLeft";

import Notifications from "../../components/Notifications";
import SymmetricBox from "../../components/SymmetricBox";
import DeployButton from "../../components/DeployButton";
import DeploymentsContainer from "../../components/DeploymentsContainer";
import DeploymentsEmptyState from "../../components/DeploymentsEmptyState";
import { useDeployAvailability } from "../../hooks/useDeployAvailability";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";

/**
 * @typedef {import('../../../../types/typedefs').DeploymentsFetched} DeploymentsFetched
 * @typedef {import('../../../../types/typedefs').ApiErrorType} ApiErrorType
 * @typedef {import('../../../../types/typedefs').FeatureAvailability} FeatureAvailability
 * @typedef {import('../../components/DeploymentsEmptyState/typedefs').EmptyStateType} EmptyStateType
 */

/**
 *
 * @param {ApiErrorType} availabilityApiError
 * @param {FeatureAvailability} listDeployAvailability
 * @returns {EmptyStateType}
 */
const getDeploymentsEmptyStateType = (
  availabilityApiError,
  listDeployAvailability
) => {
  if (availabilityApiError) {
    switch (availabilityApiError) {
      case "FORBIDDEN":
        return "ERROR_AVAILABILITY_FORBIDDEN";

      case "GENERIC_ERROR":
      default:
        return "ERROR_AVAILABILITY_GENERIC";
    }
  }

  return listDeployAvailability;
};

const HomePage = () => {
  const headerTitle = useFormattedMessage("home-page.header.title");
  const headerSubtitle = useFormattedMessage("home-page.header.subtitle");

  const [isLoadingAvailability, availability, apiError] =
    useDeployAvailability();

  const [useDeploymentsPolling, setUseDeploymentsPolling] = useState(false);
  /** @type {DeploymentsFetched} */
  const onDeploymentsFetched = (hasNonFinalState) => {
    // I want to keep fetching deployments if there is a deployment in progress until it finishes
    setUseDeploymentsPolling(hasNonFinalState);
  };

  if (isLoadingAvailability) {
    return <LoadingIndicatorPage />;
  }

  const canListDeploy = availability?.listDeploy == "AVAILABLE";

  const onDeployed = (hasError) => {
    if (hasError) return;
    setUseDeploymentsPolling(true);
  };

  return (
    <Notifications>
      <Box background="neutral100">
        <BaseHeaderLayout
          navigationAction={
            <Link startIcon={<ArrowLeft />} to="/">
              Go back
            </Link>
          }
          primaryAction={
            <DeployButton
              availabilityApiError={apiError}
              runDeployAvailability={availability?.runDeploy}
              onDeployed={onDeployed}
            />
          }
          title={headerTitle}
          subtitle={headerSubtitle}
          as="h2"
        />
      </Box>
      <SymmetricBox paddingHorizontal={10} paddingVertical={2}>
        {canListDeploy ? (
          <DeploymentsContainer
            usePolling={useDeploymentsPolling}
            onDeploymentsFetched={onDeploymentsFetched}
          />
        ) : (
          <DeploymentsEmptyState
            type={getDeploymentsEmptyStateType(
              apiError,
              availability?.listDeploy
            )}
          />
        )}
      </SymmetricBox>
    </Notifications>
  );
};

export default memo(HomePage);
