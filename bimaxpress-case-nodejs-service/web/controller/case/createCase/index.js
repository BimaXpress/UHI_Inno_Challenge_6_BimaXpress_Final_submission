const { Cases } = require('../../../../models/mongoose');
const createError = require('http-errors');

const CreateCase = async (req, res, next) => {
  console.log(
    'req.body.patientDetails.currentAddress.buildingNumber',
    req.body.patientDetails.currentAddress.buildingNumber
  );
  try {
    const hospitalId = req.body.hospitalId;
    if (!hospitalId) {
      const error = {
        error: true,
        status: 400,
        message: 'hospitalId is required',
      };
      throw error;
    }
    var myregexp = /^[0-9a-fA-F]{24}$/;
    if (!hospitalId.match(myregexp)) {
      const error = {
        status: 400,
        message: 'hospitalId is not valid for mongoDB!',
      };
      throw error;
    }

    if (!req.body.companyDetails) {
      const error = {
        status: 400,
        message: 'companyDetails required.',
      };
      throw error;
    }

    if (
      !req.body.companyDetails.insuranceCompany &&
      !req.body.companyDetails.tpaCompany
    ) {
      const error = {
        error: true,
        status: 400,
        message: 'Enter atleast one insuranceCompany or tpaCompany.',
      };
      throw error;
    }

    //for physician
    let physicianNumber, physicianCountryCode;
    if (req.body.patientDetails.physician.checked) {
      (physicianNumber =
        req.body.patientDetails.physician.contactNumber.number),
        (physicianCountryCode =
          req.body.patientDetails.physician.contactNumber.countryCode);
    }

    const caseData = new Cases({
      hospitalId: req.body.hospitalId,
      companyDetails: {
        insuranceCompany: req.body.companyDetails.insuranceCompany,
        insuranceCompanyEmail: req.body.companyDetails.insuranceCompanyEmail,
        tpaCompany: req.body.companyDetails.tpaCompany,
        tpaCompanyEmail: req.body.companyDetails.tpaCompanyEmail,
      },
      patientDetails: {
        name: req.body.patientDetails.name,
        gender: req.body.patientDetails.gender,
        dateOfBirth: req.body.patientDetails.dateOfBirth,
        ageMonth: req.body.patientDetails.ageMonth,
        ageYear: req.body.patientDetails.ageYear,
        ipdPatientNumber: req.body.patientDetails.ipdPatientNumber,
        occupation: req.body.patientDetails.occupation,
        contactNumber: {
          number: req.body.patientDetails.contactNumber.number,
          countryCode: req.body.patientDetails.contactNumber.countryCode,
        },
        relativeContactNumber: {
          number: req.body.patientDetails.contactNumber.number,
          countryCode: req.body.patientDetails.contactNumber.countryCode,
        },
        healthId: req.body.patientDetails.healthId,
        policyNumber: req.body.patientDetails.policyNumber,
        employeeId: req.body.patientDetails.employeeId,

        healthInsurance: {
          checked: req.body.patientDetails.healthInsurance.checked,
          companyName: req.body.patientDetails.healthInsurance.companyName,
          details: req.body.patientDetails.healthInsurance.details,
        },

        physician: {
          checked: req.body.patientDetails.physician.checked,

          name: req.body.patientDetails.physician.name,
          contactNumber: {
            number: physicianNumber,
            countryCode: physicianCountryCode,
          },
        },

        currentAddress: {
          buildingNumber:
            req?.body?.hospitalDetails?.currentAddress?.buildingNumber,
          area: req?.body?.hospitalDetails?.currentAddress?.area,
          landmark: req?.body?.hospitalDetails?.currentAddress?.landmark,
          city: req?.body?.hospitalDetails?.currentAddress?.city,
          state: req?.body?.hospitalDetails?.currentAddress?.state,
          country: req?.body?.hospitalDetails?.currentAddress?.country,
          pinCode: req?.body?.hospitalDetails?.currentAddress?.pinCode,
        },
      },
      hospitalDetails: {
        name: req.body.hospitalDetails.name,
        email: req.body.hospitalDetails.email,
        currentAddress: {
          buildingNumber:
            req?.body?.hospitalDetails?.currentAddress?.buildingNumber,
          area: req?.body?.hospitalDetails?.currentAddress?.area,
          landmark: req?.body?.hospitalDetails?.currentAddress?.landmark,
          city: req?.body?.hospitalDetails?.currentAddress?.city,
          state: req?.body?.hospitalDetails?.currentAddress?.state,
          country: req?.body?.hospitalDetails?.currentAddress?.country,
          pinCode: req?.body?.hospitalDetails?.currentAddress?.pinCode,
        },
        contactNumber: {
          number: req.body.patientDetails.contactNumber.number,
          countryCode: req.body.patientDetails.contactNumber.countryCode,
        },
        rohiniCode: req.body.hospitalDetails.rohiniCode,
      },

      formStatus: req.body.formStatus,
      step: req.body.step,
      auditTrail: {
        action: 'FormCreation',
        lastDate: new Date(),
        summary: 'PreAuth Creation',
        amount: 0,
        documents: [],
      },
    });

    const savedCase = await caseData.save();
    if (savedCase) {
      res.status(200).send({
        success: true,
        code: 200,
        savedCase: savedCase,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = CreateCase;
