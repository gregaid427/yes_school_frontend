import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AssignFeesAction, GenerateFeeAction } from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';


const GenerateFeeModak = (props) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(0);

  const [clazz, setclazz] = useState();
  const [isChecked1, setIsChecked1] = useState();
  const [selectedArr, setselectedArr] = useState([]);

  const [desc, setDesc] = useState('');
  const clad = useSelector((state) => state?.classes);

  const { fetchAllClassloading, fetchAllClass } = clad;
  const fee = useSelector((state) => state?.fees);
  const { cartegory } = fee;

 

    const data ={
      createdby : "Asante"
  }
  
  const handleSubmit = () => {
    
    if (false) {
      return toast.error('Error -Fee Cartegory Cannot Be Empty');
    } else {
      dispatch(GenerateFeeAction(data));
    }
  };

 
  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium  text-black dark:text-white">
                  Generate Fee
                </h3>
              </div>
              <div className="p-8 flex gap-2">
              <button
                        className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={(e) => {
                          e.preventDefault()
                          handleSubmit();
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="reset"
                        onClick={()=> props.close((false))}

                      >
                        
                        Close
                      </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateFeeModak;
