import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassSelect3 from './ClassSelect3';
import SessionSelect1 from './SessionSelect1';
import { AssignFeesAction } from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';
import ClassSelect2 from './ClassSelect2';
import AssignFeeClassSelect from './AssignFeeClassSelect';
import StudentCartegorySelect from './StudentCartegorySelect';

const AssignFeeModal = (props) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(0);
  const [scartegory, setCartegory] = useState('GENERAL');

  const [clazz, setclazz] = useState();
  const [isChecked1, setIsChecked1] = useState(false);
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
  const [selectedInfo, setSelectedInfo] = useState();

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
  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;

  const handleSubmit = () => {
    data4['class'] = isChecked1 == false ? [clazz] : selectedArr;
    data4['session'] = sessionoption;
    data4['total'] = data3;
    data4['scartegory'] = scartegory;
    data4['createdby'] = username?.payload;
    delete data4.test;
    data4['fee'] = pop(data2);
    console.log('data4');
    console.log(data4.fee);

    if (data4.fee[0] == undefined) {
      return toast.error('Error -Fee Cartegory Cannot Be Empty');
    } else {
      console.log(data4);
      dispatch(AssignFeesAction(data4));
    }
  };
  console.log(isChecked1);

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
                  Assign Fees
                </h3>
              </div>
              <div className="p-8">
                <form className={display == 0 ? '' : 'hidden'}>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <div className="w-full  sm:w-2/2">
                        <label
                          className=" block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Fee Assign Option :
                        </label>
                        <div className="flex w-full gap-8">
                          <div className="flex w-full flex-col">
                            <div className=" flex mt-2  mb-2 ">
                              <div className="flex justify-start mr-2 ">
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
                                        setIsChecked1(false);
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
                              <div className=" flex  sm:w-full">
                                <label
                                  className="mb- block text-sm font-medium text-black dark:text-white"
                                  htmlFor="checkboxLabelOne"
                                >
                                  {'Single Class'}
                                </label>
                              </div>
                            </div>

                            <div className=" flex  ">
                              <div className="flex justify-start">
                                <label
                                  htmlFor={'type2'}
                                  className="flex cursor-pointer select-none "
                                >
                                  <div className="relative mr-2 ">
                                    <input
                                      title={'type2'}
                                      type="checkbox"
                                      id={'type2'}
                                      className="sr-only"
                                      onChange={() => {
                                        setIsChecked1(true);
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
                              <div className=" flex  sm:w-full">
                                <label
                                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                                  htmlFor="checkboxLabelOne"
                                >
                                  {'Multiple Classes'}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="w-full mb-3">
                        <label
                          className="mb-1 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Student Cartegory{' '}
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <StudentCartegorySelect setsectionprop={setCartegory} selectinfo={setSelectedInfo}/>
                        </div>
                      </div>


                      <form className={!isChecked1 ? '' : 'hidden'}>
                        <div className="w-full mb-3 sm:w-2/2">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Class
                          </label>
                          <div className="relative z-20 bg-white dark:bg-form-input">
                            <ClassSelect3 setsectionprop={setclazz} />
                          </div>
                        </div>
                      </form>
                      <form className={isChecked1 ? '' : 'hidden'}>
                        <div className="w-full mb-3 mt-4 sm:w-2/2">
                          <label
                            className="mb-2 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Select Classes Applicable
                          </label>{' '}
                          <div>
                            {fetchAllClass?.data?.map((item, index) => (
                              < >
                              <AssignFeeClassSelect
                              key={index} 
                                info={fetchAllClass?.data?.[index]}
                                selectedarr={selectedArr}
                                selected={setselectedArr}
                              />
                              </>
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
                        if (selectedArr.length == 0 && isChecked1) {
                          toast.error('Please Select Class');
                          console.log(selectedArr);
                        } else if (clazz == 'None' && !isChecked1) {
                          toast.error('Please Select Class');
                          console.log(selectedArr);
                        } else {
                          setDisplay(2);
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
                            onChange={(e) => setDesc(e.target.value.trim())}
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

                <form className={display == 2 ? '' : 'hidden'}>
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
                          {cartegory?.data?.map((item, index) => (
                            <div className="flex   " key={item.id}>
                              <div className="w-4/6 flex  ">
                                {' '}
                                <label
                                  className=" my-auto  block text-sm font-medium text-black dark:text-white"
                                  htmlFor=""
                                >
                                  {item.name}
                                </label>
                              </div>{' '}
                              <div className="  w-2/6">
                                <input
                                  className="w-full rounded border border-stroke bg-gray py-1.5 mb-1 px-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                  type="number"
                                  name=""
                                  id=""
                                  placeholder=""
                                  defaultValue="0"
                                  onChange={(e) => {
                                    obj[item.name] = parseInt(e.target.value.trim());
                                  }}
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
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(obj);
                        if (Object.entries(obj).length == 1) {
                          toast.error('Error - Fee Cartegory Cannot Be Empty');
                        } else {
                          e.preventDefault();
                          setDisplay(3);
                          delete data2.test;
                          setdata2(obj);
                          setdata3(Object.values(obj).reduce((a, b) => a + b));
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

                <form className={display == 3 ? '' : 'hidden'}>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <div className="w-full mb-4 sm:w-2/2">
                        <div className="w-full">
                          <div className="flex justify-between">
                            <label
                              className="mb-3 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Class
                            </label>
                            <label
                              className={isChecked1 == false ? "mb-3 py-auto block text-sm font-medium text-black dark:text-white" : 'hidden'}
                              htmlFor=""
                            >
                              {clazz}
                       
                          
                            </label>
                            <label
                              className={isChecked1 == true ? "mb-3 py-auto block text-sm font-medium text-black dark:text-white" : 'hidden'}
                              htmlFor=""
                            >
                              {selectedArr.join(', ')}
                       
                          
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

                          <div className="flex justify-between">
                            <div className=" flex  ">
                              {' '}
                              <label
                                className=" my-auto    block text-sm font-medium text-black dark:text-white"
                                htmlFor=""
                              >
                                Total Fees
                              </label>
                            </div>{' '}
                            <div className="  ">
                              <label
                                className=" my-auto    block text-sm font-medium text-black dark:text-white"
                                htmlFor=""
                              >
                                {display == 3
                                  ? !data2
                                    ? 0
                                    : Object.values(data2).reduce(
                                        (a, b) => a + b,
                                      )
                                  : 0}
                              </label>
                            </div>
                          </div>
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

export default AssignFeeModal;
