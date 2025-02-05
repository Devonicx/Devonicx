"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, updateField } from "@/app/store/Card";
import { RootState } from "@/app/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import { setAdminR, setFormsR, setUserNameR } from "@/app/store/Global";
import { FaAsterisk } from "react-icons/fa";
import BusinessRecords from "@/app/components/businessRecords";

const Card: React.FC = () => {
  let dispatch = useDispatch();
  let [isVerified, setIsVerified] = useState<any>(undefined);
  let [loading, setLoading] = useState<any>(true);
  let [showForm, setShowForm] = useState<any>(false);
  let [saveLoading, setSaveLoading] = useState<any>(false);
  let router = useRouter();
  let global = useSelector((state: RootState) => state.Global);
  let Card = useSelector((state: RootState) => state.Card);
  let [id, setId] = useState<number>();

  useEffect(() => {
    async function verifyTokenApi() {
      try {
        setLoading(true);
        await axios.get("/api/verifyToken");
        let { data } = await axios.get("/api/userDataName");
        dispatch(setFormsR(data.forms));
        dispatch(setUserNameR(data.username));
        dispatch(setAdminR(data.admin));
        if (!data.forms.includes("Business-Details")) {
          router.push("/");
        } else {
          setIsVerified(true);
        }
      } catch (err) {
        router.push("/");
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    }
    verifyTokenApi();
  }, []);

  const formData = useSelector((state: RootState) => state.Card);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(formData);
    dispatch(
      updateField({
        field: e.target.name as keyof RootState["Card"],
        value: e.target.value,
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      setSaveLoading(true);
      await axios.post("/api/saveBusinessDetails", {
        type: "Card",
        formData,
        createdBy: global.username,
      });
      dispatch(resetForm());
      alert("Card Saved Successfully")
    } catch (err) {
      console.log(err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      setSaveLoading(true);
      await axios.post("/api/updateBusinessDetails", {
        id,
        formData,
      });
      dispatch(resetForm());
      setShowForm(false);
      alert("Card Updated Successfully")
    } catch (err) {
      console.log(err);
    } finally {
      setSaveLoading(false);
    }
  };
  console.log(showForm);

  return (
    <>
      {loading || isVerified === undefined || isVerified === false ? (
        <div className="w-fit m-auto py-24">
          <Loader />
        </div>
      ) : global.admin && !showForm ? (
        <BusinessRecords
          letterType={"Card"}
          setShowForm={setShowForm}
          showForm={showForm}
          setId={setId}
        />
      ) : (
        <form
          onSubmit={showForm ? handleUpdateSubmit : handleSubmit}
          className="w-full h-fit flex flex-col justify-between items-start gap-[40px] py-[50px] hideOnPrint relative"
        >
          <div
            className={`flex flex-col bg-[rgb(250,250,250)] justify-between items-start w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden `}
          >
            <h2 className="w-full h-[70px] border-b-[1px] border-color  text-[16px] md:text-[20px] xl:text-[25px] font-[600] px-3 md:px-10 xl:px-20 flex items-center justify-start text-main-blue">
              Card Details
            </h2>
            <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20 bg-blue-40">
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px] capitalize">
                  <FaAsterisk className={` text-[8px] mt-[4px] w-fit `} />
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="companyName"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] lg:text-[18px]`}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px] capitalize">
                  <FaAsterisk className={` text-[8px] mt-[4px] w-fit `} />
                  agent Name
                </label>
                <input
                  type="text"
                  name="agentName"
                  required
                  value={formData.agentName}
                  onChange={handleChange}
                  placeholder="agentName"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] lg:text-[18px]`}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px] capitalize">
                  <FaAsterisk className={` text-[8px] mt-[4px] w-fit `} />
                  name On Card
                </label>
                <input
                  type="text"
                  name="nameOnCard"
                  required
                  value={formData.nameOnCard}
                  onChange={handleChange}
                  placeholder="nameOnCard"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] lg:text-[18px]`}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px] capitalize">
                  <FaAsterisk className={` text-[8px] mt-[4px] w-fit `} />
                  card Number
                </label>
                <input
                  type="number"
                  name="cardNumber"
                  required
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="cardNumber"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] lg:text-[18px]`}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px] capitalize">
                  <FaAsterisk className={` text-[8px] mt-[4px] w-fit `} />
                  expiration Date
                </label>
                <input
                  type="month"
                  name="expirationDate"
                  required
                  value={formData.expirationDate}
                  onChange={handleChange}
                  placeholder="expirationDate"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] lg:text-[18px]`}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px] capitalize">
                  <FaAsterisk className={` text-[8px] mt-[4px] w-fit `} />
                  cvv{" "}
                </label>
                <input
                  type="number"
                  name="cvv"
                  required
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="Cvv"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] lg:text-[18px]`}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px] capitalize">
                  <FaAsterisk className={` text-[8px] mt-[4px] w-fit `} />
                  billing Address
                </label>
                <input
                  type="text"
                  name="billingAddress"
                  required
                  value={formData.billingAddress}
                  onChange={handleChange}
                  placeholder="Billing Address"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] lg:text-[18px]`}
                />
              </div>
            </div>
            <div className="w-full h-fit md:h-[100px] flex justify-end items-start px-3 md:px-10 xl:px-20 pb-7 md:pb-10 gap-[25px]">
              <button
                className={`text-center px-[20px] py-[7px] text-[12px] md:text-[14px] xl:text-[18px]  font-[600] bg-[#27416b] text-white rounded-[10px] hover:opacity-[0.8]`}
                onClick={() => {
                  setShowForm(false);
                }}
              >
                Back{" "}
              </button>
              <button
                className={`text-center px-[20px] py-[7px] text-[12px] md:text-[14px] xl:text-[18px]  font-[600] text-white rounded-[10px] hover:opacity-[0.8]  ${
                  saveLoading ? "bg-gray-600" : "bg-[#27416b]"
                }`}
                type="submit"
              >
                {saveLoading
                  ? !showForm
                    ? "Saving Card..."
                    : "Updating Card..."
                  : !showForm
                  ? "Save Card"
                  : "Update Card"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Card;
