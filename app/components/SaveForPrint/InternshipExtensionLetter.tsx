"use client";

import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  formatDate,
  formatUperFirst,
  formatUpperCase,
} from "@/app/functions/formats";
import { useEffect } from "react";

const InternshipExtensionLetterPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.InternshipExtensionLetter);
  useEffect(() => {
    const title = `Internship Extension Letter - ${data.name}`;
    document.title = title;
  }, [data.name]);

  return (
    <div className="mx-auto w-fit h-fit flex flex-col justify-center items-center relative overflow-hidden showOnPrintOnly leading-[23px] text-justify shadow-2xl zooming">
      <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center bg-red-30">
          <div className="w-[80%] h-[90%] absolute top-[160px] flex flex-col justify-start items-start bg-blue-30">
            <div className="w-[100%] h-fit bg-purple-30 flex flex-col justify-between items-start pb-2">
              <div className="w-full flex justify-end items-start">
                <span className="text-[15px] font-[500] text-slate-600">
                  Page <b>1</b> of <b>2</b>
                </span>
              </div>
              <div className="py-3 flex flex-col justify-betwenn items-start">
                <h2 className="text-[16px] font-[400]">
                  {data.currentDate.replaceAll("-", "/")}
                </h2>
                <h2 className="text-[16px] font-[400]">
                  {formatUpperCase(data.name)}
                </h2>
                <h2 className="text-[16px] font-[400]">
                  {formatUpperCase(data.address)}
                </h2>
              </div>

              <div className="w-full flex justify-center items-start">
                <h1 className="text-[19px] font-[700] underline uppercase">
                  Internship Extension Letter
                </h1>
              </div>
            </div>
            <div className="w-[100%] h-fit bg-yellow-30 flex flex-col justify-between items-start py-1">
              <div className="w-full flex justify-center items-start">
                <div className="text-[16px] font-[400] leading-[23px]">
                  <b>
                    Dear {data.gender === "Male" ? "Mr." : "Ms."}{" "}
                    {formatUperFirst(data.name)},
                  </b>
                  <p className="py-1"></p>
                  We appreciate the dedication and enthusiasm you have shown
                  during your internship at Devonicx.
                  {`${
                    data.reason === "Lack of knowledge"
                      ? "We would like to inform you that, based on our assessment of the knowledge acquired during your internship"
                      : "We are pleased to inform you that based on your excessive leaves during internship period"
                  }`}
                  , we believe additional time is needed to fully achieve the
                  learning objectives. Therefore, your internship will be
                  extended by one month to provide you with the opportunity to
                  gain further experience and expertise.
                  <p className="py-1"></p>
                  Your original internship period was scheduled to end on{" "}
                  <b>{formatDate(data.startingDate)}</b>. However, considering
                  your valuable contributions and the need for your continued
                  involvement in ongoing projects, we would like to extend your
                  internship period until <b>{formatDate(data.endingDate)}</b>.
                  This extension will provide you with further opportunities to
                  enhance your skills and gain practical experience in your
                  chosen field.
                  <p className="py-1"></p>
                  During the extended period, we expect you to continue to
                  demonstrate your skills, commitment, and ability to meet the
                  performance expectations of your position. You will be
                  involved in similar tasks and responsibilities as before, with
                  potential exposure to new projects and challenges. We believe
                  that this extension will further contribute to your
                  professional growth and help you achieve your career
                  objectives.
                  <p className="py-1"></p>
                  Please note that the terms and conditions of your internship
                  remain unchanged, including the stipend or any other benefits
                  outlined in your original internship agreement.{" "}
                  <p className="py-1"></p>
                  We kindly request your confirmation of the internship period
                  extension by signing and returning a copy of this letter.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center bg-red-30">
          <div className="w-[80%] h-[90%] absolute top-[160px] flex flex-col justify-start items-start bg-blue-30">
            <div className="w-[100%] h-fit bg-purple-30 flex flex-col justify-between items-start pb-2">
              <div className="w-full flex justify-end items-start">
                <span className="text-[15px] font-[500] text-slate-600">
                  Page <b>2</b> of <b>2</b>
                </span>
              </div>
            </div>
            <div className="w-[100%] h-fit bg-yellow-30 flex flex-col justify-between items-start py-1">
              <div className="w-full flex justify-center items-start">
                <div className="text-[16px] font-[400] leading-[23px]">
                  <p className="py-1"></p>
                  We appreciate your continued commitment and dedication to your
                  role as an intern at Devonicx. We look forward to the
                  valuable contributions you will make during the extended
                  period. Thank you for your understanding and cooperation.
                  <p className="py-1"></p>
                  Warm Regards,
                  <br />
                  Human Resource
                  <br />
                  Devonicx
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipExtensionLetterPrint;
