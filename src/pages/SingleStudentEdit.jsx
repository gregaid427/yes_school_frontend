import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../layout/DefaultLayout';
import userThree from '../images/user/user-03.png';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  UpdatestudentAction,
  fetchSingleStudent,
  resetUdateStudent,
} from '../redux/slices/studentSlice';
import { toast } from 'react-hot-toast';

import {
  fetchAllClassAction,
  fetchAllSectionAction,
} from '../redux/slices/classSlice';
import { reset } from '../redux/slices/studentSlice';
import ClassSelect from '../components/ClassSelect';
import SectionSelect2 from '../components/SectionsSelect2';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import StudentCredential from './Studentscredential';
import Loader from '../common/Loader';
// import { useHistory } from 'react-router-dom';

const SingleStudentEdit  = () => {
  const [PageAction, setPageAction] = useState();

  const location = useLocation();
  const { action, value } = location?.state;

  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);
  const { singleStudent, singleStudentloading, updateStudent } = student;

  const [data, setData] = useState(null);
  const [paramaction, setParamaction] = useState(1);
  
  const [studentID, setStudentID] = useState('');

  const [firstName, setStudentfirstName] = useState('');
  const [lastName, setStudentlastName] = useState('');
  const [otherName, setStudentotherName] = useState('');
  const [gender, setGender] = useState('Male');
  const [picture, setPicture] = useState('');

  const [gfName1, setgfName1] = useState('');
  const [glName1, setglName1] = useState('');
  const [gfName2, setgfName2] = useState('');
  const [glName2, setglName2] = useState('');

  const [gcontact1, setgcontact1] = useState('');
  const [gcontact2, setgcontact2] = useState('');
  const [gcontact3, setgcontact3] = useState('');
  const [gcontact4, setgcontact4] = useState('');

  const [gemail1, setemail1] = useState('');
  const [gemail2, setemail2] = useState('');
  const [gAddress1, setgAddress1] = useState('');
  const [gAddress2, setgAddress2] = useState('');
  const [gsex2, setgsex2] = useState('Male');
  const [gsex1, setgsex1] = useState('Male');
  const [gRelation1, setRelation1] = useState('');
  const [gRelation2, setRelation2] = useState('');

  const [religion, setreligion] = useState('Christianity');
  const [dateofbirth, setdateofbirth] = useState('01-01-2020');
  const [createdBy, setcreatedBy] = useState('');
  const [buttonState, setButonState] = useState(1);

  const [clazz, setclazz] = useState();
  const [sectionzz, setsectionzz] = useState();
  const [feeArrears, setFeeArrears] = useState(0.0);
  const [feeCredit, setFeeCredit] = useState(0.0);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [classs, setClasss] = useState([]);


  useEffect(() => {


console.log(singleStudent)
    if (singleStudent == undefined) {
      toast.error('Error To load Student Data');
      navigate('/student/info');
    }
    //   // setTimeout(() => toast.success('New Student Added Successfully'), 900);
    //  if(singleStudent?.data == undefined )
    //  navigate("/student/info")
  }, []);

  useEffect(() => {
    if (updateStudent?.success == 1) {
      toast.success('Student Records Updated Successfully');
      dispatch(resetUdateStudent());
      toast.success('navigate to preview page to be done yet');

    }
    if (updateStudent?.success == 0) {
      toast.error("Error Updating Student Info");
    }
    
    //  navigate("/student/info")
  }, [updateStudent]);

  const handleSubmit = (e) => {
    if (firstName == '') return toast.error('Please Fill Out Required Fields');
 

    const data = {
      studentId: studentID,

      firstName: firstName,
      lastName: lastName,
      otherName: otherName,
      contact1: gcontact1,
      contact2: gcontact2,
      contact3: gcontact3,
      contact4: gcontact4,
      gender: gender,
      classes: clazz,
      section: sectionzz,
      religion: religion,
      dateofbirth: dateofbirth,
      createdBy: createdBy,
      role: 'student',
      gfName1: gfName1,
      glName1: glName1,
      glName2: glName2,
      gfName2: gfName2,
      gAddress1: gAddress1,
      gAddress2: gAddress2,
      gemail1: gemail1,
      gemail2: gemail2,
      gRelation1: gRelation1,
      gRelation2: gRelation2,
      gsex1: gsex1,
      gsex2: gsex2,
      picture: picture,
      feeArrears: feeArrears,
      feeCredit: feeCredit,
    };
      console.log(data)

    dispatch(UpdatestudentAction(data));

  };

  function joinName(fn, on, ln) {
    return fn + ' ' + on + ' ' + ln;
  }

  function getFileInfo(event) {
    //NOTE THE ADDITION OF 'e' PARAMETER
    const formData = new FormData();
    //FILE INFO NAME WILL BE "my-image-file"
    formData.append(
      'my-image-file',
      event.target.files[0],
      event.target.files[0].name,
    );
    setPicture(formData);
  }
  const clad = useSelector((state) => state?.classes);

  const {  sectionloading, fetchSection ,fetchAllClass} =  clad;




  useEffect(() => {
  

    if (singleStudent?.success == 1) {
      setData(singleStudent?.data);
      setLoader(false);
      let data = singleStudent?.data[0]
      setStudentID(singleStudent?.data[0].student_id);
      setStudentfirstName(singleStudent?.data[0].firstName);
      setStudentlastName(singleStudent?.data[0].lastName);
      setStudentotherName(singleStudent?.data[0].otherName);
      setGender(singleStudent?.data[0].gender);
      setPicture(singleStudent?.data[0].picture);
      setgfName1(singleStudent?.data[0].g1fname);
      setglName1(singleStudent?.data[0].g1lastname);
      setgfName2(singleStudent?.data.g2fname);
      setglName2(singleStudent?.data[0].g2lastname);
      setgcontact1(singleStudent?.data[0].g1contact1);
      setgcontact2(singleStudent?.data[0].g1contact2);
      setgcontact3(singleStudent?.data[0].g2contact1);
      setgcontact4(singleStudent?.data[0].g2contact2);
      setemail1(singleStudent?.data[0].g1email);
      setemail2(singleStudent?.data[0].g2email);
      setgAddress1(singleStudent?.data[0].g1address);
      setgAddress2(singleStudent?.data[0].g2address);
      setgsex2(singleStudent?.data[0].g2sex);
      setgsex1(singleStudent?.data[0].g1sex);
      setRelation1(singleStudent?.data[0].g1relation);
      setRelation2(singleStudent?.data[0].g2relation);
      setreligion(singleStudent?.data[0].religion);
      setdateofbirth(singleStudent?.data[0].dateofbirth);
      setcreatedBy(singleStudent?.data[0].createdBy);
      setclazz(singleStudent?.data[0].class);
      setsectionzz(singleStudent?.data[0].section);




      if (fetchSection?.success == 1) {
        let arrr = [singleStudent?.data[0].section];
        let i = 0;
        while (i < clad?.fetchSection?.data.length) {
          arrr.push(clad?.fetchSection?.data[i]?.sectionName);
          i++;
        }
  
        setsections(arrr);
        // setsectionzz(arrr[0]);
      
      
        if (fetchAllClass?.success == 1) {
          let i = 0;
          let arr = [singleStudent?.data[0].class];
          while (i < clad?.fetchAllClass?.data.length) {
            arr.push(clad?.fetchAllClass?.data[i].title);
            i++;
          }
              
          setClasss(arr);
    
        }
      }
    }
    console.log(singleStudent)
    if (singleStudent?.success == 0) {
      toast.error('Unable To load Student Data');
    }
  }, [singleStudent]);

  const [sections, setsections] = useState([]);



  function handleNextButton() {
    setButonState(buttonState + 1);
  }

  function handleBackButton() {
    navigate(-1);
  }

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div className="mx-auto w-full">
        <div className="flex flex-row w-full  gap-0" style={{}}>
          <div className="w-4/6  ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Student Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        First Name
                      </label>
                      <input
                        className="w-full required rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={data[0]?.firstName}
                        onChange={(e) => setStudentfirstName(e.target.value)}
                      />
                    </div>
                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Last Name
                      </label>
                      <input
                        className="w-full required rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={data[0]?.lastName}
                        onChange={(e) => setStudentlastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-2/4">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Other Names
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={data[0]?.otherName}
                        onChange={(e) => setStudentotherName(e.target.value)}
                      />
                    </div>
                    <div className="w-full sm:w-2/4 flex gap-5">
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Sex
                        </label>

                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <SelectGroupTwo
                            values={[data[0]?.gender, 'Male', 'Female']}
                            setSelectedOption={(val) => setGender(val)}
                            selectedOption={gender}
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Religion{' '}
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <SelectGroupTwo
                            values={[
                              data[0]?.religion,
                              'Christian',
                              'Muslim',
                              'Other',
                            ]}
                            setSelectedOption={(val) => setreligion(val)}
                            selectedOption={religion}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-2/4">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Date of Birth
                      </label>

                      <input
                        className=" w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="12/10/2021"
                        // data-class="flatpickr-right"
                        name="dateofbirth"
                        defaultValue={data[0]?.dateofbirth}
                        type="date"
                        onChange={(e) => {
                          setdateofbirth(e.target.value);
                          console.log(e.target.value);
                        }}
                      />
                    </div>

                    <div className="w-full sm:w-2/4 flex gap-5">
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Class
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          {/* <ClassSelect setsectionprop={setclazz} /> */}
                          <SelectGroupTwo
                            values={classs}
                            setSelectedOption={(val) => setclazz(val)}
                            selectedOption={clazz}
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Section{' '}
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          {/* <SectionSelect2 setsectionprop={setsectionzz} /> */}
                          <SelectGroupTwo
                            values={sections}
                            setSelectedOption={(val) => setsectionzz(val)}
                            selectedOption={sectionzz}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="mb-3 block text-black dark:text-white">
                      Student Image
                    </label>
                    <input
                      onChange={(event) => getFileInfo(event)}
                      type="file"
                      accept="image/*"
                      className="w-full rounded border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                    />
                  </div>
                </form>
                {/* <div className="flex mt-10 justify-end gap-4.5">
                  <button
                    className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => handleNextButton()}
                  >
                    Next
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="w-1/6  ">
            <div className=" ml-2 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Student Picture
                </h3>
              </div>
              <div className="px-4">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    <div className=" w-40">
                      <img src={userThree} alt="User" />
                    </div>
                    {/* <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit your photo
                      </span>
                      <span className="flex gap-2.5">
                        <button className="text-sm hover:text-primary">
                          Delete
                        </button>
                        <button className="text-sm hover:text-primary">
                          Update
                        </button>
                      </span>
                    </div> */}
                  </div>

                  {/* <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div> */}

                  {/* <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-4/6   gap-3" style={{}}>
          <div className="w-full ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Student's Guardian/Parent Information
                </h3>
              </div>
              <div className="flex flex-col">
                <div className=" w-full">
                  <div className="p-7">
                    <form>
                      <div className="mb-5.5 flex flex-col gap-3 sm:flex-row">
                        <div className="w-full sm:w-2/2">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="fullName"
                          >
                            First Name
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue={data[0]?.g1fname}
                            onChange={(e) => setgfName1(e.target.value)}
                          />
                        </div>

                        <div className="w-full sm:w-2/2">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="phoneNumber"
                          >
                            Last Name
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue={data[0]?.g1lastname}
                            onChange={(e) => setglName1(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-5.5 flex flex-col gap-3 sm:flex-row">
                        <div className="w-full sm:w-2/4">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="phoneNumber"
                          >
                            Email
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue={data[0]?.g1email}
                            onChange={(e) => setemail1(e.target.value)}
                          />
                        </div>
                        <div className="w-full sm:w-2/4 flex gap-1">
                          <div className="w-full sm:w-1/3">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Sex
                            </label>

                            <div className="relative z-20 bg-white dark:bg-form-input">
                              <SelectGroupTwo
                                values={['Male', 'Female']}
                                setSelectedOption={(val) => setgsex1(val)}
                                selectedOption={gsex1}
                              />
                            </div>
                          </div>

                          <div className="w-full sm:w-2/3">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Relation With Student{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue={data[0]?.g1relation}
                              onChange={(e) => setRelation1(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>


                      <div className="mb-5.5 flex flex-col gap-3 sm:flex-row">
                        <div className="w-full sm:w-2/2">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="fullName"
                          >
                            Contact 1
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue={data[0]?.g1contact1}
                            onChange={(e) => setgcontact1(e.target.value)}
                          />
                        </div>

                        <div className="w-full sm:w-2/2">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="phoneNumber"
                          >
                            Contact 2
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue={data[0]?.g1contact2}
                            onChange={(e) => setgcontact2(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="w-full ">
                        <label
                          className=" block text-sm font-medium text-black dark:text-white"
                          htmlFor="Username"
                        >
                          Home Address
                        </label>
                        <div className="relative">
                          <textarea
                            className="w-full dark:bg-form-input rounded border border-stroke  py-2  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                            name="bio"
                            id="bio"
                            rows={1}
                            placeholder=""
                            defaultValue={data[0]?.g1address}
                            // defaultValue={data?.gAddress}
                            onChange={(e) => setgAddress1(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className=" w-full">
                  <div className="p-7">
                    <form>
                      <div className="mb-5.5 flex flex-col gap-3 sm:flex-row">
                        <div className="w-full sm:w-2/2">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="fullName"
                          >
                            First Name
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue={data[0]?.g2fname}
                            onChange={(e) => setgfName2(e.target.value)}
                          />
                        </div>

                        <div className="w-full sm:w-2/2">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="phoneNumber"
                          >
                            Last Name
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue={data[0]?.g2lastname}
                            onChange={(e) => setglName2(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-5.5 flex flex-col gap-3 sm:flex-row">
                        <div className="w-full sm:w-2/4">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="phoneNumber"
                          >
                            Email
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue={data[0]?.g2email}
                            onChange={(e) => setemail2(e.target.value)}
                          />
                        </div>
                        <div className="w-full sm:w-2/4 flex gap-1">
                          <div className="w-full sm:w-1/3">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Sex
                            </label>

                            <div className="relative z-20 bg-white dark:bg-form-input">
                              <SelectGroupTwo
                                values={['Male', 'Female']}
                                setSelectedOption={(val) => setgsex1(val)}
                                selectedOption={'Female'}
                              />
                            </div>
                          </div>

                          <div className="w-full sm:w-2/3">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor=""
                            >
                              Relation With Student{' '}
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue={data[0]?.g2relation}
                              onChange={(e) => setRelation2(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-5.5 flex flex-col gap-3 sm:flex-row">
                        <div className="w-full sm:w-2/2">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="fullName"
                          >
                            Contact 1
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue={data[0]?.g2contact2}
                            onChange={(e) => setgcontact3(e.target.value)}
                          />
                        </div>

                        <div className="w-full sm:w-2/2">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="phoneNumber"
                          >
                            Contact 2
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue={data[0]?.g2contact2}
                            onChange={(e) => setgcontact4(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="w-full ">
                        <label
                          className=" block text-sm font-medium text-black dark:text-white"
                          htmlFor="Username"
                        >
                          Home Address
                        </label>
                        <div className="relative">
                          <textarea
                            className="w-full dark:bg-form-input rounded border border-stroke  py-2  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                            name="bio"
                            id="bio"
                            rows={1}
                            placeholder=""
                            defaultValue={data[0]?.g2address}
                            // defaultValue={data?.gAddress}
                            onChange={(e) => setgAddress2(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* <div className="flex w-4/12 mx-8 pb-5   gap-4.5">
                <button
                  className="flex w-full justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type=""
                  onClick={(e) => handleBackButton()}
                >
                  Back
                </button>
                <button
                  className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => handleNextButton()}
                >
                  Next
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Fees Management info */}

        <div className="flex flex-row w-4/6    gap-3" style={{}}>
          <div className="w-full ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Student Financial Information
                </h3>
              </div>
              <div className="p-7">
                <form>
                  {/* <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Account Balance
                      </label>
                      <input
                        className="w-full required rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={data[0]?.accountBalance}
                        onChange={(e) => setFeeArrears(e.target.value)}
                      />
                    </div>

                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Status
                      </label>
                      <input
                        className="w-full required rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={
                          (data[0]?.accountBalance) > -1 ? 'Credit' : 'Owing'
                        }
                        onChange={(e) => setFeeCredit(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-2/4">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Scholarships
                      </label>
                    </div>
                  </div> */}

                  <div className="mb-2 flex   sm:flex-row">
                    <div className=" flex  sm:w-2/4">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="checkboxLabelOne"
                      >
                        Partial Scholarshp{' '}
                      </label>
                    </div>

                    <div className="flex justify-start sm:w-1/4">
                      <label
                        htmlFor="checkboxLabelOne"
                        className="flex cursor-pointer select-none "
                      >
                        <div className="relative ">
                          <input
                            type="checkbox"
                            id="checkboxLabelOne"
                            className="sr-only"
                            onChange={() => {
                              setIsChecked(!isChecked);
                            }}
                          />
                          <div
                            className={` flex h-5 w-5 items-center justify-center rounded border ${
                              isChecked &&
                              'border-primary bg-gray dark:bg-transparent'
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'}`}
                            ></span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="mb-2 flex   sm:flex-row">
                    <div className=" flex  sm:w-2/4">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="checkboxLabelOne"
                      >
                        Full Scholarshp{' '}
                      </label>
                    </div>

                    <div className="flex justify-start sm:w-1/4">
                      <label
                        htmlFor="checkboxLabelOne"
                        className="flex cursor-pointer select-none "
                      >
                        <div className="relative ">
                          <input
                            type="checkbox"
                            id="checkboxLabelOne"
                            className="sr-only"
                            onChange={() => {
                              setIsChecked(!isChecked);
                            }}
                          />
                          <div
                            className={` flex h-5 w-5 items-center justify-center rounded border ${
                              isChecked &&
                              'border-primary bg-gray dark:bg-transparent'
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'}`}
                            ></span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="mb-2 flex   sm:flex-row">
                    <div className=" flex  sm:w-2/4">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="checkboxLabelOne"
                      >
                        GetFund Scholarshp{' '}
                      </label>
                    </div>

                    <div className="flex justify-start sm:w-1/4">
                      <label
                        htmlFor="checkboxLabelOne"
                        className="flex cursor-pointer select-none "
                      >
                        <div className="relative ">
                          <input
                            type="checkbox"
                            id="checkboxLabelOne"
                            className="sr-only"
                            onChange={() => {
                              setIsChecked(!isChecked);
                            }}
                          />
                          <div
                            className={` flex h-5 w-5 items-center justify-center rounded border ${
                              isChecked &&
                              'border-primary bg-gray dark:bg-transparent'
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'}`}
                            ></span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </form>
                <div className="flex mt-10 justify-end gap-4.5">
                  <button
                    className="flex w-full justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type=""
                    onClick={(e) => handleBackButton()}
                  >
                    Back
                  </button>
                  <button
                    className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => handleSubmit()}
                  >
                    Save{' '}
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

export default SingleStudentEdit ;
