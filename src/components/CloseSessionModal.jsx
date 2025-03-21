import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AssignFeesAction,
  CloseSessionAcountAction,
  GenerateFeeAction,
} from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SessionSelect from './SessionSelect';
import SessionSelect1 from './SessionSelect1';

const CloseSessionModal = (props) => {
  const dispatch = useDispatch();

  const session = useSelector((state) => state?.session);

  const { fetchsession, fetchsessionactive } = session;
  const [display, setDisplay] = useState(false);
  const [sessionoption, setSessionoption] = useState('None');
  const [sessionoption1, setSessionoption1] = useState('');

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
  const { username, userMail } = user;

  const data = {
    createdby: username?.payload,
    oldsession: sessionoption1,
    newsession: sessionoption,
  };

  const handleSubmit = () => {
    if (sessionoption == 'None') {
      // setDisplay(newsession);
      return toast.error('Select New Session');
    }
    if (sessionoption1 == 'None') {
      return toast.error('Select Old Session');
    }
    if (sessionoption1 == sessionoption) {
      return toast.error('Both Session Cannot Be same');
    } else {
      setDisplay(false);
      dispatch(CloseSessionAcountAction(data));
    }
  };
  
  useEffect(() => {
    props?.account(sessionoption);
  }, [sessionoption]);


  useEffect(() => {
    props?.oldaccount(sessionoption1);
  }, [sessionoption1]);
  

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
        }
        i++;
        if (i + 1 == props.val?.length) setclazz(arr);
      }
    }
  }, []);
  console.log(sessionoption1);
  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border py-3 px-7 border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke  dark:border-strokedark">
                <h3 className="font-medium mb-5  text-black dark:text-white">
                  Close Session Account
                </h3>
              </div>
              <div className={!clazz[0] ? '' : 'hidden'}>
                {/* <h4 className="text-sm  text-black  dark:text-white">
                  {' '}
                  Select Previous / Outgoing Session{' '}
                </h4>

                <div className="relative  z-20 bg-white dark:bg-form-input">
                  <SessionSelect setsectionprop={setSessionoption} />
                </div> */}

                <div className="flex justify-between">
                  <label
                    className="mb-1 w-2/2 block py-3 text-sm font-medium text-black dark:text-white"
                    htmlFor=" "
                  >
                    Select New / Upcoming Session{' '}
                  </label>
                  <button
                    className="flex w-auto h-9  justify-center mt-1 rounded bg-primary py-1 px-2 font-sm text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      props.openModal(true);
                    }}
                  >
                    Add New Session
                  </button>
                </div>

                <div className="relative z-20 bg-white dark:bg-form-input">
                  <SessionSelect1 setsectionprop={setSessionoption} />
                </div>

                <div className="flex justify-between">
                  <label
                    className="mb-1 w-2/2 block py-3 text-sm font-medium text-black dark:text-white"
                    htmlFor=" "
                  >
                     Session To Close Account on{' '}
                  </label>
                </div>

                <div className="relative z-20 bg-white dark:bg-form-input">
                  <SessionSelect setsectionprop={setSessionoption1} />
                </div>
                <div className="py-8 flex gap-2">
                  <button
                    className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                      props.close(false);
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
              {/* <div className={clazz[0] ? '' : 'hidden'}>
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloseSessionModal;
