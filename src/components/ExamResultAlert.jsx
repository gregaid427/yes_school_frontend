import React, { useEffect, useRef, useState } from 'react';

import { MasrkstudentWaiting } from '../redux/slices/studentSlice';
import { useNavigate } from 'react-router-dom';

const ExamResultAlert = (props) => {
  console.log(props)
  let navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
        <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
          <h3 className="font-medium text-center text-black dark:text-white">
            Add Exam Result
          </h3>
        </div>
        <div className="p-7">
          <form>
            <div style={{ display: props.yes == undefined ? 'block' : 'none' }}>
              <div className="w-full mb-4 sm:w-2/2">
                <label
                  className="mb-3 block text-sm text-center font-medium text-black dark:text-white"
                  htmlFor=""
                >
                  Exam Result ({props.info?.subjects}) for {props.info?.class}{' '}
                  {props.info?.section == null ? '' : '/' + props.info?.section}{' '}
                  , {props.info?.session} and {props.info?.examgroup} Cartegory
                  is Already Updloaded.
                </label>
                <label
                  className="mb-3 block text-sm text-center font-medium text-black dark:text-white"
                  htmlFor=""
                >
                  Would you like to Update Results ?
                </label>
              </div>

              <div className="flex text-center  mx-auto w-6/12 gap-4.5">
                <button
                  className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/exam/editresult", {
                      state: { action: 1, value: props?.info ,examdetail :props.response},
                    });
                    props.close(false);
                  }}
                >
                  Yes
                </button>
                <button
                  className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/exam/newexam')

                    props.close(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
            <div style={{ display: props.yes ?? 'none' }}>
              <div className="w-full mb-4 sm:w-2/2">
                <label
                  className="mb-3 block text-sm text-center font-medium text-black dark:text-white"
                  htmlFor=""
                >
                  Alert ! :- Students Will Be Required To Be Promoted Inorder To
                  Appear In Their Respective Class Lists
                </label>
              </div>
              <div className="w-full mb-4 sm:w-2/2">
                <label
                  className="mb-3 block text-sm text-center font-medium text-black dark:text-white"
                  htmlFor=""
                >
                  Do You Want To Continue?{' '}
                </label>
              </div>

              <div className="flex text-center  mx-auto w-6/12 gap-4.5">
                <button
                  className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(MasrkstudentWaiting());
                    props.setYes(undefined);
                    props.close(false);
                  }}
                >
                  Yes
                </button>
                <button
                  className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    props.setYes(undefined);
                    props.close(false);
                  }}
                >
                  No
                </button>
              </div>

              {/* <div className="flex justify-center gap-4.5">
                <button
                  className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    props.close(false);

                    props.setYes(undefined);
                  }}
                >
                  Close
                </button>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExamResultAlert;
