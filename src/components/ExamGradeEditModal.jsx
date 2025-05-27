import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassSelect3 from './ClassSelect3';
import toast from 'react-hot-toast';
import {
  CreatesGradeGroupAction,
  UpdateGradeGroupAction,
} from '../redux/slices/examSlice';

const ExamGradeEditModal = (props) => {
  // console.log(props);
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
  useEffect(() => {
    setDesc(props?.info?.[0]?.desc);
    setGrade1(props?.info?.[0]?.grades);
    setMin1(props?.info?.[0]?.min1);
    setMax1(props?.info?.[0]?.max1);
    setRemark1(props?.info?.[0]?.scoreremarks);

    setGrade2(props?.info?.[0]?.grade2);
    setMin2(props?.info?.[0]?.min2);
    setMax2(props?.info?.[0]?.max2);
    setRemark2(props?.info?.[0]?.scoreremarks);

    setGrade3(props?.info?.[0]?.grade3);
    setMin3(props?.info?.[0]?.min3);
    setMax3(props?.info?.[0]?.max3);
    setRemark3(props?.info?.[0]?.scoreremarks);

    setGrade4(props?.info?.[0]?.grade4);
    setMin4(props?.info?.[0]?.min4);
    setMax4(props?.info?.[0]?.max4);
    setRemark4(props?.info?.[0]?.scoreremarks);

    setGrade5(props?.info?.[0]?.grade5);
    setMin5(props?.info?.[0]?.min5);
    setMax5(props?.info?.[0]?.max5);
    setRemark5(props?.info?.[0]?.scoreremarks);

    setGrade6(props?.info?.[0]?.grade6);
    setMin6(props?.info?.[0]?.min6);
    setMax6(props?.info?.[0]?.max6);
    setRemark6(props?.info?.[0]?.scoreremarks);

    setGrade7(props?.info?.[0]?.grade7);
    setMin7(props?.info?.[0]?.min7);
    setMax7(props?.info?.[0]?.max7);
    setRemark7(props?.info?.[0]?.scoreremarks);

    setGrade8(props?.info?.[0]?.grade8);
    setMin8(props?.info?.[0]?.min8);
    setMax8(props?.info?.[0]?.max8);
    setRemark8(props?.info?.[0]?.scoreremarks);

    setGrade9(props?.info?.[0]?.grade9);
    setMin9(props?.info?.[0]?.min9);
    setMax9(props?.info?.[0]?.max9);
    setRemark9(props?.info?.[0]?.scoreremarks);

    setGrade10(props?.info?.[0]?.grade10);
    setMin10(props?.info?.[0]?.min10);
    setMax10(props?.info?.[0]?.max10);
    setRemark10(props?.info?.[0]?.scoreremarks);

    setName(props?.info?.[0]?.gradetitle);
    setclassScore(props?.info?.[0]?.classworkpercent);
    setExamScore(props?.info?.[0]?.exampercent);
    setOtherScore(props?.info?.[0]?.otherscorepercent);
    setDesc(props?.info?.[0]?.notes);




  }, [props]);
   console.log(props);
  let obj = {
    title: props?.info?.gradetitle,
    notes: props?.info?.notes,
    class: props?.info?.notes,
    exam: props?.info?.exam,
    other: props?.info?.other,
  };
  console.log( eval(
    parseFloat(classScore) + parseFloat(examScore) + parseFloat(otherScore),
  ))
  console.log( 
 classScore + examScore + otherScore,
  )

  const user = useSelector((state) => state?.user);
const { username, userMail} = user;
  useEffect(() => {
    console.log(props)
    obj['notes'] = props?.info?.[0]?.notes
    obj['class'] =  props?.info?.[0]?.classworkpercent,
    obj['title'] = props?.info?.[0]?.gradetitle,
    obj['exam']  = props?.info?.[0]?.exampercent,
    obj['other'] = props?.info?.[0]?.otherscorepercent
    console.log(obj)
  }, []);

  let finalArray = [];
  //  console.log(typeof classScore + typeof examScore);
  async function handleSubmit(obj) {
    if (name == '') {
      return toast.error('Error -Grade title canot Be Empty');
    } else if (
      eval(
        parseFloat(classScore) + parseFloat(examScore) + parseFloat(otherScore),
      ) != 100
    ) {
      setScoreError(true);
      return toast.error(
        'Class Score %,Exam Score %  & other Score % Must Sum Up To 100 %',
      );
    } else if ((min1 != '' && max1 == '') || (min1 == '' && max1 != ''))
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

      function getRandomNumber(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      let code = getRandomNumber(1000, 100);
      async function getarray(newArray) {
        let arrays = [];
        for (const i of newArray) {
          arrays.push([i.minscore, i.maxscore, i.grades, i.scoreremarks]);
          // setData1()
          // console.log(i);
          // console.log(arrays);
          //  setNewArray(arrays)
          newArray = arrays;
        }
        return arrays;
      }
      async function main(newArray) {
        console.log('Array.forEach() has finished running.');

        return await getarray(newArray);
      }

      let result = await main(newArray);
      console.log(obj)

      const data = {
        code: props?.info[0]?.gradecode,
        title:name,
        formertitle: props?.info?.[0]?.gradetitle,
        classscore: classScore,
        examScore: examScore,
        otherScore: otherScore,
        notes: desc,
        grades: newArray,
        createdby: username?.payload,
      };

      console.log(data);
      //  console.log(finalArray);

        dispatch(UpdateGradeGroupAction(data));
    }
  }
  useEffect(() => {
    if (Gradegroup?.success == 0) {
      finalArray = [];
    }
    if (Gradegroup?.success == 1) {
      finalArray = [];
    }
  }, [Gradegroup]);
  const [newdata, setData] = useState([]);
  //let newArray = [...props?.info]

  let newArray1 = JSON.parse(JSON.stringify(props?.info));
  let newArray = newArray1;
  console.log(newArray)
  // const [newdata, setData] = useState([]);
  // //let newArray = [...props?.info]
  // const [newdata1, setData1] = useState([]);
  //  const [newdata11, setData11] = useState([]);
  // let newArray = [];
  // useEffect(() => {
  //   // let newArray1 = JSON.parse(JSON.stringify(props?.info));
  //   let arrays = [];
  //   for (const i of JSON.parse(JSON.stringify(props?.info))) {
  //     arrays.push([i.minscore, i.maxscore, i.grades, i.scoreremarks]);
  //     // setData1()
  //     console.log(i);
  //     console.log(arrays);
  //     //  setNewArray(arrays)
  //     newArray = arrays;
  //   }
  //   console.log('newdata1 vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
  // }, []);

  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium  text-black dark:text-white">
                  Edit Marks Grading Group
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
                            defaultValue={props?.info?.[0]?.gradetitle}
                            onChange={(e) => {
                              setName(e.target.value.trim())
                              // for (let i = 0; i < newArray.length; i++) {
                              //  let val = newArray[i]
                              //   val['gradetitle'] = e.target.value.trim();
                              // }
                              // let val = props?.info
                              // console.log(val)
                           //   obj['title'] = e.target.value.trim();
                              //setName(e.target.value.trim());
                              // setData(newArray);
                            }}
                          />
                        </div>

                        <div className="flex row gap-1">
                          <div className="w-full mb-1 sm:w-1/2">
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
                              defaultValue={props?.info?.[0]?.classworkpercent}
                              onChange={(e) => {
                                setclassScore(e.target.value.trim())

                                // for (let i = 0; i < newArray.length; i++) {
                                //   newArray[i].classworkpercent = e.target.value.trim();
                                // }
                               // obj['class'] = e.target.value.trim();
                                //setData(newArray);
                              }}
                            />
                          </div>
                          <div className="w-full mb-2 sm:w-1/2">
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
                              defaultValue={props?.info?.[0]?.exampercent}
                              onChange={(e) => {
                                setExamScore(e.target.value.trim())
                                // for (let i = 0; i < newArray.length; i++) {
                                //   newArray[i].exampercent = e.target.value.trim();
                                // }
                               // obj['exam'] = e.target.value.trim();
                              }}
                            />
                          </div>
                          {/* <div className="w-full mb-2 sm:w-1/3">
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
                              defaultValue={props?.info?.[0]?.otherscorepercent}
                              onChange={(e) => {
                                setOtherScore(e.target.value.trim())
                                // for (let i = 0; i < newArray.length; i++) {
                                //   newArray[i].otherscorepercent =
                                //     e.target.value.trim();
                                // }
                               // obj['other'] = e.target.value.trim();
                              }}
                            />
                          </div> */}
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
                              className="w-full rounded border border-stroke bg-gray py-3  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              name="bio"
                              id="bio"
                              rows={2}
                              defaultValue={props?.info?.[0]?.notes}
                              onChange={(e) => {
                                // for (let i = 0; i < newArray.length; i++) {
                                //   newArray[i].notes = e.target.value.trim();
                                // }
                                // setDesc(e.target.value.trim());
                                // setData(newArray);
                                setDesc(e.target.value.trim())

                              }}
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
                              handleSubmit(obj);
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
                              props?.close(false);
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="py-3 w-7/12">
                      {props.info?.map((item, index) => (
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
                              defaultValue={props?.info?.[index].minscore}
                              onChange={(e) => {
                                newArray[index].minscore = e.target.value.trim();
                                // setData(newArray);
                                console.log(newArray);
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
                              defaultValue={props?.info?.[index].maxscore}
                              onChange={(e) => {
                                newArray[index].maxscore = e.target.value.trim();
                                // setData(newArray);
                                console.log(newArray);
                              }}
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
                              defaultValue={props?.info?.[index].grades}
                              onChange={(e) => {
                                newArray[index].grades = e.target.value.trim();
                                //   setData(newArray);
                                console.log(newArray);
                              }}
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
                              defaultValue={props?.info?.[index].scoreremarks}
                              onChange={(e) => {
                                newArray[index].scoreremarks = e.target.value.trim();
                                // setData(newArray);
                                console.log(newArray);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      {/* <div className="flex row gap-1">
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
                             defaultValue={props?.info?.[1].minscore}
                            onChange={(e) => setMin2(e.target.value.trim())}
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
                             defaultValue={props?.info?.[1].maxscore}
                            onChange={(e) => setMax2(e.target.value.trim())}
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
                             defaultValue={props?.info?.[1].grades}
                            onChange={(e) => setGrade2(e.target.value.trim())}
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
                             defaultValue={props?.info?.[1].scoreremarks}
                            onChange={(e) => setRemark2(e.target.value.trim())}
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
                             defaultValue={props?.info?.[2].minscore}
                            onChange={(e) => setMin3(e.target.value.trim())}
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
                             defaultValue={props?.info?.[2].maxscore}
                            onChange={(e) => setMax3(e.target.value.trim())}
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
                             defaultValue={props?.info?.[2].grades}
                            onChange={(e) => setGrade3(e.target.value.trim())}
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
                             defaultValue={props?.info?.[2].scoreremarks}
                            onChange={(e) => setRemark3(e.target.value.trim())}
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
                             defaultValue={props?.info?.[3].minscore}
                            onChange={(e) => setMin4(e.target.value.trim())}
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
                             defaultValue={props?.info?.[3].maxscore}
                            onChange={(e) => setMax4(e.target.value.trim())}
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
                             defaultValue={props?.info?.[3].grades}
                            onChange={(e) => setGrade4(e.target.value.trim())}
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
                             defaultValue={props?.info?.[3].scoreremarks}
                            onChange={(e) => setRemark4(e.target.value.trim())}
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
                             defaultValue={props?.info?.[4].minscore}
                            onChange={(e) => setMin5(e.target.value.trim())}
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
                             defaultValue={props?.info?.[4].maxscore}
                            onChange={(e) => setMax5(e.target.value.trim())}
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
                             defaultValue={props?.info?.[4].maxscore}
                            onChange={(e) => setGrade5(e.target.value.trim())}
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
                             defaultValue={props?.info?.[4].scoreremarks}
                            onChange={(e) => setRemark5(e.target.value.trim())}
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
                             defaultValue={props?.info?.[5].minscore}
                            onChange={(e) => {
                              setMin6(e.target.value.trim());
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
                             defaultValue={props?.info?.[5].maxscore}
                            onChange={(e) => setMax6(e.target.value.trim())}
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
                             defaultValue={props?.info?.[5].grades}
                            onChange={(e) => setGrade6(e.target.value.trim())}
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
                             defaultValue={props?.info?.[5].scoreremarks}
                            onChange={(e) => {
                              setRemark6(e.target.value.trim());
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
                               defaultValue={props?.info?.[6].minscore}
                              onChange={(e) => {
                                setMin7(e.target.value.trim());
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
                               defaultValue={props?.info?.[6].maxscore}
                              onChange={(e) => setMax7(e.target.value.trim())}
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
                               defaultValue={props?.info?.[6].grades}
                              onChange={(e) => setGrade7(e.target.value.trim())}
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
                               defaultValue={props?.info?.[6].scoreremarks}
                              onChange={(e) => setRemark7(e.target.value.trim())}
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
                               defaultValue={props?.info?.[7].minscore}
                              onChange={(e) => {
                                setMin8(e.target.value.trim());
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
                               defaultValue={props?.info?.[7].maxscore}
                              onChange={(e) => setMax8(e.target.value.trim())}
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
                               defaultValue={props?.info?.[7].grades}
                              onChange={(e) => setGrade8(e.target.value.trim())}
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
                               defaultValue={props?.info?.[7].scoreremarks}
                              onChange={(e) => setRemark8(e.target.value.trim())}
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
                               defaultValue={props?.info?.[8].minscore}
                              onChange={(e) => {
                                setMin9(e.target.value.trim());

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
                               defaultValue={props?.info?.[8].maxscore}
                              onChange={(e) => setMax9(e.target.value.trim())}
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
                               defaultValue={props?.info?.[8].grades}
                              onChange={(e) => setGrade9(e.target.value.trim())}
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
                               defaultValue={props?.info?.[8].scoreremarks}
                              onChange={(e) => setRemark9(e.target.value.trim())}
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
                               defaultValue={props?.info?.[9].minscore}
                              onChange={(e) => setMin10(e.target.value.trim())}
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
                               defaultValue={props?.info?.[9].maxscore}
                              onChange={(e) => setMax10(e.target.value.trim())}
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
                               defaultValue={props?.info?.[9].grades}
                              onChange={(e) => setGrade10(e.target.value.trim())}
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
                               defaultValue={props?.info?.[9].scoreremarks}
                              onChange={(e) => setRemark10(e.target.value.trim())}
                            />
                          </div>
                        </div>
                      </div> */}
                    </div>
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

export default ExamGradeEditModal;
