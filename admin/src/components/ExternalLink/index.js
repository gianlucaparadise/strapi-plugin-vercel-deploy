/**
 *
 * ExternalLink
 *
 */

import React from "react";

import { Link } from "@strapi/design-system/Link";

/**
 * @typedef {import('./typedefs').Props} Props
 */

/**
 * Displays a translated message
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ExternalLink = ({ href, children }) => {
  return (
    <span style={{ marginRight: "0.5em", marginLeft: "0.3em" }}>
      <Link isExternal href={href}>
        {children}
      </Link>
    </span>
  );
};

export default ExternalLink;
