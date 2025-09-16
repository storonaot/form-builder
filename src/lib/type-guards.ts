export const isString = (id: unknown): id is string => {
  return typeof id === "string";
};
