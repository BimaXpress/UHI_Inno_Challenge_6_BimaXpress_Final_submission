import React from "react";

const HospitalDetails = (props) => {
  const { setSharedLoaderActivity, setUserDetailsActivity } = props;
  const { sharedLoader, userDetails } = props.state;

  return (
    <>
      <div className="text-green-500 grid grid-cols-2 gap-5 w-full">
        <div className="w-full  flex-col">
          <p className="text-gray-400 test-base">Hosptal Name</p>
          <p className="text-white bg-gray-600 bg-opacity-20 font-semibold rounded px-3 py-3 mt-2">
            {userDetails.data?.name}
          </p>
        </div>
        <div className="w-full  flex-col">
          <p className="text-gray-400 test-base">Hosptal Email</p>
          <p className="text-white bg-gray-600 bg-opacity-20 font-semibold rounded px-3 py-3 mt-2">
            {userDetails.data?.email}
          </p>
        </div>
        <div className="w-full  flex-col">
          <p className="text-gray-400 test-base">Contact Number</p>
          <p className="text-white bg-gray-600 bg-opacity-20 font-semibold rounded px-3 py-3 mt-2">
            {`${userDetails.data?.contactNumber?.countryCode}${userDetails.data?.contactNumber?.number}`}
          </p>
        </div>
        <div className="w-full  flex-col">
          <p className="text-gray-400 test-base">Address</p>
          <p className="text-white bg-gray-600 bg-opacity-20 font-semibold rounded px-3 py-3 mt-2">
            {`${userDetails.data?.currentAddress?.buildingNumber}${userDetails.data?.currentAddress?.area}
            ${userDetails.data?.currentAddress?.landmark} ${userDetails.data?.currentAddress?.city}
            ${userDetails.data?.currentAddress?.state} India ${userDetails.data?.currentAddress?.pinCode}`}
          </p>
        </div>

        <div className="w-full  flex-col">
          <p className="text-gray-400 test-base">Registration Number</p>
          <p className="text-white bg-gray-600 bg-opacity-20 font-semibold rounded px-3 py-3 mt-2">
            {`${userDetails.data?.hospitalRegistrationNumber}`}
          </p>
        </div>

        <div className="w-full  flex-col">
          <p className="text-gray-400 test-base">Rohini Code</p>
          <p className="text-white bg-gray-600 bg-opacity-20 font-semibold rounded px-3 py-3 mt-2">
            {`${userDetails.data?.rohiniCode}`}
          </p>
        </div>

        <div className="w-full  flex-col">
          <p className="text-gray-400 test-base">GST Number</p>
          <p className="text-white bg-gray-600 bg-opacity-20 font-semibold rounded px-3 py-3 mt-2">
            {`${userDetails.data?.gstNumber}`}
          </p>
        </div>

        <div className="w-full  flex-col">
          <p className="text-gray-400 test-base">Current Plan</p>
          <p className="text-white bg-gray-600 bg-opacity-20 font-semibold rounded px-3 py-3 mt-2">
            {`${userDetails.data?.currentPlan?.planName}`}
          </p>
        </div>
      </div>
    </>
  );
};

export default HospitalDetails;
