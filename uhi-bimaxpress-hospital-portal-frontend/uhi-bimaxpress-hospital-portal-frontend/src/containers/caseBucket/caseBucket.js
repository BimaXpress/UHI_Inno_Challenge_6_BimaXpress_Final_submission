import React from 'react';
import axios from 'axios';
import notification from '../shared/notification';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';
import { RiDeleteBin6Line } from 'react-icons/ri';
import TableSearch from '../shared/table/tableSearchInput';
import TableSearchButton from '../shared/table/tableSearchButton';
import ReactTable from '../shared/reactTable';
import TableCheckbox from '../shared/table/tableCheckbox/index';
import eyeIcon from '../../assets/icon/eye.svg';
import filter from '../../assets/icon/filter.svg';
import SharedButton from '../shared/button';
import { Popconfirm } from 'antd';

// message Components
import SummaryModal from './modelComponents/summaryModal';
import AddActionModal from './modelComponents/addActionModal';
import BookOrderModal from '../logistics/components/bookOrder/components/bookOrderModal';
import OfferSummary from './modelComponents/esOfferDetailsModal/OfferSummary';
import EsOfferDetailsModal from './modelComponents/esOfferDetailsModal/EsOfferDetailsModal';
import BookShipmentESModal from './modelComponents/esOfferDetailsModal/BookShipmentModal';

const CaseBucket = (props) => {
  const {
    setBucketDataActivity,
    setSharedLoaderActivity,
    setNavbarHeadingActivity,
  } = props;

  const { bucketData, navbarHeading, userDetails } = props.state;
  const navigate = useNavigate();
  const param = useParams();

  const [tableRow, setTableRow] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [summaryData, setSummaryData] = useState({});
  const [openSummaryModal, setOpenSummaryModal] = useState(false);

  const [openAddActionModal, setOpenAddActionModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [bookOrderButton, setBookOrderButton] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // book order - logistics flow
  const [openBookOrderModal, setOpenBookOrderModal] = useState(false);
  const toggleBookOrderModal = () => {
    setOpenBookOrderModal((pre) => !pre);
  };

  const [openEsOfferDetailsModal, setopenEsOfferDetailsModal] = useState(false);
  const [openOfferSummery, setOpenOfferSummery] = useState(false);
  const [openBookShipmentESModal, setOpenBookShipmentESModal] = useState(false);

  const toggleOpenOfferSummery = () => {
    setOpenOfferSummery((pre) => !pre);
  };

  const toggleEsOfferDetailsModal = () => {
    setopenEsOfferDetailsModal((pre) => !pre);
  };

  const toggleOpenBookShipmentESModal = () => {
    setOpenBookShipmentESModal((pre) => !pre);
  };

  function toggleOpenSummaryModal() {
    setOpenSummaryModal((pre) => !pre);
  }

  function toggleAddActionModal() {
    if (summaryData?.claimNo) {
      setOpenAddActionModal((pre) => !pre);
      setSelectedAction('');
    } else {
      notification('warning', 'Claim number feild are required');
    }
  }

  const fetchBucketData = async (bucket) => {
    setSharedLoaderActivity(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_CASE_API}/case/getCases?formStatus=${bucket}&hospitalId=${userDetails?.data?._id}`
      );
      setBucketDataActivity(data.cases.reverse());
      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      if (error.message === 'Request failed with status code 404') {
        setBucketDataActivity({});
      } else {
        notification('error', error.message);
      }
    }
  };
  useEffect(() => {
    if (Object.entries(userDetails).length) {
      if (!navbarHeading.includes('|')) {
        setNavbarHeadingActivity(`${param.bucket} Cases`);
      }
      fetchBucketData(param.bucket);
    }
  }, [param.bucket, summaryData, userDetails]);

  const showDetails = (id, key) => {
    if (param.bucket === 'Draft') {
      navigate(`/newCase/${id}`);
    } else {
      setOpenSummaryModal(true);
      setSummaryData(bucketData[key]);
    }
  };

  const showESOfferDetails = (_id, key) => {
    setSummaryData(bucketData[key]);
    toggleEsOfferDetailsModal();
  };

  function timeConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

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
    }
  };

  useEffect(() => {
    const res = Object.entries(bucketData)?.map(
      ([
        key,
        {
          patientDetails: {
            name,
            email,
            contactNumber: { number },
          },
          hospitalDetails: { hospitalName, dateOfAdmission, timeOfAdmission },
          companyDetails,
          formStatus,
          claimNo,
          auditTrail,
          bucketStatus,
          _id,
        },
      ]) => ({
        name: name,
        email: email,
        phone: number,

        formStatus: formStatus,

        // admissionDate: `${format(new Date(dateOfAdmission), "E, d LLL Y hh:mm a")}`,
        admissionDate: dateOfAdmission ? (
          <>
            {dateOfAdmission && format(new Date(dateOfAdmission), 'd LLL Y')}{' '}
            {timeOfAdmission && timeConvert(timeOfAdmission)}
          </>
        ) : (
          <span className='text-xs text-gray-400'>NA</span>
        ),
        lastAction: (
          <span className={actionColor(auditTrail.reverse()[0]?.summary)}>
            {auditTrail[0]?.summary}
          </span>
        ),

        lastDate: format(new Date(auditTrail[0].lastDate), 'd LLL Y'),

        insuranceTPA: companyDetails?.tpaCompany
          ? companyDetails?.tpaCompany
          : companyDetails?.insuranceCompany,

        claimNumber: claimNo,
        _id: _id,

        action: (
          <img
            src={eyeIcon}
            alt='icon'
            onClick={() => showDetails(_id, key)}
            className='cursor-pointer pl-3'
          />
        ),
        earlySettlement: (
          <>
            <SharedButton
              style={
                bucketStatus === 'Enabled' ? 'bg-green-400' : 'bg-gray-500'
              }
              handleClick={() => showESOfferDetails(_id, key)}
              disabled={bucketStatus === 'Enabled' ? false : true}
              text={
                bucketStatus === 'Availed'
                  ? 'Availed'
                  : bucketStatus === 'Rejected'
                  ? 'Rejected'
                  : bucketStatus === 'Settled'
                  ? 'Settled'
                  : 'Check'
              }
            />
          </>
        ),
      })
    );
    setTableRow(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucketData]);

  const data = React.useMemo(() => tableRow, [tableRow]);
  let columns = React.useMemo(() => {
    switch (param?.bucket) {
      case 'Draft':
        return [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Phone Number',
            accessor: 'phone',
          },

          {
            Header: 'Admission Date',
            accessor: 'admissionDate',
          },

          {
            Header: 'Insurance/TPA',
            accessor: 'insuranceTPA',
          },
          {
            Header: 'Action',
            accessor: 'action',
          },
        ];

      case 'Unprocess':
        return [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Phone Number',
            accessor: 'phone',
          },

          {
            Header: 'Admission Date',
            accessor: 'admissionDate',
          },

          {
            Header: 'Insurance/TPA',
            accessor: 'insuranceTPA',
          },
          {
            Header: 'Claim Number',
            accessor: 'claimNumber',
          },

          {
            Header: 'Last Action Date',
            accessor: 'lastDate',
          },
          {
            Header: 'Action',
            accessor: 'action',
          },
        ];

      case 'Query':
        return [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Phone Number',
            accessor: 'phone',
          },

          {
            Header: 'Admission Date',
            accessor: 'admissionDate',
          },

          {
            Header: 'Insurance/TPA',
            accessor: 'insuranceTPA',
          },
          {
            Header: 'Claim Number',
            accessor: 'claimNumber',
          },

          {
            Header: 'Last Action Date',
            accessor: 'lastDate',
          },

          {
            Header: 'Action',
            accessor: 'action',
          },
        ];

      case 'Reject':
        return [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Phone Number',
            accessor: 'phone',
          },

          {
            Header: 'Admission Date',
            accessor: 'admissionDate',
          },

          {
            Header: 'Insurance/TPA',
            accessor: 'insuranceTPA',
          },
          {
            Header: 'Claim Number',
            accessor: 'claimNumber',
          },

          {
            Header: 'Last Action Date',
            accessor: 'lastDate',
          },

          {
            Header: 'Action',
            accessor: 'action',
          },
        ];

      case 'Approved':
        return [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Phone Number',
            accessor: 'phone',
          },

          {
            Header: 'Admission Date',
            accessor: 'admissionDate',
          },

          {
            Header: 'Insurance/TPA',
            accessor: 'insuranceTPA',
          },
          {
            Header: 'Claim Number',
            accessor: 'claimNumber',
          },

          {
            Header: 'Last Action Date',
            accessor: 'lastDate',
          },

          {
            Header: 'Action',
            accessor: 'action',
          },
        ];

      case 'Enhance':
        return [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Phone Number',
            accessor: 'phone',
          },

          {
            Header: 'Admission Date',
            accessor: 'admissionDate',
          },
          {
            Header: 'Last Action',
            accessor: 'lastAction',
          },
          {
            Header: 'Insurance/TPA',
            accessor: 'insuranceTPA',
          },
          {
            Header: 'Claim Number',
            accessor: 'claimNumber',
          },

          {
            Header: 'Last Action Date',
            accessor: 'lastDate',
          },

          {
            Header: 'Action',
            accessor: 'action',
          },
        ];

      case 'Fci':
        return [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Phone Number',
            accessor: 'phone',
          },

          {
            Header: 'Admission Date',
            accessor: 'admissionDate',
          },

          {
            Header: 'Last Action',
            accessor: 'lastAction',
          },

          {
            Header: 'Insurance/TPA',
            accessor: 'insuranceTPA',
          },
          {
            Header: 'Claim Number',
            accessor: 'claimNumber',
          },

          {
            Header: 'Last Action Date',
            accessor: 'lastDate',
          },

          {
            Header: 'Action',
            accessor: 'action',
          },
        ];

      case 'Discharge Approved':
        return [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Phone Number',
            accessor: 'phone',
          },

          {
            Header: 'Admission Date',
            accessor: 'admissionDate',
          },

          {
            Header: 'Insurance/TPA',
            accessor: 'insuranceTPA',
          },
          {
            Header: 'Claim Number',
            accessor: 'claimNumber',
          },

          {
            Header: 'Last Action Date',
            accessor: 'lastDate',
          },

          {
            Header: 'Action',
            accessor: 'action',
          },
        ];

      case 'Settled':
        return [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Phone Number',
            accessor: 'phone',
          },

          {
            Header: 'Admission Date',
            accessor: 'admissionDate',
          },

          {
            Header: 'Insurance/TPA',
            accessor: 'insuranceTPA',
          },
          {
            Header: 'Claim Number',
            accessor: 'claimNumber',
          },

          {
            Header: 'Last Action Date',
            accessor: 'lastDate',
          },

          {
            Header: 'Action',
            accessor: 'action',
          },
        ];

      default:
        break;
    }
  }, [param?.bucket]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    { columns, data },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) =>
            param.bucket === 'Draft' ||
            param.bucket === 'Discharge Approved' ? (
              <div>
                <TableCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ) : (
              ''
            ),

          Cell: ({ row }) =>
            param.bucket === 'Draft' ||
            param.bucket === 'Discharge Approved' ? (
              <div>
                <TableCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ) : (
              ''
            ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    const selectedItemsArray = [];
    selectedFlatRows.map((item) =>
      selectedItemsArray.push({
        caseId: item.original._id,
        companyName: item.original.insuranceTPA,
        claimNumber: item.original.claimNumber,
        name: item.original.name,
        phone: item.original.phone,
        email: item.original.email,
      })
    );

    setSelectedItems(selectedItemsArray);
  }, [selectedFlatRows]);

  useEffect(() => {
    if (selectedItems.length !== 0) {
      setBookOrderButton(true);
      selectedItems.map((object) => {
        if (object.companyName !== selectedItems[0].companyName) {
          setBookOrderButton(false);
        }
      });
    }
  }, [selectedItems]);

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize]);

  const deleteCases = async () => {
    try {
      setSharedLoaderActivity(true);
      await axios.delete(
        `${process.env.REACT_APP_CASE_API}/case/casesDeleteById`,
        { data: { casesToBeDeleted: selectedItems.map((item) => item.caseId) } }
      );
      await fetchBucketData(param.bucket);
      notification('info', 'Case has been successfully deleted!');
      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col bg-black h-full mx-6 my-5 rounded-md p-4 text-white`}
      >
        <div className='flex items-center justify-between flex-wrap p-2 pb-0'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex'>
              <div className='mr-4'>
                <TableSearch
                  value={inputValue}
                  handleChange={(val) => setInputValue(val)}
                  placeholder='Search data in table'
                />
              </div>
              <div>
                <TableSearchButton
                  handleClick={() => setGlobalFilter(inputValue)}
                />
              </div>
            </div>

            {param.bucket === 'Draft' && selectedItems.length ? (
              <Popconfirm
                placement='leftBottom'
                title='Are you sure want to delete selected cases ?'
                onConfirm={deleteCases}
                okText='Yes'
                cancelText='No'
              >
                <button>
                  <i className='fa-solid fa-trash-can text-red-500 text-lg mr-2'></i>
                </button>
              </Popconfirm>
            ) : (
              ''
            )}

            {param.bucket === 'Discharge Approved' &&
            bookOrderButton &&
            selectedItems.length > 0 ? (
              <button
                className={` rounded py-1 pl-2  bg-green-600 hover:bg-green-500 sm:p-2 sm:pl-4 text-white text-xs text-left `}
                onClick={toggleBookOrderModal}
              >
                <i className='fa-solid fa-cart-plus'></i>
                <span className='mx-2 text-sm font-semibold visible sm:visible '>
                  Book Order
                </span>
              </button>
            ) : (
              <></>
            )}
          </div>

          {/* <div className='flex items-center justify-between mr-4'>
          <div className='flex items-center text-xs text-fontColor'>
            <RiDeleteBin6Line className='text-fontColor text-lg mr-2 ' />
            Delete
          </div>
        </div> */}
        </div>

        <div className='p-2 mt-3'>
          <ReactTable
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            page={page}
            prepareRow={prepareRow}
            nextPage={nextPage}
            previousPage={previousPage}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            selectedFlatRows={selectedFlatRows}
            selectedRowIds={selectedRowIds}
          />
        </div>
      </div>
      {openSummaryModal && (
        <SummaryModal
          openSummaryModal={openSummaryModal}
          summaryData={summaryData}
          setSummaryData={setSummaryData}
          toggleOpenSummaryModal={toggleOpenSummaryModal}
          toggleAddActionModal={toggleAddActionModal}

          // handleActionClick={handleActionClick}
        />
      )}

      {openAddActionModal && (
        <AddActionModal
          openAddActionModal={openAddActionModal}
          toggleAddActionModal={toggleAddActionModal}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          summaryData={summaryData}
          // updateCase={updateCase}
          setSharedLoaderActivity={setSharedLoaderActivity}
          userDetails={userDetails}
        />
      )}

      {openBookOrderModal && (
        <BookOrderModal
          isCase={true}
          closeModal={toggleBookOrderModal}
          isOpen={openBookOrderModal}
          selectedItems={selectedItems}
          setSharedLoaderActivity={setSharedLoaderActivity}
          userDetails={userDetails}
        />
      )}

      {openEsOfferDetailsModal && (
        <EsOfferDetailsModal
          toggleEsOfferDetailsModal={toggleEsOfferDetailsModal}
          toggleOpenOfferSummery={toggleOpenOfferSummery}
          toggleOpenBookShipmentESModal={toggleOpenBookShipmentESModal}
          isOpen={openEsOfferDetailsModal}
          summaryData={summaryData}
          setSharedLoaderActivity={setSharedLoaderActivity}
        />
      )}

      {openOfferSummery && (
        <OfferSummary
          openOfferSummery={openOfferSummery}
          toggleOpenOfferSummery={toggleOpenOfferSummery}
          summaryData={summaryData}
          setSharedLoaderActivity={setSharedLoaderActivity}
        />
      )}

      {openBookShipmentESModal && (
        <BookShipmentESModal
          openBookShipmentESModal={openBookShipmentESModal}
          toggleOpenBookShipmentESModal={toggleOpenBookShipmentESModal}
          summaryData={summaryData}
          toggleOpenOfferSummery={toggleOpenOfferSummery}
          setSelectedItems={setSelectedItems}
          toggleBookOrderModal={toggleBookOrderModal}
        />
      )}
    </>
  );
};

export default CaseBucket;
