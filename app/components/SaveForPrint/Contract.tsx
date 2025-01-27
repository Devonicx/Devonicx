"use client";

import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  formatDate,
  formatUperFirst,
  formatUpperCase,
} from "@/app/functions/formats";
import { combineReducers } from "@reduxjs/toolkit";

const ContractPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.Contract);
  useEffect(() => {
    const title = `${data.title} - ${data.name}`;
    document.title = title;
  }, [data.name]);
  let [pageLength, setPageLength] = useState(0);
  let [lastPage, setLastPage] = useState(0);
  let [nextPage, setNextPage] = useState(data?.forIndividual ? 21 : 16);
  useEffect(() => {
    setNextPage(data?.forIndividual ? 21 : 16);
  }, [data.forIndividual]);
  function insertBreaks(paragraph: any, lineLength: any) {
    const words = paragraph?.split(" ");
    let currentLineLength = 0;
    let result = "";

    words.forEach((word: any, index: any) => {
      if (currentLineLength + word.length + 1 > lineLength) {
        result += " *lb ";
        currentLineLength = 0;
      }
      result += (currentLineLength === 0 ? "" : " ") + word;
      currentLineLength += word.length + 1;
    });

    return result;
  }
  //   *lb</br>
  //                 <div>
  //                   *lb</br>
  //                   <b id="b">7. Ownership of Work</b></br> *lb
  // ${insertBreaks(
  //   `All work performed under this Agreement will be the sole property of the <b></b>. The Service Provider will turn over all related files and credentials upon completion of the project.`,
  //   100
  // )}
  //  *lb
  //                 </div>
  //   <div>
  //               </br>
  //                <b id="b">2. Scope of Work</b></br> *lb
  // ${insertBreaks(data.workScope, 90)} *lb
  //              </div>
  //              *lb</br>
  // let compensation =
  //   "The total payment for the services provided under this Agreement shall be " +
  //   data.amount +
  //   " (" +
  //   data.currency +
  //   ") " +
  //   "(payment after the platform fee). This fee will be payable upon successful completion of the project as outlined in the Scope of Work and Deliverables.";
  let splitedPaymentText = data.paymentText?.split("\n");
  let splitedDeadlineText = data.deadlineText?.split("\n");


  const combinedData = `<div>
              *lb</br> 
             <div>
               *lb</br>
                <b id="b">1. Project Details</b></br> *lb
${insertBreaks(data.projectDescription, 90)}
               
             </div>
             *lb</br> 
           
             <div>
               *lb</br>
               <b id="b">2. Deliverables</b></br> *lb
${insertBreaks(data.deliverables, 90)}
</div>
 *lb</br> 
<div>
 *lb</br>
<b id="b">3. Deadline</b> *lb
${splitedDeadlineText
  .map((item: any) => insertBreaks(item, 90) + " *lb")
  .join("")}
${insertBreaks(
  " Service Provider may request a reasonable extension to the deadline in case the project resources required by the Service Provider from Client is provided in delay and will be mark as written for consideration.",
  90
)} 
                </div>
             *lb</br> 
             <div>
               *lb</br>
                  <b id="b">4. Payments</b></br> *lb
${splitedPaymentText
  .map((item: any) => insertBreaks(item, 90) + " *lb")
  .join("")}
             </div>
             *lb</br> 
                <div>
                  *lb</br>
                  <b id="b">5. Confidentiality</b></br> *lb
${insertBreaks(
  `Service Provider agrees to hold in confidence all Confidential Information (defined as any information of Client that is not publicly known, including, but not limited to, trade secrets, customer lists, and business plans) of Client. Service Provider shall not use or disclose any Confidential Information to any third party without the prior written consent of Client.`,
  90
)}  
                  
                </div>
             *lb</br> 
                <div>
                  *lb</br>
                  <b id="b">6. Intellectual Property</b></br> *lb
${insertBreaks(
  `All intellectual property rights (including copyrights, leads, trademarks, and trade secrets) developed by Service Provider in the course of performing the Services hereunder shall be the sole and exclusive property of Client. Service Provider agrees to assign all such intellectual property rights to Client and to execute all documents reasonably necessary to vest such ownership in Client.`,
  90
)}  
                   
                </div>
             
             *lb</br> 
    <div>
                 </br>
                  <b id="b">7. Termination by Client for Cause</b></br> *lb
${insertBreaks(
  `Client may terminate this Agreement immediately upon written notice to Service Provider if Service Provider:`,
  90
)}  
 *lb
${insertBreaks(
  `7.1 Breaches any material provision of this Agreement, including, but not limited to, those >>related to confidentiality, deadlines, intellectual property rights, or the quality of >>the Services.`,
  90
)}  
 *lb
${insertBreaks(
  `7.2 Fails to meet any of the milestones outlined in Deadlines, and Payments section.`,
  90
)}
 *lb
${insertBreaks(
  `7.3 In the sole judgment of Client, the project is not on track for successful completion >>and is a waste of resources.`,
  90
)}
 *lb
${insertBreaks(
  `In the event of termination by Client under this Section, Service Provider shall refund to Client any advance payments made hereunder including milestone payments, and any remaining unpaid Fees shall be forfeited by Service Provider. Within 2 working days, after that Client has right to demand it on legal ground along with project damages and legal fees.`,
  90
)}
                </div>
${
  !data.forIndividual
    ? `  *lb</br> 
  <div>
                  *lb</br>
                  <b id="b">8. Independent Contractor Status
</b></br> *lb
${insertBreaks(
  `Service Provider is retained by Client as an independent contractor and shall not be considered an employee of Client for any purpose whatsoever. Service Provider is responsible for all taxes (including income taxes, etc.) arising out of the performance of the Services hereunder.`,
  90
)}  

</div>
`
    : ""
}
             
                    </div>
                    `;
  console.log(combinedData);
  
  let titleLength = insertBreaks(data.title, 60).split(" *lb").length;
  let combinedDataArray = combinedData?.split(" *lb");
  let combinedDataLength = combinedDataArray.length + titleLength;
  useEffect(() => {
    setLastPage((combinedDataLength - 20) % 29);
  }, [lastPage]);
  useEffect(() => {
    setPageLength(Math.ceil((combinedDataLength - 20) / 29) + 2);
  }, [pageLength]);
  useEffect(() => {
    // combinedDataArray(combinedDataArray);
  }, [combinedData]);

  // useEffect(() => {
  //   if (data.deliverables) {
  //     let splited = combinedDataArray;
  //     for (let i = 0; i < splited.length; i++) {
  //       if (i === 19) {
  //         if (splited[19].includes(`<b id="b">`)) {
  //           splited.splice(i, 0, " *lb ");
  //           // splited.splice(i+1, 0, " *lb </br> *lb </br> *lb </br>");
  //           combinedDataArray(splited);
  //         }
  //       } else if ((i - 19) % 29 === 0) {
  //         if (splited[i].includes(`<b id="b">`)) {
  //           splited.splice(i, 0, " *lb ");
  //           // splited.splice(i+1, 0, " *lb </br> *lb </br> *lb </br>");
  //           combinedDataArray(splited);
  //           console.log(splited[i]);
  //           console.log(splited[i + 1]);
  //         }
  //       }
  //     }
  //   }
  // }, [data.deliverables]);

  return (
    <div className="mx-auto w-fit h-fit bg-red-10 flex flex-col justify-center items-center relative  showOnPrintOnl overflow-hidden shadow-2xl leading-[23px] text-justify zooming">
      <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
        <div className="w-[100%] h-full absolute top-[0%] z-[50] flex justify-center items-center">
          <div className="w-[80%] h-[90%] absolute top-[140px] flex flex-col justify-start items-start">
            <div className="w-[100%] h-fit bg-purple-30 flex flex-col justify-between items-start pb-2">
              <div className="w-full flex justify-end items-end">
                <span className="text-[15px] font-[500] text-slate-600 mb-4">
                  Page <b>1</b> of{" "}
                  <b>
                    {lastPage <= nextPage && lastPage !== 0
                      ? pageLength - 1
                      : pageLength}
                  </b>
                </span>
              </div>
              <div className="py-3 flex flex-col justify-between items-start"></div>

              <div className="w-full flex justify-center items-start">
                <h1 className="text-[21px] font-[700] underline ">
                  PROJECT OUTSOURCE CONTRACT
                </h1>
              </div>
            </div>
            <div className="w-[100%] h-fit flex flex-col justify-between items-start">
              <div className="w-full flex justify-between items-start">
                <h1 className="w-[18%] text-[18px] font-[700] pt-5">
                  Project Title:
                </h1>

                <h1 className="w-[82%] text-[18px] font-[700] pt-5 bg-yellow-80 text-justify bg-green-60">
                  {insertBreaks(data.title, 60)
                    .split(" *lb")
                    .map((item) => (
                      <>
                        <span className="p-0 m-0 w-[100%] text-justify  bg-red-20 ">
                          {/* {item.split(" ").map((item2: any) => (
                            <div className="bg-purple-600">{item2}</div>
                          ))} */}
                          {formatUperFirst(item)}
                        </span>
                        <br />
                      </>
                    ))}
                  {/* {data.title} */}
                </h1>
              </div>
              <h3 className="pt-5 w-full">
                <p
                  className="w-full bg-red-20 text-justify flex justify-between items-center p-0"
                  style={{ textAlign: "justify" }}
                >
                  <span>This</span>
                  <span>Agreement</span>
                  <span>is</span>
                  <span>made</span>
                  <span>and</span>
                  <span>entered</span>
                  <span>into</span>
                  <span>as</span>
                  <span>of</span>
                  <span>{formatDate(data.currentDate)},</span>
                  <span>by</span>
                  <span>and</span>
                  <span>between</span>
                </p>
                <div>
                  <b>Devonicx</b>, with its principal place of business
                  at 53, Hamza Heights, Quaid Block Commercial Bahria Town,
                  Lahore, Pakistan, hereinafter referred to as "Client," and{" "}
                  <b> {formatUperFirst(data.name)}</b>, having CNIC{" "}
                  {data.softwareHouse === "_"
                    ? data.refCnic
                    : data.softwareHouse}{" "}
                  with contact email {data.email} and phone number {data.phone}{" "}
                  residing at {formatUperFirst(data.address)}, hereinafter
                  referred to as "Service Provider."
                </div>
              </h3>
            </div>
            <div className="w-[100%] h-fit py-1">
              <div className="w-full">
                <div className="text-[16px] font-[400] leading-[23px] h-full w-full">
                  {combinedDataArray.map((item, index) => (
                    <>
                      {index === 20 - titleLength ? (
                        <>
                          {item.includes(`<b id="b">`) ? (
                            <>
                              <div className="h-[380px] flex bg-red-20 items-end justify-end bg-red-20">
                                <span className="text-[15px] font-[500] text-slate-600 mb-4">
                                  Page <b>2</b> of{" "}
                                  <b>
                                    {lastPage <= nextPage && lastPage !== 0
                                      ? pageLength - 1
                                      : pageLength}
                                  </b>
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="h-[380px] flex bg-red-20 items-end justify-end bg-red-20">
                                <span className="text-[15px] font-[500] text-slate-600 mb-4">
                                  Page <b>2</b> of{" "}
                                  <b>
                                    {lastPage <= nextPage && lastPage !== 0
                                      ? pageLength - 1
                                      : pageLength}
                                  </b>
                                </span>
                              </div>
                            </>
                          )}
                        </>
                      ) : (index - (20 - titleLength)) % 29 === 0 ? (
                        <>
                          {item.includes(`<b id="b">`) ? (
                            <div className="h-[390px] flex bg-red-40 items-end justify-end">
                              <span className="text-[15px] font-[500] text-slate-600 mb-4">
                                Page <b>{Math.ceil(index / 29) + 1}</b> of{" "}
                                <b>
                                  {lastPage <= nextPage && lastPage !== 0
                                    ? pageLength - 1
                                    : pageLength}
                                </b>
                              </span>
                            </div>
                          ) : (
                            <div className="h-[390px] flex bg-red-40 items-end justify-end">
                              <span className="text-[15px] font-[500] text-slate-600 mb-4">
                                Page <b>{Math.ceil(index / 29) + 1}</b> of{" "}
                                <b>
                                  {lastPage <= nextPage && lastPage !== 0
                                    ? pageLength - 1
                                    : pageLength}
                                </b>
                              </span>
                            </div>
                          )}
                        </>
                      ) : null}
                      {item.includes(`<b id="b">`) ? (
                        <>
                          {index === 20 || (index - 20) % 30 === 0 ? (
                            <>
                              <div
                                className={`text-[16px] font-[400] leading-[23px] h-fit w-full m-0 p-0 flex items-center bg-orange-60`}
                                dangerouslySetInnerHTML={{
                                  __html: item.replace("*lb", ` `),
                                }}
                              ></div>
                              {/* rerf */}
                            </>
                          ) : (
                            <>
                              <div
                                className={`text-[16px] font-[400] leading-[23px] h-fit w-full m-0 p-0 flex items-center bg-orange-60`}
                                dangerouslySetInnerHTML={{
                                  __html: item.replace("*lb", ` `),
                                }}
                              ></div>
                              {/* rerf */}
                            </>
                          )}
                        </>
                      ) : item.includes(`>>`) ? (
                        <div
                          className={`text-[16px] font-[400] leading-[23px] h-fit w-[95%] relative left-[5%] p-0 flex items-center  flex-end bg-yellow-30 ${
                            item.length > 80
                              ? "justify-between"
                              : "justify-start gap-2"
                          }`}
                        >
                          {item?.split(" ").map((item2, index) =>
                            index === 0 && !item2.includes("<") ? (
                              item2.replace("*lb", " ")
                            ) : (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item2.replaceAll(">>", ""),
                                }}
                              ></div>
                            )
                          )}
                        </div>
                      ) : (
                        <div
                          className={`text-[16px] font-[400] leading-[23px] h-fit w-full m-0 p-0 flex items-center bg-pink-60 relative ${
                            item.length > 80
                              ? "justify-between"
                              : "justify-start gap-2"
                          }`}
                        >
                          {item?.split(" ").map((item2, index) =>
                            index === 0 && !item2.includes("<") ? (
                              item2.replace("*lb", " ")
                            ) : (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item2.replace("*lb", " "),
                                }}
                              ></div>
                            )
                          )}
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
            {lastPage <= nextPage && lastPage !== 0 ? (
              <div className="w-[100%] h-[90%] flex flex-col justify-start items-start">
                <div>
                  <div className="flex flex-col pt-6">
                    {data.writtenByText
                      ?.split("\n")
                      .map((item: any, index: any) => (
                        <>
                          <b className="w-full">{item}</b>
                          <p className="py-1"></p>
                        </>
                      ))}
                    <p>
                      I have read and fully understand the terms and conditions
                      outlined in this agreement, and I hereby agree to abide by
                      them. By signing below, I acknowledge my acceptance of
                      these terms.
                    </p>
                    {!data.forIndividual ? (
                      <>
                        <div className="flex justify-between items-end pt-5">
                          <div className="flex flex-col justify-between items-start">
                            <b className="py-1">
                              {formatUperFirst(data.refName)}
                            </b>
                            {data.refDesignation ? (
                              <b className="py-1">
                                {formatUperFirst(data.refDesignation)}
                              </b>
                            ) : null}
                            <b className="py-1">
                              {formatUperFirst(data.refPhone)}
                            </b>
                          </div>
                          <div className="flex flex-col justify-between items-start">
                            <b className="py-1">
                              {formatUperFirst(data.ceoName)}
                            </b>
                            <span className="flex items-center gap-2">
                              <span className=" flex flex-col">
                                CEO Signature:
                              </span>{" "}
                              <span className=" flex flex-col">
                                ________________________{" "}
                              </span>{" "}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {Array.from({ length: pageLength - 2 }, (_, index) => (
        <div className="w-[215.9mm] h-[279.4mm] bg-image relative"></div>
      ))}
      {lastPage > nextPage || lastPage === 0 ? (
        <div className="w-[215.9mm] h-[279.4mm] bg-image relative">
          <div className="w-[100%] h-full absolute top-[0%] z-[0] flex justify-center items-center">
            <div className="w-[80%] h-[90%] absolute top-[140px] flex flex-col justify-start items-start">
              <div className="flex justify-end items-end w-full">
                <span className="text-[15px] font-[500] text-slate-600 mb-4">
                  Page{" "}
                  <b>
                    {lastPage <= nextPage && lastPage !== 0
                      ? pageLength - 1
                      : pageLength}
                  </b>{" "}
                  of{" "}
                  <b>
                    {lastPage <= nextPage && lastPage !== 0
                      ? pageLength - 1
                      : pageLength}
                  </b>
                </span>
              </div>
              <div>
                <div className="flex flex-col pt-0">
                  {data.writtenByText
                    ?.split("\n")
                    .map((item: any, index: any) => (
                      <>
                        <b className="w-full">{item}</b>
                        <p className="py-1"></p>
                      </>
                    ))}
                  <p>
                    I have read and fully understand the terms and conditions
                    outlined in this agreement, and I hereby agree to abide by
                    them. By signing below, I acknowledge my acceptance of these
                    terms.
                  </p>
                  {!data.forIndividual ? (
                    <>
                      <div className="flex justify-between items-end pt-5">
                        <div className="flex flex-col justify-between items-start">
                          <b className="py-1">
                            {formatUperFirst(data.refName)}
                          </b>
                          {data.refDesignation ? (
                            <b className="py-1">
                              {formatUperFirst(data.refDesignation)}
                            </b>
                          ) : null}
                          <b className="py-1">{data.refPhone}</b>
                        </div>
                        <div className="flex flex-col justify-between items-start">
                          <b className="py-1">
                            {formatUperFirst(data.ceoName)}
                          </b>
                          <span className="flex items-center gap-2">
                            <span className=" flex flex-col">
                              CEO Signature:
                            </span>{" "}
                            <span className=" flex flex-col">
                              ________________________{" "}
                            </span>{" "}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ContractPrint;
