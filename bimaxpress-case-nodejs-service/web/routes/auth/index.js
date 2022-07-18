const express = require("express");
const { Login, Logout, RefreshToken, Register } = require("../../controller");
const authRouter = express.Router();

authRouter.post("/register", Register);

authRouter.post("/login", Login);

authRouter.post("/refresh-token", RefreshToken);

authRouter.delete("/logout", Logout);

module.exports = authRouter;
