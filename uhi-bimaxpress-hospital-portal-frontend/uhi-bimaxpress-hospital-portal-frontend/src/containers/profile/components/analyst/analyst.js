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

import AnalystViewAddModal from './components/analystViewAddModal';

const Analyst = (props) => {
  const { setSharedLoaderActivity, setUserDetailsActivity } = props;
  const { userDetails } = props.state;
  const [tableRow, setTableRow] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [analyst, setanalyst] = useState([]);
  const [selctedAnalyst, setSelctedAnalyst] = useState({});
  const [openAnalystModal, setOpenAnalystModal] = useState(false);
  const [analystModalType, setAnalystModalType] = useState('');

  console.log('----->', selctedAnalyst, openAnalystModal, analystModalType);

  const fetchAnalyst = async () => {
    try {
      setSharedLoaderActivity(true);
      const analystData = await axios.get(
        `${process.env.REACT_APP_HOSPITAL_API}/analyst/getAnalysts?hospitalId=${userDetails.data._id}`
      );
      setSharedLoaderActivity(false);
      setanalyst(analystData?.data?.data);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  useEffect(() => {
    if (Object.entries(userDetails).length) {
      fetchAnalyst();
    }
  }, [userDetails]);

  const toggleAnalystModal = (type, key) => {
    if (type === 'summary') {
      setSelctedAnalyst(analyst[key]);
      setAnalystModalType('summary');
    }

    if (type === 'new') {
      setAnalystModalType('new');
    }
    setOpenAnalystModal((pre) => !pre);
  };

  useEffect(() => {
    const res = Object.entries(analyst)?.map(
      ([key, { name, email, employeeID, contactNumber }]) => ({
        name,
        email,
        employeeID,
        contactNumber,
        viewEdit: (
          <div className='w-full'>
            <button
              className='outline-none ml-2'
              onClick={() => toggleAnalystModal('summary', key)}
            >
              <i className='fa-solid fa-eye'></i>
            </button>
          </div>
        ),
      })
    );
    setTableRow(res);
  }, [analyst]);

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
        Header: 'Employee ID',
        accessor: 'employeeID',
      },
      {
        Header: 'Contact Number',
        accessor: 'contactNumber',
      },
      {
        Header: 'View/Edit',
        accessor: 'viewEdit',
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
            handleClick={() => toggleAnalystModal('new')}
            text={
              <>
                <i className='fa-solid fa-plus mr-2'></i>Add Analyst
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
              noDataMessage='No Analyst'
            />
          </div>
        </div>
      </div>
      {openAnalystModal && (
        <AnalystViewAddModal
          toggleAnalystModal={toggleAnalystModal}
          selctedAnalyst={selctedAnalyst}
          openAnalystModal={openAnalystModal}
          analystModalType={analystModalType}
          userDetails={userDetails}
          setSharedLoaderActivity={setSharedLoaderActivity}
          setAnalystModalType={setAnalystModalType}
          fetchAnalyst={fetchAnalyst}
        />
      )}
    </>
  );
};

export default Analyst;
