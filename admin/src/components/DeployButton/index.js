/*
 *
 * DeployButton
 *
 */

import React, { useState } from "react";

import { Button } from "@strapi/design-system/Button";
import { Loader } from "@strapi/design-system/Loader";
import Plus from "@strapi/icons/Plus";

import SymmetricBox from "../../components/SymmetricBox";
import DeployErrorMessage from "../../components/DeployErrorMessage";
import { runDeploy } from "../../utils/api";
import FormattedMessage from "../FormattedMessage";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import('./typedefs').FeatureAvailability} FeatureAvailability
 * @typedef {import('../../components/DeployErrorMessage/typedefs').ErrorStateType} DeployErrorStateType
 */

/**
 *
 * @param {boolean} hasDeployError
 * @param {boolean} hasAvailabilityError
 * @param {FeatureAvailability} runDeployAvailability
 * @returns {DeployErrorStateType}
 */
const getDeployErrorState = (
  hasDeployError,
  hasAvailabilityError,
  runDeployAvailability
) => {
  if (hasDeployError) return "ERROR_DEPLOY";
  if (hasAvailabilityError) return "ERROR_AVAILABILITY";
  return runDeployAvailability;
};

/**
 * Display a button to deploy together with an error message
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeployButton = ({
  hasAvailabilityError,
  runDeployAvailability,
  onDeployed,
}) => {
  const labelLoader = useFormattedMessage("deploy-button.loader");

  const [isLoading, setIsLoading] = useState(false);
  const [hasDeployError, setHasDeployError] = useState(false);

  const canDeploy = runDeployAvailability == "AVAILABLE";
  const deployErrorState = getDeployErrorState(
    hasDeployError,
    hasAvailabilityError,
    runDeployAvailability
  );
  const hasDeployedSuccessfully = deployErrorState === "AVAILABLE";

  const runDeployHandler = async () => {
    try {
      setHasDeployError(false);
      setIsLoading(true);
      const response = await runDeploy();
      if (onDeployed) onDeployed(false);
    } catch (error) {
      console.error("[vercel-deploy] Error while running deploy", error);
      if (onDeployed) onDeployed(true);
      setHasDeployError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {isLoading && (
        <SymmetricBox paddingHorizontal={4}>
          <Loader small>{labelLoader}</Loader>
        </SymmetricBox>
      )}
      {!hasDeployedSuccessfully && (
        <SymmetricBox paddingHorizontal={1}>
          <DeployErrorMessage type={"ERROR_DEPLOY"} />
        </SymmetricBox>
      )}
      <SymmetricBox paddingHorizontal={4}>
        <Button onClick={runDeployHandler} disabled={!canDeploy || isLoading}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Plus />
            <span style={{ width: "8px" }} />
            <FormattedMessage labelId="deploy-button.label" />
          </div>
        </Button>
      </SymmetricBox>
    </div>
  );
};

export default DeployButton;
