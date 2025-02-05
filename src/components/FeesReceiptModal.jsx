import React, { useEffect, useRef, useState,useId } from 'react';
import {
  CreatesInventoryCartegoryAction,
  fetchInventCartegoryAction,
  resetcreatecart,
} from '../redux/slices/inventSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import FeeRadio from './FeeRadio';
import { PayFeeAction } from '../redux/slices/feeSlice';
import { Print } from 'print-react';
import userThree from '../images/user/user-03.png';

const FeesReceiptModal = (props) => {
  const ref = useRef({ openPrintDialog: () => Promise });
console.log(props)
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state?.inventory);

  const { CreateInventorycart } = inventory;
  const user = useSelector((state) => state?.user);
  const { allschool } = user;


  useEffect(() => {
    if (allschool?.success == 0) {
      //toast.error('Error - Adding Item Cartegory ');
      //    dispatch(resetcreatecart())
      // dispatch(fetchAllClassAction())
    }
    if (allschool?.success == 1) {
      setPictureurl(allschool?.data[0]?.logolink)
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
  }, [allschool]);


  const session = useSelector((state) => state?.session);
  const { fetchsessionactive, fetchsession } = session;
  const [amount, setAmount] = useState(0);
  const [mode, setmode] = useState('Cash');
  const [sessionz, setsession] = useState(null);

  const [pictureurl, setPictureurl] = useState(null);

  const formRef1 = useRef();
  useEffect(() => {
    if (fetchsessionactive?.success == 1) {
      let data = fetchsessionactive?.data[0];
      setsession(data);
      console.log('sessionz');
    }
  }, [fetchsessionactive]);
  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }
  let balanceresult = eval(
    parseInt(props.val?.accountbalance) + parseInt(amount),
  );
  function receiptidGen() {
    const max = 100
    return Math.floor(Math.random()*(max+1))

  }
const { username, userMail} = user;
  let receiptid = receiptidGen()
  console.log(receiptid)
  let date = new Date();
  date = date.toUTCString().slice(0, 17);
  let data = {
    id: props.val?.student_id,
    class: props.val?.class,
    section: props.val?.section,
    collectedby: username?.payload,
    amountpaid: amount,
    mode: mode,
    balbeforepayment: props.val?.accountbalance,
    balanceafterpayment: balanceresult,
    receiptid: receiptid,
  };
  console.log(data)
  const handleSubmit = (e) => {
    if (amount < 1) {
      toast.error('Error - Enter Valid Amount');
    } else {
      dispatch(PayFeeAction(data));
    }
  };
  console.log(pictureurl);
  return (
    <div className="w-full">
      <div className="grid  gap-8">
        <div className="col-span-12">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
            <div className="border-b flex justify-between  border-stroke py-3 px-10 dark:border-strokedark">
              <h3 className="font-medium my-auto text-black dark:text-white">
                Receipt
              </h3>
              <div className="flex justify-end gap-4.5">
                <button
                  className="flex  justify-center rounded bg-primary py-1 px-3 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={async (e) => {
                    e.preventDefault();

                    await ref.current.openPrintDialog();
                  }}
                >
                  Print
                </button>

                <button
                  className="flex  justify-center rounded bg-primary py-1 px-3 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    props.close(false);
                  }}
                >
                  Save PDF
                </button>
                <button
                  className="flex  justify-center rounded border border-stroke py-1 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    props.close(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
            <div className="py-4 px-10">
              <Print
                ref={ref}
                printWidth={900}
                marginTop={48}
                marginLeft={20}
                marginRight={20}
                onOpenPrintDialog={() => {
                  setPrintDialogOpen(true);
                }}
                onClosePrintDialog={() => {
                  setPrintDialogOpen(false);
                }}
              >
                <div className="w-full">
                  <div className="flex border-b justify-between pb-2 border-stroke  dark:border-strokedark">
                  <img
                      src={pictureurl == null ? userThree : pictureurl}
                      className="float-end mb-2 h-25 mr-2"
                    />
                    <div className="border-l pl-2 border-stroke  dark:border-strokedark w-full ">
                      <p>
                        <span className="text-xl">
                          {allschool?.data[0]?.name}
                        </span>
                      </p>
                      <p>
                        <span className="text-sm">
                          {' '}
                          {allschool?.data[0]?.address}
                        </span>
                      </p>
                      <p>
                        <span className="text-sm ">
                          {allschool?.data[0]?.contact1}{' '}
                          {allschool?.data[0]?.contact2 ? '/' : ''}{' '}
                          {allschool?.data[0]?.contact2}
                        </span>
                      </p>
                      <p>
                        <span className="flex text-sm align-bottom">
                          {' '}
                         Session : {sessionz?.sessionname}
                        </span>
                      </p>
                      {/* <p>Accra, Ghana</p>   */}
                    </div>
                  
                  </div>
                  <div className="flex border-b justify-between  border-stroke  dark:border-strokedark">
                    <div className="w-full flex py-3 justify-between">
                      <div className="w-4/12 text-sm">
                        <p>
                          {props.val?.student_id} / {props.val?.class} 
                          {/* {props.val?.section} */}
                        </p>

                        <p>
                          {props.val?.firstName +
                            ' ' +
                            props.val?.otherName +
                            ' ' +
                            props.val?.lastName}
                        </p>
                        <p></p>
                      </div>
                      <div className="w-4/12 text-center">
                        <p className="text-xl font-bold text-center flex flex-col  ">
                          Fee Receipt
                          <span className="text-xs font-extralight items-center    ">
                          {' '}
                         ({sessionz?.activeaccountid})
                        </span>
                        </p>
                        
                      </div>
                      <div className="w-4/12 text-right text-sm">
                        <p>{date}</p>
                        <p>Receipt No : {props?.response?.receiptid}</p>
                      </div>
                    </div>
                  </div>{' '}
                </div>
                
                <div className="flex border border-stroke  dark:border-strokedark p-4">
                  <div className="flex border-b  w-8/12 border-stroke  dark:border-strokedark">
                    <table className="w-full  ">
                      <thead className="w-full border-b border-stroke  dark:border-strokedark">
                        <tr className="w-full  ">
                          <th className="text-sm float-start flex font-semibold w-4/12">
                            <p>#</p>
                          </th>
                          <th className="text-sm  font-semibold w-4/12">
                            Fee Cartegory
                          </th>
                          <th className="text-sm font-semibold w-4/12">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      {}
                      <thead className="w-full  ">

                        {props.cart?.map((item, index) => (
                          <tr className="w-full  " key={index} >
                            {' '}
                            <th className="text-sm float-start  font-light w-4/12">
                              {index + 1}
                            </th>
                            <th className="text-sm text font-light w-4/12">
                              {item?.feename}{' '}
                            </th>
                            <th className="text-sm font-light w-4/12">
                              {props.val?.preference?.includes(item?.feename)
                                ? 0
                                : item?.amount}
                            </th>
                          </tr>
                          
                        ))}
                                  <tr className="w-full  ">
                            {' '}
                            <th className="text-sm float-start  font-light w-4/12">
                              {'-'}
                            </th>
                            <th className="text-sm uppercase text font-light w-4/12">
                            Previous Session Arrears 
                            </th>
                            <th className="text-sm font-light w-4/12">
                            {props?.response?.arrears}
                            </th>
                          </tr>           

                      </thead>
                      <div className='w-full flex'>  </div>

                      <thead
                        className={
                          props?.val?.scholarship < 1 ? 'hidden' : 'w-full'
                        }
                      >
                        <tr className="w-full  border-stroke  dark:border-strokedark ">
                          {' '}
                          <th className="text-sm  font-light w-1/12"></th>
                          <th className="text-sm text-right font-light w-6/12">
                            Scholarship
                          </th>
                          <th className="text-sm font-light w-4/12">
                            ( {props?.val?.scholarship} )
                          </th>
                        </tr>
                      </thead>
                      <thead className="w-full   ">
                        <tr className="w-full border-t border-stroke  dark:border-strokedark ">
                          {' '}
                          <th className="text-sm  font-light w-1/12"></th>
                          <th className="text-sm text-right font-bold  w-6/12">
                            Fee Payable For Session
                          </th>
                          <th className="text-sm font-bold  w-4/12">
                            {eval(
                              props.val?.feepayable - props?.val?.scholarship + parseFloat(props?.response?.arrears)
                            )}
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </div>

                  <div className="border-l font-thin px-3 text-sm flex float-end flex-col w-5/12 border-stroke  dark:border-strokedark">
                    <div className="flex w-full justify-between float-end">
                     <p>Amount Paid </p>  {props?.response?.amountpaid}
                    </div>
                    {/* <div className="flex float-end">
                       Arrears : {eval(props.val?.feepayable - props?.response?.balbeforepayment)}
                    </div> */}
                     {/* <div className="flex w-full justify-between float-end">
                     <p>Previous Session Arrears  </p> {props?.response?.arrears}
                    </div> */}
                    <div className="flex w-full justify-between float-end">
                     <p>Balance Before Payment </p> {props?.response?.balbeforepayment}
                    </div>

                    <div className="flex w-full justify-between font-bold float-end">
                     <p>Current Balance </p>  {props?.response?.balanceafterpayment}
                    </div>
                  </div>
                </div>

                <div className="flex text-sm mt-10 flex-row w-full">
                  <p className="text-center w-4/12 ">Payment Mode</p>
                  <p className="text-center w-4/12 ">
                    .........................
                  </p>
                  <p className="text-center w-4/12 ">
                  {props?.response?.collectedby}
                  </p>
                </div>
                <div className="flex text-sm flex-row w-full">
                  <p className="text-center w-4/12 ">{props?.response?.mode}</p>
                  <p className="text-center w-4/12 "> Signature </p>
                  <p className="text-center w-4/12 ">Received By</p>
                </div>
              </Print>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesReceiptModal;
