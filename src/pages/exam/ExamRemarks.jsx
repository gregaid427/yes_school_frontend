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
import { FetchExamGroupAction } from '../../redux/slices/examSlice';
import { fetchAllsessionAction } from '../../redux/slices/sessionSlice';
import ExamResultChoiceModal from '../../components/ExamResultChoiceModal';
import ExamReportChoiceModal from '../../components/ExamReportChoiceModal';

const ExamRemarks = () => {
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
  const [displaytable, setDisplaytable] = useState(false);

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

  const { fetchAllClassNo } = clad;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
      --data-table-library_grid-template-columns:  80%   20%;
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
  const [visible6, setVisible6] = useState(false);

  useEffect(() => {
    dispatch(fetchSubjectAction());
    dispatch(FetchExamGroupAction());
    dispatch(fetchAllsessionAction());
  }, []);

  const [classdata, setClassdata] = useState([]);

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '33%' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <NewExamsModal close={setVisible} val={val} newsubject={setVisible4} />
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
        <ExamResultChoiceModal close={setVisible6} value={val1} />
      </Dialog>
      <Dialog
        visible={visible6}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible6) return;
          setVisible3(false);
        }}
      >
        <ExamReportChoiceModal close={setVisible6} info={val1} />
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
        <div className={display ? 'hidden' : 'w-8/12  flex-col'}>
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  Report Remarks
                </h3>
              </div>
            </div>
          </div>
          <div
            className={
              'rounded-sm border border-stroke bg-white px-5 pt-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
            }
          >
            <div className="w-full justify-between  flex ">
              {/* <div className=" flex w-7/12 gap-1">
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
              </div> */}
              <div></div>

              <div className={' w-5/12 flex flex-col float-end '}>
                <div className="flex justify-between align-middle  ">
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
                          <HeaderCell>Class</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                        {tableList?.map((item) => (
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] "
                          >
                            <Cell className="  ">
                              {item.title}{' '}
                              {item.section ? '(' + item.section + ')' : ''}
                            </Cell>

                            <Cell className="  ">
                              {/* {item.section ? item.section : '-'} */}
                              {/* <Cell className="  ">
                              {item?.val == (item?.section == null ? '-' : item?.section)? (
                                <TableBtn
                                  clickFunction={() => {
                                    setVisible(true);
                                    setVal(item);
                                  }}
                                  text={'Available'}
                                  color={'bg-primary'}
                                />
                              ) : (
                                <TableBtn
                                  clickFunction={() => {
                                    setVisible(true);
                                    setVal(item);
                                  }}
                                  text={'Not Available'}
                                  color={' bg-danger'}
                                />
                              )}
                            </Cell> */}

                              <div className="gap-2 flex">
                                <TableBtn
                                  clickFunction={() => {
                                    console.log('itemmmmmmmmmm');
                                    console.log(item);

                                    navigate('/exam/reportdetail', {
                                      state: { action: 1, value: item },
                                    });
                                  }}
                                  text={'Add Remarks'}
                                  color={'bg-primary'}
                                />
                                {/* <TableBtn
                                  clickFunction={() => {
                                    setVisible3(true);
                                    setVal1(item);
                                  }}
                                  text={'View Result'}
                                  color={'bg-primary'}
                                /> */}
                                {/* <TableBtn
                                  clickFunction={() => handleViewbtn(item)}
                                  text={'Select'}
                                  color={'bg-primary'}
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
                <Table data={data} pagination={pagination} theme={theme}>
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                          <HeaderCell>Class</HeaderCell>
                          {/* <HeaderCell>Instructor</HeaderCell> */}
                        </HeaderRow>
                      </Header>

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
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
      </div>
    </DefaultLayout>
  );
};

export default ExamRemarks;
