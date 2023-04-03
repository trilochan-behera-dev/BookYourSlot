import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiUserCircle, BiLogOut } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const HandleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      <div className="mt-2 float-right mr-4 hover:bg-[#f1f1fb]  ">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-2 py-2 text-sm font-medium text-white ">
              <div className="flex flex-row">
                <BiUserCircle />
                <span>
                  <RiArrowDropDownLine />
                </span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-[5.5rem] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="items-center">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={HandleLogout}
                      className={`${active && "text-red-600"} flex flex-row `}
                    >
                      <BiLogOut className="ml-[5px] mt-[4px]" />{" "}
                      <span className="ml-2">Logout</span>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default Header;
