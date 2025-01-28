"use client";
import axios from "axios";
import { useState } from "react";
import { changePasswordValidation } from "@/app/registration/formValidation";
import { useDispatch } from "react-redux";
import { setLoginToggleR } from "../store/Global";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword: React.FC = () => {
  const [OldPassword, setOldPassword] = useState<any>("");
  const [newPassword, setNewPassword] = useState<any>("");
  const [adminPassword, setAdminPassword] = useState<any>("");
  const [oldPasswordError, setOldPasswordError] = useState<any>("");
  const [newPasswordError, setNewPasswordError] = useState<any>("");
  const [adminPasswordError, setAdminPasswordError] = useState<any>("");
  const [changePasswordError, setChangePasswordError] = useState<any>(false);
  const [changePasswordMsg, setChangePasswordMsg] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginSubmit = async () => {
    const formData = {
      OldPassword,
      newPassword,
      adminPassword,
    };
    try {
      setLoading(true);
      await changePasswordValidation.validate(formData, { abortEarly: false });
      let result = await axios.post(`/api/chagnePassword`, formData);
      result.data.msg
        ? (setChangePasswordMsg(result.data.msg), setChangePasswordError(""))
        : (setChangePasswordError(result.data.error),
          setChangePasswordMsg(""),
          setOldPasswordError(""),
          setNewPasswordError(""),
          adminPasswordError(""));
    } catch (error: any) {
      error.inner
        ? error.inner[0].path === "OldPassword"
          ? (setOldPasswordError(
              error.inner[0].message.replace("OldPassword", "Old Password")
            ),
            setNewPasswordError(""),
            setAdminPasswordError(""),
            setChangePasswordMsg(""))
          : error.inner[0].path === "newPassword"
          ? (setNewPasswordError(
              error.inner[0].message.replace("newPassword", "New Password")
            ),
            setOldPasswordError(""),
            setAdminPasswordError(""),
            setChangePasswordMsg(""))
          : (setAdminPasswordError(
              error.inner[0].message.replace("adminPassword", "Admin Password")
            ),
            setOldPasswordError(""),
            setNewPasswordError(""),
            setChangePasswordMsg(""))
        : (setOldPasswordError(""),
          setNewPasswordError(""),
          setAdminPasswordError(""),
          setChangePasswordMsg(""));
    } finally {
      setLoading(false);
    }
  };

  function clickOnEnterPress(e: any) {
    e.key === "Enter" ? loginSubmit() : null;
  }
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center s-8 e-12 text-xl font-sans w-[100%] sm:w-[50%] border-gray-500 h-fit gap-0 2xl:gap-7">
      <h1
        className="
        text-main-blue text-[26px] sm:text-[32px] pb-3 font-bold hover:text-"
      >
        Change Password
      </h1>

      <div className="flex flex-col justify-center">
        <input
          className="ps-10 pe-12 py-1 sm:py-3 w-fit lg:w-[400px] bg-[rgb(244,248,245)]"
          placeholder="Old Password"
          type="text"
          onChange={(e) => setOldPassword(e.target.value)}
          onKeyUp={clickOnEnterPress}
        />
        <p className="text-lg text-red-500 p-2 px-3">{oldPasswordError}</p>
        <input
          className="ps-10 pe-12  py-1 sm:py-3  bg-[rgb(244,248,245)]"
          placeholder="New Password"
          type="text"
          onChange={(e) => setNewPassword(e.target.value)}
          onKeyUp={clickOnEnterPress}
        />
        <p className="text-lg text-red-500 p-2 px-3">{newPasswordError}</p>
        <div className="w-full bg-red-300 flex relative">
          <input
            className="w-full ps-10 pe-12  py-1 sm:py-3  bg-[rgb(244,248,245)]"
            placeholder="Admin Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            onChange={(e) => setAdminPassword(e.target.value)}
            onKeyUp={clickOnEnterPress}
          />
          <div
            className="absolute float-end top-[25%] right-4 hover:cursor-pointer text-2xl"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEye className="text-gray-500" />
            ) : (
              <FaEyeSlash className="text-gray-500" />
            )}
          </div>
        </div>
        <button
          className="w-full text-end pt-1 px- text-[11px] sm:text-[13px] hover:underline"
          onClick={() => dispatch(setLoginToggleR(true))}
        >
         Back To Login Page
        </button>
        <p className="text-lg text-red-500 py-1 px-3">{adminPasswordError}</p>
        <p
          className={`text-lg ${
            changePasswordMsg ? "text-blue-500" : "text-red-500"
          } py-1 px-3`}
        >
          {changePasswordMsg ? changePasswordMsg : changePasswordError}
        </p>
  
      </div>
      <button
        className={`${
          loading ? "bg-gray-600" : "bg-main-blue"
        }   text-white hover: text-[14px] font-[400] mt-0  py-1 sm:py-3  px-10 mx-5 border-[1px] rounded-xl text-center w-[200px] hover:opacity-[0.7]`}
        onClick={loginSubmit}
      >
        SUBMIT
      </button>
    </div>
  );
};

export default ChangePassword;
