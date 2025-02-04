// store/formSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  companyName: "",
  agentName: "",
  closureName: "",
  nameOnCard: "",
  cardNumber: "",
  expirationDate: "",
  cvv: "",
  billingAddress: "",
};

const formSlice = createSlice({
  name: "Card",
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
