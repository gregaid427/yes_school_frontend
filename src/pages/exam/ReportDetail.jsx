import { useEffect, useRef, useState } from 'react';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DeleteSVG from '../../components/Svgs/delete';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';

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
import {
  fetchAllClassAction,
  fetchAllSectionAction,
} from '../../redux/slices/classSlice';
import TableBtn from '../../components/Svgs/TableBtn';
import { Dialog } from 'primereact/dialog';

import {
  FetchClassReportAction,
  FetchExamCustomAction,
  FetchExamGroupAction,
  FetchExamListAction,
  FetchSingleReportAction,
  GetExamRemarksAction,
  resetclassreport,
  resetcreateexam,
  resetsinglereport,
} from '../../redux/slices/examSlice';
import ExamListModal from '../../components/NewExamModal';
import NewExamModal from '../../components/NewExamModal';
import { fetchSubjectAction } from '../../redux/slices/subjectSlice';
import NewSubjectModal from '../../components/NewSubjectModal';
import ClassSelect from '../../components/ClassSelect';
import SectionSelect1 from '../../components/SectionsSelect1';
import SessionSelect from '../../components/SessionSelect';
import { fetchAllsessionAction } from '../../redux/slices/sessionSlice';
import ExamGroupSelect from '../../components/ExamGroupSelect';
import ExamResultChoiceModal from '../../components/ExamResultChoiceModal';
import NewExamsModal from '../../components/NewExamsModal';
import ViewSVG from '../../components/Svgs/View';
import { fetchCustomStudentsClassAction2, fetchStudentsClassAction, resetFetchCustom } from '../../redux/slices/studentSlice';
import toast from 'react-hot-toast';
import ExamReportModal from '../../components/SingleExamReport';
import ClassReportModal from '../../components/ClassReportModal';
import RemarksExamModal from '../../components/RemarksExamModal';
import RemarksExamModal1 from '../../components/RemarksExamModal1';

const ExamReportDetail = () => {
  
  // useEffect(() => {
  //   setdata([]);
  // }, []);
  const exam = useSelector((state) => state?.exam);
  const { SingleReport, ClassReport, FetchExamCustom ,GetExamRemark} = exam;

  const student = useSelector((state) => state?.student);
  const { fetchcustom } = student;

  const location = useLocation();

  const [pagesval, setpagesval] = useState(30);

  const [loader, setLoader] = useState(false);
    const [propval, setpropval] = useState([]);


  const [nodes, setdata] = useState([]);
  const [singledata, setsingledata] = useState([]);
  const [classdata, setClassdata] = useState([]);

  const [datacart, setdatacart] = useState([]);
  const [val, setVal] = useState();
  const [std, setstd] = useState();


  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(FetchExamListAction());
  // }, []);

  useEffect(() => {
    
    dispatch(FetchExamGroupAction());
  }, []);

  useEffect(() => {
    if (ClassReport?.success == 0) {
    }
    if (ClassReport?.success == 1) {
      let data = ClassReport?.data;
      console.log(data);
      if (data.length == 0) {
        return toast.error('No Results Available');
      }
      // setVisible4(true);
      if (classdata)
        navigate('/exam/classreport', {
          state: {  action: 1, val: info, examinfo: examinfo, result: data},
        });
      setClassdata(data);
    }
  }, [ClassReport]);

  useEffect(() => {
    if (SingleReport?.success == 0) {
    }
    if (SingleReport?.success == 1) {
      let data = SingleReport?.data;
      if (data.length == 0) {
        return toast.error('Select Exam Group');
      }
      setsingledata(data);

      //  setVisible(true);
      let examinfo = {
        session: sectionzz,
        examgroup: clazz,
        result: data,
      };
      // navigate('/exam/singlereport', {
      //   state: { action: 1, val: val, examinfo: examinfo },
      // });
      setVisible4(true)
      dispatch(resetsinglereport());
    }
  }, [SingleReport]);

  useEffect(() => {
    if (fetchcustom?.success == 0) {
    }
    if (fetchcustom?.success == 1) {
      let data = fetchcustom?.data;
      setdata(data);
      dispatch(resetFetchCustom())

    }
  }, [fetchcustom]);


 

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
      --data-table-library_grid-template-columns:   20% 45% 35% ;
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
  const [visible2, setVisible2] = useState(false);

  function onPaginationChange(action, state) {}
  const [searchval, setSearchval] = useState('First Name');

  const [search, setSearch] = useState('');
  const [clazz, setclazz] = useState();
  const [sectionzz, setsectionzz] = useState();
  const [info, setInfo] = useState();
  let examinfo = {
    session: sectionzz,
    examgroup: clazz,
    result: singledata,
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

  function onPaginationChange(action, state) {}
  
  const [grp, setexamgroupoption] = useState();

  const [visible, setVisible] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [classes, setClass] = useState();

  const [visible5, setVisible5] = useState(false);
    const [visible6, setVisible6] = useState(false);
        const [visible7, setVisible7] = useState(false);



  const [display, setDisplay] = useState(false);

  const [btn, setBtn] = useState('center');
  const [val2, setVal2] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState();
  const [selectedInfo1, setSelectedInfo1] = useState();


  const mydata = {
    session: sectionzz,
    examgroup: clazz,
  };
  function handleGetData() {
  //  setBtn(true);
  dispatch(fetchCustomStudentsClassAction2(val));

    dispatch(FetchExamCustomAction(mydata));
  }

  useEffect(() => {
    console.log(FetchExamCustom?.data?.length);
    if (FetchExamCustom?.data?.length > 0 && btn) {
      let data = FetchExamCustom?.data;
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [FetchExamCustom]);

  useEffect(() => {
    if (clazz == 'None'){
      setDisplay(false)
    }
  }, [clazz]);

  function handleGetstudentreport(val) {
    let data = {
      stdid: val?.student_id,
      session: sectionzz,
      examgroup: clazz,
    };
    dispatch(FetchSingleReportAction(data));
  }
  function handleGetClassreport() {
    if (clazz == 'None') return toast.error('Select Exam Group')
    let data = {
      classcode: info?.classId,
      clazz: info?.title,
      section: info?.section,
      session: sectionzz,
      examgroup: clazz,
    };
    dispatch(FetchClassReportAction(data));
  }
  useEffect(() => {
    dispatch(GetExamRemarksAction());
  }, []);
  useEffect(() => {
    dispatch(fetchAllsessionAction());
  }, []);
  console.log(location?.state?.value);

    useEffect(() => {
    if (GetExamRemark?.success == 1) {
      let data = GetExamRemark?.data;
      let myArr = ['-']

        for(const val of data){
          myArr.push(val.text)
          console.log(val)
        }
      setpropval(myArr);
      console.log(myArr)
    }
  }, [GetExamRemark]);


  useEffect(() => {
    if (location?.state == null) {
      //return navigate(-1);
    } else {
      const { value } = location?.state;
      console.log(value);
      console.log(value);
      setInfo(value);
      let data = {
        class: value?.title,
        section: value?.section == '-' ? null : value?.section,
      };
      setVal(data)
     // dispatch(fetchStudentsClassAction(data));
    }
  }, [location?.state]);

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      
      
     <Dialog
        visible={visible4}
        position={'top'}
        style={{ height: 'auto', width: '63%' }}
        onHide={() => {
          if (!visible4) return;
          setVisible4(false);
        }}
      >
        <ExamReportModal  action={1} val={info} examinfo ={examinfo} std={std}  result ={data} close={setVisible4} />
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
      <RemarksExamModal
          close={setVisible5}
          val2={val2}
          examinfo={examinfo}
          result={classdata}
        />
      </Dialog>
  <Dialog
        visible={visible6}
        position={'top-right'}
        style={{ height: 'auto', width: '80%' }}
        onHide={() => {
          if (!visible6) return;
          setVisible6(false);
        }}
      >
      <RemarksExamModal1
          close={setVisible6}
          val2={val2}
          examinfo={examinfo}
          result={propval}
        />
      </Dialog>
      

      

      <div className=" flex-col">
        <div
          className={
            'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
          }
        >
          <div className="w-full overflow-x-auto">
            <div className="w-full  flex justify-between  ">
              <h3 className="font-medium text-black py-3 dark:text-white">
                Exam Report : {info?.title}{' '}
                {info?.section == null ? '' : '/ ' + info?.section}
              </h3>
            </div>
          </div>
        </div>
        <div
          className={
            'rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
          }
        >
          <div className="w-full  flex gap-7">
            <div className=" flex w-10/12 gap-3">
              <div className="sm:w-3/5 ">
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Exam Group
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                  <ExamGroupSelect setsectionprop={setclazz} selectinfo={setSelectedInfo} />
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-2/5">
                <label
                  className="mb-1 block text-sm font-medium text-black dark:text-white"
                  htmlFor="phoneNumber"
                >
                  Session{' '}
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <SessionSelect setsectionprop={setsectionzz} selectinfo={setSelectedInfo1} />
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
                    onClick={() => handleGetData()}
                    className="btn h-10    flex justify-center rounded  bg-black py-2 px-3 font-medium text-gray hover:shadow-1"
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
              <div className="flex justify-between align-middle ">
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
                  setSearch(e.target.value.trim());
                }}
              />
              {/* <button onClick={() => toPDF()}>Download PDF</button> */}
            </div>
          </div>
          {/* <div className={FetchExamCustom?.data?.length > 0 && nodes.length > 0 ? '' : 'hidden'}>
            <button
              className="flex  justify-center rounded bg-primary py-1 px-3 font-medium text-gray hover:bg-opacity-90"
              type=""
              onClick={async (e) => {
                e.preventDefault();
                handleGetClassreport();
                //  await ref.current.openPrintDialog();
              }}
            >
              View / Print Class Report
            </button>
          </div> */}
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
                          <HeaderCell className="">ID</HeaderCell>
                          <HeaderCell>Name</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body>
                        {tableList?.map((item) => (
                          <Row
                            key={item?.student_id}
                            item={item?.student_id}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] "
                          >
                            <Cell className="  ">
                              <span>{item?.student_id}</span>
                            </Cell>
                            <Cell className="capitalize">
                              {item?.firstName +
                                ' ' +
                                item?.otherName +
                                ' ' +
                                item?.lastName}
                            </Cell>

                            <Cell>
                              <div className="gap-2 flex">
                                <TableBtn
                                  clickFunction={() => {
                                    // if (clazz == 'None')
                                    //   return toast.error('Select Exam Group');
                                    // else if (sectionzz == undefined)
                                    //   return toast.error('Select Session');
                                    setVal2(item);

                                    setVisible6(true);
                                  }}
                                  text={'Select Remarks'}
                                  color={'bg-primary'}
                                />
                                 <TableBtn
                                  clickFunction={() => {
                                    // if (clazz == 'None')
                                    //   return toast.error('Select Exam Group');
                                    // else if (sectionzz == undefined)
                                    //   return toast.error('Select Session');
                                    setVal2(item);

                                    setVisible5(true);
                                  }}
                                  text={'Update Remarks'}
                                  color={'bg-primary'}
                                />

                                <TableBtn
                                  clickFunction={() => {
                                    if (clazz == 'None')
                                      return toast.error('Select Exam Group');
                                    // else if (sectionzz == undefined)
                                    //   return toast.error('Select Session');
                                    // setVal(item);
                                    setstd(item)
                                    handleGetstudentreport(item);
                                  }}
                                  text={'View / Print'}
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
                        <HeaderCell>Class</HeaderCell>
                      </HeaderRow>
                    </Header>

                    <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                      {tableList?.map((item) => (
                        <Row
                          key={item.examsid}
                          item={item}
                          className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
                        >
                          <Cell className="  ">
                            <span>{item.title}</span>
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
    </DefaultLayout>
  );
};

export default ExamReportDetail;
