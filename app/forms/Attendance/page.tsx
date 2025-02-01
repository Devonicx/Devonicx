"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader, { FitLoader } from "@/app/components/Loader";
import {
  setAdminR,
  setFormsR,
  setRecentReloaderR,
  setUserNameR,
} from "@/app/store/Global";
import AttendanceRecord from "@/app/components/AttendanceRecord";
import { setnameR } from "@/app/store/Attendance";

const Attendance: React.FC = () => {
  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => state.Attendance);
  let global = useSelector((state: RootState) => state.Global);
  let [isVerified, setIsVerified] = useState<any>(undefined);
  let [loading, setLoading] = useState<any>(true);
  let [checkInLoading, setCheckInLoading] = useState<boolean>(false);
  let [checkOutLoading, setCheckOutLoading] = useState<boolean>(false);
  let [mainLoading, setMainLoading] = useState<boolean>(true);
  let [checkInDone, setCheckInDone] = useState<boolean>(false);
  let [todayAttendanceData, setTodayAttendanceData] = useState<any>();
  let [reloader, setReloader] = useState<number>(0);
  let router = useRouter();

  useEffect(() => {
    async function verifyTokenApi() {
      try {
        setLoading(true);
        await axios.get("/api/verifyToken");
        let { data } = await axios.get("/api/userDataName");
        dispatch(setFormsR(data.forms));
        dispatch(setUserNameR(data.username));
        dispatch(setAdminR(data.admin));
        dispatch(setnameR(data.username));
        setIsVerified(true);
      } catch (err) {
        router.push("/");
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    }
    verifyTokenApi();
  }, []);

  async function checkIn() {
    try {
      setCheckInLoading(true);
      await axios.post("/api/checkIn", {
        name: global.username,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setCheckInLoading(false);
      setReloader(reloader + 1);
    }
  }
  async function checkOut() {
    try {
      setCheckOutLoading(true);
      await axios.post("/api/checkOut", {
        name: global.username,
        id: todayAttendanceData.id,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setCheckOutLoading(false);
      setReloader(reloader + 1);
    }
  }

console.log(todayAttendanceData);
  useEffect(() => {
    async function todayAttendance() {
      try {
        setMainLoading(true);
        const result = await axios.post("/api/todayAttendance", {
          name: global.username,
        });
        setCheckInDone(result.data.checkInDone);
        setTodayAttendanceData(result.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setMainLoading(false);
      }
    }
    if (global.username) todayAttendance();
  }, [global.username, reloader]);

  // console.log("checkInLoading", checkInDone || checkInLoading);
  // console.log("checkOutLoading", !checkInDone || checkOutLoading);

  const date = new Date().toLocaleDateString();
  return (
    <>
      {loading || isVerified === undefined || isVerified === false ? (
        <div className="w-fit m-auto py-24">
          <Loader />
        </div>
      ) : global.admin ? (
        <AttendanceRecord />
      ) : (
        <div className="w-full h-fit flex flex-col justify-between items-start gap-[40px] py-[50px] hideOnPrint relative">
          <div className="flex flex-col bg-[rgb(250,250,250)] justify-between items-start w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden ">
            <h2 className="w-full h-[70px] border-b-[1px] border-color text-[16px] md:text-[20px] xl:text-[25px] font-[600] flex items-center justify-start text-main-blue px-3 md:px-10 xl:px-20 ">
              Attendance - {date}
            </h2>
            <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20 ">
              {mainLoading ? (
                <div className="w-fit m-auto h-fit">
                  <FitLoader />
                </div>
              ) : (
                <div className="w-full h-fit md:h-[80px] flex flex-wrap justify-between items-start px-5 md:px-0 pb-7 md:pb-0 gap-1 md:gap-[0px]">
                  <button
                    className={`text-center w-full md:w-[50%] h-[60px] md:h-full text-sm md:text-lg xl:text-xl  font-[600] ${
                      !checkInDone
                        ? "bg-[#28a745] hover:opacity-[0.8]"
                        : "bg-gray-600"
                    } text-white rounded-`}
                    onClick={checkIn}
                    disabled={checkInDone || checkInLoading}
                  >
                    {checkInLoading
                      ? "Checking In..."
                      : checkInDone
                      ? "Checked In"
                      : "Check In"}
                  </button>
                  <button
                    className={`text-center w-full md:w-[50%] h-[60px] md:h-full text-sm md:text-lg xl:text-xl  font-[600] ${
                      checkInDone
                        ? "bg-[#dc3545] hover:opacity-[0.8]"
                        : "bg-gray-600"
                    } text-white rounded-`}
                    onClick={checkOut}
                    disabled={!checkInDone || checkOutLoading}
                  >
                    {checkOutLoading
                      ? "Checking Out..."
                      : !checkInDone
                      ? "Checked Out"
                      : "Check Out"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Attendance;
