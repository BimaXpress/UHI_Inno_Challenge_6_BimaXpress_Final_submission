const { Cases } = require("../../../../models/mongoose");
const createError = require("http-errors");

const getCaseById = async (req, res, next) => {
    try {
        const caseId = req.query.caseId;
        if (!caseId) {
            const error = {
                error: true,
                status: 400,
                message: "caseId is required!"
            }
            throw error
        }
        var myregexp = /^[0-9a-fA-F]{24}$/;

        if (!caseId.match(myregexp)) {
            const error = {
                "status": 400,
                "message": "caseId is not valid for mongoDB!"
            }
            throw error
        }

        const caseData = await Cases.findById({ "_id": caseId });

        if (!caseData) {
            const error = {
                "status": 404,
                "message": "Data not found!"
            }
            throw error
        }

        res.status(200).send({
            error: false,
            message: "data fetched",
            data: caseData
        })



    } catch (error) {
        next(error);
    }
};

module.exports = getCaseById;
