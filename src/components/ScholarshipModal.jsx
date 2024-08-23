import React, { useEffect, useRef, useState } from 'react';
import {
  CreatesInventoryCartegoryAction,
  fetchInventCartegoryAction,
  resetcreatecart,
} from '../redux/slices/inventSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import FeeRadio from './FeeRadio';
import { GenerateFeeAction, PayFeeAction } from '../redux/slices/feeSlice';
import ScholarshipSelect from './ScholarshipSelect';

const ScholarshipModal = (props) => {
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
  const [chosen, setchosen] = useState('');
  const [chosendata, setchosendata] = useState('');


  const formRef1 = useRef();

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }
  let balanceresult = eval(
    parseInt(props.val?.accountbalance) + parseInt(amount),
  );
  useEffect(() => {
    setchosendata(props.cartinfo.data.filter((item) =>
      item.title.includes(chosen)))
  }, [chosen]);
  console.log(chosendata)
  console.log(props.cartinfo.data)


  let data = {
    // id: props.val?.student_id,
    // class: props.val?.class,
    // section: props.val?.section,
    // collectedby: 'asante',
    // amount: amount,
    // percentage: props.val?.accountbalance,
    // type: type,
    // scholarship: 'receiptid',
    // title: props.infotype,
  };
  const handleSubmit = (e) => {
    if (chosen == 'None') {
      toast.error('Error - Please Select Scholarship');
    } else {
      dispatch(GenerateFeeAction(data));
    }
  };

  return (
    <div className="w-full">
      <div className="grid  gap-8">
        <div className="col-span-12">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
            <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Enroll Student
              </h3>
            </div>
            <div className="p-7">
              <form ref={formRef1}>
                <div className="w-full flex mb-2 sm:w-2/2">
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
                <div className="w-full flex mb-2 sm:w-2/2">
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

                <div className="w-full flex mb-2 sm:w-2/2">
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

                <div className="w-full flex mb-2  sm:w-2/2">
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Select Scholarship
                  </label>
                  <div className="w-full">
                    <ScholarshipSelect setsectionprop={setchosen} />
                  </div>
                </div>
                <div className={!chosendata[0]?.title ? "hidden" : '' }>
                  <div className="border-b border-t my-3 border-stroke py-1 px-7 dark:border-strokedark">
                    <p>
                      <span className="flex justify-around text-md text-center mx-auto">
                        {' '}
                        Scholarship Summary
                      </span>
                    </p>
                  </div>
                  <div className="flex my-4 w-full text-sm font-medium">
                    <div className="w-2/5 ">
                      <p>Scholarship </p>
                      <p>Type </p>
                      <p className={chosendata[0]?.amount == '0' ? 'hidden' : ""}>Amount </p>
                      <p  className={chosendata[0]?.percent == 'false' ? 'hidden' : ""}>Percentage </p>
                      <p>Cartegory Applicable </p>
                    </div>
                    <div className="">
                      <p>{chosendata[0]?.title }</p>
                      <p>{chosendata[0]?.type}</p>
                      <p className={chosendata[0]?.amount == '0' ? 'hidden' : ""} >{chosendata[0]?.amount}</p>
                      <p className={chosendata[0]?.percent == 'false' || chosendata[0]?.percent == undefined ? 'hidden' : ""} >{chosendata[0]?.percent+'%'}</p>
                      <p>{chosendata[0]?.applicable != "None" ? chosendata[0]?.applicable :"Fee Payable"}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-7.5 gap-4.5">
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

export default ScholarshipModal;
