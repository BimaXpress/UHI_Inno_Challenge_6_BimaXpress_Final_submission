const express = require("express");
const { GetChargeMasters } = require("../../controller");

const ChargeMastersRouter = express.Router();

// Create new getChargeMasters
ChargeMastersRouter.get("/getChargeMasters", GetChargeMasters);



module.exports = ChargeMastersRouter;
