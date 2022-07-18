import { combineReducers } from "redux";

import Shared from "./containers/reducer";
import Home from "./containers/home/reducer";
import Mail from "./containers/mail/reducer";
import AddNewCase from "./containers/addNewCase/reducer";
import EmpanelledCompanies from "./containers/empanelledCompanies/reducer";
import Order from "./containers/orderDetails/reducer";
import CaseBucket from "./containers/caseBucket/reducer";

export default combineReducers({
  Shared,
  Home,
  Mail,
  AddNewCase,
  EmpanelledCompanies,
  Order,
  CaseBucket,
});
