"use client";
import { useEffect, useState } from "react";
import { FaAsterisk, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { redBorder } from "../functions/formRequiredFields";
import axios from "axios";
import RecentRecordAll from "../components/RecentRecordAll";
import RecentRecordUsers from "../components/RecentRecordUsers";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdminR,
  setFormsR,
  setRecentReloaderR,
  setUserNameR,
} from "../store/Global";
import { RootState } from "../store/index";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import { formatUperFirst } from "../functions/formats";

export default function CreateUser() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [formsArray, setFormsArray] = useState<any>("");
  let [adminpassword, setAdminPassword] = useState("");

  let [isVerified, setIsVerified] = useState<any>(undefined);
  let [loading, setLoading] = useState<any>(true);

  let [printClicked, setPrintClicked] = useState<boolean>(false);
  let [fieldEmpty, setFieldEmpty] = useState<boolean>(true);
  let [buttonDisable, setButtonDisable] = useState<boolean>(false);
  let dispatch = useDispatch();
  let global = useSelector((state: RootState) => state.Global);
  let router = useRouter();

  useEffect(() => {
    async function verifyTokenApi() {
      try {
        setLoading(true);
        await axios.get("/api/verifyToken");
        let { data } = await axios.get("/api/userDataName");
        dispatch(setFormsR(data.forms));
        dispatch(setUserNameR(data.username));
        dispatch(setAdminR(data.admin));
        if (!data.admin) {
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

  const handleChange = (e: any) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setFormsArray((prev: any) => [...prev, e.target.name]);
    } else {
      setFormsArray((prev: any) =>
        prev.filter((item: any) => item !== e.target.name)
      );
    }
  };

  function hasEmptyField(obj: any) {
    setPrintClicked(true);
    let hasEmpty = false;

    for (const key in obj) {
      // if (key === "formsArray" && obj[key].length === 0) {
      //   hasEmpty = true;
      //   alert("Select at least one form");
      //   break;
      // } else
      console.log(obj);

      if (typeof obj[key] === "string" && obj[key]?.trim() === "") {
        hasEmpty = true;
        alert("Some required fields are empty");
        break;
      } else if (typeof obj[key] === "string" && obj[key]?.trim().length < 6) {
        hasEmpty = true;
        alert(`${formatUperFirst(key)} must be at least 6 characters`);
        break;
      }
    }

    if (hasEmpty) {
      setFieldEmpty(true);
    } else {
      createUser();
      setFieldEmpty(false);
      setButtonDisable(true);
    }
  }

  async function createUser() {
    try {
      let msg = await axios.post("/api/createUser", {
        username,
        password,
        formsArray,
        adminpassword,
      });
      alert(msg.data.result);
      console.log(msg.data.result);
      if (msg.data.result === "User Created") {
        dispatch(setRecentReloaderR(global.recentReloader + 1));
        setUsername("");
        setPassword("");
        setFormsArray("");
        setAdminPassword("");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setButtonDisable(false);
    }
  }
  function selectAll(e: any) {
    let checked = e.target.checked;
    if (checked) {
      setFormsArray([
        "Business-Details",
        "Internship-Extension-Letter",
        "Probation-Extension-Letter",
        "Offer-Letter-Intern",
        "Appointment-Letter",
        "Social-Media-Consent",
        "Stipend-Increment-Letter",
        "Experience-Letter",
        "Offer-Letter-Probation",
        "Non-Disclosure-Agreement",
        "Salary-Increment-Letter",
        "Salary-Slip",
        "Termination-Letter",
        "Contract",
        "Clearance-Letter",
      ]);
    } else {
      setFormsArray("");
    }
  }
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {loading || isVerified === undefined || isVerified === false ? (
        <div className="w-fit m-auto py-24">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-fit flex flex-col justify-between items-start gap-[40px] py-[50px] hideOnPrint relative">
          <div className="flex flex-col bg-[rgb(250,250,250)] justify-between items-start w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden ">
            <h2 className="w-full h-[70px] border-b-[1px] border-color  text-[16px] md:text-[20px] xl:text-[25px] font-[600] flex items-center justify-start text-main-blue px-3 md:px-10 xl:px-20">
              CREATE USER
            </h2>
            <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20 gap-x-[20%]">
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[35%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit text-red-600`}
                  />
                  New User Name:
                </label>
                <input
                  placeholder="Should be 6 characters"
                  type="text"
                  value={username}
                  className={`w-[60%] text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border-2 ${redBorder(
                    username,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  autoComplete="new-password"
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[35%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit text-red-600`}
                  />
                  New User Password:
                </label>
                <input
                  placeholder="Should be 6 characters"
                  type="text"
                  value={password}
                  className={`w-[60%] text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border-2 ${redBorder(
                    password,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  autoComplete="new-password"
                />
              </div>

              <div className="w-[100%] md:w-[100%] min-h-[70px] max-h-fit flex justify-between items-start py-4 2xl:py-4 bg-pink-70">
                <span className="w-[30%] md:w-[18%] bg-green-60 text-[12px] md:text-[14px] xl:text-[18px]   font-[500] bg-blue-40 flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] sm:text-[8px] mt-[4px] w-fit text-red-600`}
                  />
                  Select Privileges:
                </span>
                <div className="w-[60%] md:w-[82%]   h-[70px h-fit flex flex-co flex-wrap justify-between items-center flex-wra gap-x-[2.6% gap-y-2 bg-green-00">
                  <div
                    className={`w-[100% md: w-fit h-[45px] rounded-[10px] px-3 border- border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      onChange={(e) => selectAll(e)}
                      checked={formsArray.length === 14 ? true : false}
                      name="Contract"
                    />
                    <label>Select All</label>
                  </div>

                  <div
                    className={`w-[100%] md:w-[100%] h-[45px] rounded-[10px] px-3 border- border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <label className="font-bold">JOINING DOCUMENTS</label>
                  </div>

                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={
                        formsArray.includes("Offer-Letter-Intern")
                          ? true
                          : false
                      }
                      onChange={(e) => handleChange(e)}
                      name="Offer-Letter-Intern"
                    />
                    <label>Offer-Letter-Intern</label>
                  </div>

                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={
                        formsArray.includes("Business-Details") ? true : false
                      }
                      onChange={(e) => handleChange(e)}
                      name="Business-Details"
                    />
                    <label>Business-Details</label>
                  </div>

                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={
                        formsArray.includes("Offer-Letter-Probation")
                          ? true
                          : false
                      }
                      onChange={(e) => handleChange(e)}
                      name="Offer-Letter-Probation"
                    />
                    <label>Offer-Letter-Probation</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={
                        formsArray.includes("Appointment-Letter") ? true : false
                      }
                      onChange={(e) => handleChange(e)}
                      name="Appointment-Letter"
                    />
                    <label>Appointment-Letter</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={
                        formsArray.includes("Non-Disclosure-Agreement")
                          ? true
                          : false
                      }
                      onChange={(e) => handleChange(e)}
                      name="Non-Disclosure-Agreement"
                    />
                    <label>Non-Disclosure-Agreement</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={
                        formsArray.includes("Social-Media-Consent")
                          ? true
                          : false
                      }
                      onChange={(e) => handleChange(e)}
                      name="Social-Media-Consent"
                    />
                    <label>Social-Media-Consent</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-[100%] h-[45px] rounded-[10px] px-3 border- border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <label className="font-bold">PROMOTIONAL DOCUMENTS</label>
                  </div>

                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={
                        formsArray.includes("Salary-Increment-Letter")
                          ? true
                          : false
                      }
                      onChange={(e) => handleChange(e)}
                      name="Salary-Increment-Letter"
                    />
                    <label>Salary-Increment-Letter</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={
                        formsArray.includes("Stipend-Increment-Letter")
                          ? true
                          : false
                      }
                      onChange={(e) => handleChange(e)}
                      name="Stipend-Increment-Letter"
                    />
                    <label>Stipend-Increment-Letter</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-[100%] h-[45px] rounded-[10px] px-3 border- border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <label className="font-bold">OTHER DOCUMENTS</label>
                  </div>

                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={
                        formsArray.includes("Salary-Slip") ? true : false
                      }
                      onChange={(e) => handleChange(e)}
                      name="Salary-Slip"
                    />
                    <label>Salary-Slip</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={
                        formsArray.includes("Internship-Extension-Letter")
                          ? true
                          : false
                      }
                      onChange={(e) => handleChange(e)}
                      name="Internship-Extension-Letter"
                    />
                    <label>Internship-Extension-Letter</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={
                        formsArray.includes("Probation-Extension-Letter")
                          ? true
                          : false
                      }
                      onChange={(e) => handleChange(e)}
                      name="Probation-Extension-Letter"
                    />
                    <label>Probation-Extension-Letter</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-[100%] h-[45px] rounded-[10px] px-3 border- border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <label className="font-bold">CLEARANCE DOCUMENTS</label>
                  </div>

                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={
                        formsArray.includes("Experience-Letter") ? true : false
                      }
                      onChange={(e) => handleChange(e)}
                      name="Experience-Letter"
                    />
                    <label>Experience-Letter</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={
                        formsArray.includes("Termination-Letter") ? true : false
                      }
                      onChange={(e) => handleChange(e)}
                      name="Termination-Letter"
                    />
                    <label>Termination-Letter</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      onChange={(e) => handleChange(e)}
                      checked={
                        formsArray.includes("Clearance-Letter") ? true : false
                      }
                      name="Clearance-Letter"
                    />
                    <label>Clearance-Letter</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-[100%] h-[45px] rounded-[10px] px-3 border- border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <label className="font-bold">
                      OTHER BUSINESS DOCUMENTS
                    </label>
                  </div>
                  <div
                    className={`w-[100%] md:w-[49%] h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      onChange={(e) => handleChange(e)}
                      checked={formsArray.includes("Contract") ? true : false}
                      name="Contract"
                    />
                    <label>Project Outsource Contract</label>
                  </div>
                </div>
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[40%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit text-red-600`}
                  />
                  Admin Password:
                </label>

                <div
                  className={`flex justify-end items-center bg-white relative w-[60%] text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] overflow-hidden border-2 ${redBorder(
                    adminpassword,
                    fieldEmpty,
                    printClicked
                  )}`}
                >
                  <input
                    placeholder="Password"
                    className="ps-3 pe-12 py-1 sm:py-3 bg-white w-[120%] focus:border-none active:border-none focus:outline-none active:outline-none"
                    type={showPassword ? "text" : "password"}
                    value={adminpassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                    }}
                    autoComplete="new-password"
                  />
                  <div
                    className="absolute float-end mx-5 hover:cursor-pointer text-2xl"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEye className="text-gray-500" />
                    ) : (
                      <FaEyeSlash className="text-gray-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-fit md:h-[100px] flex justify-end items-start px-5 md:px-20 pb-7 md:pb-10 gap-[25px]">
              <button
                className="text-center px-[20px] py-[7px] text-[12px] md:text-[14px] xl:text-[18px]  font-[600] bg-[#27416b] text-white rounded-[10px] hover:opacity-[0.8]"
                onClick={() => {
                  hasEmptyField({
                    username,
                    password,
                    adminpassword,
                  });
                }}
                disabled={buttonDisable}
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
