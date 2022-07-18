const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const room_masters_schema = new Schema(
    {
        insuranceCompany: {
            type: String,

        },
        roomList: {
            type: Array,
        }
    },
    { timestamps: true }
);
const Room_masters = mongoose.model("room_masters", room_masters_schema);

module.exports = Room_masters;