const { Reimbursement } = require("../../../../models/mongoose");
const createError = require("http-errors");

const reimbursementGetCases = async (req, res, next) => {
    try {

        const caseId = req.query._id;
        //mongo validation
        var myregexp = /^[0-9a-fA-F]{24}$/;
        if (!caseId.match(myregexp)) {
            const error = {
                "status": 400,
                "message": "caseId is not valid for mongoDB!"
            }
            throw error;
        }

        const cases = await Reimbursement.find(req.query);

        //throw error if data not found.
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
        next(error);
    }
};

module.exports = reimbursementGetCases;