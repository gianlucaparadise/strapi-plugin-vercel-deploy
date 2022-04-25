/*
 *
 * HomePage
 *
 */

import React, { memo, useState } from "react";

import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout } from "@strapi/design-system/Layout";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Flex } from "@strapi/design-system/Flex";
import { Typography } from "@strapi/design-system/Typography";
import { Stack } from "@strapi/design-system/Stack";
import { Loader } from "@strapi/design-system/Loader";

import SymmetricBox from "../../components/SymmetricBox";
import DeployButton from "../../components/DeployButton";
import DeploymentsContainer from "../../components/DeploymentsContainer";
import { useDeployAvailability } from "../../hooks/useDeployAvailability";
import DeploymentsEmptyState from "../../components/DeploymentsEmptyState";

/**
 * @typedef {import('../../../../types/typedefs').DeploymentsFetched} DeploymentsFetched
 */

const HomePage = () => {
  const [isLoadingAvailability, availability, hasAvailabilityError] =
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
    <>
      <Box background="neutral100">
        <BaseHeaderLayout
          title="Vercel Deploy"
          subtitle="Deploy your website hosted on Vercel"
          as="h2"
        />
      </Box>
      <SymmetricBox paddingHorizontal={8} paddingVertical={2}>
        <Box padding={4}>
          <Stack>
            <Typography variant="beta">Manual deploy</Typography>
            <Typography variant="pi" textColor="neutral600">
              Start a deployment on Vercel using the webhook you configured
            </Typography>
          </Stack>
        </Box>
        <Stack horizontal>
          <DeployButton
            hasAvailabilityError={hasAvailabilityError}
            runDeployAvailability={availability?.runDeploy}
            onDeployed={onDeployed}
          />
        </Stack>
      </SymmetricBox>
      <SymmetricBox paddingHorizontal={8} paddingVertical={2}>
        <Box padding={4}>
          <Flex alignItems="center">
            <Stack>
              <Typography variant="beta">Deployments</Typography>
              <Typography variant="pi" textColor="neutral600">
                Latest deployments on you Vercel account
              </Typography>
            </Stack>
            {useDeploymentsPolling && (
              <SymmetricBox paddingHorizontal={2} paddingVertical={0}>
                <Loader small>Fetching deployments</Loader>
              </SymmetricBox>
            )}
          </Flex>
        </Box>
        {canListDeploy ? (
          <DeploymentsContainer
            usePolling={useDeploymentsPolling}
            onDeploymentsFetched={onDeploymentsFetched}
          />
        ) : (
          <DeploymentsEmptyState
            type={
              hasAvailabilityError
                ? "ERROR_AVAILABILITY"
                : availability?.listDeploy
            }
          />
        )}
      </SymmetricBox>
    </>
  );
};

export default memo(HomePage);
