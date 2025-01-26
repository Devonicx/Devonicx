"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import MainPage from "./components/MainPage";
import Loader from "./components/Loader";
import Registration from "./components/Registraion";
import { global } from "styled-jsx/css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/index";
import { setAdminR, setFormsR, setUserNameR } from "./store/Global";

const Home: React.FC = () => {
  const [tokenVerifierTrigger, setTokenVerifierTrigger] = useState(0);
  const [userId, setUserId] = useState(null);
  const [isVerified, setIsVerified] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);
  let global = useSelector((state: RootState) => state.Global);
  const dispatch = useDispatch();

  useEffect(() => {
    const storeTokenToDb = async () => {
      async function postToken() {
        try {
          setLoading(true);
          await axios.post(`/api/storeTokenToDb`, { userId });
          let { data } = await axios.get("/api/userDataName");
          dispatch(setFormsR(data.forms));
          dispatch(setUserNameR(data.username));
          dispatch(setAdminR(data.admin));
        } catch (err) {
          console.log("err", err);
          // setLoading(false);
          setLoading(false);
        } finally {
          // if (global.username) {
          setLoading(false);
          // }
        }
      }
      postToken();

      async function verifyTokenApi() {
        try {
          await axios.get("/api/verifyToken");
          setIsVerified(true);
        } catch (err) {
          setIsVerified(false);
        }
      }
      verifyTokenApi();
    };
    storeTokenToDb();
  }, [tokenVerifierTrigger]);

  // console.log(global.admin, global.forms, global.username);
  // console.log( global.forms);

  return (
    <>
      {loading || isVerified === undefined ? (
        <div className="w-fit m-auto py-24">
          <Loader />
        </div>
      ) : isVerified ? (
          <MainPage />
      ) : (
        <Registration
          tokenVerifierTrigger={tokenVerifierTrigger}
          setTokenVerifierTrigger={setTokenVerifierTrigger}
          setUserId={setUserId}
        />
      )}
    </>
  );
};

export default Home;
