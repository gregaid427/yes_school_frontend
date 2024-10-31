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
import { fetchAllsessionAction } from '../../redux/slices/sessionSlice';
import {
  fetchAllfeeAssignRecordAction,
  fetchfeeAssignGroupRecordAction,
  fetchfeeAssignRecordAction,
  fetchfeeCartegoryAction,
} from '../../redux/slices/feeSlice';
import AssignFeeModal from '../../components/AssignFeeModal';
import AssignFeeModalClass from '../../components/AssignFeeModalClass';
import AssignFeeModalPartial from '../../components/AssignFeeModalPartial';
import ExamGradeModal from '../../components/ExamGradeModal';
import {
  FetchGradeGroupAction,
  GetgradegroupAction,
  resetcreateGetGradeGroup,
  resetcreateGradeGroup,
} from '../../redux/slices/examSlice';
import ExamGradeEditModal from '../../components/ExamGradeEditModal';

const ExamGrade = () => {
  const formRef1 = useRef();
  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
    console.log('reset');
  }

  const exam = useSelector((state) => state?.exam);
  const { Gradegroup, fetchGradegroup, Getgradegroup ,UpdateGradeGroup} = exam;
  const fee = useSelector((state) => state?.fees);

  const [pagesval, setpagesval] = useState(30);
  const [classs, setClass] = useState();

  const [loader, setLoader] = useState(true);

  const [classname, setclasname] = useState('');
  const [sectionname, setsectionname] = useState('');

  const [classTitle, setClassTitle] = useState('');
  const [classInstructor, setClassInstructor] = useState('');

  const [nodes, setdata] = useState([]);
  const [datacart, setdatacart] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clad = useSelector((state) => state?.classes);

  useEffect(() => {
    dispatch(FetchGradeGroupAction());
    // dispatch(FetchAllGradeGroupAction());
  }, []);

  useEffect(() => {
    if (fetchGradegroup?.success == 0) {
    }
    if (fetchGradegroup?.success == 1) {
      let data = fetchGradegroup?.data;
      setdata(data);
      console.log(data);
    }
  }, [fetchGradegroup]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (Gradegroup?.success == 1) {
      let data = Gradegroup?.data;
      console.log('response')

      console.log(data)
      setdata(data);
      setVisible(false);
      dispatch(resetcreateGradeGroup());
    }
    if (UpdateGradeGroup?.success == 1) {
   
      setVisible1(false);
    }
  }, [Gradegroup,UpdateGradeGroup]);

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
      --data-table-library_grid-template-columns:  40% 15%  15% 15%  15%;
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
  const [visible1, setVisible1] = useState(false);

  function onPaginationChange(action, state) {}

  const [search, setSearch] = useState('');

  data = {
    nodes: data.nodes.filter((item) =>
      item.gradetitle.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  function onPaginationChange(action, state) {}

  const handleViewbtn = (value) => {
    console.log(value)
    dispatch(GetgradegroupAction({ code: value?.gradecode }));
  };
  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (Getgradegroup?.success == 1) {
      let data = Getgradegroup?.data;
      console.log(data)
      setClass(data);
      setVisible1(true);
      dispatch(resetcreateGetGradeGroup());
    }
  }, [Getgradegroup]);
  const handleEditbtn = (value) => {
    setVisible1(true);
  };

  const [visible, setVisible] = useState(false);

  const [position, setPosition] = useState('center');

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '65%' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <ExamGradeModal close={setVisible} />
      </Dialog>
      <Dialog
        visible={visible1}
        position={'top'}
        style={{ height: 'auto', width: '65%' }}
        onHide={() => {
          if (!visible1) return;
          setVisible1(false);
        }}
      >
        <ExamGradeEditModal close={setVisible1} info={classs} />
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
                Marks Grading List
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
            <div className=" flex w-9/12 justify-between gap-4">
              <div className=" ">
                <button
                  className="flex  justify-center rounded bg-primary py-2 px-5 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={() => {
                    show('top-right');
                  }}
                >
                  Add Grading Group
                </button>
              </div>
            </div>
            <div className={' w-3/12 flex flex-col '}>
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
                      <HeaderRow className="dark:bg-meta-4 dark:text-white flex  ">
                        <HeaderCell>Title</HeaderCell>

                        <HeaderCell>Exam Score %</HeaderCell>

                        <HeaderCell>Class Score %</HeaderCell>
                        <HeaderCell>Other Score %</HeaderCell>

                        {/* <HeaderCell>Created By</HeaderCell> */}
                        <HeaderCell>Action</HeaderCell>
                      </HeaderRow>
                    </Header>


                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                      {tableList.map((item) => (
                        <Row key={item.gradeid}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
                          
                          >
                          <Cell className="  ">{item.gradetitle}</Cell>

                          <Cell className="  ">{item.exampercent + ' %'}</Cell>

                          <Cell className="  ">
                            {item.classworkpercent + ' %'}
                          </Cell>
                          <Cell className="  ">
                            {item.otherscorepercent + ' %'}
                          </Cell>

                          {/* <Cell className="  ">{item.createdby }</Cell> */}

                          <Cell>
                            <div className="gap-1 flex">
                              <TableBtn
                                clickFunction={() => {
                                  handleViewbtn(item);
                                }}
                                text={' View/Edit '}
                                color={'bg-primary'}
                              />
                              {/* <ViewSVG
                                clickFunction={() => item.amount == null ?"" : handleViewbtn(item.title)}
                              /> */}

                              <DeleteSVG
                              // clickFunction={() => handleViewbtn(item)}
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
                        <HeaderCell>Class</HeaderCell>
                        {/* <HeaderCell>Instructor</HeaderCell> */}
                      </HeaderRow>
                    </Header>


                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                      {tableList.map((item) => (
                        <Row
                          key={item.gradeid}
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
    </DefaultLayout>
  );
};

export default ExamGrade;
