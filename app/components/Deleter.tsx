import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { setRecentReloaderR } from "../store/Global";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
interface propType {
  id: number;
}

const Deleter: React.FC<propType> = ({ id }) => {
  let [deleteLoading, setDeleteLoading] = useState<any>(null);
  let [deleteDialog, setDeleteDialog] = useState<any>(false);
  let dispatch = useDispatch();
  let global = useSelector((state: RootState) => state.Global);

  async function deleteRecord(id: number) {
    try {
      setDeleteLoading(id);
      await axios.delete(`/api/deleteRecord/${id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(null);
      dispatch(setRecentReloaderR(global.recentReloader + 1));
    }
  }

  return (
    <>
      {deleteLoading !== id ? (
        <button
          onClick={() => {
            setDeleteDialog(true);
          }}
          className="text-red-400 leading-3 underline hover:no-underline border-e-2 border-color h-full w-full px-5 "
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
          <div className="w-[90%] sm:w-[500px] h-fit py-10 sm:h-[300px] flex flex-col justify-center gap-10 items-center bg-[rgb(250,250,250)] rounded-[15px]">
            <h3 className="text-[14px] sm:text-[16px] font-[600]">
              Are you sure you want to delete this record ?
            </h3>
            <div className="w-full flex justify-center gap-3 items-center">
              <button
                className={`bg-white hover:bg-main-blue hover:opacity-[0.7]
  text-main-blue hover:text-whit text-[12px] sm:text-[14px] font-[400] mt-0 py-3 px-10 border-2 border-[rgb(1,161,255)] rounded-xl text-center w-[40%] sm:w-[200px]`}
                onClick={() => {
                  setDeleteDialog(false);
                }}
              >
                Cancel
              </button>
              <button
                className={` bg-main-blue hover:opacity-[0.7]
  text-white hover: text-[12px] sm:text-[14px] font-[400] mt-0 py-3 px-10 border-[1px] rounded-xl text-center w-[40%] sm:w-[200px]`}
                onClick={() => {
                  deleteRecord(id);
                  setDeleteDialog(false);
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

export default Deleter;
