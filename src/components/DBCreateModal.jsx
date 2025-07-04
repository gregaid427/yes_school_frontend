import React, { useEffect, useRef, useState } from 'react';

import { MasrkstudentWaiting } from '../redux/slices/studentSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createDBAction } from '../redux/slices/usersSlice';

const DBCreateModal = (props) => {
  console.log(props);
  let navigate = useNavigate();
  const [pass, setPass] = useState('');
  const [display, setDisplay] = useState(0);
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="w-full">
      <div className="rounded-sm border border-stroke bg-[#313D4A] shadow-default ">
        <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
          <h3 className="font-medium text-center  text-white">Enter Passkey</h3>
        </div>
        <div className="p-7">
          <div style={{ display: display == 0 ? 'block' : 'none' }}>
            <div style={{ display: err == true ? 'block' : 'none' }}>
              <div className="w-full  sm:w-2/2">
                <label
                  className="mb-3 block text-sm text-center font-medium text-white"
                  htmlFor=""
                >
                  ⚠️ Wrong Passkey
                </label>
              </div>
            </div>

            <div className="flex w-full justify-center items-center">
              <input
                onChange={(e) => {
                  setPass(e.target.value.trim());
                }}
                type="text"
                placeholder=""
                className=" rounded-lg my-2 w-full items-center border border-stroke bg-transparent p-2 text-white outline-none focus:border-white focus-visible:shadow-none dark:border-form-strokedark  dark:focus:border-white"
              />
            </div>
            <div className="flex text-center  mx-auto w-full gap-4.5">
              <button
                className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                type=""
                onClick={(e) => {
                  e.preventDefault();
                  // navigate("/exam/editresult", {
                  //   state: { action: 1, value: props?.info ,examdetail :props.response},
                  // });
                  //  props.close(false);
                  if (pass == props?.keyvalue) {
                    setDisplay(1);
                  } else {
                    setErr(true);
                  }
                }}
              >
                Proceed
              </button>
              <button
                className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium  hover:shadow-1 text-white"
                type=""
                onClick={(e) => {
                  e.preventDefault();

                  props.close(false);
                }}
              >
                Decline
              </button>
            </div>
          </div>

          <div style={{ display: display == 1 ? 'block' : 'none' }}>
            <div className="w-full mb-4 sm:w-2/2">
              <label
                className="mb-3 block text-sm text-center font-medium text-white"
                htmlFor=""
              >
               A new database will be created for the System if none Exists
              </label>
            </div>
            <div className="w-full mb-4 sm:w-2/2">
              <label
                className="mb-3 block text-sm text-center font-medium text-white"
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
                  dispatch(createDBAction())
                                    props.close(false);

                }}
              >
                Yes
              </button>
              <button
                className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium  hover:shadow-1 dark:border-strokedark text-white"
                type=""
                onClick={(e) => {
                  e.preventDefault();
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
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBCreateModal;
