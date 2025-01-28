"use client";
import logo from "@/public/devonix-logo-white.jpg";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

const Nav: React.FC = () => {
  let global = useSelector((state: RootState) => state.Global);
  async function logout() {
    try {
      await axios.post("/api/logOut");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      window.location.href = "/";
    }
  }

  return (
    <div className="w-full h-[88px] border-[1px] border-color hideOnPrint sticky top-[0px] z-[100] bg-white">
      <div className="flex justify-between items-center w-[95%] 2xl:w-[87%] h-full mx-auto bg-pink-80">
        <div className="w-fit flex justify-start ">
          <Link
            href={"/"}
            className="w-[100px] sm:w-[180px] md:w-[200px] flex justify-start items-center"
          >
            <img src={logo.src} className="w-full h-full" />
          </Link>
        </div>
        <h1 className="text-[10px] md:text-[16px] bg-green-40 xl:text-[20px] font-[600] mx-auto w-fit text-center px-[5.5%] pt-2">
          <span className="uppercase">
            {global.username ? "Welcome " + global.username + " !" : ""}
          </span>
        </h1>
        <div className="bg-red-00 w-fit flex justify-end">
          {global.username ? (
            <button
              className="w-[90px] md:w-[160px] px-[10px] md:px-[15px] text-center float-end py-1 md:py-2 bg-light-blue hover:bg-main-blue flex justify-between items-center gap-3 hover:text-white font-[500] text-[14px] md:text-[18px] rounded-md md:rounded-xl"
              onClick={logout}
            >
              Logout <FaSignOutAlt />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Nav;
