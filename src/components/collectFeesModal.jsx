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

const CollectFeesModal = (props) => {
  const clad = useSelector((state) => state?.classes);
//  console.log(props);
  const { fetchAllClassloading, fetchAllClass } = clad;
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state?.inventory);

  const { CreateInventorycart } = inventory;
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
    session : props.session,
    cartegory : props.cartegory
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
                    defaultValue={props.val?.student_id}
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
                      props.val?.firstName +
                      ' ' +
                      props.val?.otherName +
                      ' ' +
                      props.val?.lastName
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
                      props.val?.class +
                      ' ' +
                      `${props.val?.section ? '/' : ''}` +
                      ' ' +
                      props.val?.section
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
                      {Math.abs(props.val?.accountbalance)}
                    </label>
                  </div>
                <div className="flex ml-1 ">
                    {' '}
                    <label
                      className="my-auto mr-4  block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                   (   Arrears :
                    </label>
                    <label
                      className="my-auto block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      {Math.abs(props.val?.arrears)}
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
                      {Math.abs(props.val?.feepayable) } )
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
                    onChange={(e) => setAmount(e.target.value)}
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

export default CollectFeesModal;
