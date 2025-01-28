"use client";

import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  formatAmount,
  formatDate,
  formatUperFirst,
  formatUpperCase,
} from "@/app/functions/formats";

const AppointmentLetterPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.AppointmentLetter);
  let [gross, setGross] = useState(0);

  useEffect(() => {
    const title = `Appointment Letter - ${data.name}`;
    document.title = title;
  }, [data.name]);

  interface AllowanceType {
    name: string;
    amount: string;
  }

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

  return (
    <div className="mx-auto w-fit h-fit flex flex-col justify-center items-center relative overflow-hidden showOnPrintOnl leading-[23px] text-justify shadow-2xl zooming">
      <div className="w-[215.9mm] h-[279.4mm] bg-image">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center">
          <div className="w-[80%] h-[90%] absolute top-[160px] flex flex-col justify-start items-start">
            <div className="w-[100%] h-fit flex flex-col justify-between items-start pb-2">
              <div className="w-full flex justify-end items-start">
                <span className="text-[15px] font-[500] text-slate-600">
                  Page <b>1</b> of <b>2</b>
                </span>
              </div>
              <div className="w-full flex flex-col justify-between bg-blue-60 items-start py-3 ">
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
                  APPOINTMENT LETTER (PERMANENT POSITION)
                </h1>
              </div>
            </div>
            <div className="w-[100%] h-fit flex flex-col justify-between items-start py-1">
              <div className="w-full flex justify-center items-start">
                <div className="text-[16px] font-[400] leading-[23px]">
                  <b>
                    Dear {data.gender === "Male" ? "Mr." : "Ms."}{" "}
                    {formatUperFirst(data.name)},
                  </b>
                  <p className="py-1"></p>
                  We are pleased to inform you that, following a comprehensive
                  assessment of your performance during the probationary period,
                  the management has decided to confirm your employment as{" "}
                  {data.designation} with Devonicx effective from{" "}
                  {formatDate(data.startingDate)}.<p className="py-1"></p>
                  {data.comLine
                    ? ` In addition, you will receive a ${data.commission}% commission upon the successful completion of projects on boarded by you, and a 5% commission on projects sourced by teams under your supervision (Referred to commission terms).`
                    : " Terms of your employment are given below:"}
                  <p className="py-1"></p>
                  As a result of your successful completion of the probation
                  period, we are pleased to announce that your salary will be
                  revised. Your new salary details are as follows:{" "}
                  <p className="py-1"></p>
                  <div className="w-full flex flex-col justify-start items-center py-1">
                    <div className="w-[75%] flex justify-between items-center">
                      <p className="">Basic Salary</p>
                      <p className="w-[120px]">Rs. {data.basicSalary}/-</p>
                    </div>
                    {data.allowance.map((item: AllowanceType) => (
                      <div className="w-[75%] flex justify-between items-center">
                        <p className="">
                          {formatUperFirst(item.name)} Allowance
                        </p>
                        <div className="w-[120px]">
                          <p className="">Rs. {item.amount}/-</p>
                        </div>
                      </div>
                    ))}
                    <div className="w-[75%] flex justify-between items-center">
                      <b className="">Total Gross Monthly Salary</b>
                      <b className="w-[120px]">
                        Rs. {gross == 0 ? null : gross}/-
                      </b>
                    </div>
                  </div>{" "}
                  <p className="py-1"></p>
                  This salary revision will be effective from{" "}
                  {formatDate(data.salaryEffective)}, and you will find the
                  updated salary details in your next paycheck.
                  <p className="py-1"></p>
                  Please note that with this confirmation, you are now entitled
                  to the full range of benefits provided to permanent employees
                  of Devonicx. Please consult HR Department for the knowledge
                  base of incentives, and medical coverage policies.
                  <p className="py-1"></p>
                  The terms and conditions of your permanent employment will
                  remain the same as outlined in the Devonicx Employee Handbook.
                  It is important to familiarize yourself with the policies and
                  guidelines provided in the handbook to ensure a smooth
                  transition into your permanent role.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center">
          <div className="w-[80%] h-[90%] absolute top-[160px] bg-green-40 flex flex-col justify-start items-start">
            <div className="w-full flex justify-end items-start pb-2">
              <span className="text-[15px] font-[500] text-slate-600">
                Page <b>2</b> of <b>2</b>
              </span>
            </div>

            <div className="w-[100%] h-fit flex flex-col justify-between items-start py-2">
              <div className="w-full flex justify-center items-start">
                <div className="text-[16px] font-[400] leading-[23px]">
                  {data.addIncLine && (
                    <>
                      The next performance evaluation is scheduled for 8 months
                      from now, with a potential salary increase of up to{" "}
                      {data.increment}%, based on your performance.
                    </>
                  )}
                  <p className="py-1"></p>
                  Once again, congratulations on your successful completion of
                  the probation period, and we look forward to your continued
                  success with Devonicx.
                  <p className="py-1"></p>
                  <p className="py-1"></p>
                  <p className="py-1"></p>
                  <p className="py-1"></p>
                  Warm Regards,
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

export default AppointmentLetterPrint;
