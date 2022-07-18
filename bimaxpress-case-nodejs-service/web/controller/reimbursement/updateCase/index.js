const { Reimbursement } = require("../../../../models/mongoose");
const createError = require("http-errors");

const reimbursementUpdateCase = async (req, res, next) => {
    try {

        //caseId needed
        if (!req.query.caseId) {
            const error = {
                status: 400,
                message: "caseId is required!"
            };
            throw error;
        }

        //mongo validation
        var myregexp = /^[0-9a-fA-F]{24}$/;
        if (!req.query.caseId.match(myregexp)) {
            const error = {
                "status": 400,
                "message": "caseId is not valid for mongoDB!"
            }
            throw error;
        }

        //check if such case exist or not.
        const findcase = await Reimbursement.findById(req.query.caseId);
        if (!findcase) {
            const error = {
                status: 404,
                message: "cannot find case"
            };
            throw error;
        }

        // console.log(req.body);

        // if (req.body === {} || !req.body) {
        //     const error = {
        //         status: 400,
        //         message: "provide body to update."
        //     };
        //     throw error;
        // }


        //find and update details

        const caseData = await Reimbursement.findByIdAndUpdate(
            req.query.caseId,
            { ...req.body }
        );

        //if successful then reply.
        if (caseData) {
            res.status(200).send({
                code: 200,
                message: "Data updated successfully"
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = reimbursementUpdateCase;