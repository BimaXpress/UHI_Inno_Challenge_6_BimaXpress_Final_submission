const { Room_masters } = require("../../../../models/mongoose");
const createError = require("http-errors");

const GetRoomList = async (req, res, next) => {
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

        const Room_masters_list = await Room_masters.findOne({ "insuranceCompany": insuranceCompanyName });

        if (!Room_masters_list) {
            const error = {
                error: true,
                status: 404,
                message: "Data not found!"
            }
            throw error
        }
        res.send({ status: "success", insuranceCompany: Room_masters_list.insuranceCompany, roomList: Room_masters_list.roomList });



    } catch (error) {
        next(error);
    }
};

module.exports = GetRoomList;