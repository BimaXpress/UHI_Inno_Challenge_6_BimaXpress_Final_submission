const { userSchema } = require("../../../../validation");
const { User } = require("../../../../models/mongoose");
const createError = require("http-errors");
const {
  signAccessToken,
  signRefreshToken,
} = require("../../../../helpers/jwt");

const Login = async (req, res, next) => {
  try {
    const result = await userSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });

    if (!user) throw createError.NotFound("User not registered");

    const isMatch = await user.isValidPassword(result.password);

    if (!isMatch) throw createError.Unauthorized("Username/password not valid");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid username/password"));
    next(error);
  }
};

module.exports = Login;
