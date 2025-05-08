import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchfeeCartegoryAction, PayFeeAction, resetpayfee } from '../../redux/slices/feeSlice';
import { fetchAllClassAction } from '../../redux/slices/classSlice';
import { fetchActivesessionAction } from '../../redux/slices/sessionSlice';
import { fetchschoolinfoAction } from '../../redux/slices/usersSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import FeeRadio from '../../components/FeeRadio';
import DefaultLayout from '../../layout/DefaultLayout';
import FeesReceiptModal from '../../components/FeesReceiptModal';
import { Dialog } from 'primereact/dialog';
import { fetchCustomStudentsClassAccountAction, fetchStudentsClassAccountAction } from '../../redux/slices/studentSlice';

const SearchCollectFee = (props) => {
  const location = useLocation();
  const { stdname, val, activeaccount, infotype, session } = location?.state;
  const clad = useSelector((state) => state?.classes);
    console.log(location?.state);
  const { fetchAllClassloading, fetchAllClass } = clad;
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state?.inventory);
  useEffect(() => {
    dispatch(fetchfeeCartegoryAction());
  }, []);
  const { CreateInventorycart } = inventory;
  const [info, setinfo] = useState();

  useEffect(() => {
    if (CreateInventorycart?.success == 0) {
      toast.error('Error - Adding Item Cartegory');
      //    dispatch(resetcreatecart())
      dispatch(fetchAllClassAction());
    }
    if (CreateInventorycart?.success == 1) {
      toast.success('Item Added Successfully');
      dispatch(fetchInventCartegoryAction());
      resetFormStates();
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
  }, [CreateInventorycart]);
  const student = useSelector((state) => state?.student);

  let data1 = {
    class: val?.class,
    section: val?.section,
  };
  function handleGetClassData() {

    
    console.log(data);
    
      dispatch(fetchStudentsClassAccountAction(data1));
   
  }

  const {
    
    fetchStudentcustombal,
   
  } = student;

  

  const [amount, setAmount] = useState(0);
  const [mode, setmode] = useState('Cash');
  const [selectedArr, setselectedArr] = useState([]);
  const fee = useSelector((state) => state?.fees);

  const { payfee,cartegory } = fee;

  const formRef1 = useRef();

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }
  let balanceresult = eval(parseInt(val?.accountbalance) - parseInt(amount));
  function receiptidGen() {
    const max = 100;
    return val?.student_id.slice(-6) + Math.floor(Math.random() * (max + 1));
  }
  let receiptid = receiptidGen();
  console.log(receiptid);
  const user = useSelector((state) => state?.user);
  const { username, userMail } = user;
  let data = {
    name: stdname,
    id: val?.student_id,
    class: val?.class,
    section: val?.section,
    collectedby: username?.payload,
    arrears: val?.arrears,
    amountpaid: amount,
    mode: mode,
    balbeforepayment: val?.accountbalance,
    balanceafterpayment: balanceresult,
    receiptid: receiptid,
    infotype: infotype,
    session: session,
    activeaccount: activeaccount,
  };
  const handleSubmit = (e) => {
    if (amount < 1) {
      return toast.error('Error - Enter Valid Amount');
    }
    if (amount > val?.accountbalance) {
      return toast.error(`Error - Amount cannot Exceed ${val?.accountbalance}`);
    } else {
      dispatch(PayFeeAction(data));
    }
  };
  useEffect(() => {
    dispatch(fetchschoolinfoAction());
    dispatch(fetchActivesessionAction());
    
  }, []);
 
  useEffect(() => {
    handleGetClassData()
  }, []);
  useEffect(() => {
    console.log(info)
    setSingleCart(
      info?.filter((item) => item?.scartegory.includes(val?.cartegory)),
    );  }, [info]);
  const [visible1, setVisible1] = useState(false);
  const [name, SetName] = useState('');
  const [propp, setProp] = useState();
  const [receipt, setReceipt] = useState('');
  const [singleCart, setSingleCart] = useState([]);
  const { allschool } = user;
  useEffect(() => {
  //  setTimeout(() => setLoader(false), 1000);

    if (payfee?.success == 1) {
      setVisible1(true);
      setReceipt(payfee?.response)
      dispatch(resetpayfee());
    }
  }, [payfee]);
 
  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchStudentcustombal?.success == 1) {
      let data = fetchStudentcustombal?.data;
      let info = fetchStudentcustombal?.info;
      setinfo(info)
    }
  }, [fetchStudentcustombal]);
  const navigate = useNavigate()
  return (
    <DefaultLayout>
      <Dialog
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
        <FeesReceiptModal
          close={setVisible1}
          val={val}
          response={receipt}
          cart={singleCart}
          school={allschool}
        />
      </Dialog>
      <div className="w-8/12">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Collect Fees
                </h3>
              </div>
              <div className="p-7">
                <form ref={formRef1}>
                  <div className="w-full flex mb-4 sm:w-2/2">
                    <label
                      className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Student ID
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={val?.student_id}
                      disabled
                    />
                  </div>
                  <div className="w-full flex mb-4 sm:w-2/2">
                    <label
                      className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Student Name
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={
                        val?.firstName +
                        ' ' +
                        val?.otherName +
                        ' ' +
                        val?.lastName
                      }
                      disabled
                    />
                  </div>

                  <div className="w-full flex mb-4 sm:w-2/2">
                    <label
                      className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Class / section
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={
                        val?.class +
                        ' ' +
                        `${val?.section ? '/' : ''}` +
                        ' ' +
                        val?.section
                      }
                      disabled
                    />
                  </div>

                  <div className="w-full border-b border-stroke py-3  dark:border-strokedark gap-3 flex mb-4 sm:w-2/2">
                    <div className="flex ">
                      {' '}
                      <label
                        className="my-auto w-full  mr-4  block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Account Balance :
                      </label>
                      <label
                        className="my-auto block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        {Math.abs(val?.accountbalance)}
                      </label>
                    </div>
                    <div className="flex ml-1 ">
                      {' '}
                      <label
                        className="my-auto mr-4  block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        ( Arrears :
                      </label>
                      <label
                        className="my-auto block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        {Math.abs(val?.arrears)}
                      </label>
                    </div>
                    <div className="flex ml-1 ">
                      {' '}
                      <label
                        className="my-auto mr-4  block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Session Fee :
                      </label>
                      <label
                        className="my-auto block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        {Math.abs(val?.feepayable)} )
                      </label>
                    </div>
                  </div>

                  <div className="flex">
                    <label
                      className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Amount Being Paid
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue=""
                      onChange={(e) => setAmount(e.target.value.trim())}
                    />
                  </div>

                  <div className="w-full flex my-4 sm:w-2/2">
                    <label
                      className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Mode Of Payment
                    </label>
                    <FeeRadio setmode={setmode} />
                  </div>

                  {/*                 
                <div className="w-full mb-3 mt-4 sm:w-2/2">
                          <label
                            className="mb-2 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Select Classes Applicable
                          </label>{' '}
                          <div>
                            {fetchAllClass?.data?.map((item, index) => (
                              <AssignFeeClassSelect
                                info={fetchAllClass?.data?.[index]}
                                selectedarr={selectedArr}
                                selected={setselectedArr}
                              />
                            ))}
                          </div>
                        </div> */}
                  <div className="flex justify-end mt-8.5 gap-4.5">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                      }}
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SearchCollectFee;
