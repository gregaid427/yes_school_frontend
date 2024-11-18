import { useEffect, useRef, useState } from 'react';

import DefaultLayout from '../../layout/DefaultLayout';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Dialog } from 'primereact/dialog';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../common/Loader';

import toast, { Toaster } from 'react-hot-toast';

import TableBtn from '../../components/Svgs/TableBtn';
import { GetTodayRecordAction } from '../../redux/slices/attendanceSlice';
const AttendanceList = () => {
  ///////////////////////////////////
  let today = new Date();
  today = today.toLocaleDateString('en-CA');
  const [date, setDate] = useState(today);
  const [visible, setVisible] = useState(false);

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  //////////////////////////////////////

  const [loader, setLoader] = useState(true);
  const [pagesval, setpagesval] = useState(9999999999999);

  const [nodes, setdata] = useState([]);

  const dispatch = useDispatch();

  const attendance = useSelector((state) => state?.attendance);

  const { GetTodayRecord, GetRecordByDate } = attendance;

  useEffect(() => {
    if (GetTodayRecord?.success == 1) {
      let data = GetTodayRecord?.data;
      setdata(data);
    }
  }, [GetTodayRecord]);

  useEffect(() => {
    setdata([]);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    dispatch(GetTodayRecordAction());
  }, []);

  let data = { nodes };

  const theme = useTheme([
    {
      // HeaderRow: `
      // background-color: #313D4A;
      // border-bottom: 1px solid #fff !important;

      // `,
      HeaderRow: `
    .th {
      border-bottom: 1px solid #a0a8ae;
      padding: 5px 0px;
    }
  `,
      Table: `
  --data-table-library_grid-template-columns:  30% 20% 20% 15%   15%;
`,
      BaseCell: `
        font-size: 15px;
        //color:white;
        padding: 5px 0px;
      //   border-bottom: 1px solid #313D4A !important;
      //   //  background-color: #24303F;

       `,
    //       Row: `
//   &:nth-of-type(odd) {
//     background-color: #24303F;
//   }

//   &:nth-of-type(even) {
//     background-color: #202B38;
//   }
// `,
    },
  ]);

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: pagesval == 'All' ? 90000000000000000 : pagesval,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  var data2;
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '40%' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      ></Dialog>
      <div className=" flex-col">
        <div
          className={
            'rounded-sm border max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
          }
        >
          <label
            className="mb-2 block text-md font-medium text-black dark:text-white"
            htmlFor="fullName"
          >
            Attendance Records For Today ( {date} )
          </label>
        </div>
        <div
          className={
            'rounded-sm  w-full border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
          }
        >
          <div className="flex gap-3  flex-col">
            <div>
              <Table
                data={data}
                pagination={pagination}
                layout={{ custom: true }}
                theme={theme}
              >
                {(tableList) => (
                  <>
                    <Header>
                      <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                        <HeaderCell>Class (Section)</HeaderCell>
                        <HeaderCell>Section</HeaderCell>
                        <HeaderCell>Taken By</HeaderCell>
                        <HeaderCell className="">Date Taken</HeaderCell>

                        <HeaderCell>Actions</HeaderCell>
                      </HeaderRow>
                    </Header>


                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                      {tableList?.map((item) => (
                        <Row key={item.id} item={item} className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                          <Cell className="  ">
                            <span>{item.classid}</span>
                          </Cell>

                          <Cell className="  ">
                            <span>{item.section ? item.section : 'None'}</span>
                          </Cell>
                          <Cell className="  ">
                            <span>{item.createdby}</span>
                          </Cell>
                          <Cell className="  ">
                            <span>{item.datetaken}</span>
                          </Cell>

                          <Cell className="  ">
                            <div className="flex gap-1">
                              <TableBtn
                                clickFunction={() => {
                                  navigate('/attendance/searchdetail', {
                                    state: { action: 1, value: item },
                                  });
                                }}
                                text={'View'}
                                color={'bg-primary'}
                              />
                              <TableBtn
                                clickFunction={() => {
                                  navigate('/attendance/updatedetail', {
                                    state: { action: 1, value: item },
                                  });
                                }}
                                text={'Update'}
                                color={'bg-primary'}
                              />
                            </div>
                          </Cell>
                        </Row>
                      ))}
                    </Body>
                  </>
                )}
              </Table>
            </div>
          </div>
        </div>{' '}
      </div>
    </DefaultLayout>
  );
};

export default AttendanceList;
