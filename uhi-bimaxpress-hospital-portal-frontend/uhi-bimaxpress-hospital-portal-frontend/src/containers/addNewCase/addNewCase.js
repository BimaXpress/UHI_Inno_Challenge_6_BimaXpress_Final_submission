import React, { useEffect, useState } from 'react';
import axiosConfig from '../../config/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import style from './addNewCase.module.css';

import ProgessBar from './components/progessBar/progessBar';
import SharedButton from '../shared/button';
import notification from '../shared/notification';

import DetailsOfTpa from './components/detailsOfTpa';
import PatientDetails from './components/patientDetails';
import DoctorAndDiagnosisDetails from './components/doctorAndDiagnosisDetails';
import AdmissionDetails from './components/admissionDetails';
import DocumentModal from './components/documentsModal';
import SendMailModal from './components/sendMailModal';
import RateListModal from './components/rateListModal';
import { Popconfirm } from 'antd';

const months = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
];

const AddNewCase = (props) => {
  const param = useParams();

  const { setSharedLoaderActivity } = props;

  const { userDetails } = props.state;

  const [opendocumentModal, setOpenDocumentModal] = useState(false);
  const toggleOpenDocumentModal = () => {
    setOpenDocumentModal((pre) => !pre);
  };

  const [openRatelistModal, setOpenRatelistModal] = useState(false);

  const toggleOpenRatelistModal = () => {
    setOpenRatelistModal((pre) => !pre);
  };

  const [openSendMailModal, setOpenSendMailModal] = useState(false);
  const toggleOpenSendMailModal = () => {
    setOpenSendMailModal((pre) => !pre);
  };

  const [step, setStep] = useState(1);
  const [isNewCase, setIsNewCase] = useState(true);

  const [isFreeze, setIsFreeze] = useState(false);

  const [yearList, setYearList] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [doctorDetails, setDoctorDetails] = useState({});

  const [insuranceCompanyList, setInsuranceCompanyList] = useState([]);
  const [insuranceCompanyEmailList, setInsuranceCompanyEmailList] = useState(
    []
  );
  const [tpaList, settpaList] = useState([]);
  const [tpaEmailList, settpaEmailList] = useState([]);

  const [companyDetails, setCompanyDetails] = useState({
    insuranceCompany: '',
    insuranceCompanyEmail: '',
    tpaCompany: '',
    tpaCompanyEmail: '',
  });

  const [hospitalDetails, setHospitalDetails] = useState({
    name: userDetails?.data?.name,
    email: userDetails?.data?.email,
    currentAddress: userDetails?.data?.currentAddress,
    contactNumber: userDetails?.data?.contactNumber,
    rohiniCode: userDetails?.data?.rohiniCode,
    anyPastHistory: {
      anyChronicIllness: false,
    },
  });

  const [patientDetails, setPatientDetails] = useState({
    physician: {
      checked: false,
    },
    healthInsurance: {
      checked: false,
    },
  });

  const [proposedLineOfTreatment, setProposedLineOfTreatment] = useState([]);

  const [updateId, setUpdateId] = useState('');

  const [newcaseData, setNewcaseData] = useState({
    hospitalId: userDetails?.data?._id,
    companyDetails: companyDetails,
    patientDetails: patientDetails,
    hospitalDetails: hospitalDetails,
    formStatus: 'Draft',
    step: step,
  });

  const [stepTwoErrors, setstepTwoErrors] = useState({
    name: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    number: '',
    loanType: '',
    value: '',
    jobType: '',
    requestedAmount: '',
  });

  const [stepThreeErrors, setstepThreeErrors] = useState({
    name: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    number: '',
    loanType: '',
    value: '',
    jobType: '',
    requestedAmount: '',
  });

  const [stepFourErrors, setstepFourErrors] = useState({
    name: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    number: '',
    loanType: '',
    value: '',
    jobType: '',
    requestedAmount: '',
  });

  const checkApplication = () => {
    if (step === 1) {
      if (!companyDetails?.insuranceCompany && !companyDetails?.tpaCompany) {
        notification(
          'warning',
          'Please Select Insurance Company or TPA Company'
        );
        return false;
      }
      if (patientDetails?.name.length < 4) {
        notification('warning', 'Name is Required');
        return false;
      }
      if (!patientDetails?.gender) {
        notification('warning', 'Gender is Required');
        return false;
      }
      if (!patientDetails?.dateOfBirth) {
        notification('warning', 'Date of Birth is Required');
        return false;
      }
      // if (!patientDetails?.ipdPatientNumber) {
      //     notification('warning', 'IPD Patient Number is Required');
      //     return false;
      // }
      // if (!patientDetails?.occupation) {
      //     notification('warning', 'Occupation is Required');
      //     return false;
      // }
      if (!patientDetails?.contactNumber?.number) {
        notification('warning', 'Contact Number is Required');
        return false;
      }
      if (!patientDetails?.healthId) {
        notification('warning', 'healthId is Required');
        return false;
      }
      if (!patientDetails?.currentAddress?.buildingNumber) {
        notification('warning', 'Building Number is Required');
        return false;
      }
      if (!patientDetails?.currentAddress?.area) {
        notification('warning', 'Area is Required');
        return false;
      }
      if (!patientDetails?.policyNumber) {
        notification('warning', 'Policy Number is Required');
        return false;
      }
      if (!patientDetails?.currentAddress?.city) {
        notification('warning', 'City is Required');
        return false;
      }
      if (!patientDetails?.currentAddress?.state) {
        notification('warning', 'State is Required');
        return false;
      }
      if (!patientDetails?.currentAddress?.pinCode) {
        notification('warning', 'Pincode is Required');
        return false;
      }
    }
    if (step === 2) {
      if (!doctorDetails) {
        notification('warning', 'Please select doctor');
        return false;
      }
      if (!patientDetails?.natureOfIllness) {
        notification(
          'warning',
          'Nature Of Illness / Disease With Presenting Complaints is Required'
        );
        return false;
      }
      if (!patientDetails?.dateOfFirstConsultation) {
        notification('warning', 'Date Of First Consultation is Required');
        return false;
      }
      if (proposedLineOfTreatment.length === 0) {
        notification('warning', 'Proposed Line Of Treatment is Required');
        return false;
      }
      if (!patientDetails?.routeOfDrugAdministration) {
        notification('warning', 'Route Of Drug Administration is Required');
        return false;
      }
    }
    if (step === 3) {
      if (
        !hospitalDetails?.dateOfAdmission ||
        !hospitalDetails?.timeOfAdmission
      ) {
        notification('warning', 'Date & Time Of Admission is Required');
        return false;
      }
      if (!hospitalDetails?.emergencyOrPlannedEvent) {
        notification('warning', 'Hospitalized Event is Required');
        return false;
      }
      if (!hospitalDetails?.daysInHospital) {
        notification('warning', 'Number Of Days In Hospital is Required');
        return false;
      }
      if (!hospitalDetails?.roomType) {
        notification('warning', 'RoomType is Required');
        return false;
      }
      if (!hospitalDetails?.chargelist?.perDayRoomRent) {
        notification('warning', 'Per Day Room Rent is Required');
        return false;
      }
      if (
        !hospitalDetails?.anyPastHistory?.anyOtherAilments &&
        hospitalDetails?.anyPastHistory?.anyChronicIllness
      ) {
        notification('warning', 'Any Other Ailments is Required');
        return false;
      }
    }
    return true;
  };

  const fetchDraftData = async () => {
    setSharedLoaderActivity(true);
    try {
      const { data } = await axiosConfig.get(
        `${process.env.REACT_APP_CASE_API}/case/getCaseById?caseId=${param?.id}`
      );
      setPatientDetails(data?.data?.patientDetails);
      setHospitalDetails(data?.data?.hospitalDetails);
      setCompanyDetails(data?.data?.companyDetails);
      setProposedLineOfTreatment(
        data?.data?.patientDetails?.proposedLineOfTreatment
      );
      setStep(data?.data?.step);
      setDoctorDetails(data?.data?.hospitalDetails?.doctorDetails);
      setTotalCost(data?.data?.hospitalDetails?.total);
      setIsFreeze(data?.data?.preAuth?.freeze);
      setSharedLoaderActivity(false);
    } catch (e) {
      setSharedLoaderActivity(false);
      notification('error', e.message);
    }
  };

  const fetchLists = async () => {
    setSharedLoaderActivity(true);
    try {
      const insuranceData = await axiosConfig.get(
        `${process.env.REACT_APP_HOSPITAL_API}/insuranceTpa/getInsuranceTpa?type=insurance`
      );
      const tpaData = await axiosConfig.get(
        `${process.env.REACT_APP_HOSPITAL_API}/insuranceTpa/getInsuranceTpa?type=tpa`
      );

      console.log('insurance -------->', insuranceData?.data?.data);
      console.log('tpa --------->', tpaData?.data?.data);

      const insuranceList = insuranceData?.data?.data?.map(({ name }) => ({
        label: name,
        value: name,
      }));

      const insuranceEmailList = insuranceData?.data?.data?.map(
        ({ name, email }) => ({
          name: name,
          email: email,
        })
      );

      const tpaList = tpaData?.data?.data?.map(({ name }) => ({
        label: name,
        value: name,
      }));

      const tpaEmailList = tpaData?.data?.data?.map(({ name, email }) => ({
        name: name,
        email: email,
      }));

      setInsuranceCompanyList(insuranceList);
      setInsuranceCompanyEmailList(insuranceEmailList);
      settpaList(tpaList);
      settpaEmailList(tpaEmailList);

      setSharedLoaderActivity(false);
    } catch (e) {
      setSharedLoaderActivity(false);
      notification('error', e.message);
    }
  };

  console.log('insurance options -----------> ', insuranceCompanyList);
  console.log('TPA options -----------> ', tpaList);

  const fetchDetails = async () => {
    if (!param?.id) {
      setHospitalDetails((pre) => ({
        ...pre,
        name: userDetails?.data?.name,
        email: userDetails?.data?.email,
        currentAddress: userDetails?.data?.currentAddress,
        contactNumber: userDetails?.data?.contactNumber,
        rohiniCode: userDetails?.data?.rohiniCode,
      }));
    } else {
      fetchDraftData();
    }

    let arr = [];
    var date = new Date();
    for (let i = 1900; i <= date.getFullYear(); i++) {
      arr.push({ label: `${i}`, value: `${i}` });
    }
    setYearList(arr);
  };

  useEffect(() => {
    fetchLists();
    fetchDetails();
  }, []);

  function handleChangeStep(nextStep) {
    if (nextStep > step) {
      if (!checkApplication()) {
        return;
      } else {
        setStep(nextStep);
      }
    } else {
      setStep(nextStep);
    }
  }

  function previousTab() {
    setStep((step) => step - 1);
  }

  const saveCaseData = async () => {
    if (!checkApplication()) {
      return;
    } else {
      setSharedLoaderActivity(true);
      console.log('-----------> Call Update API To Save Case Data<----------');

      // setPatientDetails((pre) => ({
      //     ...pre,
      //     proposedLineOfTreatment: proposedLineOfTreatment
      // }))

      const updateData = {
        hospitalId: userDetails?.data?._id,
        companyDetails: companyDetails,
        patientDetails: {
          ...patientDetails,
          proposedLineOfTreatment: proposedLineOfTreatment,
        },
        hospitalDetails: {
          ...hospitalDetails,

          //error  --------------------------------------------------------------------------------
          //error  --------------------------------------------------------------------------------
          //error  --Remove Doctor Details,Room Type Total When Doctor Details dropdown is completed---------
          //error  --------------------------------------------------------------------------------
          //error  --------------------------------------------------------------------------------

          doctorDetails: {
            // contactNumber: {
            //   number:
            //     doctorDetails[0].contactNumber &&
            //     doctorDetails[0].contactNumber.number,
            //   countryCode: "+91",
            // },
            name: doctorDetails && doctorDetails?.name,
            email: doctorDetails?.email,
            registrationNo: doctorDetails?.registrationNumber,
            qualification: doctorDetails?.qualification,
            specialization: doctorDetails?.specializations,
          },
          total: totalCost,
        },
        formStatus: 'Draft',
        step: step,
      };
      try {
        const { data } = await axiosConfig.patch(
          `${process.env.REACT_APP_CASE_API}/case/updateCase?caseId=${
            !updateId ? param?.id : updateId
          }`,
          updateData
        );
        console.log('update Response', data?.savedCase?._id);
        setUpdateId(data?.data?._id);
        notification('success', 'Data Saved Successfully');
        setSharedLoaderActivity(false);
      } catch (e) {
        setSharedLoaderActivity(false);
        notification('error', e.message);
      }
      console.log('Update Api Data ------>  ', updateData);
    }
  };

  const nextTab = async () => {
    if (!checkApplication()) {
      return;
    }
    if (step === 1 && !param?.id && isNewCase) {
      setSharedLoaderActivity(true);
      console.log('-----------> Call Create API <----------');
      const createData = {
        hospitalId: userDetails?.data?._id,
        companyDetails: companyDetails,
        patientDetails: {
          ...patientDetails,
          proposedLineOfTreatment: proposedLineOfTreatment,
        },
        hospitalDetails: hospitalDetails,
        formStatus: 'Draft',
        step: step,
      };
      try {
        const { data } = await axiosConfig.post(
          `${process.env.REACT_APP_CASE_API}/case/createCase`,
          createData
        );
        console.log('create Response', data?.savedCase?._id);
        setUpdateId(data?.savedCase?._id);
        setStep((step) => step + 1);
        notification('success', 'Data Saved Successfully');
        setSharedLoaderActivity(false);
        setIsNewCase(false);
      } catch (e) {
        setSharedLoaderActivity(false);
        notification('error', e.message);
      }
      console.log('Create Api Data ------>  ', createData);
    } else {
      setSharedLoaderActivity(true);
      console.log('-----------> Call Update API <----------');
      const updateData = {
        hospitalId: userDetails?.data?._id,
        companyDetails: companyDetails,
        patientDetails: {
          ...patientDetails,
          proposedLineOfTreatment: proposedLineOfTreatment,
        },
        hospitalDetails: {
          ...hospitalDetails,
          //error  --------------------------------------------------------------------------------
          //error  --------------------------------------------------------------------------------
          //error  --Remove Doctor Details,Room Type Total When Doctor Details dropdown is completed---------
          //error  --------------------------------------------------------------------------------
          //error  --------------------------------------------------------------------------------
          doctorDetails: {
            // contactNumber: {
            //   number:
            //     doctorDetails[0].contactNumber &&
            //     doctorDetails[0].contactNumber.number,
            //   countryCode: "+91",
            // },
            name: doctorDetails && doctorDetails?.name,
            email: doctorDetails?.email,
            registrationNo: doctorDetails?.registrationNumber,
            qualification: doctorDetails?.qualification,
            specialization: doctorDetails?.specializations,
          },
          total: totalCost,
        },
        formStatus: 'Draft',
        step: step,
      };
      try {
        const { data } = await axiosConfig.patch(
          `${process.env.REACT_APP_CASE_API}/case/updateCase?caseId=${
            !updateId ? param?.id : updateId
          }`,
          updateData
        );
        console.log('update Response', data?.savedCase?._id);
        setUpdateId(data?.data?._id);
        setStep((step) => step + 1);
        notification('success', 'Data Saved Successfully');
        setSharedLoaderActivity(false);
      } catch (e) {
        setSharedLoaderActivity(false);
        notification('error', e.message);
      }
      console.log('Update Api Data ------>  ', updateData);
    }

    // setStep((step) => step + 1);
    // updateApplicationData();
  };

  // console.log("newcaseData ------- > ", newcaseData);

  const handleChangeDetailsOfTpa = (e) => {
    const { name, value } = e.target;

    console.log('event ----> ', e);

    if (name === 'insuranceCompany') {
      setCompanyDetails((pre) => ({
        ...pre,
        insuranceCompany: value,
        insuranceCompanyEmail: insuranceCompanyEmailList?.filter(
          ({ name, email }) => {
            if (name === value) return email;
          }
        )[0]?.email,
      }));
    }
    if (name === 'tpaCompany') {
      setCompanyDetails((pre) => ({
        ...pre,
        tpaCompany: value,
        tpaCompanyEmail: tpaEmailList?.filter(({ name, email }) => {
          if (name === value) return email;
        })[0]?.email,
      }));
    }
  };

  const handleChangePatientDetails = (e) => {
    const { name, value } = e.target;

    if (name === 'healthInsuranceChecked') {
      setPatientDetails((pre) => ({
        ...pre,
        healthInsurance: {
          ...pre?.healthInsurance,
          checked: value == 'true' ? true : false,
        },
      }));
      return;
    }
    if (name === 'healthInsuranceCompanyName') {
      setPatientDetails((pre) => ({
        ...pre,
        healthInsurance: {
          ...pre?.healthInsurance,
          companyName: value,
        },
      }));
      return;
    }

    if (name === 'healthInsuranceGiveDetails') {
      setPatientDetails((pre) => ({
        ...pre,
        healthInsurance: {
          ...pre?.healthInsurance,
          details: value,
        },
      }));
      return;
    }
    if (name === 'physicianChecked') {
      setPatientDetails((pre) => ({
        ...pre,
        physician: {
          ...pre?.physician,
          checked: value == 'true' ? true : false,
        },
      }));
      return;
    }
    if (name === 'physicianName') {
      setPatientDetails((pre) => ({
        ...pre,
        physician: {
          ...pre?.physician,
          name: value,
        },
      }));
      return;
    }
    if (name === 'physicianContactNumber') {
      setPatientDetails((pre) => ({
        ...pre,
        physician: {
          ...pre?.physician,
          contactNumber: {
            number: value,
            countryCode: '+91',
          },
        },
      }));
      return;
    }
    if (
      name === 'buildingNumber' ||
      name === 'area' ||
      name === 'landmark' ||
      name === 'city' ||
      name === 'state' ||
      name === 'country' ||
      name === 'pinCode'
    ) {
      if (name === 'pinCode') {
        setPatientDetails((pre) => ({
          ...pre,
          currentAddress: {
            ...pre?.currentAddress,
            [name]: Number(value),
          },
        }));
      } else {
        setPatientDetails((pre) => ({
          ...pre,
          currentAddress: {
            ...pre?.currentAddress,
            [name]: value,
          },
        }));
      }
      return;
    }

    if (name === 'contactNumber' || name === 'relativeContactNumber') {
      setPatientDetails((pre) => ({
        ...pre,
        [name]: {
          number: Number(value),
          countryCode: '+91',
        },
      }));
      return;
    }

    if (name === 'proposedLineOfTreatment') {
      if (e.target.checked) {
        setProposedLineOfTreatment([...proposedLineOfTreatment, value]);
      } else {
        // console.log(proposedLineOfTreatment.splice(proposedLineOfTreatment.indexOf(e.target.value), 1));
        // setProposedLineOfTreatment(proposedLineOfTreatment.splice(proposedLineOfTreatment.indexOf(e.target.value), 1))
        setProposedLineOfTreatment(
          proposedLineOfTreatment.filter((val) => {
            return val !== e.target.value;
          })
        );
      }
      return;
    }
    if (name === 'relevantClinicChecked') {
      if (value === 'Maternity') {
        setPatientDetails((pre) => ({
          ...pre,
          relevantClinic: {
            // ...pre?.relevantClinic,
            checked: value,
            maternity: {
              maternity: [],
            },
          },
        }));
      }
      if (value === 'Injury') {
        setPatientDetails((pre) => ({
          ...pre,
          relevantClinic: {
            // ...pre?.relevantClinic,
            checked: value,
          },
        }));
      }
      if (value === 'Accident') {
        setPatientDetails((pre) => ({
          ...pre,
          relevantClinic: {
            // ...pre?.relevantClinic,
            checked: value,
          },
        }));
      }
      if (value === 'Other') {
        setPatientDetails((pre) => ({
          ...pre,
          relevantClinic: {
            // ...pre?.relevantClinic,
            checked: value,
          },
        }));
      }
      return;
    }
    if (name === 'expectedDateOfDelivery') {
      setPatientDetails((pre) => ({
        ...pre,
        relevantClinic: {
          ...pre?.relevantClinic,
          maternity: {
            ...pre?.relevantClinic?.maternity,
            [name]: value,
          },
        },
      }));
      return;
    }
    if (name === 'occur' || name === 'dateOfInjury') {
      setPatientDetails((pre) => ({
        ...pre,
        relevantClinic: {
          ...pre?.relevantClinic,
          injury: {
            ...pre?.relevantClinic?.injury,
            [name]: value,
          },
        },
      }));
      return;
    }
    if (name === 'inCaseOfAccidentChecked') {
      setPatientDetails((pre) => ({
        ...pre,
        relevantClinic: {
          ...pre?.relevantClinic,
          accident: {
            ...pre?.relevantClinic?.accident,
            inCaseOfAccident: {
              ...pre?.relevantClinic?.accident?.inCaseOfAccident,
              checked: value === 'true' ? true : false,
            },
          },
        },
      }));
      return;
    }
    if (name === 'reportedToPolice') {
      setPatientDetails((pre) => ({
        ...pre,
        relevantClinic: {
          ...pre?.relevantClinic,
          accident: {
            ...pre?.relevantClinic?.accident,
            inCaseOfAccident: {
              ...pre?.relevantClinic?.accident?.inCaseOfAccident,
              reportedToPolice: {
                checked: value === 'true' ? true : false,
              },
            },
          },
        },
      }));
      return;
    }
    if (name === 'firNumber') {
      setPatientDetails((pre) => ({
        ...pre,
        relevantClinic: {
          ...pre?.relevantClinic,
          accident: {
            ...pre?.relevantClinic?.accident,
            inCaseOfAccident: {
              ...pre?.relevantClinic?.accident?.inCaseOfAccident,
              reportedToPolice: {
                ...pre?.relevantClinic?.accident?.inCaseOfAccident
                  ?.reportedToPolice,
                firNumber: value,
              },
            },
          },
        },
      }));
      return;
    }
    if (
      name === 'alcoholConsumption' ||
      name === 'testConducted' ||
      name === 'isItRTA'
    ) {
      setPatientDetails((pre) => ({
        ...pre,
        relevantClinic: {
          ...pre?.relevantClinic,
          accident: {
            ...pre?.relevantClinic?.accident,
            [name]: value === 'true' ? true : false,
          },
        },
      }));
      return;
    }
    if (name === 'otherDetails') {
      setPatientDetails((pre) => ({
        ...pre,
        relevantClinic: {
          ...pre?.relevantClinic,
          other: {
            ...pre?.relevantClinic?.accident,
            [name]: value,
          },
        },
      }));
      return;
    }
    if (name === 'maternity') {
      if (e.target.checked) {
        setPatientDetails((pre) => ({
          ...pre,
          relevantClinic: {
            ...pre?.relevantClinic,
            maternity: {
              maternity: [...pre?.relevantClinic?.maternity?.maternity, value],
            },
          },
        }));
      } else {
        setPatientDetails((pre) => ({
          ...pre,
          relevantClinic: {
            ...pre?.relevantClinic,
            maternity: {
              maternity:
                patientDetails?.relevantClinic?.maternity?.maternity.filter(
                  (val) => {
                    return val !== e.target.value;
                  }
                ),
            },
          },
        }));
        // setPatientDetails(patientDetails?.relevantClinic?.maternity?.maternity.splice(patientDetails?.relevantClinic?.maternity?.maternity.indexOf(e.target.value), 1))
      }
      return;
    }

    setPatientDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleChangeHospitalDetails = (e) => {
    const { name, value } = e.target;

    if (name === 'daysInHospital' || name === 'daysInICU') {
      setHospitalDetails((pre) => ({
        ...pre,
        [name]: Number(value),
      }));
      return;
    }

    if (
      name === 'perDayRoomRent' ||
      name === 'nursing' ||
      name === 'costOfInvestigation' ||
      name === 'icuCharges' ||
      name === 'otCharges' ||
      name === 'physicianCharge' ||
      name === 'professionalFeesSurgeon' ||
      name === 'costOfImplant' ||
      name === 'anesthetist' ||
      name === 'consumables' ||
      name === 'otherHospitalIfAny' ||
      name === 'allIncludingPackage'
    ) {
      setHospitalDetails((pre) => ({
        ...pre,
        chargelist: {
          ...pre?.chargelist,
          [name]: Number(value),
        },
      }));
      return;
    }

    if (name === 'anyPastHistoryAnyChronicIllness') {
      setHospitalDetails((pre) => ({
        ...pre,
        anyPastHistory: {
          anyChronicIllness: value === 'true' ? true : false,
        },
      }));
      return;
    }
    if (name === 'anyOtherAilments') {
      setHospitalDetails((pre) => ({
        ...pre,
        anyPastHistory: {
          ...pre?.anyPastHistory,
          [name]: value,
        },
      }));
      return;
    }

    setHospitalDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleDateOfBirth = (e) => {
    const { name, value } = e.target;

    var mdate = value; //patientDetails?.DOB;
    var yearThen = parseInt(mdate.substring(0, 4), 10);
    var monthThen = parseInt(mdate.substring(5, 7), 10);
    var dayThen = parseInt(mdate.substring(8, 10), 10);

    var today = new Date();
    var birthday = new Date(yearThen, monthThen - 1, dayThen);

    var differenceInMilisecond = today.valueOf() - birthday.valueOf();

    var year_age = Math.floor(differenceInMilisecond / 31536000000);
    var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);

    var month_age = Math.floor(day_age / 30);

    day_age = day_age % 30;

    // console.log('Year :- ' + year_age + ' Month:- ' + month_age);

    setPatientDetails((pre) => ({
      ...pre,
      [name]: value,
      ageMonth: month_age,
      ageYear: year_age,
    }));
  };

  console.log('company details ---- ', companyDetails);
  console.log('proproposedLineOfTreatment ---- ', proposedLineOfTreatment);
  console.log('patient details ---- ', patientDetails);
  console.log('hospital Details ---- ', hospitalDetails);
  console.log('doctors Details ---- ', doctorDetails);

  function renderTab() {
    switch (step) {
      case 1:
        return (
          <PatientDetails
            companyDetails={companyDetails}
            handleChangeDetailsOfTpa={handleChangeDetailsOfTpa}
            patientDetails={patientDetails}
            handleChangePatientDetails={handleChangePatientDetails}
            handleDateOfBirth={handleDateOfBirth}
            stepTwoErrors={stepTwoErrors}
            insuranceCompanyList={insuranceCompanyList}
            tpaList={tpaList}
            isFreeze={isFreeze}
          />
        );
      case 2:
        return (
          <DoctorAndDiagnosisDetails
            patientDetails={patientDetails}
            hospitalDetails={hospitalDetails}
            setPatientDetails={setPatientDetails}
            setHospitalDetails={setHospitalDetails}
            doctorDetails={doctorDetails}
            setDoctorDetails={setDoctorDetails}
            handleChangePatientDetails={handleChangePatientDetails}
            proposedLineOfTreatment={proposedLineOfTreatment}
            stepThreeErrors={stepThreeErrors}
            hospitalId={userDetails?.data?._id}
            isFreeze={isFreeze}
          />
        );
      case 3:
        return (
          <AdmissionDetails
            handleChangeHospitalDetails={handleChangeHospitalDetails}
            hospitalDetails={hospitalDetails}
            companyDetails={companyDetails}
            totalCost={totalCost}
            setTotalCost={setTotalCost}
            monthsList={months}
            yearList={yearList}
            stepFourErrors={stepFourErrors}
            setHospitalDetails={setHospitalDetails}
            setSharedLoaderActivity={setSharedLoaderActivity}
            isFreeze={isFreeze}
          />
        );
    }
  }

  const generatePreAuthForm = () => {
    if (!checkApplication()) {
      return;
    } else {
      saveCaseData().then(() => {
        setIsFreeze(true);
        window.open(
          `${
            process.env.REACT_APP_CASE_API
          }/preAuthForm/getPreAuthForm?caseId=${
            !updateId ? param?.id : updateId
          }`,
          '_blank',
          'noopener,noreferrer'
        );
      });
    }
  };

  // const confirmUnfreeze = (e) => {
  //     console.log(e);
  //     message.success('Click on Yes');
  // };

  const unfreezeCase = async () => {
    setSharedLoaderActivity(true);
    try {
      await axiosConfig.patch(
        `${process.env.REACT_APP_CASE_API}/case/updateCase?caseId=${
          !updateId ? param?.id : updateId
        }`,
        {
          'preAuth.freeze': 'false',
        }
      );
      fetchDetails();
      setIsFreeze(false);
      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col bg-black h-full mx-5 my-5 rounded-md p-6 overflow-y-scroll ${style.customScroll}`}
      >
        <div className='flex w-full justify-center pr-4'>
          <div className='flex justify-center px-2 rounded py-2 bg-baseColor lg:w-[calc(50%-150px)] md:w-full'>
            <ProgessBar step={step} setStep={handleChangeStep} />
          </div>
        </div>

        <div className={`bg-opacity-10  my-3 rounded `}>{renderTab()}</div>

        <div className='flex justify-between pr-4'>
          {step === 2 ? (
            <SharedButton
              text='Previous'
              style={`bg-orange ${step === 1 ? 'invisible' : ''}`}
              name='Previous'
              handleClick={previousTab}
            />
          ) : null}

          <div>
            <>
              <SharedButton
                text='View Rate List'
                style={`bg-orange mr-3`}
                name='rateList'
                handleClick={toggleOpenRatelistModal}
              />
              <SharedButton
                text='View Documents'
                style={`bg-orange mr-3`}
                name='Documents'
                handleClick={toggleOpenDocumentModal}
              />
              <SharedButton
                text='Save'
                style={`bg-orange mr-3 ${step === 1 ? 'hidden' : ''}`}
                name='Save'
                handleClick={saveCaseData}
              />
              {isFreeze && (
                <Popconfirm
                  title='Are you sure to want to unfreeze this case?'
                  onConfirm={unfreezeCase}
                  onCancel={() => {}}
                  okText='Yes'
                  cancelText='No'
                >
                  {/* <SharedButton
                                        text='Unfreeze'
                                        style={`bg-orange mr-3`}
                                        name='Unfreeze'
                                        // handleClick={unfreezeCase}
                                    /> */}
                  <button className='bg-orange mr-3 h-15 text-white px-4 py-1 rounded font-medium select-none hover:none'>
                    Unfreeze
                  </button>
                </Popconfirm>
              )}
            </>

            {step === 3 ? (
              <>
                <Popconfirm
                  title='Are you sure to want to generate pre-auth form?'
                  onConfirm={generatePreAuthForm}
                  onCancel={() => {}}
                  okText='Yes'
                  cancelText='No'
                >
                  <button className='bg-orange mr-3 h-15 text-white px-4 py-1 rounded font-medium select-none hover:none'>
                    Generate Pre Auth Form
                  </button>
                </Popconfirm>

                {/* <SharedButton
                                    text='Generate Pre Auth Form'
                                    style={`bg-orange mr-2`}
                                    name='generatePreAuth'
                                    handleClick={generatePreAuthForm}
                                /> */}
                <SharedButton
                  text='Send Mail'
                  style={`bg-orange`}
                  name='sendMail'
                  handleClick={() => {
                    if (checkApplication()) {
                      saveCaseData();
                      toggleOpenSendMailModal();
                    }
                  }}
                />
              </>
            ) : (
              <SharedButton
                text='Next'
                style={`bg-orange`}
                name='Next'
                handleClick={nextTab}
              />
            )}
          </div>
        </div>
      </div>
      {opendocumentModal && (
        <DocumentModal
          // newApplicationDetails={newApplicationDetails}
          toggleOpenDocumentModal={toggleOpenDocumentModal}
          opendocumentModal={opendocumentModal}
          setSharedLoaderActivity={setSharedLoaderActivity}
        />
      )}

      {openSendMailModal && (
        <SendMailModal
          // newApplicationDetails={newApplicationDetails}
          toggleOpenSendMailModal={toggleOpenSendMailModal}
          openSendMailModal={openSendMailModal}
          setSharedLoaderActivity={setSharedLoaderActivity}
          patientDetails={patientDetails}
          hospitalDetails={hospitalDetails}
          companyDetails={companyDetails}
          caseId={!updateId ? param?.id : updateId}
          userDetails={userDetails}
          totalCost={totalCost}
        />
      )}

      {openRatelistModal && (
        <RateListModal
          openRatelistModal={openRatelistModal}
          toggleOpenRatelistModal={toggleOpenRatelistModal}
          companyDetails={companyDetails}
          userDetails={userDetails}
        />
      )}
    </>
  );
};

export default AddNewCase;