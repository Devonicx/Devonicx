import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  emailShow: false,
  printShow: false,
  gender: "",
  currentDate: "",
  name: "",
  address: "",
  hiring: "",
  duration: "",
  startingDate: "",
  endingDate: "",
  responseDate: "",
  stipend: "Totally unpaid",
  stipendText: "",
  newDataChecker: null,
};

export const CardSlice = createSlice({
  name: "Card",
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
    setHiringR: (state, action) => {
      state.hiring = action.payload;
    },
    setDurationR: (state, action) => {
      state.duration = action.payload;
    },
    setStartingDateR: (state, action) => {
      state.startingDate = action.payload;
    },
    setEndingDateR: (state, action) => {
      state.endingDate = action.payload;
    },
    setResponseDateR: (state, action) => {
      state.responseDate = action.payload;
    },
    setStipendR: (state, action) => {
      state.stipend = action.payload;
    },
    setStipendTextR: (state, action) => {
      state.stipendText = action.payload;
    },
    setInternData: (state, action) => {
      state.gender = action.payload.gender;
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.hiring = action.payload.hiring;
      state.duration = action.payload.duration;
      state.startingDate = action.payload.startingDate;
      state.endingDate = action.payload.endingDate;
      state.responseDate = action.payload.responseDate;
      state.stipend = action.payload.stipend;
      state.stipendText = action.payload.stipendText;
      state.currentDate = action.payload.currentDate;
    },
   
  },
});

export const {
  setEmailShowR,
  setGenderR,
  setCurrentDateR,
  setNameR,
  setAddressR,
  setHiringR,
  setDurationR,
  setEndingDateR,
  setResponseDateR,
  setStartingDateR,
  setStipendR,
  setStipendTextR,
  setInternData,
  setPrintShowR,
} = CardSlice.actions;

export default CardSlice.reducer;
