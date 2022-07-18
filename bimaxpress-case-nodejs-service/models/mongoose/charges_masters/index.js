const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const charges_masters_schema = new Schema(
    {
        insuranceCompany: {
            type: String,

        },
        chargesList: {
            type: Array,
        }
    },
    { timestamps: true }
);
const Charges_masters = mongoose.model("charges_masters", charges_masters_schema);

module.exports = Charges_masters;