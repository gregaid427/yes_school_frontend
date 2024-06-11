import { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import { Print } from "print-react";

import jsPDF from 'jspdf';

import { useSelector } from 'react-redux';

import Loader from '../common/Loader';

const StudentCredential = () => {
  const student = useSelector((state) => state?.student);

  const { CreateStudentloading, error, CreateStudent, Successfetch } = student;
  const { data } = Successfetch;
  useEffect(() => {
    // setTimeout(() => toast.success('New Student Added Successfully'), 900);
    console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
   if(data == undefined )
   navigate("/student/admission")
  }, []);
  const formRef5 = useRef();
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const navigate = useNavigate();


 

 

  const handleDownloadPdf = async () => {
    var doc = new jsPDF();

    if (
      data[0]?.studentName != '' &&
      data[1]?.guardian1Name == '' &&
      data[2]?.guardian2Name == ''
    ) {
      doc.setFontSize(10);
      doc.text(`Student Name : ${data[0]?.studentName} `, 20, 20);
      doc.text(`Student Username : ${data[0]?.studentEmail} `, 20, 30);
      doc.text(`Student Password : ${data[0]?.studentPass} `, 20, 40);
      doc.save(`${data[0]?.studentName}`);
    }
    if (
      data[0]?.studentName != '' &&
      data[1]?.guardian1Name != '' &&
      data[2]?.guardian2Name == ''
    ) {
      doc.setFontSize(10);
      doc.text(`Student Name : ${data[0]?.studentName} `, 20, 20);
      doc.text(`Student Username : ${data[0]?.studentEmail} `, 20, 30);
      doc.text(`Student Password : ${data[0]?.studentPass} `, 20, 40);
      doc.text(`--------------------------------`, 20, 50);
      doc.text(`Guardian Name : ${data[1]?.guardian1Name} `, 20, 60);
      doc.text(`Guardian Username : ${data[1]?.guardian1Email} `, 20, 70);
      doc.text(`Guardian Password : ${data[1]?.guardian1Pass} `, 20, 80);
      doc.save(`${data[0]?.studentName}`);
    }

    if (
      data[0]?.studentName != '' &&
      data[1]?.guardian1Name != '' &&
      data[2]?.guardian2Name != ''
    ) {
      doc.setFontSize(10);
      doc.text(`Student Name : ${data[0]?.studentName} `, 20, 20);
      doc.text(`Student Username : ${data[0]?.studentEmail} `, 20, 30);
      doc.text(`Student Password : ${data[0]?.studentPass} `, 20, 40);
      doc.text(`--------------------------------`, 20, 50);
      doc.text(`Guardian Name : ${data[1]?.guardian1Name} `, 20, 60);
      doc.text(`Guardian Username : ${data[1]?.guardian1Email} `, 20, 70);
      doc.text(`Guardian Password : ${data[1]?.guardian1Pass} `, 20, 80);
      doc.text(`--------------------------------`, 20, 90);
      doc.text(`Guardian Name : ${data[2]?.guardian2Name} `, 20, 100);
      doc.text(`Guardian Username : ${data[2]?.guardian2Email} `, 20, 110);
      doc.text(`Guardian Password : ${data[2]?.guardian2Pass} `, 20, 120);
      doc.save(`${data[0]?.studentName}`);
    }
  };

  const ref = useRef({ openPrintDialog: () => Promise});

  return (
    <DefaultLayout>
      <div className=" ">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Student & Gaurdian Login Credentials
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



          <div className="p-7 w-8/12">
            <form ref={formRef5}>
              <div className="mb-5.5 flex gap-4 sm:flex-col">
                <div className="w-full  sm:w-5/6">
                  <div className="flex w-full">
                    <label
                      className="mb-2 block w-2/6 text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Student Name
                    </label>
                    <label
                      className="mb-2 block w-4/6 text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      {data == undefined ? "": data[0]?.studentName}
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
                      {data == undefined ? "" : data[0]?.studentEmail}
                    </label>
                  </div>
                  <div className="flex w-full">
                    <label
                      className="mb-2 block w-2/6 text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Pasword
                    </label>
                    <label
                      className="mb-2 block w-4/6 text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      {data == undefined ? "" : data[0]?.studentPass}
                    </label>
                  </div>
                </div>
                <div
                  style={{
                    display: data == undefined ? "": (data[1]?.guardian1Name != ' ' ? '' : 'none'),
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
                      {data == undefined ? "": data[1]?.guardian1Name}
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
                      {data == undefined ? "":data[1]?.guardian1Email}
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
                      {data == undefined ? "" : data[1]?.guardian1Pass}
                    </label>
                  </div>
                </div>
                <div
                  style={{
                    display:data == undefined ? "":( data[2]?.guardian2Name != ' ' ? '' : 'none'),
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
                      {data == undefined ? "":data[2]?.guardian2Name}
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
                      {data == undefined ? "":data[2]?.guardian2Email}
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
                      {data == undefined ? "":data[2]?.guardian2Pass}
                    </label>
                  </div>
                </div>
              </div>
            </form>
            
          </div>



          </Print>
          <div className="flex px-8 pb-5 w-8/12 justify-end gap-4.5">
              <button
                className="flex w-full justify-center rounded bg-primary py-2 px-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type=""
                onClick={(e) => {
                  Navigate('/student/admission');
                }}
              >
                Add New Student
              </button>
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
                className="flex w-full justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                type=""
                onClick={(e) => handleDownloadPdf()}                            >
                Export As PDF
              </button>
            </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default StudentCredential;
