import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  CreatesScholarshipAction,
  fetchfeeCartegoryAction,
  UpdateScholarshipAction,
} from '../redux/slices/feeSlice';
import AssignFeeClassSelect from './AssignFeeClassSelect';
import ScholarshipcartSelect from './ScholarshipcartSelect';
import FeeCartSelect from './FeecartSelect';

const ScholarshipItemEdit = (props) => {
  const dispatch = useDispatch();
  const fees = useSelector((state) => state?.fees);

  const { cartegory } = fees;

  //       }
  //     if (CreateScholar?.success == 1) {
  //       toast.success(' Scholarship Added Successfully');
  //       resetFormStates()
  //        props.close((false))

  //       }

  //     // if (fetchAllClass?.success == 1) {
  //     //   let i = 0;
  //     //   let arr = [];
  //     //   while (i < clad?.fetchAllClass?.data.length) {
  //     //     arr.push(clad?.fetchAllClass?.data[i].title);
  //     //     i++;
  //     //   }

  //     //   setClasss(arr);
  //     // }
  //   }, [CreateScholar]);
  useEffect(() => {
    dispatch(fetchfeeCartegoryAction());
  }, []);
  const [cartegoryName, setcartegoryName] = useState(props.info?.title);
  const [description, setDesription] = useState('');
  const [amount, setAmount] = useState(props.info?.amount);
  const [isChecked1, setIsChecked1] = useState(
    props.info?.type == 'Percentage' ? true : false,
  );
  const [selectedArr, setselectedArr] = useState([]);
  const [feecartegory, setfeecart] = useState(props.info?.applicable);
  const [percent, setPercent] = useState(props.info?.percentage);
  const [type, settype] = useState(props.info?.type);

  const formRef1 = useRef();

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }

  let data = {
    title: cartegoryName,
    createdby: 'asante',
    amount: isChecked1 == false ? amount : 0,
    type: type,
    percent: isChecked1 == true ? percent : null,
    applicable: feecartegory,
    id:props.info.id
  };

  const handleSubmit = (e) => {
    if (cartegoryName == '') {
      return toast.error('Error - Name Cannot Be Empty');
    }
    if (feecartegory == 'FEE PAYABLE' && type == 'Percentage') {
      return toast.error('Error - Please Select Fee Caetegory ');
    }
    if (feecartegory == 'FEE PAYABLE' && type == 'Percentage') {
      return toast.error('Error - Please Set Percentage');
    }
    if (percent == null && type == 'Percentage' && isChecked1 == true) {
      return toast.error('Error - Please Set Percentsge ');
    }
    if (amount < 1 && type == 'Fixed Value' && isChecked1 == false) {
      return toast.error('Error - Please Set Amount');
    }
    if (amount < 1 && type == 'Fixed Value') {
      return toast.error('Error - Please Set Amount');
    } else {
      dispatch(UpdateScholarshipAction(data));
    }

  };
  console.log(props.info);
  return (
    <div className="w-full">
      <div
        className={
          'rounded-sm border max-w-full border-stroke bg-white px-2 shadow-default dark:border-strokedark dark:bg-boxdark '
        }
      >
        <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Edit Scholarship
          </h3>
        </div>
        <div className="p-5">
          <form ref={formRef1}>
            <div className="w-full mb-4 sm:w-2/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor=""
              >
                Title
              </label>
              <input
                className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name=""
                id=""
                placeholder=""
                defaultValue={props.info?.title}
                onChange={(e) => setcartegoryName(e.target.value.toUpperCase())}
              />
            </div>
            <div>
              <div className="flex gap-4">
                <div className="w-full">
                  <div className="w-full  sm:w-2/2">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Scholarship Option :
                    </label>
                    <div className="flex w-full gap-8">
                      <div className="flex w-full flex-col">
                        <div className=" flex mt-2  mb-2 ">
                          <div className="flex justify-start mr-2 ">
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
                                    setIsChecked1(false);
                                    settype('Fixed Value');
                                    setPercent(null)
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
                          <div className=" flex  sm:w-full">
                            <label
                              className="mb- block text-sm font-medium text-black dark:text-white"
                              htmlFor="checkboxLabelOne"
                            >
                              {'Fixed Value Amount'}
                            </label>
                          </div>
                        </div>

                        <div className=" flex  ">
                          <div className="flex justify-start">
                            <label
                              htmlFor={'type2'}
                              className="flex cursor-pointer select-none "
                            >
                              <div className="relative mr-2 ">
                                <input
                                  title={'type2'}
                                  type="checkbox"
                                  id={'type2'}
                                  className="sr-only"
                                  onChange={() => {
                                    setIsChecked1(true);
                                    settype('Percentage');
                                    setAmount(0)
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
                          <div className=" flex  sm:w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="checkboxLabelOne"
                            >
                              {'Percentage On Chosen Fee cartegory'}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={!isChecked1 ? '' : 'hidden'}>
                    <div className="w-full my-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Amount
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={props.info?.amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={isChecked1 ? '' : 'hidden'}>
                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Percentage (%)
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={props.info?.percent}
                        onChange={(e) => setPercent(e.target.value)}
                      />
                    </div>
                    <div className="w-full mb-3 mt-4 sm:w-2/2">
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Select Fee Cartegory Applicable
                      </label>{' '}
                      <div className="w-full flex align-middle">
                     
                        <div className="w-1/2 align-middle flex ">
                        <label
                        className="mb-2 block text-sm font-medium my-auto text-black dark:text-white"
                        htmlFor=""
                      >
                          Current : {props.info?.applicable}
                          </label>{' '}
                        </div>
                        <div className="w-1/2">
                          <FeeCartSelect setsectionprop={setfeecart} />
                        </div>
                      </div>
                    </div>
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

export default ScholarshipItemEdit;
