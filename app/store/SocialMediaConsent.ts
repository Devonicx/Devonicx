import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState: any = {
  printShow: false,
  emailShow: false,
  name: "",
  currentDate: "",
  designation: "",
  cnic: "",
  employeeId: "",
  lastEmployeeId: "",
  newDataChecker: null,
};

export const SocialMediaConsentSlice: any = createSlice({
  name: "SocialMediaConsent",
  initialState,
  reducers: {
    setEmailShowR: (state, action) => {
      state.emailShow = action.payload;
    },
    setPrintShowR: (state, action) => {
      state.printShow = action.payload;
    },

    setNameR: (state, action) => {
      state.name = action.payload;
    },
    setCurrentDateR: (state, action) => {
      state.currentDate = action.payload;
    },
    setDesignationR: (state, action) => {
      state.designation = action.payload;
    },
    setCnicR: (state, action) => {
      state.cnic = action.payload;
    },
    setEmployeeIdR: (state, action) => {
      state.employeeId = action.payload;
    },
    setLastEmployeeIdR: (state, action) => {
      state.lastEmployeeId = action.payload;
    },
    setSocialData: (state, action) => {
      state.name = action.payload.name;
      state.currentDate = action.payload.currentDate;
      state.designation = action.payload.designation;
      state.cnic = action.payload.cnic;
      state.employeeId = action.payload.employeeId;
    },
  },
});

export const {
  setEmailShowR,
  setNameR,
  setCurrentDateR,
  setDesignationR,
  setCnicR,
  setEmployeeIdR,
  setSocialData,
  setPrintShowR,
  setLastEmployeeIdR,
} = SocialMediaConsentSlice.actions;

export default SocialMediaConsentSlice.reducer;
