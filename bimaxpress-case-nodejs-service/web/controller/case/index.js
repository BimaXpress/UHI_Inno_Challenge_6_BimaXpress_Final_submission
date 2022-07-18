const CreateCase = require("./createCase");
const UpdateCase = require("./updateCase");
const GetCases = require("./getCases");
const GetCasesById = require("./getCaseById");
const ChangeFormStatus = require("./changeFormStatus");
const casesDeleteById = require("./casesDeleteById");
const GetCasesCount = require("./getCasesCount");

module.exports = {
  CreateCase,
  UpdateCase,
  GetCases,
  GetCasesById,
  ChangeFormStatus,
  casesDeleteById,
  GetCasesCount,
};
