"use client";

import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { formatUperFirst, formatUpperCase } from "@/app/functions/formats";
import { useEffect } from "react";

const SocialMediaConsentPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.SocialMediaConsent);
  useEffect(() => {
    const title = `Social Media Consest - ${data.name}`;
    document.title = title;
  }, [data.name]);

  return (
    <div className="mx-auto w-fit h-fit flex flex-col justify-center items-center relative overflow-hidden showOnPrintOnly leading-[23px] text-justify shadow-2xl zooming">
      <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center">
          <div className="w-[80%] h-[90%] absolute top-[160px] flex flex-col justify-start items-start">
            <div className="w-[100%] h-fit flex flex-col justify-between items-start pb-2">
              <div className="w-full flex justify-end items-start">
                <span className="text-[15px] font-[500] text-slate-600">
                  Page <b>1</b> of <b>1</b>
                </span>
              </div>
              <div className="flex flex-col justify-betwenn items-start py-3">
                {/* <h2 className="text-[16px] font-[400]">
                  {data.currentDate.replaceAll("-", "/")}
                </h2>
                <h2 className="text-[16px] font-[400]">
                  {formatUpperCase(data.name)}
                </h2> */}
              </div>
              <div className="w-full flex justify-center items-start">
                <h1 className="text-[19px] font-[700] underline">
                  Photo Release Social Media Consent Form
                </h1>
              </div>
            </div>
            <div className="w-[100%] h-fit flex flex-col justify-between items-start py-1">
              <div className="w-full flex justify-center items-start">
                <div className="text-[14px] font-[400] w-full leading-[23px]">
                  Devonicx uses its Staff/Employee/Internee images on our
                  social media profiles (Facebook, LinkedIn, Twitter, Instagram,
                  etc.) for promoting culture and working environment. This form
                  is for the consent purpose of the individual employees that
                  you are agreeing to use your images/videos on social platforms
                  or not.
                  <div className="py-3 flex flex-col items-start justify-start gap-3">
                    <b>Please fill out the given from as required:</b>
                    <div className="flex justify-between items-center w-full bg-red-30 h-[30px]">
                      <div className="flex justify-between items-center gap-[3%] w-[48%] h-full ">
                        <span className="w-fit bg-red-40">Full Name:</span>
                        <div className="w-[70%] h-[100%] bg-red-80 border border-black flex justify-start items-center px-3">
                          {formatUperFirst(data.name)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-[3%] w-[48%] h-full ">
                        <span className="w-fit bg-red-40">CNIC No:</span>
                        <div className="w-[70%] h-[100%] bg-red-80 border border-black flex justify-start items-center px-3">
                          {data.cnic}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full bg-red-30 h-[30px]">
                      <div className="flex justify-between items-center gap-[3%] w-[48%] h-full ">
                        <span className="w-fit bg-red-40">Designation:</span>
                        <div className="w-[70%] h-[100%] bg-red-80 border border-black flex justify-start items-center px-3">
                          {data.designation}
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-[3%] w-[48%] h-full ">
                        <span className="w-fit bg-red-40">Employee Id:</span>
                        <div className="w-[70%] h-[100%] bg-red-80 border border-black flex justify-start items-center px-3">
                          {data.employeeId}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-3 flex flex-col items-start justify-start gap-3">
                    <b>
                      Please tick one option as per your consent and cross the
                      other one:
                    </b>
                    <div className="flex flex-col justify-between items-center w-full bg-red-30 h-fit gap-1">
                      <div className="flex justify-start items-start gap-[3%] w-full h-full ">
                        <div className="w-[20px] h-[20px] bg-red-80 border border-black relative top-[5px]"></div>
                        <span className="w-fit bg-red-40">
                          I hereby grant Devonicx, to use and publish
                          photographs and videos of myself on their social media
                          profiles for the purpose of promoting the culture and
                          work environment. In any case, if I leave Devonicx, I shall have no right to make such demand
                          to remove my images and videos from social media
                          profiles which was published for the purpose that is
                          mentioned above.{" "}
                        </span>
                      </div>
                      <div className="flex justify-start items-start gap-[3%] w-full h-full ">
                        <div className="w-[20px] h-[20px] bg-red-80 border border-black relative top-[5px]"></div>
                        <span className="w-fit bg-red-40">
                          I do not authorize Devonicx to use my image or
                          video in which I appeared on any social profiles for
                          any purpose. In case of group image or group video,
                          Devonicx must add emoji/blur my face and can
                          use that image or video on their social media
                          profiles.{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="w-[100%] h-fit flex flex-col justify-between items-start py absolut bottom-0"> */}
            {/* <div className="w-full flex justify-center items-start"> */}
            <div className="text-[14px] font-[400] w-full leading-[23px]">
              <div className="py- flex flex-col items-start justify-start gap-1">
                <b>
                  Please mention your actual birthday for in house birthday
                  celebration & wishes:{" "}
                </b>
                <div className="flex justify-between items-center w-full h-fit relative top-[5px]">
                  <div className="flex justify-start items-end gap-[2%] w-[50%] h-full">
                    Birthday
                    <div className="w-[20px] h-[20px] bg-red-80 border border-black"></div>
                    As per CNIC
                  </div>
                  <div className="flex justify-end items-end gap-[2%] w-[50%] h-full">
                    <div className="w-[20px] h-[20px] bg-red-80 border border-black"></div>
                    other
                    <div className="w-[250px] h-[20px] bg-red-80 border-b border-black"></div>
                  </div>
                </div>
              </div>
              <div className="pt-[80px] flex justify-between items-center absolut bottom-[250px] w-full">
                <span className=" flex flex-col items-center">
                  <span className=" flex flex-col">
                    ________________________{" "}
                  </span>{" "}
                  <span className=" flex flex-col">Signature</span>{" "}
                </span>
                <span className=" flex flex-col items-center">
                  <span className=" flex flex-col">
                    ________________________
                  </span>{" "}
                  <span className=" flex flex-col">Thumb Impression</span>{" "}
                </span>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center">
          <div className="w-[80%] h-[90%] absolute top-[160px] flex flex-col justify-start items-start">
            <div className="w-[100%] h-fit flex flex-col justify-between items-start pb-2">
              <div className="w-full flex justify-end items-start">
                <span className="text-[15px] font-[500] text-slate-600">
                  Page <b>2</b> of <b>2</b>
                </span>
              </div>
            </div>

            <div className="w-[100%] h-fit flex flex-col justify-between items-start py-1">
              <div className="w-full flex justify-center items-start">
                <div className="text-[16px] font-[400] w-full leading-[23px]">
                  <div className="py-3 flex flex-col items-start justify-start gap-[20px]">
                    <b>
                      Please mention your actual birthday for in house birthday
                      celebration & wishes:{" "}
                    </b>
                    <div className="flex justify-between items-center w-full h-fit">
                      <div className="flex justify-start items-end gap-[2%] w-[50%] h-full">
                        Birthday
                        <div className="w-[20px] h-[20px] bg-red-80 border border-black"></div>
                        As per CNIC
                      </div>
                      <div className="flex justify-end items-end gap-[2%] w-[50%] h-full">
                        <div className="w-[20px] h-[20px] bg-red-80 border border-black"></div>
                        other
                        <div className="w-[250px] h-[20px] bg-red-80 border-b border-black"></div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-20 flex justify-between items-center absolut bottom-[250px] w-full">
                    <span className=" flex flex-col items-center">
                      <span className=" flex flex-col">
                        ________________________{" "}
                      </span>{" "}
                      <span className=" flex flex-col">Signature</span>{" "}
                    </span>
                    <span className=" flex flex-col items-center">
                      <span className=" flex flex-col">
                        ________________________
                      </span>{" "}
                      <span className=" flex flex-col">Thumb Impression</span>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SocialMediaConsentPrint;
