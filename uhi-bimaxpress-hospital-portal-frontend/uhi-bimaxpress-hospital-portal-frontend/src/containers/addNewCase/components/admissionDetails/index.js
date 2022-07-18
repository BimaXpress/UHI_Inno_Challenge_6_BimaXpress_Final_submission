import React, { useState, useEffect } from 'react';
import Input from '../../../shared/input/input';
import InputRadio from '../../../shared/inputRadio';
import InputDate from '../../../shared/inputDate';
import SharedSelect from '../../../shared/SharedSelect';
import InputCheckbox from '../../../shared/inputCheckbox';
import axiosConfig from '../../../../config/axiosConfig';
import notification from '../../../shared/notification';

const AdmissionDetails = (props) => {
  const {
    monthsList,
    yearList,
    handleChangeHospitalDetails,
    hospitalDetails,
    companyDetails,
    stepFourErrors,
    setHospitalDetails,
    totalCost,
    setTotalCost,
    setSharedLoaderActivity,
  } = props;

  const [roomListSelectOptions, setRoomListSelectOptions] = useState([]);
  const [charegesList, setChargesList] = useState([]);
  const [chargeKeys, setChargeKeys] = useState([]);

  useEffect(() => {
    fetchRoomList();
  }, []);

  // "perDayRoomRent": 2400,
  // 		"nursing": 5000,
  // 		"costOfInvestigation": 5600,
  // 		"icuCharges": 2000,
  // 		"otCharges": 3000,
  // 		"physicianCharge": 5000,
  // 		"professionalFeesSurgeon": 6000,
  // 		"costOfImplant": 3400,
  // 		"anesthetist": 6000,
  // 		"consumables": 8000,
  // 		"otherHospitalIfAny": 2000,
  // 		"allIncludingPackage": 3000

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

    console.log(
      'totalSum -------->',
      totalSum,
      hospitalDetails?.chargelist?.perDayRoomRent,
      chargeKeys
    );
  }, [hospitalDetails, chargeKeys]);

  const fetchRoomList = async () => {
    try {
      setSharedLoaderActivity(true);
      const data = await axiosConfig.get(
        `roomMasters/getRoomList?insuranceCompany=${
          companyDetails.tpaCompany && companyDetails.tpaCompany !== 'NA'
            ? companyDetails.tpaCompany
            : companyDetails.insuranceCompany
        }`
      );

      console.log('RoomList  ...', data.data.roomList);

      setRoomListSelectOptions(data.data.roomList);

      const expensesData = await axiosConfig.get(
        `chargeMasters/getChargeMasters?insuranceCompany=${
          companyDetails.tpaCompany && companyDetails.tpaCompany !== 'NA'
            ? companyDetails.tpaCompany
            : companyDetails.insuranceCompany
        }`
      );

      setChargesList(expensesData.data.chargesList);
      let chargeListKeys = [];
      expensesData.data.chargesList.map((e) => {
        chargeListKeys.push(e.key);
      });
      setChargeKeys(chargeListKeys);

      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error?.message);
    }
  };

  return (
    <>
      <div className='flex justify-between flex-col lg:flex-row '>
        <div className='lg:w-5/12 px-6 py-3'>
          <div className='flex flex-row-2 gap-x-4'>
            <InputDate
              handleChange={handleChangeHospitalDetails}
              name='dateOfAdmission'
              label={
                <>
                  Date & Time Of Admission{' '}
                  <span className='ml-1 text-red-500'>*</span>
                </>
              }
              value={hospitalDetails?.dateOfAdmission?.split('T')[0] || ''}
            />
            <InputDate
              handleChange={handleChangeHospitalDetails}
              name='timeOfAdmission'
              label={<>&nbsp;</>}
              value={hospitalDetails?.timeOfAdmission || ''}
              type='time'
            />
          </div>

          <div>
            <p className={`text-white font-semibold items-start mt-3`}>
              Is this Emergency or Planned Hospitalized Event ?{' '}
              <span className='ml-1 text-red-500'>*</span>
            </p>
            <div className='flex flex-row pt-6 gap-x-4'>
              <InputRadio
                handleChange={handleChangeHospitalDetails}
                name='emergencyOrPlannedEvent'
                value='Emergency'
                radioLabel='Emergency'
                fieldName={hospitalDetails?.emergencyOrPlannedEvent}
              />

              <InputRadio
                handleChange={handleChangeHospitalDetails}
                name='emergencyOrPlannedEvent'
                value='Planned'
                radioLabel='Planned'
                fieldName={hospitalDetails?.emergencyOrPlannedEvent}
              />
            </div>
          </div>

          <Input
            placeHolder='Number Of Days In Hospital'
            label={
              <>
                Number Of Days In Hospital{' '}
                <span className='ml-1 text-red-500'>*</span>
              </>
            }
            handleChange={handleChangeHospitalDetails}
            name='daysInHospital'
            value={hospitalDetails?.daysInHospital || ''}
            status={stepFourErrors.daysInHospital ? 'error' : 'active'}
            message={stepFourErrors.daysInHospital}
            type='number'
          />
          <Input
            placeHolder='Days In ICU'
            label={<>Days In ICU</>}
            handleChange={handleChangeHospitalDetails}
            name='daysInICU'
            value={hospitalDetails?.daysInICU}
            status={stepFourErrors.daysInICU ? 'error' : 'active'}
            message={stepFourErrors.daysInICU}
            type='number'
          />

          <SharedSelect
            name='roomType'
            defaultOption='Select Room Type'
            handleChange={handleChangeHospitalDetails}
            value={hospitalDetails?.roomType}
            options={
              roomListSelectOptions &&
              roomListSelectOptions.map((name) => ({
                value: name,
                label: name,
              }))
            }
            //options={roomListSelectOptions}
            label={
              <>
                Room Type <span className='ml-1 text-red-500'>*</span>
              </>
            }
          />

          {charegesList &&
            charegesList.map((object,index) => (
              <>
                {/* {console.log(
										"compare",
										object.Key,
										admissionDetails && admissionDetails[object.Key],
										object
									)} */}
                <div className='mt-6'>
                  <Input
                    label={<>{object.label} {index === 0 ? <span className='ml-1 text-red-500'> *</span> : "" }</>}
                    handleChange={handleChangeHospitalDetails}
                    name={object.key}
                    value={
                      (hospitalDetails?.chargelist &&
                        hospitalDetails?.chargelist[object.key]) ||
                      ''
                    }
                    type='text'
                    placeHolder='Please specify the amount'
                  />
                </div>
              </>
            ))}

          {/* <Input
            placeHolder="Per Day Room Rent"
            label={<>Per Day Room Rent</>}
            handleChange={handleChangeHospitalDetails}
            name="perDayRoomRent"
            value={hospitalDetails?.chargelist?.perDayRoomRent}
            status={stepFourErrors.perDayRoomRent ? "error" : "active"}
            message={stepFourErrors.perDayRoomRent}
            type="number"
          />
          <Input
            placeHolder="Nursing & Services Charge"
            label={<>Nursing & Services Charge</>}
            handleChange={handleChangeHospitalDetails}
            name="nursing"
            value={hospitalDetails?.chargelist?.nursing}
            status={stepFourErrors.nursing ? "error" : "active"}
            message={stepFourErrors.nursing}
            type="number"
          />
          <Input
            placeHolder="Expected Cost For Investigation + Diagnostics"
            label={<>Expected Cost For Investigation + Diagnostics</>}
            handleChange={handleChangeHospitalDetails}
            name="costOfInvestigation"
            value={hospitalDetails?.chargelist?.costOfInvestigation}
            status={stepFourErrors.costOfInvestigation ? "error" : "active"}
            message={stepFourErrors.costOfInvestigation}
            type="number"
          />
          <Input
            placeHolder="ICU Charge"
            label={<>ICU Charge</>}
            handleChange={handleChangeHospitalDetails}
            name="icuCharges"
            value={hospitalDetails?.chargelist?.icuCharges}
            status={stepFourErrors.icuCharges ? "error" : "active"}
            message={stepFourErrors.icuCharges}
            type="number"
          />

          <Input
            placeHolder="OT Charge"
            label={<>OT Charge</>}
            handleChange={handleChangeHospitalDetails}
            name="otCharges"
            value={hospitalDetails?.chargelist?.otCharges}
            status={stepFourErrors.otCharges ? "error" : "active"}
            message={stepFourErrors.otCharges}
            type="number"
          />

          <Input
            placeHolder="Consultation Charge / Physician Charge"
            label={<>Consultation Charge / Physician Charge</>}
            handleChange={handleChangeHospitalDetails}
            name="physicianCharge"
            value={hospitalDetails?.chargelist?.physicianCharge}
            status={stepFourErrors.physicianCharge ? "error" : "active"}
            message={stepFourErrors.physicianCharge}
            type="number"
          />

          <Input
            placeHolder="Professional Fees Surgeon"
            label={<>Professional Fees Surgeon</>}
            handleChange={handleChangeHospitalDetails}
            name="professionalFeesSurgeon"
            value={hospitalDetails?.chargelist?.professionalFeesSurgeon}
            status={stepFourErrors.professionalFeesSurgeon ? "error" : "active"}
            message={stepFourErrors.professionalFeesSurgeon}
            type="number"
          />

          <Input
            placeHolder="Anesthetist Fees Charge"
            label={<>Anesthetist Fees Charge</>}
            handleChange={handleChangeHospitalDetails}
            name="anesthetist"
            value={hospitalDetails?.chargelist?.anesthetist}
            status={stepFourErrors.anesthetist ? "error" : "active"}
            message={stepFourErrors.anesthetist}
            type="number"
          />

          <Input
            placeHolder="Medicine + Cost Of Implants (If Applicable Please Specify)"
            label={
              <>Medicine + Cost Of Implants (If Applicable Please Specify)</>
            }
            handleChange={handleChangeHospitalDetails}
            name="costOfImplant"
            value={hospitalDetails?.chargelist?.costOfImplant}
            status={stepFourErrors.costOfImplant ? "error" : "active"}
            message={stepFourErrors.costOfImplant}
            type="number"
          />

          <Input
            placeHolder="Consumables"
            label={<>Consumables</>}
            handleChange={handleChangeHospitalDetails}
            name="consumables"
            value={hospitalDetails?.chargelist?.consumables}
            status={stepFourErrors.consumables ? "error" : "active"}
            message={stepFourErrors.consumables}
            type="number"
          />

          <Input
            placeHolder="Other Hospital If Any"
            label={<>Other Hospital If Any</>}
            handleChange={handleChangeHospitalDetails}
            name="otherHospitalIfAny"
            value={hospitalDetails?.chargelist?.otherHospitalIfAny}
            status={stepFourErrors.otherHospitalIfAny ? "error" : "active"}
            message={stepFourErrors.otherHospitalIfAny}
            type="number"
          />

          <Input
            placeHolder="All Include Package Charges If Any Applicable"
            label={<>All Include Package Charges If Any Applicable</>}
            handleChange={handleChangeHospitalDetails}
            name="allIncludingPackage"
            value={hospitalDetails?.chargelist?.allIncludingPackage}
            status={stepFourErrors.allIncludingPackage ? "error" : "active"}
            message={stepFourErrors.allIncludingPackage}
            type="number"
          /> */}

          <Input
            placeHolder='Total'
            label={<>Total<span className='ml-1 text-red-500'>*</span></>}
            handleChange={handleChangeHospitalDetails}
            name='total'
            value={totalCost}
            status={stepFourErrors.total ? 'error' : 'active'}
            message={stepFourErrors.total}
            isEdit={false}
            type='number'
          />
        </div>
        <div className='lg:w-7/12 px-6 py-3'>
          <div>
            <p className={`text-white font-semibold items-start mt-3`}>
              Mandatory Past History Of Any Chronic Illness <span className='ml-1 text-red-500'>*</span>
            </p>
            <div className='flex flex-row pt-6 gap-x-4'>
              <InputRadio
                handleChange={handleChangeHospitalDetails}
                name='anyPastHistoryAnyChronicIllness'
                value={true}
                radioLabel='Yes'
                fieldName={hospitalDetails?.anyPastHistory?.anyChronicIllness}
              />

              <InputRadio
                handleChange={handleChangeHospitalDetails}
                name='anyPastHistoryAnyChronicIllness'
                value={false}
                radioLabel='No'
                fieldName={hospitalDetails?.anyPastHistory?.anyChronicIllness}
              />
            </div>
          </div>

          {hospitalDetails?.anyPastHistory?.anyChronicIllness && (
            <>
              <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                <div className='col-span-4'>
                  <p className={`text-white font-semibold items-start mt-3`}>
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
                    name='month'
                    defaultOption='Select Month'
                    value={hospitalDetails?.anyPastHistory?.diabetes?.month}
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
                    name='year'
                    defaultOption='Select Year'
                    value={hospitalDetails?.anyPastHistory?.diabetes?.year}
                    options={yearList}
                  />
                </div>
              </div>

              <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                <div className='col-span-4'>
                  <p className={`text-white font-semibold items-start mt-3`}>
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
                    name='month'
                    defaultOption='Select Month'
                    value={hospitalDetails?.anyPastHistory?.heartDisease?.month}
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
                    name='year'
                    defaultOption='Select Year'
                    value={hospitalDetails?.anyPastHistory?.heartDisease?.year}
                    options={yearList}
                  />
                </div>
              </div>

              <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                <div className='col-span-4'>
                  <p className={`text-white font-semibold items-start mt-3`}>
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
                    name='month'
                    defaultOption='Select Month'
                    value={hospitalDetails?.anyPastHistory?.hypertension?.month}
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
                    name='year'
                    defaultOption='Select Year'
                    value={hospitalDetails?.anyPastHistory?.hypertension?.year}
                    options={yearList}
                  />
                </div>
              </div>

              <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                <div className='col-span-4'>
                  <p className={`text-white font-semibold items-start mt-3`}>
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
                    name='month'
                    defaultOption='Select Month'
                    value={
                      hospitalDetails?.anyPastHistory?.hyperlipidemias?.month
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
                    name='year'
                    defaultOption='Select Year'
                    value={
                      hospitalDetails?.anyPastHistory?.hyperlipidemias?.year
                    }
                    options={yearList}
                  />
                </div>
              </div>

              <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                <div className='col-span-4'>
                  <p className={`text-white font-semibold items-start mt-3`}>
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
                    name='month'
                    defaultOption='Select Month'
                    value={
                      hospitalDetails?.anyPastHistory?.osteoarthritis?.month
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
                    name='year'
                    defaultOption='Select Year'
                    value={
                      hospitalDetails?.anyPastHistory?.osteoarthritis?.year
                    }
                    options={yearList}
                  />
                </div>
              </div>

              <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                <div className='col-span-4'>
                  <p className={`text-white font-semibold items-start mt-3`}>
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
                            ...pre?.anyPastHistory?.asthmaCOPDBronchitis,
                            [e.target.name]: Number(e.target.value),
                          },
                        },
                      }))
                    }
                    name='month'
                    defaultOption='Select Month'
                    value={
                      hospitalDetails?.anyPastHistory?.asthmaCOPDBronchitis
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
                          asthmaCOPDBronchitis: {
                            ...pre?.anyPastHistory?.asthmaCOPDBronchitis,
                            [e.target.name]: Number(e.target.value),
                          },
                        },
                      }))
                    }
                    name='year'
                    defaultOption='Select Year'
                    value={
                      hospitalDetails?.anyPastHistory?.asthmaCOPDBronchitis
                        ?.year
                    }
                    options={yearList}
                  />
                </div>
              </div>

              <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                <div className='col-span-4'>
                  <p className={`text-white font-semibold items-start mt-3`}>
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
                    name='month'
                    defaultOption='Select Month'
                    value={hospitalDetails?.anyPastHistory?.cancer?.month}
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
                    name='year'
                    defaultOption='Select Year'
                    value={hospitalDetails?.anyPastHistory?.cancer?.year}
                    options={yearList}
                  />
                </div>
              </div>

              <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                <div className='col-span-4'>
                  <p className={`text-white font-semibold items-start mt-3`}>
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
                            ...pre?.anyPastHistory?.alcoholDragAbuse,
                            [e.target.name]: Number(e.target.value),
                          },
                        },
                      }))
                    }
                    name='month'
                    defaultOption='Select Month'
                    value={
                      hospitalDetails?.anyPastHistory?.alcoholDragAbuse?.month
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
                            ...pre?.anyPastHistory?.alcoholDragAbuse,
                            [e.target.name]: Number(e.target.value),
                          },
                        },
                      }))
                    }
                    name='year'
                    defaultOption='Select Year'
                    value={
                      hospitalDetails?.anyPastHistory?.alcoholDragAbuse?.year
                    }
                    options={yearList}
                  />
                </div>
              </div>

              <div className='grid sm:grid-cols-12 gap-8 items-center mt-6'>
                <div className='col-span-4'>
                  <p className={`text-white font-semibold items-start mt-3`}>
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
                            ...pre?.anyPastHistory?.anyHIVOrAilments,
                            [e.target.name]: Number(e.target.value),
                          },
                        },
                      }))
                    }
                    name='month'
                    defaultOption='Select Month'
                    value={
                      hospitalDetails?.anyPastHistory?.anyHIVOrAilments?.month
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
                            ...pre?.anyPastHistory?.anyHIVOrAilments,
                            [e.target.name]: Number(e.target.value),
                          },
                        },
                      }))
                    }
                    name='year'
                    defaultOption='Select Year'
                    value={
                      hospitalDetails?.anyPastHistory?.anyHIVOrAilments?.year
                    }
                    options={yearList}
                  />
                </div>
              </div>

              <div className='mt-6'>
                <Input
                  placeHolder='Any Other Ailments. Give Details'
                  label={<>Any Other Ailments. Give Details <span className='ml-1 text-red-500'>*</span></>}
                  handleChange={handleChangeHospitalDetails}
                  name='anyOtherAilments'
                  value={hospitalDetails?.anyPastHistory?.anyOtherAilments}
                  status={stepFourErrors.anyOtherAilments ? 'error' : 'active'}
                  message={stepFourErrors.anyOtherAilments}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-1 p-4" >

            </div> */}
    </>
  );
};

export default AdmissionDetails;
