"use client";

import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import {
  formatDate,
  formatUperFirst,
  formatUpperCase,
  numberToWords,
} from "@/app/functions/formats";
import { useEffect } from "react";

const ClearanceLetterPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.ClearanceLetter);
  useEffect(() => {
    const title = `Clearance Letter - ${data.name}`;
    document.title = title;
  }, [data.name]);

  return (
    <div className="mx-auto w-fit h-fit flex flex-col justify-center items-center relative overflow-hidden showOnPrintOnly leading-[23px] text-justify shadow-2xl zooming">
      <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center bg-red-30">
          <div className="w-[80%] h-[90%] absolute top-[160px] flex flex-col justify-start items-start bg-blue-30">
            <div className="w-[100%] h-fit flex flex-col justify-between items-start pb-3">
              <div className="w-full flex justify-end items-start">
                <span className="text-[15px] font-[500] text-slate-600">
                  Page <b>1</b> of <b>2</b>
                </span>
              </div>
              <div className="flex flex-col justify-betwenn bg-purple-30 items-start py-3">
                {/* <h2 className="text-[13px] font-[400]">
                  {data.currentDate.replaceAll("-", "/")}
                </h2>
                <h2 className="text-[13px] font-[400]">
                  {formatUpperCase(data.name)}
                </h2> */}
              </div>
              <div className="w-full flex justify-center items-start">
                <h1 className="text-[17px] font-[700] underline">
                  EMPLOYEE EXIT CLEARANCE FORM
                </h1>
              </div>
            </div>
            <div className="w-[100%] h-fit bg-yellow-30 flex flex-col justify-between items-start py-1">
              <div className="w-full flex justify-center items-start">
                <div className="text-[13px] font-[400] w-full leading-[23px]">
                  Reference to the “Employee/Intern Handbook”, Employee exit
                  clearance form is solely filled by an individual at the time
                  of his/her leaving/quit office.
                  <h4 className="mt-3 bg-stone-400 w-full text-center border-[1px] border-black py-1 font-bold">
                    EMPLOYEE INFORMATION
                  </h4>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex justify-start gap-2 w-fit">
                      <span className="w-fit leading-none">Employee Name:</span>
                      <span className="leading-none border-b-[1px] border-black">
                        {formatUperFirst(data.name)}
                      </span>
                    </div>
                    <div className="flex justify-start gap-2 w-fit">
                      <span className="w-fit leading-none">Employee ID:</span>
                      <span className="leading-none border-b-[1px] border-black">
                        {data.employeeId}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex justify-start gap-2 w-fit">
                      <span className="w-fit leading-none">
                        Current Designation:
                      </span>
                      <span className="leading-none border-b-[1px] border-black">
                        {data.designation}
                      </span>
                    </div>
                    <div className="flex justify-start gap-2 w-fit">
                      <span className="w-fit leading-none">Department:</span>
                      <span className="leading-none border-b-[1px] border-black">
                        {data.department}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex justify-start gap-2 w-fit">
                      <span className="w-fit leading-none">
                        Date of Joining:
                      </span>
                      <span className="leading-none border-b-[1px] border-black">
                        {formatDate(data.joiningDate)}
                      </span>
                    </div>
                    <div className="flex justify-start gap-2 w-fit">
                      <span className="w-fit leading-none">
                        Last Day of Employment:
                      </span>
                      <span className="leading-none border-b-[1px] border-black">
                        {formatDate(data.lastDate)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex justify-start gap-2 w-fit">
                      <span className="w-fit leading-none">CNIC NO:</span>
                      <span className="leading-none border-b-[1px] border-black">
                        {data.cnic}
                      </span>
                    </div>
                    <div className="flex justify-start gap-2 w-fit">
                      <span className="w-fit leading-none">Address:</span>
                      <span className="leading-none border-b-[1px] border-black">
                        {data.address}
                      </span>
                    </div>
                  </div>
                  <h4 className="mt-3 bg-stone-400 w-full text-center border-[1px] border-black py-1 font-bold">
                    OFFICE USE ONLY
                  </h4>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex justify-start gap-2 w-fit">
                      <b className="w-fit leading-none">Reason For Leaving:</b>
                      <span className="leading-none border-b-[1px] border-black">
                        {data.reasonForLeaving}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-start">
                    <div className="flex justify-start gap-2 w-fit">
                      <span className="w-fit leading-none">
                        Clearance Payable (Rs):
                      </span>
                      <span className="leading-none border-b-[1px] border-black">
                        {data.payable}
                      </span>
                    </div>
                    <div className="flex justify-between gap- w-fi w-[50%] bg-red-5 items-start">
                      <span className="w-fi leading-none w-[23%]">
                        In Words:
                      </span>
                      <span className=" border-b-[1px] w-[77%] border-black leading-none">
                        {numberToWords(
                          Number(data.payable.replaceAll(",", ""))
                        )}{" "}
                        Only.
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex justify-start gap-2 w-fit">
                      <span className="w-fit leading-none">Payment Mode:</span>
                      <span className="leading-none border-b-[1px] border-black">
                        {data.paymentMode}
                      </span>
                    </div>
                    <div className="flex justify-start gap-2 w-fit">
                      <span className="w-fit leading-none">Cheque No:</span>
                      <span className="leading-none border-b-[1px] border-black">
                        {data.chequeNo}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center bg-red-40 flex-wrap gap-y-3">
                    {data.paymentDate ? (
                      <div className="flex justify-start gap-2 w-fit">
                        <span className="w-fit leading-none">
                          Payment Date:
                        </span>
                        <span className="leading-none border-b-[1px] border-black">
                          {formatDate(data.paymentDate)}
                        </span>
                      </div>
                    ) : null}
                    <div className="flex justify-start gap-2 w-fit">
                      <span className="w-fit leading-none">
                        Clearance Date:
                      </span>
                      <span className="leading-none border-b-[1px] border-black">
                        {formatDate(data.clearanceDate)}
                      </span>
                    </div>
                    {data.assets ? (
                      <div
                        className={`flex justify-start items-center gap-2 ${
                          data.paymentDate ? "w-[100%]" : "w-fit"
                        } p-0 m-0`}
                      >
                        <span className="w-fit leading-none p-0 m-0">
                          Assets/Requirable:
                        </span>
                        <span className=" p-0 m-0">
                          {data.assets
                            .split(",")
                            .map((item: any, index: number) => (
                              <span className=" px-2 m-0">
                                {index >= 0 ? index + 1 + "." : null}
                                <span className="leading-none border-b-[1px] border-black">
                                  {item}
                                </span>
                              </span>
                            ))}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  {/* <div className="mt-3 flex justify-between items-center p-0 m-0"></div> */}
                  <h4 className="mt-3 mb-3 bg-stone-400 w-full text-center border-[1px] border-black py-1 font-bold">
                    UNDERTAKING
                  </h4>
                  I acknowledged that all of my above-mentioned information is
                  correct and I have received my final payable in form of
                  clearance cheque.
                  <br />I understand that after my clearance, I have no right to
                  claim any payables form company.
                  <br />
                  Upon separation, I understand that I have an ongoing
                  responsibility to maintain the confidentiality Of
                  Non-Disclosure Agreement that I had signed upon my joining
                  with Devonicx.
                  <div className="pt-10 flex justify-between items-center absolut bottom-[250px] w-full">
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
                <div className="text-[13px] font-[400] w-full leading-[23px]">
                  {/* <br />
                  Upon separation, I understand that I have an ongoing
                  responsibility to maintain the confidentiality Of
                  Non-Disclosure Agreement that I had signed upon my joining
                  with Devonicx.
                  <div className="pt-10 flex justify-between items-center absolut bottom-[250px] w-full">
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
                  </div> */}
                  <br />
                  <h4 className="mb-3 bg-stone-400 w-full text-center border-[1px] border-black py-1 font-bold">
                    DEPARTMENT CLEARANCE
                  </h4>
                  Departments are responsible for costs associated with the
                  failure to secure College property and resources upon
                  separation of an employee.
                  <div className="my-5 w-full flex flex-col items-start justify-between">
                    <div className="my-0 w-full flex flex-col items-start justify-start gap-2">
                      <h5 className="font-bold">Human Resource:</h5>
                      <div className="flex flex-wrap justify-start gap-x-10 gap-y-2">
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-[15px] h-[15px] border border-black flex justify-center items-center text-center ">
                            {data.hr?.Skype_Credentials_Change && (
                              <FaCheck className="w-[80%] h-[80%]" />
                            )}
                          </div>
                          <h5>Skype Credentials Change</h5>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-[15px] h-[15px] border border-black flex justify-center items-center text-center ">
                            {data.hr?.Official_Email_Restriction && (
                              <FaCheck className="w-[80%] h-[80%]" />
                            )}
                          </div>

                          <h5>Official Email Restriction</h5>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-[15px] h-[15px] border border-black flex justify-center items-center text-center ">
                            {data.hr?.File_Management && (
                              <FaCheck className="w-[80%] h-[80%]" />
                            )}
                          </div>

                          <h5>File Management</h5>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-[15px] h-[15px] border border-black flex justify-center items-center text-center ">
                            {data.hr?.Assets_Recovery && (
                              <FaCheck className="w-[80%] h-[80%]" />
                            )}
                          </div>

                          <h5>Assets Recovery</h5>
                        </div>
                      </div>
                    </div>
                    <div className="pt-7 flex justify-between items-center w-full">
                      <span className="flex items-center gap-2">
                        <span className=" flex flex-col">HR Signature:</span>{" "}
                        <span className=" flex flex-col">
                          ____________________________________{" "}
                        </span>{" "}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className=" flex flex-col leading-none">
                          Date:
                        </span>{" "}
                        <span className="flex flex-col border-b border-black leading-4">
                          {formatDate(data.currentDate)}
                        </span>{" "}
                      </span>
                    </div>
                  </div>
                  <div className="my-5 w-full flex flex-col items-start justify-between">
                    <div className="my-0 w-full flex flex-col items-start justify-start gap-2">
                      <h5 className="font-bold">Team Leader Technical:</h5>
                      <div className="flex flex-wrap justify-start gap-x-10 gap-y-2">
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-[15px] h-[15px] border border-black flex justify-center items-center text-center ">
                            {data.tlt?.Retrieve_All_Technical_Data && (
                              <FaCheck className="w-[80%] h-[80%]" />
                            )}
                          </div>

                          <h5>Retrieve All Technical Data</h5>
                        </div>
                      </div>
                    </div>
                    <div className="pt-7 flex justify-between items-center w-full">
                      <span className="flex items-center gap-2">
                        <span className=" flex flex-col">TLT Signature:</span>{" "}
                        <span className=" flex flex-col">
                          ____________________________________{" "}
                        </span>{" "}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className=" flex flex-col leading-none">
                          Date:
                        </span>{" "}
                        <span className="flex flex-col border-b border-black leading-4">
                          {formatDate(data.currentDate)}
                        </span>{" "}
                      </span>
                    </div>
                  </div>
                  {/* <div className="my-5 w-full flex flex-col items-start justify-between"></div> */}
                  {/* <br /> */}
                  <div className="my- w-full flex flex-col items-start justify-between">
                    <div className="my-0 w-full flex flex-col items-start justify-start gap-2">
                      <h5 className="font-bold">Project Manager:</h5>
                      <div className="flex flex-wrap justify-start gap-x-10 gap-y-2">
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-[15px] h-[15px] border border-black flex justify-center items-center text-center ">
                            {data.pr?.Change_All_Technical && (
                              <FaCheck className="w-[80%] h-[80%]" />
                            )}
                          </div>

                          <h5>Change/Remove All Technical</h5>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-[15px] h-[15px] border border-black flex justify-center items-center text-center ">
                            {data.pr?.Account_Permission && (
                              <FaCheck className="w-[80%] h-[80%]" />
                            )}
                          </div>

                          <h5>Account Permission</h5>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-[15px] h-[15px] border border-black flex justify-center items-center text-center ">
                            {data.pr?.Configuration_of_All_TL_Data && (
                              <FaCheck className="w-[80%] h-[80%]" />
                            )}
                          </div>

                          <h5>Configuration of All TL Data</h5>
                        </div>
                      </div>
                    </div>
                    <div className="pt-7 flex justify-between items-center w-full">
                      <span className="flex items-center gap-2">
                        <span className=" flex flex-col">PM Signature:</span>{" "}
                        <span className=" flex flex-col">
                          ____________________________________{" "}
                        </span>{" "}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className=" flex flex-col leading-none">
                          Date:
                        </span>{" "}
                        <span className="flex flex-col border-b border-black leading-4">
                          {formatDate(data.currentDate)}
                        </span>{" "}
                      </span>
                    </div>
                  </div>
                  <div className="my-5 w-full flex flex-col items-start justify-between">
                    <div className="my-0 w-full flex flex-col items-start justify-start gap-2">
                      <h5 className="font-bold">Chief Executive Officer:</h5>
                    </div>
                    <div className="pt-7 flex justify-between items-center w-full">
                      <span className="flex items-center gap-2">
                        <span className=" flex flex-col">CEO Signature:</span>{" "}
                        <span className=" flex flex-col">
                          ____________________________________{" "}
                        </span>{" "}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className=" flex flex-col leading-none">
                          Date:
                        </span>{" "}
                        <span className="flex flex-col border-b border-black leading-4">
                          {formatDate(data.currentDate)}
                        </span>{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center bg-red-30">
          <div className="w-[80%] h-[90%] absolute top-[160px] flex flex-col justify-start items-start bg-blue-30">
            <div className="w-[100%] h-fit bg-purple-30 flex flex-col justify-between items-start pb-2">
              <div className="w-full flex justify-end items-start">
                <span className="text-[15px] font-[500] text-slate-600">
                  Page <b>3</b> of <b>3</b>
                </span>
              </div>
            </div>
            <div className="w-[100%] h-fit bg-yellow-30 flex flex-col justify-between items-start py-1">
              <div className="w-full flex justify-center items-start">
                <div className="text-[13px] font-[400] w-full leading-[23px]">
                   <br />
                  <div className="my-5 w-full flex flex-col items-start justify-between">
                    <div className="my-0 w-full flex flex-col items-start justify-start gap-2">
                      <h5 className="font-bold">Project Manager:</h5>
                      <div className="flex flex-wrap justify-start gap-x-10 gap-y-2">
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-[15px] h-[15px] border border-black flex justify-center items-center text-center ">
                            {data.pr?.Change_All_Technical && (
                              <FaCheck className="w-[80%] h-[80%]" />
                            )}
                          </div>

                          <h5>Change/Remove All Technical</h5>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-[15px] h-[15px] border border-black flex justify-center items-center text-center ">
                            {data.pr?.Account_Permission && (
                              <FaCheck className="w-[80%] h-[80%]" />
                            )}
                          </div>

                          <h5>Account Permission</h5>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-[15px] h-[15px] border border-black flex justify-center items-center text-center ">
                            {data.pr?.Configuration_of_All_TL_Data && (
                              <FaCheck className="w-[80%] h-[80%]" />
                            )}
                          </div>

                          <h5>Configuration of All TL Data</h5>
                        </div>
                      </div>
                    </div>
                    <div className="pt-7 flex justify-between items-center w-full">
                      <span className="flex items-center gap-2">
                        <span className=" flex flex-col">PM Signature:</span>{" "}
                        <span className=" flex flex-col">
                          ____________________________________{" "}
                        </span>{" "}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className=" flex flex-col leading-none">
                          Date:
                        </span>{" "}
                        <span className="flex flex-col border-b border-black leading-4">
                          {formatDate(data.currentDate)}
                        </span>{" "}
                      </span>
                    </div>
                  </div>
                  <div className="my-5 w-full flex flex-col items-start justify-between">
                    <div className="my-0 w-full flex flex-col items-start justify-start gap-2">
                      <h5 className="font-bold">Chief Executive Officer:</h5>
                    </div>
                    <div className="pt-7 flex justify-between items-center w-full">
                      <span className="flex items-center gap-2">
                        <span className=" flex flex-col">CEO Signature:</span>{" "}
                        <span className=" flex flex-col">
                          ____________________________________{" "}
                        </span>{" "}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className=" flex flex-col leading-none">
                          Date:
                        </span>{" "}
                        <span className="flex flex-col border-b border-black leading-4">
                          {formatDate(data.currentDate)}
                        </span>{" "}
                      </span>
                    </div>
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

export default ClearanceLetterPrint;
