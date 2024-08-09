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
import ClassSelect from './ClassSelect';
import ClassSelect2 from './ClassSelect2';
import SessionSelect from './SessionSelect';

const AssignFeeModal = (props) => {
  const dispatch = useDispatch();
  const [type, setType] = useState(true);
  const [isChecked1, setIsChecked1] = useState(true);

  const [amount, setAmount] = useState([]);

  const [loader, setLoader] = useState(true);
  const [clazz, setclazz] = useState();

  const [name, setName] = useState(false);
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [invoice, setInvoice] = useState('');
  const [expensehead, SetExpenseHead] = useState('');
  const [file, setFile] = useState('');
  const [sessionoption, setSessionoption] = useState('');

  const [filename, setFileName] = useState('');
  function hashgenerator() {
    return Math.floor(Math.random() * (90000 - 10000 + 1)) + 10000;
  }
  let customfile = hashgenerator() + filename;

  const classdata = JSON.stringify({
    name: name,
    createdby: 'Asante',
    amount: amount,
    invoice: invoice,
    description: desc,
    expensehead: expensehead,
    date: date,
    filename: filename,
  });

  const handleSubmit = () => {
    const data = new FormData();
    data.append(customfile, file);
    data.append('data', classdata);

    if (name == '') {
      return toast.error('Error - Name Cannot Be Empty');
    }
    if (date == '') {
      return toast.error('Error - Date Cannot Be Empty');
    }
    if (amount == '') {
      return toast.error('Error - Amount Cannot Be Empty');
    } else {
      dispatch(CreatesExpenseAction(data));
    }
  };
  return (
    <div className="w-full">
      <div className="w-full mr-5">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Assign Fees
                </h3>
              </div>
              <div className="p-8">
                <form>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <div className="w-full mb-4 sm:w-2/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Class
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <ClassSelect
                            setsectionprop={setclazz}
                            clazz={clazz}
                          />
                        </div>
                      </div>

                      <div className="w-full mb-3 sm:w-2/2">
                        <label
                          className="mb-2 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Academic Session
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <SessionSelect setsectionprop={setSessionoption} />
                        </div>
                      </div>
                      <div className="w-full  sm:w-2/2">
                        <div className="flex w-full ">
                          <div className=" flex   sm:w-1/2">
                            <div className=" flex  sm:w-full">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="checkboxLabelOne"
                              >
                                {'Apply'}
                              </label>
                            </div>

                            <div className="flex justify-start sm:w-2/4">
                              <label
                                htmlFor={'type'}
                                className="flex cursor-pointer select-none "
                              >
                                <div className="relative ">
                                  <input
                                    title={'type'}
                                    type="checkbox"
                                    id={'type'}
                                    className="sr-only"
                                    onChange={() => {
                                      setIsChecked1(true);
                                      setType(true);
                                    }}
                                  />
                                  <div
                                    className={` flex h-5 w-5 items-center justify-center rounded border ${
                                      isChecked1 &&
                                      'border-primary bg-gray dark:bg-transparent'
                                    }`}
                                  >
                                    <span
                                      className={`h-2.5 w-2.5 rounded-sm ${isChecked1 && 'bg-primary'}`}
                                    ></span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>

                          <div className="mb-2 flex   sm:w-1/2">
                            <div className=" flex  sm:w-full">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="checkboxLabelOne"
                              >
                                {'Pending'}
                              </label>
                            </div>

                            <div className="flex justify-start sm:w-2/4">
                              <label
                                htmlFor={'type2'}
                                className="flex cursor-pointer select-none "
                              >
                                <div className="relative ">
                                  <input
                                    title={'type2'}
                                    type="checkbox"
                                    id={'type2'}
                                    className="sr-only"
                                    onChange={() => {
                                      setIsChecked1(false);
                                      setType(false);
                                    }}
                                  />
                                  <div
                                    className={` flex h-5 w-5 items-center justify-center rounded border ${
                                      !isChecked1 &&
                                      'border-primary bg-gray dark:bg-transparent'
                                    }`}
                                  >
                                    <span
                                      className={`h-2.5 w-2.5 rounded-sm ${!isChecked1 && 'bg-primary'}`}
                                    ></span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="emailAddress"
                        >
                          Description/Notes
                        </label>
                        <div className="relative">
                          <textarea
                            className="w-full rounded border border-stroke bg-gray py-2  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            name="bio"
                            id="bio"
                            rows={2}
                            placeholder=""
                            onChange={(e) => setDesc(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="w-1/2">
                      <div className="flex justify-between">
                        <label
                          className="mb-3 py-auto block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Fee Cartegories
                        </label>
                        <label
                          className="mb-3 py-auto block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Amount To Charge
                        </label>
                      </div>
                      <div className="flex   ">
                        <div className="w-3/5 flex  ">
                          {' '}
                          <label
                            className=" my-auto  block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Tuition
                          </label>
                        </div>{' '}
                        <div className="  w-2/5">
                          <input
                            className="w-full rounded border border-stroke bg-gray py-1.5 mb-1 px-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue="0.00"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex   ">
                        <div className="w-3/5 flex  ">
                          {' '}
                          <label
                            className=" my-auto  block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Feeding
                          </label>
                        </div>{' '}
                        <div className="  w-2/5">
                          <input
                            className="w-full py-1.5 mb-1 rounded border border-stroke bg-gray px-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue="0.00"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex   ">
                        <div className="w-3/5 flex  ">
                          {' '}
                          <label
                            className=" my-auto   block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Transport
                          </label>
                        </div>{' '}
                        <div className="  w-2/5">
                          <input
                            className="w-full rounded border border-stroke bg-gray py-1.5 mb-1 px-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue="0.00"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex mt-5  ">
                        <div className="w-3/5 flex  ">
                          {' '}
                          <label
                            className=" my-auto    block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Total Fees To Be Charged
                          </label>
                        </div>{' '}
                        <div className="  w-2/5">
                          <input
                            className="w-full rounded border border-stroke bg-gray py-1.5 mb-1 px-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue="0.00"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignFeeModal;
