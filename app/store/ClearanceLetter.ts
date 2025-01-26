import { createSlice } from "@reduxjs/toolkit";


const initialState: any = {
  emailShow: false,
  printShow: false,
  name: "",
  currentDate: "",
  address: "",
  employeeId: "",
  designation: "",
  department: "",
  joiningDate: "",
  lastDate: "",
  cnic: "",
  reasonForLeaving: "",
  payable: "",
  payableInWords: "_",
  chequeNo: "",
  paymentDate: "",
  clearanceDate: "",
  assets: "",
  paymentMode: "",
  hr: {
    Skype_Credentials_Change: false,
    Official_Email_Restriction: false,
    File_Management: false,
    Assets_Recovery: false,
  },
  pr: {
    Change_All_Technical: false,
    Account_Permission: false,
    Configuration_of_All_TL_Data: false,
  },
  tlt: { Retrieve_All_Technical_Data: false },
  newDataChecker: null,
};

export const ClearanceLetterSlice = createSlice({
  name: "ClearanceLetter",
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
    setAddressR: (state, action) => {
      state.address = action.payload;
    },
    setEmployeeIdR: (state, action) => {
      state.employeeId = action.payload;
    },
    setDesignationR: (state, action) => {
      state.designation = action.payload;
    },
    setDepartmentR: (state, action) => {
      state.department = action.payload;
    },
    setJoiningDateR: (state, action) => {
      state.joiningDate = action.payload;
    },
    setLastDateR: (state, action) => {
      state.lastDate = action.payload;
    },
    setCnicR: (state, action) => {
      state.cnic = action.payload;
    },
    setReasonForLeavingR: (state, action) => {
      state.reasonForLeaving = action.payload;
    },
    setPayableR: (state, action) => {
      state.payable = action.payload;
    },
    setPayableInWordsR: (state, action) => {
      state.payableInWords = action.payload;
    },
    setChequeNoR: (state, action) => {
      state.chequeNo = action.payload;
    },
    setPaymentDateR: (state, action) => {
      state.paymentDate = action.payload;
    },
    setClearanceDateR: (state, action) => {
      state.clearanceDate = action.payload;
    },
    setAssetsR: (state, action) => {
      state.assets = action.payload;
    },
    setPaymentModeR: (state, action) => {
      state.paymentMode = action.payload;
    },
    setHrR: (state, action) => {
      state.hr = action.payload;
    },
    setPrR: (state, action) => {
      state.pr = action.payload;
    },
    setTltR: (state, action) => {
      state.tlt = action.payload;
    },
    setClearanceData: (state, action) => {
      state.name = action.payload.name;
      state.currentDate = action.payload.currentDate;
      state.address = action.payload.address;
      state.employeeId = action.payload.employeeId;
      state.designation = action.payload.designation;
      state.department = action.payload.department;
      state.joiningDate = action.payload.joiningDate;
      state.lastDate = action.payload.lastDate;
      state.cnic = action.payload.cnic;
      state.reasonForLeaving = action.payload.reasonForLeaving;
      state.payable = action.payload.payable;
      state.payableInWords = action.payload.payableInWords;
      state.chequeNo = action.payload.chequeNo;
      state.paymentDate = action.payload.paymentDate;
      state.clearanceDate = action.payload.clearanceDate;
      state.assets = action.payload.assets;
      state.paymentMode = action.payload.paymentMode;
      state.hr = action.payload.hr;
      state.pr = action.payload.pr;
      state.tlt = action.payload.tlt;
    },
  },
});

export const {
  setEmailShowR,
  setNameR,
  setCurrentDateR,
  setAddressR,
  setAssetsR,
  setChequeNoR,
  setClearanceDateR,
  setCnicR,
  setDesignationR,
  setEmployeeIdR,
  setJoiningDateR,
  setLastDateR,
  setPayableInWordsR,
  setPaymentDateR,
  setPayableR,
  setReasonForLeavingR,
  setDepartmentR,
  setPaymentModeR,
  setHrR,
  setPrR,
  setTltR,
  setClearanceData,
  setPrintShowR,
} = ClearanceLetterSlice.actions;

export default ClearanceLetterSlice.reducer;
