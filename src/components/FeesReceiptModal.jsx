import React, { useEffect, useRef, useState } from 'react';
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

  const [printDialogOpen, setPrintDialogOpen] = useState(false);
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
      toast.success('New Item Cartegory Added Successfully');
      dispatch(fetchInventCartegoryAction());
      resetFormStates();
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

  const [amount, setAmount] = useState(0);
  const [mode, setmode] = useState('Cash');

  const [pictureurl, setPictureurl] = useState(null);

  const formRef1 = useRef();

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }
  let balanceresult = eval(
    parseInt(props.val?.accountbalance) + parseInt(amount),
  );
  let date = new Date();
  date = date.toUTCString().slice(0, 17);
  let data = {
    id: props.val?.student_id,
    class: props.val?.class,
    section: props.val?.section,
    collectedby: 'asante',
    amountpaid: amount,
    mode: mode,
    balbeforepayment: props.val?.accountbalance,
    balanceafterpayment: balanceresult,
    receiptid: 'receiptid',
  };
  const handleSubmit = (e) => {
    if (amount < 1) {
      toast.error('Error - Enter Valid Amount');
    } else {
      dispatch(PayFeeAction(data));
    }
  };
  const user = useSelector((state) => state?.user);
  const { allschool } = user;

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
                  <div className="flex border-b justify-between  border-stroke  dark:border-strokedark">
                    <div className="w-4/6 ">
                      <p>
                        <span className="text-xl">

                        {allschool?.data[0]?.name}
                        </span>
                      </p>
                      <p >
                        <span className="text-sm"> {allschool?.data[0]?.address}
                        </span>
                      </p>
                      <p>
                        <span className="text-sm ">{allschool?.data[0]?.contact1} { " "}{allschool?.data[0]?.contact2 ?'/' : ""}{ " "}{allschool?.data[0]?.contact2}</span>
                      </p>

                      {/* <p>Accra, Ghana</p>   */}
                    </div>
                    <img
                      src={pictureurl == null ? userThree : pictureurl}
                      className=" float-end mb-2 h-25"
                    />
                  </div>
                  <div className="flex border-b justify-between  border-stroke  dark:border-strokedark">
                    <div className="w-full flex py-3 justify-between">
                      <div className="w-4/12 text-sm">
                      <p>{props.val?.student_id} / {props.val?.class} ({props.val?.section})</p>

                        <p>
                          {props.val?.firstName +
                            ' ' +
                            props.val?.otherName +
                            ' ' +
                            props.val?.lastName}
                        </p>
                        <p>
                         
                        </p>
                      </div>
                      <div className="w-4/12">
                        <p className="text-xl font-bold text-center">
                          Fee Receipt
                        </p>
                      </div>
                      <div className="w-4/12 text-right text-sm">
                        <p>{date}</p>
                        <p>Receipt No : 3453453453453</p>
                      </div>
                    </div>
                  </div>{' '}
                </div>
                <div className="flex border-b   border-stroke  dark:border-strokedark">
                  <table className="w-full  ">
                    <thead className="w-full border-b border-stroke  dark:border-strokedark">
                      <tr className="w-full  ">
                        <th className="text-sm float-start flex font-semibold w-4/12"><p>#</p></th>
                        <th className="text-sm  font-semibold w-4/12">
                          Fee Cartegory
                        </th>
                        <th className="text-sm font-semibold w-4/12">Amount</th>
                      </tr>
                    </thead>
                    {}
                    <thead className="w-full  ">
                      {props.cart?.map((item, index) => (
                        <tr className="w-full  ">
                          {' '}
                          <th className="text-sm float-start  font-light w-4/12">{index + 1}</th>
                          <th className="text-sm text font-light w-4/12">
                            {item?.name}{' '}
                          </th>
                          <th className="text-sm font-light w-4/12">Amount</th>
                        </tr>
                      ))}
                    </thead>

                    <thead className="w-full  ">
                      <tr className="w-full border-t border-stroke  dark:border-strokedark ">
                        {' '}
                        <th className="text-sm  font-light w-1/12"></th>
                        <th className="text-sm text-right font-light w-6/12">
                          Total
                        </th>
                        <th className="text-sm font-light w-4/12">Amount</th>
                      </tr>
                    </thead>
                    <thead className="w-full  ">
                      <tr className="w-full  border-stroke  dark:border-strokedark ">
                        {' '}
                        <th className="text-sm  font-light w-1/12"></th>
                        <th className="text-sm text-right font-light w-6/12">
                          Amount Paid
                        </th>
                        <th className="text-sm font-light w-4/12">Amount</th>
                      </tr>
                    </thead>
                
                    <thead className="w-full  ">
                      <tr className="w-full  border-stroke  dark:border-strokedark ">
                        {' '}
                        <th className="text-sm  font-light w-1/12"></th>
                        <th className="text-sm text-right font-light w-6/12">
                          Current Balance
                        </th>
                        <th className="text-sm font-light w-4/12">Amount</th>
                      </tr>
                    </thead>
                  </table>
                </div>

                <div className="flex text-sm mt-10 flex-row w-full">
                  <p className="text-center w-4/12 ">Payment Mode</p>
                  <p className="text-center w-4/12 ">
                    .........................
                  </p>
                  <p className="text-center w-4/12 ">
                    .........................
                  </p>
                </div>
                <div className="flex text-sm flex-row w-full">
                  <p className="text-center w-4/12 ">Cash</p>
                  <p className="text-center w-4/12 "> Signature </p>
                  <p className="text-center w-4/12 ">Stamp</p>
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
