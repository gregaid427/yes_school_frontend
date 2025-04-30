import { useEffect, useRef, useState } from 'react';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';
import ViewSVG from '../components/Svgs/View';
import DeleteSVG from '../components/Svgs/delete';
import EditSVG from '../components/Svgs/edit';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
import * as XLSX from 'xlsx';
import { Print } from 'print-react';


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
import { mkConfig, generateCsv, download } from 'export-to-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import Loader from '../common/Loader';
import toast from 'react-hot-toast';
import {
  CreatesBulkClassAction,
  CreatesClassAction,
  deleteSingleClassAction,
  fetchAllClassAction,
  fetchAllClassNoAction,
  fetchSingleClassAction,
  resetcreateClass,
} from '../redux/slices/classSlice';
import TableBtn from '../components/Svgs/TableBtn';

const BulkAdmission = () => {
  const formRef1 = useRef();
  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
    console.log('reset');
  }

  const [pagesval, setpagesval] = useState(10000);
  const [classs, setClasss] = useState([]);

  const [loader, setLoader] = useState(true);

  const [classname, setclasname] = useState('');
  const [sectionname, setsectionname] = useState('');
  const [sectionid, setsectionid] = useState(0);


  const [display, setDisplay] = useState(false);
  const [displaytable, setDisplaytable] = useState(false);
  
  const [tabledata, settabledata] = useState([]);

  const [id, setclassId] = useState(0);
  const [filename, setFileName] = useState('');
  const [file, setFile] = useState('');

  const [classTitle, setClassTitle] = useState('');
  const [classInstructor, setClassInstructor] = useState('');

  const [sections, setsections] = useState([]);

  const [nodes, setdata] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const ref = useRef({ openPrintDialog: () => Promise });

  const clad = useSelector((state) => state?.classes);

  const {
    fetchAllClassloading,
    fetchAllClass,
    sectionloading,
    fetchSection,
    CreateClasses,
    fetchAllClassNo,
    CreateClassesloading,
  } = clad;
  
  const [CSVTemplate, setCSVTemplate] = useState([]);

  const [classData, setClassData] = useState([]);
  const [classData1, setClassData1] = useState([]);
  const [check, setCheck] = useState(true);
  useEffect(() => {
    // dispatch(fetchAllClass());
    dispatch(fetchAllClassNoAction());
  }, []);

  useEffect(() => {
    if (CreateClasses?.success == 0) {
      //  toast.error('Error - Class Name Already Exists');
      dispatch(resetcreateClass());
      // dispatch(fetchAllClassAction())
    }
    if (CreateClasses?.success == 1) {
      // toast.success('New Class Added Successfully');
      formRef1.current.reset();
      setDisplay(true);

      setClassData1([]);
      resetFormStates();
      dispatch(resetcreateClass());
      // dispatch(fetchAllClassAction())
    }
  }, [fetchAllClassloading, CreateClassesloading]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchAllClassNo?.success == 1) {
      let data = fetchAllClassNo?.data;
      setdata(data);
    }
  }, [fetchAllClassNo]);

  let data = { nodes };
console.log(data)
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
      BaseCell: `
         padding: 0px 0;
        font-size: 15px;
      //  color:white;
      //   border-bottom: 1px solid #313D4A !important;
      //   //  background-color: #24303F;

      `,
      Table: `
      --data-table-library_grid-template-columns:  50% 30% 20%;
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
 // --data-table-library_grid-template-columns:  20%  15% 15%  20% 15% 15%;
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 10000,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  const [search, setSearch] = useState('');

  data = {
    nodes: data.nodes.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  function onPaginationChange(action, state) {}

  const handleViewbtn = (value) => {
    console.log(value)
    setclasname(value.title);
    setsectionname(value.section);
    setsectionid(value.sectionid);

    setclassId(value.classId);
  };
  const handleEditbtn = (value) => {
    dispatch(
      fetchSingleClassAction({
        classId: value.classId,
        classTitle: value.title,
      }),
    );
    navigate('/academics/class/editclass', {
      state: { action: 2, value: value },
    });
  };
  const handledeletbtn = (value) => {
    dispatch(deleteSingleClassAction(value));
    // dispatch(fetchAllClassAction());
  };
  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;
  const classdata = {
    title: classTitle.toUpperCase(),
    createdBy: username?.payload,
    instructor: classInstructor,
  };

 let  tabledata1 = {
    nodes: tabledata
  };
console.log(tabledata1)
  const handlecreateClass = () => {
    if (classname == '') {
      return toast.error('Error - Select Class');
    }
    if (classData1.length == 0) {
      return toast.error('File Error- Choose File Again');
    } 
    if (classData1[0].FIRST_NAME == undefined) {
      return toast.error('File Error- Select Appropriate File');
    }else {
    
      let absent = [];
      for (const val of classData1) {

       
         absent.push({'Student First Name': val?.FIRST_NAME ,'Student Other Names': val?.OTHER_NAMES,'Student Last Name':val?.LAST_NAME  ,'Student Username': val?.EMAIL,'Student Password': val?.STUDENT_PASSWORD  ,'Guardian First Name': val?.GUARDIAN_1_FIRST_NAME ,'Guardian Last Name':  val?.GUARDIAN_1_LAST_NAME
          ,'Guardian Username': val?.GUARDIAN_1_EMAIL,'Guardian Password': val?.GUARD1_PASSWORD})
          setCSVTemplate(absent)
      }
      settabledata(classData1)
      dispatch(CreatesBulkClassAction(classData1));
    }
  };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(classname+" / "+sectionname);
  };

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `Admission Template`,
  });
  const csvConfig1 = mkConfig({
    useKeysAsHeaders: true,
    filename: classname+" / "+sectionname,
  });
  // let template = {
  //   FIRST_NAME: '',
  //   OTHER_NAMES: '',
  //   LAST_NAME: '',
  //   RELIGION: '',
  //   GENDER: '',
  //   DATE_OF_BIRTH_DDMMYYYY: '',
  //   GUARDIAN_1_FIRST_NAME: '',
  //   GUARDIAN_1_LAST_NAME: '',
  //   GUARDIAN_1_GENDER: '',
  //   GUARDIAN_1_RELATION: '',
  //   GUARDIAN_1_CONTACT1: '',
  //   GUARDIAN_1_CONTACT2: '',
  //   GUARDIAN_1_ADDRESS: '',
  //   GUARDIAN_1_EMAIL: '',

  //   GUARDIAN_2_FIRST_NAME: '',
  //   GUARDIAN_2_LAST_NAME: '',
  //   GUARDIAN_2_GENDER: '',
  //   GUARDIAN_2_RELATION: '',
  //   GUARDIAN_2_CONTACT1: '',
  //   GUARDIAN_2_CONTACT2: '',
  //   GUARDIAN_2_ADDRESS: '',
  //   GUARDIAN_2_EMAIL: '',
  // };

  let template = {
    FIRST_NAME: '',
    OTHER_NAMES: '',
    LAST_NAME: '',
    RELIGION: '',
    GENDER_M_F: '',
    DATE_OF_BIRTH_DDMMYYYY: '',
    ARREARS: '',
    GUARDIAN_1_FIRST_NAME: '',
    GUARDIAN_1_LAST_NAME: '',
    GUARDIAN_1_GENDER_M_F: '',
    GUARDIAN_1_RELATION: '',
    GUARDIAN_1_CONTACT1: '',
    GUARDIAN_1_CONTACT2: '',
    GUARDIAN_1_ADDRESS: '',
    GUARDIAN_1_EMAIL: '',

    // GUARDIAN_2_FIRST_NAME: '',
    // GUARDIAN_2_LAST_NAME: '',
    // GUARDIAN_2_GENDER: '',
    // GUARDIAN_2_RELATION: '',
    // GUARDIAN_2_CONTACT1: '',
    // GUARDIAN_2_CONTACT2: '',
    // GUARDIAN_2_ADDRESS: '',
    // GUARDIAN_2_EMAIL: '',
  };
  console.log(tabledata1.nodes)

  const handleDownloadCSV1 = async () => {
    const {nodes} = tabledata1
    console.log(CSVTemplate)
    const csv = generateCsv(csvConfig)(CSVTemplate);
    download(csvConfig1)(csv);
  };
  const handleDownloadCSV = async () => {
    const csv = generateCsv(csvConfig)([template]);
    download(csvConfig)(csv);
  };
  

  function handleFileUpload(e) {
    console.log('called');
    setCheck(false);
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setClassData(parsedData);

      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';

      function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
          );
        }

        return result;
      }

      let newArr1 = parsedData?.map((v) => ({
        ...v,
        STUDENT_PASSWORD: generateString(5).toLocaleLowerCase(),
        EMAIL: v.FIRST_NAME + generateString(3).toLocaleLowerCase(),
        CLASS: classname,
        CLASSID: id,
        SECTION: sectionname,
        SECTIONID: sectionid,
        GUARD1_PASSWORD: v.GUARDIAN_1_FIRST_NAME == undefined ? "" : generateString(5),
        GUARD2_PASSWORD: v.GUARDIAN_2_FIRST_NAME == undefined ? "" : generateString(5),
        GUARD1_USERNAME: v.GUARDIAN_1_FIRST_NAME == undefined ? "" : v.GUARDIAN_1_FIRST_NAME + generateString(3).toLocaleLowerCase()  ,
        GUARD2_USERNAME: v.GUARDIAN_2_FIRST_NAME == undefined ? "" : 
          v.GUARDIAN_2_FIRST_NAME + generateString(3).toLocaleLowerCase(),
        CREATED_BY: username?.payload,
      }));
      console.log(newArr1)
      setClassData1(newArr1);
    };
  }


  
  useEffect(() => {
    console.log(classData1);
  }, [classData, check]);
  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div className={'flex row gap-2  w-full'}>
        <div className={display ? 'hidden' : 'w-8/12  flex-col'}>
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  All Classes
                </h3>
              </div>
            </div>
          </div>
          <div
            className={
              'rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
            }
          >
            <div className="w-full  flex gap">
              <div className=" flex w-7/12 gap-1">
                <div className="sm:w-3/5 ">
                  <button
                    className="flex  justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={() => {
                      handleDownloadCSV();
                    }}
                  >
                    Download Template
                  </button>
                </div>
              </div>

              <div className={' w-5/12 flex flex-col '}>
                <div className="flex justify-between align-middle ">
                  <label
                    className=" w-2/2  block text-sm font-medium text-black dark:text-white"
                    htmlFor=" "
                  >
                    Search Class{' '}
                  </label>
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
          <div
          className={
            'rounded-sm  w-full border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
          }
        >
            <div className="flex gap-3  flex-col">
              <div className="px-2">
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
                          <HeaderCell>Class</HeaderCell>
                          <HeaderCell>Section</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

  
                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
                          <Row key={item.id}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
                          
                          >
                            <Cell className="  ">{item.title}</Cell>
                            <Cell className="  ">
                              {item.section ? item.section : '-'}
                            </Cell>

                            <Cell>
                                <TableBtn
                                  clickFunction={() => handleViewbtn(item)}
                                  text={'Select'}
                                  color={'bg-primary'}
                                />
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
                  data={data}
                  pagination={pagination}
                  theme={theme}
                >
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                          <HeaderCell>Class</HeaderCell>
                          {/* <HeaderCell>Instructor</HeaderCell> */}
                        </HeaderRow>
                      </Header>

  
                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
                          >
                            <Cell className="  ">
                              <span>{item.title}</span>
                            </Cell>

                            {/* <Cell className="  ">
                              <span>{item.instructor}</span>
                            </Cell> */}
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
      
        <div className={!display ? 'hidden' : 'w-full  flex-col'}>
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  {"Class Student & Guardian Credentials"}
                </h3>
                <h3 className="font-medium text-black py-3 dark:text-white">
                  {"Class : "+classname +" /  "+"Section : "+" "+ sectionname }
                </h3>
              </div>
            </div>
          </div>
          <div
            className={
              'rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
            }
          >
            <div className="w-full  flex gap">
              <div className=" flex w-full gap-4">
                <div className="">
                  <button
                    className="flex  justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={async () => {
                      await ref.current.openPrintDialog();
                    }}
                  >
                    Print
                  </button>
                </div>
                <div className=" ">
                  <button
                    className="flex  justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={() => {
                      handleDownloadCSV1();
                    }}
                  >
                    Download Excel
                  </button>
                </div>
                <div className=" ">
                  <button
                    className="flex  justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={() => {
                      handleDownloadPdf();
                    }}
                  >
                    Download PDF
                  </button>
                </div>
              </div>
              
              <button
                    className="flex float-end justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={async () => {
                     navigate('/student/admission')
                    }}
                  >
                    Back
                  </button>
              
            </div>
          </div>
          <div
            className={
              'rounded-sm  w-full border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
            }
          >
            <div className="flex gap-3  flex-col">
              <div className="px-2">
              <Print
              ref={ref}
              printWidth={900}
              marginTop={48}
              marginLeft={20}
              onOpenPrintDialog={() => {
                setPrintDialogOpen(true);
              }}
              onClosePrintDialog={() => {
                setPrintDialogOpen(false);
              }}
            >
                <Table
                  id="my-table"
                  data={tabledata1}
                  pagination={pagination}
                 // layout={{ custom: true }}
                  theme={theme}
                >
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex  ">
                          <HeaderCell>Student Name</HeaderCell>
                          
                          <HeaderCell>Student Username</HeaderCell>

                          <HeaderCell>Student Password</HeaderCell>
                          <HeaderCell>Guardian Name</HeaderCell>

                          <HeaderCell>Guardian Username</HeaderCell>

                           <HeaderCell>Guardian Password</HeaderCell>
                          {/* <HeaderCell>Guard. Username</HeaderCell>

                          <HeaderCell>Password</HeaderCell> */}


                        </HeaderRow>
                      </Header>

  
                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
                          <Row key={item.STUDENT_PASSWORD}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
                          
                          >
                            <Cell className=" ">{ <span className='py-1'>{item.FIRST_NAME}</span>}{` `}{item.LAST_NAME}</Cell>
                          
                            <Cell className="  ">
                              {item.EMAIL ? item.EMAIL : '-'}
                            </Cell>
                            <Cell className="  ">
                              {item.STUDENT_PASSWORD ? item.STUDENT_PASSWORD : '-'}
                            </Cell>
                            <Cell className="  ">
                              {item.GUARDIAN_1_FIRST_NAME ?( item.GUARDIAN_1_FIRST_NAME +" "+ (item?.GUARDIAN_1_LAST_NAME == undefined ? '': item?.GUARDIAN_1_LAST_NAME)): '-' }
                            </Cell>
                            <Cell className="  ">
                              {item.GUARD1_USERNAME ? item.GUARD1_USERNAME : '-'}
                            </Cell>
                            <Cell className="  ">
                              {item.GUARD1_PASSWORD ? item.GUARD1_PASSWORD : '-'}
                            </Cell>
                            {/* <Cell className="  ">
                              {item.GUARD2_USERNAME ? item.GUARD2_USERNAME : '-'}
                            </Cell>
                            <Cell className="  ">
                              {item.GUARD2_PASSWORD ? item.GUARD2_PASSWORD : '-'}
                            </Cell> */}

                            {/* <Cell>
                              <div className="gap-2 flex">
                                <TableBtn
                                  clickFunction={() => handleViewbtn(item)}
                                  text={'Select'}
                                  color={'bg-primary'}
                                />
                              </div>
                            </Cell> */}
                          </Row>
                        ))}
                      </Body>
                    </>
                  )}
                </Table>
                </Print>
              </div>
              <div
                className=" align-middle"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                {/* <div className="flex">
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
                </div> */}

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
                  data={data}
                  pagination={pagination}
                  theme={theme}
                >
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                          <HeaderCell>Class</HeaderCell>
                          {/* <HeaderCell>Instructor</HeaderCell> */}
                        </HeaderRow>
                      </Header>

  
                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
                          >
                            <Cell className="  ">
                              <span>{item.title}</span>
                            </Cell>

                            {/* <Cell className="  ">
                              <span>{item.instructor}</span>
                            </Cell> */}
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
       
     
      <div className={display ? 'hidden' : 'grid w-4/12  gap-8'}>
        <div className="col-span-12">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Upload Class Data
              </h3>
            </div>
            <div className="p-7">
              <form ref={formRef1}>
                <div className="w-full mb-2 sm:w-2/2">
                  <label
                    className="mb-1 block text-sm font-small text-black dark:text-white"
                    htmlFor=""
                  >
                    Class
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name=""
                    id=""
                    disabled
                    placeholder=""
                    defaultValue={classname}
                  />
                </div>

                <div className="w-full mb-2 sm:w-2/2">
                  <label
                    className="mb-3 block text-sm font-small text-black dark:text-white"
                    htmlFor=""
                  >
                    Section
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name=""
                    id=""
                    disabled
                    placeholder=""
                    defaultValue={sectionname}
                  />
                </div>

                <div className="w-full sm:w-2/2">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Select Excel File{' '}
                  </label>
                  <input
                    onChange={(e) => {
                      // setFile(event.target.files[0]);
                      // setFileName(event.target.files[0].name);
                      handleFileUpload(e);
                    }}
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    className="w-full rounded-md border border-stroke p-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                  />
                </div>

                <div className="flex justify-end mt-5 gap-4.5">
                  <button
                    className={
                      true
                        ? 'flex w-6/12 justify-center rounded bg-primary py-1 px-6 font-medium text-gray hover:bg-opacity-90'
                        : 'hidden'
                    }
                    type=""
                    onClick={(e) => {
                      e.preventDefault();

                      handlecreateClass(e);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="flex w-6/12 justify-center rounded border border-stroke py-1 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="reset"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </DefaultLayout>
  );
};

export default BulkAdmission;
