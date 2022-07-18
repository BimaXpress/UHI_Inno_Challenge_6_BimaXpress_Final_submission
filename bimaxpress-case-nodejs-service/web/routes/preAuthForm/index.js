const express = require("express");
const { GetPreAuthForm } = require("../../controller");
const preAuthFormRouter = express.Router();

preAuthFormRouter.get("/getPreAuthForm", GetPreAuthForm);

module.exports = preAuthFormRouter;
