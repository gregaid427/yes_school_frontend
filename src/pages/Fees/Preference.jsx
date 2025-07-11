import { useEffect, useRef, useState } from 'react';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useTheme } from '@table-library/react-table-library/theme';
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
} from '../../redux/slices/studentSlice';
import Loader from '../../common/Loader';
import ClassSelect from '../../components/ClassSelect';
import {
  fetchschoolinfoAction,
  fetchUserdataAction,
} from '../../redux/slices/usersSlice';
import TableBtn from '../../components/Svgs/TableBtn';
import {
  fetchfeeCartegoryAction,
  resetpayfee,
} from '../../redux/slices/feeSlice';
import { fetchActivesessionAction } from '../../redux/slices/sessionSlice';
import StudentPreferenceModal from '../../components/StudentPreferenceModal';
import GlobalSearchInput from '../../components/GlobalSearchInput';

const Preference = () => {

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const [position, setPosition] = useState('top');

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  useEffect(() => {
    setdata();

  }, []);
  const [loader, setLoader] = useState(true);

  const [searchval, setSearchval] = useState('First Name');
  const [pagesval, setpagesval] = useState(30);

  const [searcher, setSearcher] = useState('firstName');
  const [isChecked2, setIsChecked2] = useState(false);

  const [age, setAge] = useState('');
  const [nodes, setdata] = useState([]);
  const [classs, setClasss] = useState();
  const [sections, setsections] = useState([]);
  const [clazz, setclazz] = useState();
  const [sectionzz, setsectionzz] = useState('All Sections');
  const [propp, setProp] = useState();
  const [cartz, setcartegory] = useState();
  const [info, setinfo] = useState();
  const [receipt, setReceipt] = useState('');
  const [classinfo, setclassinfo] = useState();


  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);
  const classes = useSelector((state) => state?.classes);
  const fee = useSelector((state) => state?.fees);

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
  const { payfee, cartegory,fetchcustomPref } = fee;

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchcustom?.success == 1) {
      let data = fetchcustom?.data;
      let info = fetchcustom?.info;
      setinfo(info);
      setdata(data);
    }
    if (fetchcustomPref?.success == 1) {
      console.log('fffffffffffffffffffffffffff')
      let data = fetchcustomPref?.data;
      let info = fetchcustomPref?.info;
      setinfo(info);
      setdata(data);
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

    if (fetchcustomPref?.success == 1) {
      let data = fetchcustomPref?.data;
      let info = fetchcustomPref?.info;
      setinfo(info);
      setdata(data);
    }

 
  }, [fetchcustomPref]);



  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchStudentcustombal?.success == 1) {
      let data = fetchStudentcustombal?.data;
      let info = fetchStudentcustombal?.info;
      setinfo(info);
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
      console.log(cartegory?.data);
    }
  }, [payfee, cartegory]);
  function getpref(pref) {
    console.log(pref);

    let myArr = pref.split(',');

    let bb = myArr.slice(0, -1).toString();
    console.log(bb);

    return bb;
  }
  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (payfee?.success == 1) {
      setVisible(false);
      setVisible1(true);
      setReceipt(payfee?.response);
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
  --data-table-library_grid-template-columns:  35% 65% ;
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
  }, []);
  const user = useSelector((state) => state?.user);
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

  const handleviewbtn = (value) => {
    show('top-right');
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
        style={{ width: '50%', color: 'white' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <StudentPreferenceModal close={setVisible} val={propp} cart={cartz} />
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
                        <Header>
                          <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                            <HeaderCell>Name</HeaderCell>
                            <HeaderCell>Exempted Fee Items</HeaderCell>
                          </HeaderRow>
                        </Header>
                      </HeaderRow>
                    </Header>


                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                      {tableList?.map((item) => (
                        <Row
                          key={item.student_id}
                          item={item}
                          className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
                        >
                          <Cell className="capitalize">
                            {item.firstName +
                              ' ' +
                              item.otherName +
                              ' ' +
                              item.lastName}
                          </Cell>
                          <Cell className="  ">
                            <span>{item.preference == 0 ? "-" : getpref(item.preference)}</span>
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
                        <HeaderCell>Name</HeaderCell>
                        <HeaderCell>Exempted Fee Cartegories</HeaderCell>
                      </HeaderRow>
                    </Header>


                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                      {tableList?.map((item) => (
                        <Row
                          key={item.student_id}
                          item={item}
                          className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
                        >
                          <Cell className="capitalize">
                            {item.firstName +
                              ' ' +
                              item.otherName +
                              ' ' +
                              item.lastName}
                          </Cell>
                          <Cell className="  ">
                            <span>{item.preference}</span>
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

export default Preference;
