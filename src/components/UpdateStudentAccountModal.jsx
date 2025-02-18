import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AssignFeesAction,
  CustomBalUpdate,
  GenerateFeeAction,
  GenerateFeeStudentAction,
  resetGeneratefee,
} from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  fetchSingleStudent,
  resetSinglestudent,
} from '../redux/slices/studentSlice';

const UpdateStudentAccountModal = (props) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(props?.info?.accountbalance);


  const [id, setId] = useState(props?.info?.student_id);

  const [desc, setDesc] = useState('');
  const [Fname, setfName] = useState(props?.info?.firstName);
  const [Lname, setLName] = useState(props?.info?.lastName);
  const [Mname, setMName] = useState(props?.info?.otherName);
  const [classs, setClass] = useState(props?.info?.class);
  const [secton, setSection] = useState(props?.info?.section);
  const [arrears, setArrears] = useState(props?.info?.arrears);

  const clad = useSelector((state) => state?.classes);

  const fee = useSelector((state) => state?.fees);
  const { cartegory, Generatefee, custom } = fee;


  const user = useSelector((state) => state?.user);
  const { username, userMail } = user;
  let data1 = {
    id: id,
    class: classs,
    collectedby: username?.payload,
    amount: amount,
    arrears: arrears,
  };
  const handleUpdate = (e) => {
    console.log(data1)
    if (amount < 1) {
      return toast.error('Error - Enter Valid Amount');
    } else {
      dispatch(CustomBalUpdate(data1));
    }
  };




  useEffect(() => {
    if (custom?.success == 0) {
      toast.error('Error Generating Fee');
      dispatch(resetGeneratefee());
      dispatch(resetSinglestudent());
    }

    if (custom?.success == 1) {
      dispatch(resetGeneratefee());
      dispatch(resetSinglestudent());

      
    }
  }, [custom]);
  let fullname = Fname + ' ' + Mname + ' ' + Lname;
  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border py-3 px-7 border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke  dark:border-strokedark">
                <h3 className="font-medium mb-5  text-black dark:text-white">
                  Update Fee
                </h3>
              </div>

              <form>
                <div className="w-full flex mb-1 mt-1 sm:w-2/2">
                  <label
                    className="my-auto w-3/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Student ID
                  </label>
                  <label
                    className="my-auto w-full block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    {id}
                  </label>
                </div>
                <div className="w-full flex mb-1 sm:w-2/2">
                  <label
                    className="my-auto w-3/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Student Name
                  </label>
                  <label
                    className="my-auto w-full block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    {fullname}
                  </label>
                </div>

                <div className="w-full flex mb-1 sm:w-2/2">
                  <label
                    className="my-auto w-3/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Class / section
                  </label>
                  <label
                    className="my-auto w-full block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    {classs + ' ' + `${secton ? '/' : ''}` + ' ' + secton}{' '}
                  </label>
                </div>
                <div className="border-b flex flex-col my-2 py-1 border-t border-stroke dark:border-strokedark">
                  <p>
                    <span className="flex justify-around my-1 text-black dark:text-white text-md py-1 text-center mx-auto">
                      Update Student's Account balance
                    </span>
                  </p>
                  <div className="gap-2  ">
                    <div className="w-full flex mb-1 sm:w-2/2">
                      <label
                        className="my-auto w-3/5 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Enter Account Balance :
                      </label>
                      <input
                        className="w-2/5 rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={props?.info?.accountbalance}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-full flex mb-1 sm:w-2/2">
                      <label
                        className="my-auto w-3/5 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Enter Arrears :
                      </label>
                      <input
                        className="w-2/5 rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name=""
                        id=""
                        defaultValue={props?.info?.arrears}
                        placeholder=""
                        onChange={(e) => {
                          setArrears(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-full flex my-4 gap-2 ">
                      <button
                        className="flex w-full justify-center rounded bg-primary py-2 px-3 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={(e) => {
                          e.preventDefault();
                          handleUpdate();
                        }}
                      >
                        Update
                      </button>{' '}
                      <button
                        className="flex w-full justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type=""
                        onClick={(e) => {
                          e.preventDefault();
                          props.close(false);
                          dispatch(resetGeneratefee());
                          dispatch(resetSinglestudent());

                          setDesc([]);
                          setfName('');
                          setMName('');
                          setLName('');
                          setClass('');
                          setSection('');
                          setId();
                        }}
                      >
                        close
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudentAccountModal;
