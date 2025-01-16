import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AssignFeesAction, GenerateFeeAction, GenerateFeeStudentAction, resetGeneratefee } from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchSingleStudent,resetSinglestudent } from '../redux/slices/studentSlice';

const GenerateFeeModalStudent = (props) => {
  console.log(props)
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(0);

  const [clazz, setclazz] = useState([]);
  const [id, setId] = useState(props.info.student_id);
  const [selectedArr, setselectedArr] = useState([]);

  const [desc, setDesc] = useState('');
  const [cart, setCartegory] = useState(props.info.cartegory);

  const [Fname, setfName] = useState(props.info.firstName);
  const [Lname, setLName] = useState(props.info.lastName);
  const [Mname, setMName] = useState(props.info.otherName);
  const [classs, setClass] = useState(props.info.class);
  const [secton, setSection] = useState(props.info.section);

  const clad = useSelector((state) => state?.classes);

  const { fetchAllClassloading, fetchAllClass } = clad;
  const fee = useSelector((state) => state?.fees);
  const { cartegory,Generatefee } = fee;
  let navigate = useNavigate();
  const student = useSelector((state) => state?.student);
  const { singleStudent } = student;

  const handleSubmit = () => {
    if (id == '') {
      return toast.error('Error -Enter Student Id');
    } else {
      dispatch(fetchSingleStudent(id));
    }
  };

  const data ={
    id : props.info.student_id,
    class : classs,
    cartegory : cart
  }
  const handleGenerate = () => {
  console.log(data)
      dispatch(GenerateFeeStudentAction(data));
    
  };

  useEffect(() => {
    console.log(singleStudent?.data);

    if (singleStudent?.success == 0) {
      toast.error('Error Fetching Student Data');
      dispatch(resetGeneratefee())
      
      dispatch(resetSinglestudent())


    }
    if (singleStudent?.success == 1 && singleStudent?.data.length == 0) {
      toast.error('Error - No Student Found');
      dispatch(resetGeneratefee())
      dispatch(resetSinglestudent())


    }
    if (singleStudent?.success == 1 && singleStudent?.data.length != 0) {
      setDesc(singleStudent?.data);
      setfName(singleStudent?.data[0]?.firstName);
      setMName(singleStudent?.data[0]?.otherName);
      setLName(singleStudent?.data[0]?.lastName);
      setClass(singleStudent?.data[0]?.class);
      setSection(singleStudent?.data[0]?.section);
      setId(singleStudent?.data[0]?.student_id);
      setCartegory(singleStudent?.data[0]?.cartegory);

    }
  }, [singleStudent]);


  useEffect(() => {

    if (Generatefee?.success == 0) {
      toast.error('Error Generating Fee');
      dispatch(resetGeneratefee())
      dispatch(resetSinglestudent())


    }
   
    if (Generatefee?.success == 1 ) {
      dispatch(resetGeneratefee())
      dispatch(resetSinglestudent())

      setDesc([]);
      setfName('');
      setMName('');
      setLName('');
      setClass('');
      setSection('');
      setId();
    }
  }, [Generatefee]);
  let fullname = Fname + ' ' + Mname + ' ' + Lname;
  console.log(singleStudent?.data);
  console.log(desc);
  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border py-3 px-7 border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke  dark:border-strokedark">
                <h3 className="font-medium mb-5  text-black dark:text-white">
                  Generate Fee
                </h3>
              </div>
              {/* <div className={desc.length == 0 ? '' : 'hidden'}>
                <h4 className="text-sm  text-black text-center dark:text-white">
                  {' '}
                </h4>
                <div className="w-full my-5 flex mb-4 sm:w-2/2">
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Student ID
                  </label>
                  <input
                    className="w-full uppercase rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                  />
                </div>

                <div className="py-5 flex gap-2">
                  <button
                    className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    Search
                  </button>
                  <button
                    className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      props.info.close(false);
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div> */}
              <div >
                <form>
                  <div className="w-full flex mb-4 sm:w-2/2">
                    <label
                      className="my-auto w-3/5 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Student ID
                    </label>
                    <label
                      className="my-auto w-full block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      {id}
                    </label>
                  </div>
                  <div className="w-full flex mb-4 sm:w-2/2">
                    <label
                      className="my-auto w-3/5 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Student Name
                    </label>
                    <label
                      className="my-auto w-full block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      {fullname}
                    </label>
                  </div>
{/* 
                  <div className="w-full flex mb-4 sm:w-2/2">
                    <label
                      className="my-auto w-3/5 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Class / section
                    </label>
                    <label
                      className="my-auto w-full block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      {classs + ' ' + `${secton ? '/' : ''}` + ' ' + secton}{' '}
                    </label>
                  </div> */}

                  <div className="flex justify-end mt-8.5 gap-4.5">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        handleGenerate();
                        props.close(false)

                      }}
                    >
                      Generate Fee
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
        </div>
      </div>
    </div>
  );
};

export default GenerateFeeModalStudent;
