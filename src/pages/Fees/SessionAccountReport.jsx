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
  CreatesClassAction,
  deleteSingleClassAction,
  fetchAllClassAction,
  fetchAllClassNoAction,
  FetchClassWithSectionAction,
  fetchSingleClassAction,
  resetcreateClass,
  resetgetclass,
} from '../../redux/slices/classSlice';
import ClassCheckbox from '../../components/ClassCheckbox';
import SectionModal from '../../components/SectionModal';
import { Dialog } from 'primereact/dialog';
import DeleteModal from '../../components/DeleteModal';
import Loader from '../../common/Loader';
import DeleteSVG from '../../components/Svgs/delete';
import EditSVG from '../../components/Svgs/edit';
import ViewSVG from '../../components/Svgs/View';
import DefaultLayout from '../../layout/DefaultLayout';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import TableBtn from '../../components/Svgs/TableBtn';
import { fetchfeespaidbysessionAction, resetfetchfeespaid, resetSessionAcctReport, resetSessionAcctReportAction } from '../../redux/slices/feeSlice';
import AccountDetails from '../../components/AccountDetails';

const SessionAccountReport = () => {
  const [pagesval, setpagesval] = useState(30);
  const [change, setChange] = useState();

  const [loader, setLoader] = useState(true);

  const [propdata, setpropdata] = useState('');

  const [sections, setsections] = useState([]);

  const [nodes, setdata] = useState([]);
  const [data1, setdata1] = useState('');
  const [data2, setdata2] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clad = useSelector((state) => state?.classes);

  const fee = useSelector((state) => state?.fees);
  const { SessionAcctReport,fetchfeespaid } = fee;
  const {
    fetchAllClassloading,
    fetchAllClassNo,
    sectionloading,
    fetchSection,
    fetchAllClass,
    CreateClasses,
    CreateClassesloading,
    ClassWithSection,
  } = clad;

  useEffect(() => {
    dispatch(fetchAllClassAction());
    // dispatch(fetchAllClassNoAction());
  }, []);
  useEffect(() => {
    if (fetchSection?.success == 1) {
      let data = fetchSection?.data;
      setsections(data);
    }
  }, [change, fetchAllClassloading, CreateClassesloading]);

  useEffect(() => {
    if (CreateClasses?.success == 1) {
      dispatch(resetSessionAcctReportAction());
      // dispatch(fetchAllClassAction())
    }
  }, [SessionAcctReport]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (SessionAcctReport?.success == 1) {
      let data = SessionAcctReport?.data;
      let data2 = SessionAcctReport?.info;
      let data1 = SessionAcctReport?.data1;

      setdata(data);
      setdata1(data1);
      setdata2(data2);
      dispatch(resetSessionAcctReport())
    }


  }, [SessionAcctReport]);

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
      --data-table-library_grid-template-columns:  50%  13% 13% 13% 11%;
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
    dispatch(
      fetchSingleClassAction({
        classId: value.classId,
        classTitle: value.title,
      }),
    );
    navigate('/academics/class/editclass', {
      state: { action: 1, value: value },
    });
  };

 


  

  useEffect(() => {

    if (fetchfeespaid?.success == 1) {
      let data = fetchfeespaid?.data;
      setpropdata(data)
      setVisible2(true)
      dispatch(resetfetchfeespaid())
    }
  }, [fetchfeespaid]);

  const [del, setDel] = useState();
  const handledeletbtn = () => {
    dispatch(deleteSingleClassAction(del));
    // dispatch(fetchAllClassAction());
  };
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [position, setPosition] = useState('center');
  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  const user = useSelector((state) => state?.user);

 
 
  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(`All-Classes-List`);
  };

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `All-Classes-List`,
  });

  const handleDownloadCSV = async () => {
    const csv = generateCsv(csvConfig)(nodes);
    download(csvConfig)(csv);
  };

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
        <SectionModal
          close={setVisible}
          changeval={change}
          change={setChange}
        />
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
        <DeleteModal delete={handledeletbtn} close={setVisible1} />
      </Dialog>
      <Dialog
        visible={visible2}
        position={'top-right'}
        style={{ height: 'auto', width: '80%', }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
        draggable={false}
        resizable={false}
      >
        <AccountDetails data={propdata} close={setVisible2} />
      </Dialog>
      <div className={'flex row gap-3  w-full'}>
        {/* <div className="grid w-4/12  gap-8">
          
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add New Class
                </h3>
              </div>
              <div className="py-3 px-3">
                <form action="#">
                  <div className="w-full mb-2 sm:w-2/2">
                    <label
                      className="mb-1 block text-sm font-small text-black dark:text-white"
                      htmlFor=""
                    >
                      Class Name
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue=""
                      onChange={(e) => setClassTitle(e.target.value.trim())}
                    />
                  </div>

                  <div className="w-full sm:w-2/2">
                    <label
                      className="mb-1 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Class Instructor{' '}
                      <span className="small-font">(optional)</span>
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue=""
                      onChange={(e) => setClassInstructor(e.target.value.trim())}
                    />
                  </div>

                  <div className="pb-2 mt-2">
                    <div className="flex my-5 justify-between align-middle">
                      <label className=" block text-sm py-1 align-middle font-medium text-black dark:text-white">
                        Class Sections
                      </label>
                      <button
                        className="flex w-6/12 justify-center rounded-sm  bg-primary py-1  px-1 font-[6px] text-muted hover:bg-opacity-90"
                        type=""
                        onClick={(e) => {
                          e.preventDefault()
                          // handlecreateClass();
                          show('top-right');
                        }}
                      >
                        Create New Section
                      </button>
                    </div>
                    {fetchSection?.data?.map((item) => (
                      <div key={item.id} className="mb- flex gap-2   sm:flex-row">
                         <ClassCheckbox
                          updatesection={() => updatesection(item.sectionName)}
                          item={item}
                        />
                        <div className=" flex  sm:w-full">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor="checkboxLabelOne"
                          >
                            {item.sectionName}{' '}
                          </label>
                        </div>

                       
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-53gap-4.5">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        handlecreateClass();
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
          
        </div> */}
        <div className="w-full  flex-col">
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  Session Account Report
                </h3>

                <div className="gap-3 flex py-4">
                  <label
                    className=" block text-sm font-medium text-ash dark:text-white"
                    // style={{ color: '#A9B5B3' }}
                    onClick={(e) => {
                      handleDownloadPdf();
                    }}
                  >
                    Download (PDF)
                  </label>

                  <label
                    className=" block text-sm font-medium text-ash dark:text-white"
                    // style={{ color: '#A9B5B3' }}
                    onClick={(e) => {
                      handleDownloadCSV();
                    }}
                  >
                    Download (Excel)
                  </label>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between ">
                <div className=" w-8/12">
                  <div className="flex">
                    <label
                      className=" block w-4/12 text-sm font-medium text-ash dark:text-white"
                      // style={{ color: '#A9B5B3' }}
                    >
                      Session Account Report
                    </label>

                    <label
                      className=" block w-4/12 text-sm font-medium text-ash dark:text-white"
                      // style={{ color: '#A9B5B3' }}
                    >
                     {data1 == undefined ? 'Loading' : data1}
                    </label>
                  </div>
                  <div className="flex">
                    <label
                      className=" block w-4/12 text-sm font-medium text-ash dark:text-white"
                      // style={{ color: '#A9B5B3' }}
                    >
                      Total Fees Collected
                    </label>

                    <label
                      className=" block w-7/12 text-sm font-medium text-ash dark:text-white"
                      // style={{ color: '#A9B5B3' }}
                    >
                     {data2[0]?.paid} {' '} GHS
                    </label>
                  </div>

                  <div className="flex">
                    <label
                      className=" block w-4/12 text-sm font-medium text-ash dark:text-white"
                      // style={{ color: '#A9B5B3' }}
                    >
                     Session Total Arrears
                    </label>
                    <label
                      className=" block w-7/12 text-sm font-medium text-ash dark:text-white"
                      // style={{ color: '#A9B5B3' }}
                    >
                     {data2[0]?.balance} {' '} GHS
                     </label>
                  </div>
                  <div className="flex">
                    <label
                      className=" block w-4/12 text-sm font-medium text-ash dark:text-white"
                      // style={{ color: '#A9B5B3' }}
                    >
                     Previous Session Arrears
                    </label>
                    <label
                      className=" block w-7/12 text-sm font-medium text-ash dark:text-white"
                      // style={{ color: '#A9B5B3' }}
                    >
                     {data2[0]?.arrears} {' '} GHS
                     </label>
                  </div>

                  <div className="flex">
                    <label
                      className=" block w-4/12 text-sm font-medium text-ash dark:text-white"
                      // style={{ color: '#A9B5B3' }}
                    >
                      Account Closed By
                    </label>
                    <label
                      className=" block w-7/12 text-sm font-medium text-ash dark:text-white"
                      // style={{ color: '#A9B5B3' }}
                    >
                     {data2[0]?.createdby}
                     </label>
                  </div>

                  <div className="flex">
                    <label
                      className=" block w-4/12 text-sm font-medium text-ash dark:text-white"
                      // style={{ color: '#A9B5B3' }}
                    >
                      Account Closure Date
                    </label>
                    <label
                      className=" block w-7/12 text-sm font-medium text-ash dark:text-white"
                      // style={{ color: '#A9B5B3' }}
                    >
                     {data2[0]?.date} 
                     </label>
                  </div>

                  <div className=" flex gap-3"></div>
                </div>

                <div className={' w-4/12 flex flex-col float-right '}>
                  <div className="flex justify-between align-middle mb-2">
                    <label
                      className=" w-2/2 pt-2 block text-sm font-medium text-black dark:text-white"
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
                          <HeaderCell>Balance BF</HeaderCell>
                          <HeaderCell>Fees Collected</HeaderCell>
                          <HeaderCell>Balance CF</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:border-strokedark dark:dark:bg-form-input  text-black  border-stroke bg-white dark:text-white flex "
                          >
                            <Cell className="  ">{item.class}</Cell>
                            <Cell className="  ">{item.arrears}</Cell>
                            <Cell className="  ">{item.paid}</Cell>
                            <Cell className="  ">{item.balance}</Cell>

                            {/* <Cell className="  ">{item.section ? item.section : '-'}</Cell> */}

                            <Cell>
                              <div className="gap-2 flex">
                                <TableBtn
                                  clickFunction={() => {
                                    dispatch(fetchfeespaidbysessionAction({'class':item?.class, 'session': data1}));

                                  }}
                                  text={' View Details '}
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
                >
                   {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex  ">
                          <HeaderCell>Class</HeaderCell>
                          <HeaderCell>Balance BF</HeaderCell>
                          <HeaderCell>Fees Collected</HeaderCell>
                          <HeaderCell>Balance CF</HeaderCell>

                        </HeaderRow>
                      </Header>

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:border-strokedark dark:dark:bg-form-input  text-black  border-stroke bg-white dark:text-white flex "
                          >
                            <Cell className="  ">{item.class}</Cell>
                            <Cell className="  ">{item.arrears}</Cell>
                            <Cell className="  ">{item.paid}</Cell>
                            <Cell className="  ">{item.balance}</Cell>

                            {/* <Cell className="  ">{item.section ? item.section : '-'}</Cell> */}

                           
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
      </div>{' '}
    </DefaultLayout>
  );
};

export default SessionAccountReport;
