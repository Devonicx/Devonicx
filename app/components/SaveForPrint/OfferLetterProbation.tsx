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

const OfferLetterProbationPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.OfferLetterProbation);
  let [gross, setGross] = useState(0);

  interface AllowanceType {
    name: string;
    amount: string;
  }
  useEffect(() => {
    const title = `Offer Letter Probation - ${data.name}`;
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
// console.log(data);

  return (
    <div className="mx-auto w-fit h-fit flex flex-col justify-center items-center relative overflow-hidden showOnPrintOnly leading-[23px] text-justify shadow-2xl zooming">
      <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center bg-red-30">
          <div className="w-[80%] h-[90%] absolute top-[155px] flex flex-col justify-start items-start bg-blue-30">
            <div className="w-[100%] h-fit bg-purple-30 flex flex-col justify-between items-start pb-2">
              <div className="w-full flex justify-end items-start">
                <span className="text-[15px] font-[500] text-slate-600">
                  Page <b>1</b> of <b>2</b>
                </span>
              </div>
              <div className="flex flex-col justify-betwenn items-start pt-[10px] pb-[15px]">
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
                  OFFER OF EMPLOYMENT
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
                  It is with great pleasure that we extend to you an offer of
                  employment with Soft Enterprise as a
                  <b> "{formatUperFirst(data.designation)}"</b>. We feel your
                  skills and energy would provide an excellent match with the
                  needs of our organization.
                  {data.comLine
                    ? ` In addition, you will receive a ${data.commission}% commission upon the successful completion of projects on boarded by you, and a 5% commission on projects sourced by teams under your supervision (Referred to commission terms).`
                    : " Terms of your employment are given below:"}
                  <p className="py-1"></p>
                  <div>
                    <div className="flex gap-1">
                      1.
                      <div>
                        Your gross monthly salary will be {gross} ({}
                        Rupees Only). Details are shown below:
                        <p className="py-1"></p>
                        <div className="w-full flex flex-col justify-start items-center py-1">
                          <div className="w-[75%] flex justify-between items-center">
                            <p className="">Basic Salary</p>
                            <p className="w-[120px]">
                              Rs. {data.basicSalary}/-
                            </p>
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
                          {data.commission ? (
                            <div className="w-[75%] flex justify-between items-center">
                              <p className="">Commission</p>
                              <p className="w-[120px]">{data.commission}%</p>
                            </div>
                          ) : null}

                          <div className="w-[75%] flex justify-between items-center">
                            <b className="">Total Gross Monthly Salary</b>
                            <b className="w-[120px]">
                              Rs. {gross == 0 ? null : gross}/-
                            </b>
                          </div>
                        </div>
                        <p className="py-1"></p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      2.
                      <div>
                        You will be on probation for a period of{" "}
                        {formatNumberToWord(data.probationPeriod)} months and
                        will be confirmed permanent employment after successful
                        completion of probation period. During which period the
                        company will assess the performance and suitability.
                        This probationary period be extended for a maximum
                        period of further{" "}
                        {formatNumberToWord(data.extProbation)} months by the
                        company at its discretion. During the course of
                        probation, your services are liable to be terminated on{" "}
                        {formatNumberToWord(data.terminationDays)} working days
                        (on-site) prior notice from either side, but after the
                        successful completion of the probationary period,{" "}
                        {formatNumberToWord(data.priorNotice)}{" "}
                        {data.priorNotice == 1 ? "month" : "months"} prior
                        notice in writing or one month’s salary in lieu thereof
                        shall have to be given or surrendered by either party
                        for terminating this engagement.
                      </div>
                    </div>
                    <div className="flex gap-1">
                      3.
                      <div>
                        The tax liability, if any, shall be your exclusive
                        responsibility, and you hereby authorize the company to
                        make any tax withholding from your salary as may be
                        required by law or local regulations.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center bg-red-30">
          <div className="w-[80%] h-[90%] absolute top-[155px] flex flex-col justify-start items-start bg-blue-30">
            <div className="w-[100%] h-fit bg-purple-30 flex flex-col justify-between items-start pb-2">
              <div className="w-full flex justify-end items-start">
                <span className="text-[15px] font-[500] text-slate-600">
                  Page <b>2</b> of <b>2</b>
                </span>
              </div>
            </div>

            <div className="w-[100%] h-fit bg-yellow-30 flex flex-col justify-between items-start py-1">
              <div className="w-full flex justify-center items-start">
                <div className="text-[16px] font-[400]">
                  <div>
                    <div className="flex gap-1">
                      4.
                      <div>
                        You shall not while in the employment of the company be
                        engaged in any other employment or business whatsoever
                        or accept any other emoluments without prior consent in
                        writing from the company.
                      </div>
                    </div>
                    <div className="flex gap-1">
                      5.
                      <div>
                        During your employment or after its termination, you
                        will not disclose any information relating to the
                        company or customers and will not divulge any of
                        company’s affairs or trade secrets that you obtain while
                        in the service of the company. You must be required to
                        sign a separate Non-Disclosure Agreement with the
                        company in this respect.
                      </div>
                    </div>
                    <div className="flex gap-1">
                      6.
                      <div>
                        You agree to perform, observe and confirm to such duties
                        and instructions as may from time to time be assigned or
                        communicated to you by the company, or which form part
                        of your job description or responsibility
                      </div>
                    </div>
                    <div className="flex gap-1">
                      7.
                      <div>
                        This letter of employment shall be governed by the law
                        of Pakistan
                      </div>
                    </div>
                    <div className="flex gap-1">
                      8.
                      <div>
                        There will be the increment in your basic salary up to{" "}
                        {data.increment}% as per your performance after
                        successful completion of your probation period.
                      </div>
                    </div>
                    <div className="flex gap-1">
                      9.
                      <div>
                        All disputes (if any) will be settled in the Courts of
                        Lahore, Pakistan (only).
                      </div>
                    </div>
                  </div>
                  {/* <p className="py-1"></p>
                  <span className="flex gap-1">
                    {data.comLine
                      ? "Additionally, you will receive a 10% commission upon the successful completion of those project onboard by you."
                      : null}
                  </span> */}
                  <p className="py-1"></p>
                  <b>
                    {" "}
                    Your first day of joining will be{" "}
                    {formatDate(data.startingDate)}.
                  </b>
                  <br />
                  You will communicate and required to sign{" "}
                  <b> Code of Conduct (Employee Handbook) </b>
                  and
                  <b> Non-Disclosure Agreement terms </b>
                  upon joining as well.
                  <p className="py-1"></p>
                  <p className="py-1"></p>I look forward to having you join our
                  staff.
                  <p className="py-1"></p>
                  Warm Regards,
                  <br />
                  HR Department
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferLetterProbationPrint;
