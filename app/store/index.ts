import { configureStore, combineReducers } from "@reduxjs/toolkit";
import OfferLetterInternReducer from "./OfferLetterIntern";
import InternshipExtensionLetterReducer from "./InternshipExtensionLetter";
import ProbationExtensionLetterReducer from "./ProbationExtensionLetter";
import OfferLetterProbationReducer from "./OfferLetterProbation";
import AppointmentLetter from "./AppointmentLetter";
import NonDisclosureAgreement from "./NonDisclosureAgreement";
import SocialMediaConsent from "./SocialMediaConsent";
import SalaryIncrementLetter from "./SalaryIncrementLetter";
import StipendIncrementLetter from "./StipendIncrementLetter";
import ExperienceLetter from "./ExperienceLetter";
import TerminationLetter from "./TerminationLetter";
import ClearanceLetter from "./ClearanceLetter";
import SalarySlip from "./SalarySlip";
import Contract from "./Contract";
import Global from "./Global";
import Attendance from "./Attendance";
import Card from "./Card";
import Sale from "./Sale";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  OfferLetterIntern: OfferLetterInternReducer,
  InternshipExtensionLetter: InternshipExtensionLetterReducer,
  ProbationExtensionLetter: ProbationExtensionLetterReducer,
  OfferLetterProbation: OfferLetterProbationReducer,
  AppointmentLetter: AppointmentLetter,
  NonDisclosureAgreement: NonDisclosureAgreement,
  SocialMediaConsent: SocialMediaConsent,
  SalaryIncrementLetter: SalaryIncrementLetter,
  StipendIncrementLetter: StipendIncrementLetter,
  ExperienceLetter: ExperienceLetter,
  TerminationLetter: TerminationLetter,
  ClearanceLetter: ClearanceLetter,
  SalarySlip: SalarySlip,
  Contract: Contract,
  Global: Global,
  Attendance: Attendance,
  Card: Card,
  Sale: Sale,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
