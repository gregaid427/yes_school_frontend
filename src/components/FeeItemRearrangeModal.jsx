import React, { useEffect, useRef, useState } from 'react';
import {
  CreatesInventoryCartegoryAction,
  fetchInventCartegoryAction,
  resetcreatecart,
} from '../redux/slices/inventSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ExpenseHeadSelect from './ExpenseHeadSelect';
import { CreatesExpenseAction } from '../redux/slices/expenseSlice';
import { ReorderFeeItemsAction } from '../redux/slices/feeSlice';

const FeeItemRearrangeModal = (props) => {
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(props.data)
  }, []);

  const moveItemUp = (index) => {
    if (index > 0) {
      const newItems = [...items];
      [newItems[index], newItems[index - 1]] = [
        newItems[index - 1],
        newItems[index],
      ];
      setItems(newItems);
    }
  };

  const moveItemDown = (index) => {
    if (index < items.length - 1) {
      const newItems = [...items];
      [newItems[index], newItems[index + 1]] = [
        newItems[index + 1],
        newItems[index],
      ];
      setItems(newItems);
    }
  };
console.log(items)
  const handleSubmit = () => {
   
    if (items.length == 0) {
      return toast.error('Cannot Save Empty Items');
    } else {
      dispatch(ReorderFeeItemsAction({'data':items}));
    }
  };
  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Reorder Fee Items
                </h3>
              </div>
              <div className="p-8">
                <div className="flex w-full gap-2">
                  <ul className='w-full'>
                    {items.map((item, index) => (
                      <li key={index}>
                        <div className="flex my-1 w-full  pl-2 gap-2">
                          <div className="w-full ">
                            <label
                              className="mb-3 flex my-2 text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                            {index+1}.  {item?.name}
                            </label>
                          </div>
                          <button
                            className="flex w-2/12 justify-center rounded bg-primary py-1 px-3 font-medium text-gray hover:bg-opacity-90"
                            type=""
                            onClick={(e) => {
                              e.preventDefault();
                              moveItemUp(index);
                            }}
                          >
                            <svg
                              className="menu-item-arrow menu-item-arrow-inactive rotate-180 fill-current"
                              width="30"
                              height="30"
                              viewBox="0 0 20 20"
                              fill="none"
                              color="#fff"
                             
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                stroke=""
                                stroke-width="1.5"
                                stroke-linecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </button>
                          <button
                            className="flex w-2/12 justify-center rounded bg-primary py-1 px-3 font-medium text-gray hover:bg-opacity-90"
                            type=""
                            onClick={(e) => {
                              e.preventDefault();
                              moveItemDown(index);
                            }}
                          >
                            <svg
                              className="menu-item-arrow menu-item-arrow-inactive fill-current"
                              width="30"
                              height="30"
                              viewBox="0 0 20 20"
                              fill="none"
                              color="#fff"
                           
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                stroke=""
                                stroke-width="1.5"
                                stroke-linecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>{' '}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex mt-3 justify-end gap-4.5">
                  <button
                    className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(e);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="reset"
                    onClick={() => props.close(false)}
                  >
                    Close
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

export default FeeItemRearrangeModal;
