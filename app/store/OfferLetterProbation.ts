import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  emailShow: false,
  printShow: false,
  gender: "",
  currentDate: "",
  name: "",
  address: "",
  designation: "",
  basicSalary: "",
  startingDate: "",
  probationPeriod: "",
  responseDate: "",
  extProbation: "",
  terminationDays: "",
  priorNotice: "",
  increment: "",
  commission: 15,
  allowance: [],
  comLine: false,
  newDataChecker: null,
};

interface SetAllowanceMemberPayload {
  index: number;
  name: string;
  amount: string;
}

interface AllowanceType {
  name: string;
  amount: string;
}

export const OfferLetterProbationSlice: any = createSlice({
  name: "OfferLetterProbation",
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
    setAddressR: (state, action) => {
      state.address = action.payload;
    },
    setDesignationR: (state, action) => {
      state.designation = action.payload;
    },
    setBasicSalaryR: (state, action) => {
      state.basicSalary = action.payload;
    },
    setStartingDateR: (state, action) => {
      state.startingDate = action.payload;
    },
    setProbationPeriodR: (state, action) => {
      state.probationPeriod = action.payload;
    },
    setResponseDateR: (state, action) => {
      state.responseDate = action.payload;
    },
    setExtProbationR: (state, action) => {
      state.extProbation = action.payload;
    },
    setTerminationDaysR: (state, action) => {
      state.terminationDays = action.payload;
    },
    setPriorNoticeR: (state, action) => {
      state.priorNotice = action.payload;
    },
    setIncrementR: (state, action) => {
      state.increment = action.payload;
    },
    setAllowanceR: (state, action) => {
      state.allowance = action.payload;
    },
    setComLineR: (state, action) => {
      state.comLine = action.payload;
    },
    setCommissionR: (state, action) => {
      state.commission = action.payload;
    },
    setAllowanceValuesR: (
      state,
      action: PayloadAction<SetAllowanceMemberPayload>
    ) => {
      const { index, name, amount } = action.payload;
      (state.allowance as AllowanceType[])[index] = { name, amount };
    },
    setResetAllowance: (state) => {
      state.allowance = [];
    },
    setDeleteAllowance: (state, action) => {
      state.allowance.splice(action.payload, 1);
    },
    setProbData: (state, action) => {
      state.gender = action.payload.gender;
      state.currentDate = action.payload.currentDate;
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.designation = action.payload.designation;
      state.basicSalary = action.payload.basicSalary;
      state.startingDate = action.payload.startingDate;
      state.probationPeriod = action.payload.probationPeriod;
      state.responseDate = action.payload.responseDate;
      state.extProbation = action.payload.extProbation;
      state.terminationDays = action.payload.terminationDays;
      state.priorNotice = action.payload.priorNotice;
      state.increment = action.payload.increment;
      state.allowance = action.payload.allowance;
      state.comLine = action.payload.comLine;
      state.commission = action.payload.commission;
    },
  },
});

export const {
  setEmailShowR,
  setGenderR,
  setCurrentDateR,
  setNameR,
  setAddressR,
  setDesignationR,
  setBasicSalaryR,
  setStartingDateR,
  setProbationPeriodR,
  setResponseDateR,
  setExtProbationR,
  setTerminationDaysR,
  setPriorNoticeR,
  setIncrementR,
  setAllowanceR,
  setAllowanceValuesR,
  setResetAllowance,
  setDeleteAllowance,
  setProbData,
  setPrintShowR,
  setComLineR,
  setCommissionR,
} = OfferLetterProbationSlice.actions;

export default OfferLetterProbationSlice.reducer;
