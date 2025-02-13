import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CurrentAccountDetailModal = (props) => {

  const fee = useSelector((state) => state?.fees);
  const { CurrentAccountDetail } = fee;
  const [data, setData] = useState('Loading...');

  
  useEffect(() => {

    if (CurrentAccountDetail?.success == 1) {
      setData(CurrentAccountDetail?.data[0])
    }
 
  }, [CurrentAccountDetail]);

  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border py-3 px-7 border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke  dark:border-strokedark">
                <h3 className="font-medium mb-5  text-black dark:text-white">
                  Current Opened Account Details
                </h3>
              </div>
              <div >
                <h4 className="text-sm  text-black  dark:text-white">
                  {' '}
                </h4>
                <div className="w-full my-2 flex   gap-2 sm:w-2/2">
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Current Opened Session's Account 
                  </label>
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    {data?.newsession}
                  </label>
                
                </div>
                <div className="w-full my-2 flex   gap-2 sm:w-2/2">
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Preceeding Closed Session's Account 
                  </label>
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    {data?.oldsession}
                    </label>
                
                </div>
                <div className="w-full my-2 flex   gap-2 sm:w-2/2">
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                   Current Account Opened By
                  </label>
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    {data?.createdBy}
                    </label>
                
                </div>
                <div className="w-full my-2 flex   gap-2 sm:w-2/2">
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                   Current Account Opening Date
                  </label>
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    {data?.createdat}
                    </label>
                
                </div>
               
                <div className="w-full my-2 flex   gap-2 sm:w-2/2">
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                   Current Session Account ID
                  </label>
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    {data?.activeaccountid}
                    </label>
                
                </div>
                

                <div className="py-5 flex gap-2">
                  {/* <button
                    className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    Search
                  </button> */}
                  <button
                    className="flex w-full justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentAccountDetailModal;
