import { useIntl } from "react-intl";

import getTrad from "../utils/getTrad";

/**
 * Translation Key
 * @typedef {import('../types/typedefs').TranslationKey} TranslationKey
 */

/**
 * Retrieve a localized label
 * @param {TranslationKey} labelId Id of the label to be translated
 * @returns {string}
 */
export const useFormattedMessage = (labelId) => {
  const { formatMessage } = useIntl();
  const label = formatMessage({ id: getTrad(labelId) });
  return label;
};
