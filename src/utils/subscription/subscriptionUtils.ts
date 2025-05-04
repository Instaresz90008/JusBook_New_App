
/**
 * Calculates the yearly price based on monthly price with a discount
 * @param monthlyPrice The monthly price
 * @param yearlyDiscountPercentage The percentage discount for yearly billing (default: 16%)
 */
export const calculateYearlyPrice = (
  monthlyPrice: number,
  yearlyDiscountPercentage: number = 16
): number => {
  const monthsInYear = 12;
  const discount = 1 - yearlyDiscountPercentage / 100;
  return Math.round(monthlyPrice * monthsInYear * discount);
};

/**
 * Formats a price for display
 * @param price The price to format
 * @param currency The currency symbol (default: $)
 */
export const formatPrice = (price: number | string, currency: string = "$"): string => {
  return `${currency}${price}`;
};

/**
 * Generates a shareable plan link
 * @param planId The plan ID to link to
 */
export const getPlanLink = (planId: string): string => {
  return `/upgrade?plan=${planId}`;
};
