"use client";

import pic1 from "@/public/Layer_1 (3).svg";
import pic2 from "@/public/Layer_1 (4).svg";
import pic3 from "@/public/Layer_1 (8).svg";
import pic4 from "@/public/Layer_1 (5).svg";
import pic5 from "@/public/Layer_1 (12).svg";
import pic6 from "@/public/Layer_1 (6).svg";
import pic7 from "@/public/Layer_1 (7).svg";
import pic8 from "@/public/Layer_1 (11).svg";
import pic9 from "@/public/Layer_1 (10).svg";
import pic10 from "@/public/Layer_1 (9).svg";
import pic11 from "@/public/Layer_1 (13).svg";
import pic12 from "@/public/Layer_1 (14).svg";

import Link from "next/link";
import RecentRecordAll from "./RecentRecordAll";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setFormsR, setNavbarShowerR, setUserNameR } from "../store/Global";
import { RootState } from "../store";
import { FaDoorOpen, FaSignOutAlt, FaUserPlus, FaUsers } from "react-icons/fa";

function MainPage() {
  const dispatch = useDispatch();
  let global = useSelector((state: RootState) => state.Global);
  let [userData, setUserData] = useState();
  let [forms, setForms] = useState<any>();
  console.log(global.forms);

  useEffect(() => {
    const title = `Document Handler`;
    document.title = title;
  }, []);
  useEffect(() => {
    dispatch(setNavbarShowerR(true));
  }, []);
  return (
    <>
      <div className="w-full h-fit bg-pink-30 border-1 border-color">
        <div className="w-[95%] 2xl:w-[87%] h-fit mx-auto pt-6 md:pt-10 pb-3 md:pb-5 flex justify-end items-start ">
          <div
            className={`flex-wrap w-[100%] flex justify-between md:justify-end gap-2 ${
              global.admin ? "md:justify-betwee" : ""
            } z-[10]`}
          >
            {global.admin ? (
              <>
                {" "}
                <Link
                  className="w-[130px] md:w-[160px] px-[10px] md:px-[15px] text-center float-end py-1 md:py-2 bg-light-blue hover:bg-main-blue flex justify-between items-center gap-3 hover:text-white font-[500] text-[14px] md:text-[18px] rounded-md md:rounded-xl"
                  href={"/Create-User"}
                >
                  Create User <FaUserPlus />
                </Link>
                <Link
                  className="w-[130px] md:w-[160px] px-[10px] md:px-[15px] text-center float-end py-1 md:py-2 bg-light-blue hover:bg-main-blue flex justify-between items-center gap-3 hover:text-white font-[500] text-[14px] md:text-[18px] rounded-md md:rounded-xl"
                  href={"/View-Users"}
                >
                  View Users <FaUsers />
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="w-[95%] 2xl:w-[87%] h-fit mx-auto pb-7 md:pb-14 pt-3 md:pt-3">
        <div className="w-[full] h-fit py-4 md:py-8 flex flex-col gap-2 md:gap-5">
          <h2 className="text-[16px] md:text-[25px] font-[600] text-[#27416b]">
            Attendance System
          </h2>
          <div className="w-[full] h-fit linkDiv bg-neutral-50 px-3 md:px-10 xl:px-14 py-4 md:py-8 rounded-[10px] border-2 border-color flex justify-start items-center gap-2 md:gap-5 xl:gap-10 overflow-auto">
            <Link
              href={"/forms/Attendance"}
              className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
            >
              <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                  <img src={pic12.src} className="w-[60%] h-[60%]" />
                </div>
              </div>
              <div className="w-[90%] h-[30%]">
                <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                  Employees Attendance{" "}
                </h3>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="w-[full] h-fit py-4 md:py-8 flex flex-col gap-2 md:gap-5">
          <h2 className="text-[16px] md:text-[25px] font-[600] text-[#27416b]">
            Business
          </h2>
          <div className="w-[full] h-fit linkDiv bg-neutral-50 px-3 md:px-10 xl:px-14 py-4 md:py-8 rounded-[10px] border-2 border-color flex justify-start items-center gap-2 md:gap-5 xl:gap-10 overflow-auto">
            <Link
              href={"/forms/Card"}
              className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
            >
              <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                  <img src={pic12.src} className="w-[60%] h-[60%]" />
                </div>
              </div>
              <div className="w-[90%] h-[30%]">
                <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                  Billing Cards{" "}
                </h3>
              </div>
            </Link>
          </div>
        </div>

        {global.forms?.includes("Offer-Letter-Intern") ||
        global.forms?.includes("Offer-Letter-Probation") ||
        global.forms?.includes("Appointment-Letter") ||
        global.forms?.includes("Non-Disclosure-Agreement") ||
        global.forms?.includes("Social-Media-Consent") ? (
          <div className="w-[full] h-fit py-4 md:py-8 flex flex-col gap-2 md:gap-5 z-100">
            <h2 className="text-[16px] md:text-[25px] font-[600] text-[#27416b]">
              JOINING DOCUMENTS
            </h2>
            <div className="w-[full] h-fit linkDiv bg-neutral-50 px-3 md:px-10 xl:px-14 py-4 md:py-8 rounded-[10px] border-2 border-color flex flex-row justify-start items-center gap-2 md:gap-5 xl:gap-10 overflow-auto">
              {global.forms?.includes("Offer-Letter-Intern") ? (
                <Link
                  href={"/forms/Offer-Letter-Intern"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic1.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[70%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Offer Letter Intern
                    </h3>
                  </div>
                </Link>
              ) : null}
              {global.forms?.includes("Offer-Letter-Probation") ? (
                <Link
                  href={"/forms/Offer-Letter-Probation"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color hover:border-[#27416b] bg-white gap-[5%]"
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic2.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[70%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Offer Letter Probation
                    </h3>
                  </div>
                </Link>
              ) : null}
              {global.forms?.includes("Appointment-Letter") ? (
                <Link
                  href={"/forms/Appointment-Letter"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic3.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[70%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Appointment Letter
                    </h3>
                  </div>
                </Link>
              ) : null}

              {global.forms?.includes("Non-Disclosure-Agreement") ? (
                <Link
                  href={"/forms/Non-Disclosure-Agreement"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic4.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[70%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Non-Disclosure Agreement
                    </h3>
                  </div>
                </Link>
              ) : null}

              {global.forms?.includes("Social-Media-Consent") ? (
                <Link
                  href={"/forms/Social-Media-Consent"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic5.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[70%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Social Media Consent Form
                    </h3>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
        {global.forms?.includes("Salary-Increment-Letter") ||
        global.forms?.includes("Stipend-Increment-Letter") ? (
          <div className="w-[full] h-fit py-4 md:py-8 flex flex-col gap-2 md:gap-5">
            <h2 className="text-[16px] md:text-[25px] font-[600] text-[#27416b]">
              PROMOTIONAL DOCUMENTS
            </h2>
            <div className="w-[full] h-fit linkDiv bg-neutral-50 px-3 md:px-10 xl:px-14 py-4 md:py-8 rounded-[10px] border-2 border-color flex justify-start items-center gap-2 md:gap-5 xl:gap-10 overflow-auto">
              {global.forms?.includes("Salary-Increment-Letter") ? (
                <Link
                  href={"/forms/Salary-Increment-Letter"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic6.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[95%] md:w-[80%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Salary Increment Letter
                    </h3>
                  </div>
                </Link>
              ) : null}

              {global.forms?.includes("Stipend-Increment-Letter") ? (
                <Link
                  href={"/forms/Stipend-Increment-Letter"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic7.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[95%] md:w-[80%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Stipend Increment Letter
                    </h3>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
        {global.forms?.includes("Salary-Slip") ||
        global.forms?.includes("Internship-Extension-Letter") ||
        global.forms?.includes("Probation-Extension-Letter") ? (
          <div className="w-[full] h-fit py-4 md:py-8 flex flex-col gap-2 md:gap-5">
            <h2 className="text-[16px] md:text-[25px] font-[600] text-[#27416b]">
              OTHER DOCUMENTS
            </h2>
            <div className="w-[full] h-fit linkDiv bg-neutral-50 px-3 md:px-10 xl:px-14 py-4 md:py-8 rounded-[10px] border-2 border-color flex justify-start items-center gap-2 md:gap-5 xl:gap-10 overflow-auto">
              {global.forms?.includes("Salary-Slip") ? (
                <Link
                  href={"/forms/Salary-Slip"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic11.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[70%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Salary Slip
                    </h3>
                  </div>
                </Link>
              ) : null}
              {global.forms?.includes("Internship-Extension-Letter") ? (
                <Link
                  href={"/forms/Internship-Extension-Letter"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic1.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[70%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Internship Extension Letter
                    </h3>
                  </div>
                </Link>
              ) : null}
              {global.forms?.includes("Probation-Extension-Letter") ? (
                <Link
                  href={"/forms/Probation-Extension-Letter"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic2.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[70%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Probation Extension Letter
                    </h3>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
        {global.forms?.includes("Experience-Letter") ||
        global.forms?.includes("Termination-Letter") ||
        global.forms?.includes("Clearance-Letter") ? (
          <div className="w-[full] h-fit py-4 md:py-8 flex flex-col gap-2 md:gap-5">
            <h2 className="text-[16px] md:text-[25px] font-[600] text-[#27416b]">
              CLEARANCE DOCUMENTS
            </h2>
            <div className="w-full h-fit linkDiv bg-neutral-50 px-3 md:px-10 xl:px-14 py-4 md:py-8 rounded-[10px] border-2 border-color flex justify-start items-center gap-2 md:gap-5 xl:gap-10 overflow-auto z-50">
              {global.forms?.includes("Experience-Letter") ? (
                <Link
                  href={"/forms/Experience-Letter"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic8.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[70%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Experience Letter
                    </h3>
                  </div>
                </Link>
              ) : null}

              {global.forms?.includes("Termination-Letter") ? (
                <Link
                  href={"/forms/Termination-Letter"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic9.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[70%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Termination Letter
                    </h3>
                  </div>
                </Link>
              ) : null}

              {global.forms?.includes("Clearance-Letter") ? (
                <Link
                  href={"/forms/Clearance-Letter"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic10.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[70%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Clearance Letter
                    </h3>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
        {global.forms?.includes("Contract") ? (
          <div className="w-[full] h-fit py-4 md:py-8 flex flex-col gap-2 md:gap-5">
            <h2 className="text-[16px] md:text-[25px] font-[600] text-[#27416b]">
              OTHER BUSINESS DOCUMENTS
            </h2>
            <div className="w-[full] h-fit linkDiv bg-neutral-50 px-3 md:px-10 xl:px-14 py-4 md:py-8 rounded-[10px] border-2 border-color flex justify-start items-center gap-2 md:gap-5 xl:gap-10 overflow-auto">
              {global.forms?.includes("Contract") ? (
                <Link
                  href={"/forms/Contract"}
                  className="w-[170px] md:w-[200px] h-[130px] md:h-[200px] flex flex-col justify-center items-center rounded-[10px] border-2 border-color bg-white gap-[5%] hover:border-[#27416b] "
                >
                  <div className="w-[170px] md:w-[200px] h-[50%] flex flex-col justify-center items-center">
                    <div className="w-[60px] md:w-[85px] h-[60px] md:h-[85px] rounded-full bg-neutral-100 flex justify-center items-center">
                      <img src={pic12.src} className="w-[60%] h-[60%]" />
                    </div>
                  </div>
                  <div className="w-[90%] h-[30%]">
                    <h3 className="text-[14px] md:text-[18px] text-center font-[500]">
                      Project Outsource Contract
                    </h3>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      <div className="w-[100%] h-fit mx-auto pb-7 md:pb-14 pt-3 md:pt-5">
        <RecentRecordAll letterType={"AppointmentLetter"} />
      </div>
    </>
  );
}

export default MainPage;
