import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  printShow: false,
  currentDate: "",
  name: "",
  softwareHouse: "",
  address: "",
  startDate: "",
  endDate: "",
  amount: "",
  phone: "",
  title: "",
  projectDescription: "",
  email: "",
  deliverables: "",
  deadline: "One Sharp Deadline",
  deadlineText: "",
  payment: "One time Payment after Project",
  paymentText: "",
  writtenBy: "",
  writtenByText: "",
  refName: "",
  refDesignation: "",
  refPhone: "",
  refEmail: "",
  refCnic: "",
  ceoName: "",
  province: "",
  city: "",
  companyType: "",
  forIndividual: true,
};

export const ContractSlice = createSlice({
  name: "Contract",
  initialState,
  reducers: {
    setphoneR: (state, action) => {
      state.phone = action.payload;
    },
    setPrintShowR: (state, action) => {
      state.printShow = action.payload;
    },

    setcurrentDateR: (state, action) => {
      state.currentDate = action.payload;
    },
    setnameR: (state, action) => {
      state.name = action.payload;
    },
    setsoftwareHouseR: (state, action) => {
      state.softwareHouse = action.payload;
    },
    setaddressR: (state, action) => {
      state.address = action.payload;
    },
    setprojectDescriptionR: (state, action) => {
      state.projectDescription = action.payload;
    },
    setemailR: (state, action) => {
      state.email = action.payload;
    },
    setdeliverablesR: (state, action) => {
      state.deliverables = action.payload;
    },
    setstartDateR: (state, action) => {
      state.startDate = action.payload;
    },
    setendDateR: (state, action) => {
      state.endDate = action.payload;
    },
    setceoR: (state, action) => {
      state.ceo = action.payload;
    },
    settitleR: (state, action) => {
      state.title = action.payload;
    },
    setamountR: (state, action) => {
      state.amount = action.payload;
    },
    setSignPicR: (state, action) => {
      state.signPic = action.payload;
    },
    setDeadlineR: (state, action) => {
      state.deadline = action.payload;
    },
    setDeadlineTextR: (state, action) => {
      state.deadlineText = action.payload;
    },
    setPaymentR: (state, action) => {
      state.payment = action.payload;
    },
    setPaymentTextR: (state, action) => {
      state.paymentText = action.payload;
    },
    setWrittenByR: (state, action) => {
      state.writtenBy = action.payload;
    },
    setWrittenByTextR: (state, action) => {
      state.writtenByText = action.payload;
    },
    setForIndividualR: (state, action) => {
      state.forIndividual = action.payload;
    },
    setRefNameR: (state, action) => {
      state.refName = action.payload;
    },
    setRefPhoneR: (state, action) => {
      state.refPhone = action.payload;
    },
    setRefCnicR: (state, action) => {
      state.refCnic = action.payload;
    },
    setRefEmailR: (state, action) => {
      state.refEmail = action.payload;
    },
    setRefDesignationR: (state, action) => {
      state.refDesignation = action.payload;
    },
    setCeoNameR: (state, action) => {
      state.ceoName = action.payload;
    },
    setProvinceR: (state, action) => {
      state.province = action.payload;
    },
    setCityR: (state, action) => {
      state.city = action.payload;
    },
    setCompanyTypeR: (state, action) => {
      state.companyType = action.payload;
    },
    setContractData: (state, action) => {
      state.currentDate = action.payload.currentDate;
      state.name = action.payload.name;
      state.softwareHouse = action.payload.softwareHouse;
      state.address = action.payload.address;
      state.projectDescription = action.payload.projectDescription;
      state.email = action.payload.email;
      state.deliverables = action.payload.deliverables;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.ceo = action.payload.ceo;
      state.title = action.payload.title;
      state.amount = action.payload.amount;
      state.phone = action.payload.phone;
      state.deadline = action.payload.deadline;
      state.deadlineText = action.payload.deadlineText;
      state.payment = action.payload.payment;
      state.paymentText = action.payload.paymentText;
      state.writtenBy = action.payload.writtenBy;
      state.writtenByText = action.payload.writtenByText;
      state.forIndividual = action.payload.forIndividual;
      state.refName = action.payload.refName;
      state.refPhone = action.payload.refPhone;
      state.refCnic = action.payload.refCnic;
      state.refEmail = action.payload.refEmail;
      state.refDesignation = action.payload.refDesignation;
      state.ceoName = action.payload.ceoName;
      state.province = action.payload.province;
      state.city = action.payload.city;
      state.companyType = action.payload.companyType;
    },
    resetValues: () => initialState,
  },
});

export const {
  setaddressR,
  setceoR,
  setcurrentDateR,
  setdeliverablesR,
  setendDateR,
  setnameR,
  setprojectDescriptionR,
  setsoftwareHouseR,
  setstartDateR,
  settitleR,
  setemailR,
  setContractData,
  setamountR,
  setPrintShowR,
  setSignPicR,
  setDeadlineR,
  setDeadlineTextR,
  setPaymentR,
  setPaymentTextR,
  setphoneR,
  setWrittenByR,
  setWrittenByTextR,
  setForIndividualR,
  setRefEmailR,
  setRefNameR,
  setRefPhoneR,
  setRefCnicR,
  setRefDesignationR,
  resetValues,
  setCeoNameR,
  setCityR,
  setProvinceR,
  setCompanyTypeR,
} = ContractSlice.actions;

export default ContractSlice.reducer;
