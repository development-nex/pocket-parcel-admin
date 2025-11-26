export const validatePagination = (
  search,
  defaults = { page: 1, limit: 20 }
) => {
  return {
    page: Number(search.page) || defaults.page,
    limit: Number(search.limit) || defaults.limit,
  };
};
