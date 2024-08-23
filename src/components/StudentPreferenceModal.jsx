import React, { useEffect, useRef, useState } from 'react';
import {
  CreatesInventoryCartegoryAction,
  fetchInventCartegoryAction,
  resetcreatecart,
} from '../redux/slices/inventSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import PreferenceRadio from './PreferenceRadio';
import { PrefencesAction } from '../redux/slices/feeSlice';

const StudentPreferenceModal = (props) => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state?.inventory);

  const fee = useSelector((state) => state?.fees);
  const { cartegory } = fee;

  const { CreateInventorycart } = inventory;
  useEffect(() => {
    if (CreateInventorycart?.success == 0) {
      toast.error('Error - Adding Item Cartegory ');
      //    dispatch(resetcreatecart())
      // dispatch(fetchAllClassAction())
    }
    if (CreateInventorycart?.success == 1) {
      toast.success('New Item Cartegory Added Successfully');
      dispatch(fetchInventCartegoryAction());
      resetFormStates();
      props.close(false);
    }

    // if (fetchAllClass?.success == 1) {
    //   let i = 0;
    //   let arr = [];
    //   while (i < clad?.fetchAllClass?.data.length) {
    //     arr.push(clad?.fetchAllClass?.data[i].title);
    //     i++;
    //   }

    //   setClasss(arr);
    // }
  }, [CreateInventorycart]);

  const [amount, setAmount] = useState(0);
  const [repeat, setRepeat] = useState([]);
  console.log(repeat);




  const formRef1 = useRef();

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }
  let balanceresult = eval(
    parseInt(props.val?.accountbalance) + parseInt(amount),
  );
  // console.log(props.cart)
  // useEffect(() => {
  //   if(props.cart){
  //     let myArr =[]
  //     console.log(props.cart?.length)

  //     for(let i = 0; i < props.cart?.length; i++ ){
  //       console.log(props.cart[i].feeid)
  //       myArr.push(props.cart[i].feeid)

  //       if(i==props?.cart.length-1)setselectedArr(myArr)
  //         console.log(myArr)
  //     }

  //   }
  // }, []);
  let myarr = [];
  let data = {
    id: props.val?.student_id,
    class: props.val?.class,
    createdby: 'asante',
    pref: repeat,
  };
  const handleSubmit = (e) => {
    console.log(repeat);
      dispatch(PrefencesAction(data));
  };

  return (
    <div className="w-full">
      <div className="grid  gap-8">
        <div className="col-span-12">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
            <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Student Prefences
              </h3>
            </div>
            <div className="p-7">
              <form ref={formRef1}>
                <div className="w-full flex mb-4 sm:w-2/2">
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Student ID
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    defaultValue={props.val?.student_id}
                    disabled
                  />
                </div>
                <div className="w-full flex mb-4 sm:w-2/2">
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Student Name
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    defaultValue={
                      props.val?.firstName +
                      ' ' +
                      props.val?.otherName +
                      ' ' +
                      props.val?.lastName
                    }
                    disabled
                  />
                </div>

                <div className="w-full mb-3 mt-4 sm:w-2/2">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                   Select Fee Cartegory Preferences
                  </label>{' '}
                  <div>
                    {props?.cart.map((item, index) => (
                      <div key={index}>
                        <div className=" flex  gap-6 sm:w-full">
                       <div className=''>
                        <PreferenceRadio 
                          
                          setRepeated={setRepeat}
                          repeat={repeat}
                          stdId={item?.name}
                          
                          />
                                                  </div>

                          <label
                            className="block pt-1  text-sm font-medium text-black dark:text-white"
                            htmlFor="checkboxLabelOne"
                          >
                            {"- " +item?.name}
                          </label>
                        
                        </div>

                        {/* <StudentPreferenceSelect
                        info={props?.cart[index]}
                        arr={myarr}
                        setselectedarr={setselectedArr}
                        pref={(val)=>getpref(val)}
                      /> */}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-8.5 gap-4.5">
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
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      props.close(false);
                    }}
                  >
                    close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPreferenceModal;
