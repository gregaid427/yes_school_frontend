import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  CreatesScholarshipAction,
} from '../redux/slices/feeSlice';

const ScholarshipItem = (props) => {
  const dispatch = useDispatch();
  const fees = useSelector((state) => state?.fees);

  const { CreateScholar } = fees;
  // useEffect(() => {
  //     if (CreateScholar?.success == 0) {
  //    //    dispatch(resetcreatecart())
  //       // dispatch(fetchAllClassAction())

  //       }
  //     if (CreateScholar?.success == 1) {
  //       toast.success(' Scholarship Added Successfully');
  //       resetFormStates()
  //        props.close((false))

  //       }

  //     // if (fetchAllClass?.success == 1) {
  //     //   let i = 0;
  //     //   let arr = [];
  //     //   while (i < clad?.fetchAllClass?.data.length) {
  //     //     arr.push(clad?.fetchAllClass?.data[i].title);
  //     //     i++;
  //     //   }

  //     //   setClasss(arr);
  //     // }
  //   }, [CreateScholar]);

  const [cartegoryName, setcartegoryName] = useState("");
  const [description, setDesription] = useState("");
  const [amount, setAmount] = useState(0.0);

  const formRef1 = useRef();

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }

  let data = {
    name: cartegoryName,
    createdby: 'asante',
    description: description,
    amount: amount,
  };
  const handleSubmit = (e) => {
    if (cartegoryName == '') {
      toast.error('Error - Name Cannot Be Empty');
    } else {
      dispatch(CreatesScholarshipAction(data));
    }
  };

  return (
    <div className="w-full">
      <div
        className={
          'rounded-sm border max-w-full border-stroke bg-white px-2 shadow-default dark:border-strokedark dark:bg-boxdark '
        }
      >
        <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Scholarship
          </h3>
        </div>
        <div className="p-5">
          <form ref={formRef1}>
            <div className="w-full mb-4 sm:w-2/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
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
                defaultValue=""
                onChange={(e) => setcartegoryName(e.target.value.toUpperCase())}
              />
            </div>
            <div className="w-full mb-4 sm:w-2/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor=""
              >
                Amount
              </label>
              <input
                className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="number"
                name=""
                id=""
                placeholder=""
                defaultValue="0.00"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="mb-5.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="emailAddress"
              >
                Description/Notes <span className="small-font">(optional)</span>
              </label>
              <div className="relative">
                <textarea
                  className="w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="bio"
                  id="bio"
                  rows={2}
                  placeholder=""
                  defaultValue=""
                  onChange={(e) => setDesription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-4.5">
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
  );
};

export default ScholarshipItem;
