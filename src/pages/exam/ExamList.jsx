import { useEffect, useRef, useState } from 'react';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';
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
  DeleteExamAction,
  FetchExamCustomAction,
  FetchExamGroupAction,
  FetchExamListAction,
  resetcreateexam,
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
import DeleteModal from '../../components/DeleteModal';

const ExamList = () => {
  const formRef1 = useRef();
  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
    console.log('reset');
  }

  const exam = useSelector((state) => state?.exam);
  const { FetchExamList, Createexam, FetchExamCustom,DeleteExam } = exam;
  const [selectedInfo, setSelectedInfo] = useState();
  const [selectedInfo1, setSelectedInfo1] = useState();

  const [pagesval, setpagesval] = useState(50);

  const [loader, setLoader] = useState(true);

  const [nodes, setdata] = useState([]);
  const [datacart, setdatacart] = useState([]);
  const [val, setVal1] = useState([]);
  const [info, setinfo] = useState();


  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchExamListAction());
  }, []);

  useEffect(() => {
    dispatch(FetchExamGroupAction());
  }, []);

  useEffect(() => {
    if (DeleteExam?.success == 1) {

    dispatch(FetchExamListAction());
    }
  }, [DeleteExam]);
  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (FetchExamList?.success == 0) {
    }
    if (FetchExamList?.success == 1) {
      let data = FetchExamList?.data;
      setdata(data);
    }

    if (Createexam?.success == 1) {
      let data = Createexam?.data;
      setdata(data);
      setVisible(false);
      dispatch(resetcreateexam());
    }
    if (FetchExamCustom?.success == 1) {
      let data = FetchExamCustom?.data;
      setdata(data);
    }
  }, [FetchExamList, Createexam, FetchExamCustom]);

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
      --data-table-library_grid-template-columns:   25% 32% 20% 23%;
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
      size: 50,
    },
    onChange: onPaginationChange,
  });
  const [visible2, setVisible2] = useState(false);

  function onPaginationChange(action, state) {}

  const [search, setSearch] = useState('');
  const [clazz, setclazz] = useState();
  const [sectionzz, setsectionzz] = useState();
  data = {
    nodes: data.nodes.filter((item) =>
      item.examgroup.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  function onPaginationChange(action, state) {}

  const [visible, setVisible] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [classes, setClass] = useState();
  const [visible6, setvisible6] = useState(false);

  const [visible3, setvisible3] = useState(false);
  const [position, setPosition] = useState('center');

   const handledeletebtn = () => {
     dispatch(DeleteExamAction(info));
    };

  const mydata = {
    session: sectionzz,
    examgroup: clazz,
  };
  function handleGetData() {
    dispatch(FetchExamCustomAction(mydata));
  }
  useEffect(() => {
    dispatch(fetchAllsessionAction());
    // dispatch(fetchAllClass());
  }, []);
  console.log(data);

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
        <NewExamModal close={setVisible} newsubject={setVisible4} />
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
      <Dialog
        visible={visible2}
        position={'top'}
        style={{ height: 'auto', width: '40%' }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
      >
        <ExamResultChoiceModal close={setVisible2} value={classes} />
      </Dialog>
      <Dialog
        visible={visible6}
        position={'top'}
        style={{ height: 'auto', width: '33%' }}
        onHide={() => {
          if (!visible6) return;
          setVisible(false);
        }}
      >
        <NewExamsModal close={setvisible6} val={val} newsubject={setVisible4} />
      </Dialog>
       <Dialog
              visible={visible3}
              position={'top'}
              style={{ height: 'auto', width: '40%' }}
              onHide={() => {
                if (!visible3) return;
                setvisible3(false);
              }}
              draggable={false}
              resizable={false}
            >
              <DeleteModal delete={handledeletebtn} close={setvisible3} />
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
                Exam List
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
            <div className=" flex w-9/12 gap-3">
              <div className="sm:w-2/5 ">
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Exam Group
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <ExamGroupSelect setsectionprop={setclazz} clazz={clazz} selectinfo={setSelectedInfo}/>
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
                  className="mb-1 block text-sm font-medium  dark:text-black"
                  htmlFor=""
                >
                  .{' '}
                </label>
                <div className="sm:w-1/5 flex gap-2">
                  <div className="relative  z-20 bg-white dark:bg-form-input">
                    <button
                      onClick={() => handleGetData()}
                      className="btn h-10    flex justify-center rounded  bg-black py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                  <div className="relative  z-20 bg-white dark:bg-form-input">
                    <button
                      onClick={() => {
                        setdata(FetchExamList?.data);
                      }}
                      className="btn h-10    flex justify-center rounded  bg-black py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      &#10227;
                    </button>
                  </div>
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
            <div className={' w-3/12 flex flex-col '}>
              <div className="flex justify-between align-middle ">
                <label
                  className=" w-2/2  block text-sm font-medium text-black dark:text-white"
                  htmlFor=" "
                >
                  Search By Class{' '}
                </label>
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
                      <HeaderRow className="dark:bg-meta-4 dark:text-white flex  ">
                        <HeaderCell>Class/Section</HeaderCell>

                        <HeaderCell>Exam Group/Session</HeaderCell>
                        <HeaderCell>Subject</HeaderCell>

                        {/* <HeaderCell>Created By</HeaderCell> */}
                        <HeaderCell>Action</HeaderCell>
                      </HeaderRow>
                    </Header>


                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                      {tableList?.map((item) => (
                        <Row key={item.id}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
                          
                          >
                          <Cell className="  ">
                            {item.class}{' '}
                            {item.section == '-' ? '' : ` /  ${item.section}`}
                          </Cell>
                          <Cell className="  ">
                            {item.examgroup}
                            {' / '} {item.session}
                          </Cell>

                          <Cell className="  ">{item.subject}</Cell>

                          {/* <Cell className="  ">{item.createdby }</Cell> */}

                          <Cell>
                            <div className="gap-1 flex">
                              <TableBtn
                                clickFunction={() => {
                                  setClass(item);
                                  setVisible2(true);

                                  navigate('/exam/viewresult', {
                                    state: {
                                      action: 1,
                                      value: item,
                                      chosensubject: item.subject,
                                      examgroup: item.examgroup,
                                      session: item.session,
                                      createdat: item.createdat,
                                      createdby: item.createdby,
                                      examid: item.code,
                                    },
                                  });
                                }}
                                text={'View Result'}
                                color={'bg-primary'}
                              />
                              <TableBtn
                                  clickFunction={() => {
                                    setvisible6(true);
                                
                                    setVal1(item);

                                    navigate("/exam/editresultalt", {
                                      state: { action: 1, value: item},
                                    });


                                  }}
                                  text={'Update'}
                                  color={'bg-primary'}
                                />
                                 <TableBtn
                                  clickFunction={() => {
                                    setvisible3(true);
                                
                                    setinfo(item);



                                  }}
                                  text={'Delete'}
                                  color={'bg-danger'}
                                />
                              {/* <ViewSVG
                                clickFunction={() => item.amount == null ?"" : handleViewbtn(item.title)}
                              /> */}
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
                      values={[ 50, 100, 200, 500, 'All']}
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

export default ExamList;
