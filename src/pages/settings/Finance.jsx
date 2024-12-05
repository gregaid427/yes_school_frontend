import { useEffect, useRef, useState } from 'react';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';
import ViewSVG from '../../components/Svgs/View';
import DeleteSVG from '../../components/Svgs/delete';
import EditSVG from '../../components/Svgs/edit';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
import * as XLSX from 'xlsx';

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

import Loader from '../../common/Loader';
import toast from 'react-hot-toast';
import {
  CreatesBulkClassAction,
  deleteSingleClassAction,
  fetchAllClassAction,
  fetchSingleClassAction,
  resetcreateClass,
} from '../../redux/slices/classSlice';
import TableBtn from '../../components/Svgs/TableBtn';
import ExpenseFormModal from '../../components/ExpenseFormModal';
import { Dialog } from 'primereact/dialog';
import AssignFeeModal from '../../components/AssignFeeModal';
import { fetchAllsessionAction } from '../../redux/slices/sessionSlice';
import {
  fetchfeeAssignGroupRecordAction,
  fetchfeeAssignRecordAction,
  fetchfeeCartegoryAction,
  resetdeleteassignedfee,
  resetGeneratefee,
} from '../../redux/slices/feeSlice';
import GenerateFeeModak from '../../components/GenerateFeeModal';
import {
  classStatAction,
  parentStatAction,
  studentStatAction,
  teacherStatAction,
} from '../../redux/slices/statisticsSlice';
import CardDataStats from '../../components/CardDataStats';
import GenerateFeeModalClass from '../../components/GenerateFeeModalClass';
import GenerateFeeModalStudent from '../../components/GenerateFeeModalStudent';
import DeleteAllAssignedFeeModal from '../../components/DeleteAllAssignedFeeModal';
import UpdateAllStudentAccountModal from '../../components/UpdateAllStudentAccountModal';
import UpdateClassAccountModal from '../../components/UpdateClassAccountModal';
import UpdateStudentAccountModal from '../../components/UpdateStudentAccountModal';

const Finance = () => {
  const formRef1 = useRef();
  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
    console.log('reset');
  }

  const fee = useSelector((state) => state?.fees);
  const {
    cartegory,
    Assignfee,
    AssignfeeGroup,
    Generatefee,
    deleteAllAssigned,
    custom,
  } = fee;

  const [pagesval, setpagesval] = useState(30);
  const [classs, setClasss] = useState([]);

  const [loader, setLoader] = useState(true);

  const [classname, setclasname] = useState('');
  const [sectionname, setsectionname] = useState('');

  const [display, setDisplay] = useState(false);
  const [displaytable, setDisplaytable] = useState(false);

  const [id, setclassId] = useState('');
  const [filename, setFileName] = useState('');
  const [file, setFile] = useState('');

  const [classTitle, setClassTitle] = useState('');
  const [classInstructor, setClassInstructor] = useState('');

  const [propdata, setpropdata] = useState([]);

  const [nodes, setdata] = useState([]);
  const [datacart, setdatacart] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);
  const [visible8, setVisible8] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clad = useSelector((state) => state?.classes);

  const {
    fetchAllClassloading,
    fetchAllClass,
    sectionloading,
    CreateClasses,
    CreateClassesloading,
  } = clad;

  useEffect(() => {
    dispatch(fetchAllsessionAction());
    dispatch(fetchAllClassAction());
    dispatch(fetchfeeAssignRecordAction());
  }, []);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (Assignfee?.success == 1) {
      let data = Assignfee?.data;
      setdata(data);
      //  setVisible(false);
    }
  }, [Assignfee]);

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
      BaseCell: `
        font-size: 15px;
        //color:white;
      //   border-bottom: 1px solid #313D4A !important;
      //   //  background-color: #24303F;

      `,
      Table: `
      --data-table-library_grid-template-columns:  25% 20% 10%  10% 10% 17% 8%;
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
      size: 30,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  const [search, setSearch] = useState('');

  data = {
    nodes: data.nodes.filter((item) =>
      item.class.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  function onPaginationChange(action, state) {}

  const handleViewbtn = (value) => {
    show('top-right');

    setclasname(value.name);
    setsectionname(value.title);
    setclassId(value.id);
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

  useEffect(() => {
    dispatch(fetchfeeCartegoryAction());
  }, []);

  useEffect(() => {
    if (Generatefee?.success == 1) {
      setVisible(false);
      setVisible5(false);
      setVisible7(false);
      setVisible8(false);

      dispatch(resetGeneratefee());
    }
    if (deleteAllAssigned?.success == 1) {
      setVisible5(false);

      dispatch(resetdeleteassignedfee());
    }
  }, [Generatefee, deleteAllAssigned]);
  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;
  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (cartegory?.success == 1) {
      let data = cartegory?.data;
      setdatacart(data);
    }
    // if (loading == false) {
    //   dispatch(fetchBulkStudent());
    // }

    // }
    // datas = data;
  }, [cartegory]);
  const classdata = {
    title: classTitle.toUpperCase(),
    createdBy: username?.payload,
    instructor: classInstructor,
  };
  const handlecreateClass = () => {
    if (classData1.length == 0) {
      return toast.error('File Error- Choose File Again');
    } else {
      dispatch(CreatesBulkClassAction(classData1));
    }
  };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(`All-Classes-List`);
  };

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `Admission Template`,
  });
  let template = {
    firstName: '',
    otherName: '',
    lastName: '',
    religion: '',
    gender: '',
    dateofbirth: '',
    accountbalance: '',
  };
  const handleDownloadCSV = async () => {
    const csv = generateCsv(csvConfig)([template]);
    download(csvConfig)(csv);
  };

  const [classData, setClassData] = useState([]);
  const [classData1, setClassData1] = useState([]);
  const [check, setCheck] = useState(true);

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

      let newArr1 = parsedData.map((v) => ({
        ...v,
        password: generateString(5),
        email: v.firstName + generateString(3).toLocaleLowerCase(),
        class: classname,
        section: sectionname,
      }));
      setClassData1(newArr1);
    };
  }
  useEffect(() => {
    console.log(classData1);
  }, [classData, check]);

  const [position, setPosition] = useState('center');

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };
  useEffect(() => {
    if (Generatefee?.success == 1) {
      let data = Generatefee?.data;
      setVisible3(false);
      setVisible2(false);
      setVisible(false);
      dispatch(resetGeneratefee());
    }
  }, [Generatefee]);

  useEffect(() => {
    if (AssignfeeGroup?.success == 1) {
      setVisible4(false);
    }
    if (custom?.success == 1) {
      setVisible6(false);
    }
  }, [AssignfeeGroup, custom]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (AssignfeeGroup?.success == 1) {
      let data = AssignfeeGroup?.data;
      setpropdata(data);
      // setVisible(false);
    }
  }, [AssignfeeGroup]);

  const statistics = useSelector((state) => state?.statistics);
  const { studentStat, classStat, teacherStat, parentStat } = statistics;
  useEffect(() => {
    dispatch(studentStatAction());
    dispatch(classStatAction());
    dispatch(teacherStatAction());
    dispatch(parentStatAction());

    // dispatch(());
  }, []);

  const [student, setStudent] = useState('loading...');
  const [classes, setClasses] = useState('loading...');

  const [teachers, setTeachers] = useState('loading...');
  const [subjects, setSubjects] = useState('loading...');

  useEffect(() => {
    if (studentStat?.success == 1) {
      setStudent(studentStat?.data[0].noStudent);
    }
  }, [studentStat]);

  useEffect(() => {
    if (classStat?.success == 1) {
      setClasses(classStat?.data[0].noclass);
    }
  }, [classStat]);

  useEffect(() => {
    if (teacherStat?.success == 1) {
      setTeachers(teacherStat?.data[0].noStaff);
    }
  }, [teacherStat]);

  useEffect(() => {
    if (parentStat?.success == 1) {
      setSubjects(parentStat?.data[0].noParent);
    }
  }, [parentStat]);

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <GenerateFeeModak close={setVisible} val={propdata} />
      </Dialog>
      <Dialog
        visible={visible2}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
      >
        <GenerateFeeModalClass close={setVisible2} val={propdata} />
      </Dialog>
      <Dialog
        visible={visible3}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible3) return;
          setVisible3(false);
        }}
      >
        <GenerateFeeModalStudent close={setVisible3} />
      </Dialog>
      <Dialog
        visible={visible4}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible4) return;
          setVisible4(false);
        }}
      >
        <AssignFeeModal close={setVisible4} />
      </Dialog>
      <Dialog
        visible={visible5}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible5) return;
          setVisible5(false);
        }}
      >
        <DeleteAllAssignedFeeModal close={setVisible5} val={propdata} />
      </Dialog>
      <Dialog
        visible={visible6}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible6) return;
          setVisible6(false);
        }}
      >
        <UpdateStudentAccountModal close={setVisible6} />
      </Dialog>
      <Dialog
        visible={visible7}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible7) return;
          setVisible7(false);
        }}
      >
        <UpdateAllStudentAccountModal close={setVisible7} />
      </Dialog>

      <Dialog
        visible={visible8}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible8) return;
          setVisible8(false);
        }}
      >
        <UpdateClassAccountModal close={setVisible8} />
      </Dialog>

      <div className="flex w-full gap-2">
        <div className="w-10/12">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2  ">
            <div className="w-full flex-col">
              <div
                className={
                  'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
                }
              >
                <div className="w-full overflow-x-auto">
                  <div className="w-full  flex justify-between  ">
                    <h3 className="font-medium text-black py-3 dark:text-white">
                      Generate Fee
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className={
                  'rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
                }
              >
                <div className="w-full">
                  <label className="  text-sm font-medium text-ash dark:text-white">
                    Generate Fee Options :
                  </label>
                  <div className=" flex flex-col gap-2">
                    <div className="flex justify-between ">
                      <label className="pt-2 flex gap-2  text-sm font-medium text-ash dark:text-white">
                        <div
                          className={` flex h-5 w-5 items-center justify-center rounded border ${
                            true && 'border-primary bg-gray dark:bg-transparent'
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${true && 'bg-primary'}`}
                          ></span>
                        </div>{' '}
                        Generate Fee For All Classes
                      </label>
                      <button
                        className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={() => {
                          show('top-right');
                          dispatch(fetchfeeAssignGroupRecordAction());
                        }}
                      >
                        Select
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <label className="pt-2 flex gap-2  text-sm font-medium text-ash dark:text-white">
                        <div
                          className={` flex h-5 w-5 items-center justify-center rounded border ${
                            true && 'border-primary bg-gray dark:bg-transparent'
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${true && 'bg-primary'}`}
                          ></span>
                        </div>{' '}
                        Generate Fee For Class
                      </label>
                      <button
                        className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={() => {
                          setVisible2(true);
                        }}
                      >
                        Select
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <label className="pt-2 flex gap-2  text-sm font-medium text-ash dark:text-white">
                        <div
                          className={` flex h-5 w-5 items-center justify-center rounded border ${
                            true && 'border-primary bg-gray dark:bg-transparent'
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${true && 'bg-primary'}`}
                          ></span>
                        </div>{' '}
                        Generate Fee For Single Student
                      </label>
                      <button
                        className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={() => {
                          setVisible3(true);
                        }}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex-col">
              <div
                className={
                  'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
                }
              >
                <div className="w-full overflow-x-auto">
                  <div className="w-full  flex justify-between  ">
                    <h3 className="font-medium text-black py-3 dark:text-white">
                      Assign Fee
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className={
                  'rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
                }
              >
                <div className="w-full">
                  <label className="  text-sm font-medium text-ash dark:text-white">
                    Assign Fee Options :
                  </label>
                  <div className=" flex flex-col gap-2">
                    <div className="flex justify-between ">
                      <label className="pt-2 flex gap-2  text-sm font-medium text-ash dark:text-white">
                        <div
                          className={` flex h-5 w-5 items-center justify-center rounded border ${
                            true && 'border-primary bg-gray dark:bg-transparent'
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${true && 'bg-primary'}`}
                          ></span>
                        </div>{' '}
                        Assign Fee For Classes
                      </label>
                      <button
                        className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={() => {
                          setVisible4(true);
                        }}
                      >
                        Select
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <label className="pt-2 flex gap-2  text-sm font-medium text-ash dark:text-white">
                        <div
                          className={` flex h-5 w-5 items-center justify-center rounded border ${
                            true && 'border-primary bg-gray dark:bg-transparent'
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${true && 'bg-primary'}`}
                          ></span>
                        </div>
                        Delete All Assigned Fees
                      </label>
                      <button
                        className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={() => {
                          setVisible5(true);
                        }}
                      >
                        Select
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <label className="pt-2 flex gap-2  text-sm font-medium text-ash dark:text-white">
                        <div
                          className={` flex h-5 w-5 items-center justify-center rounded border ${
                            true && 'border-primary bg-gray dark:bg-transparent'
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${true && 'bg-primary'}`}
                          ></span>
                        </div>{' '}
                        View All Assigned Fee Details
                      </label>
                      <button
                        className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={() => {
                          show('top-right');
                          dispatch(fetchfeeAssignGroupRecordAction());
                        }}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex-col">
              <div
                className={
                  'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
                }
              >
                <div className="w-full overflow-x-auto">
                  <div className="w-full  flex justify-between  ">
                    <h3 className="font-medium text-black py-3 dark:text-white">
                      Update Students' Account Balance
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className={
                  'rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
                }
              >
                <div className="w-full">
                  <label className="  text-sm font-medium text-ash dark:text-white">
                    Update Account Options :
                  </label>
                  <div className=" flex flex-col gap-2">
                    <div className="flex justify-between ">
                      <label className="pt-2 flex gap-2  text-sm font-medium text-ash dark:text-white">
                        <div
                          className={` flex h-5 w-5 items-center justify-center rounded border ${
                            true && 'border-primary bg-gray dark:bg-transparent'
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${true && 'bg-primary'}`}
                          ></span>
                        </div>{' '}
                        Update Student's Account Balance
                      </label>
                      <button
                        className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={() => {
                          setVisible6(true);
                        }}
                      >
                        Select
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <label className="pt-2 flex gap-2  text-sm font-medium text-ash dark:text-white">
                        <div
                          className={` flex h-5 w-5 items-center justify-center rounded border ${
                            true && 'border-primary bg-gray dark:bg-transparent'
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${true && 'bg-primary'}`}
                          ></span>
                        </div>{' '}
                        Update Entire Class Account Balance
                      </label>
                      <button
                        className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={() => {
                          setVisible8(true);
                        }}
                      >
                        Select
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <label className="pt-2 flex gap-2  text-sm font-medium text-ash dark:text-white">
                        <div
                          className={` flex h-5 w-5 items-center justify-center rounded border ${
                            true && 'border-primary bg-gray dark:bg-transparent'
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${true && 'bg-primary'}`}
                          ></span>
                        </div>{' '}
                        Update All Student Account Balance
                      </label>
                      <button
                        className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={() => {
                          setVisible7(true);
                        }}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex-col">
              <div
                className={
                  'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
                }
              >
                <div className="w-full overflow-x-auto">
                  <div className="w-full  flex justify-between  ">
                    <h3 className="font-medium text-black py-3 dark:text-white">
                      Finace Activity Records
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className={
                  'rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
                }
              >
                {/* <div className="w-full">
                  <label className="  text-sm font-medium text-ash dark:text-white">
                    Assign Fee Options :
                  </label>
                  <div className=" flex flex-col gap-2">
                    <div className="flex justify-between ">
                      <label className="pt-2 flex gap-2  text-sm font-medium text-ash dark:text-white">
                        <div
                          className={` flex h-5 w-5 items-center justify-center rounded border ${
                            true && 'border-primary bg-gray dark:bg-transparent'
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${true && 'bg-primary'}`}
                          ></span>
                        </div>{' '}
                        Update Student Account Balance
                      </label>
                      <button
                        className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={() => {
                          show('top-right');
                          dispatch(fetchfeeAssignGroupRecordAction());
                        }}
                      >
                        Select
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <label className="pt-2 flex gap-2  text-sm font-medium text-ash dark:text-white">
                        <div
                          className={` flex h-5 w-5 items-center justify-center rounded border ${
                            true && 'border-primary bg-gray dark:bg-transparent'
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${true && 'bg-primary'}`}
                          ></span>
                        </div>
                        Delete All Assigned Fees
                      </label>
                      <button
                        className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={() => {
                          show('top-right');
                          dispatch(fetchfeeAssignGroupRecordAction());
                        }}
                      >
                        Select
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <label className="pt-2 flex gap-2  text-sm font-medium text-ash dark:text-white">
                        <div
                          className={` flex h-5 w-5 items-center justify-center rounded border ${
                            true && 'border-primary bg-gray dark:bg-transparent'
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${true && 'bg-primary'}`}
                          ></span>
                        </div>{' '}
                        View All Assigned Fee Details
                      </label>
                      <button
                        className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={() => {
                          show('top-right');
                          dispatch(fetchfeeAssignGroupRecordAction());
                        }}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-2/12">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-1  ">
            <CardDataStats title="Total Fees Collected" total={student}>
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                  fill=""
                />
                <path
                  d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                  fill=""
                />
                <path
                  d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                  fill=""
                />
              </svg>
            </CardDataStats>
            <CardDataStats title="Year's Total Expense " total={subjects}>
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                  fill=""
                />
                <path
                  d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                  fill=""
                />
                <path
                  d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                  fill=""
                />
              </svg>
            </CardDataStats>
            <CardDataStats title="Fee Assigned Classes" total={teachers}>
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                  fill=""
                />
                <path
                  d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                  fill=""
                />
                <path
                  d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                  fill=""
                />
              </svg>
            </CardDataStats>
          </div>
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default Finance;
