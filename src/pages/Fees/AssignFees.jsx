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
import { fetchAllsessionAction } from '../../redux/slices/sessionSlice';
import {
  deleteFeeCartItemAction,
  deleteGoupFeeCartAction,
  deleteSingleFeeCartAction,
  fetchAllfeeAssignRecordAction,
  fetchfeeAssignGroupRecordAction,
  fetchfeeAssignRecordAction,
  fetchfeeCartegoryAction,
} from '../../redux/slices/feeSlice';
import AssignFeeModal from '../../components/AssignFeeModal';
import AssignFeeModalClass from '../../components/AssignFeeModalClass';
import AssignFeeModalPartial from '../../components/AssignFeeModalPartial';
import { fetchstdCartegoryAction } from '../../redux/slices/studentSlice';
import DeleteIcon from '../../components/Svgs/deleteIcon';
import EditIcon from '../../components/Svgs/editIcon';
import DeleteModal from '../../components/DeleteModal';

const AssignFees = () => {
  const formRef1 = useRef();
  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
    console.log('reset');
  }
  useEffect(() => {
    dispatch(fetchstdCartegoryAction());
  }, []);
  const fee = useSelector((state) => state?.fees);
  const {
    cartegory,
    Assignfee,
    AssignfeeGroup,
    AllAssignfee,
    updateFeeCartItem,
  } = fee;

  const [pagesval, setpagesval] = useState(30);
  const [classs, setClass] = useState();

  const [loader, setLoader] = useState(true);

  const [cart, setcart] = useState('');
  const [sectionname, setsectionname] = useState('');

  const [display, setDisplay] = useState(false);
  const [displaytable, setDisplaytable] = useState(false);

  const [id, setclassId] = useState('');
  const [filename, setFileName] = useState('');
  const [file, setFile] = useState('');

  const [classTitle, setClassTitle] = useState('');
  const [info, setInfo] = useState();

  const [propdata, setpropdata] = useState();
  const [del, setDel] = useState();

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
    //  dispatch(fetchAllsessionAction());
    dispatch(fetchAllClassAction());
    dispatch(fetchAllfeeAssignRecordAction());
    // dispatch(fetchfeeAssignGroupRecordAction());
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
    // setTimeout(() => setLoader(false), 1000);

    if (AssignfeeGroup?.success == 1) {
      let data = AssignfeeGroup?.data;
      console.log(data);
      setdata(data);
      setVisible(false);
      dispatch(fetchAllfeeAssignRecordAction());
    }
  }, [AssignfeeGroup]);

  fetchAllClass;

  // useEffect(() => {
  //   setTimeout(() => setLoader(false), 1000);

  //   if (AssignfeeGroup?.success == 1) {
  //     let data = AssignfeeGroup?.data;
  //     setdata(data);
  //     setVisible(false);
  //   }
  // }, [AssignfeeGroup]);

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
      --data-table-library_grid-template-columns:  31% 26%  10% 15% 18%;
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
  const [visible1, setVisible1] = useState(false);

  function onPaginationChange(action, state) {}

  const [search, setSearch] = useState('');

  useEffect(() => {
    //  setTimeout(() => setLoader(false), 1000);

    if (fetchAllClass?.success == 1) {
      let data = fetchAllClass?.data;
      setdata(data);
      //  setVisible1(false)
    }
  }, [fetchAllClass]);

  useEffect(() => {
    // setTimeout(() => setLoader(false), 1000);

    if (AllAssignfee?.success == 1) {
      let data = AllAssignfee?.data;
      setInfo(data);
      //  setVisible1(false)
      setLoader(false);
    }
  }, [AllAssignfee]);

  useEffect(() => {
    dispatch(fetchAllClassAction());
    // dispatch(fetchAllClassNoAction());
  }, []);

  // data = {
  //   nodes: data.nodes.filter((item) =>
  //     item.title.toLowerCase().includes(search.toLowerCase()),
  //   ),
  // };

  function onPaginationChange(action, state) {}

  const handleViewbtn = (value, cart) => {
    setVisible1(true);
    console.log(AllAssignfee);
    let myArr = [];
    myArr = AllAssignfee?.data.filter(
      (item) =>
        item.scartegory.toLowerCase().includes(cart.toLowerCase()) &&
        item.class.toLowerCase().includes(value.toLowerCase()),
    );
    setpropdata(myArr);
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

  useEffect(() => {
    dispatch(fetchfeeCartegoryAction());
  }, []);

  useEffect(() => {
    if (Assignfee?.success == 1) {
      setVisible(false);
      setVisible1(false);
      setVisible2(false);
    }
  }, [Assignfee]);

  useEffect(() => {
    //   setTimeout(() => setLoader(false), 1000);

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

  useEffect(() => {
    if (updateFeeCartItem?.success == 1) {
      setVisible10(false);
    }
  }, [updateFeeCartItem]);

  useEffect(() => {
    for (let x = 0; x >= fetchAllClass?.data?.length; x + 1) {
      if (fetchAllClass?.data[x] == 1) {
      }
    }
  }, []);

  const [classData1, setClassData1] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible8, setVisible8] = useState(false);
  const [visible9, setVisible9] = useState(false);
  const [visible10, setVisible10] = useState(false);

  const [position, setPosition] = useState('center');

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };
  console.log(info);
  deleteSingleFeeCartAction;
  const handledeletebtn1 = () => {
    const data = {
      cart: cart,
      class: del,
    };
    dispatch(deleteSingleFeeCartAction(data));
  };
  const handledeletebtn = () => {
    const data = {
      id: del.id,
      name: del.feeid,
      class: del,
    };
    //  dispatch(deleteSingleFeeCartAction(data));
    dispatch(deleteGoupFeeCartAction(data));
  };
  const handledeletebtn2 = () => {
    const data = {
      id: del,
    };
    //  dispatch(deleteSingleFeeCartAction(data));
    dispatch(deleteFeeCartItemAction(data));
  };

  console.log(del);

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
      <Dialog
        visible={visible1}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible1) return;
          setVisible1(false);
        }}
      >
        <AssignFeeModalClass close={setVisible1} data={propdata} />
      </Dialog>
      <Dialog
        visible={visible10}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible10) return;
          setVisible10(false);
        }}
      >
        <AssignFeeModalClass close={setVisible10} data={del} />
      </Dialog>
      {/* <Dialog
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
      </Dialog> */}
      <Dialog
        visible={visible2}
        position={'top'}
        style={{ height: 'auto', width: '35%' }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
      >
        <AssignFeeModalPartial
          close={setVisible2}
          data={classs}
          cartegory={cart}
        />
      </Dialog>

      <Dialog
        visible={visible5}
        position={'top'}
        style={{ height: 'auto', width: '40%' }}
        onHide={() => {
          if (!visible5) return;
          setVisible1(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DeleteModal delete={handledeletebtn} close={setVisible5} />
      </Dialog>

      <Dialog
        visible={visible9}
        position={'top'}
        style={{ height: 'auto', width: '40%' }}
        onHide={() => {
          if (!visible9) return;
          setVisible1(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DeleteModal delete={handledeletebtn2} close={setVisible9} />
      </Dialog>

      <Dialog
        visible={visible8}
        position={'top'}
        style={{ height: 'auto', width: '40%' }}
        onHide={() => {
          if (!visible8) return;
          setVisible1(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DeleteModal delete={handledeletebtn1} close={setVisible8} />
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
                  className="flex  justify-center rounded bg-primary py-2 px-5 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={() => {
                    show('top-right');
                  }}
                >
                  Assign Fee For Class
                </button>
              </div>
            </div>
         
          </div>
        </div>
        <div
          className={
            'rounded-sm  w-full border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
          }
        >
          {info?.map((item, index) => (
            <>
              <div className="flex gap-3 px-6  my-6 flex-col">
                <div className="w-full border-b border-t border-stroke dark:border-stone-500 py-1 dark:bg-boxdark  flex-col">
                  <div
                    className={
                      'rounded-sm  max-w-full   px-5 shadow-default   '
                    }
                  >
                    <div className="w-full overflow-x-auto flex justify-between">
                      <div className="  flex justify-between  ">
                        <h3 className="font-bold text-sm text-black py-1 dark:text-white">
                          {item[0][0]?.class}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        {' '}
                        <button
                          className="flex  float-end rounded bg-primary py-1 px-2 font-medium text-sm  text-gray hover:bg-opacity-90"
                          type=""
                          onClick={() => {
                            setClass(item[0][0]?.class);
                            //setcart(item?.scartegory)
                            setVisible2(true);
                          }}
                        >
                          Add Class Cartegory
                        </button>
                        <button
                          className="flex  float-end rounded bg-danger py-1 px-2 font-medium text-sm  text-gray hover:bg-opacity-90"
                          type=""
                          onClick={() => {
                            setDel(item[0][0]?.class);
                            setVisible5(true);
                            //  dispatch(fetchfeeAssignGroupRecordAction());
                          }}
                        >
                          Delete All
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      'rounded-sm px-1 py-2 '
                    }
                  >
                    <div className="w-full">
                      <div className={'w-full flex flex-col gap-1'}>
                        {false ? (
                          <label className=" flex  text-sm font-bold text-ash dark:text-white">
                            ⚠️ No Fee Cartegory Available
                          </label>
                        ) : (
                          <div className="grid  grid-cols-3 gap-1">
                            {' '}
                            {item?.map((subitem, index) => (
                              <>
                               
                               
                                <div
                                  className={
                                    'flex flex-col w-full gap-1  border  border-stroke dark:border-stone-700 rounded p-2 '
                                  }
                                >
                                  <div className="flex justify-between">
                                    <label className=" flex   text-sm font-bold text-ash dark:text-white">
                                      <div
                                        className={`mr-1 flex h-4 w-4 items-center justify-center rounded border ${
                                          true &&
                                          'border-primary bg-gray dark:bg-transparent'
                                        }`}
                                      >
                                        <span
                                          className={`h-2.5 w-2.5 rounded-sm ${true && 'bg-primary'}`}
                                        ></span>
                                      </div>{' '}
                                      {subitem[0]?.scartegory}
                                    </label>
                                  </div>
                                  <div className="flex flex-col">
                                    {subitem[index]?.feename == undefined ? (
                                      <p>⚠️ No Fee Items Assigned </p>
                                    ) : (
                                      subitem?.map((item, index) => (
                                        <div className="flex" key={index}>
                                          <div className="flex w-full  justify-between mr-2">
                                            <label className=" flex gap-1  text-sm font-small text-ash dark:text-white">
                                              - {item?.feename}
                                            </label>
                                            <label className=" flex gap-1  text-sm font-small text-ash dark:text-white">
                                              {item?.amount}
                                            </label>
                                          </div>

                                          <div className="">
                                            <div className="flex">
                                              <EditIcon
                                                clickFunction={() => {
                                                  setDel(item);
                                                  setVisible10(true);
                                                }}
                                              />
                                              <DeleteIcon
                                                clickFunction={() => {
                                                  setDel(item?.id);
                                                  setVisible9(true);
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ))
                                    )}

                                    <div
                                      className={
                                        subitem[index]?.feename == undefined
                                          ? 'hidden'
                                          : 'flex'
                                      }
                                    >
                                      <div className="flex  w-full justify-between">
                                        <label className=" flex gap-1 float-end  text-sm font-bold text-ash dark:text-white">
                                          Total : {subitem[index]?.total}
                                        </label>
                                        <label className=" flex gap-1  text-md font-bold text-ash dark:text-white">
                                          {/* {item.total} */}
                                        </label>
                                      </div>
                                    </div>
                                    <div
                                      className={
                                        subitem[index]?.feename == undefined
                                          ? 'hidden'
                                          : 'flex float-end justify-items-end justify-end align-text-bottom '
                                      }
                                    >
                                      {/* <TableBtn
                                      clickFunction={() => {
                                        // setinfo(item);
                                        // setVisible9(true);
                                      }}
                                      text={'Add Item'}
                                      color={'bg-[#475768d8]'}
                                    /> */}
                                      <TableBtn
                                        clickFunction={() => {
                                          setDel(subitem[index]?.class);
                                          setcart(subitem[index]?.scartegory);
                                          setVisible8(true);
                                        }}
                                        text={'Delete Cartegory'}
                                        color={'bg-[#475768d8]'}
                                      />
                                    </div>
                                  </div>
                                </div>
                            
                            
                              </>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>{' '}
              </div>
            </>
          ))}
        </div>{' '}
      </div>
    </DefaultLayout>
  );
};

export default AssignFees;
