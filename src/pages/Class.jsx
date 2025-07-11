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
} from '../redux/slices/classSlice';
import ClassCheckbox from '../components/ClassCheckbox';
import SectionModal from '../components/SectionModal';
import { Dialog } from 'primereact/dialog';
import DeleteModal from '../components/DeleteModal';
import Loader from '../common/Loader';
import SectionClassModal from '../components/SectionClassModal';
import TableBtn from '../components/Svgs/TableBtn';
import ClassListModal from '../components/ClassList';

const Class = () => {
  const [pagesval, setpagesval] = useState(30);
  const [change, setChange] = useState();
  const [info, setInfo] = useState(null);
  const [vall, setval] = useState(null);

  const [loader, setLoader] = useState(true);

  const [classTitle, setClassTitle] = useState('');
  const [classInstructor, setClassInstructor] = useState('');

  const [sections, setsections] = useState([]);
  const [oldsession, setoldsession] = useState();

  const [nodes, setdata] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const clad = useSelector((state) => state?.classes);

  const {
    fetchAllClassloading,
    fetchAllClassNo,
    sectionloading,
    fetchSection,
    fetchAllClass,
    CreateClasses,
    CreateClassesloading,
    ClassWithSection,
    resetdeleteclass,
  } = clad;

  useEffect(() => {
    dispatch(fetchAllClassAction());
    // dispatch(fetchAllClassNoAction());
  }, []);
  useEffect(() => {
    if (fetchSection?.success == 1) {
      let data = fetchSection?.data;
      setsections(data);
      setInfo(data);
      setoldsession(data);
    }
  }, [change, fetchAllClassloading, CreateClassesloading]);

  useEffect(() => {
    if (CreateClasses?.success == 0) {
      toast.error('Error - Class Name Already Exists');
      dispatch(resetcreateClass());
      // dispatch(fetchAllClassAction())
    }
    if (CreateClasses?.success == 1) {
      toast.success('New Class Added Successfully');
      dispatch(resetcreateClass());
      // dispatch(fetchAllClassAction())
    }
  }, [fetchAllClassloading, CreateClassesloading]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchAllClass?.success == 1) {
      let data = fetchAllClass?.data;
      setdata(data);
      setInfo(data);
      setVisible1(false);
      setoldsession(data);
    }
  }, [fetchAllClass, resetdeleteclass]);

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
      --data-table-library_grid-template-columns:  50%  50%;
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
      item.title.toLowerCase().includes(search.toLowerCase()),
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
  const handleEditbtn = (value) => {};

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (ClassWithSection?.success == 1) {
      setoldsession(ClassWithSection?.data);

      if (vall == 1) {
        setVisible2(true);
        dispatch(resetgetclass());
      }
      if (vall == 2) {
        navigate('/academics/class/editclass', {
          state: { action: 2, value: ClassWithSection?.data },
        });
        dispatch(resetgetclass());
      }
      
      if (vall == 3) {
        setVisible3(true);
        dispatch(resetgetclass());
      }
    }
    //   // setTimeout(() => toast.success('New Student Added Successfully'), 900);
    //  if(singleStudent?.data == undefined )
    //  navigate("/student/info")
  }, [ClassWithSection]);
  console.log(info);

  const [del, setDel] = useState();
  const [name, setname] = useState('');

  const handledeletbtn = () => {
    dispatch(deleteSingleClassAction(del));
    // dispatch(fetchAllClassAction());
  };

  const [position, setPosition] = useState('center');
  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };
  const [selectedsection, setselectedsection] = useState([]);
  const [selectedsection1, setselectedsection1] = useState([]);

  const user = useSelector((state) => state?.user);
  const { username, userMail } = user;

  const classdata = {
    title: classTitle.toUpperCase(),
    createdBy: username?.payload,
    instructor: classInstructor,
    sections: selectedsection,
  };
  const handlecreateClass = () => {
    if (classTitle == '') {
      toast.error('Error - Class Name Cannot Be Empty');
    } else {
      console.log(classdata);

      dispatch(CreatesClassAction(classdata));
    }
  };
  console.log(selectedsection);

  function updatesection(val) {
    if (selectedsection1.includes(val)) {
      setselectedsection1(
        selectedsection1.filter(
          (element) => element.sectionName !== val.sectionName,
        ),
      );
      setselectedsection(
        selectedsection.filter(
          (element) => element.sectionName !== val.sectionName,
        ),
      );
    } else {
      setselectedsection1([val, ...selectedsection1]);
      setselectedsection([val, ...selectedsection]);
    }
  }

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
        position={'top'}
        style={{ height: 'auto', width: '30%' }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
      >
        <SectionClassModal
          close={setVisible2}
          changeval={change}
          data={info}
          change={setChange}
          sett={setval}
          old={oldsession}
        />
      </Dialog>
      <Dialog
        visible={visible3}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible3) return;
          setVisible2(false);
        }}
      >
        <ClassListModal
          close={setVisible3}
          changeval={change}
          name={name}
          change={setChange}
          sett={setval}
          old={oldsession}
          del={del}
        />
      </Dialog>
      <div className={'flex row gap-3  w-full'}>
        <div className="grid w-4/12  gap-8">
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
                      className="flex w-5/12 justify-center rounded-2xl  bg-primary py-1   font-[6px]  hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        // handlecreateClass();
                        show('top-right');
                      }}
                    >
                      Add Section
                    </button>
                  </div>
                  {fetchSection?.data?.map((item) => (
                    <div key={item.id} className="mb- flex gap-2   sm:flex-row">
                      <ClassCheckbox
                        updatesection={() => updatesection(item)}
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
        </div>
        <div className="w-8/12  flex-col">
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  All Classes
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
                      className="pt-2 block text-sm font-medium cursor-pointer text-ash dark:text-white"
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
                      className="pt-2 block text-sm font-medium cursor-pointer text-ash dark:text-white"
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
                          {/* <HeaderCell>Section</HeaderCell> */}

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                        {tableList?.map((item) => (
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] "
                          >
                            <Cell className="  ">{item.title}</Cell>

                            {/* <Cell className="  ">{item.section ? item.section : '-'}</Cell> */}

                            <Cell>
                              <div className="gap-2 flex">
                                <EditSVG
                                  clickFunction={() => {
                                    //')
                                    setval(2);

                                    dispatch(
                                      FetchClassWithSectionAction({
                                        title: item.title,
                                      }),
                                    );
                                  }}
                                />
                                <TableBtn
                                  clickFunction={() => {
                                    setInfo(item);
                                    setval(1);

                                    dispatch(
                                      FetchClassWithSectionAction({
                                        title: item.title,
                                      }),
                                    );
                                  }}
                                  text={'Add Section'}
                                  color={'bg-primary'}
                                />
                                <DeleteSVG
                                  clickFunction={() => {
                                    setInfo(3);
                                    setval(3);

                                    setname(item.title)
                                    dispatch(
                                      FetchClassWithSectionAction({
                                        title: item.title,
                                      }),
                                    );
                                    setDel(item.classId);
                                    //setVisible3(true);
                                    //handledeletbtn(item.classId)
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
                          <HeaderCell>Class</HeaderCell>
                          {/* <HeaderCell>Instructor</HeaderCell> */}
                        </HeaderRow>
                      </Header>

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                        {tableList?.map((item) => (
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
                          >
                            <Cell className="  ">
                              <span>{item.title}</span>
                            </Cell>

                            {/* <Cell className="  ">
                              <span>{item.instructor}</span>
                            </Cell> */}
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

export default Class;
