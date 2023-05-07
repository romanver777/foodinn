import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import Footer from "../footer/footer";

import routes from "../../routes/routes";
import style from "./app.module.scss";

const App = () => {
  const [isOpenSb, setIsOpenSb] = useState(false);
  const location = useLocation();

  const getPageName = (pathName: string) => {
    const route = routes.filter((item) => item.path === pathName);
    return route[0].name;
  };

  const handleSidebarOpen = () => setIsOpenSb(!isOpenSb);

  const mainPanel = isOpenSb
    ? style["main-panel"] + " " + style["main-panel_sidebar-open"]
    : style["main-panel"];

  return (
    <div className={style.wrapper}>
      <Sidebar
        isOpen={isOpenSb}
        routes={routes}
        activePage={location.pathname.slice(1)}
      />
      <main className={mainPanel}>
        <Navbar
          title={getPageName(location.pathname.slice(1))}
          isOpenSb={isOpenSb}
          onClickHandle={handleSidebarOpen}
        />
        <div className={style.content}>
          <Routes>
            {routes.map((item) => {
              return (
                <Route
                  path={item.path}
                  element={<item.element />}
                  key={item.name}
                />
              );
            })}
          </Routes>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default App;
