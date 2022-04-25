import { useEffect, useState } from "react";

import { useInterval } from "./useInterval";
import { getDeployments } from "../utils/api";

/**
 * @typedef {import('../../../types/typedefs').Deployment} Deployment
 * @typedef {import('../../../types/typedefs').DeploymentState} DeploymentState
 * @typedef {import('../../../types/typedefs').DeploymentsFetched} DeploymentsFetched
 */

const INTERVAL_DELAY = 1000;

/** @type {DeploymentState[]} */
const finalStates = ["CANCELED", "ERROR", "READY"];

/**
 * @param {Deployment[]} deployments
 * @returns {boolean}
 */
const containsNonFinalState = (deployments) => {
  const nonFinalStateIndex = deployments.findIndex(
    (d) => !finalStates.includes(d.state)
  );
  return nonFinalStateIndex >= 0;
};

/**
 * Fetch and return the list of deployments
 * @param {boolean} usePolling
 * @param {DeploymentsFetched} onDeploymentsFetched
 * @returns {[Boolean, Deployment[], Boolean]} [isLoading, deployments, hasError]
 */
export function useDeployments(usePolling, onDeploymentsFetched) {
  /** @type {Deployment[]} */
  const initialDeployments = [];
  const [deployments, setDeployments] = useState(initialDeployments);
  const [hasError, setHasError] = useState(false);
  const [isLoadingDeployments, setIsLoadingDeployments] = useState(true);

  /** @param {Deployment[]} deployments */
  const triggerCallback = (deployments) => {
    if (!onDeploymentsFetched) return;
    const hasNonFinalState = containsNonFinalState(deployments);
    onDeploymentsFetched(hasNonFinalState);
  };

  const fetchDeployments = () => {
    getDeployments()
      .then((response) => {
        setDeployments(response.deployments);
        triggerCallback(response.deployments);
      })
      .catch((error) => {
        console.error(
          "[vercel-deploy] error while retrieving deployments",
          error
        );
        setHasError(true);
        setDeployments([]);
        triggerCallback([]);
      })
      .finally(() => {
        setIsLoadingDeployments(false);
      });
  };

  useEffect(() => {
    if (!usePolling) {
      fetchDeployments();
    }
  }, [
    setDeployments,
    setIsLoadingDeployments,
    usePolling,
    onDeploymentsFetched,
  ]);

  const delay = usePolling ? INTERVAL_DELAY : null;
  useInterval(() => {
    fetchDeployments();
  }, delay);

  return [isLoadingDeployments, deployments, hasError];
}
