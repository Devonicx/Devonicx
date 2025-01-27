"use client";

import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { formatDate, formatUperFirst, formatUpperCase } from "@/app/functions/formats";
import { useEffect } from "react";

const NonDisclosureAgreementPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.NonDisclosureAgreement);
  useEffect(() => {
    const title = `Non Disclosure Agreement - ${data.name}`;
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
                  Page <b>1</b> of <b>3</b>
                </span>
              </div>
              <div className="flex flex-col justify-betwenn items-start py-3">
              </div>
              <div className="w-full flex justify-center items-start">
                <h1 className="text-[19px] font-[700] underline">
                  NON DISCLOSURE AGREEMENT
                </h1>
              </div>
            </div>
            <div className="w-[100%] h-fit bg-yellow-30 flex flex-col justify-between items-start py-2">
              <div className="w-full flex justify-center items-start">
                <div className="text-[16px] font-[400] w-full leading-[23px]">
                  This Non-Disclosure Agreement (the “Agreement”) is made and
                  entered into by and between <b>Devonicx</b>, with its
                  principal place of business at 53, Quaid Block Commercial,
                  Bahria Town, Lahore (the “Company”), and {` `}
                  <b>
                    {data.name ? formatUperFirst(data.name) : "_______________"}{" "}
                  </b>
                  {data.so} {` `}
                  <b>
                    {data.fatherName
                      ? formatUperFirst(data.fatherName)
                      : "_______________"}{" "}
                  </b>
                  an individual having CNIC {` `}
                  <b>{data.cnic ? data.cnic : "_______________"}</b> (the
                  “Employee/intern”) dated {` `}
                  {data.currentDate
                    ? formatDate(data.currentDate)
                    : "_______________"}
                  .<p className="py-2"></p>
                  WHEREAS, The Company desires to protect its confidential and
                  proprietary information and trade secrets, including but not
                  limited to, client lists, software code, and technical
                  specifications; and WHEREAS , The Employee/intern is being
                  employed by the Company in a position that requires access to
                  such confidential and proprietary information and trade
                  secrets; NOW , THEREFORE, in consideration of the premises and
                  mutual covenants herein contained, the parties hereto agree as
                  follows:
                  <p className="py-2"></p>
                  <div>
                    <div>
                      <b>
                        1. CONFIDENTIAL INFORMATION:
                        <br />
                      </b>
                      The Employee agrees that all confidential and proprietary
                      information and trade secrets of the Company, including
                      but not limited to client lists, software code, and
                      technical specifications (the “Confidential Information”),
                      disclosed to the Employee by the Company or learned by the
                      Employee during the course of employment with the Company,
                      shall remain the sole and exclusive property of the
                      Company.
                    </div>
                    <p className="py-2"></p>
                  </div>
                  <div>
                    <b>
                      2. NON-DISCLOSURE: <br />
                    </b>
                    The Employee agrees that all confidential and proprietary
                    information and trade secrets of the Company, including but
                    not limited to client lists, software code, and technical
                    specifications (the “Confidential Information”), disclosed
                    to the Employee by the Company or learned by the Employee
                    during the course of employment with the Company, shall
                    remain the sole and exclusive property of the Company.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center">
          <div className="w-[80%] h-[90%] absolute top-[160px] flex flex-col justify-start items-start">
            <div className="w-[100%] h-fit flex flex-col justify-between items-start pb-2 bg-red-60">
              <div className="w-full flex justify-end items-start">
                <span className="text-[17px] font-[500] text-slate-600">
                  Page <b>2</b> of <b>3</b>
                </span>
              </div>
            </div>
            <div className="w-[100%] h-fit bg-yellow-30 flex flex-col justify-between items-start py-3">
              <div className="w-full flex justify-center items-start">
                <div className="text-[16px] font-[400] w-full leading-[23px]">
                  <div>
                    <div>
                      <b>
                        3. RETURN OF CONFIDENTIAL INFORMATION: <br />
                      </b>
                      Upon termination of employment with the Company, the
                      Employee agrees to return to the Company all Confidential
                      Information in the Employee’s possession or control,
                      including all copies thereof.
                    </div>
                    <p className="py-2"></p>
                    <div>
                      <b>
                        4. REMEDIES:
                        <br />
                      </b>
                      The Employee acknowledges that any breach of this
                      Agreement by the Employee will cause irreparable harm to
                      the Company, and that the Company shall be entitled to
                      seek injunctive relief to prevent such breach, as well as
                      any other legal or equitable remedies available to the
                      Company.
                    </div>
                    <p className="py-2"></p>
                    <div>
                      <b>
                        5. ENFORCEABILITY: <br />
                      </b>
                      This Agreement shall be binding upon and inure to the
                      benefit of the parties hereto and their respective
                      successors and assigns. If any provision of this Agreement
                      is held to be invalid or unenforceable, the remaining
                      provisions shall not be affected and shall continue to be
                      valid and enforceable to the fullest extent permitted by
                      law.
                    </div>
                    <p className="py-2"></p>
                    <div>
                      <b>
                        6. GOVERNING LAW: <br />
                      </b>
                      This Agreement shall be governed by and construed in
                      accordance with the laws of the State of Pakistan, without
                      regard to its conflict of law provisions.
                    </div>
                  </div>
                  <p className="py-2"></p>
                  <div>
                    <b>
                      7. WORK CONFIDENTIALITY: <br />
                    </b>
                    Employee agrees not to disclose any work done on company’s
                    individual or client’s projects, including web development,
                    mobile apps, any graphic material and anything that is being
                    worked by you on company’s projects to their personal,
                    freelancing or any portfolio-based website i.e. (Behance)
                    without the prior written consent of the Company.
                  </div>
                  <p className="py-2"></p>

                  <div>
                    <b>
                      8. ENTIRE AGREEMENT: <br />
                    </b>
                    This Agreement constitutes the entire agreement between the
                    parties hereto with respect to the subject matter hereof and
                    supersedes all prior and contemporaneous agreements and
                    understandings, whether written or oral, relating to the
                    subject matter hereof.
                  </div>
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
                <span className="text-[17px] font-[500] text-slate-600">
                  Page <b>3</b> of <b>3</b>
                </span>
              </div>
            </div>
            <div className="w-[100%] h-fit bg-yellow-30 flex flex-col justify-between items-start py-3">
              <div className="w-full flex justify-center items-start">
                <div className="text-[16px] font-[400] w-full leading-[23px]">
                  <div>
                    <div>
                      <b>
                        9. ACCEPTANCE:
                        <br />
                      </b>
                      I have read and understood the terms and conditions of
                      this agreement and hereby accept and agree to be bound by
                      them. By signing below, I acknowledge that I have had the
                      opportunity to ask questions and seek clarification about
                      any terms that I do not fully understand, and that I agree
                      to comply with all of the obligations set forth in this
                      agreement.
                    </div>
                    <p className="py-12"></p>

                    <div className="flex justify-between items-center absolut bg-red-00 bottom-[550px] w-full bg-green-20 flex-wrap gap-y-3">
                      <span className="bg-red-40 w-[33%">
                        Full Name: {` `}{" "}
                        <span className="border-b border-black">
                          {data.name
                            ? formatUpperCase(data.name)
                            : "________________"}
                        </span>
                      </span>{" "}
                      <span className="bg-yellow-70 w-[33%">
                        {formatUpperCase(data.so)}: {` `}{" "}
                        <span className="border-b border-black">
                          {data.fatherName
                            ? formatUpperCase(data.fatherName)
                            : "________________"}
                        </span>
                      </span>
                      <span className="bg-blue-40 w-[33%">
                        CNIC: {` `}
                        <span className="border-b border-black">
                          {data.cnic ? data.cnic : "________________"}
                        </span>
                      </span>
                    </div>
                    <p className="py-10"></p>

                    <div className="py-14 flex justify-between items-center absolut bottom-[220px] w-full">
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
        </div>
      </div>
    </div>
  );
};

export default NonDisclosureAgreementPrint;
