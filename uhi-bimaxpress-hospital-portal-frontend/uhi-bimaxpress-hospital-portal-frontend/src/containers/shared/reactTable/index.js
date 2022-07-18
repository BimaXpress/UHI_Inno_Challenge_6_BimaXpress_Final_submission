import React from 'react';
import { Row } from 'react-table';
import styles from './ReactTable.module.css';
import { FiCheckSquare } from 'react-icons/fi';
import download from '../../../assets/icon/download.svg';
import PaginationButton from '../PaginationButton';

export default function ReactTable(props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    selected,
    showPagination = true,
    showResultCount = true,
    headerColor = 'bg-baseColor',
    noDataMessage = 'No Cases Found',
  } = props;
  return (
    <>
      <table {...getTableProps()} className='w-full'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className={`${headerColor} py-3 px-3 text-sm font-semibold text-fontColor text-left ${styles.tableHeader}`}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className='px-3 pt-5 pb-5 border-b border-primary text-sm text-fontColor font-thin'
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

      {page?.length !== 0 ? (
        <></>
      ) : (
        <div className='flex flex-col justify-center items-center w-full p-10'>
          <img src='/empty.svg' className='w-64 mt-10'></img>
          <p className='text-white mt-10 border border-gray-600 rounded-full px-3'>
            {noDataMessage}
          </p>
        </div>
      )}

      <div className='flex items-center justify-between pt-7'>
        {showResultCount ? (
          <p className='text-sm text-fontColor text-semibold'>
            Results:{' '}
            <span className='text-sm text-fontColor pl-1'>{page?.length}</span>{' '}
          </p>
        ) : null}
        {selected ? (
          <div className='flex items-center'>
            <div className='flex items-center text-xs text-fontColor mr-6'>
              <FiCheckSquare className='text-fontColor text-lg mr-2 ' />
              Selected
            </div>
            <button className={`${styles.downloadBtn}`}>
              <img src={download} alt='icon' className='mr-2' />
              Download
            </button>
          </div>
        ) : null}
        {showPagination ? (
          <div className='flex'>
            <div className='pr-2'>
              <PaginationButton
                leftIcon={true}
                handleClick={() => previousPage()}
                disability={!canPreviousPage}
              />
            </div>
            <PaginationButton
              rightIcon={true}
              handleClick={() => nextPage()}
              disability={!canNextPage}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
