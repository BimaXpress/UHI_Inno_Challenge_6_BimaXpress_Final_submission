const { Cases } = require("../../../../models/mongoose");
const createError = require("http-errors");

const GetCases = async (req, res, next) => {
    try {


        const formStatus = req.query.formStatus;
        const hospitalId = req.query.hospitalId;


        if (!formStatus || !hospitalId) {
            const error = {
                error: true,
                status: 400,
                message: "query parameter formStatus and hospitalId required!"
            }
            throw error
        }
        const cases = await Cases.find({ "formStatus": formStatus, "hospitalId": hospitalId });
        if (cases.length == 0) {
            const error = {
                error: true,
                status: 404,
                message: "Data not found!"
            }
            throw error
        }
        res.send({ status: "success", count: cases.length, cases: cases });

    } catch (error) {
        // if (error.isJoi === true) error.status = 442;
        next(error);
    }
};

module.exports = GetCases;