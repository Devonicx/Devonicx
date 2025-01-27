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

const SalaryIncrementLetterPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.SalaryIncrementLetter);

  let [gross, setGross] = useState(0);

  interface AllowanceType {
    name: string;
    amount: string;
  }
  useEffect(() => {
    const title = `Salary Increment Letter - ${data.name}`;
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

  return (
    <div className="mx-auto w-fit h-fit flex justify-center items-center relative overflow-hidden showOnPrintOnly leading-[23px] text-justify shadow-2xl zooming">
      <div className="w-[215.9mm] h-[279.4mm] bg-image">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center">
          <div className="w-[80%] h-[90%] absolute top-[160px] flex flex-col justify-start items-start">
            <div className="w-[100%] h-fit flex flex-col justify-between items-start pb-2">
              <div className="w-full flex justify-end items-start">
                <span className="text-[15px] font-[500] text-slate-600">
                  Page <b>1</b> of <b>1</b>
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
                  SALARY INCREMENT LETTER
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
                  Based on your hard work, dedication, and contributions to the
                  success of Devonicx, we are pleased to announce that
                  effective {formatDate(data.effectiveDate)}, your salary is
                  increased. This adjustment reflects our recognition of your
                  valuable contributions and your continued growth within the
                  organization. Your new monthly salary division is as follows:
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
                  </div>
                  <p className="py-1"></p>
                  The decision to award you a salary increment was based on
                  several factors, including your consistent performance,
                  dedication, and commitment to achieving and exceeding your
                  goals. Your efforts have not only helped drive the success of
                  your team but have also positively impacted the overall
                  performance of the company.
                  <p className="py-1"></p>
                  {data.addIncLine && (
                    <>
                      The next performance evaluation is scheduled for 8 months
                      from now, with a potential salary increase of up to{" "}
                      {data.increment}%, based on your performance.
                    </>
                  )}
                  <p className="py-1"></p>
                  We firmly believe that this increment will serve as motivation
                  for you to continue your outstanding work and further excel in
                  your role. We value your skills, expertise, and the positive
                  attitude you bring to the workplace.
                  {data.addLine ? (
                    <>
                      <p className="py-1"></p>
                      The increment can be lift off if we feel your
                      responsibilities are compromised in future.
                    </>
                  ) : null}
                  <p className="py-1"></p>
                  <p className="py-1"></p>
                  Regards,
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

export default SalaryIncrementLetterPrint;
