import React, { useState, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsCalendarPlus } from "react-icons/bs";
import Link from "next/link";

const SideBar = (props) => {
  // console.log(props.loginData);
  const [userType, setUserType] = useState("");
  // console.log(userType);

  useEffect(() => {
    setUserType(JSON.parse(window.localStorage.getItem("token")).userType);
  }, []);

  return (
    <>
      <div className="flex flex-col ml-8 mt-16">
        <div className="mr-12  hover:bg-[#eee] rounded-lg">
          <Link href="/dashboard">
            <div className="flex  cursor-pointer ml-[4px] mt-[3px] hover:-translate-y-px">
              <AiOutlineHome />{" "}
              <span className="justify-end ml-2">Dashboard</span>
            </div>
          </Link>
        </div>

        {userType === "user" ? (
          <>
            <div className="mt-1 mr-12  hover:bg-[#eee] rounded-lg">
              <Link href="/bookSlot">
                <div className="flex hover:-translate-y-px cursor-pointer ml-[4px] mt-[3px]">
                  <BsCalendarPlus />{" "}
                  <span className="justify-end ml-2">Book Slot</span>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="mt-1 mr-12  hover:bg-[#eee] rounded-lg">
              <Link href="/slot">
                <div className="flex hover:-translate-y-px cursor-pointer ml-[4px] mt-[3px]">
                  <BsCalendarPlus />{" "}
                  <span className="justify-end ml-2">Slots</span>
                </div>
              </Link>
            </div>
            <div className="mt-1 mr-12  hover:bg-[#eee] rounded-lg">
              <Link href="/updateSlot">
                <div className="flex hover:-translate-y-px cursor-pointer ml-[4px] mt-[3px]">
                  <BsCalendarPlus />{" "}
                  <span className="justify-end ml-2">All Slots</span>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBar;
