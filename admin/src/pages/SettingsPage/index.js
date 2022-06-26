/*
 *
 * SettingsPage
 *
 */

import React, { memo, useEffect, useState } from "react";

import { Box } from "@strapi/design-system/Box";
import { HeaderLayout } from "@strapi/design-system/Layout";
import { Stack } from "@strapi/design-system/Stack";
import {
  Field,
  FieldLabel,
  FieldInput,
  FieldHint,
} from "@strapi/design-system/Field";
import { Loader } from "@strapi/design-system/Loader";
import { Flex } from "@strapi/design-system/Flex";

import DeploymentsEmptyState from "../../components/DeploymentsEmptyState";
import { getConfig } from "../../utils/api";
import FormattedMessage from "../../components/FormattedMessage";
import ExternalLink from "../../components/ExternalLink";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";

/**
 * @typedef {import('../../../../types/typedefs').PluginConfigMap} PluginConfigMap
 * @typedef {import('../../../../types/typedefs').ApiErrorType} ApiErrorType
 * @typedef {import('../../components/DeploymentsEmptyState/typedefs').EmptyStateType} EmptyStateType
 */

const BoxField = ({ fieldName, fieldHint, children }) => {
  const horizontalPadding = 10;
  const verticalPadding = 2;
  return (
    <Box
      paddingLeft={horizontalPadding}
      paddingRight={horizontalPadding}
      paddingTop={verticalPadding}
      paddingBottom={verticalPadding}
    >
      <Field name={fieldName} hint={fieldHint}>
        {children}
      </Field>
    </Box>
  );
};

const SettingsContainer = () => {
  const deployHookPlaceholder = useFormattedMessage(
    "settings-page.deploy-hook.placeholder"
  );
  const apiTokenPlaceholder = useFormattedMessage(
    "settings-page.api-token.placeholder"
  );
  const appNamePlaceholder = useFormattedMessage(
    "settings-page.app-name.placeholder"
  );
  const teamIdPlaceholder = useFormattedMessage(
    "settings-page.team-id.placeholder"
  );
  const labelLoader = useFormattedMessage(
    "settings-page.settings-container.loader"
  );

  /** @type {[ApiErrorType?, (error: ApiErrorType?) => void]} */
  const [apiError, setApiError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  /** @type {PluginConfigMap} */
  const initialConfig = {};
  const [pluginConfig, setPluginConfig] = useState(initialConfig);

  useEffect(() => {
    getConfig()
      .then((response) => {
        setPluginConfig(response.data);
      })
      .catch((error) => {
        console.error(
          "[vercel-deploy] error while retrieving plugin config",
          error
        );
        setPluginConfig({});
        if (error && error.response && error.response.status === 403) {
          setApiError("FORBIDDEN");
        } else {
          setApiError("GENERIC_ERROR");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsLoading, setPluginConfig, setApiError]);

  const deployHook = pluginConfig.deployHook || "";
  const apiToken = pluginConfig.apiToken ? `${pluginConfig.apiToken}[...]` : "";
  const appFilter = pluginConfig.appFilter || "";
  const teamFilter = pluginConfig.teamFilter || "";

  if (isLoading) {
    return (
      <Flex justifyContent="center">
        <Loader>{labelLoader}</Loader>
      </Flex>
    );
  }

  if (apiError) {
    /** @type {EmptyStateType} */
    const emptyStateType =
      apiError === "FORBIDDEN"
        ? "ERROR_AVAILABILITY_FORBIDDEN"
        : "ERROR_CONFIG";

    return (
      <Box padding={8} background="neutral100">
        <DeploymentsEmptyState type={emptyStateType} />
      </Box>
    );
  }

  return (
    <>
      <BoxField
        fieldName="vercel-deploy-hook"
        fieldHint={
          <>
            <FormattedMessage labelId="settings-page.deploy-hook.learn-more-intro" />
            <ExternalLink href="https://vercel.com/docs/git/deploy-hooks">
              <FormattedMessage labelId="settings-page.deploy-hook.learn-more-link-text" />
            </ExternalLink>
          </>
        }
      >
        <Stack>
          <FieldLabel required>
            <FormattedMessage labelId="settings-page.deploy-hook.label" />
          </FieldLabel>
          <FieldInput
            type="text"
            placeholder={deployHookPlaceholder}
            value={deployHook}
            disabled={true}
          />
          <FieldHint />
        </Stack>
      </BoxField>
      <BoxField
        fieldName="vercel-deploy-api-token"
        fieldHint={
          <>
            <FormattedMessage labelId="settings-page.api-token.learn-more-intro" />
            <ExternalLink href="https://vercel.com/account/tokens">
              <FormattedMessage labelId="settings-page.api-token.learn-more-link-text" />
            </ExternalLink>
          </>
        }
      >
        <Stack>
          <FieldLabel required>
            <FormattedMessage labelId="settings-page.api-token.label" />
          </FieldLabel>
          <FieldInput
            type="text"
            placeholder={apiTokenPlaceholder}
            value={apiToken}
            disabled={true}
          />
          <FieldHint />
        </Stack>
      </BoxField>
      <BoxField
        fieldName="vercel-deploy-app-name"
        fieldHint={
          <>
            <FormattedMessage labelId="settings-page.app-name.learn-more-intro" />
            <ExternalLink href="https://vercel.com/dashboard">
              <FormattedMessage labelId="settings-page.app-name.learn-more-link-text" />
            </ExternalLink>
            <FormattedMessage labelId="settings-page.app-name.learn-more-outro" />
          </>
        }
      >
        <Stack>
          <FieldLabel>
            <FormattedMessage labelId="settings-page.app-name.label" />
          </FieldLabel>
          <FieldInput
            type="text"
            placeholder={appNamePlaceholder}
            value={appFilter}
            disabled={true}
          />
          <FieldHint />
        </Stack>
      </BoxField>
      <BoxField
        fieldName="vercel-deploy-team-id"
        fieldHint={
          <>
            <FormattedMessage labelId="settings-page.team-id.learn-more-intro" />
            <ExternalLink href="https://vercel.com/dashboard">
              <FormattedMessage labelId="settings-page.team-id.learn-more-link-text" />
            </ExternalLink>
            <FormattedMessage labelId="settings-page.team-id.learn-more-outro" />
          </>
        }
      >
        <Stack>
          <FieldLabel>
            <FormattedMessage labelId="settings-page.team-id.label" />
          </FieldLabel>
          <FieldInput
            type="text"
            placeholder={teamIdPlaceholder}
            value={teamFilter}
            disabled={true}
          />
          <FieldHint />
        </Stack>
      </BoxField>
    </>
  );
};

const SettingsPage = () => {
  const headerTitle = useFormattedMessage("settings-page.header.title");
  const headerSubtitle = useFormattedMessage("settings-page.header.subtitle");

  return (
    <>
      <Box background="neutral100">
        <HeaderLayout title={headerTitle} subtitle={headerSubtitle} as="h2" />
      </Box>
      <SettingsContainer />
    </>
  );
};

export default memo(SettingsPage);
