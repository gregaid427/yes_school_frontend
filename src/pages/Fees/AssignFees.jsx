import { useEffect, useRef, useState } from 'react';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';
import ViewSVG from '../../components/Svgs/View';
import DeleteSVG from '../../components/Svgs/delete';
import EditSVG from '../../components/Svgs/edit';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
import * as XLSX from 'xlsx';

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

import Loader from '../../common/Loader';
import toast from 'react-hot-toast';
import {
  CreatesBulkClassAction,
  deleteSingleClassAction,
  fetchAllClassAction,
  fetchSingleClassAction,
  resetcreateClass,
} from '../../redux/slices/classSlice';
import TableBtn from '../../components/Svgs/TableBtn';
import ExpenseFormModal from '../../components/ExpenseFormModal';
import { Dialog } from 'primereact/dialog';
import AssignFeeModal from '../../components/AssignFeeModal';
import { fetchAllsessionAction } from '../../redux/slices/sessionSlice';
import { fetchfeeAssignRecordAction, fetchfeeCartegoryAction } from '../../redux/slices/feeSlice';

const AssignFees = () => {
  const formRef1 = useRef();
  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
    console.log('reset');
  }


  const fee = useSelector((state) => state?.fees);
  const { cartegory,Assignfee } = fee;

  const [pagesval, setpagesval] = useState(30);
  const [classs, setClasss] = useState([]);

  const [loader, setLoader] = useState(true);

  const [classname, setclasname] = useState('');
  const [sectionname, setsectionname] = useState('');

  const [display, setDisplay] = useState(false);
  const [displaytable, setDisplaytable] = useState(false);
  
  const [id, setclassId] = useState('');
  const [filename, setFileName] = useState('');
  const [file, setFile] = useState('');

  const [classTitle, setClassTitle] = useState('');
  const [classInstructor, setClassInstructor] = useState('');

  const [sections, setsections] = useState([]);

  const [nodes, setdata] = useState([]);
  const [datacart, setdatacart] = useState([]);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clad = useSelector((state) => state?.classes);

  const {
    fetchAllClassloading,
    fetchAllClass,
    sectionloading,
    CreateClasses,
    CreateClassesloading,
  } = clad;

  useEffect(() => {
    dispatch(fetchAllsessionAction());
    dispatch(fetchAllClassAction());
    dispatch(fetchfeeAssignRecordAction());

  }, []);

  useEffect(() => {
    if (CreateClasses?.success == 0) {
      //  toast.error('Error - Class Name Already Exists');
      dispatch(resetcreateClass());
      // dispatch(fetchAllClassAction())
    }
    if (CreateClasses?.success == 1) {
      // toast.success('New Class Added Successfully');
      formRef1.current.reset();

      setClassData1([]);
      resetFormStates();
      dispatch(resetcreateClass());
      // dispatch(fetchAllClassAction())
    }
  }, [fetchAllClassloading, CreateClassesloading]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (Assignfee?.success == 1) {
      let data = Assignfee?.data;
      setdata(data);
      setVisible(false)
    }
  }, [ Assignfee]);

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
        color:white;
      //   border-bottom: 1px solid #313D4A !important;
      //   //  background-color: #24303F;

      `,
      Table: `
      --data-table-library_grid-template-columns:  25% 10% 20% 10% 10% 25%;
    `,
      Row: `
  &:nth-of-type(odd) {
    background-color: #24303F;
  }

  &:nth-of-type(even) {
    background-color: #202B38;
  }
`,
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
    show('top-right');

    setclasname(value.title);
    setsectionname(value.title);
    setclassId(value.id);
  };
  const handleEditbtn = (value) => {
    dispatch(
      fetchSingleClassAction({
        classId: value.classId,
        classTitle: value.title,
      }),
    );
    navigate('/academics/class/editclass', {
      state: { action: 2, value: value },
    });
  };
  const handledeletbtn = (value) => {
    dispatch(deleteSingleClassAction(value));
    // dispatch(fetchAllClassAction());
  };
 

  useEffect(() => {
    dispatch(fetchfeeCartegoryAction());
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

    if (cartegory?.success == 1) {
      let data = cartegory?.data;
      setdatacart(data);
    }
    // if (loading == false) {
    //   dispatch(fetchBulkStudent());
    // }

    // }
    // datas = data;
  }, [cartegory]);
  const classdata = {
    title: classTitle.toUpperCase(),
    createdBy: 'Asante',
    instructor: classInstructor,
  };
  const handlecreateClass = () => {
    if (classData1.length == 0) {
      return toast.error('File Error- Choose File Again');
    } else {
      dispatch(CreatesBulkClassAction(classData1));
    }
  };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(`All-Classes-List`);
  };

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `Admission Template`,
  });
  let template = {
    firstName: '',
    otherName: '',
    lastName: '',
    religion: '',
    gender: '',
    dateofbirth: '',
    accountbalance: '',
  };
  const handleDownloadCSV = async () => {
    const csv = generateCsv(csvConfig)([template]);
    download(csvConfig)(csv);
  };

  const [classData, setClassData] = useState([]);
  const [classData1, setClassData1] = useState([]);
  const [check, setCheck] = useState(true);

  function handleFileUpload(e) {
    console.log('called');
    setCheck(false);
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setClassData(parsedData);

      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';

      function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
          );
        }

        return result;
      }

      let newArr1 = parsedData.map((v) => ({
        ...v,
        password: generateString(5),
        email: v.firstName + generateString(3).toLocaleLowerCase(),
        class: classname,
        section: sectionname,
      }));
      setClassData1(newArr1);
    };
  }
  useEffect(() => {
    console.log(classData1);
  }, [classData, check]);
  const [visible, setVisible] = useState(false);

  const [position, setPosition] = useState('center');

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };


  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
       <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <AssignFeeModal close={setVisible} />
      </Dialog>
      <div className=" flex-col">
        <div
          className={
            'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
          }
        >
          <div className="w-full overflow-x-auto">
            <div className="w-full  flex justify-between  ">
              <h3 className="font-medium text-black py-3 dark:text-white">
                Assigned Fee List
              </h3>
            </div>
          </div>
        </div>
        <div
          className={
            'rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
          }
        >
          <div className="w-full  flex gap-7">
            <div className=" flex w-9/12 justify-between gap-4">
              <div className=" ">
                <button
                  className="flex  justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={() => {
                    show('top-right');
                  }}
                >
                  Assign Fee
                </button>
              </div>
              <div className='flex gap-6'>
              
              <div className="  float-end">
                <button
                  className="flex  justify-center rounded bg-dark border border-stroke py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={() => {
                    handleDownloadCSV();
                  }}
                >
                  Delete Assigned Fees{' '}
                </button>
              </div>
            </div>
            </div>
            <div className={' w-3/12 flex flex-col '}>
              <div className="flex justify-between align-middle ">
                <label
                  className=" w-2/2  block text-sm font-medium text-black dark:text-white"
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
                  setSearch(e.target.value);
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
                        <HeaderCell>Total Fees</HeaderCell>
                        <HeaderCell>Date Assigned</HeaderCell>
                        <HeaderCell>Assigned By</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                        <HeaderCell>Actions</HeaderCell>


                      </HeaderRow>
                    </Header>

                    <Body>
                      {tableList.map((item) => (
                        <Row key={item.id} item={item} className=" ">
                          <Cell className="  ">{item.class}</Cell>
                          <Cell className="  ">{item.total}</Cell>

                          <Cell className="  ">{item.createdat}</Cell>
                          <Cell className="  ">{item.createdby}</Cell>
                          <Cell className="  ">{item.status}</Cell>


                          <Cell>
                            <div className="gap-2 flex">
                              <EditSVG
                                clickFunction={() => handleViewbtn(item)}
                                text={'View'}
                                color={'bg-primary'}
                              />
                              <TableBtn
                                clickFunction={() => handleViewbtn(item)}
                                text={'Apply'}
                                color={'bg-primary'}
                              />
                              <DeleteSVG
                                clickFunction={() => handleViewbtn(item)}
                               
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

                    <Body>
                      {tableList.map((item) => (
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

      {/* <div className={display ? 'hidden' : 'grid w-4/12  gap-8'}>
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Upload Class Data
                </h3>
              </div>
              <div className="p-7">
                <form ref={formRef1}>
                  <div className="w-full mb-4 sm:w-2/2">
                    <label
                      className="mb-3 block text-sm font-small text-black dark:text-white"
                      htmlFor=""
                    >
                      Class
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={classname}
                    />
                  </div>

                  <div className="w-full mb-4 sm:w-2/2">
                    <label
                      className="mb-3 block text-sm font-small text-black dark:text-white"
                      htmlFor=""
                    >
                      Section
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={sectionname}
                    />
                  </div>

                  <div className="w-full sm:w-2/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Select Excel File{' '}
                    </label>
                    <input
                      onChange={(e) => {
                        // setFile(event.target.files[0]);
                        // setFileName(event.target.files[0].name);
                        handleFileUpload(e);
                      }}
                      type="file"
                      accept=".xlsx, .xls"
                      className="w-full rounded-md border border-stroke p-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                    />
                  </div>

                  <div className="flex justify-end mt-5 gap-4.5">
                    <button
                      className={
                        true
                          ? 'flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90'
                          : 'hidden'
                      }
                      type=""
                      onClick={(e) => {
                        e.preventDefault();

                        handlecreateClass(e);
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
        </div> */}
    </DefaultLayout>
  );
};

export default AssignFees;
