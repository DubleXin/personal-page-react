import { type ComponentType } from "react";
import { NavigationTabs, SocialMedia } from "../components";
import type { TabId } from "../constants/tabs";

const AppWrap = (
  Component: ComponentType,
  idName: TabId,
  classNames: string = ""
) => {
  function HOC() {
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />
        <div className="app__wrapper app__flex">
          <Component />
          <div className="copyright">
            <p className="p-text">©2025 SasadaDev</p>
            <p className="p-text">All rights reserved</p>
          </div>
        </div>
        <NavigationTabs activeElement={idName} />
      </div>
    );
  }

  HOC.displayName = `AppWrap(${
    Component.displayName || Component.name || "Component"
  })`;

  return HOC;
};

export default AppWrap;
