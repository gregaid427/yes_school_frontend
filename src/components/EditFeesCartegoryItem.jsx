import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  CreatesfeeCartegoryAction,
  fetchfeeCartegoryAction,
  resetcreatefee,
  resetUpdateFeeCart,
  UpdateFeeCartAction,
} from '../redux/slices/feeSlice';

const EditFeesCartegoryItem = (props) => {
  const dispatch = useDispatch();
  const fees = useSelector((state) => state?.fees);

  const { Createfeecart, UpdateFeeCart } = fees;
  useEffect(() => {
    if (UpdateFeeCart?.success == 0) {
      //    dispatch(resetcreatecart())
      // dispatch(fetchAllClassAction())
      console.log(UpdateFeeCart)
    }
    if (UpdateFeeCart?.success == 1) {
      dispatch(resetUpdateFeeCart());
      props.close(false);

      // }
    }
  }, [UpdateFeeCart]);

  const [cartegoryName, setcartegoryName] = useState(props.data?.name);

  const [description, setDesription] = useState(props.data?.description);

  const formRef1 = useRef();

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }

  let data = {
    name: cartegoryName?.toUpperCase(),
    id: props.data?.id,

    createdby: 'asante',
    description: description,
  };
  const handleSubmit = (e) => {
    if (cartegoryName == '') {
      toast.error('Error - Name Cannot Be Empty');
    } else {
      dispatch(UpdateFeeCartAction(data));
    }
  };

  return (
    <div className="w-full">
      <div
        className={
          'rounded-sm border max-w-full border-stroke bg-white px-2 shadow-default dark:border-strokedark dark:bg-boxdark '
        }
      >
        <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Update Fee Cartegory
          </h3>
        </div>
        <div className="p-5">
          <form ref={formRef1}>
            <div className="w-full mb-2 sm:w-2/2">
              <label
                className="mb-1 block text-sm font-medium text-black dark:text-white"
                htmlFor=""
              >
                Name
              </label>
              <input
                className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name=""
                id=""
                placeholder=""
                defaultValue={props.data?.name}
                onChange={(e) => setcartegoryName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                className="mb-1 block text-sm font-medium text-black dark:text-white"
                htmlFor="emailAddress"
              >
                Description/Notes <span className="small-font">(optional)</span>
              </label>
              <div className="relative">
                <textarea
                  className="w-full rounded border border-stroke bg-gray py-3  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="bio"
                  id="bio"
                  rows={2}
                  placeholder=""
                  defaultValue={props.data?.description}
                  onChange={(e) => setDesription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-4.5">
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
  );
};

export default EditFeesCartegoryItem;
