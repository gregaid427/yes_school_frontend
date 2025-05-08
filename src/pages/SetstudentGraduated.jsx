import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import userThree from '../images/user/user-03.png';
import DefaultLayout from '../layout/DefaultLayout';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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

  DeletegraduatedAction,
  deletesinglegraduateAction,
  FetchgraduatedAction,
  fetchSingleStudent,
} from '../redux/slices/studentSlice';
import Loader from '../common/Loader';
import StudentModal from '../components/StudentModal';

import SectionSelect1 from '../components/SectionsSelect1';
import ClassSelect from '../components/ClassSelect';
import InactiveSVG from '../components/Svgs/Inactive';
import RemoveSVG from '../components/Svgs/Remove';
import DeleteModal from '../components/DeleteModal';

const SetstudentGraduated = () => {
  ///////////////////////////////////

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [visible1, setVisible1] = useState(false);
  const [del, setDel] = useState();
  const [userid, setuserid] = useState();

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
  const [sections, setsections] = useState([]);
  const [clazz, setclazz] = useState();
  const [sectionzz, setsectionzz] = useState();

  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);
  const classes = useSelector((state) => state?.classes);

  const {
    loading,
    error,
    fetchStudent,
    fetchStudentcustom,
    fetchcustom,
    fetchStudentcustomloading,
    fetchcustomloading,
    singleStudent,
    Fetchgraduate,deletegraduate
  } = student;

  const { fetchAllClassloading, fetchAllClass } = classes;

  useEffect(() => {
    dispatch(FetchgraduatedAction())
    setTimeout(() => setLoader(false), 1000);

  }, []);

  useEffect(() => {
    if (Fetchgraduate?.success == 1) {
      let data = Fetchgraduate?.data;
      setdata(data);
      setVisible1(false);

    }
  }, [Fetchgraduate]);



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
  --data-table-library_grid-template-columns:  12% 33% 20% 10% 10%  15%;
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
      size: pagesval == 'All' ? 90000000000000000 : pagesval,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  var data2;
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleviewbtn = (value) => {
    navigate('/student/singlestudent', {
      state: { action: 1, value: value.student_id },
    });
  };
  const handleEditbtn = (value) => {
    dispatch(fetchSingleStudent(value.student_id));
    navigate('/student/editinfo', {
      state: { action: 2, value: value },
    });
  };
  const handledeletbtn = () => {
    let data = {
      id: del,
    };
    dispatch(deletesinglegraduateAction(data));
  };
  const handledeletallbtn = () => {
    
    dispatch(DeletegraduatedAction());
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
        header="Student Personal Information"
        resizable={false}
        draggable={false}
        headerClassName=" px-7 py-2  dark:bg-primary font-bold text-black dark:text-white"
        visible={visible}
        className=""
        position={'top-right'}
        style={{ width: 'w-12/12', color: 'white' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <StudentModal close={() => setModalVisible()} />
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
        <DeleteModal delete={handledeletallbtn} close={setVisible1} />
      </Dialog>
      <Dialog
        visible={visible2}
        position={'top'}
        style={{ height: 'auto', width: '40%' }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DeleteModal delete={handledeletbtn} close={setVisible2} />
      </Dialog>
      <div className=" flex-col">
        <div
          className={
            'rounded-sm border max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
          }
        >
          <div className='flex  justify-between '>
            <div className=' w-4/12'>
            <label
                      className=" block  text-lg mb-3 font-medium text-ash dark:text-white"
                      // style={{ color: '#A9B5B3' }}
                    >
Graduated Students Records                    </label>
            <button
              onClick={() => setVisible1(true)}
              className="btn h-10  flex justify-center rounded  bg-danger py-2 px-3 font-medium text-gray hover:shadow-1"
              type="submit"
            >
              Delete All Records
            </button>
            </div>
            <div className="flex w-4/12 flex-col">
              <div className="flex justify-between align-middle mb-2">
                <label
                  className="mb-3 w-2/2 pt-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor=" "
                >
                  Search By{' '}
                </label>
                <div className="relative  z-20 w-3/5 bg-white dark:bg-form-input">
                  <SelectGroupTwo
                    values={['First Name', 'Last Name', 'ID']}
                    setSelectedOption={(val) => setSearchval(val)}
                    selectedOption={searchval}
                  />
                </div>
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
                        <HeaderCell>Class (Section)</HeaderCell>
                        <HeaderCell>Gender</HeaderCell>
                        <HeaderCell>Acct Bal</HeaderCell>


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
                            <span>
                              {item.class} ({item.section})
                            </span>
                          </Cell>
                          <Cell className="  ">
                            <span>{item.gender}</span>
                          </Cell>
                          <Cell className="  ">
                            <span>{item.accountbalance}</span>
                          </Cell>

                          <Cell>
                            <div className="gap-2 flex">
                              {/* <ViewSVG
                                clickFunction={() => handleviewbtn(item)}
                              /> */}
                              {/* <EditSVG
                                clickFunction={() => handleEditbtn(item)}
                              /> */}

                              {/* <InactiveSVG
                                clickFunction={() =>
                                  handledeletbtn(item.student_id)
                                }
                              /> */}
                              <RemoveSVG
                                clickFunction={() => {
                                  setVisible2(true);
                                  setDel(item.student_id);
                                  setuserid(item.userId);
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
                            <span>
                              {item.section} ({item.section})
                            </span>
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

export default SetstudentGraduated;
