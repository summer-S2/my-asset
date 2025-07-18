import type { ReactNode } from "react";
import { Header } from "../common/Header";
import { Footer } from "../common/Footer";
import classNames from "classnames";
import { SideMenu } from "../common/SideMenu";

interface Props {
  withoutHeader?: boolean;
  withoutFooter?: boolean;
  withoutMenu?: boolean;
  children: ReactNode;
}

export const PageLayout = ({
  withoutHeader,
  withoutFooter,
  withoutMenu,
  children,
}: Props) => {
  return (
    <div
      id="page-layout"
      className="h-screen w-[calc(100vw-6px)] flex flex-col"
    >
      {!withoutHeader && <Header />}
      <main
        className={classNames("flex-grow flex", {
          "mt-16": !withoutHeader,
          "mt-0": withoutHeader,
        })}
      >
        {!withoutMenu && <SideMenu />}
        <div className="w-full h-full max-w-[1280px] mx-auto">{children}</div>
      </main>
      {!withoutFooter && <Footer />}
    </div>
  );
};
