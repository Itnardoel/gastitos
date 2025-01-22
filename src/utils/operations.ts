import { type Person, type Item } from "@/types";

export function getPriceWithDiscount(item: Item): number {
  const parsedPrice = item.price === "" ? 0 : item.price;
  const parsedDiscount = item.discount.value === "" ? 0 : item.discount.value;

  if (item.discount.type === "percentage") {
    return parsedPrice - (parsedPrice * parsedDiscount) / 100;
  }
  return Math.max(0, parsedPrice - parsedDiscount);
}

export function getPersonShare(items: Item[], id: Person["id"], people: number): number {
  const totalShare = items.reduce((total, item) => {
    const itemPrice = item.discountedPrice ?? (item.price as number);
    const itHasCustomSplit = item.hasCustomSplit;

    if (!itHasCustomSplit) {
      return total + Number(item.price) / people;
    }

    const personSplit = item.splits.find((split) => split.personId === id);

    if (!personSplit) {
      return total;
    }

    if (personSplit.type === "percentage") {
      return total + (itemPrice * Number(personSplit.value)) / 100;
    } else {
      return total + (itemPrice - Number(personSplit.value));
    }
  }, 0);

  return totalShare;
}
