import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { setRecentReloaderR } from "../store/Global";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { throws } from "assert";
import { FaEye, FaEyeSlash } from "react-icons/fa";
interface propType {
  id: number;
}

const UserDeleter: React.FC<propType> = ({ id }) => {
  let [deleteLoading, setDeleteLoading] = useState<any>(null);
  let [deleteDialog, setDeleteDialog] = useState<any>(false);
  let [adminPassword, setAdminPassword] = useState<any>("");
  let dispatch = useDispatch();
  let global = useSelector((state: RootState) => state.Global);

  async function deleteRecord(id: number) {
    try {
      setDeleteLoading(id);
      if (adminPassword.trim() === "") {
        alert("Enter Admin Password");
      } else {
        let result = await axios.delete(
          `/api/userDeleteRecord/${id}/${adminPassword}`
        );
        if (result.data.result === "User Deleted") {
          setDeleteDialog(false);
        }
        alert(result.data.result);
        console.log(result.data.result);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(null);
      dispatch(setRecentReloaderR(global.recentReloader + 1));
    }
  }
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {deleteLoading !== id ? (
        <button
          onClick={() => {
            setDeleteDialog(true);
          }}
          className="text-red-400 leading-3 underline hover:no-underline  h-full w-full px-5 "
        >
          Delete
        </button>
      ) : (
        <button className="text-gray-500 leading-3 underline">
          Deleting...
        </button>
      )}
      {deleteDialog ? (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-evenly items-center fixed top-[0%] bg-[rgba(0,0,0,0.5)] left-0 z-[200]">
          <div className="w-[90%] sm:w-[500px] h-fit py-10 sm:h-[300px] flex flex-col justify-center gap-10 items-center bg-[rgb(250,250,250)] rounded-[15px] relative">
            <h3 className="text-[14px] sm:text-[16px] font-[600]">
              Enter Admin Password To Proceed
            </h3>
            <div className="w-full relative h-fit">
              <input
                className={`bg-white
                text-[14px] sm:text-[16px] font-[00] mt-0 py-3 ps-5 pe-14 w-[82.3%] mx-auto border-2 border-[rgb(1,161,255)] rounded-xl text-start `}
                onChange={(e) => setAdminPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter Admin Password"
              />
              <div
                className="absolute  float-end mx-5 hover:cursor-pointer text-2xl right-[8%] top-[27%]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEye className="text-gray-500" />
                ) : (
                  <FaEyeSlash className="text-gray-500" />
                )}
              </div>
            </div>
            <div className="w-full flex justify-center gap-3 items-center">
              <button
                className={`bg-white
  text-main-blue hover: text-[12px] sm:text-[14px] font-[400] mt-0 py-3 px-10 border-2 border-[rgb(1,161,255)] rounded-xl text-center  w-[40%] sm:w-[200px]`}
                onClick={() => {
                  setDeleteDialog(false);
                }}
              >
                Cancel
              </button>
              <button
                className={`bg-main-blue
  text-white hover: text-[12px] sm:text-[14px] font-[400] mt-0 py-3 px-10 border-[1px] rounded-xl text-center  w-[40%] sm:w-[200px]`}
                onClick={() => {
                  deleteRecord(id);
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserDeleter;
