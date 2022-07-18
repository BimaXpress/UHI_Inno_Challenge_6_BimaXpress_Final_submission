const { Cases } = require("../../../../models/mongoose");
const createError = require("http-errors");
const CompanyList = require("../../../../utils/insuranceCompany");
const preAuthMessage = require("../../../../utils/preAuthMessage");

const GetPreAuthForm = async (req, res, next) => {
  try {
    var myregexp = /^[0-9a-fA-F]{24}$/;
    const caseId = req.query.caseId;

    if (!caseId || !caseId.match(myregexp)) {
      const error = {
        status: 400,
        message: "caseId is not valid!",
      };
      throw error;
    }

    const caseData = await Cases.findById({
      _id: caseId,
    });

    if (!caseData) {
      const error = {
        status: 404,
        message: "case data not found",
      };
      throw error;
    }

    if (!caseData.companyDetails.tpaCompany && !caseData.companyDetails.insuranceCompany) {
      const error = {
        status: 404,
        message: "insurace company or tpa company is required",
      };
      throw error;
    }

    var companyName = "";
    if (!caseData.companyDetails.tpaCompany) {
      companyName = caseData.companyDetails.insuranceCompany;
    } else {
      companyName = caseData.companyDetails.tpaCompany;
    }
    console.log("companay name  ", companyName);
    const companyObject = CompanyList.filter((obj) => {
      if (obj.name === companyName) {
        return obj;
      }
    });
    const templateName = companyObject[0].template;


    const preAuthCaseData = {
      // companyDetails
      companyDetailsInsuranceCompany:
        caseData.companyDetails.insuranceCompany || "",
      companyDetailsTpaCompany: caseData.companyDetails.tpaCompany || "",

      //patientDetails
      patientDetailsName: caseData.patientDetails.name || "",
      patientDetailsGender: caseData.patientDetails.gender || "",

      patientDetailsDateOfBirth:
        caseData.patientDetails.dateOfBirth.toLocaleDateString("en-GB") || "",
      patientDetailsAgeMonth: String(caseData.patientDetails.ageMonth) || "",
      patientDetailsAgeYear: String(caseData.patientDetails.ageYear) || "",
      patientDetailsIpdPatientNumber:
        caseData.patientDetails.ipdPatientNumber || "",
      patientDetailsOccupation: caseData.patientDetails.occupation || "",
      patientDetailsContactNumber:
        String(caseData.patientDetails.contactNumber.number) || "",

      patientDetailsContactNumberCountryCode:
        caseData.patientDetails.contactNumber.countryCode || "",
      patientDetailsContactNumberRelativeContactNumber:
        String(caseData.patientDetails.relativeContactNumber.number) || "",
      patientDetailsContactNumberRelativeContactNumberCountryCode:
        caseData.patientDetails.relativeContactNumber.countryCode || "",

      patientDetailsHealthId: String(caseData.patientDetails.healthId) || "",
      patientDetailsPolicyNumber:
        String(caseData.patientDetails.policyNumber) || "",
      patientDetailsEmployeeId:
        String(caseData.patientDetails.employeeId) || "",
      patientDetailsNatureOfIllness:
        caseData.patientDetails.natureOfIllness || "",
      patientDetailsDurationOfPresentAilments:
        String(caseData.patientDetails.durationOfPresentAilments) || "",
      patientDetailsDateOfFirstConsultation:
        caseData.patientDetails.dateOfFirstConsultation.toLocaleDateString(
          "en-GB"
        ) || "",
      patientDetailsAilmentAsPerUser:
        caseData.patientDetails.ailmentAsPerUser || "",
      patientDetailsCauseOfAilment:
        caseData.patientDetails.causeOfAilment || "",
      patientDetailsProvisionDiagnosis:
        caseData.patientDetails.provisionDiagnosis || "",
      patientDetailsPastHistoryOfPresentAilments:
        caseData.patientDetails.pastHistoryOfPresentAilments || "",
      patientDetailsIcdCode: String(caseData.patientDetails.icdCode) || "",
      patientDetailsProposedLineOfTreatment:
        caseData.patientDetails.proposedLineOfTreatment || "",
      patientDetailsIfInvestigationOrMedicalManagement:
        caseData.patientDetails.ifInvestigationOrMedicalManagement || "",
      patientDetailsRouteOfDrugAdministration:
        caseData.patientDetails.routeOfDrugAdministration || "",
      patientDetailsSurgicalNameofSurgery:
        caseData.patientDetails.surgicalNameofSurgery || "",
      patientDetailsIcdCode10Pcs:
        String(caseData.patientDetails.icdCode10Pcs) || "",

      patientDetailsReleventClinicChecked:
        caseData.patientDetails.relevantClinic.checked || "",
      patientDetailsReleventClinicMaternityMaternity:
        caseData.patientDetails.relevantClinic.maternity.maternity || "",

      patientDetailsReleventClinicMaternityExpectedDateOfDelivery:
        caseData?.patientDetails?.relevantClinic?.maternity?.expectedDateOfDelivery?.toLocaleDateString(
          "en-GB"
        ) || "",

      patientDetailsReleventClinicInjuryOccur:
        caseData.patientDetails.relevantClinic.injury.occur || "",
      patientDetailsReleventClinicAccidentInCaseOfAccidentChecked:
        caseData.patientDetails.relevantClinic.accident.inCaseOfAccident
          .checked || "",
      patientDetailsReleventClinicAccidentInCaseOfAccidentDateOfInjury:
        caseData?.patientDetails?.relevantClinic?.injury?.dateOfInjury?.toLocaleDateString(
          "en-GB"
        ) || "",

      patientDetailsReleventClinicAccidentInCaseOfAccidentReportedToPoliceChecked:
        caseData.patientDetails.relevantClinic.accident.inCaseOfAccident
          .reportedToPolice.checked || "",
      patientDetailsReleventClinicAccidentInCaseOfAccidentReportedToPoliceFirNumber:
        caseData.patientDetails.relevantClinic.accident.inCaseOfAccident
          .reportedToPolice.firNumber || "",

      patientDetailsReleventClinicAccidentAlcoholConsumption:
        caseData.patientDetails.relevantClinic.accident.alcoholConsumption ||
        "",
      patientDetailsReleventClinicAccidentTestConducted:
        caseData.patientDetails.relevantClinic.accident.testConducted || "",
      patientDetailsReleventClinicAccidentIsItRTA:
        caseData.patientDetails.relevantClinic.accident.isItRTA || "",
      patientDetailsReleventClinicOtherOtherDetails:
        caseData.patientDetails.relevantClinic.other.otherDetails || "",

      patientDetailsIfOtherTreatment:
        caseData.patientDetails.ifOtherTreatment || "",
      patientDetailsHealthInsuranceChecked:
        caseData.patientDetails.healthInsurance.checked || "",
      patientDetailsHealthInsuranceCompanyName:
        caseData.patientDetails.healthInsurance.companyName || "",
      patientDetailsHealthInsuranceDetails:
        caseData.patientDetails.healthInsurance.details || "",
      patientDetailsPhysicianChecked:
        caseData.patientDetails.physician.checked || "",
      patientDetailsPhysicianName: caseData.patientDetails.physician.name || "",
      patientDetailsPhysicianContactNumber:
        String(caseData.patientDetails.physician.contactNumber.number) || "",
      patientDetailsPhysicianContactNumberCountryCode:
        caseData.patientDetails.physician.contactNumber.countryCode || "",

      fullAddress:
        String(caseData.patientDetails.currentAddress.buildingNumber) +
        " " +
        caseData.patientDetails.currentAddress.area +
        " " +
        caseData.patientDetails.currentAddress.landmark +
        " " +
        caseData.patientDetails.currentAddress.city +
        "," +
        caseData.patientDetails.currentAddress.state +
        "," +
        caseData.patientDetails.currentAddress.country +
        "," +
        caseData.patientDetails.currentAddress.pinCode,

      patientDetailsCurrentAddressBuildingNumber:
        caseData.patientDetails.currentAddress.buildingNumber || "",
      patientDetailsCurrentAddressArea:
        caseData.patientDetails.currentAddress.area || "",
      patientDetailsCurrentAddressLandmark:
        caseData.patientDetails.currentAddress.landmark || "",
      patientDetailsCurrentAddressCity:
        caseData.patientDetails.currentAddress.city || "",
      patientDetailsCurrentAddressState:
        caseData.patientDetails.currentAddress.state || "",
      patientDetailsCurrentAddressCountry:
        caseData.patientDetails.currentAddress.country || "",
      patientDetailsCurrentAddressPinCode:
        caseData.patientDetails.currentAddress.pinCode || "",

      //message hospital Details
      hospitalDetailsName: caseData.hospitalDetails.name || "",
      hospitalDetailsEmail: caseData.hospitalDetails.email || "",

      hospitalFullAddress:
        String(caseData.hospitalDetails.currentAddress.buildingNumber) +
        " " +
        caseData.hospitalDetails.currentAddress.area +
        " " +
        caseData.hospitalDetails.currentAddress.landmark +
        " " +
        caseData.hospitalDetails.currentAddress.city +
        "," +
        caseData.hospitalDetails.currentAddress.state +
        "," +
        caseData.hospitalDetails.currentAddress.country +
        "," +
        caseData.hospitalDetails.currentAddress.pinCode,

      hospitalDetailsCurrentAddressBuildingNumber:
        String(caseData.hospitalDetails.currentAddress.buildingNumber) || "",
      hospitalDetailsCurrentAddressArea:
        caseData.hospitalDetails.currentAddress.area || "",
      hospitalDetailsCurrentAddressLandmark:
        caseData.hospitalDetails.currentAddress.landmark || "",
      hospitalDetailsCurrentAddressCity:
        caseData.hospitalDetails.currentAddress.city || "",
      hospitalDetailsCurrentAddressState:
        caseData.hospitalDetails.currentAddress.state || "",
      hospitalDetailsCurrentAddressCountry:
        caseData.hospitalDetails.currentAddress.country || "",
      hospitalDetailsCurrentAddressPinCode:
        caseData.hospitalDetails.currentAddress.pinCode || "",

      hospitalDetailsRohiniId: caseData.hospitalDetails.rohiniCode || "",



      //message Doctor Details 
      hospitalDetailsDoctorDetailsName:
        caseData.hospitalDetails?.doctorDetails?.name || "",
      hospitalDetailsDoctorDetailsEmail:
        caseData.hospitalDetails?.doctorDetails?.email || "",

      hospitalDetailsDoctorDetailsContactNumber:
        String(caseData.hospitalDetails.doctorDetails.contactNumber.number) ||
        "",
      hospitalDetailsDoctorDetailsContactNumberCountryCode:
        caseData.hospitalDetails.doctorDetails.contactNumber.countryCode || "",
      hospitalDetailsDoctorDetailsQualification:
        caseData.hospitalDetails.doctorDetails.qualification || "",
      hospitalDetailsDoctorDetailsRegistrationNo:
        String(caseData.hospitalDetails.doctorDetails.registrationNo) || "",
      hospitalDetailsDoctorDetailsSpecialization:
        caseData.hospitalDetails.doctorDetails.specialization || "",

      hospitalDetailsDateOfAdmission:
        caseData.hospitalDetails.dateOfAdmission.toLocaleDateString("en-GB") ||
        "",
      hospitalDetailsTimeOfAdmission:
        caseData.hospitalDetails.timeOfAdmission || "",

      hospitalDetailsEmergencyOrPlannedEvent:
        caseData.hospitalDetails.emergencyOrPlannedEvent || "",
      hospitalDetailsDaysInHospital:
        String(caseData.hospitalDetails.daysInHospital) || "",
      hospitalDetailsDaysInICU:
        String(caseData.hospitalDetails.daysInICU) || "",
      hospitalDetailsRoomType: caseData.hospitalDetails.roomType || "",

      // message charges list

      hospitalDetailsChargeListPerDayRoomRent:
        caseData.hospitalDetails.chargelist.perDayRoomRent || "",
      hospitalDetailsChargeListNursing:
        caseData.hospitalDetails.chargelist.nursing || "",
      hospitalDetailsChargeListCostOfInvestigation:
        caseData.hospitalDetails.chargelist.costOfInvestigation || "",
      hospitalDetailsChargeListIcuCharges:
        caseData.hospitalDetails.chargelist.icuCharges || "",
      hospitalDetailsChargeListOtCharges:
        caseData.hospitalDetails.chargelist.otCharges || "",
      hospitalDetailsChargeListPhysicianCharge:
        caseData.hospitalDetails.chargelist.physicianCharge || "",
      hospitalDetailsChargeListProfessionalFeesSurgeon:
        caseData.hospitalDetails.chargelist.professionalFeesSurgeon || "",
      hospitalDetailsChargeListCostOfImplant:
        caseData.hospitalDetails.chargelist.costOfImplant || "",
      hospitalDetailsChargeListAnesthetist:
        caseData.hospitalDetails.chargelist.anesthetist || "",
      hospitalDetailsChargeListConsumables:
        caseData.hospitalDetails.chargelist.consumables || "",
      hospitalDetailsChargeListOtherHospitalIfAny:
        caseData.hospitalDetails.chargelist.otherHospitalIfAny || "",
      hospitalDetailsChargeListAllIncludingPackage:
        caseData.hospitalDetails.chargelist.allIncludingPackage || "",

      hospitalDetailsTotal: caseData.hospitalDetails.total || "",

      hospitalDetailsanyPastHistory:
        caseData.hospitalDetails.anyPastHistory || "",

      hospitalDetailsAnyPastHistoryChronicIllness:
        caseData.hospitalDetails.anyPastHistory.anyChronicIllness || "",

      hospitalDetailsAnyPastHistoryDiabetesMonth:
        String(caseData.hospitalDetails.anyPastHistory.diabetes.month) || "",
      hospitalDetailsAnyPastHistoryDiabetesYear:
        String(caseData.hospitalDetails.anyPastHistory.diabetes.year) || "",

      hospitalDetailsAnyPastHistoryHeartDiseaseMonth:
        String(caseData.hospitalDetails.anyPastHistory.heartDisease.month) ||
        "",
      hospitalDetailsAnyPastHistoryHeartDiseaseYear:
        String(caseData.hospitalDetails.anyPastHistory.heartDisease.year) || "",

      hospitalDetailsAnyPastHistoryHypertensionMonth:
        String(caseData.hospitalDetails.anyPastHistory.hypertension.month) ||
        "",
      hospitalDetailsAnyPastHistoryHypertensionYear:
        String(caseData.hospitalDetails.anyPastHistory.hypertension.year) || "",

      hospitalDetailsAnyPastHistoryHyperlipidemiasMonth:
        String(caseData.hospitalDetails.anyPastHistory.hyperlipidemias.month) ||
        "",
      hospitalDetailsAnyPastHistoryHyperlipidemiasYear:
        String(caseData.hospitalDetails.anyPastHistory.hyperlipidemias.year) ||
        "",

      hospitalDetailsAnyPastHistoryOsteoarthritisMonth:
        String(caseData.hospitalDetails.anyPastHistory.osteoarthritis.month) ||
        "",
      hospitalDetailsAnyPastHistoryOsteoarthritisYear:
        String(caseData.hospitalDetails.anyPastHistory.osteoarthritis.year) ||
        "",

      hospitalDetailsAnyPastHistoryAsthmaCOPDBronchitisMonth:
        String(
          caseData.hospitalDetails.anyPastHistory.asthmaCOPDBronchitis.month
        ) || "",
      hospitalDetailsAnyPastHistoryAsthmaCOPDBronchitisYear:
        String(
          caseData.hospitalDetails.anyPastHistory.asthmaCOPDBronchitis.year
        ) || "",

      hospitalDetailsAnyPastHistoryCancerMonth:
        String(caseData.hospitalDetails.anyPastHistory.cancer.month) || "",
      hospitalDetailsAnyPastHistoryCancerYear:
        String(caseData.hospitalDetails.anyPastHistory.cancer.year) || "",

      hospitalDetailsAnyPastHistoryAlcoholDragAbuseMonth:
        String(
          caseData.hospitalDetails.anyPastHistory.alcoholDragAbuse.month
        ) || "",
      hospitalDetailsAnyPastHistoryAlcoholDragAbuseYear:
        String(caseData.hospitalDetails.anyPastHistory.alcoholDragAbuse.year) ||
        "",

      hospitalDetailsAnyPastHistoryAnyHIVOrAilmentsMonth:
        String(
          caseData.hospitalDetails.anyPastHistory.anyHIVOrAilments.month
        ) || "",
      hospitalDetailsAnyPastHistoryAnyHIVOrAilmentsYear:
        String(caseData.hospitalDetails.anyPastHistory.anyHIVOrAilments.year) ||
        "",

      hospitalDetailsAnyPastHistoryAnyOtherAilments:
        caseData.hospitalDetails.anyPastHistory.anyOtherAilments || "",
    };

    const requiredPreAuthData = [
      'patientDetailsName',
      'patientDetailsGender',
      'patientDetailsDateOfBirth',
      'patientDetailsAgeMonth',
      'patientDetailsAgeYear',
      'patientDetailsContactNumber',
      'patientDetailsPolicyNumber',
      'hospitalDetailsDoctorDetailsName',
      'hospitalDetailsDoctorDetailsEmail',
      'patientDetailsProposedLineOfTreatment',
      'hospitalDetailsDateOfAdmission',
      'hospitalDetailsTimeOfAdmission',
      'hospitalDetailsEmergencyOrPlannedEvent',
      'hospitalDetailsDaysInHospital',
      'hospitalDetailsRoomType',
      'hospitalDetailsTotal',
    ]

    requiredPreAuthData.map((key) => {
      if (!preAuthCaseData[`${key}`]) {
        const errorMessage = preAuthMessage.filter((obj) => {
          if (obj.name === key) {
            return obj
          }
        })
        console.log("--------->", errorMessage);
        const error = {
          message: `${errorMessage[0]?.error}`,
          status: 400,
        };
        throw error;
      }
    });

    res.render(`${templateName}`, preAuthCaseData);
  } catch (error) {
    next(error);
  }
};

module.exports = GetPreAuthForm;
