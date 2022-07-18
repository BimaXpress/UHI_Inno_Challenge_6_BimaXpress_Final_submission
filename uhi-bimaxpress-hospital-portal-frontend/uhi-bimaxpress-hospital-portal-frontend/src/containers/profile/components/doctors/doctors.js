import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';

import TableSearch from '../../../shared/table/tableSearchInput';
import TableSearchButton from '../../../shared/table/tableSearchButton';
import ReactTable from '../../../shared/reactTable';

import { notification } from 'antd';
import SharedButton from '../../../shared/button';

import DoctorViewAddModal from './components/doctorViewAddModal';
import DoctorsSlotsModal from './components/doctorSlotsModal';
import DoctorExistingSlotModal from './components/doctorExistingSlotModal';

const Doctors = (props) => {
  const { setSharedLoaderActivity } = props;
  const { userDetails } = props.state;

  const [tableRow, setTableRow] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [doctors, setDoctors] = useState([]);
  const [openDoctorViewAddModal, setOpenDoctorViewAddModal] = useState(false);
  const [openSlotsModal, setOpenSlotsModal] = useState(false);
  const [openExistingSlotModal, setOpenExistingSlotModal] = useState(false);
  const [doctorViewAddModalType, setDoctorViewAddModalType] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState({});

  const fetchDoctors = async () => {
    try {
      setSharedLoaderActivity(true);

      const doctors = await axios.get(
        `${process.env.REACT_APP_HOSPITAL_API}/doctor/getDoctors?hospital=${userDetails?.data?._id}`
      );

      setDoctors(doctors?.data?.data);
      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  const toggleOpenSlotsModal = () => {
    setOpenSlotsModal((pre) => !pre);
  };

  const toggleOpenExistingSlotModal = () => {
    setOpenExistingSlotModal((pre) => !pre);
  };

  const toggleDoctorViewAddModal = (type, key) => {
    if (type === 'summary') {
      setSelectedDoctor(doctors[key]);
      setDoctorViewAddModalType('summary');
    }
    if (type === 'new') {
      setDoctorViewAddModalType('new');
    }

    setOpenDoctorViewAddModal((pre) => !pre);
  };

  const manageSlots = (key) => {
    setSelectedDoctor(doctors[key]);
    toggleOpenSlotsModal();
  };

  useEffect(() => {
    if (Object.entries(userDetails).length) {
      fetchDoctors();
    }
  }, [userDetails]);

  useEffect(() => {
    const res = Object.entries(doctors)?.map(
      ([
        key,
        { name, email, qualification, specializations, registrationNumber },
      ]) => ({
        name,
        email,
        qualification,
        specializations,
        registrationNumber,
        viewEdit: (
          <div className='w-full'>
            <button
              className='outline-none ml-2'
              onClick={() => toggleDoctorViewAddModal('summary', key)}
            >
              <i className='fa-solid fa-eye'></i>
            </button>
          </div>
        ),

        manageSlots: (
          <div className='w-[70%] text-center'>
            <button className='outline-none' onClick={() => manageSlots(key)}>
              <i className='fa-solid fa-calendar-day'></i>
            </button>
          </div>
        ),
      })
    );
    setTableRow(res);
  }, [doctors]);

  const data = React.useMemo(() => tableRow, [tableRow]);

  let columns = React.useMemo(() => {
    return [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Qualification',
        accessor: 'qualification',
      },

      {
        Header: 'Specializations',
        accessor: 'specializations',
      },
      {
        Header: 'Registration Number',
        accessor: 'registrationNumber',
      },
      {
        Header: 'View/Edit',
        accessor: 'viewEdit',
      },

      {
        Header: 'Manage Slots',
        accessor: 'manageSlots',
      },
    ];
  }, []);

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
      hooks.visibleColumns.push((columns) => [...columns]);
    }
  );

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize]);

  return (
    <>
      <div>
        <div className='flex justify-end'>
          <SharedButton
            handleClick={() => toggleDoctorViewAddModal('new')}
            text={
              <>
                <i className='fa-solid fa-plus mr-2'></i>Add Doctor
              </>
            }
            style='bg-green-500'
          />
        </div>
        <div className='h-full mt-4'>
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
            </div>
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
              noDataMessage='No Doctors'
            />
          </div>
        </div>
      </div>
      {openDoctorViewAddModal && (
        <DoctorViewAddModal
          openDoctorViewAddModal={openDoctorViewAddModal}
          doctorViewAddModalType={doctorViewAddModalType}
          selectedDoctor={selectedDoctor}
          toggleDoctorViewAddModal={toggleDoctorViewAddModal}
          setDoctorViewAddModalType={setDoctorViewAddModalType}
          userDetails={userDetails}
          setSharedLoaderActivity={setSharedLoaderActivity}
          fetchDoctors={fetchDoctors}
        />
      )}

      {openSlotsModal && (
        <DoctorsSlotsModal
          openSlotsModal={openSlotsModal}
          toggleOpenSlotsModal={toggleOpenSlotsModal}
          selectedDoctor={selectedDoctor}
          userDetails={userDetails}
          setSharedLoaderActivity={setSharedLoaderActivity}
          toggleOpenExistingSlotModal={toggleOpenExistingSlotModal}
        />
      )}

      {openExistingSlotModal && (
        <DoctorExistingSlotModal
          openExistingSlotModal={openExistingSlotModal}
          toggleOpenExistingSlotModal={toggleOpenExistingSlotModal}
          selectedDoctor={selectedDoctor}
          setSharedLoaderActivity={setSharedLoaderActivity}
        />
      )}
    </>
  );
};

export default Doctors;
