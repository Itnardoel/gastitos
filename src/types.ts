export interface Item {
  id: string;
  name: string;
  price: number | "";
  // hasCustomSplit: boolean;
  discount: {
    type: DiscountType;
    value: number | "";
  };
}

export type DiscountType = "none" | "percentage" | "amount";

export interface Person {
  id: string;
  name: string;
  amountPaid: number | "";
}
