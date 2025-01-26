import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  emailShow: false,
  printShow: false,
  gender: "",
  currentDate: "",
  name: "",
  address: "",
  startingDate: "",
  endingDate: "",
  section: "",
  comments: "",
  newDataChecker: null,
};

export const TerminationLetterSlice: any = createSlice({
  name: "TerminationLetter",
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
    setSectionR: (state, action) => {
      state.section = action.payload;
    },
    setStartingDateR: (state, action) => {
      state.startingDate = action.payload;
    },
    setEndingDateR: (state, action) => {
      state.endingDate = action.payload;
    },
    setTerminationData: (state, action) => {
      state.gender = action.payload.gender;
      state.currentDate = action.payload.currentDate;
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.startingDate = action.payload.startingDate;
      state.endingDate = action.payload.endingDate;
      state.section = action.payload.section;
    },
    setCommentsR: (state, action) => {
      state.comments = action.payload;
    },

  },
});

export const {
  setEmailShowR,
  setGenderR,
  setCurrentDateR,
  setNameR,
  setAddressR,
  setEndingDateR,
  setStartingDateR,
  setSectionR,
  setTerminationData,
  setCommentsR,
  setPrintShowR,
} = TerminationLetterSlice.actions;

export default TerminationLetterSlice.reducer;
