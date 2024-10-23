import React, { useEffect, useRef, useState, useId } from 'react';
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
import DefaultLayout from '../layout/DefaultLayout';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const ExamReportModal = (props) => {
  const ref = useRef({ openPrintDialog: () => Promise });

  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state?.inventory);
const navigate = useNavigate()
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
      setPictureurl(allschool?.data[0]?.logolink);
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
  const [examinfo, setexaminfo] = useState();
  const [val, setVal] = useState();

  
  const [pictureurl, setPictureurl] = useState(null);

  const formRef1 = useRef();
  const location = useLocation()

  useEffect(() => {
    console.log(location?.state)
    if (location?.state == null) {
     
     // return navigate(-1);
    } else {
      const { val, examinfo} = location?.state;
      console.log(val);
      console.log(examinfo);
      setexaminfo(examinfo);

      setVal(val);
    }
  }, []);
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


  return (
    <DefaultLayout>

    <div className="w-full">
      <div className="grid  gap-8">
        <div className="col-span-12">
          <div className="rounded-sm text-black dark:text-white border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
            <div className="border-b flex justify-between  border-stroke py-3 px-10 dark:border-strokedark">
              <h3 className="font-medium my-auto text-black dark:text-white">
                Exam Report
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

                {/* <button
                  className="flex  justify-center rounded bg-primary py-1 px-3 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    close(false);
                  }}
                >
                  Save PDF
                </button> */}
                <button
                  className="flex  justify-center rounded border border-stroke py-1 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    
                    navigate(-1)
                  }}
                >
                  Back
                </button>
              </div>
            </div>
            <div className="py-4 px-6">
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
                <div
                  className="w-full flex flex-col   py-3"
                  style={{  }}
                >
                  <div className="w-full ">
                    <div className="flex border-b justify-between pb-2 border-stroke  dark:border-strokedark">
                      <img
                        src={pictureurl == null ? userThree : pictureurl}
                        className=" float-end mb-2 h-25 mr-2"
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
                      <div className="w-full py-3 justify-between">
                        <div className="w-full flex gap-1">
                          <p className="text-sm  ">Exam :</p>
                          <p className="text-sm  ">
                            {examinfo?.examgroup} -{' '}
                            {examinfo?.session}
                          </p>
                        </div>

                        <div className="w-4/12 text-sm">
                          <p>Student id : {examinfo?.result[0]?.student_id}</p>

                          <p>
                            Name :{' '}
                            {val?.firstName +
                              ' ' +
                              val?.otherName +
                              ' ' +
                              val?.lastName}
                          </p>

                          <p></p>
                        </div>
                        <div className="w-full flex gap-1">
                          <p className="text-sm  ">Class / Section :</p>
                          <p className="text-sm  ">
                            {val?.class}
                            {val?.section == 'NONE'
                              ? ''
                              : '/' + val?.section}
                          </p>
                        </div>
                        {/* <div className="w-4/12 text-right text-sm">
                        <p>{date}</p>
                        <p>Receipt No : {response?.receiptid}</p>
                      </div> */}
                      </div>
                    </div>{' '}
                  </div>
                  <div className="flex border border-stroke  dark:border-strokedark ">
                    <div className="flex border-b  w-full border-stroke  dark:border-strokedark">
                      <table
                        className="w-full  "
                        style={{ tableLayout: 'fixed', width: '100%' }}
                      >
                        <thead className="w-full border border-stroke  dark:border-strokedark">
                          <tr className="w-full text-start  ">
                            <th className="text-sm  text-start border border-stroke  dark:border-strokedark p-1 font-semibold w-2/12">
                              Exam iD
                            </th>
                            <th
                              scope="col"
                              className="text-sm  text-start border border-stroke  dark:border-strokedark p-1 font-semibold w-5/12"
                            >
                              Subject
                            </th>
                            <th
                              scope="col"
                              className="text-sm  text-start border  border-stroke  dark:border-strokedark p-1 font-semibold w-1/12"
                            >
                              Mark (100%)
                            </th>
                            <th
                              scope="col"
                              className="text-sm  text-start font-semibold border border-stroke  dark:border-strokedark p-1 w-3/12"
                            >
                              Remarks
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-semibold  text-start border border-stroke  dark:border-strokedark p-1 w-1/12"
                            >
                              Position
                            </th>
                          </tr>
                        </thead>
                        <tbody className="w-full border  text-start  border-stroke  dark:border-strokedark">
                          {examinfo?.result?.map((item, index) => (
                            <tr key={index} className=" ">
                              <td className="text-sm  text-start border border-stroke  dark:border-strokedark p-1  w-1/12">
                                {item.examid}
                              </td>
                              <td className="text-sm  text-start border border-stroke  dark:border-strokedark p-1 w-5/12">
                                {item.subject}
                              </td>
                              <td className="text-sm  text-start border border-stroke  dark:border-strokedark p-1 w-2/12">
                                {item.totalscore} {' %'}
                              </td>
                              <td className="text-sm  text-start border border-stroke  dark:border-strokedark p-1 w-3/12">
                                {item.examremark}
                              </td>
                              <td
                                colspan="2"
                                className="text-sm font-semibold border border-stroke  dark:border-strokedark p-1 w-1/12"
                              >
                                {item.position}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        {}
                        {/* <thead className="w-full  ">

                        {cart?.map((item, index) => (
                          <tr className="w-full  ">
                            {' '}
                            <th className="text-sm float-start  font-light w-4/12">
                              {index + 1}
                            </th>
                            <th className="text-sm text font-light w-4/12">
                              {item?.feename}{' '}
                            </th>
                            <th className="text-sm font-light w-4/12">
                              {val?.preference?.includes(item?.feename)
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
                            {response?.arrears}
                            </th>
                          </tr>           

                      </thead> */}
                        <div className="w-full flex"> </div>

                       
                          <tr className="w-full  border-stroke  dark:border-strokedark ">
                            {' '}
                            <th className="text-sm  font-light w-1/12"></th>
                            <th className="text-sm text-right font-light w-6/12">
                              Class Rank :
                            </th>
                            <th className="text-sm font-light w-full">
                           {examinfo?.result[0]?.overallposition }  of  {examinfo?.result[0]?.classize }  

                            </th>
                          </tr>
                        <thead className="w-full   ">
                          <tr className="w-full border-t border-stroke  dark:border-strokedark ">
                            {' '}
                            <th className="text-sm  font-light w-1/12"></th>
                            <th className="text-sm text-right font-bold  w-6/12">
                              ..............
                            </th>
                            <th className="text-sm font-bold  w-4/12"></th>
                          </tr>
                        </thead>
                      </table>
                    </div>

                    {/* <div className="border-l font-thin px-3 text-sm flex float-end flex-col w-5/12 border-stroke  dark:border-strokedark">
                    <div className="flex w-full justify-between float-end">
                     <p>Amount Paid </p>  {response?.amountpaid}
                    </div> */}
                    {/* <div className="flex float-end">
                       Arrears : {eval(val?.feepayable - response?.balbeforepayment)}
                    </div> */}
                    {/* <div className="flex w-full justify-between float-end">
                     <p>Previous Session Arrears  </p> {response?.arrears}
                    </div> */}
                    {/* <div className="flex w-full justify-between float-end">
                     <p>Balance Before Payment </p> {response?.balbeforepayment}
                    </div>

                    <div className="flex w-full justify-between font-bold float-end">
                     <p>Current Balance </p>  {response?.balanceafterpayment}
                    </div>
                  </div> */}
                  </div>
                  <div  style={{  pageBreakAfter: 'always' }}  >
                    <div className="text-sm mt-6  w-full">
                      <p className=" ">Teacher's Remark</p>
                      <p className=""> {examinfo?.result[0]?.teacherreamark } </p>
                      <p className="text-center w-4/12 ">
                       
                      </p>
                    </div>
                  </div>
                  
                </div>
              </Print>
            </div>
          </div>
        </div>
      </div>
    </div>
    </DefaultLayout>

  );
};

export default ExamReportModal;