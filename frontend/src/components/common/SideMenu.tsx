import { Menu, type MenuProps } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeIcon } from "../../assets/icons/HomeIcon";
import { AccountIcon } from "../../assets/icons/AccountIcon";
import classNames from "classnames";
import { MenuOpenIcon } from "../../assets/icons/MenuOpenIcon";

type MenuItem = Required<MenuProps>["items"][number];

export const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fold, setFold] = useState(
    localStorage.getItem("side_menu_fold") === "true" ? true : false
  );

  const Label = (text: string) => {
    return (
      <div
        className={classNames("whitespace-nowrap shrink-0 duration-200", {
          "text-transparent": fold,
        })}
      >
        {text}
      </div>
    );
  };

  const items: MenuItem[] = [
    {
      key: "/",
      icon: (
        <div className="h-10 flex-center">
          <HomeIcon />
        </div>
      ),
      label: "HOME",
    },
    {
      key: "/account",
      type: "group",
      label: Label("내 계좌 관리"),
      children: [
        {
          key: "/account",
          icon: (
            <div className="h-10 flex-center">
              <AccountIcon />
            </div>
          ),
          label: "내 계좌 목록 조회",
        },
      ],
    },
  ];

  const handleClick: MenuProps["onClick"] = (e) => {
    navigate(e.key); // 메뉴 클릭 시 해당 경로로 이동
  };

  const toggleNavbar = () => {
    setFold((prev) => {
      if (prev) {
        localStorage.setItem("side_menu_fold", "false");
        return false;
      } else {
        localStorage.setItem("side_menu_fold", "true");
        return true;
      }
    });
  };

  return (
    <div
      className={classNames(
        "h-full duration-200 shrink-0 border-r-1 border-indigo-100",
        {
          "w-[256px]": !fold,
          "w-[81px]": fold, // border 두께 포함
        }
      )}
    >
      <div>
        <button
          //   onClick={() => setFold((prev) => !prev)}
          onClick={toggleNavbar}
          className={classNames("w-full flex cursor-pointer", {
            "justify-end": !fold,
            "justify-center": fold,
          })}
        >
          <div
            className={classNames("duration p-4", {
              "rotate-y-0": !fold,
              "rotate-y-180": fold,
            })}
          >
            <MenuOpenIcon />
          </div>
        </button>
      </div>
      <Menu
        items={items}
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleClick}
        inlineCollapsed={fold}
      />
    </div>
  );
};
