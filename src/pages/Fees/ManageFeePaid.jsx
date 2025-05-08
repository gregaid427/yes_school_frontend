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
import {
  fetchfeeAssignRecordAction,
  fetchfeeCartegoryAction,
  FetchPaymentsAction,
} from '../../redux/slices/feeSlice';
import ManageFeeModal from '../../components/AssignFeeModal';
import GenerateFeeModak from '../../components/GenerateFeeModal';
import ManageHistoryModal from '../../components/ManageHistoryModal';

const ManageFeePaid = () => {
  const formRef1 = useRef();
  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
    console.log('reset');
  }

  const [pagesval, setpagesval] = useState(60);
  const [item, setItem] = useState();

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

  const fee = useSelector((state) => state?.fees);
  const { FetchPayment,custom,reverse } = fee;




  useEffect(() => {
    if (reverse?.success == 1) {
     setVisible1(false)
     setdata(reverse?.data);
    }
    if (custom?.success == 1) {
      setVisible1(false)
      setdata(custom?.data);

     }
  }, [reverse,custom]);

  useEffect(() => {
    dispatch(FetchPaymentsAction());
  }, []);

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
      --data-table-library_grid-template-columns:  20% 10% 20% 10% 10% 20% 10%;
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
      size: 60,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  const [search, setSearch] = useState('');

  data = {
    nodes: data.nodes.filter((item) =>
      item.student_id.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  function onPaginationChange(action, state) {}

  const handleViewbtn = (value) => {
    show1('top-right');
setItem(value)
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
  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);
  }, []);
  const classdata = {
    title: classTitle.toUpperCase(),
    createdBy: username?.payload,
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
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);



  const [position, setPosition] = useState('center');

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };
  const show1 = (position) => {
    setPosition(position);
    setVisible1(true);
  };
  const show2 = (position) => {
    setPosition(position);
    setVisible2(true);
  };
  useEffect(() => {
    if (FetchPayment?.success == 1) {
      setdata(FetchPayment?.data);
    }
  }, [FetchPayment]);

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
   
      <Dialog
        visible={visible1}
        position={'top'}
        style={{ height: 'auto', width: '40%' }}
        onHide={() => {
          if (!visible1) return;
          setVisible1(false);
        }}
      >
        <ManageHistoryModal close={setVisible1} val={item} side={setVisible2}  />
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
                Fee Payment Records
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
                        {/* <HeaderCell>Section</HeaderCell> */}
                        <HeaderCell>Name</HeaderCell>
                        <HeaderCell>Class</HeaderCell>

                        <HeaderCell>Rct.ID/Activity</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell> Date</HeaderCell>
                        <HeaderCell>Received By</HeaderCell>

                        <HeaderCell>Actions</HeaderCell>
                      </HeaderRow>
                    </Header>


                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                      {tableList?.map((item) => (
                        <Row key={item.id}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
                          
                          >
                          <Cell className="capitalize">
                            {item.firstName +
                              ' ' +
                              item.otherName +
                              ' ' +
                              item.lastName}
                          </Cell>{' '}
                          <Cell className=" capitalize ">
                            <span>{item?.class?.toLowerCase()}</span>
                          </Cell>
                          <Cell className="  ">{item?.receiptid ? item?.receiptid : item?.activity}</Cell>
                          <Cell className="  ">{item?.amountpaid ? item?.amountpaid:item?.amountinvolved}</Cell>
                          <Cell className="  ">{item?.date}</Cell>
                          <Cell className="  ">{item?.collectedby}</Cell>
                          <Cell>
                            <div className="gap-2 flex">
                              <TableBtn
                                clickFunction={() =>item?.amountpaid  ? handleViewbtn(item) : ''}
                                text={'Manage'}
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
                      values={[60, 100, 200, 500, 'All']}
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


                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
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
    </DefaultLayout>
  );
};

export default ManageFeePaid;
