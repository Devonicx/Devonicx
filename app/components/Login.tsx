"use client";
import axios from "axios";
import { useState } from "react";
import { formValidation } from "@/app/registration/formValidation";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  setForgetToggleR,
  setLoginToggleR,
  setParentAdminR,
} from "../store/Global";
import ChangePassword from "@/app/components/ChangePassword";

interface AllowanceInputProps {
  tokenVerifierTrigger: any;
  setTokenVerifierTrigger: any;
  setUserId: any;
}

const Login: React.FC<AllowanceInputProps> = ({
  tokenVerifierTrigger,
  setTokenVerifierTrigger,
  setUserId,
}) => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginSubmit = async () => {
    const formData = {
      username,
      password,
    };
    try {
      setLoading(true);
      await formValidation.validate(formData, { abortEarly: false });
      let result = await axios.post(`/api/login`, {
        username,
        password,
      });
      result.data.msg
        ? (setTokenVerifierTrigger(tokenVerifierTrigger + 1),
          setUserId(result.data.userId))
        : setLoginError(result.data.error);
      setPasswordError(""), setUsernameError("");
      dispatch(setParentAdminR(username === "parentadmin" ? true : false));
    } catch (error: any) {
      error.inner
        ? error.inner[0].path === "username"
          ? (setUsernameError(error.inner[0].message), setPasswordError(""))
          : (setPasswordError(error.inner[0].message), setUsernameError(""))
        : (setPasswordError(""), setUsernameError(""));
    } finally {
      setLoading(false);
    }
  };

  function clickOnEnterPress(e: any) {
    e.key === "Enter" ? loginSubmit() : null;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-yellow-40 text-xl font-sans w-[100%] sm:w-[50%] border-gray-500 h-fit gap-0 2xl:gap-7">
      <h1 className="text-main-blue text-[26px] sm:text-[32px] pb-1 font-[700]">
        Login
      </h1>
      <div className="flex flex-col justify-center bg-green-00">
        <span className="text-[12px] md:text-[14px] font-[500] pb-1 text-center">
          Enter your username and password to log in.
        </span>
        <div className="w-fit h-fit relative flex justify-center items-center bg-blue-500">
          <FaUser className="absolute left-[10px] text-gray-500" />
          <input
            className="ps-10 pe-12 py-1 sm:py-3 bg-[rgb(244,248,245)] w-fit lg:w-[400px]"
            placeholder="Username"
            type="text"
            onChange={(e) => setName(e.target.value.toLowerCase())}
            onKeyUp={clickOnEnterPress}
          />
        </div>
        <p className="text-lg text-red-500 p-1 sm:p-2 px-3">
          {usernameError.includes("username")
            ? usernameError.replace("username", "Username")
            : usernameError}
        </p>
        <div className="flex w-full justify-end items-center relative">
          <FaLock className="absolute left-[10px] text-gray-500" />

          <input
            name="showPass"
            placeholder="Password"
            className="ps-10 pe-12 py-1 sm:py-3 w-full bg-[rgb(244,248,245)]"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={clickOnEnterPress}
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
        <div className="w-full flex justify-end items-center bg-red-40 pt-1">
          {/* <button
            className="w-fit text-end px-3 text-[11px] sm:text-[13px] bg-red-60 hover:underline"
            onClick={() => dispatch(setForgetToggleR(true))}
          >
            Change Password
          </button> */}
          <button
            className="w-fit text-end pe-3 text-[11px] sm:text-[13px] bg-red-60 hover:underline"
            onClick={() => dispatch(setLoginToggleR(false))}
          >
            Change Password
          </button>
          <div className="border-l-[2px] border-black size-3"></div>
          <button
            className="w-fit text-end ps-0 pe- text-[11px] sm:text-[13px] bg-red-60 hover:underline"
            onClick={() => dispatch(setForgetToggleR(true))}
          >
            Forgot Password ?
          </button>
        </div>
        <p className="text-red-500 p-1 sm:p-2 px-3 text-lg">
          {passwordError
            ? passwordError.includes("password")
              ? passwordError.replace("password", "Password")
              : passwordError
            : loginError}
        </p>
      </div>
      <button
        className={`${
          loading ? "bg-gray-600" : "bg-main-blue"
        }  text-white text-[12px] sm:text-[14px] font-[400] mt-0 py-1 sm:py-3 px-10 mx-5 border-[1px] rounded-xl text-center w-[200px] hover:opacity-[0.7]`}
        onClick={loginSubmit}
      >
        LOGIN
      </button>
    </div>
  );
};

export default Login;
