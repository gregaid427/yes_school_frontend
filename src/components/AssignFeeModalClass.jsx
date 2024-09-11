import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassSelect3 from './ClassSelect3';
import SessionSelect1 from './SessionSelect1';
import { AssignFeesAction } from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';
import ClassSelect2 from './ClassSelect2';
import AssignFeeClassSelect from './AssignFeeClassSelect';

const AssignFeeModalClass = (props) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(0);

  const [clazz, setclazz] = useState();
  const [isChecked1, setIsChecked1] = useState();
  const [selectedArr, setselectedArr] = useState([]);





  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium  text-black dark:text-white">
                  Assigned Fees Cartegory For {props.data?.class}
                </h3>
              </div>
              <div className="p-8">
              

                <form className=''>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <div className="w-full mb-4 sm:w-2/2">
                        <div className="w-full">
                          <div className="flex justify-between">
                            <label
                              className="mb-3 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Fee Cartegories
                            </label>
                            <label
                              className="mb-3 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Amount To Charge
                            </label>
                          </div>
                          {props?.data.map((item, index) => (
                            <div className="flex   " key={item.id}>
                              <div className="w-4/6 flex  ">
                                {' '}
                                <label
                                  className=" my-auto  block text-sm font-medium text-black dark:text-white"
                                  htmlFor=""
                                >
                                  {item.feename}
                                </label>
                              </div>{' '}
                              <div className="  w-2/6">
                                <input
                                  className="w-full rounded border border-stroke bg-gray py-1.5 mb-1 px-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                  type="number"
                                  name=""
                                  id=""
                                  placeholder=""
                                  defaultValue={item?.amount}
                                  disabled
                                 
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                 
                    <button
                      className="flex w-full justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
                      onClick={(e) => {
                        e.preventDefault();

                        props.close(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </form>

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignFeeModalClass;
