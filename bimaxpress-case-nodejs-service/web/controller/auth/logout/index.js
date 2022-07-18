const createError = require("http-errors");
const { verifyRefreshToken } = require("../../../../helpers/jwt");
const { redisClient } = require("../../../../helpers/connection/redis");

const Logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    redisClient.DEL(userId, (err, value) => {
      if (err) {
        console.log(err.message);
        throw createError.InternalServerError();
      }
      console.log(value);
      res.sendStatus(204).send({ message: "User successfully logout" });
    });
  } catch (err) {
    next(error);
  }
};

module.exports = Logout;
