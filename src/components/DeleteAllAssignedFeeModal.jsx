import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AssignFeesAction,
  DeleteAllAssignedFeeAction,
  GenerateFeeAction,
} from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DeleteAllAssignedFeeModal = (props) => {
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
  let navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;
  const data = {
    createdby: username?.payload,
  };

  const handleSubmit = () => {
    dispatch(DeleteAllAssignedFeeAction(data));
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
  console.log(clazz);
  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border py-3 px-7 border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke  dark:border-strokedark">
                <h3 className="font-medium mb-5  text-black dark:text-white">
                  Delete All Assigned Fee
                </h3>
              </div>
              <h4 className="text-sm  text-black text-center dark:text-white">
                {' '}
                Are You sure You Want To Delete Assigned Fee For All Classes ?
              </h4>
              <div className="p-8 flex gap-2">
                <button
                  className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  Proceed
                </button>
                <button
                  className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
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
        </div>
      </div>
    </div>
  );
};

export default DeleteAllAssignedFeeModal;
