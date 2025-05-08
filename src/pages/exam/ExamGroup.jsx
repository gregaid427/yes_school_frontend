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
import {
  CreateExamGroupAction,
  DeleteCartecoryAction,
  FetchExamGroupAction,
  resetcreategroup,
  resetExamCart,
} from '../../redux/slices/examSlice';
import { fetchAllsessionAction } from '../../redux/slices/sessionSlice';
import { Dialog } from 'primereact/dialog';
import NewExamsModal from '../../components/NewExamsModal';
import ExamCartegoryModal from '../../components/ExamCartegoryModal';
import DeleteModal from '../../components/DeleteModal';

const ExamGroup = () => {
  const [pagesval, setpagesval] = useState(30);
  const [loader, setLoader] = useState(true);

  const [sessionoption, setSessionoption] = useState('');

  const [name, setname] = useState('');
  const [del, setDel] = useState();

  const [nodes, setdata] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const exam = useSelector((state) => state?.exam);
  const { examgroup, createxamgroup, UpdateExamCartegory,DeleteCartecory } = exam;

  useEffect(() => {
    dispatch(FetchExamGroupAction());
    dispatch(fetchAllsessionAction());
  }, []);

  useEffect(() => {
    if (UpdateExamCartegory?.success == 0) {
    }
    if (UpdateExamCartegory?.success == 1) {
      setVisible(false);

      dispatch(resetExamCart());
    }
  }, [UpdateExamCartegory]);

  useEffect(() => {
    if (DeleteCartecory?.success == 0) {
    }
    if (DeleteCartecory?.success == 1) {
      setVisible1(false);
    }
  }, [DeleteCartecory]);

  useEffect(() => {
    if (createxamgroup?.success == 0) {
      dispatch(resetcreategroup());
    }
    if (createxamgroup?.success == 1) {
      let data = createxamgroup?.data;
      setdata(data);
      dispatch(resetcreategroup());
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
  --data-table-library_grid-template-columns:  70%   30%;
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
    setVisible(true);
    setVal(value);
  };
  const handledeletebtn = (value) => {
   dispatch(DeleteCartecoryAction({id:del}));
  };
  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;
  const subdata = {
    // session: sessionoption,
    title: name.toUpperCase(),
    createdby: username?.payload,
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
  const [visible1, setVisible1] = useState(false);
  const [visible, setVisible] = useState(false);
  const [val, setVal] = useState('Loading...');
  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '30%' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <ExamCartegoryModal close={setVisible} val={val} />
      </Dialog>
      <Dialog
        visible={visible1}
        position={'top'}
        style={{ height: 'auto', width: '40%' }}
        onHide={() => {
          if (!visible1) return;
          setVisible1(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DeleteModal delete={handledeletebtn} close={setVisible1} />
      </Dialog>
      <div className={'flex gap-2 w-full'}>
        <div className=" w-4/12  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add New Cartegory
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="w-full mb-10 ">
                    <label
                      className="mb-1 block text-sm font-small text-black dark:text-white"
                      htmlFor=""
                    >
                      Cartegory Title
                    </label>
                    <input
                      className="w-full uppercase rounded border  border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder="END OF TERM EXamination"
                      defaultValue=""
                      onChange={(e) => setname(e.target.value.trim())}
                    />
                  </div>
                  {/* <div className="w-full mb-4 sm:w-2/2">
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
      </div> */}

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
                  Cartegory List
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
             // style={{ color: '#A9B5B3' }}
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
             // style={{ color: '#A9B5B3' }}
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
                      setSearch(e.target.value.trim());
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
                <Table
                  data={data}
                  pagination={pagination}
                  layout={{ custom: true }}
                  theme={theme}
                >
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex ">
                          <HeaderCell>Title</HeaderCell>
                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
                          >
                            <Cell className="  ">{item.grouptitle}</Cell>

                            <Cell>
                              <div className="gap-2 flex">
                                <EditSVG
                                  clickFunction={() => handleEditbtn(item)}
                                />

                                <DeleteSVG
                                  clickFunction={() => {
                                    setDel(item.id);
                                    setVisible1(true);
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

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
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

{
  /* <div className="grid  w-4/12  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
<div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
  <h3 className="font-medium text-black dark:text-white">
    Add Exam Cartegory
  </h3>
</div>

</div> */
}
