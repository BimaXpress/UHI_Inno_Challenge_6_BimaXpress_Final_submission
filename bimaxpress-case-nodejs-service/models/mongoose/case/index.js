const boolean = require('@hapi/joi/lib/types/boolean');
const date = require('@hapi/joi/lib/types/date');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseSchema = new Schema(
  {
    hospitalId: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    companyDetails: {
      insuranceCompany: {
        type: String,
      },
      insuranceCompanyEmail: {
        type: String,
      },
      tpaCompany: {
        type: String,
      },
      tpaCompanyEmail: {
        type: String,
      },
    },

    patientDetails: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      gender: {
        type: String,
      },
      dateOfBirth: {
        type: Date,
      },
      ageMonth: {
        type: Number,
      },
      ageYear: {
        type: Number,
      },
      ipdPatientNumber: {
        type: String,
      },
      occupation: {
        type: String,
      },
      contactNumber: {
        number: {
          type: Number,
        },
        countryCode: {
          type: String,
        },
      },
      relativeContactNumber: {
        number: {
          type: Number,
        },
        countryCode: {
          type: String,
        },
      },
      healthId: {
        type: String,
      },
      policyNumber: {
        type: String,
      },
      employeeId: {
        type: String,
      },
      natureOfIllness: {
        type: String,
      },
      durationOfPresentAilments: {
        type: Number,
      },
      dateOfFirstConsultation: {
        type: Date,
      },
      ailmentAsPerUser: {
        type: String,
      },
      causeOfAilment: {
        type: String,
      },
      provisionDiagnosis: {
        type: String,
      },
      pastHistoryOfPresentAilments: {
        type: String,
      },
      icdCode: {
        type: Number,
      },
      proposedLineOfTreatment: {
        type: Array,
      },
      ifInvestigationOrMedicalManagement: {
        type: String,
      },
      routeOfDrugAdministration: {
        type: String,
      },
      surgicalNameofSurgery: {
        type: String,
      },
      icdCode10Pcs: {
        type: Number,
      },

      relevantClinic: {
        checked: {
          type: String,
        },
        maternity: {
          maternity: {
            type: Array,
          },
          expectedDateOfDelivery: {
            type: Date,
          },
        },
        injury: {
          occur: {
            type: String,
          },
          dateOfInjury: {
            type: Date,
          },
        },
        accident: {
          inCaseOfAccident: {
            checked: {
              type: Boolean,
            },

            reportedToPolice: {
              checked: {
                type: Boolean,
              },
              firNumber: {
                type: String,
              },
            },
          },
          alcoholConsumption: {
            type: Boolean,
          },
          testConducted: {
            type: Boolean,
          },
          isItRTA: {
            type: Boolean,
          },
        },
        other: {
          otherDetails: {
            type: String,
          },
        },
      },

      ifOtherTreatment: {
        type: String,
      },
      healthInsurance: {
        checked: {
          type: Boolean,
        },
        companyName: {
          type: String,
        },
        details: {
          type: String,
        },
      },
      physician: {
        checked: {
          type: Boolean,
        },
        name: {
          type: String,
        },
        contactNumber: {
          number: {
            type: Number,
          },
          countryCode: {
            type: String,
          },
        },
      },
      currentAddress: {
        buildingNumber: {
          type: String,
        },
        area: {
          type: String,
        },
        landmark: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        pinCode: {
          type: Number,
        },
      },
    },

    hospitalDetails: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      currentAddress: {
        buildingNumber: {
          type: String,
        },
        area: {
          type: String,
        },
        landmark: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        pinCode: {
          type: Number,
        },
      },
      contactNumber: {
        number: {
          type: Number,
        },
        countryCode: {
          type: String,
        },
      },
      rohiniCode: {
        type: String,
      },
      doctorDetails: {
        name: {
          type: String,
        },
        email: {
          type: String,
        },
        contactNumber: {
          number: {
            type: Number,
          },
          countryCode: {
            type: String,
          },
        },
        registrationNo: {
          type: String,
        },
        qualification: {
          type: String,
        },
        specialization: {
          type: String,
        },
      },
      dateOfAdmission: {
        type: Date,
      },
      timeOfAdmission: {
        type: String,
      },
      emergencyOrPlannedEvent: {
        type: String,
      },
      daysInHospital: {
        type: Number,
      },
      daysInICU: {
        type: Number,
      },
      roomType: {
        type: String,
      },

      numberOfVisit: {
        type: Number,
      },
      roomNumber: {
        type: Number,
      },
      bedNumber: {
        type: Number,
      },

      chargelist: {
        perDayRoomRent: {
          type: Number,
        },
        nursing: {
          type: Number,
        },
        costOfInvestigation: {
          type: Number,
        },
        icuCharges: {
          type: Number,
        },
        otCharges: {
          type: Number,
        },
        physicianCharge: {
          type: Number,
        },
        professionalFeesSurgeon: {
          type: Number,
        },
        costOfImplant: {
          type: Number,
        },
        anesthetist: {
          type: Number,
        },
        consumables: {
          type: Number,
        },
        otherHospitalIfAny: {
          type: Number,
        },
        allIncludingPackage: {
          type: Number,
        },
      },
      total: {
        type: Number,
      },
      anyPastHistory: {
        anyChronicIllness: {
          type: Boolean,
        },
        diabetes: {
          month: {
            type: Number,
          },
          year: {
            type: Number,
          },
        },
        heartDisease: {
          month: {
            type: Number,
          },
          year: Number,
        },
        hypertension: {
          month: {
            type: Number,
          },
          year: {
            type: Number,
          },
        },
        hyperlipidemias: {
          month: {
            type: Number,
          },
          year: {
            typr: Number,
          },
        },
        osteoarthritis: {
          month: {
            type: Number,
          },
          year: {
            type: Number,
          },
        },
        asthmaCOPDBronchitis: {
          month: {
            type: Number,
          },
          year: {
            type: Number,
          },
        },
        cancer: {
          month: {
            type: Number,
          },
          year: {
            type: Number,
          },
        },
        alcoholDragAbuse: {
          month: {
            type: Number,
          },
          year: {
            type: Number,
          },
        },
        anyHIVOrAilments: {
          month: {
            type: Number,
          },
          year: {
            type: Number,
          },
        },
        anyOtherAilments: {
          type: String,
        },
        causeOfAilment: {
          type: String,
        },
      },
    },

    formStatus: {
      type: String,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
    claimNo: {
      type: String,
    },
    auditTrail: {
      type: Array,

      action: {
        type: String,
      },
      lastDate: {
        type: Date,
      },
      summary: {
        type: String,
      },
      amount: {
        type: Number,
      },
      documents: {
        type: Array,
      },
    },
  },
  { timestamps: true }
);

const Cases = mongoose.model('cases', CaseSchema);

module.exports = Cases;
