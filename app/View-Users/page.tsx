"use client";
import { useEffect, useState } from "react";
import { FaAsterisk } from "react-icons/fa";
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
      if (key === "formsArray" && obj[key].length === 0) {
        hasEmpty = true;
        alert("Select at least one form");
        break;
      } else if (typeof obj[key] === "string" && obj[key]?.trim() === "") {
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
        "Offer-Letter-Intern",
        "Internship-Extension-Letter",
        "Probation-Extension-Letter",
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

  return (
    <>
      {loading || isVerified === undefined || isVerified === false ? (
        <div className="w-fit m-auto py-24">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-fit flex flex-col justify-between items-start gap-[40px] py-[50px] hideOnPrint relative">
          <RecentRecordUsers />
        </div>
      )}
    </>
  );
}
