import { Ingredient } from "./ingredient";

export type Product = {
  id: number;
  name: string;
  discountRate: number | null;
  basePrice: number | null;
  price: number;
  amount: number;
  amountUnit: string;
  quantity: number;
  quantityUnit: string;
  unitPriceText: string | null;
  arrivalInfo: string | null;
  ratingTotalCnt: number | null;
  rewardCash: number | null;
  imageUrl: string;
  ingredient?: Ingredient;
};
