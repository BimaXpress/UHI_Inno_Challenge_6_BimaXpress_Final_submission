import axiosConfig from '../../config/axiosConfig';
import notification from '../../containers/shared/notification';

const getWalletBalance = async (
  details,
  setSharedLoaderActivity,
  setWalletBalanceActivity
) => {
  if (details._id) {
    try {
      // setSharedLoaderActivity(true);
      const walletDetails = await axiosConfig.get(
        `${process.env.REACT_APP_PAYMENT_API}/wallet/walletBalance?razorPayCustomerId=${details.razorPayCustomerId}&userId=${details._id}&userType=hospital`
      );
      console.log('walletDetails ...... ', walletDetails.data.data.balance);
      setWalletBalanceActivity(walletDetails.data.data.balance / 100);
      // setSharedLoaderActivity(false);
    } catch (error) {
      //@ts-ignore
      console.log('Wallet .....', error);
      notification('error', error?.message);
    }
  }
};

export default getWalletBalance;
