const { Login, Logout, RefreshToken, Register } = require("./auth");
const {
  CreateCase,
  UpdateCase,
  GetCases,
  GetCasesById,
  ChangeFormStatus,
  casesDeleteById,
  GetCasesCount,
} = require("./case");
const { GetPreAuthForm } = require("./preAuthForm");
const {
  reimbursementCreateCase,
  reimbursementUpdateCase,
  reimbursementgetCaseById,
  reimbursementGetCases,
  reimbursementDeleteById,
} = require("./reimbursement");

const { GetChargeMasters } = require("./charge_masters");
const { GetRoomList } = require("./room_masters");

module.exports = {
  // auth controller
  Login,
  Logout,
  RefreshToken,
  Register,

  // case controller
  CreateCase,
  UpdateCase,
  GetCases,
  GetCasesById,
  ChangeFormStatus,
  casesDeleteById,
  GetCasesCount,

  // pre auth controller
  GetPreAuthForm,

  //reimbursement controller,
  reimbursementCreateCase,
  reimbursementUpdateCase,
  reimbursementgetCaseById,
  reimbursementGetCases,
  reimbursementDeleteById,

  //charge masters
  GetChargeMasters,

  //room_masters
  GetRoomList,
};
