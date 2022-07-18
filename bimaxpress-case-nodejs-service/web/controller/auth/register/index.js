const { userSchema } = require("../../../../validation");
const { User } = require("../../../../models/mongoose");
const createError = require("http-errors");
const {
  signAccessToken,
  signRefreshToken,
} = require("../../../../helpers/jwt");

const Register = async (req, res, next) => {
  try {
    const result = await userSchema.validateAsync(req.body);
    const doesExist = await User.findOne({ email: result.email });

    if (doesExist)
      throw createError.Conflict(`${result.email}  is already registered`);

    const user = new User(result);
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);
    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true) error.status = 442;
    next(error);
  }
};

module.exports = Register;
