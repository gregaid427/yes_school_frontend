import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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

import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../common/Loader';
import DefaultLayout from '../../layout/DefaultLayout';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';

import {
  GetEnrolledStudentAction,
  resetRevoke,
  RevokeScholarshipAction,
} from '../../redux/slices/feeSlice';
import ClassSelect3 from '../../components/ClassSelect3';
import TableBtn from '../../components/Svgs/TableBtn';
import GlobalSearchInput from '../../components/GlobalSearchInput';

const RevokeScholarship = () => {
  ///////////////////////////////////

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('top');
  const [allStudent, setAllStudent] = useState(true);
  const [onlySelected, setOnlySelected] = useState(false);
  const [repeat, setRepeat] = useState([]);

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  //////////////////////////////////////

  const [loader, setLoader] = useState(true);

  const [searchval, setSearchval] = useState('First Name');
  const [pagesval, setpagesval] = useState(9999999999999);

  const [searcher, setSearcher] = useState('firstName');
  const [isChecked2, setIsChecked2] = useState(false);
  const [radioReset, setradioReset] = useState(false);

  const [age, setAge] = useState('');
  const [nodes, setdata] = useState([]);
  const [classs, setClasss] = useState();
  const [sections, setsections] = useState([]);
  const [clazz, setclazz] = useState();
  const [nextClass, setNextclass] = useState();

  const [sectionzz, setsectionzz] = useState();
  const [isChecked1, setIsChecked1] = useState(false);
  const [type, setType] = useState('All');

  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);
  const classes = useSelector((state) => state?.classes);

  const {
    fetchStudent,
    fetchStudentcustom,
    fetchcustom,
    fetchStudentcustomloading,
  } = student;
  console.log(repeat);
  const { fetchAllClassloading, fetchAllClass } = classes;

  const fee = useSelector((state) => state?.fees);
  const { Enrolllist,Revoke } = fee;

  useEffect(() => {
    if (fetchcustom?.success == 1) {
      let data = fetchcustom?.data;
      setdata(data);
    }
  }, [fetchcustom]);

  useEffect(() => {
    let data = {
      type: 'All',
    };
    dispatch(GetEnrolledStudentAction(data));
  }, []);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (Enrolllist?.success == 1) {
      let data = Enrolllist?.data;
      setdata(data);
    }
  }, [Enrolllist]);

 

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
  --data-table-library_grid-template-columns:   30%  30% 25% 15% ;
`,
      BaseCell: `
        font-size: 15px;
        //color:white;
        padding: 5px 0px;
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
      size: pagesval == 'All' ? 90000000000000000 : pagesval,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  var data2;
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleviewbtn = (value) => {
    // navigate('/student/singlestudent', {
    //   state: { action: 1, value: value.student_id },
    // });
  };

  const handleRevoke = (value) => {
    dispatch(RevokeScholarshipAction({ id: value }));
  };
  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (Revoke?.success == 1) {
      handleGetClassData1()
      dispatch(resetRevoke())
    }
  }, [Revoke]);
  data = {
    nodes: data.nodes.filter((item) =>
      searchval === 'First Name'
        ? item.firstName.toLowerCase().includes(search.toLowerCase())
        : searchval == 'Last Name'
          ? item.lastName.toLowerCase().includes(search.toLowerCase())
          : item.student_id.toLowerCase().includes(search.toLowerCase()),
    ),
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
    const csv = generateCsv(csvConfig)(nodes);
    download(csvConfig)(csv);
  };
  function handleGetClassData() {
    let data = {
      class: clazz,
      type: 'custom',
    };
    console.log(data);
    if (clazz == 'None') {
      toast.error('Pleae Select Class');
    } else {
      dispatch(GetEnrolledStudentAction(data));
    }
  }
  function handleGetClassData1() {
    let data = {
      class: clazz,
      type:clazz == 'None' ? 'All' : 'custom',
    };
    console.log(data);
   
      dispatch(GetEnrolledStudentAction(data));
    
  }


  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Toaster position="top-center" reverseOrder={false} />

      <div className=" flex-col">
        <div
          className={
            'rounded-sm border max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
          }
        >
          <div className="max-w-full overflow-x-auto">
            <div className="w-full  flex justify-between ">
              <div className=" flex w-7/12 gap-3">
                <div className="sm:w-2/6 ">
                  <div>
                    <label
                      className="mb-2 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Class
                    </label>

                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <ClassSelect3 setsectionprop={setclazz} clazz={clazz} />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-2/6">
                  <label
                    className="mb-2 block text-sm font-medium  dark:text-black"
                    htmlFor=""
                  >
                    .{' '}
                  </label>
                  <div className="relative sm:w-full z-20 bg-white dark:bg-form-input">
                    <button
                      onClick={() => handleGetClassData()}
                      className="btn h-10  w-full   flex justify-center rounded  bg-black py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Get Class List
                    </button>
                  </div>
                </div>
                <div className="w-full sm:w-2/6">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    {/* Section{' '} */}
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    {/* <SectionSelect1 setsectionprop={setsectionzz} /> */}
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
            {/* <div className={nodes[0] ?? 'hidden '}>
              <div className="flex row  w-full">
                <div className=" w-2/6">
                  {' '}
                  <label
                    className="mb-2  block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Promotion Options :
                  </label>
                  <div className="flex row align-middle py-auto gap-2">
                    <button
                      onClick={() => {
                        setAllStudent(true);
                        setOnlySelected(false);
                      }}
                      className="btn  h-10    flex justify-center rounded  bg-primary py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      All Students
                    </button>
                    <button
                      onClick={() => {
                        setOnlySelected(true);

                        setAllStudent(false);
                      }}
                      className="btn  h-10   flex justify-center rounded  bg-primary py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Select Students
                    </button>
                  </div>
                </div>
                <div className="w-4/6">
                  <div className={allStudent === false ? 'hidden' : null}>
                    <label
                      className="mb-2  block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Choose Next Class :
                    </label>
                    <div className="flex row  py-auto gap-2 w-4/6">
                      <div className="w-2/6">
                        <ClassSelect2
                          setsectionprop={setNextclass}
                          clazz={clazz}
                        />
                      </div>
                      <button
                        onClick={() => handlePromoteAll()}
                        className="btn  h-10   flex justify-center rounded  bg-primary py-2 px-3 font-medium text-gray hover:shadow-1"
                        type=""
                      >
                        Promote Students
                      </button>
                    </div>
                  </div>
                  <div className={onlySelected === false ? 'hidden' : null}>
                    <label
                      className="mb-2  block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Choose Next Class :
                    </label>
                    <div className="flex row  py-auto gap-2 w-4/6">
                      <div className="w-2/6">
                        <ClassSelect
                          setsectionprop={setNextclass}
                          clazz={clazz}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
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
                layout={{ custom: true }}
                theme={theme}
              >
                {(tableList) => (
                  <>
                    <Header>
                      <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                        {/* <HeaderCell className="">ID</HeaderCell> */}
                        <HeaderCell>Name</HeaderCell>
                        <HeaderCell>Scholarship</HeaderCell>
                        <HeaderCell>Amount/Cover</HeaderCell>
                        <HeaderCell>Actions</HeaderCell>
                      </HeaderRow>
                    </Header>

                    <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                      {tableList?.map((item) => (
                        <Row
                          key={item.student_id}
                          item={item}
                          className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] "
                        >
                          {/* <Cell className="  ">
                            <span>{item.student_id}</span>
                          </Cell> */}
                          <Cell className="capitalize">
                            {item.firstName +
                              ' ' +
                              item.otherName +
                              ' ' +
                              item.lastName}
                          </Cell>

                          <Cell className="  ">
                            <span>{item.scholarshiptitle}</span>
                          </Cell>

                          <Cell className="  ">
                            <span>
                              {item.amount +
                                ' ' +
                                '-' +
                                ' ' +
                                item.cartegorycovering}
                            </span>
                          </Cell>

                          <Cell>
                            <div className="gap-2 flex">
                              {/* 
                              <ViewSVG
                                clickFunction={() => handleviewbtn(item)}
                              />
                              <EditSVG
                                clickFunction={() => handleEditbtn(item)}
                              /> */}
                              <TableBtn
                                clickFunction={() => handleRevoke(item.id)}
                                text={'Revoke Scholarship'}
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
          </div>
        </div>{' '}
      </div>
    </DefaultLayout>
  );
};

export default RevokeScholarship;
