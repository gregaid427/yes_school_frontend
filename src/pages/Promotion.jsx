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
  fetchCustomStudentsClassPromoteAction,
  fetchSingleStudent,
  fetchStudentsClassAction,
  fetchStudentsClassPromoteAction,
  PromoteAllAction,
  PromoteSelectedAction,
  resetPromote,
} from '../redux/slices/studentSlice';
import Loader from '../common/Loader';
import StudentModal from '../components/StudentModal';

import SectionSelect1 from '../components/SectionsSelect1';
import ClassSelect from '../components/ClassSelect';
import PromotionRadio from '../components/PromotionRadio';
import toast, { Toaster } from 'react-hot-toast';
import ClassSelect2 from '../components/ClassSelect2';
import SetSessionAlert from '../components/SetSessionAlert';
import NewGuardModal from '../components/NewGuardianModal';
import PromoteModal from '../components/PromoteModal';

const Promotion = () => {
  ///////////////////////////////////

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
  const [clazz, setclazz] = useState();
  const [nextClass, setNextclass] = useState();

  const [sectionzz, setsectionzz] = useState();
  const [isChecked1, setIsChecked1] = useState(false);
  const [type, setType] = useState('All');

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
    studentPromote,
  } = student;
  console.log(repeat);
  const { fetchAllClassloading, fetchAllClass } = classes;

  useEffect(() => {
    if (fetchcustom?.success == 1) {
      let data = fetchcustom?.data;
      setdata(data);
    }
  }, [fetchcustom]);

  useEffect(() => {
    if (fetchStudentcustom?.success == 1) {
      let data = fetchStudentcustom?.data;
      setdata(data);
    }
  }, [fetchStudentcustomloading]);

  useEffect(() => {
    if (studentPromote?.success == 1) {
      setdata([]);
      setRepeat([])
      setType('All')
      setIsChecked1(false)
      setradioReset(!radioReset)

    }
    // dispatch(resetPromote());
  }, [studentPromote]);

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
  `, Table: `
  --data-table-library_grid-template-columns:  15% 27% 24%  17% 17%;
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
    dispatch(PromoteAllAction(data));
  };
  const handlePromoteselected = () => {
  

    const data = {
      value: repeat,
      nextclass: nextClass,
      prevclass: clazz,
    };
    console.log(data)
    dispatch(PromoteSelectedAction(data));

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
    setradioReset(!radioReset)
    setRepeat([])
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
      >
        <PromoteModal next={nextClass} prev={clazz} promoteAction={handlePromoteselected} type={allStudent} repeatNo={repeat.length} close={setVisible} />
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
                <div className="sm:w-2/6 ">
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

                <div className="w-full sm:w-2/6">
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
                <div className="w-full sm:w-2/6">
                  <label
                    className="mb-2 block text-sm font-medium  dark:text-black"
                    htmlFor=""
                  >
                    .{' '}
                  </label>
                  <div className="relative sm:w-full z-20 bg-white dark:bg-form-input">
                    <button
                      onClick={() => handleGetClassData()}
                      className="btn h-10  w-full   flex justify-center rounded  bg-black py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Get Class List
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
            <div className={nodes[0] ?? 'hidden '}>
              <div className="flex w-full gap-8">
                <div className="flex w-4/12 flex-col">
                  <div className=" flex mt-2  mb-2 ">
                    <div className="flex justify-start mr-2 ">
                      <label
                        htmlFor={'type'}
                        className="flex cursor-pointer select-none "
                      >
                        <div className="relative ">
                          <input
                            title={'type'}
                            type="checkbox"
                            id={'type'}
                            className="sr-only"
                            onChange={() => {
                              setIsChecked1(false);
                              setType('All');
                              setAllStudent(true);
                              setOnlySelected(false);
                              setradioReset(!radioReset)
                              setRepeat([])


                            }}
                          />
                          <div
                            className={` flex h-5 w-5 items-center justify-center rounded border ${
                              !isChecked1 &&
                              'border-primary bg-gray dark:bg-transparent'
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-sm ${!isChecked1 && 'bg-primary'}`}
                            ></span>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className=" flex  sm:w-full">
                      <label
                        className="mb- block text-sm font-medium text-black dark:text-white"
                        htmlFor="checkboxLabelOne"
                      >
                        {'Promote All Student in Selected Class'}
                      </label>
                    </div>
                  </div>

                  <div className=" flex  ">
                    <div className="flex justify-start mr-2">
                      <label
                        htmlFor={'type2'}
                        className="flex cursor-pointer select-none "
                      >
                        <div className="relative ">
                          <input
                            title={'type2'}
                            type="checkbox"
                            id={'type2'}
                            className="sr-only"
                            onChange={() => {
                              setIsChecked1(true);
                              setType('Selected');
                              setAllStudent(false);
                              setOnlySelected(true);
                              setradioReset(!radioReset)
                              setRepeat([])


                            }}
                          />
                          <div
                            className={` flex h-5 w-5 items-center justify-center rounded border ${
                              isChecked1 &&
                              'border-primary bg-gray dark:bg-transparent'
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-sm ${isChecked1 && 'bg-primary'}`}
                            ></span>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className=" flex  sm:w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="checkboxLabelOne"
                      >
                        {'Promote Selected Students In Class'}
                      </label>
                    </div>
                  </div>
                </div>
                <div className=" w-8/12">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Choose Next Class :
                  </label>
                  <div className="flex row  py-auto gap-2 w-4/6">
                    <div className="w-3/6">
                      <ClassSelect
                        setsectionprop={setNextclass}
                        clazz={clazz}
                      />
                    </div>
                  </div>
                </div>
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
              <Table data={data} pagination={pagination} layout={{ custom: true }} theme={theme}>
                {(tableList) => (
                  <>
                    <Header>
                      <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                        <HeaderCell className="">ID</HeaderCell>
                        <HeaderCell>Name</HeaderCell>
                        <HeaderCell>Class (Section)</HeaderCell>
                        <HeaderCell>status</HeaderCell>



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
                          <Cell className="  ">
                            <span>{item.class}</span> (<span>{item.section ? item.section : 'None'}</span>)

                          </Cell>
                          
                          <Cell className="  ">
                            <span>{item.status}</span>
                          </Cell>

                          <Cell>
                          <div className={type === 'All' ? 'hidden' : null}>
                          <PromotionRadio
                          reset={radioReset}
                                setRepeated={setRepeat}
                                repeat={repeat}
                                stdId={item.student_id}
                              />
                              {/* <ViewSVG
                                clickFunction={() => handleviewbtn(item)}
                              />
                              <EditSVG
                                clickFunction={() => handleEditbtn(item)}
                              />

                              <DeleteSVG
                                clickFunction={() => handledeletbtn(item.student_id)}
                              /> */}
                            </div>
                          </Cell>
                        </Row>
                      ))}
                    </Body>
                  </>
                )}
              </Table>
              <div className={nodes[0] ?? 'hidden '}>
              <div className="flex w-3/12  pb-5 float-start py-5   gap-4.5">
                  <button
                    className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={() =>    { 
                      if(nextClass == clazz) return  toast.error('Error: Cannot Promote To Same Class');
                      show('top-right')

                    }
                      }
                  >
                    Promote Students
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>{' '}
      </div>
    </DefaultLayout>
  );
};

export default Promotion;
