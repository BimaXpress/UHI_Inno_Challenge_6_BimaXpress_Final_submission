const preAuthMessage = [
    { 
        name:"patientDetailsName",
        error: "Patient Name is Required"
    },
    { 
        name:"patientDetailsGender",
        error: "Patient Gender is Required"
    },
    { 
        name:"patientDetailsDateOfBirth",
        error: "Patient Date of Birth is Required"
    },
    { 
        name:"patientDetailsAgeMonth",
        error: "Patient Age(Month) is Required"
    },
    { 
        name:"patientDetailsAgeYear",
        error: "Patient Age(Year) is Required"
    },
    { 
        name:"patientDetailsContactNumber",
        error: "Patient Contact Number is Required"
    },
    { 
        name:"patientDetailsPolicyNumber",
        error: "Patient Policy Number is Required"
    },
    { 
        name:"hospitalDetailsDoctorDetailsName",
        error: "Doctor Name is Required"
    },
    { 
        name:"hospitalDetailsDoctorDetailsEmail",
        error: "Doctor Email is Required"
    },
    { 
        name:"patientDetailsProposedLineOfTreatment",
        error: "Proposed Line Of Treatment is Required"
    },
    { 
        name:"hospitalDetailsDateOfAdmission",
        error: "Date Of Admission is Required"
    },
    { 
        name:"hospitalDetailsEmergencyOrPlannedEvent",
        error: "Emergency Or PlannedEvent is Required"
    },
    { 
        name:"hospitalDetailsDaysInHospital",
        error: "Number Of Days in Hospital is Required"
    },
    { 
        name:"hospitalDetailsRoomType",
        error: "Room Type is Required"
    },
    { 
        name:"hospitalDetailsTotal",
        error: "Total Charge is Required"
    },
]

module.exports = preAuthMessage ;
