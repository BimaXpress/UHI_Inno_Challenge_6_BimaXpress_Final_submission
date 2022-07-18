import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './esOfferDetailsModal.module.css';
import { IoClose } from 'react-icons/io5';
import InputRadio from '../../../shared/inputRadio';
import SharedButton from '../../../shared/button';
import styleScroll from '../../../../scrollbar.module.css';
import Input from '../../../shared/input/input';
import { Popconfirm } from 'antd';
import axiosConfig from '../../../../config/axiosConfig';
import notification from '../../../shared/notification';

const EsOfferDetailsModal = (props) => {
  const {
    isOpen,
    toggleEsOfferDetailsModal,
    summaryData,
    setSharedLoaderActivity,
    toggleOpenOfferSummery,
    toggleOpenBookShipmentESModal,
  } = props;

  const [offerSelectionType, setofferSelectionType] =
    useState('interestGuarantee');

  const handleSubmitOffer = async (type) => {
    try {
      setSharedLoaderActivity(true);
      await axiosConfig.put(
        `${process.env.REACT_APP_CASE_API}/earlySettlement/offerDetails`,
        {
          caseId: summaryData._id,
          offerType: offerSelectionType,
        }
      );

      toggleEsOfferDetailsModal();

      if (type === 'Yes') {
        toggleOpenOfferSummery();
      }

      if (type === 'No') {
        toggleOpenBookShipmentESModal();
      }

      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        className={`absolute top-1/2 left-1/2 max-w-[750px] max-h-[500px]  min-h-[500px]  outline-none ${styles.modalContainer}`}
        overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
        ariaHideApp={false}
        onRequestClose={() => toggleEsOfferDetailsModal()}
        shouldCloseOnOverlayClick={true}
      >
        <div
          className={` relative max-w-[750px] max-h-[530px] min-h-[530px]  rounded px-6 py-4 bg-baseColor overflow-y-auto ${styleScroll.customScroll}  ${styles.mainContainer}`}
        >
          <IoClose
            className='absolute top-4 right-4 w-5 h-5 p-1 bg-red-500 rounded-full text-white cursor-pointer'
            onClick={() => toggleEsOfferDetailsModal()}
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
              Early Settlement offer Details
            </h1>
          </div>

          <div className='flex justify-between flex-col lg:flex-row'>
            <div className='lg:w-1/2 px-3'>
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
            </div>
            <div className='lg:w-1/2 px-3'>
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
          </div>

          <hr style={{ marginTop: '20px' }} />

          {/* Interest Guarantee */}
          <div style={{ width: '100%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                display: 'inline-block',
                width: '48%',
                borderRight: '1px solid white',
                marginRight: '15px',
                paddingRight: '15px',
              }}
            >
              <InputRadio
                name='Interest Guarantee'
                value='interestGuarantee'
                handleChange={(e) =>
                  setofferSelectionType(e.currentTarget.value)
                }
                fieldName={offerSelectionType}
                radioLabel='Interest Guarantee'
              />

              <Input
                label='Interest Guarantee Offer Amount'
                name='Offer Amount'
                value={summaryData?.earlySettlement?.offerAmountIG}
                inputClass={`my-1 h-10`}
                isEdit={false}
              />

              <Input
                label='Interest Guarantee Processing Fees'
                name='Offer Amount'
                value={summaryData?.earlySettlement?.processingFeesIG}
                inputClass={`my-1 h-10`}
                isEdit={false}
              />
            </div>

            {/* Interest Not Guarantee */}
            <div style={{ display: 'inline-block', width: '48%' }}>
              <InputRadio
                name='Interest Not Guarantee'
                value='interestNotGuarantee'
                handleChange={(e) =>
                  setofferSelectionType(e.currentTarget.value)
                }
                fieldName={offerSelectionType}
                radioLabel='Interest Not Guarantee'
              />

              <Input
                label='Interest Not Guarantee Offer Amount'
                name='Offer Amount'
                value={summaryData?.earlySettlement?.offerAmountING}
                inputClass={`my-1 h-10`}
                isEdit={false}
              />

              <Input
                label='Interest Not Guarantee Processing Fees'
                name='Offer Amount'
                value={summaryData?.earlySettlement?.processingfeesING}
                inputClass={`my-1 h-10`}
                isEdit={false}
              />
            </div>
          </div>

          <div className='flex justify-center mt-8'>
            <Popconfirm
              title='Did you send the physical documents to insurance company?'
              onConfirm={() => {
                handleSubmitOffer('Yes');
              }}
              onCancel={() => {
                handleSubmitOffer('No');
              }}
              okText='Yes'
              cancelText='No'
            >
              <SharedButton text='Avail Offer' />{' '}
            </Popconfirm>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EsOfferDetailsModal;
