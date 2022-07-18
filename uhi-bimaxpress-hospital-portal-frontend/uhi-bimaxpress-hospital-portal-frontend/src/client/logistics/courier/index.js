import axios from "axios";
import notification from "../../../containers/shared/notification";

const getCourierOrders = async (
  details,
  setSharedLoaderActivity,
  setCourierOrdersList,
  status
) => {
  if (details._id) {
    try {
      setSharedLoaderActivity(true);
      const courierOrdersData = await axios.get(
        `${process.env.REACT_APP_LOGISTICS_API}/logistic/getCourierOrders?hospitalId=${details._id}&status=${status}`
      );

      console.log("courierOrdersData  ...", courierOrdersData.data.data);

      setCourierOrdersList(courierOrdersData.data.data);

      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);

      const { response } = error;
      const { request, ...errorObject } = response; // take everything but 'request'
      console.log(errorObject.data.error.message);

      console.log("error get curious order..........", error);
      notification("error", errorObject.data.error.message);
    }
  }
};

export default getCourierOrders;
