/*
 *
 * DeployButton
 *
 */

import React, { useState, useEffect } from "react";

import { useNotification } from "@strapi/helper-plugin";
import { Button } from "@strapi/design-system/Button";
import { Loader } from "@strapi/design-system/Loader";
import Plus from "@strapi/icons/Plus";

import SymmetricBox from "../../components/SymmetricBox";
import FormattedMessage from "../FormattedMessage";
import { getErrorNotification } from "./ErrorUtils";
import { runDeploy } from "../../utils/api";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import('./typedefs').FeatureAvailability} FeatureAvailability
 * @typedef {import('./typedefs').ApiErrorType} ApiErrorType
 * @typedef {import('./typedefs').ErrorStateType} DeployErrorStateType
 * @typedef {import('../../components/Notifications/typedefs').NotificationConfig} NotificationConfig
 */

/**
 *
 * @param {boolean} hasDeployError
 * @param {ApiErrorType} availabilityApiError
 * @param {FeatureAvailability} runDeployAvailability
 * @returns {DeployErrorStateType}
 */
const getDeployErrorState = (
  hasDeployError,
  availabilityApiError,
  runDeployAvailability
) => {
  if (hasDeployError) return "ERROR_DEPLOY";
  if (availabilityApiError) {
    switch (availabilityApiError) {
      case "FORBIDDEN":
        return "ERROR_FORBIDDEN";

      case "GENERIC_ERROR":
      default:
        return "ERROR_AVAILABILITY";
    }
  }
  return runDeployAvailability;
};

/**
 * Display a button to deploy together with an error message
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeployButton = ({
  availabilityApiError,
  runDeployAvailability,
  onDeployed,
}) => {
  /** @type {(config: NotificationConfig) => void} */
  const toggleNotification = useNotification();
  const labelLoader = useFormattedMessage("deploy-button.loader");

  const [isLoading, setIsLoading] = useState(false);
  const [hasDeployError, setHasDeployError] = useState(false);

  const canDeploy = runDeployAvailability == "AVAILABLE";
  const deployErrorState = getDeployErrorState(
    hasDeployError,
    availabilityApiError,
    runDeployAvailability
  );

  useEffect(() => {
    const hasDeployedSuccessfully = deployErrorState === "AVAILABLE";
    if (!hasDeployedSuccessfully) {
      const notification = getErrorNotification(deployErrorState);
      toggleNotification(notification);
    }
  }, [deployErrorState, toggleNotification, getErrorNotification]);

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
