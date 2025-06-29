import { useEffect, useRef, useState } from 'react';
;
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import toast from 'react-hot-toast';
import {
  CreatesSubjectAction,
  resetcreatesubject,
} from '../redux/slices/subjectSlice';
import { resetcreateexam } from '../redux/slices/examSlice';

const NewSubject = (props) => {
  const [pagesval, setpagesval] = useState(30);
  const [classs, setClasss] = useState([]);

  const [loader, setLoader] = useState(true);
  const [sections, setsections] = useState([]);

  const [isChecked1, setIsChecked1] = useState(false);
  const [sectionTitle, setsectionTitle] = useState('');
  const [type, setType] = useState('Theory');

  const [subjectName, setSubjectName] = useState([]);

  const [nodes, setdata] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sub = useSelector((state) => state?.subject);
  const { CreateSubject } = sub;

  const exam = useSelector((state) => state?.exam);
  const { createexam } = exam;

  

  useEffect(() => {
    if (CreateSubject?.success == 0) {
      dispatch(resetcreatesubject());
    }
    if (CreateSubject?.success == 1) {
      dispatch(resetcreatesubject());
      props.close(false)
    }
  }, [CreateSubject]);

  const user = useSelector((state) => state?.user);
const { username, userMail} = user;

  const subdata = {
    type: type,
    subjectName: subjectName,
    createdBy: username?.payload,
  };
  const handlecreateSection = (e) => {
    if (subjectName == '') {
      toast.error('Error - subject Name Cannot Be Empty');
    } else {
      dispatch(CreatesSubjectAction(subdata));
    }
  };

 

  return(
   
        <div className="flex w-full ">
          <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add New Subject
              </h3>
            </div>
            <div className="p-7">
              <form action="#">
                <div className="w-full mb-4 ">
                  <label
                    className="mb-3 block text-sm font-small text-black dark:text-white"
                    htmlFor=""
                  >
                    Subject Name
                  </label>
                  <input
                    className="w-full uppercase rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    defaultValue=""
                    onChange={(e) => setSubjectName(e.target.value.trim())}
                  />
                </div>

                {/* <div className=" mt-3">
                  <div className="flex mt-5 mb-2 justify-between align-middle">
                    <label className=" block text-sm align-middle font-medium text-black dark:text-white">
                      Subject Type :
                    </label>
                  </div>
                  <div className="flex w-full flex-col">
                    <div className=" flex   sm:w-1/2">
                      <div className=" flex  sm:w-full">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="checkboxLabelOne"
                        >
                          {'Theory'}
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
                                setIsChecked1(false);
                                setType('Theory');
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

                    {/* <div className="mb-2 flex   sm:w-1/2">
                      <div className=" flex  sm:w-full">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="checkboxLabelOne"
                        >
                          {'Practical'}
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
                                setIsChecked1(true);
                                setType('Practical');
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
                  </div>
                </div> */}

                <div className="flex justify-end  gap-4.5">
                  <button
                    className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      handlecreateSection();
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
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  )
  
};

export default NewSubject;
