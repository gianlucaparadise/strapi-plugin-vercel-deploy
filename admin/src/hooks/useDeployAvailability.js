import { useState, useEffect } from "react";

import { deployAvailability } from "../utils/api";

/**
 * @typedef {import('../../../types/typedefs').DeployAvailability} DeployAvailability
 * @typedef {import('../../../types/typedefs').ApiErrorType} ApiErrorType
 */

/**
 * Fetch and return the availability of the deploy features
 * @returns {[Boolean, DeployAvailability, ApiErrorType?]} [isLoading, availability, apiError]
 */
export function useDeployAvailability() {
  /** @type {DeployAvailability} */
  const initialAvailability = {};
  const [availability, setAvailability] = useState(initialAvailability);

  /** @type {[ApiErrorType?, (error: ApiErrorType?) => void]} */
  const [apiError, setApiError] = useState(undefined);
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
        if (error && error.response && error.response.status === 403) {
          setApiError("FORBIDDEN");
        } else {
          setApiError("GENERIC_ERROR");
        }
      })
      .finally(() => {
        setIsLoadingAvailability(false);
      });
  }, [setIsLoadingAvailability, setAvailability]);

  return [isLoadingAvailability, availability, apiError];
}
