import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState: any = {
  emailShow: false,
  printShow: false,
  gender: "",
  currentDate: "",
  name: "",
  designation: "",
  refNo: "",
  lastRefNo: "",
  startingDate: "",
  endingDate: "",
  newDataChecker: null,
};

export const ExperienceLetterSlice = createSlice({
  name: "ExperienceLetter",
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
    setDesignationR: (state, action) => {
      state.designation = action.payload;
    },
    setRefNoR: (state, action) => {
      state.refNo = action.payload;
    },
    setLastRefNoR: (state, action) => {
      state.lastRefNo = action.payload;
    },
    setStartingDateR: (state, action) => {
      state.startingDate = action.payload;
    },
    setEndingDateR: (state, action) => {
      state.endingDate = action.payload;
    },
    setExperienceData: (state, action) => {
      state.gender = action.payload.gender;
      state.currentDate = action.payload.currentDate;
      state.name = action.payload.name;
      state.designation = action.payload.designation;
      state.refNo = action.payload.refNo;
      state.startingDate = action.payload.startingDate;
      state.endingDate = action.payload.endingDate;
    },
  },
});

export const {
  setEmailShowR,
  setGenderR,
  setCurrentDateR,
  setNameR,
  setDesignationR,
  setStartingDateR,
  setEndingDateR,
  setRefNoR,
  setExperienceData,
  setPrintShowR,
  setLastRefNoR,
} = ExperienceLetterSlice.actions;

export default ExperienceLetterSlice.reducer;
