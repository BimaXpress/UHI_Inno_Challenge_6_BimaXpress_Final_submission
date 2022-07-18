const { Charges_masters } = require("../../../../models/mongoose");
const createError = require("http-errors");

const GetChargeMasters = async (req, res, next) => {
    try {
        const insuranceCompanyName = req.query.insuranceCompany;
        if (!insuranceCompanyName) {
            const error = {
                error: true,
                status: 400,
                message: "insuranceCompany is required!"
            }
            throw error
        }

        const Charges_masters_list = await Charges_masters.findOne({ "insuranceCompany": insuranceCompanyName });

        if (!Charges_masters_list) {
            const error = {
                error: true,
                status: 404,
                message: "Data not found!"
            }
            throw error
        }
        res.send({ status: "success", insuranceCompany: Charges_masters_list.insuranceCompany, chargesList: Charges_masters_list.chargesList });



    } catch (error) {
        next(error);
    }
};

module.exports = GetChargeMasters;