"use client";

import { formatUperFirst } from "@/app/functions/formats";
import { RootState } from "@/app/store";
import { setEmailShowR } from "@/app/store/OfferLetterIntern";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const OfferLetterInternEmail: React.FC = () => {
  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => state.OfferLetterIntern);
  
  let letterText: string = `Dear ${formatUperFirst(data.name)}, \n
I hope you're doing well.\n
I am grateful for your interest in the ${formatUperFirst(
    data.hiring
  )} Intern position at Devonicx. I am delighted to inform you that you have been selected for the position. Your knowledge and skills align perfectly with our company's requirements and culture.\n
I've attached the internship offer letter for you; please reply by ${
    data.responseDate
  } with your acceptance or rejection. So that you know, we'd like your response before the given time since the offer letter will be considered void after the timeframe. If you plan to accept the Internship offer letter, we would appreciate you bringing copies of the mandatory documents with you on the first day of joining. These include:\n
· 1 Passport Size Picture 
· CNIC 
· Guardian CNIC
· Last Degree Certification Copy 
· Last Experience Letter (if any)\n
You are requested to bring your laptop with you as well. If you don't have it, please let me know before to manage it on your first day.
If you have any questions or concerns, please do not hesitate to contact us. I am excited to hear back from you.\n
Best regards,`;

  const handleCopyClick = async (text: string) => {
    try {
      await navigator.clipboard
        .writeText(`Internship Offer Letter - Devonicx\n
${text}`);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="w-[100%] h-full flex justify-center items-start bg-[rgba(0,0,0,0.5)] absolute top-[0px]  text-[12px] md:text-[14px] xl:text-[17px]  leading-[normal]">
      <div className="w-[95%] md:w-[870px] h-fit bg-white  rounded-2xl flex flex-col justify-between email-position">
        <h2 className="w-[100%] h-[50px]  px-3 md:px-8 xl:px-16 border-b-[1px] border-color  text-[14px] md:text-[20px] xl:text-[26px]  font-[700] flex items-center justify-start">
          Internship Offer Letter - Devonicx
        </h2>
        <div className="flex flex-col justify-start items-start">
          <p
            className=" px-3 md:px-8 xl:px-16 py-2"
            dangerouslySetInnerHTML={{
              __html: letterText.replaceAll("\n", "<br/>"),
            }}
          ></p>
        </div>
        <div className="w-full h-fit flex justify-end items-start  px-3 md:px-8 xl:px-16 py-5 gap-[25px]">
          <button
            className="text-center px-[20px] py-[7px]  text-[12px] md:text-[14px] xl:text-[18px]  font-[600] bg-[#27416b] text-white rounded-[10px]"
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

export default OfferLetterInternEmail;
