/**
 * Notification Message
 * @typedef {Object} NotificationMessage
 * @property {string} id
 * @property {string | undefined} defaultMessage
 * @property {Object | undefined} values
 */

/**
 * Notification Link
 * @typedef {Object} NotificationLink
 * @property {string | undefined} target
 * @property {string} url
 * @property {string | NotificationMessage} label
 */

/**
 * Notification Config
 * @typedef {Object} NotificationConfig
 * @property {number | undefined} id
 * @property {string | NotificationMessage} message
 * @property {NotificationLink | undefined} link
 * @property {"info" | "warning" | "success" | undefined} type
 * @property {() => void | undefined} onClose Callback that will be called right before the notification disappears
 * @property {number | undefined} timeout
 * @property {boolean | undefined} blockTransition
 */

/**
 * Notification Props
 * @typedef {Object} Props
 * @property {() => void} onClose Callback that will hide the notification
 * @property {NotificationConfig} notification
 */

exports.unused = {};
