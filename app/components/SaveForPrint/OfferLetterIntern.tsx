"use client";

import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  formatDate,
  formatNumberToWord,
  formatUperFirst,
  formatUpperCase,
} from "@/app/functions/formats";
import { useEffect } from "react";

const OfferLetterInternPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.OfferLetterIntern);
  useEffect(() => {
    const title = `Internship Offer Letter - ${data.name}`;
    document.title = title;
  }, [data.name]);

  return (
    <div className="mx-auto w-fit h-fit flex justify-center items-center relative overflow-hidden showOnPrintOnl shadow-2xl leading-[23px] text-justify zooming">
      <div className="w-[215.9mm] h-[279.4mm] bg-image">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center">
          <div className="w-[80%] h-[90%] absolute top-[160px] flex flex-col justify-start items-start">
            <div className="w-[100%] h-fit flex flex-col justify-between items-start pb-2">
              <div className="w-full flex justify-end items-start">
                <span className="text-[15px] font-[500] text-slate-600">
                  Page <b>1</b> of <b>1</b>
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
                <h1 className="text-[19px] font-[700] underline ">
                  INTERNSHIP OFFER LETTER
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
                  Based on your representations, assurances and qualifications,
                  we have the pleasure in informing that your internship is
                  being confirmed as a{" "}
                  <b> "{formatUperFirst(data.hiring)} Intern" </b>
                  for a duration of
                  <b> {formatNumberToWord(data.duration)} months </b>
                  with effect from <b> {formatDate(data.startingDate)} </b>
                  to
                  <b> {formatDate(data.endingDate)} </b>
                  <p className="py-1"></p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        data.stipendText === "default"
                          ? data.stipend === "Totally unpaid"
                            ? "We offer you an <b>unpaid internship</b> for the duration mentioned above."
                            : data.stipend === "first month unpaid"
                            ? "We offer you an unpaid internship for the first month which can be increased up to <b>Rs: =15,000/- (Fifteen Thousand Rupees)</b> in total for the remaining months as per your performance. You will get a stipend increment letter once your stipend will be increased."
                            : data.stipend === "paid internship fix"
                            ? "We offer you a paid internship and your monthly stipend will be <b>Rs: =10,000 (Ten Thousand Rupees)</b> for the duration mentioned above."
                            : "We offer you a paid internship and your first-month stipend will be <b>Rs: =10,000/- (Ten Thousand Rupees)</b> and can be increased up to Rs: =15,000/- (Fifteen Thousand Rupees) in total for the remaining months as per your performance. You will get a stipend increment letter once your stipend is increased."
                          : data.stipendText,
                    }}
                  ></div>
                  <p className="py-1"></p>
                  This internship will lead to permanent employment that will be
                  solely depends upon your performance and learning within the
                  internship duration.
                  <p className="py-1"></p>
                  In case of excessive leaves without approval, Devonicx
                  has right to <b>freeze</b> your internship certificate until
                  you complete the days of your internship.
                  <p className="py-1"></p>
                  During your temporary employment with Devonicx, you may
                  have access to trade secrets and confidential or proprietary
                  business information belonging to the company. You must
                  acknowledge to sign a separate
                  <b> Non-Disclosure Agreement (NDA) </b>
                  along with
                  <b> Code of Conduct (Employee Handbook) </b> on the day of
                  your joining as well.
                  <p className="py-1"></p>
                  <p className="py-1"></p>I look forward to having you join our
                  team.
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

export default OfferLetterInternPrint;
