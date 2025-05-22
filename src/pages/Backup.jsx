import { useEffect, useRef, useState } from 'react';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';
import ViewSVG from '../components/Svgs/View';
import DeleteSVG from '../components/Svgs/delete';
import EditSVG from '../components/Svgs/edit';
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

import Loader from '../common/Loader';
import toast from 'react-hot-toast';

import {
  createBackupAction,
  deleteAllBackupAction,
  deletesessionByIdAction,
  GetBackupAction,
  GetBackupFile,
  resetcreateBackup,
  updateBackupAction,
  updatesessionStatusAction,
} from '../redux/slices/sessionSlice';
import { Dialog } from 'primereact/dialog';

import DeleteModal from '../components/DeleteModal';

import ActiveSVG1 from '../components/Svgs/active1';
import TableBtn from '../components/Svgs/TableBtn';

const Backup = () => {
  const [visible, setVisible] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);

  const [del, setDel] = useState({});

  const [email, setEmail] = useState();

  const [position, setPosition] = useState('center');
  const show = (position) => {
    setPosition(position);
    //  setVisible(true);
  };

  const user = useSelector((state) => state?.user);
  const { username, userMail, allschool } = user;
  const [pagesval, setpagesval] = useState(30);

  const [mode, setmode] = useState('Auto');
  const [duration, setDuration] = useState('Monthly');

  const [loader, setLoader] = useState(false);

  const [nodes, setdata] = useState([]);
  const [result, setResult] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state?.session);

  const { createBackup,GetBackup } = session;

  useEffect(() => {
    // setTimeout(() => setLoader(false), 1000);
  
  if (GetBackup?.success == 1) {
      console.log(GetBackup)
      let data = GetBackup?.data;
      let res = GetBackup?.res;

      setdata(data);
      setResult(res);
      dispatch(resetcreateBackup())
    }
    if (GetBackup?.success == 1) {

      setDuration(GetBackup?.res[0]?.duration == undefined ? duration : GetBackup?.res[0]?.duration);
      setmode(GetBackup?.res[0]?.backupmode == undefined ? mode : GetBackup?.res[0]?.backupmode);

      setEmail(GetBackup?.res[0]?.backupemail == undefined ? email : GetBackup?.res[0]?.backupemail);
    }
  }, [GetBackup]);
  useEffect(() => {
    dispatch(GetBackupAction());
  }, []);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (createBackup?.success == 1) {
      let data = createBackup?.data;
  

      setdata(data);

      dispatch(resetcreateBackup())
    }
    // if (loading == false) {
    //   dispatch(fetchBulkStudent());
    // }

    // }
    // datas = data;
  }, [createBackup]);

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
            --data-table-library_grid-template-columns:  35% 35% 15% 15%;
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

  function onPaginationChange(action, state) {}

  const handledeletebtn = () => {
    console.log;
    dispatch(deletesessionByIdAction(del));
  };

  const handleSetsession = () => {
    const data = {
      mode: mode,
      duration: duration,
      email: email,
      by: username?.payload,
    };
    // if (sessionoption == 'None') {
    //   return toast.error('Select a Session');
    // } else {
    dispatch(updateBackupAction(data));
    // }
  };

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Dialog
        visible={visible4}
        position={'top'}
        style={{ height: 'auto', width: '40%' }}
        onHide={() => {
          if (!visible4) return;
          setVisible4(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DeleteModal delete={handledeletebtn} close={setVisible4} />
      </Dialog>
      <div className="flex gap-1">
        <div className="w-3/12  ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Back Up Configuration
              </h3>
            </div>
            <div className="p-5">
              <form action="#">
                <div className="w-full mb-4 sm:w-2/2">
                  <div className="  gap-2 ">
                    <div className="w-full mb-3 ">
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Backup Mode
                      </label>

                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <SelectGroupTwo
                          values={['Auto', 'Manual']}
                          setSelectedOption={setmode}
                          selectedOption={mode}
                        />{' '}
                      </div>
                    </div>
                    <div className={mode != 'Manual' ? 'w-full' : 'hidden'}>
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Auto Backup Duration
                      </label>

                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <SelectGroupTwo
                          values={['Monthly', 'Weekly']}
                          setSelectedOption={setDuration}
                          selectedOption={duration}
                        />
                      </div>
                    </div>

                    <div className="w-full  my-4">
                      <label
                        className=" block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Email
                      </label>
                      <input
                        className="w-full required rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={''}
                        onChange={(e) => setEmail(e.target.value.trim())}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end  gap-4.5">
                  <button
                    className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();

                      handleSetsession();
                    }}
                  >
                    Update
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
        <div className="w-9/12 flex-col">
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto mb-4">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  DB Back Up Files
                </h3>
              </div>
              <div className='flex justify-between'>
 <button
                className="flex  justify-center rounded bg-primary py-2 px-3 font-medium text-gray hover:bg-opacity-90"
                type=""
                onClick={(e) => {
                  e.preventDefault();

                  dispatch(
                    createBackupAction({
                      mode: 'Instant',
                      duration: '',
                      email: 'gregoryd427@gmail.com',
                      by: username?.payload,
                    }),
                  );
                }}
              >
                Create DB Backup
              </button>
              <button
                className="flex  justify-center rounded bg-danger py-2 px-3 font-medium text-gray hover:bg-opacity-90"
                type=""
                onClick={(e) => {
                  e.preventDefault();

                  dispatch(
                  deleteAllBackupAction()
                  );
                }}
              >
                Delete All
              </button>
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
                  theme={theme}
                  layout={{ custom: true }}
                >
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex  ">
                          <HeaderCell>File</HeaderCell>
                          <HeaderCell>Date Taken</HeaderCell>

                          <HeaderCell>Mode</HeaderCell>

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
                            <Cell className="  ">{item.file}</Cell>
                            <Cell className="  ">{item.datetaken}</Cell>

                            <Cell className="  ">{item.mode}</Cell>

                            <Cell>
                              <div className="gap-2 flex">
                                <a href={item.link}>
                                  <TableBtn
                                    clickFunction={() => {}}
                                    text={' Download '}
                                    color={'bg-primary'}
                                  />
                                </a>
                              
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
                          <HeaderCell>Session</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
                          ></Row>
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

export default Backup;
