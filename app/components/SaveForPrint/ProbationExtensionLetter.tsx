"use client";

import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  formatAmount,
  formatDate,
  formatNumberToWord,
  formatUperFirst,
  formatUpperCase,
} from "@/app/functions/formats";

const ProbationExtensionLetterPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.ProbationExtensionLetter);
  let [gross, setGross] = useState(0);

  interface AllowanceType {
    name: string;
    amount: string;
  }
  useEffect(() => {
    const title = `Probation Extension Letter - ${data.name}`;
    document.title = title;
  }, [data.name]);

  useEffect(() => {
    let tempGross = 0;
    data.allowance.map((item: AllowanceType) => {
      tempGross = tempGross + Number(item.amount.replaceAll(",", ""));
    });
    setGross(
      formatAmount(
        (tempGross + Number(data.basicSalary.replaceAll(",", ""))).toString()
      )
    );
  }, [data.allowance, data.basicSalary]);
  console.log(data.probationPeriod);

  return (
    <div className="mx-auto w-fit h-fit flex flex-col justify-center items-center relative overflow-hidden showOnPrintOnly leading-[23px] text-justify shadow-2xl zooming">
      <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center">
          <div className="w-[80%] h-[90%] absolute top-[160px] flex flex-col justify-start items-start">
            <div className="w-[100%] h-fit flex flex-col justify-between items-start pb-2">
              <div className="w-full flex justify-end items-start">
                <span className="text-[15px] font-[500] text-slate-600">
                  Page <b>1</b> of <b>2</b>
                </span>
              </div>
              <div className="flex flex-col justify-betwenn items-start py-3">
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
                <h1 className="text-[19px] font-[700] underline">
                  PROBATIONARY PERIOD EXTENSION LETTER
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
                  We would like to take this opportunity to provide you with
                  feedback on your performance during the probationary period at
                  Devonicx. After careful evaluation, we have decided to
                  extend your probationary period for{" "}
                    {`${data.probationPeriod === "1" ? "an" : ""}`} additional{" "}
                  <b>
                    {data.probationPeriod} month
                    {`${data.probationPeriod === "1" ? "" : "s"}`}.
                  </b>
                  <p className="py-1"></p>
                  The purpose of extending the probationary period is to allow
                  us to further assess your suitability for the{" "}
                  <b>{data.designation}</b>
                  position and to provide you with an opportunity to address any
                  identified areas of improvement. This extension will enable us
                  to closely monitor your progress and provide any necessary
                  guidance and support for your professional development.
                  <p className="py-1"></p>
                  During the extended probationary period, we expect you to
                  continue to demonstrate your skills, commitment, and ability
                  to meet the performance expectations of your position. You
                  will be provided with additional guidance, training, and
                  resources as needed to help you succeed.
                  <p className="py-1"></p>
                  Please note that the extension of the probationary period does
                  not imply any negative feedback or lack of confidence in your
                  abilities. It is a standard procedure that allows us to
                  thoroughly evaluate your fit within our organization. During
                  the extended probationary period, we expect you to continue to
                  demonstrate your skills, commitment, and ability to meet the
                  performance expectations of your position. You will be
                  provided with additional guidance, training, and resources as
                  needed to help you succeed.
                  <p className="py-1"></p>
                  Please note that the extension of the probationary period does
                  not imply any negative feedback or lack of confidence in your
                  abilities. It is a standard procedure that allows us to
                  thoroughly evaluate your fit within our organization.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center">
          <div className="w-[80%] h-[90%] absolute top-[160px] flex flex-col justify-start items-start">
            <div className="w-[100%] h-fit flex flex-col justify-between items-start pb-2">
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
                  During the extended probationary period, we expect you to
                  continue to demonstrate your skills, commitment, and ability
                  to meet the performance expectations of your position. You
                  will be provided with additional guidance, training, and
                  resources as needed to help you succeed.
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

export default ProbationExtensionLetterPrint;
