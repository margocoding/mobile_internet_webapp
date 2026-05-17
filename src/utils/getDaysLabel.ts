export const getDaysLabel = (days: number) => {
  if (days % 10 === 1 && days % 100 !== 11) {
    return `${days} день`;
  }

  if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) {
    return `${days} дня`;
  }

  return `${days} дней`;
};
