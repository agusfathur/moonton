import SubscriptionDetail from "@/Layouts/Authenticated/SubscriptionDetail";
import { UserMenu, UserOthers } from "./MenuList";
import MenuItem from "./MenuItem";
import { Link } from "@inertiajs/inertia-react";
import "./../../../css/Sidebar.css";
const Sidebar = ({ auth }) => {
  return (
    <aside className="fixed z-50 w-[300px] h-full">
      <div className="flex flex-col p-[30px] pr-0 border-r border-gray-[#F1F1F1] overflow-y-auto h-full">
        <a href="/">
          <img src="/images/moonton.svg" alt="" />
        </a>
        <div className="links flex flex-col mt-[60px] h-full gap-[50px]">
          {/* Menu  */}
          <div>
            <div className="text-gray-1 text-sm mb-4">Menu</div>
            {UserMenu.map((menu, index) => {
              return (
                <MenuItem
                  key={`${index}-${menu.text}`}
                  link={menu.link}
                  icon={menu.icon}
                  text={menu.text}
                  // true jika route sekarang === menu.link
                  isActive={menu.link && route().current(menu.link)}
                />
              )
            })}
          </div>
          {/* ./Menu  */}

          {/* Others */}
          <div>
            <div className="text-gray-1 side-link mb-4">Others</div>
            {UserOthers.map((menu, index) => {
              return (
                <MenuItem
                  key={`${index}-${menu.text}`}
                  link={menu.link}
                  icon={menu.icon}
                  text={menu.text}
                  // true jika route sekarang === menu.link
                  isActive={menu.link && route().current(menu.link)}
                  method={menu.method}
                />
              )
            })}
          </div>
          {/* ./Others */}
          {auth.activePlan && (
            <SubscriptionDetail
              name={auth.activePlan.name}
              isPremium={auth.activePlan.name === 'Premium'}
              remainingActiveDays={auth.activePlan.remainingActiveDays}
              activeDays={auth.activePlan.activeDays}
            />
          )}
        </div>
      </div>
    </aside>
  );

};

export default Sidebar;
