import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';

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
  fetchCustomStudentsClassAccountAction,
  fetchCustomStudentsClassAction,
  fetchSingleStudent,
  fetchStudentsClassAccountAction,
  fetchStudentsClassAction,
  resetFetchCustom,
} from '../../redux/slices/studentSlice';
import Loader from '../../common/Loader';


import SectionSelect1 from '../../components/SectionsSelect1';
import ClassSelect from '../../components/ClassSelect';
import { fetchschoolinfoAction, fetchUserdataAction } from '../../redux/slices/usersSlice';
import TableBtn from '../../components/Svgs/TableBtn';
import CollectFeesModal from '../../components/collectFeesModal';
import FeesReceiptModal from '../../components/FeesReceiptModal';
import { fetchfeeCartegoryAction, resetpayfee } from '../../redux/slices/feeSlice';
import { fetchActivesessionAction } from '../../redux/slices/sessionSlice';
import GlobalSearchInput from '../../components/GlobalSearchInput';

const CollectFees = () => {
  ///////////////////////////////////

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const [position, setPosition] = useState('top');

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  //////////////////////////////////////

  const [loader, setLoader] = useState(true);

  const [searchval, setSearchval] = useState('First Name');
  const [pagesval, setpagesval] = useState(30);

  const [searcher, setSearcher] = useState('firstName');
  const [isChecked2, setIsChecked2] = useState(false);

  const [age, setAge] = useState('');
  const [nodes, setdata] = useState([]);
  const [classs, setClasss] = useState();
  
  const [session, setsession] = useState();
  const [sessionid, setsessionid] = useState();

  const [activeaccount, setactiveaccount] = useState();

  const [clazz, setclazz] = useState();
  const [sectionzz, setsectionzz] = useState('All Sections');
  const [propp, setProp] = useState();
  const [cartz, setcartegory] = useState();
  const [info, setinfo] = useState();
  const [receipt, setReceipt] = useState('');
  const [name, SetName] = useState('');
  const [singleCart, setSingleCart] = useState([]);
  const [classinfo, setclassinfo] = useState();

  
  
  console.log(propp)
  
  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);
  const classes = useSelector((state) => state?.classes);
  const fee = useSelector((state) => state?.fees);
  const session1 = useSelector((state) => state?.session);

  const { fetchsessionactive, fetchsession } = session1;
  useEffect(() => {
    if (fetchsessionactive?.success == 1) {
      let data = fetchsessionactive?.data[0];
      setsession(data?.sessionname); 
      setsessionid(data?.sessioncode); 

      setactiveaccount(data?.activeaccountid);
   //   console.log('sessionz');
    }
  }, [fetchsessionactive]);
  const {
    loading,
    error,
    fetchStudent,
    fetchStudentcustombal,
    fetchcustom,
    fetchStudentcustomballoading,
    fetchcustomloading,
    singleStudent,
    singleStudentloading,
  } = student;

  const { fetchAllClassloading, fetchAllClass } = classes;
  const { payfee,cartegory } = fee;
  console.log(fetchcustom)

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchcustom?.success == 1) {
      let data = fetchcustom?.data;
      let info = fetchcustom?.info;
      setinfo(info)
      setdata(data);
      console.log(info)
      dispatch(resetFetchCustom())

    }

    // if (fetchAllClass?.success == 1) {
    //   let i = 0;
    //   let arr = []
    //   while (i < classes?.fetchAllClass?.data.length) {
    //     arr.push(classes?.fetchAllClass?.data[i].title);
    //     i++;
    //   }
    //   setClasss(arr);
    // //  setclazz(arr[0])
    // }
  }, [fetchAllClassloading, fetchcustomloading]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchStudentcustombal?.success == 1) {
      let data = fetchStudentcustombal?.data;
      let info = fetchStudentcustombal?.info;
      setinfo(info)
      setdata(data);
    }
  }, [fetchStudentcustombal]);

  useEffect(() => {
    if (payfee?.success == 1) {
      let data = payfee?.data;
      setdata(data);
    }
    if (cartegory?.success == 1) {
      let data = cartegory?.data;
      setcartegory(data);
      console.log(cartegory?.data)
    }
  }, [payfee,cartegory]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (payfee?.success == 1) {
      setVisible(false);
      setVisible1(true);
      setReceipt(payfee?.response)
      dispatch(resetpayfee());
    }
  }, [payfee]);

  useEffect(() => {
    setdata([]);
    
  }, []);


  useEffect(() => {
    dispatch(fetchfeeCartegoryAction());
  }, []);

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
  --data-table-library_grid-template-columns:  15% 30% 16% 14% 13%  12%;
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
  useEffect(() => {
    dispatch(fetchschoolinfoAction());
    dispatch(fetchActivesessionAction());
  }, []);  const user = useSelector((state) => state?.user);
  const { allschool } = user;

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: pagesval == 'All' ? 90000000000000000 : pagesval,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  var data2;
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleviewbtn = (value,info) => {
    show('top-right');
    setSingleCart(
      info?.filter((item) => item?.scartegory.includes(value)),
    );

  };
  const handleEditbtn = (value) => {
    dispatch(fetchUserdataAction({ role: 'student', id: value.student_id }));
    navigate('/student/editinfo', { state: { action: 2, value: value } });
  };
  const handledeletbtn = (value) => {
    let data = {
      class: clazz,
      section: sectionzz,
      id: value,
    };
    dispatch(deleteSingleStudentAction(data));
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

  function setModalVisible() {
    setVisible(false);
  }

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `${clazz} : ${sectionzz} `,
  });

  function handleGetClassData() {
    console.log(clazz);

    let data = {
      class: clazz,
      section: sectionzz,
    };
    console.log(data);
    if (sectionzz == 'All Sections') {
      //  setclazz(clazz)
      dispatch(fetchStudentsClassAccountAction(data));
    }
    if (sectionzz != 'All Sections') {
      setsectionzz(sectionzz);
      dispatch(fetchCustomStudentsClassAccountAction(data));
    }
  }
  console.log(nodes)
  const footerContent = (
    <div>
      <button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );
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
        <CollectFeesModal close={setVisible} stdname={name} val={propp} activeaccount={activeaccount} infotype={sectionzz} session={session} sessionid={sessionid}/>
      </Dialog>
      <Dialog
        resizable={false}
        draggable={false}
        // headerClassName=" px-7 py-2  dark:bg-primary font-bold text-black dark:text-white"
        visible={visible1}
        className=""
        position={'bottom'}
        style={{ width: '65%', color: 'white' }}
        onHide={() => {
          if (!visible1) return;
          setVisible1(false);
        }}
      >
        <FeesReceiptModal close={setVisible1} val={propp} response={receipt} cart={singleCart} school={allschool} />
      </Dialog>
      <div className=" flex-col">
        <div
          className={
            'rounded-sm border max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
          }
        >


          <div className="max-w-full overflow-x-auto">
            <div className="w-full  flex justify-between ">
              <div className=" flex w-7/12 gap-3">
                <div className="sm:w-2/5 ">
                  <div>
                    <label
                      className="mb-2 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Class
                    </label>

                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <ClassSelect setsectionprop={setclazz} clazz={clazz} selectinfo={setclassinfo} />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-2/5">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Section{' '}
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <SectionSelect1 setsectionprop={setsectionzz} />
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
                      onClick={() => handleGetClassData()}
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
                    className="mb-1 w-2/2 pt-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor=" "
                  >
                    Search By ID / Firstname / LastName 
                  </label>
                 
                </div>

               <GlobalSearchInput globalResult={setdata}/>
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
                      <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                        <HeaderCell className="">ID</HeaderCell>
                        <HeaderCell>Name</HeaderCell>
                        <HeaderCell>Class</HeaderCell>
                        <HeaderCell>Cartegory</HeaderCell>

                        <HeaderCell>Acct Balance</HeaderCell>

                        <HeaderCell>Actions</HeaderCell>
                      </HeaderRow>
                    </Header>


                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                      {tableList?.map((item) => (
                        <Row key={item.student_id}
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
                            <span>{item.cartegory}</span>
                          </Cell>
                          <Cell className="flex   justify-between  ">
                            <span className="">
                              {(item.accountbalance > 0 ? '⚪'+ ' '+item.accountbalance :  '🟢'+ ' '+item.accountbalance)}
                            </span>{' '}
                            {/* <span className="float-right mr-15">
                              {item?.accountbalance < 0 ? (
                                <TableBtn
                                  clickFunction={() => {}}
                                  text={' Debit '}
                                  color={'bg-[#6D343E]'}
                                />
                              ) : item?.accountbalance == 0 ? (
                                ''
                              ) : (
                                <TableBtn
                                  clickFunction={() => {}}
                                  text={'Credit'}
                                  color={'bg-success'}
                                />
                              )}
                            </span> */}
                          </Cell>

                          <Cell>
                            <div className="gap-2 flex">
                              <TableBtn
                                text={'Collect Fees'}
                                clickFunction={() => {
                                  console.log(item)
                                  setProp(item);
                                  handleviewbtn(item?.cartegory,info);
                                  SetName(item.firstName +
                                    ' ' +
                                    item.otherName +
                                    ' ' +
                                    item.lastName)
                                }}
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
                pagination={pagination}
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
                          className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
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

export default CollectFees;
