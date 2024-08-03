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
import {
  CreatesClassAction,
  fetchAllClassAction,
  fetchSingleClassAction,
  resetcreateClass,
} from '../redux/slices/classSlice';
import {
  CreatesExpenseAction,
  FetchExpenseHeadAction,
  deleteSingleExpenseAction,
  fetchAllExpenseAction,
  resetcreateExpense,
} from '../redux/slices/expenseSlice';
import InvencartegorySelect from '../components/InvencartegorySelect';
import ExpenseHeadSelect from '../components/ExpenseHeadSelect';
import toast from 'react-hot-toast';
import ExpenseFormModal from '../components/ExpenseFormModal';
import { Dialog } from 'primereact/dialog';

const AddExpense = () => {
  const [pagesval, setpagesval] = useState(30);
  const [amount, setAmount] = useState([]);

  const [loader, setLoader] = useState(true);

  const [name, setName] = useState(false);
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [invoice, setInvoice] = useState('');
  const [expensehead, SetExpenseHead] = useState('');
  const [file, setFile] = useState('');

  const [filename, setFileName] = useState('');


  const [nodes, setdata] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const expense = useSelector((state) => state?.expense);

  const { CreateExpense, fetchAllExpense } = expense;

  useEffect(() => {
    dispatch(fetchAllExpenseAction());
    dispatch(FetchExpenseHeadAction());
  }, []);

  useEffect(() => {
    if (CreateExpense?.success == 0) {
      toast.error('Error - Creating Expense');
      dispatch(resetcreateExpense());
      dispatch(fetchAllExpenseAction());
    }
    if (CreateExpense?.success == 1) {
      toast.success('New Expense Added Successfully');
      dispatch(resetcreateExpense());
      dispatch(fetchAllExpenseAction());
      setVisible(false);


    }
  }, [CreateExpense]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchAllExpense?.success == 1) {
      let data = fetchAllExpense?.data;
      setdata(data);
    }
    // if (loading == false) {
    //   dispatch(fetchBulkStudent());
    // }

    // }
    // datas = data;
  }, [fetchAllExpense]);

  let data = { nodes };

  const theme = useTheme([
    {
      // HeaderRow: `
      // background-color: #313D4A;A
      // border-bottom: 1px solid #fff !important;

      // `,
      HeaderRow: `
    .th {
      border-bottom: 1px solid #a0a8ae;
      padding: 5px 0px;
    `, Table: `
  --data-table-library_grid-template-columns:  30% 18% 15% 15% 22%;
  `,
      BaseCell: `
        font-size: 15px;
        color:white;
      //   border-bottom: 1px solid #313D4A !important;
      //   //  background-color: #24303F;

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
      item.name.toLowerCase().includes(search.toLowerCase()),
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
  const handledeletebtn = (value) => {
    dispatch(deleteSingleExpenseAction(value));
  };

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
 

  const show = (position) => {
    setPosition(position);
    setVisible(true);
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
        style={{ height: 'auto', width: '50%'}}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
    
      >
        <ExpenseFormModal close={setVisible} />
      </Dialog>

      <div className={'flex gap-2  w-full'}>
        <div className="w-full flex-col">
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  Expense List
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
                      style={{ color: '#A9B5B3' }}
                      onClick={(e) => {
                        handleDownloadPdf();
                      }}
                    >
                      Download Page (PDF)
                    </label>

                    <button
                        className="flex w-12/12 mt-2 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={(e) => {
                          e.preventDefault();
                          show('top-right');
                        }}
                      >
                        Add Expense
                      </button>
                  </div>

                  <div className="w-full sm:w-2/5">
                    <label
                      className="pt-2 block text-sm font-medium text-ash dark:text-white"
                      style={{ color: '#A9B5B3' }}
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
                      setSearch(e.target.value);
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
                <Table data={data} pagination={pagination}  layout={{ custom: true }} theme={theme}>
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex  ">
                          <HeaderCell>Name</HeaderCell>
                          <HeaderCell>Head</HeaderCell>
                          <HeaderCell>Date</HeaderCell>
                          <HeaderCell>Amount</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body>
                        {tableList.map((item) => (
                          <Row key={item.id} item={item} className=" ">
                            <Cell className="  ">{item.name}</Cell>

                            <Cell className="  ">{item.expensehead}</Cell>
                            <Cell className="  ">{item.date}</Cell>
                            <Cell className="  ">{item.amount}</Cell>

                            <Cell>
                              <div className="gap-2 flex">
                                <ViewSVG
                                  clickFunction={() => handleViewbtn(item)}
                                />
                                <EditSVG
                                  clickFunction={() => handleEditbtn(item)}
                                />

                                <DeleteSVG
                                  clickFunction={() =>
                                    handledeletebtn(item.id)
                                  }
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
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex  ">
                          <HeaderCell>Name</HeaderCell>
                          <HeaderCell>Head</HeaderCell>
                          <HeaderCell>Date</HeaderCell>
                          <HeaderCell>Amount</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>
                      <Body>
                        {tableList.map((item) => (
                          <Row key={item.id} item={item} className=" ">
                            <Cell className="  ">{item.name}</Cell>

                            <Cell className="  ">{item.expensehead}</Cell>
                            <Cell className="  ">{item.date}</Cell>
                            <Cell className="  ">{item.amount}</Cell>

                            <Cell>
                              <div className="gap-2 flex">
                                <ViewSVG
                                  clickFunction={() => handleViewbtn(item)}
                                />
                                <EditSVG
                                  clickFunction={() => handleEditbtn(item)}
                                />

                                <DeleteSVG
                                  clickFunction={() =>
                                    handledeletebtn(item.id)
                                  }
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
      
      </div>{' '}
    </DefaultLayout>
  );
};

export default AddExpense;
