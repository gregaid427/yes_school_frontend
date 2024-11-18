import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassSelect3 from './ClassSelect3';
import SessionSelect1 from './SessionSelect1';
import { AssignFeesAction, GenerateFeeAction, GenerateFeeClassAction } from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';
import ClassSelect2 from './ClassSelect2';
import AssignFeeClassSelect from './AssignFeeClassSelect';

const GenerateFeeModalClass = (props) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(0);

  const [clazz, setclazz] = useState();
  const [isChecked1, setIsChecked1] = useState();
  const [selectedArr, setselectedArr] = useState([]);

  const [desc, setDesc] = useState('');
  const clad = useSelector((state) => state?.classes);

  const { fetchAllClassloading, fetchAllClass } = clad;
  const [sessionoption, setSessionoption] = useState('');
  const fee = useSelector((state) => state?.fees);
  const { cartegory } = fee;

  const [data1, setdata1] = useState(0);
  const [data2, setdata2] = useState({ test: 0 });
  const [data3, setdata3] = useState({ test: 0 });
  const [data4, setdata4] = useState({ test: 0 });

  console.log(selectedArr);

  const obj = {
    test: 0,
  };
  console.log(obj);
  console.log(data2);

  function pop(data2) {
    delete data2.test;

    let pp = [];
    let entries = Object.entries(data2);
    let data = entries.map(([key, val] = entry) => {
      console.log(key + val);
      pp.push([key, val]);
      console.log(pp);
    });
    return pp;
  }
  const handleSubmit = () => {
  let arrString =  selectedArr.map(x => `"${x}"`).join(',')
 const data ={
  class : arrString,
  clazz : selectedArr

 }
   
      console.log(arrString);
      console.log(selectedArr);

      dispatch(GenerateFeeClassAction(data));
    
  };

  useEffect(() => {
    if (fetchAllClass?.success == 0) {
      toast.error('Error Loading Class');
      let i = 0;
      let arr = [];
      while (i < clad?.fetchAllClass?.data.length) {
        arr.push(clad?.fetchAllClass?.data[i].title);
        i++;
      }

      setClasss(arr);
      setclazz(arr[0]);
    }
  }, [fetchAllClassloading]);

  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium  text-black dark:text-white">
                  Generate Fee For Classes
                </h3>
              </div>
              <div className="p-8">
                <form className={display == 0 ? '' : 'hidden'}>
                  <div className="flex gap-4">
                    <div className="w-full">     
                      <form className={true ? '' : 'hidden'}>
                        <div className="w-full mb-3  sm:w-2/2">
                          <label
                            className="mb-2 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Select Classes 
                          </label>{' '}
                          <div>
                            {fetchAllClass?.data?.map((item, index) => (
                              <AssignFeeClassSelect
                                info={fetchAllClass?.data?.[index]}
                                selectedarr={selectedArr}
                                selected={setselectedArr}
                              />
                            ))}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="flex justify-end mt-3 gap-4.5">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        if (selectedArr.length == 0 ) {
                          toast.error('Please Select Class');
                          console.log(selectedArr);
                      
                        } else {
                          setDisplay(3);
                          console.log(selectedArr);
                        }
                      }}
                    >
                      Next
                    </button>
                    <button
                      className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
                      onClick={(e) => {
                        e.preventDefault();

                        props.close(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                <form className={display == 1 ? '' : 'hidden'}>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <div className="w-full mb-4 sm:w-2/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Class
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <ClassSelect3
                            setsectionprop={setclazz}
                            clazz={clazz}
                          />
                        </div>
                      </div>

                      {/* <div className="w-full mb-3 sm:w-2/2">
                        <label
                          className="mb-2 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Academic Session
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <SessionSelect1 setsectionprop={setSessionoption} />
                        </div>
                      </div> */}
                      {/* <div className="w-full  sm:w-2/2">
                        <div className="flex w-full ">
                          <div className=" flex   sm:w-1/2">
                            <div className=" flex  sm:w-full">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="checkboxLabelOne"
                              >
                                {'Apply'}
                              </label>
                            </div>

                            <div className="flex justify-start sm:w-2/4">
                              <label
                                htmlFor={'type'}
                                className="flex cursor-pointer select-none "
                              >
                                <div className="relative ">
                                  <input
                                    title={'type'}
                                    type="checkbox"
                                    id={'type'}
                                    className="sr-only"
                                    onChange={() => {
                                      setIsChecked1(true);
                                      setType(true);
                                    }}
                                  />
                                  <div
                                    className={` flex h-5 w-5 items-center justify-center rounded border ${
                                      isChecked1 &&
                                      'border-primary bg-gray dark:bg-transparent'
                                    }`}
                                  >
                                    <span
                                      className={`h-2.5 w-2.5 rounded-sm ${isChecked1 && 'bg-primary'}`}
                                    ></span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>

                          <div className="mb-2 flex   sm:w-1/2">
                            <div className=" flex  sm:w-full">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="checkboxLabelOne"
                              >
                                {'Pending'}
                              </label>
                            </div>

                            <div className="flex justify-start sm:w-2/4">
                              <label
                                htmlFor={'type2'}
                                className="flex cursor-pointer select-none "
                              >
                                <div className="relative ">
                                  <input
                                    title={'type2'}
                                    type="checkbox"
                                    id={'type2'}
                                    className="sr-only"
                                    onChange={() => {
                                      setIsChecked1(false);
                                      setType(false);
                                    }}
                                  />
                                  <div
                                    className={` flex h-5 w-5 items-center justify-center rounded border ${
                                      !isChecked1 &&
                                      'border-primary bg-gray dark:bg-transparent'
                                    }`}
                                  >
                                    <span
                                      className={`h-2.5 w-2.5 rounded-sm ${!isChecked1 && 'bg-primary'}`}
                                    ></span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="emailAddress"
                        >
                          Description/Notes
                        </label>
                        <div className="relative">
                          <textarea
                            className="w-full rounded border border-stroke bg-gray py-2  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            name="bio"
                            id="bio"
                            rows={2}
                            placeholder=""
                            onChange={(e) => setDesc(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        setDisplay(2);
                      }}
                    >
                      Next
                    </button>
                    <button
                      className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
                      onClick={(e) => {
                        e.preventDefault();

                        props.close(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>

            
                <form className={display == 3 ? '' : 'hidden'}>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <div className="w-full mb-4 sm:w-2/2">
                        <div className="w-full">
                          <div className="flex flex-col justify-between">
                            <label
                              className="mb-3 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                             Selected Classes :
                            </label>
                            <label
                              className="mb-3 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              {selectedArr.toString()}
                            </label>
                          </div>
{/* 
                          <div className="flex justify-between">
                            <label
                              className="mb-3 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Session
                            </label>
                            <label
                              className="mb-3 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              {sessionoption}
                            </label>
                          </div> */}

                        
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4.5">
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
                      type="reset"
                      onClick={() => props.close(false)}
                    >
                      Cancel
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

export default GenerateFeeModalClass;
