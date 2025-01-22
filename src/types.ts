export interface Item {
  id: string;
  name: string;
  price: number | "";
  discount: {
    type: DiscountType;
    value: number | "";
  };
  discountedPrice: number | null;
  hasCustomSplit: boolean;
  splits: Split[];
}

export type DiscountType = "none" | "percentage" | "amount";

export interface Person {
  id: string;
  name: string;
  amountPaid: number | "";
}

export interface Split {
  personId: string;
  type: "percentage" | "amount";
  value: number | string;
}
