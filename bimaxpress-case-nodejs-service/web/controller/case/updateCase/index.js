const { Cases } = require('../../../../models/mongoose');
const createError = require('http-errors');

const UpdateCase = async (req, res, next) => {
  try {
    let caseData = {
      // companyDetails: {
      //     insuranceCompany: req.body.companyDetails.insuranceCompany,
      //     tpaCompany: req.body.companyDetails.tpaCompany
      // },
      // patientDetails: {
      //     name: req.body.patientDetails.name,
      //     email: req.body.patientDetails.email,
      //     gender: req.body.patientDetails.gender,
      //     dateOfBirth: req.body.patientDetails.dateOfBirth,
      //     ageMonth: req.body.patientDetails.ageMonth,
      //     ageYear: req.body.patientDetails.ageYear,
      //     ipdPatientNumber: req.body.patientDetails.ipdPatientNumber,
      //     occupation: req.body.patientDetails.occupation,
      //     contactNumber: {
      //         number: req.body.patientDetails.contactNumber.number,
      //         countryCode: req.body.patientDetails.contactNumber.countryCode
      //     },
      //     relativeContactNumber: {
      //         number: req.body.patientDetails.contactNumber.number,
      //         countryCode: req.body.patientDetails.contactNumber.countryCode
      //     },
      //     healthId: req.body.patientDetails.healthId,
      //     policyNumber: req.body.patientDetails.policyNumber,
      //     employeeId: req.body.patientDetails.employeeId,
      //     natureOfIllness: req.body.patientDetails.natureOfIllness,
      //     durationOfPresentAilments: req.body.patientDetails.durationOfPresentAilments,
      //     dateOfFirstConsultation: req.body.patientDetails.dateOfFirstConsultation,
      //     ailmentAsPerUser: req.body.patientDetails.ailmentAsPerUser,
      //     causeOfAilment: req.body.patientDetails.causeOfAilment,
      //     provisionDiagnosis: req.body.patientDetails.provisionDiagnosis,
      //     pastHistoryOfPresentAilments: req.body.patientDetails.pastHistoryOfPresentAilments,
      //     icdCode: req.body.patientDetails.icdCode,
      //     proposedLineOfTreatment: req.body.patientDetails.proposedLineOfTreatment,
      //     ifInvestigationOrMedicalManagement: req.body.patientDetails.ifInvestigationOrMedicalManagement,
      //     routeOfDrugAdministration: req.body.patientDetails.routeOfDrugAdministration,
      //     surgicalNameofSurgery: req.body.patientDetails.surgicalNameofSurgery,
      //     icdCode10Pcs: req.body.patientDetails.icdCode10Pcs,
      //     relevantClinic: {
      //         checked: req.body.patientDetails.relevantClinic.checked,
      //         maternity: {
      //             maternity: req.body.patientDetails.relevantClinic.maternity.maternity,
      //             expectedDateOfDelivery: req.body.patientDetails.relevantClinic.maternity.expectedDateOfDelivery
      //         },
      //         injury: {
      //             occur: req.body.patientDetails.relevantClinic.injury.occur
      //         },
      //         accident: {
      //             inCaseOfAccident: {
      //                 checked: req.body.patientDetails.relevantClinic.accident.inCaseOfAccident.checked,
      //                 dateOfInjury: req.body.patientDetails.relevantClinic.accident.inCaseOfAccident.dateOfInjury,
      //                 reportedToPolice: {
      //                     checked: req.body.patientDetails.relevantClinic.accident.inCaseOfAccident.reportedToPolice.checked,
      //                     firNumber: req.body.patientDetails.relevantClinic.accident.inCaseOfAccident.reportedToPolice.firNumber,
      //                 }
      //             },
      //             alcoholConsumption: req.body.patientDetails.relevantClinic.accident.alcoholConsumption,
      //             testConducted: req.body.patientDetails.relevantClinic.accident.testConducted,
      //             isItRTA: req.body.patientDetails.relevantClinic.accident.isItRTA
      //         },
      //         other: {
      //             otherDetails: req.body.patientDetails.relevantClinic.other.otherDetails
      //         }
      //     },

      //     ifOtherTreatment: req.body.patientDetails.ifOtherTreatment,
      //     healthInsurance: {
      //         checked: req.body.patientDetails.healthInsurance.checked,
      //         companyName: req.body.patientDetails.healthInsurance.companyName,
      //         details: req.body.patientDetails.healthInsurance.details,
      //     },
      //     physician: {
      //         checked: req.body.patientDetails.physician.checked,
      //         name: req.body.patientDetails.physician.name,
      //         contactNumber: {
      //             number: req.body.patientDetails.physician.contactNumber.number,
      //             countryCode: req.body.patientDetails.physician.contactNumber.countryCode,
      //         }
      //     },
      //     currentAddress: {
      //         buildingNumber: req.body.patientDetails.currentAddress.buildingNumber,
      //         area: req.body.patientDetails.currentAddress.area,
      //         landmark: req.body.patientDetails.currentAddress.landmark,
      //         city: req.body.patientDetails.currentAddress.city,
      //         state: req.body.patientDetails.currentAddress.state,
      //         country: req.body.patientDetails.currentAddress.country,
      //         pinCode: req.body.patientDetails.currentAddress.pinCode,
      //     },
      // },

      // hospitalDetails: {
      //     name: req.body.hospitalDetails.name,
      //     email: req.body.hospitalDetails.email,
      //     currentAddress: {
      //         buildingNumber: req.body.hospitalDetails.currentAddress.buildingNumber,
      //         area: req.body.hospitalDetails.currentAddress.area,
      //         landmark: req.body.hospitalDetails.currentAddress.landmark,
      //         city: req.body.hospitalDetails.currentAddress.city,
      //         state: req.body.hospitalDetails.currentAddress.state,
      //         country: req.body.hospitalDetails.currentAddress.country,
      //         pinCode: req.body.hospitalDetails.currentAddress.pinCode,
      //     },
      //     contactNumber: {
      //         number: req.body.patientDetails.contactNumber.number,
      //         countryCode: req.body.patientDetails.contactNumber.countryCode
      //     },
      //     rohiniCode: req.body.hospitalDetails.rohiniCode,
      //     doctorDetails: {
      //         name: req.body.hospitalDetails.doctorDetails.name,
      //         email: req.body.hospitalDetails.doctorDetails.email,
      //         contactNumber: {
      //             number: req.body.hospitalDetails.doctorDetails.contactNumber.number,
      //             countryCode: req.body.hospitalDetails.doctorDetails.contactNumber.countryCode
      //         },
      //         registrationNo: req.body.hospitalDetails.doctorDetails.registrationNo,
      //         qualification: req.body.hospitalDetails.doctorDetails.qualification,
      //         specialization: req.body.hospitalDetails.doctorDetails.specialization,
      //     },

      //     dateOfAdmission: req.body.hospitalDetails.dateOfAdmission,
      //     timeOfAdmission: req.body.hospitalDetails.timeOfAdmission,
      //     emergencyOrPlannedEvent: req.body.hospitalDetails.emergencyOrPlannedEvent,
      //     daysInHospital: req.body.hospitalDetails.daysInHospital,
      //     daysInICU: req.body.hospitalDetails.daysInICU,
      //     roomType: req.body.hospitalDetails.roomType,
      //     chargelist: {
      //         perDayRoomRent: req.body.hospitalDetails.chargelist.perDayRoomRent,
      //         nursing: req.body.hospitalDetails.chargelist.nursing,
      //         costOfInvestigation: req.body.hospitalDetails.chargelist.costOfInvestigation,
      //         icuCharges: req.body.hospitalDetails.chargelist.icuCharges,
      //         otCharges: req.body.hospitalDetails.chargelist.otCharges,
      //         physicianCharge: req.body.hospitalDetails.chargelist.physicianCharge,
      //         professionalFeesSurgeon: req.body.hospitalDetails.chargelist.professionalFeesSurgeon,
      //         costOfImplant: req.body.hospitalDetails.chargelist.costOfImplant,
      //         anesthetist: req.body.hospitalDetails.chargelist.anesthetist,
      //         consumables: req.body.hospitalDetails.chargelist.consumables,
      //         otherHospitalIfAny: req.body.hospitalDetails.chargelist.otherHospitalIfAny,
      //         allIncludingPackage: req.body.hospitalDetails.chargelist.allIncludingPackage,
      //     },
      //     total: req.body.hospitalDetails.total,

      //     anyPastHistory: {
      //         anyChronicIllness: req.body.hospitalDetails.anyPastHistory.anyChronicIllness,
      //         diabetes: {
      //             month: req.body.hospitalDetails.anyPastHistory.diabetes.month,
      //             year: req.body.hospitalDetails.anyPastHistory.diabetes.year,
      //         },
      //         heartDisease: {
      //             month: req.body.hospitalDetails.anyPastHistory.heartDisease.month,
      //             year: req.body.hospitalDetails.anyPastHistory.heartDisease.year,
      //         },
      //         hypertension: {
      //             month: req.body.hospitalDetails.anyPastHistory.hypertension.month,
      //             year: req.body.hospitalDetails.anyPastHistory.hypertension.year,
      //         },
      //         hyperlipidemias: {
      //             month: req.body.hospitalDetails.anyPastHistory.hyperlipidemias.month,
      //             year: req.body.hospitalDetails.anyPastHistory.hyperlipidemias.year,
      //         },
      //         osteoarthritis: {
      //             month: req.body.hospitalDetails.anyPastHistory.osteoarthritis.month,
      //             year: req.body.hospitalDetails.anyPastHistory.osteoarthritis.year,
      //         },
      //         asthmaCOPDBronchitis: {
      //             month: req.body.hospitalDetails.anyPastHistory.asthmaCOPDBronchitis.month,
      //             year: req.body.hospitalDetails.anyPastHistory.asthmaCOPDBronchitis.year,
      //         },
      //         cancer: {
      //             month: req.body.hospitalDetails.anyPastHistory.cancer.month,
      //             year: req.body.hospitalDetails.anyPastHistory.cancer.year,
      //         },
      //         alcoholDragAbuse: {
      //             month: req.body.hospitalDetails.anyPastHistory.alcoholDragAbuse.month,
      //             year: req.body.hospitalDetails.anyPastHistory.alcoholDragAbuse.year,
      //         },
      //         anyHIVOrAilments: {
      //             month: req.body.hospitalDetails.anyPastHistory.anyHIVOrAilments.month,
      //             year: req.body.hospitalDetails.anyPastHistory.anyHIVOrAilments.year,
      //         },
      //         anyOtherAilments: req.body.hospitalDetails.anyPastHistory.anyOtherAilments,

      //     },

      // },

      // formStatus: req.body.formStatus,
      // step: req.body.step,
      ...req.body,
    };

    // //for mongoDB validation.
    var myregexp = /^[0-9a-fA-F]{24}$/;
    const caseIdCheck = req.query.caseId;
    if (!caseIdCheck.match(myregexp)) {
      const error = {
        status: 400,
        message: 'caseId is not valid for mongoDB!',
      };
      throw error;
    }

    const fetchCaseData = await Cases.findById(req.query.caseId);
    if (fetchCaseData.auditTrail.length <= 1) {
      caseData = {
        ...caseData,
        auditTrail: {
          action: 'FormCreation',
          lastDate: new Date(),
          summary: 'PreAuth Creation',
          amount: req.body.hospitalDetails.total,
          documents: [],
        },
      };
    }

    const savedCase = await Cases.findByIdAndUpdate(
      { _id: req.query.caseId },
      { $set: caseData },
      { new: true, multi: true }
    );
    if (savedCase) {
      res.status(200).send({ success: true, data: savedCase });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = UpdateCase;
