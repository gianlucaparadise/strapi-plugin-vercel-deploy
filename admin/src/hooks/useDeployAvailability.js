import { useState, useEffect } from "react";

import { deployAvailability } from "../utils/api";

/**
 * @typedef {import('../../../types/typedefs').DeployAvailability} DeployAvailability
 */

/**
 * Fetch and return the availability of the deploy features
 * @returns {[Boolean, DeployAvailability, Boolean]} [isLoading, availability, hasError]
 */
export function useDeployAvailability() {
  /** @type {DeployAvailability} */
  const initialAvailability = {};
  const [availability, setAvailability] = useState(initialAvailability);

  const [hasError, setHasError] = useState(false);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true);

  useEffect(() => {
    deployAvailability()
      .then((response) => {
        setAvailability(response.data);
      })
      .catch((error) => {
        console.error(
          "[vercel-deploy] error while retrieving availability",
          error
        );
        setAvailability({});
        setHasError(true);
      })
      .finally(() => {
        setIsLoadingAvailability(false);
      });
  }, [setIsLoadingAvailability, setAvailability]);

  return [isLoadingAvailability, availability, hasError];
}
