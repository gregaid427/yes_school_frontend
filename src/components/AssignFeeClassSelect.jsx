import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassSelect3 from './ClassSelect3';
import SessionSelect1 from './SessionSelect1';
import { AssignFeesAction } from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';
import ClassSelect2 from './ClassSelect2';

const AssignFeeClassSelect = (props) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(0);

  const [clazz, setclazz] = useState();
  const [isChecked1, setIsChecked1] = useState();
  const [isChecked, setIsChecked] = useState(false);


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
    data4['class'] = clazz;
    data4['session'] = sessionoption;
    data4['total'] = data3;
    data4['createdby'] = 'Asante';
    delete data4.test;
    data4['fee'] = pop(data2);
    console.log('data4');
    console.log(data4.fee);

    if (data4.fee[0] == undefined) {
      return toast.error('Error -Fee Cartegory Cannot Be Empty');
    } else {
      dispatch(AssignFeesAction(data4));
    }

    useEffect(() => {
      if (fetchAllClass?.success == 0) {
        toast.error('Error Loading Class');
       
      }
    }, [fetchAllClassloading]);
  };
  return (
    <div className="w-full">
      <div className=" flex mt-2  mb-2 ">
        <div className="flex justify-start mr-2 ">
          <label htmlFor={props.index} className="flex cursor-pointer select-none ">
            <div className="relative ">
              <input
                title={props.index}
                type="checkbox"
                id={props.index}
                className="sr-only"
                onChange={() => {
                 if(props.selectedarr.includes(props.info?.title)){
                  props.selected([props.selectedarr.filter((element) => element !== props.info?.title)])
                  setIsChecked(!isChecked);
                  console.log(props.selectedarr)

                 }
                 else{
                  setIsChecked(!isChecked);
                  props.selected([...props.selectedarr,props.info?.title])
                 }
                  console.log(props.selectedarr)
                }}
              />
              <div
                className={` flex h-5 w-5 items-center justify-center rounded border ${
                  isChecked && 'border-primary bg-gray dark:bg-transparent'
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'}`}
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
            {props.info?.title}
          </label>
        </div>
      </div>
    </div>
  );
};

export default AssignFeeClassSelect;
