import React, { useEffect, useRef, useState } from 'react';
import {
  CreatesInventoryCartegoryAction,
  fetchInventCartegoryAction,
  resetcreatecart,
} from '../redux/slices/inventSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { CustomBalUpdate, PayFeeAction, ReverseFee } from '../redux/slices/feeSlice';
import { fetchAllClassAction } from '../redux/slices/classSlice';
import { fetchActivesessionAction } from '../redux/slices/sessionSlice';
import { fetchschoolinfoAction } from '../redux/slices/usersSlice';

const ManageHistoryModal = (props) => {
  const clad = useSelector((state) => state?.classes);

  const { fetchAllClassloading, fetchAllClass } = clad;
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state?.inventory);

  const { CreateInventorycart } = inventory;
  useEffect(() => {
    if (CreateInventorycart?.success == 0) {
      toast.error('Error - Adding Item Cartegory ');
      //    dispatch(resetcreatecart())
      dispatch(fetchAllClassAction());
    }
    if (CreateInventorycart?.success == 1) {
      toast.success('Item Added Successfully');
      dispatch(fetchInventCartegoryAction());
      resetFormStates();
      props.close(false);
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

  const [amount, setAmount] = useState(0);
  const [mode, setmode] = useState(null);

  const [selectedArr, setselectedArr] = useState([]);

  const formRef1 = useRef();

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }
  let balanceresult = eval(
    parseInt(props.val?.accountbalance) - parseInt(amount),
  );
  function receiptidGen() {
    const max = 100;
    return (
      props.val?.student_id.slice(-6) + Math.floor(Math.random() * (max + 1))
    );
  }
  let receiptid = receiptidGen();
  console.log(receiptid);
  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;
  let data = {
    id: props.val?.student_id,
    class: props.val?.class,
    collectedby: username?.payload,
    amount: props.val?.amountpaid,
    reverseamount: props.val?.balbeforepayment
  
  };
  let data1 = {
    id: props.val?.student_id,
    class: props.val?.class,
    collectedby: username?.payload,
    amount: amount
  
  };
  const handleSubmit = (e) => {
    console.log(data)
    if (amount < 1) {
      return toast.error('Error - Enter Valid Amount');
    }
    else {
      dispatch(CustomBalUpdate(data1));
    }
  };
  const handleReverse = (e) => {
    console.log(props.val)

      dispatch(ReverseFee(data));
    
  };
  useEffect(() => {
    dispatch(fetchschoolinfoAction());
    dispatch(fetchActivesessionAction());
  }, []);

  return (
    <div className="w-full">
      <div className="grid  gap-8">
        <div className="col-span-12">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
            <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Manage Paid Fees
              </h3>
            </div>
            <div className="p-7">
              <form ref={formRef1}>
                <div className="w-full flex mb-1 sm:w-2/2">
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
                    defaultValue={props.val?.student_id}
                    disabled
                  />
                </div>
                <div className="w-full flex mb-1 sm:w-2/2">
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
                      props.val?.firstName +
                      ' ' +
                      props.val?.otherName +
                      ' ' +
                      props.val?.lastName
                    }
                    disabled
                  />
                </div>

                <div className="w-full flex mb-1 sm:w-2/2">
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
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
                    defaultValue={props.val?.class}
                    disabled
                  />
                </div>

                <div className="border-b border-t my-3 border-stroke py-1 px-7 dark:border-strokedark">
                  <p>
                    <span className="flex justify-around text-black dark:text-white text-md text-center mx-auto">
                      Manage Paid Fee
                    </span>
                  </p>
                </div>
                <div className="w-full flex ">
                  <div className="border-r py-2 text-black dark:text-white  text-sm flex pr-1 float-end flex-col w-1/2 border-stroke  dark:border-strokedark">
                    <div className="flex w-full justify-between float-end">
                      <p>Amount Paid </p> {props?.val?.amountpaid}
                    </div>
                    {/* <div className="flex float-end">
                       Arrears : {eval(props.val?.feepayable - props?.response?.balbeforepayment)}
                    </div> */}
                    {/* <div className="flex w-full justify-between float-end">
                      <p>Previous Session Arrears </p> {props?.val?.arrears}
                    </div> */}
                    <div className="flex w-full justify-between float-end">
                      <p>Balance Before Payment </p>{' '}
                      {props?.val?.balbeforepayment}
                    </div>

                    <div className="flex w-full justify-between font-bold float-end">
                      <p>Current Balance </p> {props?.val?.balanceafterpayment}
                    </div>
                  </div>
                  <div className="w-1/2 pl-2 gap-2 flex-col flex  ">
                    <button
                      className="flex  justify-center rounded bg-primary py-1 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        setmode(true)

                      }}
                    >
                      Reverse Payment
                    </button>{' '}
                    <button
                      className="flex  justify-center rounded bg-primary py-1 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                       // handleSubmit();
                       setmode(false)

                      }}
                    >
                      Update Balance
                    </button>
                  </div>
                </div>

                <div className={mode == false ? '' :'hidden'}>
                   <div className="border-b flex flex-col my-3 py-3 border-t border-stroke dark:border-strokedark">
                  <p>
                    <span className="flex justify-around text-md py-1 text-center mx-auto">
                      Update Student's Account balance
                    </span>
                  </p>
                  <div className="gap-2 flex ">
                    <div className="w-full flex mb-1 sm:w-2/2">
                      <label
                        className="my-auto w-3/5 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Accnt Balance
                      </label>
                      <input
                        className="w-2/5 rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name=""
                        id=""
                        placeholder=""
                        onChange={(e) => {
                          setAmount(e.target.value.trim());
                        }}
                      />
                    </div>
                    <div className="w-full flex mb-1 sm:w-2/2">
                    <button
                      className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      Update
                    </button>{' '}
                    </div>
                  </div>
             
               
                </div>
                </div> 
                <div className={mode == true ? '' :'hidden'}>
                   <div className="border-b flex flex-col my-3 py-3 border-t border-stroke dark:border-strokedark">
                  <p>
                    <span className="flex text-black dark:text-white justify-around text-md py-1 text-center mx-auto">
                      Reverse Paid Fee
                    </span>
                  </p>
                  <div className="gap-2 flex ">
                    <div className="w-full flex mb-1 sm:w-2/2">
                      <label
                        className="my-auto w-3/5 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                         Reverse Payment of {props?.val?.amountpaid} 
                      </label>
                   
                    </div>
                    <div className="w-full flex mb-1 sm:w-2/2">
                    <button
                      className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        handleReverse();
                      }}
                    >
                      Proceed
                    </button>{' '}
                    </div>
                  </div>
             
               
                </div>
                </div> 
                <div className="flex justify-end mt-8.5 gap-4.5">
                  <button
                    className="flex w-full justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      props.close(false);
                    }}
                  >
                    close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageHistoryModal;
