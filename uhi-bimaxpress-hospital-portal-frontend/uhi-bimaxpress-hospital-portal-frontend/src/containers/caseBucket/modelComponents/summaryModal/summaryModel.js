import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import styles from './summaryModal.module.css';
import SharedButton from '../../../shared/button';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import ReactTable from '../../../shared/reactTable';
import eyeIcon from '../../../../assets/icon/eye.svg';
import Input from '../../../shared/input/input';
import axios from 'axios';
import notification from '../../../shared/notification';
import styleScroll from '../../../../scrollbar.module.css';

import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';
import TableCheckbox from '../../../shared/table/tableCheckbox/index';

const SummaryModal = (props) => {
  const {
    openSummaryModal,
    setSharedLoaderActivity,
    toggleOpenSummaryModal,
    summaryData,
    setSummaryData,
    toggleAddActionModal,
    handleActionClick,
  } = props;

  const param = useParams();

  const [claimNoPostData, setClaimNoPostData] = useState({});

  const [activeMenu, setActiveMenu] = useState(0);
  const [tableRow, setTableRow] = useState([]);

  const actionColor = (action) => {
    switch (action) {
      case 'Enhance Requested':
        return 'text-yellow-500';
      case 'Enhance Rejected':
        return 'text-red-500';
      case 'Enhance Approved':
        return 'text-green-500';

      case 'Final Claim Initiated':
        return 'text-green-500';
      case 'Final Claim Rejected':
        return 'text-red-500';

      case 'Unprocessed':
        return 'text-yellow-500';

      case 'Query':
        return 'text-orange';

      case 'Approved':
        return 'text-teal-500';

      case 'Rejected':
        return 'text-red-500';

      case 'Discharge Approved':
        return 'text-cyan-500';

      case 'Settled':
        return 'text-green-500';

      default:
        return 'text-gray-300';
    }
  };

  useEffect(() => {
    setClaimNoPostData(summaryData);

    const res = summaryData?.auditTrail
      .reverse()
      .map(
        (
          {
            action: action,
            amount: amount,
            lastDate: lastDate,
            summary: summary,
            documents,
          },
          index
        ) => ({
          actionTaken: action,

          lastActionDate: lastDate && format(new Date(lastDate), 'd LLL Y'),

          summary: (
            <span className={`${actionColor(summary)} font-semibold`}>
              {summary}
            </span>
          ),

          amount: Number(amount) ? (
            <span>₹{amount}</span>
          ) : (
            <span className='text-xs text-gray-400'>NA</span>
          ),

          documents: (
            <>
              {documents.length ? (
                <div className='flex justify-center'>
                  <i
                    onClick={() =>
                      documents.map((link) => {
                        window.open(link);
                      })
                    }
                    className='fa-solid fa-file-lines cursor-pointer text-white text-base '
                  ></i>
                </div>
              ) : (
                <div className='flex justify-center'>
                  <span className='text-xs text-gray-400'>NA</span>
                </div>
              )}
            </>
          ),
        })
      );
    setTableRow(res);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryData?.auditTrail]);

  const data = React.useMemo(() => tableRow, [tableRow]);
  let columns = React.useMemo(
    () => [
      {
        Header: 'Action Taken',
        accessor: 'actionTaken',
      },
      {
        Header: 'Last Action Date',
        accessor: 'lastActionDate',
      },
      {
        Header: '	Summary',
        accessor: 'summary',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Documents',
        accessor: 'documents',
      },
    ],
    []
  );

  const updateClaimNo = async () => {
    if (claimNoPostData?.claimNo) {
      try {
        setSharedLoaderActivity(true);
        const updateClaimNoData = await axios.patch(
          `${process.env.REACT_APP_CASE_API}/case/updateCase?caseId=${summaryData?._id}`,
          claimNoPostData
        );

        setSummaryData(updateClaimNoData.data.data);
        setSharedLoaderActivity(false);
        toggleOpenSummaryModal();
        notification('success', 'Claim number updated successfully');
      } catch (error) {
        const { response } = error;
        const { request, ...errorObject } = response; // take everything but 'request'
        console.log(errorObject.data.error.message);
        setSharedLoaderActivity(false);
        notification('error', errorObject.data.error.message);
      }
    } else {
      notification('warning', 'Claim number feild are required');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setClaimNoPostData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Modal
      isOpen={openSummaryModal}
      className={`absolute top-1/2 left-1/2 max-w-[750px] max-h-[500px]  min-h-[500px]  outline-none ${styles.modalContainer}`}
      overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
      ariaHideApp={false}
      onRequestClose={toggleOpenSummaryModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={` relative   max-w-[750px] max-h-[500px] min-h-[500px]  rounded px-6 py-4 bg-baseColor overflow-y-auto ${styleScroll.customScroll}  ${styles.mainContainer}`}
      >
        <IoClose
          className='absolute top-4 right-4 w-5 h-5 p-1 bg-red-500 rounded-full text-white cursor-pointer'
          onClick={toggleOpenSummaryModal}
        />

        <div className='flex flex-row mb-5'>
          <p
            onClick={() => setActiveMenu(0)}
            className={`text-white text-base rounded px-2 py-1  cursor-pointer ${
              activeMenu === 0 ? ' bg-orange  ' : ' bg-gray-600 bg-opacity-30'
            }`}
          >
            Summary
          </p>

          <p
            onClick={() => setActiveMenu(1)}
            className={`text-base rounded px-2 py-1  text-white ml-2 cursor-pointer ${
              activeMenu === 1 ? ' bg-orange ' : 'bg-gray-600 bg-opacity-30'
            }`}
          >
            Action Taken
          </p>
        </div>

        {activeMenu === 0 ? (
          <div className='flex flex-col'>
            {param.bucket === 'Unprocess' ? (
              <div className='flex justify-end py-2'>
                <button
                  className={` rounded py-1 pl-2  bg-green-600 hover:bg-green-500 sm:p-2 sm:pl-4 text-white text-sm text-left `}
                  onClick={updateClaimNo}
                >
                  <i className='fa-solid fa-floppy-disk'></i>
                  <span className='mx-2 text-sm font-semibold visible sm:visible '>
                    Save
                  </span>
                </button>
              </div>
            ) : null}
            <div className='grid lg:grid-cols-2  md:grid-cols-1 gap-4'>
              <div>
                <p className='text-white mb-2'>Name</p>
                <div className='bg-primary  rounded text-white text-[16px] px-2 py-2.5'>
                  {summaryData?.patientDetails?.name}
                </div>
              </div>
              <div>
                <p className='text-white mb-2'>Phone Number</p>
                <div className='bg-primary  rounded text-white text-[16px] px-2 py-2.5'>
                  {summaryData?.patientDetails?.contactNumber?.number}
                </div>
              </div>
              <div>
                <p className='text-white mb-2'>Admission Date</p>
                <div className='bg-primary  rounded text-white text-[16px] px-2 py-2.5'>
                  {summaryData?.hospitalDetails?.dateOfAdmission &&
                    format(
                      new Date(summaryData?.hospitalDetails?.dateOfAdmission),
                      'd LLL Y hh:mm a'
                    )}
                </div>
              </div>

              {param.bucket === 'Unprocess' ? (
                <Input
                  placeHolder='Enter claim number'
                  label={
                    <>
                      Claim Number <span className='ml-1 text-red-500'>*</span>
                    </>
                  }
                  handleChange={handleChange}
                  name='claimNo'
                  value={claimNoPostData?.claimNo}
                  type='text'
                  labelClass='mt-0'
                  inputClass='my-01 h-[45px] rounded mt-2 bg-primary'
                />
              ) : (
                <div>
                  <div>
                    <p className='text-white mb-2'>Claim Number</p>
                    <div className='bg-primary  rounded text-white text-[16px] px-2 py-2.5'>
                      {claimNoPostData?.claimNo}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <p className='text-white mb-1'>
                  TPA Company /Insurance Company
                </p>
                <div className='bg-primary h-10 rounded text-white text-[16px] pt-2 pl-2'>
                  {summaryData?.companyDetails?.tpaCompany
                    ? summaryData?.companyDetails?.tpaCompany
                    : summaryData?.companyDetails?.insuranceCompany}
                </div>
              </div>
              <div>
                <p className='text-white mb-1'>Case ID</p>
                <div className='bg-primary h-10 rounded text-white text-[16px] pt-2 pl-2'>
                  {summaryData?._id}
                </div>
              </div>
              <div>
                <p className='text-white mb-1'>City</p>
                <div className='bg-primary h-10 rounded text-white text-[16px] pt-2 pl-2'>
                  {summaryData?.patientDetails?.currentAddress?.city}
                </div>
              </div>
              <div>
                <p className='text-white mb-1'>Diagnosis</p>
                <div className='bg-primary h-10 rounded text-white text-[16px] pt-2 pl-2'>
                  {summaryData?.patientDetails?.provisionDiagnosis}
                </div>
              </div>
              <div>
                <p className='text-white mb-1'>IPD Patient Number</p>
                <div className='bg-primary h-10 rounded text-white text-[16px] pt-2 pl-2'>
                  {summaryData?.patientDetails?.ipdPatientNumber}
                </div>
              </div>
              <div>
                <p className='text-white mb-1'>Status</p>
                <div className='bg-primary h-10 rounded text-white text-[16px] pt-2 pl-2'>
                  {summaryData?.formStatus}
                </div>
              </div>
              {/* <div>
                                <p className='text-white mb-1'>Date of Application</p>
                                <div className='bg-primary h-10 rounded text-white text-[16px] pt-2 pl-2'>
                                    {format(
                                        new Date(
                                            summaryData?.auditTrail
                                                ?.reverse()
                                                ?.find((data) => data.action === 'Application Creation')
                                                ?.lastDate || '2000-01-01'
                                        ),
                                        'E, d LLL Y hh:mm a'
                                    )}
                                </div>
                            </div> */}
            </div>
          </div>
        ) : (
          <div className=''>
            {param.bucket !== 'Settled' && (
              <div className='flex flex-row justify-end'>
                <SharedButton
                  text='Add Action'
                  style={`bg-green-500 mr-3`}
                  name='addAction'
                  handleClick={toggleAddActionModal}
                />
              </div>
            )}
            <div className='p-2 pt-0'>
              <div>
                <table
                  {...getTableProps()}
                  className={`w-full mt-5 overflow-x-scroll`}
                >
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps()}
                            className={`bg-secondary py-3 px-4 text-sm font-semibold text-fontColor text-left ${styles.tableHeader}`}
                          >
                            {column.render('Header')}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className='px-4 pt-5 pb-4 border-b border-fontColor-darkGray text-sm text-fontColor font-thin'
                              >
                                {cell.render('Cell')}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SummaryModal;
