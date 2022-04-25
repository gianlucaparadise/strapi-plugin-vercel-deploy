/**
 *
 * SymmetricBox
 *
 */

import React from "react";

import { Box } from "@strapi/design-system/Box";

/**
 * @typedef {import('./typedefs').Props} Props
 */

/**
 * Displays the Strapi Box with symmetric padding
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SymmetricBox = ({
  paddingHorizontal = 0,
  paddingVertical = 0,
  children,
}) => {
  return (
    <Box
      paddingLeft={paddingHorizontal}
      paddingRight={paddingHorizontal}
      paddingTop={paddingVertical}
      paddingBottom={paddingVertical}
    >
      {children}
    </Box>
  );
};

export default SymmetricBox;
