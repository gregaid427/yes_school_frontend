import React, { useEffect, useRef, useState } from 'react';
import {
  CreatesInventoryCartegoryAction,
  fetchInventCartegoryAction,
  resetcreatecart,
} from '../redux/slices/inventSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { MasrkstudentWaiting } from '../redux/slices/studentSlice';

const SetSessionAlert = (props) => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state?.inventory);

  const { CreateInventorycart } = inventory;
  useEffect(() => {
    if (CreateInventorycart?.success == 0) {
      toast.error('Error - Adding Item Cartegory ');
      //    dispatch(resetcreatecart())
      // dispatch(fetchAllClassAction())
    }
    if (CreateInventorycart?.success == 1) {
      toast.success('Item Added Successfully');
      dispatch(fetchInventCartegoryAction());
      resetFormStates();
      dispatch(resetcreatecart());
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

  const [cartegoryName, setcartegoryName] = useState();
  const [note, setNote] = useState();
  console.log(props.yes);

  const formRef1 = useRef();

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }
  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;
  let data = {
    cartegoryname: cartegoryName,
    createdby: username?.payload,
    notes: note,
  };
  const handleSubmit = (e) => {
    if (cartegoryName == '') {
      toast.error('Error - Name Cannot Be Empty');
    } else {
      dispatch(CreatesInventoryCartegoryAction(data));
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
        <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
          <h3 className="font-medium text-center text-black dark:text-white">
            Update Academic Session
          </h3>
        </div>
        <div className="p-7">
          <form>
            <div style={{ display: props.yes == undefined ? 'block' : 'none' }}>
              <div className="w-full mb-4 sm:w-2/2">
                <label
                  className="mb-3 block text-sm text-center font-medium text-black dark:text-white"
                  htmlFor=""
                >
                  Will the Chosen Or Added Session Require Students Promoted
                  From Previous Session ?
                </label>
              </div>

              <div className="flex text-center  mx-auto w-6/12 gap-4.5">
                <button
                  className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();

                    props.setYes(true);
                  }}
                >
                  Yes
                </button>
                <button
                  className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    props.setYes(undefined);
                    props.close(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
            <div style={{ display: props.yes ?? 'none' }}>
              <div className="w-full mb-4 sm:w-2/2">
                <label
                  className="mb-3 block text-sm text-center font-medium text-black dark:text-white"
                  htmlFor=""
                >
                  Alert ! :- Students Will Be Required To Be Promoted Inorder To
                  Appear In Their Respective Class Lists
                </label>
              </div>
              <div className="w-full mb-4 sm:w-2/2">
                <label
                  className="mb-3 block text-sm text-center font-medium text-black dark:text-white"
                  htmlFor=""
                >
                  Do You Want To Continue?{' '}
                </label>
              </div>

              
              <div className="flex text-center  mx-auto w-6/12 gap-4.5">
                <button
                  className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(MasrkstudentWaiting())
                    props.setYes(undefined);
                    props.close(false);
                  }}
                >
                  Yes
                </button>
                <button
                  className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    props.setYes(undefined);
                    props.close(false);
                  }}
                >
                  No
                </button>
              </div>

              {/* <div className="flex justify-center gap-4.5">
                <button
                  className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    props.close(false);

                    props.setYes(undefined);
                  }}
                >
                  Close
                </button>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetSessionAlert;
