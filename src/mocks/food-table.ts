export type TFoodTable = {
  title: string;
  prot: number;
  fat: number;
  carbs: number;
  portion: number;
  measure: string;
  weight: number;
};

export const foodTable = [
  {
    title: "Куриная грудь",
    prot: 23,
    fat: 0.2,
    carbs: 0.3,
    portion: 100,
    measure: "гр",
    weight: 150,
  },
  {
    title: "Крупа гречневая",
    prot: 18,
    fat: 1,
    carbs: 64,
    portion: 100,
    measure: "гр",
    weight: 54,
  },
  {
    title: "Масло подсолнечное",
    prot: 0,
    fat: 99,
    carbs: 1,
    portion: 100,
    measure: "гр",
    weight: 14,
  },
];
