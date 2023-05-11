export type TCardNutrients = {
  title: string;
  quantity: number;
  target: number;
};

const nutrients: TCardNutrients[] = [
  {
    title: "Белки",
    quantity: 120,
    target: 160,
  },
  {
    title: "Жиры",
    quantity: 96,
    target: 60,
  },
  {
    title: "Углеводы",
    quantity: 200,
    target: 100,
  },
  {
    title: "Ккал",
    quantity: 2144,
    target: 1420,
  },
];

export default nutrients;
