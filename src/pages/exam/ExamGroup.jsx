import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
import { mkConfig, generateCsv, download } from 'export-to-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import toast from 'react-hot-toast';
import {
  CreatesSubjectAction,
  DeleteSingleSubjectAction,
  fetchSubjectAction,
  resetcreatesubject,
} from '../../redux/slices/subjectSlice';
import SessionSelect from '../../components/SessionSelect';
import EditSVG from '../../components/Svgs/edit';
import DeleteSVG from '../../components/Svgs/delete';
import Loader from '../../common/Loader';
import DefaultLayout from '../../layout/DefaultLayout';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import { CreateExamGroupAction, FetchExamGroupAction, resetcreategroup } from '../../redux/slices/ExamSlice';
import { fetchAllsessionAction } from '../../redux/slices/sessionSlice';

const ExamGroup = () => {
  const [pagesval, setpagesval] = useState(30);
  const [loader, setLoader] = useState(true);

  const [sessionoption, setSessionoption] = useState('');

  const [name, setname] = useState('');

  const [nodes, setdata] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const exam = useSelector((state) => state?.exam);
  const {examgroup,createxamgroup  } = exam;


  useEffect(() => {
    dispatch(FetchExamGroupAction());
    dispatch(fetchAllsessionAction());

  }, []);

 

  useEffect(() => {
    if (createxamgroup?.success == 0) {
      dispatch(resetcreategroup());
    }
    if (createxamgroup?.success == 1) {
      dispatch(resetcreategroup());
      let data = examgroup?.data;
      setdata(data);

    }
  }, [createxamgroup]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (examgroup?.success == 1) {
      let data = examgroup?.data;
      setdata(data);
    }

  }, [examgroup]);

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
  --data-table-library_grid-template-columns:  45% 30%  25%;
`,
      BaseCell: `
        font-size: 15px;
        color:white;
      //   border-bottom: 1px solid #313D4A !important;
      //   //  background-color: #24303F;

      `,
      Row: `
  &:nth-of-type(odd) {
    background-color: #24303F;
  }

  &:nth-of-type(even) {
    background-color: #202B38;
  }
`,
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
  console.log(data);
  data = {
    nodes: data.nodes.filter((item) =>
      item.grouptitle.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  function onPaginationChange(action, state) {}

  const handleEditbtn = (value) => {
    navigate('/academics/subject/editsubject', {
      state: { info: value },
    });
  };
  const handledeletebtn = (value) => {
    dispatch(DeleteSingleSubjectAction(value));
  };

  const subdata = {
    session: sessionoption,
    title: name,
    createdby: 'Asante',
  };
  const handlecreateSection = (e) => {
    if (name == '') {
      toast.error('Error - Title Cannot Be Empty');
    } else {
      dispatch(CreateExamGroupAction(subdata));
    }
  };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(`All-Subject-List`);
  };

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `All-Subject-List`,
  });

  const handleDownloadCSV = async () => {
    const csv = generateCsv(csvConfig)(nodes);
    download(csvConfig)(csv);
  };

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div className={'flex gap-2 w-full'}>
        <div className="flex w-4/12 gap-8">
          <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Exam Group
              </h3>
            </div>
            <div className="p-7">
              <form action="#">
                <div className="w-full mb-2 ">
                  <label
                    className="mb-1 block text-sm font-small text-black dark:text-white"
                    htmlFor=""
                  >
                    Group Title
                  </label>
                  <input
                    className="w-full rounded border uppercase border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    defaultValue=""
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="w-full mb-4 sm:w-2/2">
                    <div className=" flex gap-2 ">
                      <div className="w-full mb-1 sm:w-full">
                        <label
                          className="mb-1 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Session
                        </label>

                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <SessionSelect setsectionprop={setSessionoption} />
                        </div>
                      </div>
                
                    </div>
                  </div>
                

                <div className="flex justify-end  gap-4.5">
                  <button
                    className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      handlecreateSection();
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="reset"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-8/12 flex-col">
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  Groups List
                </h3>
              </div>
            </div>
          </div>
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between ">
                <div className=" flex w-7/12 gap-3">
                  <div className="sm:w-2/5 ">
                    <label
                      className="pt-2 block text-sm font-medium text-ash dark:text-white"
                      style={{ color: '#A9B5B3' }}
                      onClick={(e) => {
                        handleDownloadPdf();
                      }}
                    >
                      Download Page (PDF)
                    </label>
                  </div>

                  <div className="w-full sm:w-2/5">
                    <label
                      className="pt-2 block text-sm font-medium text-ash dark:text-white"
                      style={{ color: '#A9B5B3' }}
                      onClick={(e) => {
                        handleDownloadCSV();
                      }}
                    >
                      Download Page (Excel)
                    </label>
                  </div>
                </div>

                <div className={' w-5/12 flex flex-col float-right '}>
                  <div className="flex justify-between align-middle mb-2">
                    <label
                      className=" w-2/2 pt-2 block text-sm font-medium text-black dark:text-white"
                      htmlFor=" "
                    >
                      Search Subject{' '}
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
          </div>
          <div
            className={
              'rounded-sm  w-full border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
            }
          >
            <div className="flex gap-3  flex-col">
              <div className="px-2">
                <Table data={data} pagination={pagination} layout={{ custom: true }} theme={theme}>
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex ">
                          <HeaderCell>Title</HeaderCell>

                          <HeaderCell>Session</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>

                        </HeaderRow>
                      </Header>

                      <Body>
                        {tableList.map((item) => (
                          <Row key={item.id} item={item} className=" ">
                            <Cell className="  ">{item.grouptitle}</Cell>

                            <Cell className="  ">{item.session}</Cell>


                            <Cell>
                              <div className="gap-2 flex">
                                <EditSVG
                                  clickFunction={() => handleEditbtn(item)}
                                />

                                <DeleteSVG
                                  clickFunction={() => handledeletebtn(item.id)}
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
                  layout={{ custom: true }}
                >
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex ">
                          <HeaderCell>Subject</HeaderCell>

                          <HeaderCell>Type</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body>
                        {tableList.map((item) => (
                          <Row
                            key={item?.id}
                            item={item}
                            className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
                          >
                            <Cell className="  ">{item?.subjectname}</Cell>

                            <Cell className="  ">{item?.type}</Cell>
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

export default ExamGroup;