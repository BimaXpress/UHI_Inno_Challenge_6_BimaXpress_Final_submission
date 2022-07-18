import React, { useState } from "react";
import Input from "../../../shared/input/input";
import InputRadio from "../../../shared/inputRadio";
import InputDate from "../../../shared/inputDate";
import SharedSelect from "../../../shared/SharedSelect";

const PatientDetails = (props) => {
  const {
    stepTwoErrors,
    patientDetails,
    handleChangePatientDetails,
    handleDateOfBirth,
    companyDetails,
    handleChangeDetailsOfTpa,
    insuranceCompanyList,
    tpaList,
    isFreeze,
  } = props;

  return (
    <>
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="lg:w-1/2 px-6 py-3">
          <SharedSelect
            name="insuranceCompany"
            label={
              <>
                Insurance Company
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            defaultOption="Select Insurance Company"
            value={companyDetails?.insuranceCompany || ""}
            options={insuranceCompanyList}
            handleChange={handleChangeDetailsOfTpa}
            disabled={isFreeze}
          />
        </div>
        <div className="lg:w-1/2 px-6 py-3">
          <SharedSelect
            label={
              <>
                Insurance TPA Company
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            name="tpaCompany"
            defaultOption="Select TPA Company"
            value={companyDetails?.tpaCompany || ""}
            options={tpaList}
            handleChange={handleChangeDetailsOfTpa}
            disabled={isFreeze}
          />
        </div>
      </div>
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="lg:w-1/2 px-6 py-3">
          <Input
            placeHolder="Patient Name"
            label={
              <>
                Patient Name
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChangePatientDetails}
            name="name"
            value={patientDetails?.name || ""}
            status={stepTwoErrors.name ? "error" : "active"}
            message={stepTwoErrors.name}
            isEdit={!isFreeze}
          />
          <div className="my-4">
            <p className={`text-white font-semibold items-start`}>
              Gender<span className="ml-1 text-red-500">*</span>
            </p>
            <div className="flex flex-row pt-6 gap-x-4">
              <InputRadio
                handleChange={handleChangePatientDetails}
                name="gender"
                value="Male"
                radioLabel="Male"
                fieldName={patientDetails?.gender}
                disabled={isFreeze}
              />

              <InputRadio
                handleChange={handleChangePatientDetails}
                name="gender"
                value="Female"
                radioLabel="Female"
                fieldName={patientDetails?.gender}
                disabled={isFreeze}
              />
            </div>
          </div>

          <div className="flex flex-row-3 gap-x-4">
            <InputDate
              handleChange={handleDateOfBirth}
              name="dateOfBirth"
              label={
                <>
                  Date of Birth <span className="ml-1 text-red-500">*</span>
                </>
              }
              value={patientDetails?.dateOfBirth?.split("T")[0] || ""}
              isEdit={!isFreeze}
            />

            <Input
              placeHolder="Age Year"
              label={<>Age Year</>}
              // handleChange={handleChangePatientDetails}
              name="ageYear"
              value={patientDetails?.ageYear || "0"}
              type="number"
              isEdit={false}
            />

            <Input
              placeHolder="Age Month"
              label={<>Age Month</>}
              // handleChange={handleChangePatientDetails}
              name="ageMonth"
              value={patientDetails?.ageMonth || "0"}
              type="number"
              isEdit={false}
            />
          </div>

          <Input
            placeHolder="IPD Patient Number"
            label={
              <>
                IPD Patient Number
              </>
            }
            handleChange={handleChangePatientDetails}
            name="ipdPatientNumber"
            value={patientDetails?.ipdPatientNumber || ""}
            status={stepTwoErrors.ipdPatientNumber ? "error" : "active"}
            message={stepTwoErrors.ipdPatientNumber}
          />

          <Input
            placeHolder="Occupation"
            label={
              <>
                Occupation
              </>
            }
            handleChange={handleChangePatientDetails}
            name="occupation"
            value={patientDetails?.occupation || ""}
            status={stepTwoErrors.occupation ? "error" : "active"}
            message={stepTwoErrors.occupation}
          />

          <Input
            placeHolder="Contact Number"
            label={
              <>
                Contact Number
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChangePatientDetails}
            name="contactNumber"
            value={patientDetails?.contactNumber?.number || ""}
            status={stepTwoErrors.contactNumber ? "error" : "active"}
            message={stepTwoErrors.contactNumber}
            type="number"
            maxLength="10"
          />

          <Input
            placeHolder="Attending Relative Contact Number"
            label={
              <>
                Attendant Contact Number
              </>
            }
            handleChange={handleChangePatientDetails}
            name="relativeContactNumber"
            value={patientDetails?.relativeContactNumber?.number || ""}
            status={stepTwoErrors.relativeContactNumber ? "error" : "active"}
            message={stepTwoErrors.relativeContactNumber}
            type="number"
            maxLength="10"
          />

          <Input
            placeHolder="Insured Member ID Card Number"
            label={
              <>
                Insured Member ID Card Number
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChangePatientDetails}
            name="healthId"
            value={patientDetails?.healthId || ""}
            status={stepTwoErrors.healthId ? "error" : "active"}
            message={stepTwoErrors.healthId}
          />

          <Input
            placeHolder="Enter building number / house number"
            label={
              <>
                Building Number / House Number
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChangePatientDetails}
            name="buildingNumber"
            value={patientDetails?.currentAddress?.buildingNumber || ""}
            status={stepTwoErrors.buildingNumber ? "error" : "active"}
            message={stepTwoErrors.buildingNumber}
          />
          <Input
            placeHolder="Area"
            label={
              <>
                Area
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChangePatientDetails}
            name="area"
            value={patientDetails?.currentAddress?.area || ""}
            status={stepTwoErrors.area ? "error" : "active"}
            message={stepTwoErrors.area}
          />
          <Input
            placeHolder="Landmark"
            label={
              <>
                Landmark              </>
            }
            handleChange={handleChangePatientDetails}
            name="landmark"
            value={patientDetails?.currentAddress?.landmark || ""}
            status={stepTwoErrors.name ? "error" : "active"}
            message={stepTwoErrors.name}
          />
        </div>
        <div className="lg:w-1/2 px-6 py-3">
          <Input
            placeHolder="Policy Number / Corporate Name"
            label={
              <>
                Policy Number / Corporate Name
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChangePatientDetails}
            name="policyNumber"
            value={patientDetails?.policyNumber || ""}
            status={stepTwoErrors.policyNumber ? "error" : "active"}
            message={stepTwoErrors.policyNumber}
            isEdit={!isFreeze}
          />

          <Input
            placeHolder="Employee ID"
            label={
              <>
                Employee ID
              </>
            }
            handleChange={handleChangePatientDetails}
            name="employeeId"
            value={patientDetails?.employeeId || ""}
            status={stepTwoErrors.employeeId ? "error" : "active"}
            message={stepTwoErrors.employeeId}
          />

          <div className="my-4">
            <p className={`text-white font-semibold items-start`}>
              Currently Do You Have Any Other Mediclaim/ Health insurance ?
              <span className="ml-1 text-red-500">*</span>
            </p>
            <div className="flex flex-row pt-6 gap-x-4">
              <InputRadio
                handleChange={handleChangePatientDetails}
                name="healthInsuranceChecked"
                value={true}
                radioLabel="Yes"
                fieldName={patientDetails?.healthInsurance?.checked}
              />

              <InputRadio
                handleChange={handleChangePatientDetails}
                name="healthInsuranceChecked"
                value={false}
                radioLabel="No"
                fieldName={patientDetails?.healthInsurance?.checked}
              />
            </div>
          </div>

          {patientDetails?.healthInsurance?.checked && (
            <>
              <Input
                placeHolder="Company Name"
                label={
                  <>
                    Company Name
                    <span className="ml-1 text-red-500">*</span>
                  </>
                }
                handleChange={handleChangePatientDetails}
                name="healthInsuranceCompanyName"
                value={patientDetails?.healthInsurance?.companyName || ""}
                status={
                  stepTwoErrors.healthInsurance?.companyName
                    ? "error"
                    : "active"
                }
                message={stepTwoErrors.healthInsurance?.companyName}
              />

              <Input
                placeHolder="Give Details"
                label={
                  <>
                    Give Details
                    <span className="ml-1 text-red-500">*</span>
                  </>
                }
                handleChange={handleChangePatientDetails}
                name="healthInsuranceGiveDetails"
                value={patientDetails?.healthInsurance?.details || ""}
                status={
                  stepTwoErrors.healthInsurance?.details ? "error" : "active"
                }
                message={stepTwoErrors.healthInsurance?.details}
              />
            </>
          )}

          <div className="my-4">
            <p className={`text-white font-semibold items-start`}>
              Do You Have Family Physician ?
            </p>
            <div className="flex flex-row pt-6 gap-x-4">
              <InputRadio
                handleChange={handleChangePatientDetails}
                name="physicianChecked"
                value={true}
                radioLabel="Yes"
                fieldName={patientDetails?.physician?.checked}
              />

              <InputRadio
                handleChange={handleChangePatientDetails}
                name="physicianChecked"
                value={false}
                radioLabel="No"
                fieldName={patientDetails?.physician?.checked}
              />
            </div>
          </div>

          {patientDetails?.physician?.checked && (
            <>
              <Input
                placeHolder="Physician Name"
                label={
                  <>
                    Physician Name
                  </>
                }
                handleChange={handleChangePatientDetails}
                name="physicianName"
                value={patientDetails?.physician?.name || ""}
                status={stepTwoErrors.physician?.name ? "error" : "active"}
                message={stepTwoErrors.physician?.name}
              />
              <Input
                placeHolder="Physician Contact Number"
                label={
                  <>
                    Physician Contact Number
                  </>
                }
                handleChange={handleChangePatientDetails}
                name="physicianContactNumber"
                value={patientDetails?.physician?.contactNumber?.number || ""}
                status={
                  stepTwoErrors.physician?.contactNumber?.number
                    ? "error"
                    : "active"
                }
                message={stepTwoErrors.physician?.contactNumber?.number}
                type="number"
              />
            </>
          )}

          <Input
            placeHolder="City"
            label={
              <>
                City
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChangePatientDetails}
            name="city"
            value={patientDetails?.currentAddress?.city || ""}
            status={stepTwoErrors.name ? "error" : "active"}
            message={stepTwoErrors.name}
          />

          <Input
            placeHolder="State"
            label={
              <>
                State
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChangePatientDetails}
            name="state"
            value={patientDetails?.currentAddress?.state || ""}
            status={stepTwoErrors.state ? "error" : "active"}
            message={stepTwoErrors.state}
          />
          <Input
            placeHolder="Country"
            label={
              <>
                Country
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChangePatientDetails}
            name="country"
            value={patientDetails?.currentAddress?.country || ""}
            status={stepTwoErrors.country ? "error" : "active"}
            message={stepTwoErrors.country}
          />
          <Input
            placeHolder="Pincode"
            label={
              <>
                Pincode
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChangePatientDetails}
            name="pinCode"
            value={patientDetails?.currentAddress?.pinCode || ""}
            status={stepTwoErrors.pinCode ? "error" : "active"}
            message={stepTwoErrors.pinCode}
            type="number"
            maxLength="6"
          />
        </div>
      </div>
    </>
  );
};

export default PatientDetails;
