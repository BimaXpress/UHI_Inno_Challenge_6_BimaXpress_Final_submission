const { Reimbursement } = require("../../../../models/mongoose");
const createError = require("http-errors");

const reimbursementgetCaseById = async (req, res, next) => {
    try {
        //check if id given or not.
        const caseId = req.query.caseId;
        if (!caseId) {
            const error = {
                error: true,
                status: 400,
                message: "caseId is required!"
            }
            throw error
        }

        //mongo db validation.
        var myregexp = /^[0-9a-fA-F]{24}$/;
        if (!caseId.match(myregexp)) {
            const error = {
                "status": 400,
                "message": "caseId is not valid for mongoDB!"
            }
            throw error
        }

        const caseData = await Reimbursement.findById({ "_id": caseId });

        //throw error if data not found.
        if (!caseData) {
            const error = {
                "status": 404,
                "message": "Data not found!"
            }
            throw error
        }

        res.status(200).send({
            message: "data fetched",
            data: caseData
        })



    } catch (error) {
        next(error);
    }
};

module.exports = reimbursementgetCaseById;