import React, { useEffect, useRef, useState } from 'react';
import {
  CreatesInventoryCartegoryAction,
  fetchInventCartegoryAction,
  resetcreatecart,
} from '../redux/slices/inventSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { PayFeeAction } from '../redux/slices/feeSlice';
import { fetchAllClassAction } from '../redux/slices/classSlice';
import { fetchActivesessionAction } from '../redux/slices/sessionSlice';
import { fetchschoolinfoAction } from '../redux/slices/usersSlice';
import FeeRadio from './FeeRadio';

const PaymentRecordsModal = (props) => {
  const clad = useSelector((state) => state?.classes);
  console.log(props);
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
  const [mode, setmode] = useState('Cash');
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
  const { username, userMail } = user;
  let data = {
    name: props.stdname,
    id: props.val?.student_id,
    class: props.val?.class,
    section: props.val?.section,
    collectedby: username?.payload,
    arrears: props.val?.arrears,
    amountpaid: amount,
    mode: mode,
    balbeforepayment: props.val?.accountbalance,
    balanceafterpayment: balanceresult,
    receiptid: receiptid,
    infotype: props.infotype,
  };
  const handleSubmit = (e) => {
    if (amount < 1) {
      return toast.error('Error - Enter Valid Amount');
    }
    if (amount > props.val?.accountbalance) {
      return toast.error(
        `Error - Amount cannot Exceed ${props.val?.accountbalance}`,
      );
    } else {
      dispatch(PayFeeAction(data));
    }
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
                Collect Fees bbb
              </h3>
            </div>
            <div className="p-7">
              <form ref={formRef1}>
                <div className="flex gap-4">
                  {' '}
             
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
                      defaultValue={
                        props.rec[0]?.stdname 
                      
                      }
                      disabled
                    />
                  </div>
                  <div className="w-full flex mb-4 sm:w-2/2">
                    <label
                      className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Name
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={props.rec[0]?.student_id}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex my-3 border-b border-stroke">
                  <label
                    className="my-auto w-1/6 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Activity
                  </label>
                  <label
                    className="my-auto w-1/6 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Amount
                  </label>
                  <label
                    className="my-auto w-1/6 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Bal Before Pay.
                  </label>
                  <label
                    className="my-auto w-1/6 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Bal After Pay.
                  </label>
                  <label
                    className="my-auto w-1/6 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Date
                  </label>
                  <label
                    className="my-auto w-1/6 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                     By
                  </label>
                </div>
                {props.rec?.map((item, index) => (
                  <div className="flex my-1">
                    <label
                      className="my-auto w-1/6 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      {item?.activity}
                    </label>
                    <label
                      className="my-auto w-1/6 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      {item?.amountpaid == 0 ? item?.amountinvolved  : item?.amountpaid }
                    </label>
                    <label
                      className="my-auto w-1/6 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      {item?.balbeforepayment}
                    </label>
                    <label
                      className="my-auto w-1/6 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                     {item?.balanceafterpayment}
                    </label>
                    <label
                      className="my-auto w-1/6 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                     {item?.date}
                    </label>
                    <label
                      className="my-auto w-1/6 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      {item?.collectedby}
                    </label>
                  </div>
                ))}

                <div className="flex justify-around mt-8.5 gap-4.5">
                  <button
                    className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
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

export default PaymentRecordsModal;
