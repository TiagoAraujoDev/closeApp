export const formatCurrency = (value: number): string => {
  const formattedValue = value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formattedValue;
};
