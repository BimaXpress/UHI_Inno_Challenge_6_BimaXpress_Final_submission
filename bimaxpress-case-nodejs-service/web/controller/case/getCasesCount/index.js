const { Cases } = require("../../../../models/mongoose");
const createError = require("http-errors");

const GetCasesCount = async (req, res, next) => {
  try {
    const formStatus = req.query.formStatus;
    const hospitalId = req.query.hospitalId;

    const AllowedFormStatus = [
      "Draft",
      "Unprocess",
      "Query",
      "Approved",
      "Reject",
      "Enhance",
      "Fci",
      "Discharge Approved",
      "Settled",
    ];

    if (!hospitalId) {
      const error = {
        error: true,
        status: 400,
        message: "query parameter hospitalId required!",
      };
      throw error;
    }

    let counts = [];
    let onlyCounts = [];

    var results = await Promise.all(
      AllowedFormStatus.map(async (formStatus) => {
        let count = 0;
        await Cases.countDocuments(
          { hospitalId: hospitalId, formStatus: formStatus },
          function (err, c) {
            count = c;
            console.log(formStatus.toLowerCase() + " Count is " + c);
          }
        );
        const cases = await Cases.find({
          hospitalId: hospitalId,
          formStatus: formStatus,
        })
          .sort({ updatedAt: -1 })
          .limit(1);
        if (formStatus === "Draft") {
          counts.push({
            name: "Draft",
            link: formStatus,
            filter: 1,
            icon: "fa-solid fa-file-pen",
            gradiant: "bg-gradient-to-r from-cyan-500 to-blue-500",
            color: "text-blue-500",
            bgColor: "rgb(0 147 233 / 20%)",
            bgHover: "hover:bg-blue-600",
            borderColor: "border-blue-700",
            counts: count,
            cases: cases,
          });
        } else if (formStatus === "Unprocess") {
          counts.push({
            name: "Unprocess",
            link: formStatus,
            filter: 2,
            icon: "fa-solid fa-file-circle-question",
            gradiant: "bg-gradient-to-r from-emerald-700 to-emerald-400",
            color: "text-emerald-300",
            bgColor: "rgb(0 147 233 / 20%)",
            bgHover: "hover:bg-emerald-400",
            borderColor: "border-emerald-700",
            counts: count,
            cases: cases,
          });
        } else if (formStatus === "Query") {
          counts.push({
            name: "Queries",
            link: formStatus,
            filter: 3,
            icon: "fa-solid fa-file-circle-exclamation",
            gradiant: "bg-gradient-to-r from-yellow-700 to-yellow-400",
            color: "text-yellow-500",
            bgColor: "rgb(0 147 233 / 20%)",
            bgHover: "hover:bg-yellow-600",
            borderColor: "border-yellow-700",
            counts: count,
            cases: cases,
          });
        } else if (formStatus === "Approved") {
          counts.push({
            name: "Approved",
            link: formStatus,
            filter: 4,
            icon: "fa-solid fa-file-circle-check",
            gradiant: "bg-gradient-to-r from-emerald-700 to-emerald-400",
            color: "text-emerald-300",
            bgColor: "rgb(0 147 233 / 20%)",
            bgHover: "hover:bg-emerald-600",
            borderColor: "border-emerald-700",
            counts: count,
            cases: cases,
          });
        } else if (formStatus === "Reject") {
          counts.push({
            name: "Rejected",
            link: formStatus,
            filter: 5,
            icon: "fa-solid fa-file-circle-xmark",
            gradiant: "bg-gradient-to-r from-red-800 to-red-400",
            color: "text-red-300",
            bgColor: "rgb(0 147 233 / 20%)",
            bgHover: "hover:bg-red-400",
            borderColor: "border-red-800",
            counts: count,
            cases: cases,
          });
        } else if (formStatus === "Enhance") {
          counts.push({
            name: "Enhance",
            link: formStatus,
            icon: "fa-solid fa-file-circle-plus",
            gradiant: "bg-gradient-to-r from-cyan-800 to-cyan-400",
            color: "text-cyan-400",
            bgColor: "rgb(0 147 233 / 20%)",
            bgHover: "hover:bg-cyan-500",
            borderColor: "border-cyan-800",
            counts: count,
            filter: 6,
            cases: cases,
          });
        } else if (formStatus === "Fci") {
          counts.push({
            name: "FCI",
            link: formStatus,
            filter: 7,
            icon: "fa-solid fa-file-circle-plus",
            gradiant: "bg-gradient-to-r from-teal-300 to-teal-500",
            color: "text-teal-500",
            bgColor: "bg-teal-500",
            bgHover: "hover:bg-teal-600",
            borderColor: "border-teal-700",
            counts: count,
            cases: cases,
          });
        } else if (formStatus === "Discharge Approved") {
          counts.push({
            name: "Discharge Approved",
            link: formStatus,
            filter: 8,
            icon: "fa-solid fa-file-shield",
            gradiant: "bg-gradient-to-r from-teal-300 to-teal-500",
            color: "text-teal-500",
            bgColor: "bg-teal-500",
            bgHover: "hover:bg-teal-600",
            borderColor: "border-teal-700",
            counts: count,
            cases: cases,
          });
        } else if (formStatus === "Settled") {
          counts.push({
            name: "Settled",
            link: formStatus,
            filter: 9,
            icon: "fa-solid fa-file-circle-check",
            gradiant: "bg-gradient-to-r from-teal-300 to-teal-500",
            color: "text-teal-500",
            bgColor: "bg-teal-500",
            bgHover: "hover:bg-teal-600",
            borderColor: "border-teal-700",
            counts: count,
            cases: cases,
          });
        }
      })
    );

    const finalArray = counts.sort(function (a, b) {
      return parseFloat(a.filter) - parseFloat(b.filter);
    });

    let countFinalArray = [];
    for (data of finalArray) {
      countFinalArray.push(data.counts);
    }

    const caseData = await Cases.find({
      hospitalId: hospitalId,
    })
      .sort({ updatedAt: -1 })
      .limit(3);

    res.send({
      counts: finalArray,
      cases: caseData,
      graphCount: countFinalArray,
    });
  } catch (error) {
    // if (error.isJoi === true) error.status = 442;
    next(error);
  }
};

module.exports = GetCasesCount;
