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

import SectionSelect1 from '../../components/SectionsSelect1';
import ClassSelect from '../../components/ClassSelect';
import toast, { Toaster } from 'react-hot-toast';
import {
  fetchCustomStudentsClassPromoteAction,
  fetchStudentsClassPromoteAction,
} from '../../redux/slices/studentSlice';
import AttendanceRadio from '../../components/AttendanceRadio';
import AttendanceModal from '../../components/AttendanceModal';
import {
  CreateAttendanceAction,
  GetRecordByDateAction,
  GetSesionRecordsAction,
  resetcreateattendance,
} from '../../redux/slices/attendanceSlice';
import TableBtn from '../../components/Svgs/TableBtn';
const SearchAttendance = () => {
  ///////////////////////////////////
  let today = new Date();
  today = today.toLocaleDateString('en-CA');
  const [date, setDate] = useState(today);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('top');
  const [allStudent, setAllStudent] = useState(true);
  const [onlySelected, setOnlySelected] = useState(false);
  const [repeat, setRepeat] = useState([]);

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  //////////////////////////////////////

  const [loader, setLoader] = useState(true);

  const [searchval, setSearchval] = useState('First Name');
  const [pagesval, setpagesval] = useState(9999999999999);

  const [searcher, setSearcher] = useState('firstName');
  const [isChecked2, setIsChecked2] = useState(false);
  const [radioReset, setradioReset] = useState(false);

  const [age, setAge] = useState('');
  const [nodes, setdata] = useState([]);
  const [classs, setClasss] = useState();
  const [sections, setsections] = useState([]);
  const [name, setname] = useState([]);

  const [clazz, setclazz] = useState();
  const [classid, setclassId] = useState();
  const [ids, setIds] = useState([]);
  const [idsName, setIdsName] = useState([]);

  const [nextClass, setNextclass] = useState();

  const [sectionzz, setsectionzz] = useState();
  const [isChecked1, setIsChecked1] = useState(false);
  const [type, setType] = useState('All');
  const [sessionzz, setsession] = useState();
  const session = useSelector((state) => state?.session);
  const { fetchsessionactive, fetchsession } = session;
  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);
  const attendance = useSelector((state) => state?.attendance);
  const [classinfo, setclassinfo] = useState();


  const {
    loading,
    error,
    fetchStudent,
    fetchStudentcustom,
    fetchcustom,
    fetchStudentcustomloading,
    fetchcustomloading,
    singleStudent,
    singleStudentloading,
    studentPromote,
  } = student;
  console.log(repeat);
  const { GetSesionRecords, GetRecordByDate } = attendance;

  useEffect(() => {
    if (GetRecordByDate?.success == 1) {
      let data = GetRecordByDate?.data;
      setdata(data);
    }
    if (GetSesionRecords?.success == 1) {
      let data = GetSesionRecords?.data;
      setdata(data);
    }
  }, [GetRecordByDate, GetSesionRecords]);
  console.log(ids);
  useEffect(() => {
    if (fetchsessionactive?.success == 1) {
      let data = fetchsessionactive?.data[0];
      setsession(data?.sessionname);
    }
  }, [fetchsessionactive]);
  useEffect(() => {
    if (fetchStudentcustom?.success == 1) {
      let data = fetchStudentcustom?.data;
      setdata(data);
    }
  }, [fetchStudentcustomloading]);

  useEffect(() => {
    setdata([]);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchStudent?.success == 1) {
      let data = fetchStudent?.data;
      setdata(data);
    }
  }, [fetchStudent]);

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

  const handleviewbtn = (value) => {
    navigate('/student/singlestudent', {
      state: { action: 1, value: value.student_id },
    });
  };
  const handleEditbtn = (value) => {
    dispatch(fetchSingleStudent(value.student_id));
    navigate('/student/editinfo', {
      state: { action: 2, value: value.student_id },
    });
  };
  const handlePromoteAll = () => {
    // if(nextClass==clazz) return  toast.error('Error: Cannot Promote To Same Class');

    let data = {
      nextclass: nextClass,
      prevclass: clazz,
    };
    // dispatch(PromoteAllAction(data));
  };

  const handleCurrentSession = () => {
    const data = {
      //    name : name,
      session: sessionzz,
      class: clazz,

      section: sectionzz,
    };
    console.log(data);
    dispatch(GetSesionRecordsAction(data));
  };
  const handleDate = () => {
    const data = {
      date: date,
      class: clazz,

      section: sectionzz,
    };
    console.log(data);
    dispatch(GetRecordByDateAction(data));
  };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(`${clazz} : ${sectionzz}  `);
  };
  function setModalVisible() {
    setVisible(false);
  }

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `${clazz} : ${sectionzz} `,
  });

  const handleDownloadCSV = async () => {
    const csv = generateCsv(csvConfig)(nodes);
    download(csvConfig)(csv);
  };
  function handleGetClassData() {
    let data = {
      class: clazz,
      section: sectionzz,
    };
    console.log(data);
    if (sectionzz == 'All Sections') {
      // setclazz(clazz);
      dispatch(fetchStudentsClassPromoteAction(data));
      console.log('all');
    }
    if (sectionzz != 'All Sections') {
      setsectionzz(sectionzz);
      dispatch(fetchCustomStudentsClassPromoteAction(data));
      console.log('custom');
    }
  }

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
          <div className="max-w-full overflow-x-auto">
            <div className="w-full  flex  ">
              <div className=" flex w-6/12 gap-3">
                <div className="sm:w-3/6 ">
                  <div>
                    <label
                      className="mb-2 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Class
                    </label>

                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <ClassSelect setsectionprop={setclazz} clazz={clazz} selectinfo={setclassinfo} />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-3/6">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Section{' '}
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <SectionSelect1 setsectionprop={setsectionzz} />
                  </div>
                </div>
              </div>
              <div className="flex ml-3 w-6/12">
                <div className={' w-3/6 flex flex-col  '}>
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Select Period
                  </label>
                  <button
                    onClick={() => handleCurrentSession()}
                    className="btn h-10  w-4/6   flex justify-center rounded  bg-black py-2 px-3 font-medium text-gray hover:shadow-1"
                    type="submit"
                  >
                    Current Session
                  </button>
                </div>

                <div className={' w-3/6 flex flex-col  '}>
                  <label
                    className="mb-2  text-sm font-medium text-black dark:text-black"
                    htmlFor="phoneNumber"
                  >
                    .
                  </label>
                  <div className="flex gap-1">
                    <input
                      className="w-3/6 rounded border border-stroke bg-gray py-1 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="date"
                      name=""
                      id=""
                      format="DD-MM-YYYY"
                      placeholder=""
                      defaultValue={today}
                      onChange={(e) => setDate(e.target.value.trim())}
                    />
                    <button
                      onClick={() => handleDate()}
                      className="btn h-10 w-3/6    flex justify-center rounded  bg-black py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Get Record
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={nodes[0] ?? 'hidden '}>
              <div className="flex row  w-full">
                <div className=" w-2/6">
                  {' '}
                  <label
                    className="mb-2  block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Promotion Options :
                  </label>
                  <div className="flex row align-middle py-auto gap-2">
                    <button
                      onClick={() => {
                        setAllStudent(true);
                        setOnlySelected(false);
                      }}
                      className="btn  h-10    flex justify-center rounded  bg-primary py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      All Students
                    </button>
                    <button
                      onClick={() => {
                        setOnlySelected(true);

                        setAllStudent(false);
                      }}
                      className="btn  h-10   flex justify-center rounded  bg-primary py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Select Students
                    </button>
                  </div>
                </div>
                <div className="w-4/6">
                  <div className={allStudent === false ? 'hidden' : null}>
                    <label
                      className="mb-2  block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Choose Next Class :
                    </label>
                    <div className="flex row  py-auto gap-2 w-4/6">
                      <div className="w-2/6">
                        <ClassSelect2
                          setsectionprop={setNextclass}
                          clazz={clazz}
                        />
                      </div>
                      <button
                        onClick={() => handlePromoteAll()}
                        className="btn  h-10   flex justify-center rounded  bg-primary py-2 px-3 font-medium text-gray hover:shadow-1"
                        type=""
                      >
                        Promote Students
                      </button>
                    </div>
                  </div>
                  <div className={onlySelected === false ? 'hidden' : null}>
                    <label
                      className="mb-2  block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Choose Next Class :
                    </label>
                    <div className="flex row  py-auto gap-2 w-4/6">
                      <div className="w-2/6">
                        <ClassSelect
                          setsectionprop={setNextclass}
                          clazz={clazz}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
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

                    <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                      {tableList?.map((item) => (
                        <Row
                          key={item.id}
                          item={item}
                          className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] "
                        >
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

export default SearchAttendance;
