import React, { useEffect, useRef, useState } from 'react';
import {
  CreatesInventoryCartegoryAction,
  fetchInventCartegoryAction,
  resetcreatecart,
} from '../redux/slices/inventSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import FeeRadio from './FeeRadio';
import { PayFeeAction } from '../redux/slices/feeSlice';

const CollectFeesModal = (props) => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state?.inventory);

  const { CreateInventorycart } = inventory;
  useEffect(() => {
    if (CreateInventorycart?.success == 0) {
      toast.error('Error - Adding Item Cartegory ');
      //    dispatch(resetcreatecart())
      // dispatch(fetchAllClassAction())
    }
    if (CreateInventorycart?.success == 1) {
      toast.success('New Item Cartegory Added Successfully');
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
 


  const formRef1 = useRef();

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }
  let balanceresult = eval(parseInt(props.val?.accountbalance) + parseInt(amount))

  let data = {
    id: props.val?.student_id,
    class: props.val?.class,
    section: props.val?.section,
    collectedby: 'asante',
    amountpaid: amount,
    mode: mode,
    balbeforepayment: props.val?.accountbalance,
    balanceafterpayment:  balanceresult,
    receiptid: 'receiptid',


  };
  const handleSubmit = (e) => {
    if (amount < 1 ) {
      toast.error('Error - Enter Valid Amount');
    } else {
      dispatch(PayFeeAction(data));
    }
  };

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
                    Class (section)
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    defaultValue={
                      props.val?.class + ' ' + '(' + props.val?.section + ')'
                    }
                  
                    disabled
                  />
                </div>

                <div className="w-full flex mb-4 gap-2 sm:w-2/2">
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Amount
                  </label>
                  <div className='flex'>
                  <input
                    className="w-2/6 rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="number"
                    name=""
                    id=""
                    placeholder=""
                    defaultValue=""
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                  />
                  <label
                    className="my-auto w-2/6 text-center block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Accnt Balance
                  </label>
                  <input
                    className="w-2/6 rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="number"
                    name=""
                    id=""
                    placeholder=""
                    defaultValue={props.val?.accountbalance}
                    //defaultValue={Math.abs(props.val?.accountbalance)}

                  
                  />
                  </div>
                </div>
                
                <div className="w-full flex justify-between mb-4 sm:w-2/2">
                  <label
                    className="my-auto  block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Payment :
                  </label>
                  <FeeRadio setmode={setmode}/>
                </div>
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
