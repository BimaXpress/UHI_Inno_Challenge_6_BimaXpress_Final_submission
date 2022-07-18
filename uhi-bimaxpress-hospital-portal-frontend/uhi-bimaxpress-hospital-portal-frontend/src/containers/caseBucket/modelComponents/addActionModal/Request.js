import React, { useState, useRef, useEffect } from 'react';
import styles from './Request.module.css';
import { IoClose } from 'react-icons/io5';
import paperclip_black from '../../../../assets/icon/paperclip_black.svg';
import bold from '../../../../assets/icon/bold.svg';
import italic from '../../../../assets/icon/italic.svg';
import underline from '../../../../assets/icon/underline.svg';
import align_center_alt from '../../../../assets/icon/align-center-alt.svg';
import align_left from '../../../../assets/icon/align_left.svg';
import align_right from '../../../../assets/icon/align_right.svg';
import { MdOutlineClose } from 'react-icons/md';
import ReactHtmlParser from 'react-html-parser';
import { useNavigate } from 'react-router-dom';
import Input from '../../../shared/input/input';
import InputDate from '../../../shared/inputDate';
import InputCheckbox from '../../../shared/inputCheckbox';
import SharedButton from '../../../shared/button';
import { format } from 'date-fns';
import axios from 'axios';
import axiosConfig from '../../../../config/axiosConfig';
import notification from '../../../shared/notification';
import SharedSelect from '../../../shared/SharedSelect';

const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

const Request = (props) => {
  const navigate = useNavigate();
  const { summaryData, selectedAction, setSharedLoaderActivity, userDetails } =
    props;

  const monthsList = [
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
  const [yearList, setYearList] = useState([]);

  const [mail, setMail] = useState({
    to: '',
    cc: '',
    bcc: '',
    toList: [],
    ccList: [],
    bccList: [],
    sub: '',
    body: '',
    file: [],
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });
  const bodyRef = useRef(null);

  const [hospitalDetails, setHospitalDetails] = useState({});
  const [patientDetails, setPatientDetails] = useState({});

  const [additionalDetailsRender, setAdditionDetailsRender] = useState(false);
  const [additionDetailsChecked, setAdditionDetailsChecked] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [charegesList, setChargesList] = useState([]);
  const [chargeKeys, setChargeKeys] = useState([]);

  useEffect(() => {
    const totalSum =
      Number(
        (chargeKeys.includes('perDayRoomRent') &&
          hospitalDetails?.chargelist?.perDayRoomRent) ||
          0
      ) +
      Number(
        (chargeKeys.includes('icuCharges') &&
          hospitalDetails?.chargelist?.icuCharges) ||
          0
      ) +
      Number(
        (chargeKeys.includes('otCharges') &&
          hospitalDetails?.chargelist?.otCharges) ||
          0
      ) +
      Number(
        (chargeKeys.includes('costOfInvestigation') &&
          hospitalDetails?.chargelist?.costOfInvestigation) ||
          0
      ) +
      Number(
        (chargeKeys.includes('professionalFeesSurgeon') &&
          hospitalDetails?.chargelist?.professionalFeesSurgeon) ||
          0
      ) +
      Number(
        (chargeKeys.includes('physicianCharge') &&
          hospitalDetails?.chargelist?.physicianCharge) ||
          0
      ) +
      Number(
        (chargeKeys.includes('costOfImplant') &&
          hospitalDetails?.chargelist?.costOfImplant) ||
          0
      ) +
      Number(
        (chargeKeys.includes('otherHospitalIfAny') &&
          hospitalDetails?.chargelist?.otherHospitalIfAny) ||
          0
      ) +
      Number(
        (chargeKeys.includes('allIncludingPackage') &&
          hospitalDetails?.chargelist?.allIncludingPackage) ||
          0
      ) +
      Number(
        (chargeKeys.includes('nursing') &&
          hospitalDetails?.chargelist?.nursing) ||
          0
      ) +
      Number(
        (chargeKeys.includes('anesthetist') &&
          hospitalDetails?.chargelist?.anesthetist) ||
          0
      ) +
      Number(
        (chargeKeys.includes('consumables') &&
          hospitalDetails?.chargelist?.consumables) ||
          0
      );
    setTotalCost(totalSum);
  }, [hospitalDetails, chargeKeys]);

  const removeImage = (name) => {
    setMail((pre) => ({
      ...pre,
      file: pre?.file?.filter((files) => files?.name !== name),
    }));
  };

  const runCommand = (command) => {
    document.execCommand(command, false, undefined);
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;

    if (value !== ',') {
      if (name === 'file') {
        //@ts-ignore
        setMail((pre) => ({
          ...pre,
          //@ts-ignore
          [name]: [...pre[name], ...e?.target?.files],
        }));
      } else {
        setMail((pre) => ({ ...pre, [name]: value }));
      }
    }
  };

  const handleKeypress = (e, listName, name) => {
    if (e?.key === 'Enter' || e?.key === ',') {
      if (mail[name]) {
        setMail((pre) => ({
          ...pre,

          [listName]: [...pre[listName], pre[name]],
          [name]: '',
        }));
      }
    }
  };

  const removeEmail = (val, listName) => {
    setMail((pre) => ({
      ...pre,
      [listName]: [...pre[listName]]?.filter((mail) => mail !== val),
    }));
  };

  const checkValidEmail = (val) => {
    return emailRegex?.test(val);
  };

  const sendMail = async () => {
    if (mail.amount === '') {
      return notification('warning', 'Amount is required!');
    }

    const mailData = new FormData();
    // mailData.append('to', mail.to);
    mailData.append('to', 'ishanindraniya@gmail.com');
    mail?.ccList?.length &&
      mail?.ccList?.forEach((mail) => {
        mailData.append('cc', mail);
      });
    mailData.append('sub', mail?.sub);
    mailData.append('text', bodyRef?.current?.innerText);
    mail?.file?.length &&
      mail?.file?.map((file) => mailData.append('attachments', file));

    const formStatus = new FormData();
    formStatus.append('caseId', summaryData?._id);
    formStatus.append('amount', mail?.amount);
    formStatus.append('lastDate', mail?.date);

    if (mail?.file.length === 1) {
      mail?.file?.forEach((img) => {
        formStatus.append('fileName[0]', img?.name);
        formStatus.append('uploadFiles', img);
      });
    } else {
      mail?.file?.forEach((img) => {
        formStatus.append('fileName', img?.name);
        formStatus.append('uploadFiles', img);
      });
    }

    formStatus.append(
      'folderName',
      `Hospital/${summaryData?.hospitalDetails?.email}/${summaryData?._id}`
    );

    if (selectedAction === 'Enhance') {
      formStatus.append('formStatus', 'Enhance');
      formStatus.append('action', 'Enhance');
      formStatus.append('summary', 'Enhance Requested');
    }

    if (selectedAction === 'FCI') {
      formStatus.append('formStatus', 'Fci');
      formStatus.append('action', 'Fci');
      formStatus.append('summary', 'Final Claim Initiated');
    }

    setSharedLoaderActivity(true);

    try {
      //message sending email
      await axios.post(
        `${process.env.REACT_APP_EMAIL_API}/mail/sendMail?email=${userDetails?.data?.emailer?.email}`,
        mailData
      );

      //message change form status
      await axios.put(
        `${process.env.REACT_APP_CASE_API}/case/changeFormStatus`,
        formStatus
      );

      //message update in case of additionalData

      if (additionalDetailsRender && additionDetailsChecked) {
        await updateCaseData();
      }

      setSharedLoaderActivity(false);
      notification('success', 'Mail Sent Successfully');
      notification('success', `Case moved ${selectedAction} successfully`);
      navigate('/');
    } catch (e) {
      setSharedLoaderActivity(false);
      notification('error', e?.message);
    }
  };

  const updateCaseData = async () => {
    hospitalDetails.total = totalCost;
    await axiosConfig.patch(`/case/updateCase?caseId=${summaryData._id}`, {
      patientDetails,
      hospitalDetails,
    });
  };

  const fetchChargeMaster = async () => {
    setSharedLoaderActivity(true);
    try {
      const chargeMasters = await axiosConfig.get(
        `chargeMasters/getChargeMasters?insuranceCompany=${summaryData.companyDetails.insuranceCompany}`
      );
      setChargesList(chargeMasters.data.chargesList);
      let chargeListKeys = [];
      chargeMasters.data.chargesList.map((e) => {
        chargeListKeys.push(e.key);
      });
      setChargeKeys(chargeListKeys);

      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  useEffect(() => {
    setMail((pre) => ({
      ...pre,
      to: '',
      cc: '',
      bcc: '',
      ccList: [],
      bccList: [],
      sub: `${
        selectedAction === 'Enhance' ? 'Enhance' : 'Final discharge approval'
      } request for  ${summaryData?.patientDetails?.name} Claim No: ${
        summaryData?.claimNo
      }`,
      file: [],
      toList: [],
      body: ` <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Dear Sir/Ma'am,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Please find details of patient below:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Patient name: ${
        summaryData?.patientDetails?.name
      }</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Claim No : ${
        summaryData?.claimNo
      } 
                </div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Date of admission : ${format(
                  new Date(summaryData?.hospitalDetails?.dateOfAdmission),
                  'dd LLL yyyy'
                )}</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Policy Number : ${
        summaryData?.patientDetails?.policyNumber
      }</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Please find the attached documents below following to the ${
        selectedAction === 'Enhance'
          ? 'Enhancement'
          : 'Final discharge approval request'
      }</div>`,
    }));

    let arr = [];
    for (let i = 1900; i <= 2500; i++) {
      arr.push({ label: `${i}`, value: `${i}` });
    }
    setYearList(arr);

    if (summaryData.companyDetails.tpaCompany === '') {
      if (
        summaryData.companyDetails.insuranceCompany ===
          'HDFC_ERGO_General_Insurance' ||
        summaryData.companyDetails.insuranceCompany ===
          'ICICI_Lombard_General_Insurance' ||
        summaryData.companyDetails.insuranceCompany === 'Star_Health_Insurance'
      ) {
        fetchChargeMaster();
        setTotalCost(summaryData.hospitalDetails.total);
        setHospitalDetails(summaryData.hospitalDetails);
        setPatientDetails(summaryData.patientDetails);
        setAdditionDetailsRender(true);
      }
    }
  }, [summaryData]);

  return (
    <>
      <div className={styles.requetModalContainer}>
        <div
          className={`flex items-center justify-center h-10 w-full bg-primary rounded border-none outline-none ${styles.composeModalHeader}`}
        >
          <p className='text-white tracking-wide capitalize'>Sent Mail</p>
        </div>

        <div className='px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex items-center flex-wrap'>
          <p className='mr-2 mb-1'>Cc</p>
          {mail?.ccList?.map((item, index) => {
            return (
              <div
                className={`flex items-center border border-fontColor-darkGray rounded-3xl mr-2 px-2 mb-1  ${
                  checkValidEmail(item)
                    ? 'font-medium text-primary'
                    : 'border-none bg-red-600 text-fontColor'
                }`}
                key={index}
              >
                <p>{item}</p>
                <MdOutlineClose
                  className={`text-fontColor-darkGray ml-2 cursor-pointer ${
                    checkValidEmail(item) ? '' : 'text-fontColor'
                  }`}
                  onClick={() => removeEmail(item, 'ccList')}
                />
              </div>
            );
          })}

          <input
            className='border-none outline-none flex-auto'
            value={mail?.cc}
            name='cc'
            onChange={(e) => handleChange(e)}
            onKeyPress={(e) => handleKeypress(e, 'cc', 'ccList')}
          />
        </div>
        <div className='px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex'>
          <input
            className='border-none outline-none text-primary font-medium flex-auto'
            value={mail?.sub}
            name='sub'
            onChange={(e) => handleChange(e)}
            placeholder='Subject'
          />
        </div>

        <div
          className='px-4 py-2 pb-4 text-sm text-fontColor-darkGray border-t border-b border-fontColor-gray tracking-wide outline-none'
          style={{ minHeight: '250px' }}
          contentEditable={true}
          ref={bodyRef}
          suppressContentEditableWarning={true}
        >
          {ReactHtmlParser(mail?.body)}
        </div>

        <div className='grid grid-cols-2 gap-x-6 px-4'>
          <div>
            <Input
              placeHolder='Amount'
              label={
                <>
                  Amount <span className='ml-1 text-red-500'>*</span>
                </>
              }
              handleChange={handleChange}
              name='amount'
              value={mail?.amount || ''}
              type='number'
              labelClass='!text-black'
              inputClass='!bg-white !border border-black'
              inputStyle='!text-black'
            />
          </div>
          <div>
            <InputDate
              handleChange={handleChange}
              name='date'
              label={
                <>
                  Select date <span className='text-red-500'>*</span>
                </>
              }
              labelStyle={{ color: 'black' }}
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid gray',
              }}
              value={mail?.date}
            />
          </div>
        </div>

        {/* Additional DetailsStart */}
        {/* Additional Details CheckBox */}

        {additionalDetailsRender && (
          <div>
            <div className='px-4 my-2'>
              {true ? (
                <InputCheckbox
                  handleChange={(e) => {
                    setAdditionDetailsChecked(e.target.checked);
                  }}
                  name='additionDetailsChecked'
                  value={additionDetailsChecked}
                  checkboxLabel='Fill additional details'
                  checkboxLabelStyle='!text-black'
                  checkboxInputStyle='relative top-[3px]'
                />
              ) : null}
            </div>
            {additionDetailsChecked && charegesList.length && (
              <>
                <div className='px-4'>
                  <div className='grid grid-cols-3 gap-x-6'>
                    <Input
                      handleChange={(e) => {
                        setHospitalDetails((pre) => ({
                          ...pre,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                      name='numberOfVisit'
                      value={hospitalDetails.numberOfVisit || ''}
                      label='No of Visit'
                      labelClass='!text-black'
                      inputClass='!bg-white'
                      inputStyle='!text-black'
                      type='number'
                    />

                    <Input
                      handleChange={(e) => {
                        setHospitalDetails((pre) => ({
                          ...pre,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                      name='roomNumber'
                      value={hospitalDetails.roomNumber || ''}
                      label='Room Number'
                      labelClass='!text-black'
                      inputClass='!bg-white '
                      inputStyle='!text-black'
                      type='number'
                    />

                    <Input
                      handleChange={(e) => {
                        setHospitalDetails((pre) => ({
                          ...pre,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                      name='bedNumber'
                      value={hospitalDetails.bedNumber || ''}
                      label='Bed Number'
                      labelClass='!text-black'
                      inputClass='!bg-white'
                      inputStyle='!text-black'
                      type='number'
                    />
                  </div>
                  <Input
                    label='IPD Patient Number'
                    handleChange={(e) =>
                      setPatientDetails((pre) => ({
                        ...pre,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    name='ipdPatientNumber'
                    value={patientDetails?.ipdPatientNumber || ''}
                    labelClass='!text-black'
                    inputClass='!bg-white'
                    inputStyle='!text-black'
                  />

                  <div className='grid grid-cols-2 gap-x-6'>
                    {charegesList.map(({ key, label }) => {
                      return (
                        <Input
                          label={label}
                          handleChange={(e) =>
                            setHospitalDetails((pre) => ({
                              ...pre,
                              chargelist: {
                                ...pre.chargelist,
                                [key]: e.target.value,
                              },
                            }))
                          }
                          name={key}
                          value={hospitalDetails?.chargelist?.[key] || ''}
                          type='number'
                          labelClass='!text-black'
                          inputClass='!bg-white !max-h-14'
                          inputStyle='!text-black '
                        />
                      );
                    })}

                    <p className='font-bold text-lg'>
                      Total Cost:
                      <span className='font-semibold ml-1'>{totalCost}</span>
                    </p>
                    <br />

                    <Input
                      label='Nature Of Illness/Disease with presenting Complaints'
                      handleChange={(e) => {
                        setPatientDetails((pre) => ({
                          ...pre,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                      name='natureOfIllness'
                      value={patientDetails?.natureOfIllness || ''}
                      labelClass='!text-black'
                      inputClass='!bg-white !max-h-14'
                      inputStyle='!text-black'
                    />

                    <Input
                      label='Provisional Diagnosis'
                      handleChange={(e) => {
                        setPatientDetails((pre) => ({
                          ...pre,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                      name='provisionDiagnosis'
                      value={patientDetails?.provisionDiagnosis || ''}
                      labelClass='!text-black'
                      inputClass='!bg-white !max-h-16'
                      inputStyle='!text-black'
                    />

                    <div className='col-span-2 '>
                      {true && (
                        <>
                          <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                            <div className='col-span-4'>
                              <p className={`font-semibold items-start mt-3`}>
                                Diabetes
                              </p>
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      diabetes: {
                                        ...pre?.anyPastHistory?.diabetes,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='month'
                                defaultOption='Select Month'
                                value={
                                  hospitalDetails?.anyPastHistory?.diabetes
                                    ?.month
                                }
                                options={monthsList}
                              />
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      diabetes: {
                                        ...pre?.anyPastHistory?.diabetes,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='year'
                                defaultOption='Select Year'
                                value={
                                  hospitalDetails?.anyPastHistory?.diabetes
                                    ?.year
                                }
                                options={yearList}
                              />
                            </div>
                          </div>

                          <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                            <div className='col-span-4'>
                              <p className={`  font-semibold items-start mt-3`}>
                                Heart Disease
                              </p>
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      heartDisease: {
                                        ...pre?.anyPastHistory?.heartDisease,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='month'
                                defaultOption='Select Month'
                                value={
                                  hospitalDetails?.anyPastHistory?.heartDisease
                                    ?.month
                                }
                                options={monthsList}
                              />
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      heartDisease: {
                                        ...pre?.anyPastHistory?.heartDisease,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='year'
                                defaultOption='Select Year'
                                value={
                                  hospitalDetails?.anyPastHistory?.heartDisease
                                    ?.year
                                }
                                options={yearList}
                              />
                            </div>
                          </div>

                          <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                            <div className='col-span-4'>
                              <p className={`  font-semibold items-start mt-3`}>
                                Hypertension
                              </p>
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      hypertension: {
                                        ...pre?.anyPastHistory?.hypertension,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='month'
                                defaultOption='Select Month'
                                value={
                                  hospitalDetails?.anyPastHistory?.hypertension
                                    ?.month
                                }
                                options={monthsList}
                              />
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      hypertension: {
                                        ...pre?.anyPastHistory?.hypertension,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='year'
                                defaultOption='Select Year'
                                value={
                                  hospitalDetails?.anyPastHistory?.hypertension
                                    ?.year
                                }
                                options={yearList}
                              />
                            </div>
                          </div>

                          <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                            <div className='col-span-4'>
                              <p className={`  font-semibold items-start mt-3`}>
                                Hyperlipidemia
                              </p>
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      hyperlipidemias: {
                                        ...pre?.anyPastHistory?.hyperlipidemias,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='month'
                                defaultOption='Select Month'
                                value={
                                  hospitalDetails?.anyPastHistory
                                    ?.hyperlipidemias?.month
                                }
                                options={monthsList}
                              />
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      hyperlipidemias: {
                                        ...pre?.anyPastHistory?.hyperlipidemias,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='year'
                                defaultOption='Select Year'
                                value={
                                  hospitalDetails?.anyPastHistory
                                    ?.hyperlipidemias?.year
                                }
                                options={yearList}
                              />
                            </div>
                          </div>

                          <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                            <div className='col-span-4'>
                              <p className={`  font-semibold items-start mt-3`}>
                                Osteoarthritis
                              </p>
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      osteoarthritis: {
                                        ...pre?.anyPastHistory?.osteoarthritis,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='month'
                                defaultOption='Select Month'
                                value={
                                  hospitalDetails?.anyPastHistory
                                    ?.osteoarthritis?.month
                                }
                                options={monthsList}
                              />
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      osteoarthritis: {
                                        ...pre?.anyPastHistory?.osteoarthritis,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='year'
                                defaultOption='Select Year'
                                value={
                                  hospitalDetails?.anyPastHistory
                                    ?.osteoarthritis?.year
                                }
                                options={yearList}
                              />
                            </div>
                          </div>

                          <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                            <div className='col-span-4'>
                              <p className={`  font-semibold items-start mt-3`}>
                                Asthma/ COPD/ Bronchitis
                              </p>
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      asthmaCOPDBronchitis: {
                                        ...pre?.anyPastHistory
                                          ?.asthmaCOPDBronchitis,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='month'
                                defaultOption='Select Month'
                                value={
                                  hospitalDetails?.anyPastHistory
                                    ?.asthmaCOPDBronchitis?.month
                                }
                                options={monthsList}
                              />
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      asthmaCOPDBronchitis: {
                                        ...pre?.anyPastHistory
                                          ?.asthmaCOPDBronchitis,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='year'
                                defaultOption='Select Year'
                                value={
                                  hospitalDetails?.anyPastHistory
                                    ?.asthmaCOPDBronchitis?.year
                                }
                                options={yearList}
                              />
                            </div>
                          </div>

                          <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                            <div className='col-span-4'>
                              <p className={`  font-semibold items-start mt-3`}>
                                Cancer
                              </p>
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      cancer: {
                                        ...pre?.anyPastHistory?.cancer,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='month'
                                defaultOption='Select Month'
                                value={
                                  hospitalDetails?.anyPastHistory?.cancer?.month
                                }
                                options={monthsList}
                              />
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      cancer: {
                                        ...pre?.anyPastHistory?.cancer,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='year'
                                defaultOption='Select Year'
                                value={
                                  hospitalDetails?.anyPastHistory?.cancer?.year
                                }
                                options={yearList}
                              />
                            </div>
                          </div>

                          <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                            <div className='col-span-4'>
                              <p className={`  font-semibold items-start mt-3`}>
                                Alcohol/Drug Abuse
                              </p>
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      alcoholDragAbuse: {
                                        ...pre?.anyPastHistory
                                          ?.alcoholDragAbuse,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='month'
                                defaultOption='Select Month'
                                value={
                                  hospitalDetails?.anyPastHistory
                                    ?.alcoholDragAbuse?.month
                                }
                                options={monthsList}
                              />
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      alcoholDragAbuse: {
                                        ...pre?.anyPastHistory
                                          ?.alcoholDragAbuse,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='year'
                                defaultOption='Select Year'
                                value={
                                  hospitalDetails?.anyPastHistory
                                    ?.alcoholDragAbuse?.year
                                }
                                options={yearList}
                              />
                            </div>
                          </div>

                          <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                            <div className='col-span-4'>
                              <p className={`  font-semibold items-start mt-3`}>
                                Any HIV Or STD/Related Ailments
                              </p>
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      anyHIVOrAilments: {
                                        ...pre?.anyPastHistory
                                          ?.anyHIVOrAilments,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='month'
                                defaultOption='Select Month'
                                value={
                                  hospitalDetails?.anyPastHistory
                                    ?.anyHIVOrAilments?.month
                                }
                                options={monthsList}
                              />
                            </div>
                            <div className='col-span-4'>
                              <SharedSelect
                                handleChange={(e) =>
                                  setHospitalDetails((pre) => ({
                                    ...pre,
                                    anyPastHistory: {
                                      ...pre?.anyPastHistory,
                                      anyHIVOrAilments: {
                                        ...pre?.anyPastHistory
                                          ?.anyHIVOrAilments,
                                        [e.target.name]: Number(e.target.value),
                                      },
                                    },
                                  }))
                                }
                                lightMode={true}
                                name='year'
                                defaultOption='Select Year'
                                value={
                                  hospitalDetails?.anyPastHistory
                                    ?.anyHIVOrAilments?.year
                                }
                                options={yearList}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <Input
                      label='Any Other Ailments, Give Details'
                      handleChange={(e) =>
                        setHospitalDetails((pre) => ({
                          ...pre,
                          anyPastHistory: {
                            ...pre?.anyPastHistory,
                            [e.target.name]: e.target.value,
                          },
                        }))
                      }
                      name='anyOtherAilments'
                      value={
                        hospitalDetails?.anyPastHistory?.anyOtherAilments || ''
                      }
                      labelClass='!text-black'
                      inputClass='!bg-white !max-h-14'
                      inputStyle='!text-black'
                    />

                    <Input
                      label='Cause Of Ailment'
                      handleChange={(e) =>
                        setHospitalDetails((pre) => ({
                          ...pre,
                          anyPastHistory: {
                            ...pre?.anyPastHistory,
                            [e.target.name]: e.target.value,
                          },
                        }))
                      }
                      name='causeOfAilment'
                      value={
                        hospitalDetails?.anyPastHistory?.causeOfAilment || ''
                      }
                      labelClass='!text-black'
                      inputClass='!bg-white !max-h-16'
                      inputStyle='!text-black'
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        {/* Additional Details Ends */}

        <div className='flex items-center flex-wrap'>
          {mail?.file?.length
            ? mail?.file?.map((file, index) => {
                return (
                  <div
                    className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden '
                    style={{ width: '100%', maxWidth: '145px' }}
                    key={index}
                  >
                    <p
                      style={{
                        width: '100%',
                        maxWidth: '125px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {/* @ts-ignore */}
                      {file?.name}
                    </p>
                    {/* @ts-ignore */}
                    <IoClose onClick={() => removeImage(file?.name)} />
                  </div>
                );
              })
            : null}
        </div>
        <div className=' flex items-center py-8 p px-4'>
          <SharedButton
            text='Send'
            style={`bg-green-500 mr-3`}
            name='sendMail'
            handleClick={sendMail}
          />
          <div className='relative w-8 h-8 cursor-pointer'>
            <img
              src={paperclip_black}
              alt='icon'
              className='absolute mr-3 top-2 cursor-pointer'
            />
            <input
              type='file'
              className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-full top-0 left-0 '
              name='file'
              onChange={handleChange}
              multiple
            />
          </div>
          <div
            className='flex items-center p-3 rounded'
            style={{ backgroundColor: '#EEEEEE' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={bold}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('bold')}
              onMouseDown={(e) => e.preventDefault()}
            />

            <img
              src={italic}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('italic')}
              onMouseDown={(e) => e.preventDefault()}
            />
            <img
              src={underline}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('underline')}
              onMouseDown={(e) => e.preventDefault()}
            />

            <img
              src={align_right}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('justifyLeft')}
              onMouseDown={(e) => e.preventDefault()}
            />
            <img
              src={align_center_alt}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('justifyCenter')}
              onMouseDown={(e) => e.preventDefault()}
            />
            <img
              src={align_left}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('justifyRight')}
              onMouseDown={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Request;
