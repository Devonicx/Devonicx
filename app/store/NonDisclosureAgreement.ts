import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  emailShow: false,
  printShow: false,
  gender: "",
  currentDate: "",
  name: "",
  fatherName: "",
  cnic: "",
  so: "",
  newDataChecker: null,
};

export const NonDisclosureAgreementSlice = createSlice({
  name: "NonDisclosureAgreement",
  initialState,
  reducers: {
    setEmailShowR: (state, action) => {
      state.emailShow = action.payload;
    },
    setPrintShowR: (state, action) => {
      state.printShow = action.payload;
    },

    setGenderR: (state, action) => {
      state.gender = action.payload;
    },
    setCurrentDateR: (state, action) => {
      state.currentDate = action.payload;
    },
    setNameR: (state, action) => {
      state.name = action.payload;
    },
    setFatehrNameR: (state, action) => {
      state.fatherName = action.payload;
    },
    setCnicR: (state, action) => {
      state.cnic = action.payload;
    },
    setSoR: (state, action) => {
      state.so = action.payload;
    },
    setNdaData: (state, action) => {
      state.gender = action.payload.gender;
      state.currentDate = action.payload.currentDate;
      state.name = action.payload.name;
      state.fatherName = action.payload.fatherName;
      state.cnic = action.payload.cnic;
      state.so = action.payload.so;
    },

  },
});

export const {
  setEmailShowR,
  setGenderR,
  setCurrentDateR,
  setNameR,
  setFatehrNameR,
  setCnicR,
  setNdaData,
  setPrintShowR,
  setSoR
} = NonDisclosureAgreementSlice.actions;

export default NonDisclosureAgreementSlice.reducer;
