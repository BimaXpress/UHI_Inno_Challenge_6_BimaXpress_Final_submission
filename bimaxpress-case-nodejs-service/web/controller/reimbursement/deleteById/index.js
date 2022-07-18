const { Reimbursement } = require("../../../../models/mongoose");
const createError = require("http-errors");

const reimbursementDeleteById = async (req, res, next) => {
    try {

        //if request is empty.
        if (!req.body.casesToBeDeleted) {
            const error = {
                "status": 400,
                "message": "please send casesToBeDeleted in body in array form."
            }
            throw error;
        }

        //for checking if id is valid or not according to mongo db.
        var myregexp = /^[0-9a-fA-F]{24}$/;
        for (data of req.body.casesToBeDeleted) {
            if (!data.match(myregexp)) {
                const error = {
                    "status": 400,
                    "message": `caseId ${data} is not valid for mongoDB!`
                }
                throw error
            }

        }

        //for checking data  if its in database or not.
        for (data of req.body.casesToBeDeleted) {
            const caseData = await Reimbursement.findById(
                { _id: data },
            );
            if (!caseData) {
                const error = {
                    status: 404,
                    message: `No case found by id ${data}`
                }
                throw error;
            }

        }

        //updating data
        for (data of req.body.casesToBeDeleted) {
            //for updating 
            await Reimbursement.findByIdAndUpdate(
                { _id: data },
                {
                    active: false
                },
                { new: true, useFindAndModify: false }
            );
        }


        res.send({ success: true, status: "cases deleted" });
    } catch (error) {
        next(error);
    }
}

module.exports = reimbursementDeleteById;