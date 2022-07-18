import React, { useState, useEffect } from 'react';
import Input from '../../../shared/input/input';
import InputRadio from '../../../shared/inputRadio';
import InputDate from '../../../shared/inputDate';
import SharedSelect from '../../../shared/SharedSelect';
import InputCheckbox from '../../../shared/inputCheckbox';
import axiosConfig from '../../../../config/axiosConfig';
import notification from '../../../shared/notification';

const DoctorAndDiagnosisDetails = (props) => {
  const [doctorList, setDoctorList] = useState([]);

  const {
    setPatientDetails,
    setHospitalDetails,
    hospitalDetails,
    patientDetails,
    stepThreeErrors,
    handleChangePatientDetails,
    proposedLineOfTreatment,
    doctorDetails,
    setDoctorDetails,
    hospitalId,
  } = props;

  useEffect(() => {
    fetchDoctorList();
  }, []);

  const fetchDoctorList = async () => {
    try {
      const doctorListData = await axiosConfig.get(
        `${process.env.REACT_APP_HOSPITAL_API}/doctor/getDoctors?hospital=${hospitalId}`
      );

      console.log('doctorList  ...', doctorListData.data.data);

      setDoctorList(doctorListData.data.data);
      //  setRoomListSelectOptions(data.data.roomList);
    } catch (error) {
      //
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  return (
    <>
      <div className='flex justify-between flex-col lg:flex-row'>
        <div className='lg:w-1/2 px-6 py-3'>
          <SharedSelect
            name='selectTreatDoctor'
            defaultOption='Select Treating Doctor'
            value={doctorDetails?.name}
            handleChange={(e) => {
              doctorList.map((doctor) => {
                if (doctor.name === e.target.value) setDoctorDetails(doctor);
              });
            }}
            //options={hospitalSelectOptions}
            options={
              doctorList &&
              doctorList.map((object) => ({
                value: object.name,
                label: object.name,
              }))
            }
            label={
              <>
                Name Of The Treating Doctor
                <span className='ml-1 text-red-500'>*</span>
              </>
            }
          />

          <Input
            placeHolder='Nature Of Illness / Disease With Presenting Complaints'
            label={
              <>
                Nature Of Illness / Disease With Presenting Complaints
                <span className='ml-1 text-red-500'>*</span>
              </>
            }
            handleChange={handleChangePatientDetails}
            name='natureOfIllness'
            value={patientDetails?.natureOfIllness || ''}
            status={stepThreeErrors.natureOfIllness ? 'error' : 'active'}
            message={stepThreeErrors.natureOfIllness}
          />

          <Input
            placeHolder='Duration Of Present Ailment (Days)'
            label={<>Duration Of Present Ailment (Days)</>}
            handleChange={handleChangePatientDetails}
            name='durationOfPresentAilments'
            value={patientDetails?.durationOfPresentAilments || ''}
            status={
              stepThreeErrors.durationOfPresentAilments ? 'error' : 'active'
            }
            message={stepThreeErrors.durationOfPresentAilments}
          />

          <InputDate
            handleChange={handleChangePatientDetails}
            name='dateOfFirstConsultation'
            label={
              <>
                Date Of First Consultation{' '}
                <span className='ml-1 text-red-500'>*</span>
              </>
            }
            value={patientDetails?.dateOfFirstConsultation?.split('T')[0] || ''}
          />

          <Input
            placeHolder='Ailment As Per User'
            label={<>Ailment As Per User</>}
            handleChange={handleChangePatientDetails}
            name='ailmentAsPerUser'
            value={patientDetails?.ailmentAsPerUser || ''}
            status={stepThreeErrors.ailmentAsPerUser ? 'error' : 'active'}
            message={stepThreeErrors.ailmentAsPerUser}
          />

          <Input
            placeHolder='Cause Of Ailment'
            label={<>Cause Of Ailment</>}
            handleChange={handleChangePatientDetails}
            name='causeOfAilment'
            value={patientDetails?.causeOfAilment || ''}
            status={stepThreeErrors.causeOfAilment ? 'error' : 'active'}
            message={stepThreeErrors.causeOfAilment}
          />

          <Input
            placeHolder='Provisional Diagnosis'
            label={<>Provisional Diagnosis</>}
            handleChange={handleChangePatientDetails}
            name='provisionDiagnosis'
            value={patientDetails?.provisionDiagnosis || ''}
            status={stepThreeErrors.provisionDiagnosis ? 'error' : 'active'}
            message={stepThreeErrors.provisionDiagnosis}
          />

          <Input
            placeHolder='Past History Of Present Ailment , If Any'
            label={<>Past History Of Present Ailment , If Any</>}
            handleChange={handleChangePatientDetails}
            name='pastHistoryOfPresentAilments'
            value={patientDetails?.pastHistoryOfPresentAilments || ''}
            status={
              stepThreeErrors.pastHistoryOfPresentAilments ? 'error' : 'active'
            }
            message={stepThreeErrors.pastHistoryOfPresentAilments}
          />

          <Input
            placeHolder='ICD Code'
            label={<>ICD Code</>}
            handleChange={handleChangePatientDetails}
            name='icdCode'
            value={patientDetails?.icdCode || ''}
            status={stepThreeErrors.icdCode ? 'error' : 'active'}
            message={stepThreeErrors.icdCode}
          />

          <div className='mt-4'>
            <p className={`text-white font-semibold items-start`}>
              Proposed Line Of Treatment ?
              <span className='ml-1 text-red-500'>*</span>
            </p>

            <div className='flex justify-between flex-col xl:flex-row'>
              <div className='xl:w-1/2'>
                <div className='my-3'>
                  <InputCheckbox
                    handleChange={handleChangePatientDetails}
                    name='proposedLineOfTreatment'
                    value='Medical Management'
                    checkboxLabel='Medical Management'
                    // label='G'
                    checked={
                      proposedLineOfTreatment?.includes('Medical Management')
                        ? true
                        : false
                    }
                  />
                </div>
                <div className='my-3'>
                  <InputCheckbox
                    handleChange={handleChangePatientDetails}
                    name='proposedLineOfTreatment'
                    value='Intensive Care'
                    checkboxLabel='Intensive Care'
                    // label='L'
                    checked={
                      proposedLineOfTreatment?.includes('Intensive Care')
                        ? true
                        : false
                    }
                  />
                </div>
                <div className='my-3'>
                  <InputCheckbox
                    handleChange={handleChangePatientDetails}
                    name='proposedLineOfTreatment'
                    value='Non Allopathic Treatment'
                    checkboxLabel='Non Allopathic Treatment'
                    // label='A'
                    checked={
                      proposedLineOfTreatment?.includes(
                        'Non Allopathic Treatment'
                      )
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
              <div className='xl:w-1/2'>
                <div className='xl:my-3'>
                  <InputCheckbox
                    handleChange={handleChangePatientDetails}
                    name='proposedLineOfTreatment'
                    value='Surgical Management'
                    checkboxLabel='Surgical Management'
                    // label='Surgical Management'
                    checked={
                      proposedLineOfTreatment?.includes('Surgical Management')
                        ? true
                        : false
                    }
                  />
                </div>
                <div className='my-3'>
                  <InputCheckbox
                    handleChange={handleChangePatientDetails}
                    name='proposedLineOfTreatment'
                    value='Investigation'
                    checkboxLabel='Investigation'
                    // label='A'
                    checked={
                      proposedLineOfTreatment?.includes('Investigation')
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <Input
            placeHolder='If Investigation Or Medical Management Provide Details'
            label={<>If Investigation Or Medical Management Provide Details</>}
            handleChange={handleChangePatientDetails}
            name='ifInvestigationOrMedicalManagement'
            value={patientDetails?.ifInvestigationOrMedicalManagement || ''}
            status={
              stepThreeErrors.ifInvestigationOrMedicalManagement
                ? 'error'
                : 'active'
            }
            message={stepThreeErrors.ifInvestigationOrMedicalManagement}
          />
          <Input
            placeHolder='Route Of Drug Administration'
            label={
              <>
                Route Of Drug Administration
                <span className='ml-1 text-red-500'>*</span>
              </>
            }
            handleChange={handleChangePatientDetails}
            name='routeOfDrugAdministration'
            value={patientDetails?.routeOfDrugAdministration || ''}
            status={
              stepThreeErrors.routeOfDrugAdministration ? 'error' : 'active'
            }
            message={stepThreeErrors.routeOfDrugAdministration}
          />
        </div>
        <div className='lg:w-1/2 px-6 py-3'>
          <Input
            placeHolder='If Surgical Name Of Surgery'
            label={<>If Surgical, Name Of Surgery</>}
            handleChange={handleChangePatientDetails}
            name='surgicalNameofSurgery'
            value={patientDetails?.surgicalNameofSurgery || ''}
            status={stepThreeErrors.surgicalNameofSurgery ? 'error' : 'active'}
            message={stepThreeErrors.surgicalNameofSurgery}
          />

          <Input
            placeHolder='ICD 10 PCS Code'
            label={<>ICD 10 PCS Code</>}
            handleChange={handleChangePatientDetails}
            name='icdCode10Pcs'
            value={patientDetails?.icdCode10Pcs || ''}
            status={stepThreeErrors.icdCode10Pcs ? 'error' : 'active'}
            message={stepThreeErrors.icdCode10Pcs}
          />

          <div className='my-4'>
            <p className={`text-white font-semibold items-start`}>
              Relevant Clinic Findings
            </p>
            <div className='flex flex-row pt-6 gap-x-4'>
              <InputRadio
                handleChange={handleChangePatientDetails}
                name='relevantClinicChecked'
                value='Maternity'
                radioLabel='Maternity'
                fieldName={patientDetails?.relevantClinic?.checked}
              />

              <InputRadio
                handleChange={handleChangePatientDetails}
                name='relevantClinicChecked'
                value='Injury'
                radioLabel='Injury'
                fieldName={patientDetails?.relevantClinic?.checked}
              />
              <InputRadio
                handleChange={handleChangePatientDetails}
                name='relevantClinicChecked'
                value='Accident'
                radioLabel='Accident'
                fieldName={patientDetails?.relevantClinic?.checked}
              />
              <InputRadio
                handleChange={handleChangePatientDetails}
                name='relevantClinicChecked'
                value='Other'
                radioLabel='Other'
                fieldName={patientDetails?.relevantClinic?.checked}
              />
            </div>
          </div>

          {patientDetails?.relevantClinic?.checked === 'Maternity' && (
            <>
              <div className='my-4'>
                <p className={`text-white font-semibold items-start`}>
                  Maternity
                </p>
                <div className='flex flex-row pt-6 gap-x-4'>
                  <InputCheckbox
                    handleChange={handleChangePatientDetails}
                    name='maternity'
                    value='G'
                    checkboxLabel='G'
                    // label='G'
                    checked={
                      patientDetails?.relevantClinic?.maternity?.maternity?.includes(
                        'G'
                      )
                        ? true
                        : false
                    }
                  />
                  <InputCheckbox
                    handleChange={handleChangePatientDetails}
                    name='maternity'
                    value='P'
                    checkboxLabel='P'
                    // label='P'
                    checked={
                      patientDetails?.relevantClinic?.maternity?.maternity?.includes(
                        'P'
                      )
                        ? true
                        : false
                    }
                  />
                  <InputCheckbox
                    handleChange={handleChangePatientDetails}
                    name='maternity'
                    value='L'
                    checkboxLabel='L'
                    // label='L'
                    checked={
                      patientDetails?.relevantClinic?.maternity?.maternity?.includes(
                        'L'
                      )
                        ? true
                        : false
                    }
                  />
                  <InputCheckbox
                    handleChange={handleChangePatientDetails}
                    name='maternity'
                    value='A'
                    checkboxLabel='A'
                    // label='A'
                    checked={
                      patientDetails?.relevantClinic?.maternity?.maternity?.includes(
                        'A'
                      )
                        ? true
                        : false
                    }
                  />
                </div>
              </div>

              <InputDate
                handleChange={handleChangePatientDetails}
                name='expectedDateOfDelivery'
                label={<>Expected Delivery Date </>}
                value={
                  patientDetails?.relevantClinic?.maternity?.expectedDateOfDelivery?.split(
                    'T'
                  )[0] || ''
                }
              />
            </>
          )}

          {patientDetails?.relevantClinic?.checked === 'Injury' && (
            <>
              <Input
                placeHolder='How Did Injury Occur'
                label={<>How Did Injury Occur</>}
                handleChange={handleChangePatientDetails}
                name='occur'
                value={patientDetails?.relevantClinic?.injury?.occur || ''}
                status={stepThreeErrors.occur ? 'error' : 'active'}
                message={stepThreeErrors.occur}
              />
              <InputDate
                handleChange={handleChangePatientDetails}
                name='dateOfInjury'
                label={<>Date of Injury</>}
                value={
                  patientDetails?.relevantClinic?.injury?.dateOfInjury?.split(
                    'T'
                  )[0] || ''
                }
              />
            </>
          )}

          {patientDetails?.relevantClinic?.checked === 'Accident' && (
            <>
              <div className='my-4'>
                <p className={`text-white font-semibold items-start`}>
                  In Case Of Accident ?
                </p>
                <div className='flex flex-row pt-6 gap-x-4'>
                  <InputRadio
                    handleChange={handleChangePatientDetails}
                    name='inCaseOfAccidentChecked'
                    value={true}
                    radioLabel='Yes'
                    fieldName={
                      patientDetails?.relevantClinic?.accident?.inCaseOfAccident
                        ?.checked
                    }
                  />

                  <InputRadio
                    handleChange={handleChangePatientDetails}
                    name='inCaseOfAccidentChecked'
                    value={false}
                    radioLabel='No'
                    fieldName={
                      patientDetails?.relevantClinic?.accident?.inCaseOfAccident
                        ?.checked
                    }
                  />
                </div>
              </div>

              {patientDetails?.relevantClinic?.accident?.inCaseOfAccident
                ?.checked && (
                <>
                  <div className='my-4'>
                    <p className={`text-white font-semibold items-start`}>
                      Reported to Police ?
                    </p>
                    <div className='flex flex-row pt-6 gap-x-4'>
                      <InputRadio
                        handleChange={handleChangePatientDetails}
                        name='reportedToPolice'
                        value={true}
                        radioLabel='Yes'
                        fieldName={
                          patientDetails?.relevantClinic?.accident
                            ?.inCaseOfAccident?.reportedToPolice?.checked
                        }
                      />

                      <InputRadio
                        handleChange={handleChangePatientDetails}
                        name='reportedToPolice'
                        value={false}
                        radioLabel='No'
                        fieldName={
                          patientDetails?.relevantClinic?.accident
                            ?.inCaseOfAccident?.reportedToPolice?.checked
                        }
                      />
                    </div>
                  </div>

                  {patientDetails?.relevantClinic?.accident?.inCaseOfAccident
                    ?.reportedToPolice?.checked && (
                    <Input
                      placeHolder='FIR Number'
                      label={<>FIR Number</>}
                      handleChange={handleChangePatientDetails}
                      name='firNumber'
                      value={
                        patientDetails?.relevantClinic?.accident
                          ?.inCaseOfAccident?.reportedToPolice?.firNumber || ''
                      }
                      status={stepThreeErrors.name ? 'error' : 'active'}
                      message={stepThreeErrors.name}
                    />
                  )}
                </>
              )}

              <div className='my-4'>
                <p className={`text-white font-semibold items-start`}>
                  Injury/Disease Caused Due To Substance Abuse / Alcohol
                  Consumption ?
                </p>
                <div className='flex flex-row pt-6 gap-x-4'>
                  <InputRadio
                    handleChange={handleChangePatientDetails}
                    name='alcoholConsumption'
                    value={true}
                    radioLabel='Yes'
                    fieldName={
                      patientDetails?.relevantClinic?.accident
                        ?.alcoholConsumption
                    }
                  />

                  <InputRadio
                    handleChange={handleChangePatientDetails}
                    name='alcoholConsumption'
                    value={false}
                    radioLabel='No'
                    fieldName={
                      patientDetails?.relevantClinic?.accident
                        ?.alcoholConsumption
                    }
                  />
                </div>
              </div>

              <div className='my-4'>
                <p className={`text-white font-semibold items-start`}>
                  Test Conducted Or Not?
                </p>
                <div className='flex flex-row pt-6 gap-x-4'>
                  <InputRadio
                    handleChange={handleChangePatientDetails}
                    name='testConducted'
                    value={true}
                    radioLabel='Yes'
                    fieldName={
                      patientDetails?.relevantClinic?.accident?.testConducted
                    }
                  />
                  <InputRadio
                    handleChange={handleChangePatientDetails}
                    name='testConducted'
                    value={false}
                    radioLabel='No'
                    fieldName={
                      patientDetails?.relevantClinic?.accident?.testConducted
                    }
                  />
                </div>
              </div>

              <div className='my-4'>
                <p className={`text-white font-semibold items-start`}>
                  Is It RTA?
                </p>
                <div className='flex flex-row pt-6 gap-x-4'>
                  <InputRadio
                    handleChange={handleChangePatientDetails}
                    name='isItRTA'
                    value={true}
                    radioLabel='Yes'
                    fieldName={
                      patientDetails?.relevantClinic?.accident?.isItRTA
                    }
                  />

                  <InputRadio
                    handleChange={handleChangePatientDetails}
                    name='isItRTA'
                    value={false}
                    radioLabel='No'
                    fieldName={
                      patientDetails?.relevantClinic?.accident?.isItRTA
                    }
                  />
                </div>
              </div>
            </>
          )}
          {patientDetails?.relevantClinic?.checked === 'Other' && (
            <>
              <Input
                placeHolder='Other Details'
                label={<>Other Details</>}
                handleChange={handleChangePatientDetails}
                name='otherDetails'
                value={
                  patientDetails?.relevantClinic?.other?.otherDetails || ''
                }
                status={stepThreeErrors.otherDetails ? 'error' : 'active'}
                message={stepThreeErrors.otherDetails}
              />
            </>
          )}

          <Input
            placeHolder='If Other Treatments, Please Provide Details'
            label={<>If Other Treatments, Please Provide Details</>}
            handleChange={handleChangePatientDetails}
            name='ifOtherTreatment'
            value={patientDetails?.ifOtherTreatment || ''}
            status={stepThreeErrors.ifOtherTreatment ? 'error' : 'active'}
            message={stepThreeErrors.ifOtherTreatments}
          />
        </div>
      </div>
    </>
  );
};

export default DoctorAndDiagnosisDetails;
