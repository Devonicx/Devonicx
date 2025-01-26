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
  responseDate: "",
  startingDate: "",
  salaryEffective: "",
  allowance: [],
  newDataChecker: null,
  comLine: false,
  commission: 15,
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

export const AppointmentLetterSlice = createSlice({
  name: "AppointmentLetter",
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
    setSalaryEffectiveR: (state, action) => {
      state.salaryEffective = action.payload;
    },
    setAllowanceR: (state, action) => {
      state.allowance = action.payload;
    },
    setCommissionR: (state, action) => {
      state.commission = action.payload;
    },
    setComLineR: (state, action) => {
      state.comLine = action.payload;
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
    setResponseDateR: (state, action) => {
      state.responseDate = action.payload;
    },
    setDeleteAllowance: (state, action) => {
      state.allowance.splice(action.payload, 1);
    },
    setAppointData: (state, action) => {
      state.gender = action.payload.gender;
      state.currentDate = action.payload.currentDate;
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.designation = action.payload.designation;
      state.basicSalary = action.payload.basicSalary;
      state.responseDate = action.payload.responseDate;
      state.startingDate = action.payload.startingDate;
      state.salaryEffective = action.payload.salaryEffective;
      state.allowance = action.payload.allowance;
      state.comLine = action.payload.comLine;
      state.commission = action.payload.commission;
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
  setDesignationR,
  setBasicSalaryR,
  setStartingDateR,
  setSalaryEffectiveR,
  setAllowanceR,
  setAllowanceValuesR,
  setResetAllowance,
  setDeleteAllowance,
  setAppointData,
  setResponseDateR,
  setPrintShowR,
  setComLineR,
  setCommissionR,
  setAddIncLineR,
  setIncrementR,
} = AppointmentLetterSlice.actions;

export default AppointmentLetterSlice.reducer;
