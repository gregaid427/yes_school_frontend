import { useState, useMemo } from 'react';
import { sortRows, filterRows, paginateRows } from './helpers';
import { Pagination } from './Pagination';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';

export const  Table = ({ columns, rows, rowsPerPage, hideSearchInput, searchColumnName, sideComponent, tableWidth }) => {
  const [age, setAge] = useState<string>('');

  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' });

  const filteredRows = useMemo(
    () => filterRows(rows, filters),
    [rows, filters],
  );
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort],
  );
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleSearch = (value, columnTitle) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [columnTitle]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[columnTitle];

        return updatedFilters;
      });
    }
  };

  const handleSort = (columnTitle) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === 'asc' && prevSort.orderBy === columnTitle
          ? 'desc'
          : 'asc',
      orderBy: columnTitle,
    }));
  };

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' });
    setActivePage(1);
    setFilters({});
  };

  return (
    <>
     
<div className={ "flex flex-col " + tableWidth  }>  
      <div className={"rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-6 " }>
        <div className="max-w-full overflow-x-auto">
          <div className="w-full  flex justify-between ">
            <div className="w-9/12 flex gap-3">
             {sideComponent}
            </div>

            <div  className={" w-3/12 flex flex-col float-right " + (hideSearchInput ? "hidden " : "  " ) }>
            
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="phoneNumber"
              >
                Search Result{' '}
              </label>
              <input
                className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                key={`${columns.columnTitle}-search`}
                type="search"
                placeholder={`Seach by ` + searchColumnName}
                value={filters[columns[0]]}
                onChange={(event) =>
                  handleSearch(event.target.value, searchColumnName)
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className={"rounded-sm border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark " }>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                {columns.map((column) => {
                  return (
                    <>
                    <th
                      key={column.columnTitle}
                      className=" py-2 p-4 font-medium text-black dark:text-white "
                    >
                      {column.columnTitle}
                    </th>
                    </>
                  );
                })}
              </tr> 
            </thead>
            <tbody>
              {calculatedRows.map((row) => {
                return (
                  <tr key={row.id}>
                    {' '}
                    {columns.map((column) => {
                      if (column.format) {
                        return (
                          <td
                            key={column.columnTitle}
                            className="border-b border-[#eee] py-2 px-3 dark:border-strokedark"
                          >
                            <p className="text-black  gap-3 flex dark:text-white">
                              {column.format(row.id)}{' '}
                            </p>
                            
                          </td>
                        );
                      }
                      return (
                        <td  className="border-b border-[#eee] py-2 px-3 dark:border-strokedark" key={column.columnTitle}>{row[column.columnTitle]}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {count > 0 ? (
            <Pagination
              activePage={activePage}
              count={count}
              rowsPerPage={rowsPerPage}
              totalPages={totalPages}
              setActivePage={setActivePage}
            />
          ) : (
            <p className="flex p-4 justify-around">No result found</p>
          )}
        </div>
      </div>



      </div>
      
    </>
  );
};
