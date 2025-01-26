import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setForgetToggleR, setNavbarShowerR } from "../store/Global";
import { FaCheck, FaTimes, FaUser } from "react-icons/fa";
import shape4 from "@/public/Polygon 6.svg";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<any>();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setNavbarShowerR(false));
  }, []);

  const sendEmail = async () => {
    if (userName?.trim()) {
      try {
        setLoading(true);
        const response = await axios.post("/api/send-email", {
          userName: userName,
        });

        let { data } = response;
        alert(data.message);
        console.log(data.message);
        dispatch(setForgetToggleR(false));
      } catch (e) {
        alert(e);
        console.log(e);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Enter admin email first");
    }
  };

  return (
    <div className="flex items-center justify-center w-[95%] 2xl:w-[87%] h-[90%] rounded-2xl overflow-hidden z-[100] bg-white relative box">
      <button
        className={`absolute flex justify-center items-center top-5 md:top-7 right-3 md:right-5 bg-white text-main-blue hover:text-red-600 text-[20px] md:text-[30px] font-[400] mt-0 py-1 sm:py-2 mx-1 border-2 border-color rounded-full text-center w-[30px] md:w-[50px] h-[30px] md:h-[50px] hover:opacity-[0.8]`}
        onClick={() => dispatch(setForgetToggleR(false))}
      >
        <FaTimes />
      </button>
      <div className="w-[100%] m:w-[35vw] h-fit flex flex-col justify-center items-center absolute z-[100] text-xl font-sans border-gray-500 gap-4 sm:gap-7 bg-red-">
        <h1 className="text-main-blue text-[26px] sm:text-[32px] pb-0 sm:pb-5 font-[700]">
          Forgot Password
        </h1>
        <div className="flex flex-col bg-blue-300 h-[50%] justify-center relative">
          <FaUser className="absolute left-[10px] text-gray-500" />

          <input
            className="ps-10 pe-12 py-1 sm:py-3 w-full bg-[rgb(244,248,245)]"
            placeholder="Enter Admin Email"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="flex">
          <button
            className={`${
              loading ? "bg-gray-600" : "bg-main-blue"
            }  text-white hover: text-[14px] font-[400] mt-0 py-1 sm:py-2 mx-1 border-[1px] rounded-xl text-center w-[150px] hover:opacity-[0.8]`}
            onClick={() => sendEmail()}
          >
            SEND REQUEST
          </button>
        </div>
      </div>
      <div className="w-[4vw] h-[4vw] absolute top-[10%] left-[10%] bg-[rgb(255,214,0)] rotate-[45deg]"></div>
      <div className="w-[4vw] h-[4vw] absolute top-[7%] left-[80%] bg-[rgb(0,161,253)] rotate-[45deg]"></div>
      <img
        src={shape4.src}
        className="w-[8vw] h-[8vw] absolute top-[40%] left-[10%]"
      />
      <img
        src={shape4.src}
        className="w-[8vw] h-[8vw] absolute top-[30%] left-[85%]"
      />
      <div className="w-[3vw] h-[3vw] absolute top-[75%] left-[15%] bg-[rgb(0,161,253)] rotate-[45deg]"></div>
      <div className="w-[3vw] h-[3vw] absolute top-[80%] left-[40%] bg-[rgb(255,214,0)] rotate-[45deg]"></div>
      <div className="w-[5vw] h-[5vw] absolute top-[25%] left-[25%] bg-[rgb(0,161,253)] rounded-full"></div>
      <div className="w-[5vw] h-[5vw] absolute top-[70%] left-[75%] bg-[rgb(0,161,253)] rounded-full"></div>
    </div>
  );
}
