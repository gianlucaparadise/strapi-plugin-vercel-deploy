// The following code is inspired by https://github.com/strapi/strapi/blob/39c02e972392ee1add553a2577b6626e8772fcae/packages/core/admin/admin/src/components/Notifications/index.js

import React, { useState } from "react";

import { NotificationsProvider } from "@strapi/helper-plugin";
import { Stack } from "@strapi/design-system/Stack";

import Notification from "./Notification";

const Notifications = ({ children }) => {
  const [notification, setNotification] = useState(undefined);

  const displayNotification = (config) => {
    setNotification(config);
  };

  const onClose = () => {
    setNotification(undefined);
  };

  return (
    <NotificationsProvider toggleNotification={displayNotification}>
      <Stack
        left="50%"
        marginLeft="-250px"
        position="fixed"
        spacing={2}
        top={`${46 / 16}rem`}
        width={`${500 / 16}rem`}
        zIndex={10}
      >
        {notification && (
          <Notification
            key={notification.id}
            onClose={onClose}
            notification={notification}
          />
        )}
      </Stack>
      {children}
    </NotificationsProvider>
  );
};

export default Notifications;
