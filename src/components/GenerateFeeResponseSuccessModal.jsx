import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AssignFeesAction, GenerateFeeAction } from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const GenerateFeeResponseSuccessModal = (props) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(0);

  const [clazz, setclazz] = useState([]);
  const [isChecked1, setIsChecked1] = useState();
  const [selectedArr, setselectedArr] = useState([]);

  const [desc, setDesc] = useState('');
  const clad = useSelector((state) => state?.classes);

  const { fetchAllClassloading, fetchAllClass } = clad;
  const fee = useSelector((state) => state?.fees);
  const { cartegory } = fee;
  let navigate = useNavigate()
  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;
  const data = {
    createdby: username?.payload,
  };

  const handleSubmit = () => {
    if (false) {
      return toast.error('Error -Fee Cartegory Cannot Be Empty');
    } else {
      dispatch(GenerateFeeAction(data));
    }
  };
  useEffect(() => {
    setDesc(props.val);
    console.log(props.val);
  }, []);
  useEffect(() => {
    if (props.val) {
      let i = 0;
      let arr = [];
      while (i < props.val?.length) {
        if (props.val[i]?.amount == null) {
          arr.push(props.val[i]?.title);

          console.log('jjjjjjj');
        }
        i++;
        if (i + 1 == props.val?.length) setclazz(arr);
      }
    }
  }, []);
  console.log(props);
  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border py-3 px-7 border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke  dark:border-strokedark">
                <h3 className="font-medium mb-5  text-black dark:text-white">
                🟢 Success
                </h3>
              </div>
              <div className=''>
              <h4 className="text-md  text-black  dark:text-white">
                  {' '}
               Message :  Fee Generated Successfully {' '}
                </h4>
                <h4 className="text-sm  text-black  dark:text-white">
                  {' '}
               Generated For Class(es) Below : 
                </h4>
                {props.val?.data?.map((item,index) => (

                <div className='my-1' key={index}>
                <h4 className="text-md   text-black  dark:text-white">
                  {' '}
                  🔵 {item?.class == undefined ? item : item?.class}  
                </h4>
                {/* <h4 className="text-md  text-black  dark:text-white">
                  {' '}
                   Unassigned Cartegories :    {item?.cart.toString()}     
                </h4> */}
               
                </div>

))}

                <div className="py-5 flex gap-2">
                  
                  <button
                    className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/fees/Assignfees')
                    }}
                  >
                    Get Assigned Fees List
                  </button>
                  <button
                    className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    onClick={(e) => {  e.preventDefault();
                      props.close(false);}}
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className={clazz[0] ? '' : 'hidden'}>
                <h3 className="font-medium  mb-2 text-black text-center dark:text-white">
                  You Will Be Required To Assign Fee To All Classes Inorder To
                  Generate Fee
                </h3>
                <h4 className="text-sm  text-black text-center dark:text-white">
                  {' '}
                  The Following Classes Are Not Assigned yet :{' '}
                </h4>
                <h4 className="text-sm  text-black text-center dark:text-white">
                  {' '}
                  {clazz.toString()}
                </h4>
                <div className="flex gap-4.5 my-4">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/fees/Assignfees')
                      }}
                    >
                      Assign Fee
                    </button>
                    <button
                      className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      onClick={(e) => {  e.preventDefault();
                        props.close(false);}}
                    >
                      Cancel
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

export default GenerateFeeResponseSuccessModal;
