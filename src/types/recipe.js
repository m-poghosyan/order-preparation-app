// @flow
import type { DayPart } from "~/types/dayPart";

export type Recipe = {
  complexity: string,
  cost: number,
  currency: string,
  dayPart: DayPart,
  grossProfitMargin: string,
  isOrganic: boolean,
  isOrphan: boolean,
  mainComponent: string,
  name: string,
  photoUrl: string,
  portion: number,
  preparationTime: number,
  preparationTimeUnit: String,
  price: number,
  rating: number,
  recipeUUID: string,
  reference: string,
  status: String,
  // type: string,
  plan: {
    menuUUID: string,
    serveAt: ?number,
    order: number
  },
  quantities: {
    original: number,
    changed: number
  }
};
