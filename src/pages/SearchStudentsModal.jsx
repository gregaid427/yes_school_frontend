import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import userThree from '../images/user/user-03.png';
import DefaultLayout from '../layout/DefaultLayout';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ViewSVG from '../components/Svgs/View';
import DeleteSVG from '../components/Svgs/delete';
import EditSVG from '../components/Svgs/edit';
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
import {
  deleteSingleStudentAction,
  fetchBulkStudent,
  fetchCustomStudentsClassAction,
  fetchSingleStudent,
  fetchStudentsClassAction,
} from '../redux/slices/studentSlice';
import Loader from '../common/Loader';
import StudentModal from '../components/StudentModal';

import SectionSelect1 from '../components/SectionsSelect1';
import ClassSelect from '../components/ClassSelect';
import { fetchUserdataAction } from '../redux/slices/usersSlice';
import ExamResultModal from '../components/ExamResultModal';
import AttendanceModal from '../components/AttendanceModal';
import DeleteModal from '../components/DeleteModal';
import TableBtn from '../components/Svgs/TableBtn';
import GenerateFeeModalStudent from '../components/GenerateFeeModalStudent';

const SearchStudentsModal = (props) => {
  ///////////////////////////////////

  const [visible9, setVisible9] = useState(false);
  const [position, setPosition] = useState('top');

  //////////////////////////////////////

  const [loader, setLoader] = useState(true);

  const [searchval, setSearchval] = useState('First Name');
  const [pagesval, setpagesval] = useState(30);

  const [searcher, setSearcher] = useState('firstName');
  const [Modaldata, setModaldata] = useState(null);

  const [age, setAge] = useState('');
  const [nodes, setdata] = useState([]);
  const [info, setinfo] = useState('');
  const [CSVTemplate, setCSVTemplate] = useState([]);
  const [clazz, setclazz] = useState();
  const [sectionzz, setsectionzz] = useState();
  const [id, setid] = useState();
  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);
  const classes = useSelector((state) => state?.classes);

  const {
    loading,
    error,
    fetchStudent,
    fetchStudentcustom,
    fetchcustom,
    fetchStudentcustomloading,
    fetchcustomloading,
    singleStudent,
    deleteSingleStudent,
  } = student;

  const { fetchAllClassloading, fetchAllClass } = classes;

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchcustom?.success == 1) {
      let data = fetchcustom?.data;
      setdata(data);

      let absent = [];
      for (const val of data) {
        absent.push({
          'Student ID': val?.student_id,
          'Student First Name': val?.firstName,
          'Student Other Names': val?.otherName,
          'Student Last Name': val?.lastName,
          Gender: val?.gender,
          Class: val?.class,
          Section: val?.section,
        });
        setCSVTemplate(absent);
      }
    }

    // if (fetchAllClass?.success == 1) {
    //   let i = 0;
    //   let arr = []
    //   while (i < classes?.fetchAllClass?.data.length) {
    //     arr.push(classes?.fetchAllClass?.data[i].title);
    //     i++;
    //   }
    //   setClasss(arr);
    // //  setclazz(arr[0])
    // }
  }, [fetchAllClassloading, fetchcustomloading]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchStudentcustom?.success == 1) {
      let data = fetchStudentcustom?.data;
      setdata(data);
    }
  }, [fetchStudentcustom]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (deleteSingleStudent?.success == 1) {
      setVisible(false);
    }
  }, [deleteSingleStudent]);

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

  // useEffect(() => {

  //   if (fetchSection?.success == 1) {
  //    let arrr = ['All Sections']
  //     let i = 0;
  //     while (i < classes?.fetchSection?.data.length) {
  //       arrr.push(classes?.fetchSection?.data[i]?.sectionName
  //         );
  //       i++;
  //     }

  //     setsections(arrr);
  //     setsectionzz(arrr[0])
  //   }
  // }, [sectionloading]);

  let data = { nodes };

  const theme = useTheme([
    {
      HeaderRow: `
  .th {
    border-bottom: 1px solid #a0a8ae;
    padding: 5px 0px;
  }
`,

      BaseCell: `
      font-size: 15px;
    

     `,

      Table: `
  --data-table-library_grid-template-columns:  17% 40% 13% 10% 10% 10%;
`,
    },
  ]);

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: pagesval == 'All' ? 90000000000000000 : pagesval,
    },
    onChange: onPaginationChange,
  });
  const pagination1 = usePagination(data, {
    state: {
      page: 0,
      size: 90000000000000000,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  var data2;
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleviewbtn = (value) => {
    navigate('/student/editinfo', { state: { action: 1, value: value } });
    dispatch(
      fetchUserdataAction({
        role: 'student',
        id: value.student_id,
        userid: value.userId,
      }),
    );
  };
  const handleEditbtn = (value) => {
    dispatch(
      fetchUserdataAction({
        role: 'student',
        id: value.student_id,
        userid: value.userId,
      }),
    );
    navigate('/student/editinfo', { state: { action: 2, value: value } });
  };
  const handledeletbtn = () => {
    let data = {
      class: clazz,
      section: sectionzz,
      id: id?.student_id,
    };
    dispatch(deleteSingleStudentAction(data));
  };

  data = {
    nodes: data.nodes.filter((item) =>
      searchval === 'First Name'
        ? item.firstName.toLowerCase().includes(search.toLowerCase())
        : searchval == 'Last Name'
          ? item.lastName.toLowerCase().includes(search.toLowerCase())
          : item.student_id.toLowerCase().includes(search.toLowerCase()),
    ),
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
    const csv = generateCsv(csvConfig)(CSVTemplate);
    download(csvConfig)(csv);
  };
  function handleGetClassData() {
    console.log(clazz);

    let data = {
      class: clazz,
      section: sectionzz,
    };
    console.log(data);
    if (sectionzz == 'All Sections') {
      //  setclazz(clazz)
      dispatch(fetchStudentsClassAction(data));
    }
    if (sectionzz != 'All Sections') {
      setsectionzz(sectionzz);
      dispatch(fetchCustomStudentsClassAction(data));
    }
  }

  return (
    <>
      <Dialog
        visible={visible9}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible9) return;
          setVisible9(false);
        }}
      >
        <GenerateFeeModalStudent close={setVisible9} info={info} />
      </Dialog>

      <div className=" flex-col rounded-sm border max-w-full shadow-default border-stroke bg-white  dark:border-strokedark dark:dark:bg-form-input pb-5 ">
        <div
          className={
            'rounded-sm border max-w-full  px-5 pt-6 shadow-default border-stroke bg-white  dark:border-strokedark dark:dark:bg-form-input pb-5 '
          }
        >
          <div className="max-w-full overflow-x-auto">
            <div className="w-full  flex justify-between ">
              <div className=" flex w-7/12 gap-3">
                <div className="sm:w-2/5 ">
                  <div>
                    <label
                      className="mb-2 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Class
                    </label>

                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <ClassSelect setsectionprop={setclazz} clazz={clazz} />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-2/5">
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
                <div className="w-full sm:w-2/5">
                  <label
                    className="mb-2 block text-sm font-medium  dark:text-black"
                    htmlFor=""
                  >
                    .{' '}
                  </label>
                  <div className="relative sm:w-1/5 z-20 bg-white dark:bg-form-input">
                    <button
                      onClick={() => handleGetClassData()}
                      className="btn h-10    flex justify-center rounded  bg-primary py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                </div>
                {/* <div className="w-full sm:w-1/3 flex  justify-end align-top  ">
                    <button onClick={(e)=>{handleDownloadPdf()}}
                      className="btn sm:w-2/3 h-10    flex justify-center rounded  bg-black py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Search
                    </button>
                  </div> */}
              </div>

              <div className={' w-3/12 flex flex-col float-right '}>
                <div className="flex justify-between align-middle mb-2">
                  <label
                    className="mb-3 w-2/2 pt-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor=" "
                  >
                    Search By{' '}
                  </label>
                  <div className="relative  z-20 w-3/5 bg-white dark:bg-form-input">
                    <SelectGroupTwo
                      values={['First Name', 'Last Name', 'ID']}
                      setSelectedOption={(val) => setSearchval(val)}
                      selectedOption={searchval}
                    />
                  </div>
                </div>

                <input
                  className="w-full rounded border border-stroke bg-gray py-2 px-1.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  key={1}
                  type="search"
                  placeholder={'type here'}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button onClick={() => toPDF()}>Download PDF</button> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            'rounded-sm  w-full  bg-white px-2  shadow-default   dark:border-strokedark dark:dark:bg-form-input'
          }
        >
          <div
            className={nodes.length == 0 ? 'hidden' : 'flex gap-3  flex-col'}
          >
            <div>
              <Table
                data={data}
                pagination={pagination}
                theme={theme}
                layout={{ custom: true }}
              >
                {(tableList) => (
                  <>
                    <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                      <Row className="dark:border-strokedark Uppercase dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        <Cell className="  ">
                          <span>ID</span>
                        </Cell>
                        <Cell className="capitalize">Name</Cell>
                        <Cell className="  ">Section</Cell>
                        <Cell className="  ">Accnt Bal</Cell>
                        <Cell className="  ">Sex</Cell>

                     

                        <Cell>
                          <div className="gap-2 flex">Action</div>
                        </Cell>
                      </Row>
                      
                      {tableList?.map((item) => (
                        <>
                          <Row
                            key={item.student_id}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
                          >
                            <Cell className="  ">
                              <span>{item.student_id}</span>
                            </Cell>
                            <Cell className="capitalize">
                              {item.firstName +
                                ' ' +
                                item.otherName +
                                ' ' +
                                item.lastName}
                            </Cell>
                            
                            <Cell className="  ">
                              <span>{item.section}</span>
                            </Cell>
                            <Cell className="  ">
                              <span>{item.accountbalance}</span>
                            </Cell>
                            <Cell className="  ">
                              <span>{item.gender}</span>
                            </Cell>

                            <Cell>
                              <div className="gap-2 flex">
                                {/* <ViewSVG
                                clickFunction={() => handleviewbtn(item)}
                              /> */}

                                <TableBtn
                                  clickFunction={() => {
                                    setinfo(item);
                                    setVisible9(true);
                                  }}
                                  text={' Select '}
                                  color={'bg-primary'}
                                />
                              </div>
                            </Cell>
                          </Row>
                        </>
                      ))}
                    </Body>
                  </>
                )}
              </Table>
            </div>
            <div className={nodes == [] ? 'hidden' : ''}>
              <div
                className={nodes == [] ? 'hidden' : 'flex'}
                style={{ display: '', justifyContent: 'space-between' }}
              >
                <div className="flex">
                  <span className="mt-2">
                    Total Pages: {pagination.state.getTotalPages(data.nodes)}
                  </span>
                  <div className="flex  align-middle  flex-row mr-3">
                    <span className="flex mt-2 ml-8 align-middle">
                      Records Per Page:{' '}
                    </span>
                    <div className="relative flex align-middle ml-3  z-20   bg-white dark:bg-form-input">
                      <SelectGroupTwo
                        values={[30, 50, 100, 200, 500, 'All']}
                        setSelectedOption={(val) => setpagesval(val)}
                        selectedOption={pagesval}
                      />
                    </div>
                  </div>
                </div>

                <span>
                  Page:{' '}
                  {pagination.state.getPages(data.nodes).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className="rounded"
                      style={{
                        color: pagination.state.page === index ? 'white' : '',
                        width: '20px',
                        margin: '0px 5px',
                        padding: '2px',
                        backgroundColor:
                          pagination.state.page === index ? '#3C50E0' : '',
                      }}
                      onClick={() => pagination.fns.onSetPage(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </span>
              </div>
            </div>
          </div>
          <div className=" bg-white  dark:border-strokedark dark:dark:bg-form-input">
            <button
              className="flex w-6/12 mx-auto justify-center bg-primary rounded py-2 px-6 font-medium text-black  dark:text-white"
              type=""
              onClick={(e) => {
                e.preventDefault();
                props.close(false);
              }}
            >
              close
            </button>
          </div>{' '}
        </div>
      </div>
    </>

    //  </DefaultLayout>
  );
};

export default SearchStudentsModal;
