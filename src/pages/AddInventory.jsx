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

import { Dialog } from 'primereact/dialog';

import Loader from '../common/Loader';
import toast from 'react-hot-toast';
import {
  CreatesInventoryAction,
  deleteSingleInventoryAction,
  fetchAllInventoryAction,
  fetchInventCartegoryAction,
  resetcreateInventory,
} from '../redux/slices/inventSlice';
import InvencartegorySelect from '../components/InvencartegorySelect';
import InventNewCartegory from '../components/InventNewCartegory';



const AddInventory = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
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

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  const [pagesval, setpagesval] = useState(30);
  const [item, setItem] = useState([]);

  const [loader, setLoader] = useState(true);
  const [quantity, setQuantity] = useState(0);

  const [supName, setSupName] = useState('');
  const [supContact1, setSupContact1] = useState('');
  const [supContact2, setSupContact2] = useState('');
  const [supInfo, setSupInfo] = useState('');
  const [desc, setDesc] = useState('');

  const [cart, setcart] = useState('');
  const [type, setType] = useState('Theory');

  const [subjectName, setSubjectName] = useState([]);

  const [nodes, setdata] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inventory = useSelector((state) => state?.inventory);
  const { CreateInventory, fetchAllInventory } = inventory;

  useEffect(() => {
    dispatch(fetchAllInventoryAction());
    dispatch(fetchInventCartegoryAction());
  }, []);

  useEffect(() => {
    if (CreateInventory?.success == 0) {
      toast.error('Error - Adding New Item');
      dispatch(resetcreateInventory());
    }
    if (CreateInventory?.success == 1) {
      toast.success('New Item Added Successfully');
      dispatch(resetcreateInventory());
    //  dispatch(fetchAllInventoryAction());
    }

   
  }, [CreateInventory]);
  const formRef1 = useRef();

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchAllInventory?.success == 1) {
      let data = fetchAllInventory?.data;
      setdata(data);
    }
    // if (loading == false) {
    //   dispatch(fetchBulkStudent());
    // }

    // }
    // datas = data;
  }, [fetchAllInventory]);

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
  console.log(data);
  data = {
    nodes: data.nodes.filter((item) =>
      item.itemName.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  function onPaginationChange(action, state) {}

  const handleViewbtn = (value) => {
 
    navigate('/inventory/editinventory', {
      state: { action: 2, info: value },
    });
  };
  const handleEditbtn = (value) => {
    console.log(value.type);
    navigate('/inventory/editinventory', {
      state: { action: 1, info: value },
    });
  };
  const handledeletebtn = (value) => {
    dispatch(deleteSingleInventoryAction(value));
  };

  const subdata = {
    itemName: item,
    cartegory: cart,
    quantity: quantity,
    supplier: supName,
    CreatedBy: 'Asante',
    supplierContact1: supContact1,
    supplierContact2: supContact2,
    SupplierInfo: supInfo,
    description: desc,
  };
  const handleSubmit = (e) => {
    if (item == '') {
      toast.error('Error - Item Cannot Be Empty');
    } else {
      dispatch(CreatesInventoryAction(subdata));
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (classtitle == '') return toast.error('Please Fill Out Required Fields');
  //   const data = {
  //     id: info.id,
  //     subjectname: classtitle,
  //     type: isChecked1 == true ? 'Theory' : 'Practical',
  //     createdby: 'asante'

  //   };
  //   dispatch(UpdateSubjectAction(data));
  // };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(`Inventory-List`);
  };

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `Inventory-List`,
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
        style={{ height: 'auto', width: 'auto', marginRight: '30px' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
        draggable={false}
        resizable={false}
      >
        <InventNewCartegory close={setVisible} />
      </Dialog>
      <div className={'flex gap-1  w-full'}>
        <div className="w-8/12 flex-col">
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  Item List
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
                      Search Item{' '}
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
                <Table data={data} pagination={pagination} theme={theme}>
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex ">
                          <HeaderCell>Item</HeaderCell>

                          <HeaderCell>Quantity</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body>
                        {tableList.map((item) => (
                          <Row key={item.id} item={item} className=" ">
                            <Cell className="  ">{item.itemName}</Cell>

                            <Cell className="  ">{item.quantity}</Cell>

                            <Cell>
                              <div className="gap-2 flex">
                                <ViewSVG
                                  clickFunction={() => handleViewbtn(item)}
                                />
                                <EditSVG
                                  clickFunction={() => handleEditbtn(item)}
                                />
                                <DeleteSVG
                                  clickFunction={() => handledeletebtn(item.id)}
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
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex ">
                          <HeaderCell>Item</HeaderCell>

                          <HeaderCell>Quantity</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body>
                        {tableList.map((item) => (
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
                          >
                            <Cell className="  ">{item.itemName}</Cell>

                            <Cell className="  ">{item.quantity}</Cell>
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
        <div className="w-2/12 mr-5">
          <div className="grid  gap-8">
            <div className="col-span-12">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Add Item
                  </h3>
                </div>
                <div className="p-7">
                  <form ref={formRef1}>
                    <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Item
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue=""
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </div>

                    <div className="w-full mb-3 sm:w-2/2">
                      <div className="flex justify-between align-middle">
                        <label
                          className="mb-2 block align-middle  text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Item Cartegory{' '}
                          {/* <span className="small-font">(optional)</span> */}
                        </label>
                        <button
                          className="flex align-middle justify-center rounded-full  bg-[#3c4fe08f] py-0 mb-1 px-2 my-auto text-sm text-white hover:bg-opacity-90"
                          type=""
                          onClick={(e) => {
                            e.preventDefault();
                            show('top-right');
                          }}
                        >
                          Add New Cartegory
                        </button>
                      </div>

                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <InvencartegorySelect setsectionprop={setcart}  default={'NONE'}/>
                      </div>
                    </div>
                    <div className="w-full mb-3 sm:w-2/2">
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Quantity{' '}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue="0"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <div className="w-full mb-3 sm:w-2/2">
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Supplier Name{' '}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue=""
                        onChange={(e) => setSupName(e.target.value)}
                      />
                    </div>
                    <div className="w-full flex gap-1">
                      <div className="w-full mb-3 sm:w-1/2">
                        <label
                          className="mb-2 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Supplier Contact 1{' '}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name=""
                          id=""
                          placeholder=""
                          defaultValue=""
                          onChange={(e) => setSupContact1(e.target.value)}
                        />
                      </div>
                      <div className="w-full mb-3 sm:w-1/2">
                        <label
                          className="mb-2 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Supplier Contact 2{' '}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name=""
                          id=""
                          placeholder=""
                          defaultValue=""
                          onChange={(e) => setSupContact2(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Supplier Info
                      </label>
                      <div className="relative">
                        <textarea
                          className="w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="bio"
                          id="bio"
                          rows={2}
                          placeholder=""
                          onChange={(e) => setSupInfo(e.target.value)}
                        ></textarea>
                      </div>
                    </div>

                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Description/Notes
                      </label>
                      <div className="relative">
                        <textarea
                          className="w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="bio"
                          id="bio"
                          rows={2}
                          placeholder=""
                          onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit(e);
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
          </div>
        </div>
      </div>{' '}
    </DefaultLayout>
  );
};

export default AddInventory;
