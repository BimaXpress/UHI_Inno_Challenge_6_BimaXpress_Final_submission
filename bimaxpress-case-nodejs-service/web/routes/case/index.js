const express = require("express");
const {
  CreateCase,
  UpdateCase,
  GetCases,
  GetCasesById,
  ChangeFormStatus,
  casesDeleteById,
  GetCasesCount,
} = require("../../controller");
const { multerUpload } = require("../../middleware");

const caseRouter = express.Router();

// Create new voter
caseRouter.post("/createCase", CreateCase);
caseRouter.patch("/updateCase", UpdateCase);
caseRouter.get("/getCases", GetCases);
caseRouter.get("/getCaseById", GetCasesById);
caseRouter.put(
  "/changeFormStatus",
  multerUpload.array("uploadFiles"),
  ChangeFormStatus
);
caseRouter.delete("/casesDeleteById", casesDeleteById);
caseRouter.get("/getCasesCount", GetCasesCount);

module.exports = caseRouter;
