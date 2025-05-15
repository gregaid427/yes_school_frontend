import { useEffect, useRef, useState } from 'react';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';
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

import Loader from '../../common/Loader';
import toast from 'react-hot-toast';
import {
  CreatesBulkClassAction,
  CreatesClassAction,
  deleteSingleClassAction,
  fetchAllClassAction,
  fetchAllClassNoAction,
  fetchSingleClassAction,
  resetcreateClass,
} from '../../redux/slices/classSlice';
import TableBtn from '../../components/Svgs/TableBtn';
import { Dialog } from 'primereact/dialog';
import NewExamsModal from '../../components/NewExamsModal';
import NewSubjectModal from '../../components/NewSubjectModal';
import { fetchSubjectAction } from '../../redux/slices/subjectSlice';
import { FetchExamGroupAction, resetFetchStdtPerformance } from '../../redux/slices/examSlice';
import { fetchAllsessionAction } from '../../redux/slices/sessionSlice';
import ExamResultChoiceModal from '../../components/ExamResultChoiceModal';
import SearchStudentsModalExam from '../SearchStudentsModalExam';

const Examsettings = () => {
  const formRef1 = useRef();
  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
    console.log('reset');
  }

  const [pagesval, setpagesval] = useState(30);
  const [classs, setClasss] = useState([]);

  const [loader, setLoader] = useState(true);

  const [classname, setclasname] = useState('');
  const [sectionname, setsectionname] = useState('');

  const [display, setDisplay] = useState(false);
  const [Visible1, setVisible1] = useState(false);

  const [tabledata, settabledata] = useState([]);

  const [id, setclassId] = useState('');
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
  const exam = useSelector((state) => state?.exam);
  const { FetchStdtPerformance } = exam;


  const { fetchAllClassNo } = clad;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    // dispatch(fetchAllClass());
    dispatch(fetchAllClassNoAction());
  }, []);

  
 

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchAllClassNo?.success == 1) {
      let data = fetchAllClassNo?.data;
      setdata(data);
    }
  }, [fetchAllClassNo]);

  let data = { nodes };
  console.log(data);
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
      --data-table-library_grid-template-columns:  50% 40%  10%;
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
  const [val, setVal] = useState();
  const [val1, setVal1] = useState();

  data = {
    nodes: data.nodes.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  function onPaginationChange(action, state) {}

  const handleViewbtn = (value) => {
    setclasname(value.title);
    setsectionname(value.section);
    setclassId(value.id);
  };

  const [visible4, setVisible4] = useState(false);
  const [visible3, setVisible3] = useState(false);
  useEffect(() => {
    dispatch(fetchSubjectAction());
    dispatch(FetchExamGroupAction());
    dispatch(fetchAllsessionAction());
  }, []);


  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
        <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '60%' }}
        onHide={() => {
          if (!visible) return;
          setVisible3(false);
        }}
      >
        <SearchStudentsModalExam close={setVisible} openModal={setVisible} />
      </Dialog>
      <Dialog
        visible={visible3}
        position={'top'}
        style={{ height: 'auto', width: '30%' }}
        onHide={() => {
          if (!visible3) return;
          setVisible3(false);
        }}
      >
        <ExamResultChoiceModal close={setVisible3} value={val1} />
      </Dialog>
      <Dialog
        visible={visible4}
        position={'top-right'}
        style={{ height: 'auto', width: '25%' }}
        onHide={() => {
          if (!visible4) return;
          setVisible4(false);
        }}
      >
        <NewSubjectModal close={setVisible4} />
      </Dialog>
      <div className={'flex row gap-2  w-full'}>
        <div className={display ? 'hidden' : 'w-full  flex-col'}>
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
        
          </div>
        
          <div className="w-6/12">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-1  ">
                  <div className="w-full flex-col">
                      <div
                        className={
                          'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
                        }
                      >
                        <div className="w-full overflow-x-auto">
                          <div className="w-full  flex justify-between  ">
                            <h3 className="font-medium text-black py-3 dark:text-white">
                              Exam Management 
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
                          Exam  Management Options
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
                                Add Exam Cartegory
                                </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                 // setVisible(true);
                                 navigate("/exam/examgroup")
                              //    dispatch(fetchfeeAssignGroupRecordAction());
                                }}
                              >
                                Select
                              </button>
                            </div>
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
                                Add Marks Grading
                                </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                 // setVisible(true);
                                 navigate('/settings/exmgrading')
                              //    dispatch(fetchfeeAssignGroupRecordAction());
                                }}
                              >
                                Select
                              </button>
                            </div>
        
                            {/* <div className="flex justify-between">
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
                                View Current Opened Account
                              </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                  setVisible21(true);
                                  dispatch(CurrentAccountDetailAction());
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
                                Account Closure Log
                              </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                  setVisible23(true);
                                  dispatch(FetchSessionAcountAction());
                                }}
                              >
                                Select
                              </button>
                            </div> */}
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
                              Student Performance Tracking
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
                            Performance Tracking Options
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
                                Single Student Performance Track
                                </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                 // setVisible(true);
                                 navigate("/settings/std")
                              //    dispatch(fetchfeeAssignGroupRecordAction());
                                }}
                              >
                                Select
                              </button>
                            </div>
        
                            {/* <div className="flex justify-between">
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
                                View Current Opened Account
                              </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                  setVisible21(true);
                                  dispatch(CurrentAccountDetailAction());
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
                                Account Closure Log
                              </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                  setVisible23(true);
                                  dispatch(FetchSessionAcountAction());
                                }}
                              >
                                Select
                              </button>
                            </div> */}
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    {/* <div className="w-full flex-col">
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
                                Generate Fee For Session (All Students)
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
                                Generate Fee Log
                              </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                  setVisible24(true);
                                  dispatch(FetchGenerateFeeAction());
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
                                Manage Fee Items
                              </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                  navigate('/settings/feeitems');
                                }}
                              >
                                Select
                              </button>
                            </div>
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
                                  navigate('/settings/assignfee');
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
                              Scholarship
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
                            Options :
                          </label>
                          <div className=" flex flex-col mb-2 gap-2">
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
                                Add Scholarship Scheme
                              </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                  navigate('/settings/scholarship');
                                }}
                              >
                                Select
                              </button>
                            </div>
                          </div>
        
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
                                Enroll Student on Scholarship
                              </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                  navigate('/settings/enrollscholarship');
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
                                Revoke Students' Scholarship
                              </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                  navigate('/settings/revokescholarship');
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
                                Students Scholarship List
                              </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                  navigate('/fees/Scholarshipenroll');
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
                              Fee Preference
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
                            Options :
                          </label>
                          <div className=" flex flex-col mb-2 gap-2">
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
                                Manage Fee Preferences
                              </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                  navigate('/settings/preference');
                                }}
                              >
                                Select
                              </button>
                            </div>
                          </div>
        
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
                                Students Preference List
                              </label>
                              <button
                                className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                                type=""
                                onClick={() => {
                                  navigate('/settings/preferencelist');
                                }}
                              >
                                Select
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Examsettings;
