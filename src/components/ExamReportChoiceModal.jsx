import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassSelect3 from './ClassSelect3';
import toast from 'react-hot-toast';

import {
  CreateExamAction,
  FetchClassReportAction,
  FetchClassReportAction1,
  FetchexamSubjectAction,
  resetClassReport1,
  resetcreateexam,
} from '../redux/slices/examSlice';
import SectionSelect1 from './SectionsSelect1';
import ExamGroupSelect from './ExamGroupSelect';
import SubjectSelect from './SubjectSelect';
import { resetcreatesubject } from '../redux/slices/subjectSlice';
import { useNavigate } from 'react-router-dom';
import TableBtn from './Svgs/TableBtn';
import SubjectSelect1 from './SubjectSelect1';
import SessionSelect from './SessionSelect';

const ExamReportChoiceModal = (props) => {
  console.log(props);

  const dispatch = useDispatch();
  const [display, setDisplay] = useState(0);
  const [selectedArr, setselectedArr] = useState([]);
  const [selectsubject, setselectsubject] = useState('NONE');
  const [selectedInfo, setSelectedInfo] = useState();
  const [selectedInfo1, setSelectedInfo1] = useState();


  const [clazz, setclazz] = useState('None');
  const [sectionzz, setsectionzz] = useState(null);
  const [examgroupoption, setexamgroupoption] = useState('None');

  const sub = useSelector((state) => state?.subject);
  const { fetchAllSubject, CreateSubject } = sub;
  const exam = useSelector((state) => state?.exam);
  const { createexam,FetchexamSubject,ClassReport1 } = exam;

  const [pagesval, setpagesval] = useState(30);

  const [loader, setLoader] = useState(true);
  const session = useSelector((state) => state?.session);
  const { fetchsessionactive } = session;
  let finalArray = selectedArr.join(',');

  const [subject, setSubject] = useState([]);
  const [subjectval, setSubjectval] = useState([]);

  const [subjectselect, setSubjectselect] = useState('NONE');

  const [sessionz, setsession] = useState('NONE');

  useEffect(
    (props) => {
      if (fetchsessionactive?.success == 1) {
        let data = fetchsessionactive?.data[0];
        setsession(data?.sessionname);
      }
    },
    [fetchsessionactive],
  );
  console.log(FetchexamSubject)

  useEffect(() => {
    if (FetchexamSubject?.success == 1) {
      let data = FetchexamSubject?.data;
      setSubjectval(data);
      console.log(data)
    }
  }, [FetchexamSubject]);

  useEffect(
    (props) => {
      if (fetchAllSubject?.success == 1) {
        let data = fetchAllSubject?.data;
        setSubject(data);
      }
    },
    [fetchAllSubject],
  );
  console.log(sessionz);



  const [classdata, setClassdata] = useState([]);
  const [info, setInfo] = useState();

  let examinfo = {
    session: sessionz,
    examgroup: examgroupoption,
    result: [],
  };
    useEffect(() => {
      if (ClassReport1?.success == 0) {
      }
      if (ClassReport1?.success == 1) {
        let data = ClassReport1?.data;
        console.log(data);
        if (data.length == 0) {
          return toast.error('No Results Available');
        }
        // setVisible4(true);
        dispatch(resetClassReport1())
        if (classdata)
          navigate('/exam/classreport', {
            state: {  action: 1, val: props?.info, examinfo: examinfo, result: data},
          });
        setClassdata(data);
      }
    }, [ClassReport1]);


  function handleGetClassreport(val) {
    let data = {
      classcode: val?.info.classId,
      clazz: val?.info.title,
      section: val?.info.section,
      session: sessionz,
      examgroup: examgroupoption,
    };
    dispatch(FetchClassReportAction1(data));
  }
  console.log(subjectval)
  let navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium  text-black dark:text-white">
                  Session Report
                </h3>
              </div>
              <div className="px-1 py-3">
                <form
                  className={
                    display == 0 ? 'flex flex-col px-7  gap-2' : 'hidden'
                  }
                >
                  <div className="w-full mb-1 sm:w-2/2">
                    <label
                      className="mb-2 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Exam Cartegory
                    </label>{' '}
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <ExamGroupSelect setsectionprop={setexamgroupoption} selectinfo={setSelectedInfo} />
                    </div>
                  </div>
                  <div className="w-full mb-1 sm:w-2/2">
                    <label
                      className="mb-2 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Session
                    </label>{' '}
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <SessionSelect setsectionprop={setsession} selectinfo={setSelectedInfo1}  />
                    </div>
                  </div>
                  {/* <div className="w-full mt-2  sm:w-2/2">
                    <div className="flex justify-between">
                      <label
                        className="mb-1 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                         Subjects 
                      </label>{' '}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          props.newsubject(true);
                        }}
                      ></button>
                    </div>
                    <div
                      className={
                        fetchAllSubject?.data?.length == 0 ? '' : 'hidden'
                      }
                    >
                      <label
                        className="mb-2 ml-3 block text-xs font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        * No Subjects Available
                      </label>{' '}
                    </div>
                    <div>
                      <SubjectSelect1 setsectionprop={setSubjectselect} />
                    </div>
                  </div> */}

                  {/* <button
                    className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/exam/viewresult", {
                        state: { action: 1, value: props.value },
                      });
                    
                    }}
                  >
                    View Results
                  </button>
                  <button
                    className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/exam/addresult', {
                        state: { action: 1, value: props.value },
                      });
                    
                    }}
                  >
                    Add Results
                  </button> */}
                  <div className="flex justify-end mt-3  gap-4.5">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2  font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        if (sessionz == 'None') {
                          toast.error('Select Academic Session');
                        } else if (examgroupoption == 'None') {
                          toast.error('Select Exam Cartegory');
                        } else {
                          handleGetClassreport(props)

                         // setDisplay(1);
                        }
                      }}
                    >
                      Submit
                    </button>
                    <button
                      className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
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
              <div className="px-1 py-3">
                <form
                  className={
                    display == 1 ? 'flex flex-col px-7  gap-2' : 'hidden'
                  }
                >
                  {FetchexamSubject?.data?.map((item, index) => (
                    <div key={index} className="w-full   sm:w-2/2">
                      <div className="flex justify-between">
                        <label
                          className="mb-1 block text-sm font-medium py-1 text-black dark:text-white"
                          htmlFor=""
                        >
                          {item.subject}
                        </label>{' '}
                        <button
                    className="flex  justify-center text-sm rounded bg-primary py-1 px-4 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/exam/viewresult", {
                        state: { action: 1, value: props.value ,examid:item.code,chosensubject:item.subject, session:sessionz, examgroup:examgroupoption,createdby:item.createdby,createdat:item.createdat },
                      });
                    
                    }}
                  >
                    Select
                  </button>
                      </div>
                    </div>
                  ))}
                  {FetchexamSubject?.data?.length == 0}{
                  <label
                  className= {FetchexamSubject?.data?.length == 0 ? "mb-2 block text-md text-center font-medium text-black dark:text-white" : 'hidden'}
                  htmlFor=""
                >
                No Results Available
                </label>
                  }
                  {/* <div className="w-full mt-2  sm:w-2/2">
                    <div className="flex justify-between">
                      <label
                        className="mb-1 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                         Subjects 
                      </label>{' '}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          props.newsubject(true);
                        }}
                      ></button>
                    </div>
                    <div
                      className={
                        fetchAllSubject?.data?.length == 0 ? '' : 'hidden'
                      }
                    >
                      <label
                        className="mb-2 ml-3 block text-xs font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        * No Subjects Available
                      </label>{' '}
                    </div>
                    <div>
                      <SubjectSelect1 setsectionprop={setSubjectselect} />
                    </div>
                  </div> */}

                  {/* <button
                    className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/exam/viewresult", {
                        state: { action: 1, value: props.value },
                      });
                    
                    }}
                  >
                    View Results
                  </button>
                  <button
                    className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/exam/addresult', {
                        state: { action: 1, value: props.value },
                      });
                    
                    }}
                  >
                    Add Results
                  </button> */}

                  <div className="flex justify-end mt-3  gap-4.5">
                  
                    <button
                      className="flex w-full justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
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
        </div>
      </div>
    </div>
  );
};

export default ExamReportChoiceModal;
