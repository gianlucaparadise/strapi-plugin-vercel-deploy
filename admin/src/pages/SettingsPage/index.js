/*
 *
 * SettingsPage
 *
 */

import React, { memo, useEffect, useState } from "react";

import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout } from "@strapi/design-system/Layout";
import { Stack } from "@strapi/design-system/Stack";
import { Field, FieldLabel, FieldInput } from "@strapi/design-system/Field";
import { Link } from "@strapi/design-system/Link";
import { Typography } from "@strapi/design-system/Typography";
import { Loader } from "@strapi/design-system/Loader";
import { Flex } from "@strapi/design-system/Flex";

import DeploymentsEmptyState from "../../components/DeploymentsEmptyState";
import { getConfig } from "../../utils/api";
import FormattedMessage from "../../components/FormattedMessage";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";

/**
 * @typedef {import('../../../../types/typedefs').PluginConfigMap} PluginConfigMap
 */

const BoxField = ({ fieldName, children }) => {
  const horizontalPadding = 6;
  const verticalPadding = 2;
  return (
    <Box
      paddingLeft={horizontalPadding}
      paddingRight={horizontalPadding}
      paddingTop={verticalPadding}
      paddingBottom={verticalPadding}
    >
      <Field name={fieldName}>{children}</Field>
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

  const [hasError, setHasError] = useState(false);
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
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsLoading, setPluginConfig]);

  const deployHook = pluginConfig.deployHook || "";
  const apiToken = pluginConfig.apiToken || "";
  const appFilter = pluginConfig.appFilter || "";

  if (isLoading) {
    return (
      <Flex justifyContent="center">
        <Loader>
          <FormattedMessage labelId="settings-page.settings-container.loader" />
        </Loader>
      </Flex>
    );
  }

  if (hasError) {
    return (
      <Box padding={8} background="neutral100">
        <DeploymentsEmptyState type="ERROR_CONFIG" />
      </Box>
    );
  }

  return (
    <>
      <BoxField fieldName="vercel-deploy-hook">
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
          <Box>
            <Typography variant="pi">
              <FormattedMessage labelId="settings-page.deploy-hook.learn-more-intro" />
              <Link isExternal href="https://vercel.com/docs/git/deploy-hooks">
                <FormattedMessage labelId="settings-page.deploy-hook.learn-more-link-text" />
              </Link>
            </Typography>
          </Box>
        </Stack>
      </BoxField>
      <BoxField fieldName="vercel-deploy-api-token">
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
          <Box>
            <Typography variant="pi">
              <FormattedMessage labelId="settings-page.api-token.learn-more-intro" />
              <Link isExternal href="https://vercel.com/account/tokens">
                <FormattedMessage labelId="settings-page.api-token.learn-more-link-text" />
              </Link>
            </Typography>
          </Box>
        </Stack>
      </BoxField>
      <BoxField fieldName="vercel-deploy-app-name">
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
          <Box>
            <Typography variant="pi">
              <FormattedMessage labelId="settings-page.app-name.learn-more-intro" />
              <Link isExternal href="https://vercel.com/dashboard">
                <FormattedMessage labelId="settings-page.app-name.learn-more-link-text" />
              </Link>
              <FormattedMessage labelId="settings-page.app-name.learn-more-outro" />
            </Typography>
          </Box>
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
        <BaseHeaderLayout
          title={headerTitle}
          subtitle={headerSubtitle}
          as="h2"
        />
      </Box>
      <SettingsContainer />
    </>
  );
};

export default memo(SettingsPage);
