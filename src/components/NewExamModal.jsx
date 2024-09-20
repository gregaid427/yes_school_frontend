import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassSelect3 from './ClassSelect3';
import toast from 'react-hot-toast';

import { CreateExamAction, resetcreateexam } from '../redux/slices/ExamSlice';
import SectionSelect1 from './SectionsSelect1';
import ExamGroupSelect from './ExamGroupSelect';
import SubjectSelect from './SubjectSelect';
import { resetcreatesubject } from '../redux/slices/subjectSlice';

const NewExamModal = (props) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(0);
  const [selectedArr, setselectedArr] = useState([]);

  const [clazz, setclazz] = useState('None');
  const [sectionzz, setsectionzz] = useState(null);
  const [examgroupoption, setexamgroupoption] = useState('None');

  const sub = useSelector((state) => state?.subject);
  const { fetchAllSubject, CreateSubject } = sub;
  const exam = useSelector((state) => state?.exam);
  const { createexam } = exam;

  const [pagesval, setpagesval] = useState(30);

  const [loader, setLoader] = useState(true);
  const session = useSelector((state) => state?.session);
  const { fetchsessionactive } = session;
  let finalArray = selectedArr.join(',');

  const [sessionz, setsession] = useState(null);

  useEffect(() => {
    if (fetchsessionactive?.success == 1) {
      let data = fetchsessionactive?.data[0];
      setsession(data?.sessionname);
    }
  }, [fetchsessionactive]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      examgroup: examgroupoption,
      section: sectionzz,
      class: clazz,
      subjects: finalArray,
      session: sessionz,
      createdby: 'Asante',
      note: ' ',
    };
    console.log(data);

    dispatch(CreateExamAction(data));
  };

  useEffect(() => {
    if (CreateSubject?.success == 0) {
      toast.error('Error - Adding New Subject');
      dispatch(resetcreatesubject());
    }
    if (CreateSubject?.success == 1) {
      toast.success('Subject Added Successfully');
      dispatch(resetcreatesubject());
    }
  }, [CreateSubject]);

  useEffect(() => {
    if (createexam?.success == 0) {
    }
    if (createexam?.success == 1) {
      props.close(false);
      dispatch(resetcreateexam());

    }
  }, [createexam]);

  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium  text-black dark:text-white">
                  Add Exam
                </h3>
              </div>
              <div className="px-1 py-3">
                <form
                  className={
                    display == 0 ? 'flex flex-col px-7  gap-3' : 'hidden'
                  }
                >
                  <div className="flex flex-col ">
                    <div className="w-full mb-1 sm:w-2/2">
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Select Class
                      </label>{' '}
                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <ClassSelect3 setsectionprop={setclazz} clazz={clazz} />
                      </div>
                    </div>
                    <div className="w-full mb-1 sm:w-2/2">
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Select Section
                      </label>
                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <SectionSelect1 setsectionprop={setsectionzz} />
                      </div>
                    </div>
                    <div className="w-full mb-1 sm:w-2/2">
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Select Exam Group
                      </label>{' '}
                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <ExamGroupSelect setsectionprop={setexamgroupoption} />
                      </div>
                    </div>
                    <div className="w-full mt-2  sm:w-2/2">
                      <div className="flex justify-between">
                        <label
                          className="mb-1 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Select Subjects Applicable
                        </label>{' '}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            props.newsubject(true);
                          }}
                        >
                          <label
                            className="mb-2 block text-xs font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            + New Subject
                          </label>
                        </button>
                      </div>
                      <div className={fetchAllSubject?.data?.length == 0 ? '':'hidden'}>
                      <label
                        className="mb-2 ml-3 block text-xs font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        * No Subjects Available
                      </label>{' '}
                      </div>
                      <div>
                        {fetchAllSubject?.data?.map((item, index) => (
                          <SubjectSelect
                            key={item.id}
                            info={fetchAllSubject?.data?.[index]}
                            selectedarr={selectedArr}
                            selected={setselectedArr}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </form>

                <div className="flex justify-end mt-3 px-7 gap-4.5">
                  <button
                    className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      if (selectedArr.length == 0) {
                        toast.error('Select Subjects Applicable');
                        console.log(selectedArr);
                      }else if (clazz == 'None') {
                        toast.error('Select Class');
                        console.log(selectedArr);
                      } else if (examgroupoption == 'None') {
                        toast.error('Select Exam Group');
                        console.log(selectedArr);
                      } else {
                        handleSubmit(e);
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
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewExamModal;
