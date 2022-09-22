export const commonDate = date => {
  const dayQuery = new Date(date).getDate().toString().padStart(2, '0');
  const monthQuery = (new Date(date).getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const yearQuery = new Date(date).getFullYear();
  const newDate = {
    day: dayQuery,
    month: monthQuery,
    year: yearQuery,
  };
  return newDate;
};
