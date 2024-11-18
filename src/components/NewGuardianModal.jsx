import React, { useEffect, useRef, useState } from 'react';
import {
  CreatesInventoryCartegoryAction,
  fetchInventCartegoryAction,
  resetcreatecart,
} from '../redux/slices/inventSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { MasrkstudentWaiting } from '../redux/slices/studentSlice';
import jsPDF from 'jspdf';
import { Print } from 'print-react';


const NewGuardModal = (props) => {
  console.log(props.guardinfo)
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state?.inventory);
  const formRef5 = useRef();
  const ref = useRef({ openPrintDialog: () => Promise });

  const [printDialogOpen, setPrintDialogOpen] = useState(false);
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
  const handleDownloadPdf = async () => {
    var doc = new jsPDF();

    if (
      data[0]?.studentName != '' &&
      data[1]?.guardian1Name == null &&
      data[2]?.guardian2Name == null
    ) {
      doc.setFontSize(10);
      doc.text(`Name : ${props.guardinfo?.name} `, 20, 20);
      doc.text(`Username : ${props.guardinfo?.username} `, 20, 30);
      doc.text(`Password : ${props.guardinfo?.password} `, 20, 40);
      doc.save(`guardian-${props.guardinfo?.name}`);
    }

  };
  return (
    <div className="w-full">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
        <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
          <h3 className="font-medium text-center text-black dark:text-white">
            New Guardian Credentials
          </h3>
        </div>
        <Print
              ref={ref}
              printWidth={900}
              marginTop={48}
              marginLeft={20}
              onOpenPrintDialog={() => {
                setPrintDialogOpen(true);
              }}
              onClosePrintDialog={() => {
                setPrintDialogOpen(false);
              }}
            >
              <div className="px-7 py-4 w-12/12">
                <form ref={formRef5} >
                  <div className=" flex gap-4 sm:flex-col">
                    <div className="w-full  sm:w-5/6">
                      <div className="flex w-full">
                        <label
                          className="mb-2 block w-2/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                           Name :
                        </label>
                        <label
                          className="mb-2 block w-4/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          {props.guardinfo?.name == undefined ? '' :props.guardinfo?.name}
                        </label>
                      </div>
                      <div className="flex w-full">
                        <label
                          className="mb-2 block w-2/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Username :
                        </label>
                        <label
                          className="mb-2 block w-4/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          {props.guardinfo?.username == undefined ? '' : props.guardinfo?.username}
                        </label>
                      </div>
                      <div className="flex w-full">
                        <label
                          className="mb-2 block w-2/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Pasword :
                        </label>
                        <label
                          className="mb-2 block w-4/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          {props.guardinfo?.password == undefined ? '' : props.guardinfo?.password}
                          </label>
                      </div>
                    </div>
                    <div
                      style={{
                        display:
                          data == undefined
                            ? ''
                            : props.guardian1Name != null
                              ? ''
                              : 'none',
                      }}
                      className="w-full   sm:w-5/6"
                    >
                      <div className="flex w-full ">
                        <label
                          className="mb-2 block w-2/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Guardian Name
                        </label>
                        <label
                          className="mb-2 block w-4/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          {data == undefined ? '' : props.guardian1Name}
                        </label>
                      </div>
                      <div className="flex w-full">
                        <label
                          className="mb-2 block w-2/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Username
                        </label>
                        <label
                          className="mb-2 block w-4/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          {data == undefined ? '' : props.guardian1Email}
                        </label>
                      </div>
                      <div className="flex w-full">
                        <label
                          className="mb-2 block w-2/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Password
                        </label>
                        <label
                          className="mb-2 block w-4/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          {data == undefined ? '' : props.guardian1Pass}
                        </label>
                      </div>
                    </div>
                    <div
                      style={{
                        display:
                          data == undefined
                            ? ''
                            : data[2]?.guardian2Name != null
                              ? ''
                              : 'none',
                      }}
                      className="w-full  sm:w-5/6"
                    >
                      <div className="flex w-full">
                        <label
                          className="mb-2 block w-2/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Guardian Name
                        </label>
                        <label
                          className="mb-2 block w-4/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          {data == undefined ? '' : data[2]?.guardian2Name}
                        </label>
                      </div>
                      <div className="flex w-full">
                        <label
                          className="mb-2 block w-2/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Username
                        </label>
                        <label
                          className="mb-2 block w-4/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          {data == undefined ? '' : data[2]?.guardian2Email}
                        </label>
                      </div>
                      <div className="flex w-full">
                        <label
                          className=" block w-2/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Password
                        </label>
                        <label
                          className=" block w-4/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          {data == undefined ? '' : data[2]?.guardian2Pass}
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Print>
            <div className="flex px-8 pb-5 w-12/12 justify-end gap-4.5">
           
              <button
                className="flex w-full justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                type=""
                onClick={async () => {
                  await ref.current.openPrintDialog();
                }}
              >
                Print
              </button>
              <button
                className="flex w-full justify-center rounded bg-primary py-2 px-1 font-medium text-gray hover:bg-opacity-90"
                type=""
                onClick={(e) => handleDownloadPdf()}
              >
                Export PDF
              </button>
              <button
                className="flex w-full justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                type=""
                onClick={(e) => { e.preventDefault();
                  props.close(false);}}
              >
                Close
              </button>
            </div>
      </div>
    </div>
  );
};

export default NewGuardModal;
