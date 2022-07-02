import pluginId from "../pluginId";

const getTrad = (id) => (id ? `${pluginId}.${id}` : undefined);

export default getTrad;
