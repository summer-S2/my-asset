import type { ReactNode } from "react";
import { Header } from "../common/Header";
import { Footer } from "../common/Footer";
import classNames from "classnames";

interface Props {
  withoutHeader?: boolean;
  withoutFooter?: boolean;
  children: ReactNode;
}

export const PageLayout = ({
  withoutHeader,
  withoutFooter,
  children,
}: Props) => {
  return (
    <div id="page-layout" className="h-screen w-screen flex flex-col">
      {!withoutHeader && <Header />}
      <main
        className={classNames("flex-grow", {
          "mt-16": !withoutHeader,
          "mt-0": withoutHeader,
        })}
      >
        <div className="w-full h-full max-w-[1280px] mx-auto">{children}</div>
      </main>
      {!withoutFooter && <Footer />}
    </div>
  );
};
