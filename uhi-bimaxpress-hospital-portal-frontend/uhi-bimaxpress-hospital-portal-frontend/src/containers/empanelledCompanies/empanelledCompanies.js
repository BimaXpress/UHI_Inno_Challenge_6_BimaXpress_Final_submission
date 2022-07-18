import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';

import TableSearch from '../shared/table/tableSearchInput';
import TableSearchButton from '../shared/table/tableSearchButton';
import ReactTable from '../shared/reactTable';

import { notification } from 'antd';
import SharedButton from '../shared/button';
import EmpanelledViewAddModal from './components/empanelledViewAddModal';

const EmpanelledCompanies = (props) => {
  const { setSharedLoaderActivity } = props;
  const { userDetails } = props.state;

  const [tableRow, setTableRow] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [empanelledCompany, setempanelledCompany] = useState([]);
  const [selctedEmpanelledCompany, setSelctedEmpanelledCompany] = useState({});
  const [empanelledViewAddModalType, setEmpanelledViewAddModalType] =
    useState('');
  const [openEmpanelledViewAddModal, setOpenEmpanelledViewAddModal] =
    useState(false);

  const fetchEmpanelledCompany = async () => {
    try {
      setSharedLoaderActivity(true);
      const {
        data: { data },
      } = await axios.get(
        `${process.env.REACT_APP_HOSPITAL_API}/empanelledCompany/getCompany?hospitalId=${userDetails.data._id}`
      );

      for (const index in data) {
        const imageData = await axios.get(
          `${process.env.REACT_APP_HOSPITAL_API}/insuranceTpa/getInsuranceTpa?_id=${data[index].companyId}`
        );
        data[index].imageURL = imageData?.data?.data[0]?.image;
      }
      setempanelledCompany(data);
      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  useEffect(() => {
    fetchEmpanelledCompany();
  }, [userDetails]);

  const toggleOpenEmpanelledViewAddModal = (type, key) => {
    if (type === 'summary') {
      setEmpanelledViewAddModalType('summary');
      setSelctedEmpanelledCompany(empanelledCompany[key]);
    }

    if (type === 'new') {
      setEmpanelledViewAddModalType('new');
    }

    setOpenEmpanelledViewAddModal((pre) => !pre);
  };

  useEffect(() => {
    const res = Object.entries(empanelledCompany)?.map(
      ([key, { imageURL, name, discount, exclusion, id, companyId }]) => ({
        image: <img src={imageURL} className='w-14' />,
        name: name.replace(/_/g, ' '),
        discount: discount,
        exclusion: exclusion,
        viewEdit: (
          <div className='w-full'>
            <button
              className='outline-none ml-2'
              onClick={() => toggleOpenEmpanelledViewAddModal('summary', key)}
            >
              <i className='fa-solid fa-eye'></i>
            </button>
          </div>
        ),
      })
    );
    setTableRow(res);
  }, [empanelledCompany]);

  const data = React.useMemo(() => tableRow, [tableRow]);
  let columns = React.useMemo(() => {
    return [
      {
        Header: 'Image',
        accessor: 'image',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Discount',
        accessor: 'discount',
      },
      {
        Header: 'Exclusion',
        accessor: 'exclusion',
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
      <div className='flex flex-col bg-black h-full mx-5 rounded-md my-5 p-5 '>
        <div className='flex justify-end'>
          <SharedButton
            handleClick={() => toggleOpenEmpanelledViewAddModal('new')}
            text={
              <>
                <i className='fa-solid fa-plus mr-2'></i>Add Company
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
              <div>
                <p className='text-white mr-1'>
                  Total Companies: {empanelledCompany?.length}
                </p>
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
              noDataMessage='No Data'
            />
          </div>
        </div>
      </div>

      {openEmpanelledViewAddModal && (
        <EmpanelledViewAddModal
          openEmpanelledViewAddModal={openEmpanelledViewAddModal}
          toggleOpenEmpanelledViewAddModal={toggleOpenEmpanelledViewAddModal}
          empanelledViewAddModalType={empanelledViewAddModalType}
          selctedEmpanelledCompany={selctedEmpanelledCompany}
          setEmpanelledViewAddModalType={setEmpanelledViewAddModalType}
          setSharedLoaderActivity={setSharedLoaderActivity}
          userDetails={userDetails}
          fetchEmpanelledCompany={fetchEmpanelledCompany}
        />
      )}
    </>
  );
};

export default EmpanelledCompanies;
