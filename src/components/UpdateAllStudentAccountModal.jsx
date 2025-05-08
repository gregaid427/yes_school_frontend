import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ResetAllAccountBalanceAction,
  resetGeneratefee,
  resetUpdatefee,
} from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  fetchSingleStudent,
  resetSinglestudent,
} from '../redux/slices/studentSlice';

const UpdateAllStudentAccountModal = (props) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [display, setDisplay] = useState(0);
  const fee = useSelector((state) => state?.fees);
  const { cartegory, Generatefee, custom,ResetAllAccount } = fee;
  let navigate = useNavigate();
  const student = useSelector((state) => state?.student);
  const user = useSelector((state) => state?.user);
  const { username, userMail } = user;

  const handleSubmit = () => {
    dispatch(ResetAllAccountBalanceAction({ amount: amount,createdby: username?.payload, }));
  };

  useEffect(() => {
    if (ResetAllAccount?.success == 1) {
      props.close(false);
      dispatch(resetUpdatefee())

    }
  }, [ResetAllAccount]);
  useEffect(() => {
    if (Generatefee?.success == 0) {
      toast.error('Error Generating Fee');
      dispatch(resetGeneratefee());
    }

    if (Generatefee?.success == 1) {
      dispatch(resetGeneratefee());

      setAmount(0);
    }
  }, [Generatefee]);

  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border py-3 px-7 border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke  dark:border-strokedark">
                <h3 className="font-medium mb-5  text-black dark:text-white">
                  Update All Student Account
                </h3>
              </div>
              <div className={display == 0 ? '' : 'hidden'}>
                <div className="w-full py-6 flex mb-4 sm:w-2/2">
                  <label
                    className="my-auto w-3/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Enter Account balance
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="number"
                    name=""
                    id=""
                    placeholder=""
                    defaultValue={0}
                    onChange={(e) => {
                      setAmount(e.target.value.trim());
                    }}
                  />
                </div>
                <div className="mb-3 flex gap-2">
                  <button
                    className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      if (amount < 0) {
                        return toast.error(
                          'Error - Enter Amount From 0 Upwards ',
                        );
                      } else {
                        setDisplay(1);
                      }
                    }}
                  >
                    Proceed
                  </button>
                  <button
                    className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      props.close(false);
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>

              <div className={display == 1 ? '' : 'hidden'}>
                <h4 className="text-sm  text-black text-center dark:text-white">
                  {' '}
                  Are You sure You Want To Update All Student Account To{' '}
                  {amount} Balance ?{' '}
                </h4>
                <div className="my-8 flex gap-2">
                  <button
                    className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    Proceed
                  </button>
                  <button
                    className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      props.close(false);
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAllStudentAccountModal;
