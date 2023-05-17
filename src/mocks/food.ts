export type TFood = {
  id: number;
  title: string;
  prot: number;
  fat: number;
  carbs: number;
  portion: number;
  measure: string;
};

export const food: TFood[] = [
  {
    id: 0,
    title: "Куриная грудка",
    prot: 23.6,
    fat: 1.9,
    carbs: 0.4,
    portion: 100,
    measure: "гр",
  },
  {
    id: 1,
    title: "Крупа гречневая",
    prot: 14,
    fat: 3,
    carbs: 58,
    portion: 100,
    measure: "гр",
  },
  {
    id: 2,
    title: "Масло подсолнечное",
    prot: 0,
    fat: 99.9,
    carbs: 0,
    portion: 100,
    measure: "гр",
  },
  {
    id: 3,
    title: "Кефир 1%",
    prot: 3,
    fat: 1,
    carbs: 4,
    portion: 100,
    measure: "гр",
  },
  {
    id: 4,
    title: "Молоко 2.5%",
    prot: 3,
    fat: 2.5,
    carbs: 4.7,
    portion: 100,
    measure: "гр",
  },
  {
    id: 5,
    title: "Творог 5%",
    prot: 16,
    fat: 5,
    carbs: 3,
    portion: 100,
    measure: "гр",
  },
  {
    id: 6,
    title: "Яйцо куриное",
    prot: 12.7,
    fat: 10.9,
    carbs: 0.7,
    portion: 100,
    measure: "гр",
  },
  {
    id: 7,
    title: "Яблоки Гренни Смит",
    prot: 0.4,
    fat: 0.4,
    carbs: 9.7,
    portion: 100,
    measure: "гр",
  },
  {
    id: 8,
    title: "Хлопья овсяные Геркулес",
    prot: 11,
    fat: 6,
    carbs: 50,
    portion: 100,
    measure: "гр",
  },
  {
    id: 9,
    title: "Апельсин",
    prot: 0.9,
    fat: 0.2,
    carbs: 8.1,
    portion: 100,
    measure: "гр",
  },
  {
    id: 10,
    title: "Минтай свежий",
    prot: 15.9,
    fat: 0.9,
    carbs: 0,
    portion: 100,
    measure: "гр",
  },
  {
    id: 11,
    title: "Протеин Performance Pure Whey",
    prot: 77.2,
    fat: 6.3,
    carbs: 7.4,
    portion: 100,
    measure: "гр",
  },
];
