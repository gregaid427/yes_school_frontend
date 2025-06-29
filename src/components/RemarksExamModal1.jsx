import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassSelect3 from './ClassSelect3';
import toast from 'react-hot-toast';

import {
  CreateExamAction,
  FetchexamSubjectAction,
  GetExamRemarksAction,
  resetcreateexam,
  ResetTeacherRemark,
  TeacherRemarkAction,
} from '../redux/slices/examSlice';

import { useNavigate } from 'react-router-dom';
import TableBtn from './Svgs/TableBtn';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const RemarksExamModal1 = (props) => {
  console.log(props);

  const dispatch = useDispatch();
  const [display, setDisplay] = useState(0);
  const [selectedArr, setselectedArr] = useState([]);
  const [selectsubject, setselectsubject] = useState('NONE');

  const [clazz, setclazz] = useState('None');
  const [sectionzz, setsectionzz] = useState(null);
  const [examgroupoption, setexamgroupoption] = useState('None');

  const sub = useSelector((state) => state?.subject);
  const { fetchAllSubject, CreateSubject } = sub;
  const exam = useSelector((state) => state?.exam);
  const { createexam, FetchexamSubject, TeacherRemark  } = exam;

  const [pagesval, setpagesval] = useState(30);

  const [loader, setLoader] = useState(true);
  const session = useSelector((state) => state?.session);
  const { fetchsessionactive } = session;
  let finalArray = selectedArr.join(',');

  const [subject, setSubject] = useState([]);
  const [subjectval, setSubjectval] = useState([]);

  const [subjectselect, setSubjectselect] = useState('NONE');

  const [sessionz, setsession] = useState('NONE');
  const [detail, setDetail] = useState('');


console.log(props)
 useEffect(() => {
    if (TeacherRemark?.success == 1) {
        props.close(false)   
        dispatch(ResetTeacherRemark())  
    }
  }, [TeacherRemark]);

  const handleSubmit = (e) => {
    let data = {
      examgroup: props.examinfo?.examgroup,
      session: props.examinfo?.session,
      id: props.val2?.student_id,
      remark: subjectval,
    };

    dispatch(TeacherRemarkAction(data));
  };

  console.log(subjectval);
  let navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="grid  gap-8">
        <div className="col-span-12">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
            <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Remarks
              </h3>
            </div>
            <div className="p-7">
              <form>
                <div className="w-full flex mb-4 sm:w-2/2">
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Student ID
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    defaultValue={props.val2?.student_id}
                    disabled
                  />
                </div>
                <div className="w-full flex mb-4 sm:w-2/2">
                  <label
                    className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Student Name
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    defaultValue={
                      props.val2?.firstName +
                      ' ' +
                      props.val2?.otherName +
                      ' ' +
                      props.val2?.lastName
                    }
                    disabled
                  />
                </div>
                <div className="relative">
                  {/* <textarea
                    className="w-full dark:bg-form-input rounded border border-stroke  py-2  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                    name="bio"
                    id="bio"
                    rows={5}
                    placeholder=""
                    // defaultValue={data?.gAddress}
                    onChange={(e) => setDetail(e.target.value.trim())}
                  ></textarea> */}
                </div>

                <label
                  className="my-auto w-2/5 block text-sm font-medium text-black dark:text-white"
                  htmlFor=""
                >
                  Select Remarks
                </label>
                <SelectGroupTwo
                  values={props.result}
                  setSelectedOption={(val) => setSubjectval(val)}
                  selectedOption={subjectval}
                />

                <div className="flex w-6/12 justify-end mt-8.5 gap-4.5">
                  <button
                    className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
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
                    close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemarksExamModal1;
