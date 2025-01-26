"use client";

import { formatUperFirst } from "@/app/functions/formats";
import { RootState } from "@/app/store";
import { setEmailShowR } from "@/app/store/OfferLetterProbation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const OfferLetterProbationEmail: React.FC = () => {
  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => state.OfferLetterProbation);

  let letterText: string = `Dear ${formatUperFirst(data.name)}, \n
I hope you're doing well.\n
Thank you for applying for the ${formatUperFirst(
    data.designation
  )} position at Soft Enterprise. I am happy to inform you that we have selected you for the position. Your knowledge, skills, and experience align perfectly with our company's requirements and culture.\n
Please find the job offer letter attached, and kindly respond by ${
    data.responseDate
  } with your acceptance or rejection. Please remember that we ask for your response before the given time, as the offer letter will be considered void after the timeframe. If you plan to accept the job offer letter, kindly bring the following mandatory documents copies with you on the first day of joining:\n
· 1 Passport Size Picture 
· CNIC 
· Guardian CNIC
· Last Degree Certification Copy 
· Last Experience Letter (if any)\n
Our current office timings are 9:00 AM to 6:00 PM. If you have any questions or concerns, please don't hesitate to contact us.\n
Thank you again for your interest in Soft Enterprise, and we are excited to hear back from you.\n
Best regards,`;

  const handleCopyClick = async (text: string) => {
    try {
      await navigator.clipboard.writeText(`Job Offer Letter - Soft Enterprise\n
${text}`);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div
      className="w-[100%] flex justify-center items-start bg-[rgba(0,0,0,0.5)] absolute top-[0px]  text-[12px] md:text-[14px] xl:text-[17px]  leading-[normal]"
      style={{ height: "calc(100% + 100px)" }}
    >
      <div className=" w-[870px] h-[500px h-fit bg-white  rounded-2xl flex flex-col justify-between email-position">
        <h2 className="w-[100%] h-[50px] px-16 border-b-[1px] border-color text-[14px] md:text-[20px] xl:text-[26px] font-[700] flex items-center justify-start">
          Offer Letter Probation - Soft Enterprise
        </h2>
        <div className="flex flex-col justify-start items-start">
          <p
            className="px-3 md:px-8 xl:px-16 py-2"
            dangerouslySetInnerHTML={{
              __html: letterText.replaceAll("\n", "<br/>"),
            }}
          ></p>
        </div>
        <div className="w-full h-fit flex justify-end items-start px-16 py-5 gap-[25px]">
          <button
            className="text-center px-[20px] py-[7px]  text-[12px] md:text-[14px] xl:text-[18px]  font-[600] bg-[rgb(0,162,255)] text-white rounded-[10px]"
            onClick={() => {
              dispatch(setEmailShowR(false));
              handleCopyClick(letterText);
            }}
          >
            Copy & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferLetterProbationEmail;
