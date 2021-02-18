export const formatDec = (num) => {
  return new Intl.NumberFormat([], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};
