import { useEffect, useState } from 'react';

import userThree from '../../images/user/log.jpg';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  createsessionAction,
  deletesessionByIdAction,
  fetchActivesessionAction,
  fetchAllsessionAction,
  resetcreatesession,
  resetUpdatesession,
  updatesessionStatusAction,
} from '../../redux/slices/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import SessionSelect from '../../components/SessionSelect';
import { Dialog } from 'primereact/dialog';
import SetSessionAlert from '../../components/SetSessionAlert';
import {
  fetchschoolinfoAction,
  SchoollogoAction,
  updateschoolinfoAction,
} from '../../redux/slices/usersSlice';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Downloadicon from '../../components/Svgs/downloadicon';
import {
  fetchCustomStudentsClassAction,
  fetchStudentsCustomAction,
} from '../../redux/slices/studentSlice';
import { usePagination } from '@table-library/react-table-library/pagination';
import { download, generateCsv, mkConfig } from 'export-to-csv';
import { useTheme } from '@table-library/react-table-library/theme';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import {
  FetchSingleGradeGroupAction,
  resetsubmitresult,
  setExamResult,
  SubmitResultAction,
} from '../../redux/slices/examSlice';
import {
  fetchAllClassExamAction,
  resetfetchAllClassExam,
} from '../../redux/slices/classSlice';
import ExamResultAlert from '../../components/ExamResultAlert';
import ExamResultModal from '../../components/ExamResultModal';

const AddExamResult = (props) => {
  const location = useLocation();
  let student = useSelector((state) => state?.student);
  const [pagesval, setpagesval] = useState(30);
  const [value, setVal] = useState('Loading...');

  const [nodes, setdata] = useState([]);
  const [gradingchoice, setGrading] = useState([]);

  const [FinalResult, setFinalResult] = useState([]);
  const [singleGrade, setSingleGrade] = useState();
  const [response, setResponse] = useState();

  const { fetchcustomstudent } = student;

  const exam = useSelector((state) => state?.exam);
  const { FetchExamResult, SingleGradegroup, ExamResultArray, submitResult } =
    exam;
    const [classData, setClassData] = useState([]);
    const [classData1, setClassData1] = useState([]);
    const [check, setCheck] = useState(true);

 

  useEffect(() => {
    if (location?.state == null) {
      return navigate(-1);
    } else {
      const { value } = location?.state;
      console.log(value);

      setVal(value);

      console.log(value);
      console.log(value?.gradingtype);

      dispatch(FetchSingleGradeGroupAction({ title: value?.chosengrade }));

      dispatch(
        fetchStudentsCustomAction({
          class: value?.class,
          section: value?.section,
        }),
      );
    }
  }, []);
  console.log(ExamResultArray);
  console.log('Exam result Array is');

  useEffect(() => {
    if (value?.class) {
      console.log(value);
      dispatch(
        fetchAllClassExamAction({
          classes: value?.class,
          examgroup: value?.examgroup,
          session: value?.session,
          subject: value?.subjects,
          section: value?.section == null ? '-' : value?.section,
        }),
      );
    }
  }, [value]);

  const clad = useSelector((state) => state?.classes);

  const { fetchAllClassExam } = clad;

  useEffect(() => {
    if (fetchAllClassExam?.success == 1) {
      let data = fetchAllClassExam?.data;
      console.log(data);
      if (data.length != 0) {
        setResponse(data);
        setVisible1(true);
        //setdata([])

        dispatch(resetfetchAllClassExam());
      }
    }
  }, [fetchAllClassExam]);

  const navigate = useNavigate();
  console.log(nodes);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const [position, setPosition] = useState('center');

  const user = useSelector((state) => state?.user);

  const [yes, setYes] = useState(undefined);
  const dispatch = useDispatch();

  const [value1, setVal1] = useState('Loading...');

  useEffect(() => {
    setdata([]);
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
  --data-table-library_grid-template-columns:  15% 35% 10% 10%  30%;
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
      size: 900000,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  const [Modaldata, setModaldata] = useState();

  const [search, setSearch] = useState('');
  const [searchval, setSearchval] = useState('First Name');

  data = {
    nodes: data.nodes.filter((item) =>
      searchval === 'First Name'
        ? item.firstName.toLowerCase().includes(search.toLowerCase())
        : searchval == 'Last Name'
          ? item.lastName.toLowerCase().includes(search.toLowerCase())
          : item.student_id.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `${value?.class} : ${value?.section == null ? '' : value?.section} `,
  });

  const handleDownloadCSV = async () => {
    const csv = generateCsv(csvConfig)(nodes);
    download(csvConfig)(csv);
  };
  function getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let random = getRandomNumber(10000, 1000);
  let examinationid = value.subjects?.slice(0, 3) + random;
  let resultdata = {
    subject: value?.subjects,
    session: value?.session,
    examid: examinationid,
    result: ExamResultArray.payload,
    examtable: value?.examtable,
    examgroup: value?.examgroup,
    exampercent: value?.examgrade,
    classpercent: value?.classgrade,
    otherpercent: value?.othergrade,
    gradeArray: singleGrade,
    classes: value?.class,
    classcode: value?.classcode,
    section: value?.section == null ? '-' : value?.section,
    createdby: 'Asante',
    classsize: nodes.length,
  };
  function handleSubmitResult() {
    //when no student
    if (FinalResult?.length == 0) return toast.error('No Result To Updoad');
    console.log(resultdata);

    dispatch(SubmitResultAction(resultdata));
  }
  useEffect(() => {
    if (fetchcustomstudent?.success == 1) {
      let data = fetchcustomstudent?.data;
      setdata(data);
      setFinalResult(data);
    }
  }, [fetchcustomstudent]);

  useEffect(() => {
    if (submitResult?.success == 1) {
      let data = submitResult?.data;
      setModaldata(data);
      setVisible(true);
      dispatch(resetsubmitresult());
      dispatch(setExamResult([]));
    }
  }, [submitResult]);

  useEffect(() => {
    if (SingleGradegroup?.success == 1) {
      let data = SingleGradegroup?.data;
      setSingleGrade(data);
    }
  }, [SingleGradegroup]);
  return (
    <DefaultLayout>
      <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '75%', margin: '50px 0 0 125px' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      >
        <ExamResultModal value={Modaldata} close={setVisible} />
      </Dialog>
      <Dialog
        visible={visible1}
        position={'top'}
        style={{ height: 'auto', width: '50%' }}
        onHide={() => {
          if (!visible1) return;
          setVisible1(false);
        }}
        draggable={false}
        resizable={false}
      >
        <ExamResultAlert info={value} response={response} close={setVisible1} />
      </Dialog>

      <div className="flex gap-2 row">
        <div className="w-full flex-col">
          <div className="mb-4">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <h3 className="font-medium pt-2  px-7 text-black dark:text-white">
                Add Examination Result
              </h3>
              <div className="border-b border-stroke py-4 px-7 flex dark:border-strokedark">
                <div className="w-1/2">
                  <h3 className="text-sm text-black dark:text-white">
                    Class/Section :{' '}
                    <span className="font-medium">
                      {' '}
                      {`${value?.class} ${' '}  ${value?.section == null ? '' : value?.section == '-' ? ' ' : '/' + value?.section}`}
                    </span>
                  </h3>
                  <h3 className="text-sm  text-black dark:text-white">
                    Subject:{' '}
                    <span className="font-medium ml-1">
                      {`${value?.subjects}`}{' '}
                    </span>
                  </h3>
                  <h3 className="text-sm  text-black dark:text-white">
                    Chosen Grading:{' '}
                    <span className="font-medium ml-1">
                      {value?.chosengrade}
                    </span>
                  </h3>
                </div>
                <div className="w-1/2  border-l pl-2  border-stroke ">
                  <h3 className="text-sm  text-black dark:text-white">
                    Exam Group:{' '}
                    <span className="font-medium ml-1">{`${value?.examgroup}`}</span>
                  </h3>
                  <h3 className="text-sm  text-black dark:text-white">
                    Session:{' '}
                    <span className="font-medium ml-1">
                      {`${value?.session}`}{' '}
                    </span>
                  </h3>
                  <h3 className="text-sm  text-black dark:text-white">
                    Mark Distribution:{' '}
                    <span className="font-medium ml-1">
                      Exam({value?.examgrade}%) : Class({value?.classgrade}
                      %) : Other({value?.othergrade}%)
                    </span>
                  </h3>
                </div>
              </div>
              <div className={nodes.length == 0 ? 'hidden' : ''}>
                <div className="px-7 flex gap-4 justify-between  mb-4">
                  <div className="w-3/5">
                    {/* Excel Options
                    <div className="flex mb-2 gap-4.5">
                      <button
                        className="flex w- gap-1 justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={() => {
                          handleDownloadCSV();
                        }}
                      >
                        <Downloadicon />
                        Class List (Excel)
                      </button>
                      <button
                        className="flex w- justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={(e) => {
                          e.preventDefault();
                          handleFileUpload(e);
                        }}
                      >
                        Upload Result (Excel)
                      </button>
                    </div> */}
                  </div>

                  <div className=" ">
                    {/* Upload Result */}
                    <div className="flex   gap-4.5">
                      <button
                        className="flex w- gap-1 justify-center rounded bg-primary py-2 px-5 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmitResult();
                        }}
                      >
                        Submit Result
                      </button>
                      {/* <button
                    className="flex w-3/12 justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      handlecreateSection();
                    }}
                  >
                    Upload Result (Excel)
                  </button> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className={nodes.length != 0 ? 'hidden' : ''}></div>
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
                              <HeaderCell>Class</HeaderCell>

                              <HeaderCell>Section</HeaderCell>

                              <HeaderCell>
                                {' '}
                                <div className="flex gap-1">
                                  {' '}
                                  <div className="w-4/12">Exam</div>
                                  <div className="w-4/12">Class</div>{' '}
                                  <div className="w4/12">Other</div>
                                </div>
                              </HeaderCell>
                              {/* <HeaderCell>Class({gradingchoice[3]}%)</HeaderCell>
                            <HeaderCell>Other({gradingchoice[4]}%)</HeaderCell> */}
                            </HeaderRow>
                          </Header>

                          <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                            {tableList.map((item, index) => (
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
                                  <span>{item.class}</span>
                                </Cell>
                                <Cell className="  ">
                                  <span>{item.section}</span>
                                </Cell>

                                <Cell>
                                  <div className="flex row gap-1 w-full">
                                    <input
                                      className="w-4/12 rounded border border-stroke bg-gray px-1 mx-1 my-2 py-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                      //  key={1}
                                      type="number"
                                      onChange={(e) => {
                                        var newData = FinalResult.map((el) => {
                                          if (el.student_id == item.student_id)
                                            return Object.assign({}, el, {
                                              examScore: e.target.value,
                                            });
                                          return el;
                                        });
                                        setFinalResult(newData);
                                        dispatch(setExamResult(newData));
                                      }}
                                    />

                                    <input
                                      className="w-4/12 rounded border border-stroke bg-gray px-1 mx-1 my-2 py-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                      //key={1}
                                      type="number"
                                      onChange={(e) => {
                                        var newData = FinalResult.map((el) => {
                                          if (el.student_id == item.student_id)
                                            return Object.assign({}, el, {
                                              classWorkScore: e.target.value,
                                            });
                                          return el;
                                        });
                                        setFinalResult(newData);
                                        dispatch(setExamResult(newData));
                                      }}
                                    />
                                    <input
                                      className="w-4/12 rounded border border-stroke bg-gray px-1 mx-1 my-2 py-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                      // key={1}
                                      type="number"
                                      onChange={(e) => {
                                        var newData = FinalResult.map((el) => {
                                          if (el.student_id == item.student_id)
                                            return Object.assign({}, el, {
                                              othersScore: e.target.value,
                                            });
                                          return el;
                                        });
                                        setFinalResult(newData);
                                        dispatch(setExamResult(newData));
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
                  <div className={nodes.length == 0 ? '' : 'hidden'}>
                    <div className="flex justify-around">
                      <h3 className="text-md text-center  text-black dark:text-white">
                        No Class Data
                      </h3>
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
                          {tableList.map((item) => (
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
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddExamResult;
