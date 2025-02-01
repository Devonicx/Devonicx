import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState: any = {
  name:"",
  checkIn: true,
  checkOut: true,
  date: "12-12-2024",
  month: "December 2024",
  checkInTime: "07:03:40",
  checkOutTime: "16:03:40",
};

export const AttendanceSlice: any = createSlice({
  name: "Attendance",
  initialState,
  reducers: {
    setnameR: (state, action) => {
      state.name = action.payload;
    },
    setcheckInR: (state, action) => {
      state.checkIn = action.payload;
    },
    setcheckOutR: (state, action) => {
      state.checkOut = action.payload;
    },
    setdateR: (state, action) => {
      state.date = action.payload;
    },
    setmonthR: (state, action) => {
      state.month = action.payload;
    },
    setcheckInTimeR: (state, action) => {
      state.checkInTime = action.payload;
    },
    setcheckOutTimeR: (state, action) => {
      state.checkOutTime = action.payload;
    },
  },
});

export const {
  setcheckInR,
  setcheckOutR,
  setdateR,
  setmonthR,
  setcheckInTimeR,
  setcheckOutTimeR,
  setnameR,
} = AttendanceSlice.actions;

export default AttendanceSlice.reducer;
