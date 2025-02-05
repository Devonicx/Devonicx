// store/formSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  companyName: "",
  agentName: "",
  bussPhoneNumber: "",
  ownerName: "",
  personalPhoneNumber: "",
  bussEmail: "",
  personalEmail: "",
  websiteLink: "",
  yelpLink: "",
  servicesOffered: "",
  services: "",
  areas: "",
  keyword: "",
  paymentMethod: "",
  notes: "",
  pricePitched: "",
  scheduledDate: "",
  scheduledTime: "",
};

const formSlice = createSlice({
  name: "Transfer",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: any; value: any }>) => {
      state[action.payload.field] = action.payload.value;
    },
    updateAllValues: (state, action: PayloadAction<typeof initialState>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { updateField, updateAllValues, resetForm } = formSlice.actions;
export default formSlice.reducer;
