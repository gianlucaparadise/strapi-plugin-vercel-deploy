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
import { Stack } from "@strapi/design-system/Stack";
import { Loader } from "@strapi/design-system/Loader";

import SymmetricBox from "../../components/SymmetricBox";
import DeployButton from "../../components/DeployButton";
import DeploymentsContainer from "../../components/DeploymentsContainer";
import { useDeployAvailability } from "../../hooks/useDeployAvailability";
import DeploymentsEmptyState from "../../components/DeploymentsEmptyState";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";
import FormattedMessage from "../../components/FormattedMessage";

/**
 * @typedef {import('../../../../types/typedefs').DeploymentsFetched} DeploymentsFetched
 */

const HomePage = () => {
  const headerTitle = useFormattedMessage("home-page.header.title");
  const headerSubtitle = useFormattedMessage("home-page.header.subtitle");
  const labelLoader = useFormattedMessage("home-page.deployments.loader");

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
          title={headerTitle}
          subtitle={headerSubtitle}
          as="h2"
        />
      </Box>
      <SymmetricBox paddingHorizontal={8} paddingVertical={2}>
        <Box padding={4}>
          <Stack>
            <FormattedMessage
              labelId="home-page.deploy-button.title"
              variant="beta"
            />
            <FormattedMessage
              labelId="home-page.deploy-button.subtitle"
              variant="pi"
              textColor="neutral600"
            />
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
              <FormattedMessage
                labelId="home-page.deployments.title"
                variant="beta"
              />
              <FormattedMessage
                labelId="home-page.deployments.subtitle"
                variant="pi"
                textColor="neutral600"
              />
            </Stack>
            {useDeploymentsPolling && (
              <SymmetricBox paddingHorizontal={2} paddingVertical={0}>
                <Loader small>{labelLoader}</Loader>
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
