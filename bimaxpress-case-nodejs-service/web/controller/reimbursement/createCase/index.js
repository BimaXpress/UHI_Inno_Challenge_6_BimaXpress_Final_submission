const { Reimbursement } = require("../../../../models/mongoose");
const createError = require("http-errors");

const reimbursementCreateCase = async (req, res, next) => {
    try {
        const hospitalId = req.body.hospitalId;

        //throwing error here if hospitalId not avail because we cant check other flow,API will give errors
        if (!hospitalId) {
            const error = {
                status: 400,
                message: "hospitalId is required!"
            };
            throw error;
        }

        //mongo validation
        var myregexp = /^[0-9a-fA-F]{24}$/;
        if (!hospitalId.match(myregexp)) {
            const error = {
                "status": 400,
                "message": "hospitalId is not valid for mongoDB!"
            }
            throw error;
        }

        //if companyDetails are not there then we cant execute req.body.companyDetails.insuranceCompany
        if (!req.body.companyDetails) {
            const error = {
                status: 400,
                message: "companyDetails required."
            }
            throw error
        }

        //atleast one is needed insurance company or tpa.
        if (!req.body.companyDetails.insuranceCompany && !req.body.companyDetails.tpaCompany) {
            const error = {
                status: 400,
                message: "Enter atleast one insuranceCompany or tpaCompany."
            }
            throw error
        }


        const caseData = new Reimbursement({
            ...req.body
        });

        const savedCase = await caseData.save();

        if (!savedCase) {
            const error = {
                status: 400,
                message: "Failed to save case"
            }
            throw error;
        }
        res.send({ success: true, "Data": savedCase });
    } catch (error) {
        next(error);
    }
};

module.exports = reimbursementCreateCase;