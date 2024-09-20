import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassSelect3 from './ClassSelect3';
import SessionSelect1 from './SessionSelect1';
import { AssignFeesAction } from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';
import ClassSelect2 from './ClassSelect2';
import AssignFeeClassSelect from './AssignFeeClassSelect';
import { CreatesGradeGroupAction } from '../redux/slices/ExamSlice';

const ExamGradeModal = (props) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(0);
  const [display7, setDisplay7] = useState(false);
  const [display8, setDisplay8] = useState(false);
  const [display9, setDisplay9] = useState(false);
  const [display10, setDisplay10] = useState(false);

  const [clazz, setclazz] = useState();
  const [scoreError, setScoreError] = useState(false);
  const [otherScore, setOtherScore] = useState(0);

  const [desc, setDesc] = useState('');
  const clad = useSelector((state) => state?.classes);

  const { fetchAllClassloading, fetchAllClass } = clad;
  const [sessionoption, setSessionoption] = useState('');
  const exam = useSelector((state) => state?.exam);
  const { Gradegroup, cartegory } = exam;

  const [pagesval, setpagesval] = useState(30);

  const [grade1, setGrade1] = useState('-');
  const [min1, setMin1] = useState('');
  const [max1, setMax1] = useState('');
  const [remark1, setRemark1] = useState('-');

  const [grade2, setGrade2] = useState('-');
  const [min2, setMin2] = useState('');
  const [max2, setMax2] = useState('');
  const [remark2, setRemark2] = useState('-');

  const [grade3, setGrade3] = useState('-');
  const [min3, setMin3] = useState('');
  const [max3, setMax3] = useState('');
  const [remark3, setRemark3] = useState('-');

  const [grade4, setGrade4] = useState('-');
  const [min4, setMin4] = useState('');
  const [max4, setMax4] = useState('');
  const [remark4, setRemark4] = useState('-');

  const [grade5, setGrade5] = useState('-');
  const [min5, setMin5] = useState('');
  const [max5, setMax5] = useState('');
  const [remark5, setRemark5] = useState('-');

  const [grade6, setGrade6] = useState('-');
  const [min6, setMin6] = useState('');
  const [max6, setMax6] = useState('');
  const [remark6, setRemark6] = useState('-');

  const [grade7, setGrade7] = useState('-');
  const [min7, setMin7] = useState('');
  const [max7, setMax7] = useState('');
  const [remark7, setRemark7] = useState('-');

  const [grade8, setGrade8] = useState('-');
  const [min8, setMin8] = useState('');
  const [max8, setMax8] = useState('');
  const [remark8, setRemark8] = useState('-');

  const [grade9, setGrade9] = useState('-');
  const [min9, setMin9] = useState('');
  const [max9, setMax9] = useState('');
  const [remark9, setRemark9] = useState('-');

  const [grade10, setGrade10] = useState('-');
  const [min10, setMin10] = useState('');
  const [max10, setMax10] = useState('');
  const [remark10, setRemark10] = useState('-');

  const [loader, setLoader] = useState(true);

  const [name, setName] = useState('');
  const [classScore, setclassScore] = useState(0);
  const [examScore, setExamScore] = useState(0);


  let finalArray = [];
  console.log(typeof classScore + typeof examScore);
  const handleSubmit = () => {
    if (name == '') {
      return toast.error('Error -Grade title canot Be Empty');
    } else if (eval(parseFloat(classScore) + parseFloat(examScore)+ parseFloat(otherScore)) != 100) {
      setScoreError(true)
      return toast.error(
        'Class Score %,Exam Score %  & other Score % Must Sum Up To 100 %',
      );
    }  else if ((min1 != '' && max1 == '') || (min1 == '' && max1 != ''))
      return toast.error('Both Min % & Max % Must Be Provided');
    else if ((min2 != '' && max2 == '') || (min2 == '' && max2 != ''))
      return toast.error('Both Min % & Max % Must Be Provided');
    else if ((min3 != '' && max3 == '') || (min3 == '' && max3 != ''))
      return toast.error('Both Min % & Max % Must Be Provided');
    else if ((min4 != '' && max4 == '') || (min4 == '' && max4 != ''))
      return toast.error('Both Min % & Max % Must Be Provided');
    else if ((min5 != '' && max5 == '') || (min5 == '' && max5 != ''))
      return toast.error('Both Min % & Max % Must Be Provided');
    else if ((min6 != '' && max6 == '') || (min6 == '' && max6 != ''))
      return toast.error('Both Min % & Max % Must Be Provided');
    else if ((min7 != '' && max7 == '') || (min7 == '' && max7 != ''))
      return toast.error('Both Min % & Max % Must Be Provided');
    else if ((min8 != '' && max8 == '') || (min8 == '' && max8 != ''))
      return toast.error('Both Min % & Max % Must Be Provided');
    else if ((min9 != '' && max9 == '') || (min9 == '' && max9 != ''))
      return toast.error('Both Min % & Max % Must Be Provided');
    else if ((min10 != '' && max10 == '') || (min10 == '' && max10 != ''))
      return toast.error('Both Min % & Max % Must Be Provided');
    else {
      if (min1 != '') finalArray.push([min1, max1, grade1, remark1]);
      if (min2 != '') finalArray.push([min2, max2, grade2, remark2]);
      if (min3 != '') finalArray.push([min3, max3, grade3, remark3]);
      if (min4 != '') finalArray.push([min4, max4, grade4, remark4]);
      if (min5 != '') finalArray.push([min5, max5, grade5, remark5]);
      if (min6 != '') finalArray.push([min6, max6, grade6, remark6]);
      if (min7 != '') finalArray.push([min7, max7, grade7, remark7]);
      if (min8 != '') finalArray.push([min8, max8, grade8, remark8]);
      if (min9 != '') finalArray.push([min9, max9, grade9, remark9]);
      if (min10 != '') finalArray.push([min10, max10, grade10, remark10]);

      const data = {
        title: name,
        classscore: classScore,
        examScore: examScore,
        otherScore: otherScore,

        notes: desc,
        grades: finalArray,
        createdby: 'Asante',
      };

      console.log(data);
      console.log(finalArray);

      dispatch(CreatesGradeGroupAction(data));
    }
  };

  useEffect(() => {
    if (Gradegroup?.success == 0) {
      finalArray = [];
    }
    if (Gradegroup?.success == 1) {
      finalArray = [];
    }
  }, [Gradegroup]);

  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium  text-black dark:text-white">
                  Add Marks Grading Group
                </h3>
              </div>
              <div className="px-1 py-3">
                <form
                  className={
                    display == 0 ? 'flex flex-col px-7  gap-3' : 'hidden'
                  }
                >
                  <div className="flex  gap-3">
                    <div className="py-3 w-5/12 flex flex-col justify-between ">
                      <div>
                        <div className="w-full mb-1 sm:w-2/2">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Grading Title
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        <div className="flex row gap-1">
                          <div className="w-full mb-1 sm:w-1/3">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Class Score %{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="number"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue={0}
                              onChange={(e) =>
                                setclassScore(parseFloat(e.target.value))
                              }
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-1/3">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Exam Score %{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="number"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue={0}
                              onChange={(e) =>
                                setExamScore(parseFloat(e.target.value))
                              }
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-1/3">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Other Score %{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="number"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue={0}
                              onChange={(e) =>
                                setOtherScore(parseFloat(e.target.value))
                              }
                            />
                          </div>
                        </div>

                        <div className="mb-5.5">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor="emailAddress"
                          >
                            Description/Notes
                          </label>
                          <div className="relative">
                            <textarea
                              className="w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              name="bio"
                              id="bio"
                              rows={2}
                              placeholder=""
                              onChange={(e) => setDesc(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex align-bottom gap-4.5">
                          <button
                            className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                            type=""
                            onClick={(e) => {
                              e.preventDefault();
                              handleSubmit(e);
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            type="reset"
                          >
                            Reset
                          </button>
                        </div>
                        <div className="flex w-full align-bottom my-3 ">
                          <button
                            className="flex w-full justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
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
                    </div>
                    <div className="py-3 w-7/12">
                      <div className="flex row gap-1">
                        <div className="w-full mb-1 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Min %{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setMin1(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Max %{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setMax1(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Grade{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setGrade1(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-3/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Remarks{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setRemark1(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex row gap-1">
                        <div className="w-full mb-1 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Min %{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setMin2(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Max %{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setMax2(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Grade{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setGrade2(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-3/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Remarks{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setRemark2(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex row gap-1">
                        <div className="w-full mb-1 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Min %{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setMin3(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Max %{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setMax3(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Grade{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setGrade3(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-3/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Remarks{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setRemark3(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex row gap-1">
                        <div className="w-full mb-1 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Min %{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setMin4(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Max %{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setMax4(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Grade{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setGrade4(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-3/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Remarks{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setRemark4(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex row gap-1">
                        <div className="w-full mb-1 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Min %{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setMin5(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Max %{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setMax5(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Grade{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setGrade5(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-3/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Remarks{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setRemark5(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={true ? 'flex row gap-1' : 'hidden'}>
                        <div className="w-full mb-1 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Min %{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => {
                              setMin6(e.target.value);
                              setDisplay7(true);
                            }}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Max %{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setMax6(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-1/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Grade{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => setGrade6(e.target.value)}
                          />
                        </div>
                        <div className="w-full mb-2 sm:w-3/6">
                          <label
                            className="mb-1 block text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            Remarks{' '}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
                            onChange={(e) => {
                              setRemark6(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div
                          className={
                            display7 == true ? 'flex row gap-1' : 'hidden'
                          }
                        >
                          <div className="w-full mb-1 sm:w-1/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Min %{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="number"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => {
                                setMin7(e.target.value);
                                setDisplay8(true);
                              }}
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-1/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Max %{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="number"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => setMax7(e.target.value)}
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-1/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Grade{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => setGrade7(e.target.value)}
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-3/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Remarks{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => setRemark7(e.target.value)}
                            />
                          </div>
                        </div>
                        <div
                          className={
                            display8 == true ? 'flex row gap-1' : 'hidden'
                          }
                        >
                          <div className="w-full mb-1 sm:w-1/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Min %{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="number"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => {
                                setMin8(e.target.value);
                                setDisplay9(true);
                              }}
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-1/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Max %{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="number"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => setMax8(e.target.value)}
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-1/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Grade{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => setGrade8(e.target.value)}
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-3/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Remarks{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => setRemark8(e.target.value)}
                            />
                          </div>
                        </div>
                        <div
                          className={
                            display9 == true ? 'flex row gap-1' : 'hidden'
                          }
                        >
                          <div className="w-full mb-1 sm:w-1/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Min %{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="number"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => {
                                setMin9(e.target.value);

                                setDisplay10(true);
                              }}
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-1/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Max %{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="number"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => setMax9(e.target.value)}
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-1/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Grade{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => setGrade9(e.target.value)}
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-3/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Remarks{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => setRemark9(e.target.value)}
                            />
                          </div>
                        </div>
                        <div
                          className={
                            display10 == true ? 'flex row gap-1' : 'hidden'
                          }
                        >
                          <div className="w-full mb-1 sm:w-1/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Min %{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="number"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => setMin10(e.target.value)}
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-1/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Max %{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="number"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => setMax10(e.target.value)}
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-1/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Grade{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => setGrade10(e.target.value)}
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-3/6">
                            <label
                              className="mb-1 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Remarks{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue=""
                              onChange={(e) => setRemark10(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <form className={display == 1 ? '' : 'hidden'}>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <div className="w-full mb-2 sm:w-2/2">
                        <label
                          className="mb-1 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Class
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <ClassSelect3
                            setsectionprop={setclazz}
                            clazz={clazz}
                          />
                        </div>
                      </div>

                      {/* <div className="w-full mb-1 sm:w-2/2">
                        <label
                          className="mb-2 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Academic Session
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <SessionSelect1 setsectionprop={setSessionoption} />
                        </div>
                      </div> */}
                      {/* <div className="w-full  sm:w-2/2">
                        <div className="flex w-full ">
                          <div className=" flex   sm:w-1/2">
                            <div className=" flex  sm:w-full">
                              <label
                                className="mb-1 block text-sm font-medium text-black dark:text-white"
                                htmlFor="checkboxLabelOne"
                              >
                                {'Apply'}
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
                                      setIsChecked1(true);
                                      setType(true);
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

                          <div className="mb-2 flex   sm:w-1/2">
                            <div className=" flex  sm:w-full">
                              <label
                                className="mb-1 block text-sm font-medium text-black dark:text-white"
                                htmlFor="checkboxLabelOne"
                              >
                                {'Pending'}
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
                                      setIsChecked1(false);
                                      setType(false);
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
                        </div>
                      </div> */}
                      <div className="mb-5.5">
                        <label
                          className="mb-1 block text-sm font-medium text-black dark:text-white"
                          htmlFor="emailAddress"
                        >
                          Description/Notes
                        </label>
                        <div className="relative">
                          <textarea
                            className="w-full rounded border border-stroke bg-gray py-2  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            name="bio"
                            id="bio"
                            rows={2}
                            placeholder=""
                            onChange={(e) => setDesc(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        setDisplay(2);
                      }}
                    >
                      Next
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
                </form>

                <form className={display == 2 ? '' : 'hidden'}>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <div className="w-full mb-2 sm:w-2/2">
                        <div className="w-full">
                          <div className="flex justify-between">
                            <label
                              className="mb-1 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Fee Cartegories
                            </label>
                            <label
                              className="mb-1 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Amount To Charge
                            </label>
                          </div>
                          {cartegory?.data.map((item, index) => (
                            <div className="flex   " key={item.id}>
                              <div className="w-4/6 flex  ">
                                {' '}
                                <label
                                  className=" my-auto  block text-sm font-medium text-black dark:text-white"
                                  htmlFor=""
                                >
                                  {item.name}
                                </label>
                              </div>{' '}
                              <div className="  w-2/6">
                                <input
                                  className="w-full rounded border border-stroke bg-gray py-1.5 mb-1 px-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                  type="number"
                                  name=""
                                  id=""
                                  placeholder=""
                                  defaultValue="0"
                                  onChange={(e) => {
                                    obj[item.name] = parseInt(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(obj);
                        if (Object.entries(obj).length == 1) {
                          toast.error('Error - Fee Cartegory Cannot Be Empty');
                        } else {
                          e.preventDefault();
                          setDisplay(3);
                          delete data2.test;
                          setdata2(obj);
                          setdata3(Object.values(obj).reduce((a, b) => a + b));
                        }
                      }}
                    >
                      Next
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
                </form>

                <form className={display == 3 ? '' : 'hidden'}>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <div className="w-full mb-2 sm:w-2/2">
                        <div className="w-full">
                          <div className="flex justify-between">
                            <label
                              className="mb-1 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Class
                            </label>
                            <label
                              className="mb-1 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              {clazz}
                            </label>
                          </div>
                          {/* 
                          <div className="flex justify-between">
                            <label
                              className="mb-1 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Session
                            </label>
                            <label
                              className="mb-1 py-auto block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              {sessionoption}
                            </label>
                          </div> */}

                          <div className="flex justify-between">
                            <div className=" flex  ">
                              {' '}
                              <label
                                className=" my-auto    block text-sm font-medium text-black dark:text-white"
                                htmlFor=""
                              >
                                Total Fees
                              </label>
                            </div>{' '}
                            <div className="  ">
                              <label
                                className=" my-auto    block text-sm font-medium text-black dark:text-white"
                                htmlFor=""
                              >
                                {display == 3
                                  ? !data2
                                    ? 0
                                    : Object.values(data2).reduce(
                                        (a, b) => a + b,
                                      )
                                  : 0}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4.5">
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
                      type="reset"
                      onClick={() => props.close(false)}
                    >
                      Cancel
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

export default ExamGradeModal;
