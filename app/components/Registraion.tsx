import Login from "@/app/components/Login";
import loginRec from "@/public/Rectangle 4.svg";

import shape1 from "@/public/Polygon 1.svg";

import shape2 from "@/public/Polygon 2.svg";
import shape3 from "@/public/Rectangle 3.svg";
import ChangePassword from "@/app/components/ChangePassword";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setForgetToggleR, setNavbarShowerR } from "../store/Global";
import { RootState } from "../store";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";
import Link from "next/link";

interface AllowanceInputProps {
  tokenVerifierTrigger: any;
  setTokenVerifierTrigger: any;
  setUserId: any;
}

const Registration: React.FC<AllowanceInputProps> = ({
  tokenVerifierTrigger,
  setTokenVerifierTrigger,
  setUserId,
}) => {
  let global = useSelector((state: RootState) => state.Global);
  async function getData() {
    let result = await axios.post(`/api/registraion`);
    console.log(result);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div
      className="w-full custom-b h-[100vh overflow-hidden"
      style={{ height: "calc(100vh - 88px)" }}
    >
      <div className="flex justify-center items-center w-full bg-blue-30 h-full overflow-hidden relative">
        {!global.forgetToggle ? (
          <div className="flex flex-col-reverse sm:flex-row items-center w-[95%] 2xl:w-[87%] h-[90%] rounded-2xl overflow-hidden custom-b z-[100] box">
            <div className="sm:w-[40%] w-full h-[35%] sm:h-full flex flex-col justify-center items-center bg-[rgb(39,65,107)] relative overflow-hidden">
              <img
                src={shape2.src}
                className="absolute right-[15%] top-[5%] w-[5vw]"
              />
              <img
                src={shape1.src}
                className="absolute right-[-2%] top-[40%] w-[7vw]"
              />
              <img
                src={shape3.src}
                className="absolute right-[30%] top-[80%] w-[3vw]"
              />
              <div className="w-[5vw] h-[5vw] bg-[#526789] absolute right-[-5%] top-[20%] rounded-full z-[100"></div>
              <div className="w-[15vw] h-[15vw] bg-[#526789] absolute left-[-7.5%] bottom-[-6%] rounded-full z-[100"></div>

              <div className="flex flex-col justify-center items-center h-full z-[100]">
                <h2 className="text-start text-white text-[25px] md:text-[32px] sm:pb-2 w-fit font-[700]">
                  Welcome Back!
                </h2>
                <p className="text-center text-white text-[13px] md:text-[16px] sm:pb-2 w-[80%] mx-auto font-[400]">
                 
                  Welcome to the HRM Data Handler! Effortlessly simplifying and
                  streamlining your human resources management.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center sm:w-[60%] w-full h-[65%] sm:h-full bg-white">
              {global.loginToggle ? (
                <Login
                  setTokenVerifierTrigger={setTokenVerifierTrigger}
                  tokenVerifierTrigger={tokenVerifierTrigger}
                  setUserId={setUserId}
                />
              ) : (
                <ChangePassword />
              )}
            </div>
          </div>
        ) : (
          <ForgotPassword />
        )}
        <div className="w-[30vh] h-[30vh] bg-[rgb(30,217,146)] absolute left-[-10vh] bottom-[-10vh] rounded-full z-[0]"></div>
        <div className="w-[30vh] absolute right-[0px] top-[-5vh] z-[0]">
          <img src={loginRec.src} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
