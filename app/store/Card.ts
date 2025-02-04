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
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
