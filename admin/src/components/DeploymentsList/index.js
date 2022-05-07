/**
 *
 * DeploymentsList
 *
 */

import React from "react";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { Link } from "@strapi/design-system/Link";
import { Badge } from "@strapi/design-system/Badge";

import FormattedMessage from "../FormattedMessage";

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import("../../../../types/typedefs").DeploymentState} DeploymentState
 */

const getDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

/**
 * @param {DeploymentState} deploymentState
 * @returns {string} Strapi color
 */
const getStateColor = (deploymentState) => {
  switch (deploymentState) {
    case "ERROR":
    case "CANCELED":
      return "danger500";

    case "READY":
      return "success500";

    default:
      return "neutral600";
  }
};

/**
 * Displays the table with the deployments
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeploymentsList = ({ deployments }) => {
  const ROW_COUNT = deployments.length + 1;
  const COL_COUNT = 5;

  const headerFontVariant = "sigma";
  const cellTextColor = "neutral800";

  return (
    <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
      <Thead>
        <Tr>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="deployments-list.table-header.app-name"
            />
          </Th>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="deployments-list.table-header.state"
            />
          </Th>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="deployments-list.table-header.creation-date"
            />
          </Th>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="deployments-list.table-header.deployment"
            />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {deployments.map((entry) => (
          <Tr key={entry.uid}>
            <Td>
              <Typography textColor={cellTextColor}>{entry.name}</Typography>
            </Td>
            <Td>
              <Badge textColor={getStateColor(entry.state)}>
                {entry.state}
              </Badge>
            </Td>
            <Td>
              <Typography textColor={cellTextColor}>
                {getDate(entry.created)}
              </Typography>
            </Td>
            <Td>
              <Link href={entry.url} isExternal>
                <FormattedMessage labelId="deployments-list.table-body.visit-url-text" />
              </Link>
              {" | "}
              <Link href={entry.inspectorUrl} isExternal>
                <FormattedMessage labelId="deployments-list.table-body.inspect-url-text" />
              </Link>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DeploymentsList;
