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

import ActiveSVG from '../components/Svgs/active';
import {
  createsessionAction,
  deletesessionByIdAction,
  fetchActivesessionAction,
  fetchAllsessionAction,
  resetcreatesession,
  resetUpdatesession,
  updatesessionStatusAction,
} from '../redux/slices/sessionSlice';
import SessionSelect from '../components/SessionSelect';
import { Dialog } from 'primereact/dialog';
import SetSessionAlert from '../components/SetSessionAlert';
import DeleteModal from '../components/DeleteModal';
import SessionModal from '../components/SessionModal';
import SessionSelect1 from '../components/SessionSelect1';
import ActiveSVG1 from '../components/Svgs/active1';

const Session = () => {
  const [visible, setVisible] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);

  const [del, setDel] = useState({});

  const session = useSelector((state) => state?.session);

  const { fetchsession, createsession,updatesession,fetchsessionactive } = session;
  const [sessionoption, setSessionoption] = useState('None');

  const [position, setPosition] = useState('center');
  const show = (position) => {
    setPosition(position);
  //  setVisible(true);
  };
  
  const [isChecked, setIsChecked] = useState(false);
  const [yes, setYes] = useState(undefined);
  const [pagesval, setpagesval] = useState(30);
  const [classs, setClasss] = useState([]);
  const [startmonth, setStartMonth] = useState('January');

  const [loader, setLoader] = useState(true);

  const [isChecked1, setIsChecked1] = useState(false);
  const [sectionTitle, setsectionTitle] = useState('');
  const [classInstructor, setClassInstructor] = useState('');

  const [sections, setsections] = useState([]);

  const [nodes, setdata] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAllsessionAction());
   // dispatch(fetchActivesessionAction());
  }, []);

  // useEffect(() => {
  //   if (fetchSection?.success == 1) {
  //     let arrr = [{"name":'None',"id":0}];
  //     let i = 0;
  //     while (i < clad?.fetchSection?.data.length) {
  //       arrr.push({"name":clad?.fetchSection?.data[i]?.sectionName,"id":clad?.fetchSection?.data[i]?.id});
  //       i++;
  //     }

  //     setsections(arrr);
  //   }
  // }, [sectionloading]);


  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchsession?.success == 1) {
      let data = fetchsession?.data;
      setdata(data);
      setVisible4(false)
      
    }
    // if (loading == false) {
    //   dispatch(fetchBulkStudent());
    // }

    // }
    // datas = data;
  }, [fetchsession]);

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
  console.log(data.nodes)

  data = {
    nodes: data.nodes.filter((item) =>
      item.sessionname.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  function onPaginationChange(action, state) {}

  const handleEditbtn = (value) => {
    navigate('/academics/section/edit', {
      state: { sectionName: value.sectionName, sectionId: value.id },
    });
  };
  const handledeletebtn = () => {
    console.log
    dispatch(deletesessionByIdAction(del));
  };
  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;
  const classdata = {
    sessionname: sectionTitle.toUpperCase(),
    createdby: username?.payload,
    active: isChecked,
    startmonth: startmonth.toUpperCase(),
  };

  const handlecreateSection = (e) => {
    if (sectionTitle == '') {
      toast.error('Error - Section Name Cannot Be Empty');
    } else {
      dispatch(createsessionAction(classdata));
    }
  };

  const handleSetsession = () => {
    const data = {
      session: sessionoption,
      startmonth: startmonth.toUpperCase(),
    };
    console.log(sessionoption)
    if(sessionoption == 'None'){
      return toast.error('Select a Session');

    }
    else{
      dispatch(updatesessionStatusAction(data));

    }


  };

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
        style={{ height: 'auto', width: '50%' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      >
        <SetSessionAlert setYes={setYes} yes={yes} close={setVisible} />
      </Dialog>
      <Dialog
        visible={visible5}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible5) return;
          setVisible5(false);
        }}
        draggable={false}
        resizable={false}
      >
        <SessionModal  close={setVisible5} openModal={setVisible5}/>
      </Dialog>
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
        <DeleteModal delete={handledeletebtn} close={setVisible4}   />
      </Dialog>
      <div className='flex gap-1'>
      <div className="w-3/12  ">
         
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Set Current Session
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
                          Session
                        </label>

                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <SessionSelect1 setsectionprop={setSessionoption}  selectinfo={setSelectedInfo}/>
                        </div>
                      </div>
                      <div className="w-full ">
                        <label
                          className="mb-2 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Session Start Month
                        </label>

                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <SelectGroupTwo
                            values={[
                              'January',
                              'February',
                              'March',
                              'April',
                              'May',
                              'June',
                              'July',
                              'August',
                              'September',
                              'October',
                              'November',
                              'December',
                            ]}
                            setSelectedOption={setStartMonth}
                            selectedOption={startmonth}
                          />
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
                       
                        handleSetsession()
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
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  All Sessions
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
                      Download (PDF)
                    </label>

                    <button
                      className="flex w- my-2 justify-center rounded bg-primary py-2 w-full font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                       
                        setVisible5(true)
                      }}
                    >
                      Add New Session
                    </button>
                  </div>

                  <div className="w-full sm:w-2/5">
                    <label
                      className="pt-2 block text-sm font-medium text-ash dark:text-white"
             // style={{ color: '#A9B5B3' }}
                      onClick={(e) => {
                        handleDownloadCSV();
                      }}
                    >
                      Download (Excel)
                    </label>
                  </div>
                </div>

                <div className={' w-5/12 flex flex-col float-right '}>
                  <div className="flex justify-between align-middle mb-2">
                    <label
                      className=" w-2/2 pt-2 block text-sm font-medium text-black dark:text-white"
                      htmlFor=" "
                    >
                      Search Sessions{' '}
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
                <Table data={data} pagination={pagination} theme={theme}>
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex  ">
                          <HeaderCell>Session</HeaderCell>
                          <HeaderCell>Account ID</HeaderCell>

                          <HeaderCell>Status</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

  
                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
                          <Row key={item.id}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
                          
                          >
                            <Cell className="  ">{item.sessionname}</Cell>
                            <Cell className="  ">{item.sessionaccountid}</Cell>

                            <Cell className="  ">
                              {item.active == 'true' ? <ActiveSVG1 /> : ''}
                            </Cell>

                            <Cell>
                              <div className="gap-2 flex">
                                <EditSVG
                                  clickFunction={() => handleEditbtn(item)}
                                />

                                <DeleteSVG
                                  clickFunction={() =>{
                                    setDel({id:item.id, code: item.sessioncode})
                                    setVisible4(true)
                                  } }
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

export default Session;
