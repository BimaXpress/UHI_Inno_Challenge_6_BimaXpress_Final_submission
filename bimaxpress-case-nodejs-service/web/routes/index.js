const authRouter = require("./auth");
const caseRouter = require("./case")
const preAuthFormRouter = require("./preAuthForm")
const reimbursementRouter = require("./reimbursement")
const ChargeMastersRouter = require("./chargesMasters")
const RoomMastersRouter = require("./roomMasters");

module.exports = { authRouter, caseRouter, preAuthFormRouter, reimbursementRouter, ChargeMastersRouter, RoomMastersRouter };
