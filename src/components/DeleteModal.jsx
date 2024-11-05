import React, { useEffect, useRef, useState } from 'react';


const DeleteModal = (props) => {
console.log(props)
  return (
    <div className="w-full">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
        <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
          <h3 className="font-medium text-center text-black dark:text-white">
        Delete Record {' '}
          </h3>
        </div>

        <div className="px-7 py-4 w-12/12">
          <form>
            <div className=" flex gap-4 sm:flex-col">
              <div className="w-full text-center ">
                <div className="flex text-center flex-col w-full">
                  <label
                    className="mb-2 block text-center mx-auto text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                  
                       Are You Sure You Want to Delete Record ?
               
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
           
              props.delete()
            }}
          >
            Proceed
          </button>

          <button
            className="flex w-full justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
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
    </div>
  );
};

export default DeleteModal;
