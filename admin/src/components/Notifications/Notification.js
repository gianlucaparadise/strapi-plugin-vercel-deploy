// The following code in inspired by https://github.com/strapi/strapi/blob/3268c71b3ec67fc713d07d38c715f0a1e3f111e9/packages/core/admin/admin/src/components/Notifications/Notification/index.js

import React, { useEffect, useCallback } from "react";
import { useIntl } from "react-intl";

import { Alert } from "@strapi/design-system/Alert";
import { Link } from "@strapi/design-system/v2/Link";

import getTrad from "../../utils/getTrad";

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import('./typedefs').NotificationMessage} NotificationMessage
 */

/**
 * @param {string | NotificationMessage} msg
 */
const getId = (msg) => (typeof msg === "string" ? msg : getTrad(msg?.id));

/**
 * @param {string | NotificationMessage} msg
 */
const getDefaultMessage = (msg) => {
  if (typeof msg === "string") return msg;

  return msg?.defaultMessage || getTrad(msg?.id);
};

/**
 * Display a Notification that automatically disappears
 * @param {Props} props
 * @returns {JSX.Element}
 */
const Notification = ({ onClose: mainOnClose, notification }) => {
  const { formatMessage } = useIntl();
  const { message, link, type, id, onClose, timeout, blockTransition } =
    notification;

  const formattedMessage = (msg) =>
    typeof msg === "string" ? msg : formatMessage(msg, msg.values);
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }

    mainOnClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    let timeoutToClear;

    if (!blockTransition) {
      timeoutToClear = setTimeout(() => {
        handleClose();
      }, timeout || 2500);
    }

    return () => clearTimeout(timeoutToClear);
  }, [blockTransition, handleClose, timeout]);

  let variant;

  if (type === "info") {
    variant = "default";
  } else if (type === "warning") {
    variant = "danger";
  } else {
    variant = "success";
  }

  return (
    <Alert
      action={
        link ? (
          <Link href={link.url} isExternal>
            {formatMessage({
              id: getId(link.label),
              defaultMessage: getDefaultMessage(link.label),
            })}
          </Link>
        ) : undefined
      }
      onClose={handleClose}
      closeLabel="Close"
      title={""}
      variant={variant}
    >
      {formattedMessage({
        id: getId(message),
        defaultMessage: getDefaultMessage(message),
      })}
    </Alert>
  );
};

export default Notification;
