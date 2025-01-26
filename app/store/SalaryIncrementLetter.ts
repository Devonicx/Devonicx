import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  emailShow: false,
  printShow: false,
  gender: "",
  currentDate: "",
  name: "",
  address: "",
  effectiveDate: "",
  amount: "_",
  basicSalary: "",
  allowance: [],
  addLine: false,
  newDataChecker: null,
  addIncLine: false,
  increment: 50,
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

export const SalaryIncrementLetterSlice: any = createSlice({
  name: "SalaryIncrementLetter",
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
    setEffectiveDateR: (state, action) => {
      state.effectiveDate = action.payload;
    },
    setAmountR: (state, action) => {
      state.amount = action.payload;
    },
    setBasicSalaryR: (state, action) => {
      state.basicSalary = action.payload;
    },
    setAddLineR: (state, action) => {
      state.addLine = action.payload;
    },
    setAllowanceR: (state, action) => {
      state.allowance = action.payload;
    },
    setAddIncLineR: (state, action) => {
      state.addIncLine = action.payload;
    },
    setIncrementR: (state, action) => {
      state.increment = action.payload;
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
    setSalaryData: (state, action) => {
      state.gender = action.payload.gender;
      state.currentDate = action.payload.currentDate;
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.effectiveDate = action.payload.effectiveDate;
      state.amount = action.payload.amount;
      state.basicSalary = action.payload.basicSalary;
      state.allowance = action.payload.allowance;
      state.addLine = action.payload.addLine;
      state.addIncLine = action.payload.addIncLine;
      state.increment = action.payload.increment;
    },
  },
});

export const {
  setEmailShowR,
  setGenderR,
  setCurrentDateR,
  setNameR,
  setAddressR,
  setEffectiveDateR,
  setAmountR,
  setBasicSalaryR,
  setAllowanceR,
  setAllowanceValuesR,
  setResetAllowance,
  setDeleteAllowance,
  setAddLineR,
  setSalaryData,
  setPrintShowR,
  setAddIncLineR,
  setIncrementR,
} = SalaryIncrementLetterSlice.actions;

export default SalaryIncrementLetterSlice.reducer;
