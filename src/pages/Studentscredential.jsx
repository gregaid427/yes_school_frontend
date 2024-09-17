import { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Print } from 'print-react';
import userThree from '../images/user/user-03.png';

import jsPDF from 'jspdf';

import { useDispatch, useSelector } from 'react-redux';

import Loader from '../common/Loader';
import { CreatestudentImageAction } from '../redux/slices/studentSlice';

const StudentCredential = () => {
  const location = useLocation()
  const pic= location.state.pic
  const file= location.state.file


  const [picture, setPicture] = useState();
  const [picturename, setPicturename] = useState();
  const [pictureurl, setPictureurl] = useState(null);
  const student = useSelector((state) => state?.student);

  const { CreateStudentloading, error, CreateStudent, Successfetch } = student;
  const { data } = Successfetch;
  useEffect(() => {
    // setTimeout(() => toast.success('New Student Added Successfully'), 900);
    if (data == undefined) navigate('/student/admission');
    setPictureurl(pic)
    setPicture(file)
    setPicturename(file?.name)
  }, []);
  const formRef5 = useRef();
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const navigate = useNavigate();
  const handleDownloadPdf = async () => {
    var doc = new jsPDF();

    if (
      data[0]?.studentName != '' &&
      data[1]?.guardian1Name == null &&
      data[2]?.guardian2Name == null
    ) {
      doc.setFontSize(10);
      doc.text(`Student Name : ${data[0]?.studentName} `, 20, 20);
      doc.text(`Student Username : ${data[0]?.studentEmail} `, 20, 30);
      doc.text(`Student Password : ${data[0]?.studentPass} `, 20, 40);
      doc.save(`${data[0]?.studentName}`);
    }
    if (
      data[0]?.studentName != '' &&
      data[1]?.guardian1Name != null &&
      data[2]?.guardian2Name == null
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
      data[1]?.guardian1Name != null &&
      data[2]?.guardian2Name != null
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
const dispatch = useDispatch()
  const ref = useRef({ openPrintDialog: () => Promise });
  function hashgenerator() {
    return Math.floor(Math.random() * (90000 - 10000 + 1)) + 10000;
  }

  let customfile = hashgenerator() + picturename;

const handlesubmit = () => {
  const datay = new FormData();

  let Mydata = JSON.stringify({
    id:  data[0]?.id,
    filename: customfile,

  
  });
  

  datay.append(customfile, picture);
  datay.append('data', Mydata);
  dispatch(CreatestudentImageAction(datay));
}

  return (
    <DefaultLayout>
      <div className="flex gap-3">
        <div className=" w-8/12">
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
              <div className="p-7 w-12/12">
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
                          {data == undefined ? '' : data[0]?.studentName}
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
                          {data == undefined ? '' : data[0]?.studentEmail}
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
                          {data == undefined ? '' : data[0]?.studentPass}
                        </label>
                      </div>
                    </div>
                    <div
                      style={{
                        display:
                          data == undefined
                            ? ''
                            : data[1]?.guardian1Name != null
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
                          {data == undefined ? '' : data[1]?.guardian1Name}
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
                          {data == undefined ? '' : data[1]?.guardian1Email}
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
                          {data == undefined ? '' : data[1]?.guardian1Pass}
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
                          className="mb-2 block w-2/6 text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Password
                        </label>
                        <label
                          className="mb-2 block w-4/6 text-sm font-medium text-black dark:text-white"
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
                className="flex w-full justify-center rounded bg-primary py-2 px-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type=""
                onClick={(e) => {
                  navigate('/student/admission');
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
                onClick={(e) => handleDownloadPdf()}
              >
                Export As PDF
              </button>
            </div>
          </div>
        </div>
        <div className="w-3/12">
          <div className="rounded-sm border p-3 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black text-center dark:text-white">
                Student Picture
              </h3>
            </div>
            <div className="p-2 ">
              <div className="w-full flex justify-center items-center">
                <img
                  src={pictureurl == null ? userThree : pictureurl}
                  className="h-40"
                />
              </div>
            </div>
            <div className="w-full ">
              <label className="mb-3 block text-xs text-center text-black dark:text-white">
                Upload Student Picture
              </label>
              <div >

              <div className={pictureurl != null ? 'hidden' :'flex flex-col gap-1'}>
                {' '}
                <input
                  onChange={(event) => {
                    setPicture(event.target.files[0]);
                    setPicturename(event.target.files[0].name);
                    setPictureurl(URL.createObjectURL(event.target.files[0]));
                    console.log(event.target.files[0].name)
                  }}
                  type="file"
                  accept="image/*"
                  className=" rounded-md border border-stroke p-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />{' '}
                <div className="text-center">or</div>
                <button
                  className="flex  justify-center rounded bg-black py-2 px- font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => navigate('/student/admissioncapture', {
                    state: {  value: data },
                  })}
                >
                  Camera Capture
                </button>
                </div>
                <div className={ pictureurl ?? 'hidden'}>
                  <button
                    className="flex mt-2  w-full justify-center rounded bg-primary py-2 px- font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {handlesubmit()}}
                  >
                    Save{' '}
                  </button>
                </div>
                <div className={ pictureurl ?? 'hidden'}>
                  <button
                    className="flex mt-2  w-full justify-center rounded bg-black py-2 px- font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {setPictureurl(null)}}
                  >
                    Cancel{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default StudentCredential;
