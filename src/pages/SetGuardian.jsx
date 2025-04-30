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
import GuardianSVG from '../components/Svgs/Guardian';
import ManageGuardianSVG from '../components/Svgs/ManageGuard';
import GlobalSearchInput from '../components/GlobalSearchInput';

const SetGuardian = () => {
  ///////////////////////////////////

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('top');

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  //////////////////////////////////////

  const [loader, setLoader] = useState(true);

  const [searchval, setSearchval] = useState('First Name');
  const [pagesval, setpagesval] = useState(30);

  const [searcher, setSearcher] = useState('firstName');
  const [isChecked2, setIsChecked2] = useState(false);

  const [age, setAge] = useState('');
  const [nodes, setdata] = useState([]);
  const [classs, setClasss] = useState();
  const [sections, setsections] = useState([]);
  const [clazz, setclazz] = useState();
  const [classinfo, setclassinfo] = useState();

  const [sectionzz, setsectionzz] = useState();

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
    singleStudentloading,
  } = student;

  const { fetchAllClassloading, fetchAllClass } = classes;

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchcustom?.success == 1) {
      let data = fetchcustom?.data;
      setdata(data);
    }

    if (fetchAllClass?.success == 1) {
      let i = 0;
      let arr = [];
      while (i < classes?.fetchAllClass?.data.length) {
        arr.push(classes?.fetchAllClass?.data[i].title);
        i++;
      }
      setClasss(arr);
      setclazz(arr[0]);
    }
  }, [fetchAllClassloading, fetchcustomloading]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

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
  --data-table-library_grid-template-columns:  20% 40% 15% 25%;
  `,
      BaseCell: `
        font-size: 15px;
        //color:white;
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
  const handledeletbtn = (value) => {
    let data = {
      class: clazz,
      section: sectionzz,
      id: value,
    };
    dispatch(deleteSingleStudentAction(data));
  };

  const handleNaviate = (item) => {
    console.log(item);
    navigate('/settings/newguardian', {
      state: { value: item },
    });
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
    const csv = generateCsv(csvConfig)(nodes);
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
      setclazz(clazz);
      dispatch(fetchStudentsClassAction(data));
    }
    if (sectionzz != 'All Sections') {
      setsectionzz(sectionzz);
      dispatch(fetchCustomStudentsClassAction(data));
    }
  }
  const footerContent = (
    <div>
      <button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );
  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Dialog
        header="Student Personal Information"
        resizable={false}
        draggable={false}
        headerClassName=" px-7 py-2  dark:bg-primary font-bold text-black dark:text-white"
        visible={visible}
        className=""
        position={'top-right'}
        style={{ width: 'w-12/12', color: 'white' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <StudentModal close={() => setModalVisible()} />
      </Dialog>
      <div className=" flex-col">
        <div
          className={
            'rounded-sm border max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
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
                      <ClassSelect setsectionprop={setclazz} selectinfo={setclassinfo} />
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
                      className="btn h-10    flex justify-center rounded  bg-black py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                  {/* <div className="relative sm:w-4/5 z-20 mt-2 bg-white dark:bg-form-input">
                    <button
                      onClick={() => navigate('/settings/newguardian')
                      }
                      className="btn h-10 w-full   flex justify-center rounded  bg-primary py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Add New Guardian
                    </button>
                  </div> */}
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
                <div className="flex justify-between align-middle ">
                  <label
                    className="mb-1 w-2/2 pt-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor=" "
                  >
                    Search By ID / Firstname / LastName 
                  </label>
                 
                </div>

               <GlobalSearchInput globalResult={setdata}/>
                {/* <button onClick={() => toPDF()}>Download PDF</button> */}
              </div>
            </div>
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
                        <HeaderCell className="">ID</HeaderCell>
                        <HeaderCell>Name</HeaderCell>
                        {/* <HeaderCell>Section</HeaderCell> */}
                        <HeaderCell>Gender</HeaderCell>

                        <HeaderCell>Actions</HeaderCell>
                      </HeaderRow>
                    </Header>


                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                      {tableList?.map((item) => (
                        <Row key={item.student_id}
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
                          {/* <Cell className="  ">
                            <span>{item.section}</span>
                          </Cell> */}
                          <Cell className="  ">
                            <span>{item.gender}</span>
                          </Cell>


                          <Cell>
                            <div className="gap-2 flex">
                              <EditSVG
                                clickFunction={() =>
                                  navigate("/settings/stdguardian", {
                                    state: { value: item},
                                  })
                                }
                              />
                              <GuardianSVG
                                clickFunction={() => {
                                  handleNaviate(item);
                                }}
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
            <div
              className=" align-middle"
              style={{ display: 'flex', justifyContent: 'space-between' }}
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
            <div className="hidden">
              <Table
                id="my-table"
                data={data}
                pagination={pagination}
                theme={theme}
              >
                {(tableList) => (
                  <>
                    <Header>
                      <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                        <HeaderCell className="">ID</HeaderCell>
                        <HeaderCell>Name</HeaderCell>
                        <HeaderCell>Section</HeaderCell>
                        <HeaderCell>Gender</HeaderCell>
                      </HeaderRow>
                    </Header>


                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                      {tableList?.map((item) => (
                        <Row
                          key={item.student_id}
                          item={item}
                          className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
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
                            <span>{item.gender}</span>
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

export default SetGuardian;
