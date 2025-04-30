import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import userThree from '../images/user/user-03.png';
import DefaultLayout from '../layout/DefaultLayout';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ViewSVG from '../components/Svgs/View';
import DeleteSVG from '../components/Svgs/delete';
import EditSVG from '../components/Svgs/edit';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Dialog } from 'primereact/dialog';

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
import {
  deleteSingleStudentAction,
  fetchBulkStudent,
  fetchCustomStudentsClassAction,
  fetchSingleStudent,
  fetchStudentsClassAction,
  resetGlobalSearch,
} from '../redux/slices/studentSlice';
import Loader from '../common/Loader';
import StudentModal from '../components/StudentModal';

import SectionSelect1 from '../components/SectionsSelect1';
import ClassSelect from '../components/ClassSelect';
import { fetchUserdataAction } from '../redux/slices/usersSlice';
import ExamResultModal from '../components/ExamResultModal';
import AttendanceModal from '../components/AttendanceModal';
import DeleteModal from '../components/DeleteModal';
import { fetchAllClassAction } from '../redux/slices/classSlice';
import CollectFeesModal from '../components/collectFeesModal';
import TableBtn from '../components/Svgs/TableBtn';

const SearchPage = () => {
  ///////////////////////////////////
  const location = useLocation();

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('top');

  //////////////////////////////////////

  const [loader, setLoader] = useState(true);

  const [searchval, setSearchval] = useState('First Name');
  const [pagesval, setpagesval] = useState(30);

  const [searcher, setSearcher] = useState('firstName');
  const [Modaldata, setModaldata] = useState(null);

  const [age, setAge] = useState('');
  const [nodes, setdata] = useState([]);
  const [classs, setClasss] = useState();
  const [CSVTemplate, setCSVTemplate] = useState([]);
  const [clazz, setclazz] = useState();
  const [sectionzz, setsectionzz] = useState();
  const [id, setid] = useState();
  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);
  const classes = useSelector((state) => state?.classes);
  const [classinfo, setclassinfo] = useState();


  const {
    loading,
    error,
    fetchStudent,
    fetchStudentcustom,
    fetchcustom,
    fetchStudentcustomloading,
    fetchcustomloading,
    singleStudent,
    deleteSingleStudent,
  } = student;

  const { fetchAllClassloading, fetchAllClass } = classes;

  const { value } = location?.state;
  const [info, setinfo] = useState();

  useEffect(() => {
    setTimeout(() => setLoader(false), 500);
    console.log(value);
    dispatch(resetGlobalSearch())
      setdata(value?.data);
  }, [location?.state]);



  
  // useEffect(() => {

  //   if (fetchSection?.success == 1) {
  //    let arrr = ['All Sections']
  //     let i = 0;
  //     while (i < classes?.fetchSection?.data.length) {
  //       arrr.push(classes?.fetchSection?.data[i]?.sectionName
  //         );
  //       i++;
  //     }

  //     setsections(arrr);
  //     setsectionzz(arrr[0])
  //   }
  // }, [sectionloading]);

  let data = { nodes };

  const theme = useTheme([
    {
      HeaderRow: `
  .th {
    border-bottom: 1px solid #a0a8ae;
    padding: 5px 0px;
  }
`,

      BaseCell: `
      font-size: 15px;
    

     `,

      Table: `
  --data-table-library_grid-template-columns:  12% 37% 15% 10% 25%;
`,
    },
  ]);

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: pagesval == 'All' ? 90000000000000000 : pagesval,
    },
    onChange: onPaginationChange,
  });
  const pagination1 = usePagination(data, {
    state: {
      page: 0,
      size: 90000000000000000,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  var data2;
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleviewbtn = (value) => {
    navigate('/globalsearch', { state: { action: 1, value: value } });
    dispatch(fetchUserdataAction({ role: 'student', id: value.student_id, userid:value.userId }));
  };
  const handleEditbtn = (value) => {
    dispatch(fetchUserdataAction({ role: 'student', id: value.student_id, userid:value.userId }));
        navigate('/globalsearch', { state: { action: 2, value: value , clas: clazz, section: sectionzz } });
  };
  const handleayfee = () => {
  };
  const handledeletbtn = () => {
    let data = {
      class: clazz,
      section: sectionzz,
      id: id?.student_id,
    };
    dispatch(deleteSingleStudentAction(data));
  };

  const [propp, setProp] = useState();
  const handleviewbtn1 = (value,info) => {
    show('top-right');
    setSingleCart(
      info?.filter((item) => item?.scartegory.includes(value)),
    );

  };
  const [name, SetName] = useState('');
  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };
  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(`${clazz} : ${sectionzz}  `);
  };
  function setModalVisible() {
    setVisible(false);
  }

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `${clazz} : ${sectionzz} `,
  });

  const handleDownloadCSV = async () => {
    const csv = generateCsv(csvConfig)(CSVTemplate);
    download(csvConfig)(csv);
  };
  function handleGetClassData() {

    let data = {
      class: clazz,
      section: sectionzz,
    };
    if (sectionzz == 'All Sections') {
      //  setclazz(clazz)
      dispatch(fetchStudentsClassAction(data));
    }
    if (sectionzz != 'All Sections') {
      setsectionzz(sectionzz);
      dispatch(fetchCustomStudentsClassAction(data));
    }
  }
  
  const [activeaccount, setactiveaccount] = useState();
  const [session, setsession] = useState();
  const session1 = useSelector((state) => state?.session);
  const [visible1, setVisible1] = useState(false);

  const { fetchsessionactive, fetchsession } = session1;
  useEffect(() => {
    if (fetchsessionactive?.success == 1) {
      let data = fetchsessionactive?.data[0];
      setsession(data?.sessionname); 
      setactiveaccount(data?.activeaccountid);
   //   console.log('sessionz');
    }
  }, [fetchsessionactive]);

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
       <Dialog
        resizable={false}
        draggable={false}
        // headerClassName=" px-7 py-2  dark:bg-primary font-bold text-black dark:text-white"
        visible={visible}
        className=""
        position={'top'}
        style={{ width: '40%', color: 'white' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <CollectFeesModal close={setVisible} stdname={name} val={propp} activeaccount={activeaccount} infotype={sectionzz} session={session}/>
      </Dialog>
    
      {/* <Dialog
        visible={visible1}
        position={'top'}
        style={{ height: 'auto', width: '40%' }}
        onHide={() => {
          if (!visible1) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DeleteModal delete={handledeletbtn} close={setVisible1} />
      </Dialog> */}
      <div className=" flex-col">
        <div
          className={
            'rounded-sm border max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
          }
        >
          <div className="max-w-full overflow-x-auto">
          <label
                        className="mb-3 block text-xl font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Search Results
                      </label>
          </div>
        </div>
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
                theme={theme}
                layout={{ custom: true }}
              >
                {(tableList) => (
                  <>
                    <Header>
                      <HeaderRow className="dark:bg-meta-4 border-stroke bg-white dark:text-white flex ">
                        <HeaderCell className="">ID</HeaderCell>
                        <HeaderCell>Name</HeaderCell>
                        <HeaderCell>Class</HeaderCell>
                        <HeaderCell>Acct. Bal</HeaderCell>

                        <HeaderCell>Actions</HeaderCell>
                      </HeaderRow>
                    </Header>

                    <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                      {tableList?.map((item) => (
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
                            <span>{item.accountbalance}</span>
                          </Cell>
                          <Cell>
                            <div className="gap-2 flex">
                              {/* <ViewSVG
                                clickFunction={() => handleviewbtn(item)}
                              /> */}
                            
                                 <TableBtn
                                text={'View'}
                                clickFunction={() => {
                                  handleEditbtn(item)
                                }}
                                color={'bg-primary'}
                              />
                                <TableBtn
                                text={'Collect Fees'}
                                clickFunction={() => {
                                  console.log(item)
                                  setProp(item);
                                //  handleviewbtn1(item?.cartegory,info);
                                  SetName(item.firstName +
                                    ' ' +
                                    item.otherName +
                                    ' ' +
                                    item.lastName)
                                    navigate('/fees/searchcollectfee', { state: {stdname:(item.firstName +
                                      ' ' +
                                      item.otherName +
                                      ' ' +
                                      item.lastName), val:item, activeaccount:activeaccount, infotype:item.section, session:session } });
                                  }}
                                color={'bg-primary'}
                              />

                              {/* <DeleteSVG
                                clickFunction={() => {
                                  setid(item);
                                  setVisible(true);
                                }}
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
          
            <div className="hidden">
              <Table
                id="my-table"
                data={data}
                pagination={pagination1}
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
                      {tableList?.map((item) => (
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
    </DefaultLayout>
  );
};

export default SearchPage;
