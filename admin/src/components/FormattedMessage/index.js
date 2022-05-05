/**
 *
 * FormattedMessage
 *
 */

import React from "react";

import { Typography } from "@strapi/design-system/Typography";

import { useFormattedMessage } from "../../hooks/useFormattedMessage";

/**
 * @typedef {import('./typedefs').Props} Props
 */

/**
 * Displays a translated message
 * @param {Props} props
 * @returns {JSX.Element}
 */
const FormattedMessage = ({ labelId, variant, textColor }) => {
  const label = useFormattedMessage(labelId);

  if (variant || textColor) {
    return (
      <Typography variant={variant} textColor={textColor}>
        {label}
      </Typography>
    );
  }

  return label;
};

export default FormattedMessage;
