import React, { useState } from "react";
import SharedSelect from "../../../shared/SharedSelect";

const hospitalSelectOptions = [
  {
    label: "Kaveri Hospital",
    value: "Kaveri Hospital",
  },
  {
    label: "Apollo Hospital",
    value: "Apollo Hospital",
  },
];
const tpaSelectOptions = [
  {
    label: "Aditya Birla",
    value: "Aditya Birla",
  },
  {
    label: "Bajaj Allianz",
    value: "Bajaj Allianz",
  },
];

const DetailsOfTpa = (props) => {
  const { companyDetails, handleChangeDetailsOfTpa } = props;

  // const [hospitalSelectOptions, sethospitalSelectOptions] = useState([]);

  return (
    <>
      <div className="flex flex-col md:flex-row mt-2">
        <div className="md:w-1/2 m-2">
          <SharedSelect
            name="insuranceCompany"
            defaultOption="Select Insurance Company"
            value={companyDetails?.insuranceCompany || ""}
            options={hospitalSelectOptions}
            handleChange={handleChangeDetailsOfTpa}
          />
        </div>
        <div className="md:w-1/2 m-2">
          <SharedSelect
            name="tpaCompany"
            defaultOption="Select TPA Company"
            value={companyDetails?.tpaCompany || ""}
            options={tpaSelectOptions}
            handleChange={handleChangeDetailsOfTpa}
          />
        </div>
      </div>
    </>
  );
};

export default DetailsOfTpa;
