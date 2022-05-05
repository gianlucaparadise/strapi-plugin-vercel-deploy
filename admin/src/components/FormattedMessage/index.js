/**
 *
 * FormattedMessage
 *
 */

import React from "react";
import { useIntl } from "react-intl";

import { Typography } from "@strapi/design-system/Typography";

import getTrad from "../../utils/getTrad";

/**
 * @typedef {import('./typedefs').Props} Props
 */

/**
 * Displays a translated message
 * @param {Props} props
 * @returns {JSX.Element}
 */
const FormattedMessage = ({ labelId, variant, textColor }) => {
  const { formatMessage } = useIntl();
  const label = formatMessage({ id: getTrad(labelId) });

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
