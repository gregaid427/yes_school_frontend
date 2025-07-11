import { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';
import ViewSVG from '../../components/Svgs/View';
import DeleteSVG from '../../components/Svgs/delete';
import EditSVG from '../../components/Svgs/edit';
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

import Loader from '../../common/Loader';

import toast from 'react-hot-toast';
import {
  CreatesInventoryAction,
  CreatesInventoryStockAction,
  deleteSingleInventoryStockAction,
  fetchAllInventoryAction,
  fetchInventCartegoryAction,
  fetchInventoryStockAction,
  resetcreateInventory,
  resetcreatestock,
} from '../../redux/slices/inventSlice';
import InvencartegorySelect from '../../components/InvencartegorySelect';
import InventNewCartegory from '../../components/InventNewCartegory';
import InventItemSelect from '../../components/inventItemSelect';
import InventSupplierSelect from '../../components/InventSupplierSelect';
import DeleteModal from '../../components/DeleteModal';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';

const AddInventoryStock = () => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [del, setDel] = useState(false);


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
  const [item, setItem] = useState('');

  const [loader, setLoader] = useState(true);
  const [quantity, setQuantity] = useState(0);

  const [supName, setSupName] = useState('');
  const [date, setDate] = useState('');
  const [availableQty, setAvailableQty] = useState(0);
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(0);

  const [cart, setcart] = useState('');
  const [nodes, setdata] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inventory = useSelector((state) => state?.inventory);
  const {
    CreateInventory,
    fetchAllInventory,
    CreateInventorystock,
    fetchInventoryStock,
    deleteSingleInventorystock
  } = inventory;

  useEffect(() => {
    dispatch(fetchAllInventoryAction());
    dispatch(fetchInventCartegoryAction());
    dispatch(fetchInventoryStockAction());
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
    if (CreateInventorystock?.success == 0) {
      toast.error('Error - Stockng Item');
      dispatch(resetcreatestock());
      // dispatch(fetchAllClassAction())
    }
    if (CreateInventorystock?.success == 1) {
      toast.success('Item Stocked Successfully');
      dispatch(resetcreatestock());
      dispatch(fetchInventoryStockAction());
    }

    // if (fetchAllClass?.success == 1) {
    //   let i = 0;
    //   let arr = [];
    //   while (i < clad?.fetchAllClass?.data.length) {
    //     arr.push(clad?.fetchAllClass?.data[i].title);
    //     i++;
    //   }

    //   setClasss(arr);
    // }
  }, [CreateInventorystock]);
  const formRef1 = useRef();

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);
    if (fetchInventoryStock?.success == 1) {
      let data = fetchInventoryStock?.data;
      setdata(data);
    }
    // if (loading == false) {
    //   dispatch(fetchBulkStudent());
    // }

    // }
    // datas = data;
  }, [fetchInventoryStock]);

  let data = { nodes };

  const theme = useTheme([
    {
      Table: `
      --data-table-library_grid-template-columns:  45% 20% 0% 35%;
    `,
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
  const [val, setVal] = useState(0);


  data = {
    nodes: data.nodes.filter((item) =>
      item.item.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  function onPaginationChange(action, state) {}

  const handleViewbtn = (value) => {
    let data = {
      id: value.id,
      itemName: value.item,
      availableqty: '0',
      quantity: value.quantity,
      cartegory: value.cartegory,
      supplier: value.supplier,
      note: value.note,
    };
    navigate('/inventory/editinventory', {
      state: { action: 2, info: data },
    });
  };
  const handleEditbtn = (value) => {
    console.log(value);
    let data = {
      id: value.id,
      itemName: value.item,
      availableqty: '0',
      quantity: value.quantity,
      cartegory: value.cartegory,
      supplier: value.supplier,
      note: value.note,
    };
    navigate('/inventory/editinventory', {
      state: { action: 1, info: data },
    });
  };
  const handledeletebtn = (value) => {
    dispatch(deleteSingleInventoryStockAction({id:del}));
  };
  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;
  const subdata = {
    item: item,
    cartegory: cart,
    quantity: quantity,
    supplier: supName,
    CreatedBy: username?.payload,
    note: desc,
    availableqty: availableQty,
    date: date,
    price: price,
  };
  const handleSubmit = (e) => {
    if (item == '') {
      toast.error('Error - Item Cannot Be Empty');
    } else {
      dispatch(CreatesInventoryStockAction(subdata));
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (classtitle == '') return toast.error('Please Fill Out Required Fields');
  //   const data = {
  //     id: info.id,
  //     subjectname: classtitle,
  //     type: isChecked1 == true ? 'Theory' : 'Practical',
 

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
  useEffect(() => {
    if (deleteSingleInventorystock?.success == 1) {
      setVisible1(false)
    }
   
  }, [deleteSingleInventorystock]);

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Dialog
        visible={visible}
        position={'bottom-right'}
        style={{ height: 'auto', width: 'auto', marginRight: '30px' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      
        draggable={false}
        resizable={false}
      >
        <InventNewCartegory close={setVisible} />
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
        <DeleteModal delete={handledeletebtn} close={setVisible1} />
      </Dialog>
      <div className={'flex gap-3 w-full'}>
        <div className="w-4/12 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Item Stock
              </h3>
            </div>
            <div className="p-4">
              <form ref={formRef1}>
                <div className="w-full mb-4 sm:w-2/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Item
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <InventItemSelect setsectionprop={setItem} />
                  </div>
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
                  </div>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <InvencartegorySelect
                      setsectionprop={setcart}
                      default={'NONE'}
                    />
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
                    onChange={(e) => setQuantity(e.target.value.trim())}
                  />
                </div>
                <div className="w-full mb-3 sm:w-2/2">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Supplier{' '}
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <InventSupplierSelect
                      setsectionprop={setSupName}
                      default={'NONE'}
                    />
                  </div>
                </div>
                <div className="w-full flex gap-1">
                  <div className="w-full mb-3 sm:w-1/2">
                    <label
                      className="mb-2 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Purchase Price{' '}
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue="0.00"
                      onChange={(e) => setPrice(e.target.value.trim())}
                    />
                  </div>
                  <div className="w-full mb-3 sm:w-1/2">
                    <label
                      className="mb-2 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Date{' '}
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="date"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue=""
                      onChange={(e) => setDate(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="emailAddress"
                  >
                    Attach Document
                  </label>
                  <div className="relative">
                    <input
                      onChange={(event) => getFileInfo(event)}
                      type="file"
                      accept="image/*"
                      className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="emailAddress"
                  >
                    Notes
                  </label>
                  <div className="relative">
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="bio"
                      id="bio"
                      rows={2}
                      placeholder=""
                      onChange={(e) => setDesc(e.target.value.trim())}
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

        <div className="w-8/12 flex-col">
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  Item Stock List
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
                      Search Item{' '}
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
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex ">
                          <HeaderCell>Item</HeaderCell>

                          <HeaderCell>Quantity</HeaderCell>
                          <HeaderCell>Available Qty</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

  
                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                        {tableList?.map((item) => (
                          <Row key={item.id}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] "
                          
                          >
                            <Cell className="  ">{item.item}</Cell>

                            <Cell className="  ">{item.quantity}</Cell>
                            <Cell className="  ">{item.availableqty}</Cell>

                            <Cell>
                              <div className="gap-2 flex">
                                <ViewSVG
                                  clickFunction={() => handleViewbtn(item)}
                                />
                                <EditSVG
                                  clickFunction={() => handleEditbtn(item)}
                                />
                                 <DeleteSVG
                                  clickFunction={() => {
                                    setVisible1(true);
                                    setDel(item.id);
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
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex ">
                          <HeaderCell>Item</HeaderCell>

                          <HeaderCell>Quantity</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

  
                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                        {tableList?.map((item) => (
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
      </div>{' '}
    </DefaultLayout>
  );
  
};

export default AddInventoryStock;
