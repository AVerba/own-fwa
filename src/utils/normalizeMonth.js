export const normalizeMonth = month => {
  return month.toString().length === 1 ? '0' + month : month;
};
