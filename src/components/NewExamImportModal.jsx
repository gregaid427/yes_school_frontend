import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassSelect3 from './ClassSelect3';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

import {
  CreateExamAction,
  FetchGradeGroupAction,
  resetcreateexam,
} from '../redux/slices/examSlice';
import SectionSelect1 from './SectionsSelect1';
import ExamGroupSelect from './ExamGroupSelect';
import SubjectSelect from './SubjectSelect';
import {
  fetchSubjectAction,
  resetcreatesubject,
} from '../redux/slices/subjectSlice';
import SectionSelect3 from './SectionsSelect3';
import ExamGrading from './ExamGradingSelect';
import SubjectSelect1 from './SubjectSelect1';
import SessionSelect from './SessionSelect';
import { useNavigate } from 'react-router-dom';
import { download, generateCsv, mkConfig } from 'export-to-csv';

const NewExamImportModal = (props) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(0);
  const [selectedArr, setselectedArr] = useState([]);
  const [chosen, setchosendata] = useState([]);
  const [grades, setGrades] = useState([]);
  const [NewResultData, setNewData] = useState([]);

  
  const [selectsubject, setselectsubject] = useState('NONE');
  const [examgroupoption, setexamgroupoption] = useState('None');
  const [examgradeoption, setexamgradeoption] = useState('None');

  const sub = useSelector((state) => state?.subject);
  const { fetchAllSubject, CreateSubject } = sub;
  const exam = useSelector((state) => state?.exam);
  const { createexam, fetchGradegroup } = exam;

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
  useEffect(() => {
    dispatch(fetchSubjectAction());
  }, []);

  let grady =
    chosen[0]?.gradeid +
    '-' +
    chosen[0]?.gradetitle +
    '-' +
    chosen[0]?.exampercent +
    '-' +
    chosen[0]?.classworkpercent +
    '-' +
    chosen[0]?.otherscorepercent;
  let navigate = useNavigate();

  useEffect(() => {
    if (fetchGradegroup?.success == 0) {
    }
    if (fetchGradegroup?.success == 1) {
      let data = fetchGradegroup?.data;
      setGrades(data);
    }
  }, [fetchGradegroup]);

  console.log(chosen);

  useEffect(() => {
    setchosendata(
      grades?.filter((item) => item?.gradetitle.includes(examgradeoption)),
    );
  }, [examgradeoption]);

  useEffect(() => {
    dispatch(FetchGradeGroupAction());
    // dispatch(FetchAllGradeGroupAction());
  }, []);

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
  const [check, setCheck] = useState(true);
  const [classData, setClassData] = useState([]);

  function handleFileUpload(e) {
    console.log('called');
    setCheck(false);
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setClassData(parsedData);
      console.log(parsedData)

      // const characters =
      //   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';

      // function generateString(length) {
      //   let result = '';
      //   const charactersLength = characters.length;
      //   for (let i = 0; i < length; i++) {
      //     result += characters.charAt(
      //       Math.floor(Math.random() * charactersLength),
      //     );
      //   }

      //   return result;
      // }

     // let newArr1 = parsedData.map((v) => ({
     //   ...v,
        // STUDENT_PASSWORD: generateString(5).toLocaleLowerCase(),
        // EMAIL: v.FIRST_NAME + generateString(3).toLocaleLowerCase(),
        // CLASS: classname,
        // SECTION: sectionname,
        // GUARD1_PASSWORD: v.GUARDIAN_1_FIRST_NAME == undefined ? "" : generateString(5),
        // GUARD2_PASSWORD: v.GUARDIAN_2_FIRST_NAME == undefined ? "" : generateString(5),
        // GUARD1_USERNAME: v.GUARDIAN_1_FIRST_NAME == undefined ? "" : v.GUARDIAN_1_FIRST_NAME + generateString(3).toLocaleLowerCase()  ,
        // GUARD2_USERNAME: v.GUARDIAN_2_FIRST_NAME == undefined ? "" :
        //   v.GUARDIAN_2_FIRST_NAME + generateString(3).toLocaleLowerCase(),
        // CREATED_BY: 'ASANTE',
     // }));
    //  console.log(newArr1);
      //setClassData1(newArr1);
    };
  }
    async function forEachAsync(arr) {
      let newArr =[]
      for (const element of arr) {
       // console.log(element);
       newArr.push({student_id : element.student_id,firstName : element.firstName,otherName : element.otherName,lastName : element.lastName,section : element.section,class : element.class,examScore : 0,classWorkScore : 0,othersScore : 0})
        
      }
      return newArr
    }

    async function reArrange(arr) {
      let NewData = await forEachAsync(arr);
      console.log(NewData);
      setNewData(NewData)

      const csvConfig = mkConfig({
        useKeysAsHeaders: true,
        filename: props.val?.title +'_'+ (props.val?.section == null ? ' ': props.val?.section )+" "+'Template',
      });
      const handleDownloadCSV = async () => {
        const csv = generateCsv(csvConfig)( NewData);
        download(csvConfig)(csv);
      };
      handleDownloadCSV()
    }
    

    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        examgroup: examgroupoption,
        section: props.val?.section,
        class:
          props.val?.title == undefined ? props.val?.class : props.val?.title,
        subjects: selectsubject,
        session: sessionz,
        chosengrade: chosen[0]?.gradetitle,
        examgrade: chosen[0]?.exampercent,
        classgrade: chosen[0]?.classworkpercent,
        othergrade: chosen[0]?.otherscorepercent,
        classcode: props.val?.classId,
        result : classData
      };
  
      console.log(data);
      navigate('/exam/addimportresult', {
        state: { action: 1, value: data },
      });
      // dispatch(CreateExamAction(data));
    };

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b flex justify-between border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium  text-black dark:text-white">
                  Import Exam Result
                </h3>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(props?.student)
                    console.log(props.student)
                    reArrange(props.student);
                   // handleDownloadCSV()
                  //  handleGetClassData();
                  }}
                >
                  <label
                    className="my-auto cursor-pointer align-middle  text-xs font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Download Class Template
                  </label>
                </button>
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
                        Select Exam Cartegory
                      </label>{' '}
                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <ExamGroupSelect setsectionprop={setexamgroupoption} />
                      </div>
                    </div>
                    <div className="w-full mb-1 sm:w-2/2">
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Select Session
                      </label>{' '}
                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <SessionSelect setsectionprop={setsession} />
                      </div>
                    </div>
                    <div className="w-full mb-1 sm:w-2/2">
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Select Grading Type
                      </label>{' '}
                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <ExamGrading setsectionprop={setexamgradeoption} />
                      </div>
                      <div
                        className={examgradeoption == 'None' ? 'hidden' : ''}
                      >
                        <label
                          className="mb-1 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Exam : ({chosen[0]?.exampercent + '%'}) | class Work :
                          ({chosen[0]?.classworkpercent + '%'}) | Others : (
                          {chosen[0]?.otherscorepercent + '%'})
                        </label>{' '}
                      </div>
                    </div>
                    <div className="w-full mt-2  sm:w-2/2">
                      <div className="flex justify-between">
                        <label
                          className="mb-1 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Select Subject
                        </label>{' '}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            props.newsubject(true);
                          }}
                        >
                          <label
                            className="mb-2 cursor-pointer block text-xs font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            + New Subject
                          </label>
                        </button>
                      </div>
                      {/* <div
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
                      </div> */}
                      <div className="w-full mt-2  sm:w-2/2">
                        <SubjectSelect1 setsectionprop={setselectsubject} />
                      </div>

                      <div>
                        <div className="w-full mt-2 sm:w-2/2">
                          <label
                            className=" block text-sm font-medium text-black dark:text-white"
                            htmlFor="phoneNumber"
                          >
                            Select Excel File{' '}
                          </label>
                          <input
                            onChange={(e) => {
                              // setFile(event.target.files[0]);
                              // setFileName(event.target.files[0].name);
                              handleFileUpload(e);
                            }}
                            type="file"
                            accept=".csv, .xlsx, .xls"
                            className="w-full rounded-md border border-stroke p-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                          />
                        </div>
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
                      if (selectsubject == 'NONE') {
                        toast.error('Select Subject');
                      } else if (chosen.length == 0) {
                        toast.error('Select Grading Type');
                      } else if (examgroupoption == 'None') {
                        toast.error('Select Exam Cartegory');
                      } else {
                        handleSubmit(e);
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewExamImportModal;
