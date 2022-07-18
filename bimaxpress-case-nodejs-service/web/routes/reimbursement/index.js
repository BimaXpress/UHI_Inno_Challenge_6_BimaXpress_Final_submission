const express = require("express");
const { reimbursementCreateCase, reimbursementUpdateCase,
    reimbursementgetCaseById,
    reimbursementGetCases, reimbursementDeleteById } = require("../../controller");

const reimbursementRouter = express.Router();

// Create new voter
reimbursementRouter.post("/createCase", reimbursementCreateCase);
reimbursementRouter.put("/updateCase", reimbursementUpdateCase);
reimbursementRouter.get("/getCaseById", reimbursementgetCaseById);
reimbursementRouter.get("/getCases", reimbursementGetCases);
reimbursementRouter.delete("/deleteById", reimbursementDeleteById);



module.exports = reimbursementRouter;