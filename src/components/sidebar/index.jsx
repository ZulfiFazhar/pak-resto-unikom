"use client"

import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Local components
import LogoutButton from "../auth/LogoutButton";
import { usePekerjaanContext } from "@/app/resto/providers";

const Sidebar = ({ children }) => {
  const pekerjaan = usePekerjaanContext()
  const pathname = usePathname();

  let fixedMenu = []
  switch(pekerjaan){
    case "pelayan":
      fixedMenu = [
        { name: "Reservasi", path: "/resto", icon: "mdi:local-restaurant" },
        { name: "Pesanan", path: "/resto/pesanan-pelayan", icon: "mdi:format-list-bulleted" },
      ];
      break;
    case "koki":
      fixedMenu = [
        { name: "Pesanan", path: "/resto", icon: "mdi:local-restaurant" },
        { name: "Menu", path: "/resto/menu", icon: "mdi:food-outline" },
      ];
      break;
    case "kasir":
      fixedMenu = [
        { name: "Pembayaran", path: "/resto", icon: "mdi:payment-clock" },
        { name: "Histori", path: "/resto/histori", icon: "mdi:clipboard-text-history-outline" },
        { name: "Laporan", path: "/resto/laporan", icon: "mdi:report-line" }
      ];
      break;
  }

  return (
    <div className="flex">
      <div className="sm:w-full sm:max-w-[18rem]">
        <input
          type="checkbox"
          id="sidebar-mobile-fixed"
          className="sidebar-state"
        />
        <label
          htmlFor="sidebar-mobile-fixed"
          className="sidebar-overlay"
        ></label>
        <aside className="sidebar px-2 bg-gradient-to-tr main-gradient-2 sidebar-fixed-left sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full">
          <section className="sidebar-title items-center p-4 justify-center my-3">
            <Image
              src="/logo.svg"
              alt="FlavorHub log0"
              width={120}
              height={120}
              priority
            />
          </section>
          <div className="text-4xl font-bold mx-auto text-white">
            <span className="text-orange-300">Flavor</span>Hub
          </div>
          <div className="mx-auto text-white">
            Pelayan
          </div>
          <section className="sidebar-content">
            <nav className="menu rounded-md h-full">
              <section className="menu-section px-4 h-full">
                <ul className="flex flex-col h-full gap-4 text-white">
                  {fixedMenu.map((item, index) => (
                    <li key={index}>
                      <Link href={item.path}>
                        <div
                          className={`menu-item ${
                            pathname === item.path ? "bg-slate-900/15 py-4" : ""
                          }`}
                        >
                          <Icon icon={item.icon} fontSize={24} />
                          <span className="font-medium text-base ml-2">
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}

                  <LogoutButton />

                </ul>
              </section>
            </nav>
          </section>
        </aside>
      </div>
      <div className="flex w-full flex-col">
        <div className="w-fit">
          <label
            htmlFor="sidebar-mobile-fixed"
            className="btn-primary btn sm:hidden"
          >
            Open Sidebar
          </label>
        </div>
        <div className="flex flex-col bg-white">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
