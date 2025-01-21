export function getPriceWithDiscount(
  price: number | "",
  discount: number | "",
  type: "percentage" | "amount" | "none",
): number {
  const parsedPrice = price === "" ? 0 : price;
  const parsedDiscount = discount === "" ? 0 : discount;

  if (type === "percentage") {
    return parsedPrice - (parsedPrice * parsedDiscount) / 100;
  }
  return parsedPrice - parsedDiscount;
}

// export function getCustomShare() {}
