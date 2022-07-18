const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reimbursementSchema = new Schema({
    hospitalId: {
        type: String,
        required: true,
    },
    companyDetails: {
        insuranceCompany: {
            type: String,
        },
        tpaCompany: {
            type: String,
        }
    },
    formStatus: {
        type: String,
        required: true,

    },
    active: {
        type: Boolean,
        default: true
    },

    primaryInsured: {
        policyNumber: {
            type: String,
        },
        siAndCertificate: {
            type: String,
        },
        companyAndMAID: {
            type: String,
        },
        companyName: {
            type: String
        },
        employeeNo: {
            type: String
        },
        name: {
            type: String
        },
        address: {
            buildingNumber: {
                type: Number
            },
            area: {
                type: String
            },
            landmark: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            country: {
                type: String
            },
            pinCode: {
                type: Number
            }
        },
        email: {
            type: String
        }
    },

    insuranceHistory: {
        currentMediclaim: {
            checked: {
                type: Boolean,
            },
            companyName: {
                type: String,
            },
            policyNumber: {
                type: String,
            },
            sumInsured: {
                type: Number,
            },
        },
        hospitalizedLastFourYears: {
            checked: {
                type: Boolean,
            },
            date: {
                type: Date,
            },
            diagnosis: {
                type: String,
            },
        },
        previouslyMediclaim: {
            checked: {
                type: Boolean,
            },
            companyName: {
                type: String,
            },
        },
        dateOfCommencement: {
            type: Date,
        },
    },

    personHospitalized: {
        ipdNumber: {
            type: Number,
        },
        name: {
            type: String,
        },
        gender: {
            type: String,
        },
        ageMonth: {
            type: Number,
        },
        ageYear: {
            type: Number,
        },
        dateOfBirth: {
            type: Date,
        },
        healthId: {
            type: String,
        },
        relationship: {
            relationship: {
                type: String,
            },
            inCaseOther: {
                type: String,
            },
        },

        occupation: {
            occupation: {
                type: String,
            },
            inCaseOther: {
                type: String,
            },
        },

        address: {
            diffrentFromPrimary: {
                type: Boolean,
            },
            buildingNumber: {
                type: Number,
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

        email: {
            type: String,
        },
    },

    hospitalization: {
        hospitalName: {
            type: String,
        },
        roomCatagory: {
            type: String,
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
                }
            },
            injury: {
                occur: {
                    type: String,
                }
            },
            accident: {
                inCaseOfAccident: {
                    checked: {
                        type: Boolean,
                    },
                    dateOfInjury: {
                        type: Date,
                    },
                    reportedToPolice: {
                        checked: {
                            type: Boolean,
                        },
                        firNumber: {
                            type: String,
                        },
                    }
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
            }
        },

        dateInjuryAndDiseaseAndDelivery: {
            type: Date,
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
                }
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

        dateOfAdmition: {
            type: Date,
        },
        timeofAdmition: {
            type: String,
        },

        dateOfDischarge: {
            type: Date,
        },
        timeofDischarge: {
            type: String,
        },

        systemOfMedicine: {
            type: String,
        }
    },

    claim: {
        treatmentClaimedExpenses: {
            preHospitalaization: {
                type: Number
            },
            hospitalizationExpense: {
                type: Number
            },
            postHospitalaization: {
                type: Number
            },
            healthCheckupCost: {
                type: Number
            },
            ambulanceCharges: {
                type: Number
            },
            otherCharges: {
                type: Number
            },
            otherChargesCode: {
                type: String
            },
            total: {
                type: Number
            }
        },

        preHospitalizationPeriod: {
            type: Number
        },
        postHospitalizationPeriod: {
            type: Number
        },
        claimForDomiciliary: {
            type: Boolean
        },

        caseBenifitLumpSum: {
            hospitalDailycash: {
                type: Number
            },
            surgicalCash: {
                type: Number
            },
            criticalIllnessbenifit: {
                type: Number
            },
            convalescence: {
                type: Number
            },
            prePostLumpSumBenifit: {
                type: Number
            },
            otherCharges: {
                type: Number
            },
            otherChargesCode: {
                type: String
            },
            total: {
                type: Number
            }
        }
    },

    claimDocumentCheclist: {
        documentChecklist: {
            type: Array
        },
        inCaseOthers: {
            type: String
        }
    },

    detailsOfBills: {
        bill1: {
            billNumber: {
                type: String
            },
            billDate: {
                type: String
            },
            issuedBy: {
                type: String
            },
            towards: {
                type: String
            },
            amount: {
                type: Number
            }
        },

        bill2: {
            billNumber: {
                type: String
            },
            billDate: {
                type: String
            },
            issuedBy: {
                type: String
            },
            towards: {
                type: String
            },
            amount: {
                type: Number
            }
        },
        bill3: {
            billNumber: {
                type: String
            },
            billDate: {
                type: String
            },
            issuedBy: {
                type: String
            },
            towards: {
                type: String
            },
            amount: {
                type: Number
            }
        },
        bill4: {
            billNumber: {
                type: String
            },
            billDate: {
                type: String
            },
            issuedBy: {
                type: String
            },
            towards: {
                type: String
            },
            amount: {
                type: Number
            }
        },
        bill5: {
            billNumber: {
                type: String
            },
            billDate: {
                type: String
            },
            issuedBy: {
                type: String
            },
            towards: {
                type: String
            },
            amount: {
                type: Number
            }
        },
        bill6: {
            billNumber: {
                type: String
            },
            billDate: {
                type: String
            },
            issuedBy: {
                type: String
            },
            towards: {
                type: String
            },
            amount: {
                type: Number
            }
        },
        bill7: {
            billNumber: {
                type: String
            },
            billDate: {
                type: String
            },
            issuedBy: {
                type: String
            },
            towards: {
                type: String
            },
            amount: {
                type: Number
            }
        },
        bill8: {
            billNumber: {
                type: String
            },
            billDate: {
                type: String
            },
            issuedBy: {
                type: String
            },
            towards: {
                type: String
            },
            amount: {
                type: Number
            }
        },
        bill9: {
            billNumber: {
                type: String
            },
            billDate: {
                type: String
            },
            issuedBy: {
                type: String
            },
            towards: {
                type: String
            },
            amount: {
                type: Number
            }
        },
        bill10: {
            billNumber: {
                type: String
            },
            billDate: {
                type: String
            },
            issuedBy: {
                type: String
            },
            towards: {
                type: String
            },
            amount: {
                type: Number
            }
        },
    },

    primaryInsuredBankAccount: {
        accountHolder: {
            type: String
        },
        accountNumber: {
            type: Number
        },
        bankName: {
            type: String
        },
        branchNameAndAddress: {
            type: String
        },
        accountType: {
            type: String
        },
        micrNumber: {
            type: String
        },
        ifcCode: {
            type: String
        },
        pan: {
            type: String
        },
        checkAndDD: {
            type: String
        }
    },


},
    { timestamps: true }
);
const reimbursement = mongoose.model("reimbursement", reimbursementSchema);

module.exports = reimbursement;