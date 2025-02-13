import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SessionAcctReportAction } from '../redux/slices/feeSlice';


const CloseAccountModal = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fee = useSelector((state) => state?.fees);
  const {
    cartegory,
    Assignfee,
    AssignfeeGroup,
    Generatefee,
    deleteAllAssigned,
    custom,
    fetchAllAssignRecord,
    GetSingleBill,
    CloseSessionAcount,
    SessionAcctReport
  } = fee;

  function handlegetreport(){

    dispatch(SessionAcctReportAction({'id':props?.data}))

  }

  

  useEffect(() => {
    if (SessionAcctReport?.success == 1) {
      navigate('/settings/sessionaccountsreport')
    }
    // else{
    //   toast.error('Error Getting Report')
    // }
  }, [SessionAcctReport]);
  return (
    <div className="w-full">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
        <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
          <h3 className="font-medium text-center text-black dark:text-white">
          ✅  Success {' '}
          </h3>
        </div>

        <div className="px-7 py-4 w-12/12">
          <form>
            <div className=" flex gap-4 sm:flex-col">
              <div className="w-full  ">
                <div className="flex  flex-col w-full">
                  <label
                    className="mb-2 block text-center mx-auto text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                  
                       Account Closed Successfully !
               
                  </label>
                  
                  <label
                    className="mb-2 block  text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                  
                       Current Active Session's Account :
               
                  </label>

                  <label
                    className="mb-2 block  text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                  
                   {props?.data}
               
                  </label>
                  
                  {/* <label
                    className="mb-2 block text-center mx-auto text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    {props.absent != 0 ?
                      `All But ${props.repeatNo} Student(s) Are Selected To Repeat In ${props.prev}` :null}
                  </label> */}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex px-8 pb-5 w-12/12 justify-end gap-4.5">
          <button
            className="flex w-full justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
            type=""
            onClick={(e) => {
              e.preventDefault();
              handlegetreport()
              props.close(false);

            }}
          >
            Get Session Report
          </button>

          <button
            className="flex w-full justify-center rounded  py-2 px-2 font-medium text-gray hover:bg-opacity-90"
            type=""
            onClick={(e) => {
              e.preventDefault();
              props.close(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloseAccountModal;
