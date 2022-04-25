import React, { useEffect, useRef } from "react";

/**
 * @callback VoidCallback
 * @returns {void}
 */

/**
 * Use setInterval
 * @param {VoidCallback} callback function that will be called on interval
 * @param {number} delay Time to wait for the interval
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
