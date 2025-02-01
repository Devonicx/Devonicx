import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState: any = {
  checkIn: false,
  checkOut: false,
  Date: "",
  checkInTime: "",
  checkOutTime: "",
};

export const AttendanceSlice: any = createSlice({
  name: "Attendance",
  initialState,
  reducers: {
    setcheckInR: (state, action) => {
      state.checkIn = action.payload;
    },
    setcheckOutR: (state, action) => {
      state.checkOut = action.payload;
    },
    setDateR: (state, action) => {
      state.Date = action.payload;
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
  setDateR,
  setcheckInTimeR,
  setcheckOutTimeR,
} = AttendanceSlice.actions;

export default AttendanceSlice.reducer;
