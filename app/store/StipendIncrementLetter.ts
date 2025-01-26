import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState: any = {
  printShow: false,
  emailShow: false,
  gender: "",
  currentDate: "",
  name: "",
  address: "",
  effectiveDate: "",
  newStipend: "",
  newStipendInWords: "_",
  addLine: false,
  newDataChecker: null,
};

export const StipendIncrementLetterSlice: any = createSlice({
  name: "StipendIncrementLetter",
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
    setNewStipendR: (state, action) => {
      state.newStipend = action.payload;
    },
    setNewStipendInWordsR: (state, action) => {
      state.newStipendInWords = action.payload;
    },
    setAddLineR: (state, action) => {
      state.addLine = action.payload;
    },
    setStipendData: (state, action) => {
      state.gender = action.payload.gender;
      state.currentDate = action.payload.currentDate;
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.effectiveDate = action.payload.effectiveDate;
      state.newStipend = action.payload.newStipend;
      state.newStipendInWords = action.payload.newStipendInWords;
      state.addLine = action.payload.addLine;
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
  setNewStipendR,
  setNewStipendInWordsR,
  setAddLineR,
  setStipendData,
  setPrintShowR,
} = StipendIncrementLetterSlice.actions;

export default StipendIncrementLetterSlice.reducer;
