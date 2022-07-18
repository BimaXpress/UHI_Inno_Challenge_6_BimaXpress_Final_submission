import Modal from 'react-modal';
import styles from './esOfferDetailsModal.module.css';
import { IoClose } from 'react-icons/io5';
import SharedButton from '../../../shared/button';
import styleScroll from '../../../../scrollbar.module.css';
import { useNavigate } from 'react-router-dom';
import Input from '../../../shared/input/input';

const BookShipmentESModal = (props) => {
  const navigate = useNavigate();

  const {
    openBookShipmentESModal,
    toggleOpenBookShipmentESModal,
    summaryData,
    toggleOpenOfferSummery,
    setSelectedItems,
    toggleBookOrderModal,
  } = props;

  const handleBookSlot = () => {
    setSelectedItems([
      {
        caseId: summaryData._id,
        companyName: summaryData?.companyDetails?.tpaCompany
          ? summaryData?.companyDetails?.insuranceCompany
          : '',
        claimNumber: summaryData?.claimNo,
        name: summaryData?.patientDetails?.name,
        phone: summaryData?.patientDetails?.contactNumber?.number,
        email: summaryData?.patientDetails?.email,
      },
    ]);

    toggleOpenBookShipmentESModal();
    toggleBookOrderModal();
  };

  return (
    <>
      <Modal
        isOpen={openBookShipmentESModal}
        className={`absolute top-1/2 left-1/2 max-w-[750px] max-h-[500px]  min-h-[500px]  outline-none ${styles.modalContainer}`}
        overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
        onRequestClose={toggleOpenBookShipmentESModal}
        shouldCloseOnOverlayClick={false}
      >
        <div
          className={` relative max-w-[750px] rounded p-5 bg-baseColor overflow-y-auto ${styleScroll.customScroll}  ${styles.mainContainer}`}
        >
          <IoClose
            className='absolute top-4 right-4 w-5 h-5 p-1 bg-red-500 rounded-full text-white cursor-pointer'
            onClick={toggleOpenBookShipmentESModal}
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
              Book Your Shipment
            </h1>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4'>
            <Input
              label={<>Claim Number</>}
              name='Claim Number'
              value={summaryData?.claimNo}
              inputClass={`my-1 h-10`}
              isEdit={false}
            />
            <Input
              label={<>Patient Name</>}
              name='Patient Name'
              value={summaryData?.patientDetails?.name}
              inputClass={`my-1 h-10`}
              isEdit={false}
            />

            <Input
              label={<>Insurance Company/TPA</>}
              name='Insurance Company/TPA'
              value={
                summaryData?.companyDetails?.tpaCompany
                  ? summaryData?.companyDetails?.tpaCompany
                  : summaryData?.companyDetails?.insuranceCompany
              }
              inputClass={`my-1 h-10`}
              isEdit={false}
            />
            <Input
              label={<>Discharge Approved Amount</>}
              name='Discharge Approved Amount'
              value={
                summaryData?.auditTrail?.filter(
                  (data) => data.action === 'Discharge Approved'
                )[0]?.amount
              }
              inputClass={`my-1 h-10`}
              isEdit={false}
            />
          </div>
          <div
            className='flex m-5 mb-4 justify-center '
            // style={{ position: 'relative', left: '60%' }}
          >
            <SharedButton
              handleClick={handleBookSlot}
              text='Book Your Slot'
              style={`mx-2 bg-green-500`}
            />
            <SharedButton
              handleClick={() => {
                toggleOpenBookShipmentESModal();
                toggleOpenOfferSummery();
              }}
              text='Skip It For Later'
              style={`mx-2 bg-green-500`}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookShipmentESModal;
