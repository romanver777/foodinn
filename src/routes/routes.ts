import MainPage from "../components/main-page/main-page";
import Profile from "../components/profile/profile";
import Plan from "../components/plan/plan";
import Stats from "../components/stats/stats";
import Settings from "../components/settings/settings";

export type TRoute = {
  path: string;
  name: string;
  element: () => JSX.Element;
  iconName: string;
};

const routes: TRoute[] = [
  {
    path: "",
    name: "Главная",
    element: MainPage,
    iconName: "house",
  },
  {
    path: "profile",
    name: "Профиль",
    element: Profile,
    iconName: "dashboard",
  },
  {
    path: "plan",
    name: "Мой план",
    element: Plan,
    iconName: "chartPie",
  },
  {
    path: "stats",
    name: "Статистика",
    element: Stats,
    iconName: "chartPipe",
  },
  {
    path: "settings",
    name: "Настройки",
    element: Settings,
    iconName: "equaliser",
  },
];

export default routes;
