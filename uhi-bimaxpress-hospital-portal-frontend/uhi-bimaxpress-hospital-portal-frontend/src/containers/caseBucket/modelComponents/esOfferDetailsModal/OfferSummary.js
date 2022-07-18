import Modal from 'react-modal';
import { useState, useEffect } from 'react';

import styles from './esOfferDetailsModal.module.css';
import { IoClose } from 'react-icons/io5';
import SharedButton from '../../../shared/button';
import styleScroll from '../../../../scrollbar.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../shared/input/input';
import axiosConfig from '../../../../config/axiosConfig';
import notification from '../../../shared/notification';

Modal.setAppElement('#root');

const OfferSummary = (props) => {
  const [caseData, setCaseData] = useState({});
  const {
    openOfferSummery,
    toggleOpenOfferSummery,
    summaryData,
    setSharedLoaderActivity,
  } = props;

  const navigate = useNavigate();

  const fetchCaseData = async () => {
    try {
      setSharedLoaderActivity(true);
      const {
        data: { data },
      } = await axiosConfig.get(
        `${process.env.REACT_APP_CASE_API}/case/getCaseById?caseId=${summaryData._id}`
      );
      setCaseData(data);
      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  useEffect(() => {
    fetchCaseData();
  }, []);

  const confirmOrder = async () => {
    try {
      setSharedLoaderActivity(true);

      await axiosConfig.put(
        `${process.env.REACT_APP_CASE_API}/earlySettlement/confirmOrder`,
        {
          caseId: caseData._id,
        }
      );
      notification('success', 'Comfirm Successfully');

      navigate('/earlySettlementDashboard');
      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  return (
    <>
      <Modal
        isOpen={openOfferSummery}
        className={`absolute top-1/2 left-1/2 max-w-[750px] outline-none ${styles.modalContainer}`}
        overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
        onRequestClose={toggleOpenOfferSummery}
        shouldCloseOnOverlayClick={false}
      >
        <div
          className={` relative max-w-[750px]  rounded p-4 bg-baseColor overflow-y-auto ${styleScroll.customScroll} ${styles.mainContainer}`}
        >
          <IoClose
            className='absolute top-4 right-4 w-5 h-5 p-1 bg-red-500 rounded-full text-white cursor-pointer'
            onClick={toggleOpenOfferSummery}
          />
          <div className='flex justify-center'>
            <h1
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: '22px',
                marginBottom: '15px',
              }}
            >
              Offer Summary
            </h1>
          </div>

          <div className='grid grid-cols-1  sm:grid-cols-2 gap-x-4'>
            <Input
              label={<>Claim Number</>}
              name='Claim Number'
              value={caseData?.claimNo}
              isEdit={false}
            />
            <Input
              label={<>Patient Name</>}
              name='Patient Name'
              value={caseData?.patientDetails?.name}
              isEdit={false}
            />
            <Input
              label={<>Processing Fee</>}
              name='Processing Fee'
              value={
                caseData?.offerType === 'interestGuarantee'
                  ? caseData?.earlySettlement?.processingFeesIG
                  : caseData?.earlySettlement?.processingfeesING
              }
              isEdit={false}
            />

            <Input
              label={<>Offer Amount</>}
              name='Offer Amount'
              value={
                caseData?.offerType === 'interestGuarantee'
                  ? caseData?.earlySettlement?.offerAmountIG
                  : caseData?.earlySettlement?.offerAmountING
              }
              isEdit={false}
            />
            <Input
              label={<>OD Limit</>}
              name='OD Limit'
              value={caseData?.earlySettlement?.od_Limit}
              isEdit={false}
            />
          </div>

          <div className='flex justify-center p-3'>
            <SharedButton handleClick={confirmOrder} text='Confirm' />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OfferSummary;
