import React, { useEffect, useRef, useState } from 'react';
import {
  CreatesInventoryCartegoryAction,
  fetchInventCartegoryAction,
  resetcreatecart,
} from '../redux/slices/inventSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import FeeRadio from './FeeRadio';
import {
  EnrollScholarshipAction,
  fetchfeeCartegoryAction,
  GenerateFeeAction,
  PayFeeAction,
} from '../redux/slices/feeSlice';
import ScholarshipSelect from './ScholarshipSelect';

const ScholarshipModal = (props) => {
  const dispatch = useDispatch();
  const fee = useSelector((state) => state?.fees);

  const { Assignbycustom, cartegory } = fee;
  const [amount, setAmount] = useState(0);
  const [chosen, setchosen] = useState('');
  const [custom, setCustom] = useState([{title:''}]);

  const [chosendata, setchosendata] = useState([{title:'loading...'}]);

  const formRef1 = useRef();

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }
  let balanceresult = eval(
    parseInt(props?.val?.accountbalance) + parseInt(amount),
  );
  console.log(props?.cartinfo)
  useEffect(() => {
  
if(props?.cartinfo){
  setchosendata(
    custom.filter((item) => item?.title.includes(chosen)),
  );
}
    

  }, [chosen]);

  useEffect(() => {
    dispatch(fetchfeeCartegoryAction());
    setCustom(props?.cartinfo)
  }, []);

  useEffect(() => {
    setCustom(props?.cartinfo)
  }, [props]);
  const [scholarr, setScholarr] = useState('');
  const [scholarrid, setScholarrId] = useState('');
  const [cover, setcover] = useState('');
  const [scholarramount, setScholarramount] = useState('');
  const [scholarrPercent, setScholarrPercent] = useState(null);
  const [type, setType] = useState('');

  useEffect(() => {
    setScholarr(chosendata[0]?.title);
    setScholarrId(chosendata[0]?.id);
    setcover(chosendata[0]?.applicable);
    setScholarrPercent(chosendata[0]?.percent);
    setScholarramount(chosendata[0]?.amount);
    setType(chosendata[0]?.type);
    console.log(chosendata[0]?.percent);
    console.log(chosendata[0]?.title);

    console.log(chosendata[0]?.applicable);
    console.log(chosendata[0]?.type);

    console.log(cartegory);

    if (chosendata[0]?.type == 'Fixed Value') {
      setAmount(chosendata[0].amount);
      console.log('Fixedddddddddddddddddddddddddddddddddd');
    } else {
      console.log('we are in percentage');

      if (chosendata[0]?.applicable == 'FEE PAYABLE') {
        setAmount(
          (chosendata[0]?.percent / 100) * Assignbycustom?.data[0].total,
        );
        console.log('vaaaaaaaaaaaaaaaaaaaaaaal');
      } else {
        console.log('we are in custom');

        for (let i = 0; i < Assignbycustom?.data?.length; i++) {
          if (
            chosendata[0]?.applicable == Assignbycustom?.data?.[i].feename &&
            Assignbycustom?.data?.[i].class == props.val?.class
          ) {
            console.log('trueeeeeeeeeee');
            console.log();

            setAmount(
              (chosendata[0]?.percent / 100) * Assignbycustom?.data?.[i].amount,
            );
            console.log(
              (chosendata[0]?.percent / 100) * Assignbycustom?.data?.[i].amount,
            );
            console.log('custom vaaaaaaaaaaaaaaaaaaaaaaal');
          }
        }
      }
    }
  }, [chosendata]);

  console.log(chosendata);

  let data = {
    id: props.val?.student_id,
    class: props.val?.class,
    section: props.val?.section,
    createdby: 'asante',
    amount: amount,
    percentage: props.val?.accountbalance,
    scholarship: scholarr,
    scholarId: scholarrid,
    cover: cover,
  };

  const handleSubmit = (e) => {
    if (chosen == 'None') {
      toast.error('Error - Please Select Scholarship');
    } else {
      console.log(data);
      dispatch(EnrollScholarshipAction(data));
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
                <div className={!scholarr ? 'hidden' : ''}>
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
                      <p className={scholarramount == '0' ? 'hidden' : ''}>
                        Amount{' '}
                      </p>
                      <p className={scholarrPercent == 'null' ? 'hidden' : ''}>
                        Percentage{' '}
                      </p>
                      <p>Cartegory Applicable </p>
                    </div>
                    <div className="">
                      <p>{scholarr}</p>
                      <p>{type}</p>
                      <p className={scholarramount == '0' ? 'hidden' : ''}>
                        {scholarramount}
                      </p>
                      <p
                        className={
                          scholarrPercent == 'false' ||
                          scholarrPercent == 'null'
                            ? 'hidden'
                            : ''
                        }
                      >
                        {scholarrPercent + '%'}
                      </p>
                      <p>{cover != 'None' ? cover : 'Fee Payable'}</p>
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
