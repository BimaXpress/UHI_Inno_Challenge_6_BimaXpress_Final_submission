const express = require("express");
const { GetRoomList } = require("../../controller");

const RoomMastersRouter = express.Router();


RoomMastersRouter.get("/getRoomList", GetRoomList);



module.exports = RoomMastersRouter;
