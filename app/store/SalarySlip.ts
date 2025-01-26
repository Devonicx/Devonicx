import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  printShow: false,
  name: "",
  currentDate: "",
  cnic: "",
  designation: "",
  basicSalary: "",
  month: "",
  deduction: [
    {
      name: "Income Tax",
      amount: "",
    },
  ],
  allowance: [],
  newDataChecker: null,
};

interface SetDeductionMemberPayload {
  index: number;
  name: string;
  amount: string;
}

interface DeductionType {
  name: string;
  amount: string;
}

export const SalarySlipSlice = createSlice({
  name: "SalarySlip",
  initialState,
  reducers: {
    setNameR: (state, action) => {
      state.name = action.payload;
    },
    setPrintShowR: (state, action) => {
      state.printShow = action.payload;
    },

    setCurrentDateR: (state, action) => {
      state.currentDate = action.payload;
    },

    setCnicR: (state, action) => {
      state.cnic = action.payload;
    },
    setDesignationR: (state, action) => {
      state.designation = action.payload;
    },
    setBasicSalaryR: (state, action) => {
      state.basicSalary = action.payload;
    },
    setMonthR: (state, action) => {
      state.month = action.payload;
    },
    setDeductionR: (state, action) => {
      state.deduction = action.payload;
    },
    setDeductionValuesR: (
      state,
      action: PayloadAction<SetDeductionMemberPayload>
    ) => {
      const { index, name, amount } = action.payload;
      (state.deduction as DeductionType[])[index] = { name, amount };
    },
    setResetDeduction: (state) => {
      state.deduction = [];
    },
    setDeleteDeduction: (state, action) => {
      state.deduction.splice(action.payload, 1);
    },
    setAllowanceR: (state, action) => {
      state.allowance = action.payload;
    },
    setAllowanceValuesR: (
      state,
      action: PayloadAction<SetDeductionMemberPayload>
    ) => {
      const { index, name, amount } = action.payload;
      (state.allowance as DeductionType[])[index] = { name, amount };
    },
    setResetAllowance: (state) => {
      state.allowance = [];
    },
    setDeleteAllowance: (state, action) => {
      state.allowance.splice(action.payload, 1);
    },
    setSalarySlipData: (state, action) => {
      state.name = action.payload.name;
      state.cnic = action.payload.cnic;
      state.designation = action.payload.designation;
      state.basicSalary = action.payload.basicSalary;
      state.month = action.payload.month;
      state.deduction = action.payload.deduction;
      state.currentDate = action.payload.currentDate;
    },

  },
});

export const {
  setNameR,
  setCnicR,
  setDesignationR,
  setBasicSalaryR,
  setMonthR,
  setDeductionR,
  setSalarySlipData,
  setResetDeduction,
  setDeductionValuesR,
  setDeleteDeduction,
  setCurrentDateR,
  setAllowanceR,
  setAllowanceValuesR,
  setDeleteAllowance,
  setResetAllowance,
  setPrintShowR,
} = SalarySlipSlice.actions;

export default SalarySlipSlice.reducer;
