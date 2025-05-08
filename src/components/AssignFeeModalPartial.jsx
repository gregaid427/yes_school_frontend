import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassSelect3 from './ClassSelect3';
import SessionSelect1 from './SessionSelect1';
import { AssignFeesAction } from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';
import ClassSelect2 from './ClassSelect2';
import AssignFeeClassSelect from './AssignFeeClassSelect';
import StudentCartegorySelect from './StudentCartegorySelect';

const AssignFeeModalPartial = (props) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(2);
  const [selectedInfo, setSelectedInfo] = useState();

  const [clazz, setclazz] = useState();
  const [isChecked1, setIsChecked1] = useState();
  const [selectedArr, setselectedArr] = useState([]);

  const [desc, setDesc] = useState('');
  const clad = useSelector((state) => state?.classes);

  const { fetchAllClassloading, fetchAllClass } = clad;
  const [sessionoption, setSessionoption] = useState('');
  const fee = useSelector((state) => state?.fees);
  const { cartegory } = fee;
  const [scartegory, setCartegory] = useState('GENERAL');


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
  const user = useSelector((state) => state?.user);
const { username, userMail} = user;
  const handleSubmit = () => {
    data4['class'] = [props.data];
    data4['session'] = sessionoption;
    data4['total'] = data3;
    data4['createdby'] = username?.payload;
    delete data4.test;
    data4['fee'] = pop(data2);
    console.log('data4');
    console.log(data4.fee);
    data4['scartegory'] = props.type == false ? props.cartegory  :scartegory;

    if (data4.fee[0] == undefined) {
      return toast.error('Error - Fee Cartegory Cannot Be Empty');
    } else {
      console.log(data4);
      dispatch(AssignFeesAction(data4));
    }
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
console.log(props)
  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium  text-black dark:text-white">
                  Assign Fee for {props.data}
                </h3>
              </div>
              <div className="p-8">
              
              <div className={props.type == true ? 'hidden' : "w-full mb-3"}> 
              <label
                          className="mb-1 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Student Cartegory :{' '}
                        </label>
                        <div className="relative z-20 text-black dark:text-white ">
                          {props.cartegory}
                        </div>
                </div>

              <div className={props.type == false ? 'hidden' : "w-full mb-3"}>
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
                              className="mb-3 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              {props?.data}
                            </label>
                          </div>

                          {/* <div className="flex justify-between">
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

export default AssignFeeModalPartial;
