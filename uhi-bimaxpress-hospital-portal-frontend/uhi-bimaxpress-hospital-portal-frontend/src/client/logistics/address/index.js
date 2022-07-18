import axios from "axios";
import notification from "../../../containers/shared/notification";

const getPickUpAddress = async (
  details,
  setSharedLoaderActivity,
  setAddressList,
  setPickupAddress
) => {
  if (details._id) {
    try {
      setSharedLoaderActivity(true);
      const addressListData = await axios.get(
        `${process.env.REACT_APP_LOGISTICS_API}/logistic/getPickupAddress?hospitalId=${details._id}`
      );

      console.log("address  List  ...", addressListData.data.data);

      setAddressList(addressListData.data.data);

      if (setPickupAddress) {
        setPickupAddress(addressListData.data.data[0]);
      }

      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      const { response } = error;
      const { request, ...errorObject } = response; // take everything but 'request'
      console.log(errorObject.data.error.message);

      // console.log("error creating order..........", error);
      notification("error", errorObject.data.error.message);
    }
  }
};

export default getPickUpAddress;
