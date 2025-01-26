import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recentReloader: 0,
  regenerateObject: {},
  regenerateTrigger: false,
  navbarShower: true,
  forgetToggle: false,
  parentAdmin: undefined,
  username: "",
  forms: "",
  admin: false,
  loginToggle:true,
};

export const GlobalSlice = createSlice({
  name: "Global",
  initialState,
  reducers: {
    setRecentReloaderR: (state, action) => {
      state.recentReloader = action.payload;
    },
    setRegenerateObjectR: (state, action) => {
      state.regenerateObject = action.payload;
    },
    setRegenerateTriggerR: (state, action) => {
      state.regenerateTrigger = action.payload;
    },
    setNavbarShowerR: (state, action) => {
      state.navbarShower = action.payload;
    },
    setForgetToggleR: (state, action) => {
      state.forgetToggle = action.payload;
    },
    setParentAdminR: (state, action) => {
      state.parentAdmin = action.payload;
    },
    setFormsR: (state, action) => {
      state.forms = action.payload;
    },
    setUserNameR: (state, action) => {
      state.username = action.payload;
    },
    setAdminR: (state, action) => {
      state.admin = action.payload;
    },
    setLoginToggleR: (state, action) => {
      state.loginToggle = action.payload;
    },
  },
});

export const {
  setRecentReloaderR,
  setRegenerateObjectR,
  setRegenerateTriggerR,
  setNavbarShowerR,
  setForgetToggleR,
  setParentAdminR,
  setFormsR,
  setUserNameR,
  setAdminR,
  setLoginToggleR
} = GlobalSlice.actions;

export default GlobalSlice.reducer;
