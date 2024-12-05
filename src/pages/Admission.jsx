import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../layout/DefaultLayout';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreatestudentAction, fetchstdCartegoryAction } from '../redux/slices/studentSlice';
import { toast } from 'react-hot-toast';

import { reset } from '../redux/slices/studentSlice';
import ClassSelect from '../components/ClassSelect';
import SectionSelect2 from '../components/SectionsSelect2';
import { useNavigate } from 'react-router-dom';
import StudentCartegorySelect from '../components/StudentCartegorySelect';

// import { useHistory } from 'react-router-dom';

const Admission = () => {
  useEffect(() => {
    dispatch(fetchstdCartegoryAction());
  }, []);

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imgSrc);

    async function base64ToFile(base64) {
      const res = await fetch(base64);
      const buf = await res.arrayBuffer();
      const file = new File([buf], 'capture_camera.png', {
        type: 'image/png',
      });
      return file;
    }
    let file = await base64ToFile(await imgSrc);

    props.setPicture(file);
    props.setPicturename(file?.name);

    console.log(file);
  }, [webcamRef, setImgSrc]);

  const formRef1 = useRef();
  const formRef2 = useRef();
  const formRef3 = useRef();
  const formRef4 = useRef();

  // const history = useHistory()
  // history.listen((location, action) =>{
  //   if(location.pathname="/student/admission"){
  //     setButton()

  //   }
  // })

  //  useEffect(() => {
  //   setButton()
  //   // Return the function to unsubscribe from the event so it gets removed on unmount

  //  }, [location.pathname ]);
  function checkbuttonState() {
    return buttonState;
  }

  function setButton() {
    setButonState(1);
    console.log(buttonState);
  }

  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);

  const [firstName, setStudentfirstName] = useState('');
  const [lastName, setStudentlastName] = useState('');
  const [otherName, setStudentotherName] = useState('');
  const [gender, setGender] = useState('Male');
  const [picture, setPicture] = useState();
  const [picturename, setPicturename] = useState(null);

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
  const [cartegory, setCartegory] = useState('GENERAL');
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
  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;
  const handleSubmit = (e) => {
    // if(!picture) return console.log('no image')

    if (firstName == '') return toast.error('Please Fill Out Required Fields');
 
    let data = {
      firstName: firstName,
      lastName: lastName,
      otherName: otherName,
      contact1: gcontact1,
      contact2: gcontact2,
      contact3: gcontact3,
      contact4: gcontact4,
      gender: gender,
      class: clazz,
      section: sectionzz,
      religion: religion,
      dateofbirth: dateofbirth,
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
      cartegory: cartegory,
      picture: picture,
      feeArrears: feeArrears,
      feeCredit: feeCredit,
      createdBy: username?.payload,
    };

    dispatch(CreatestudentAction(data));
  };

  function joinName(fn, on, ln) {
    return fn + ' ' + on + ' ' + ln;
  }

  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
    formRef2.current.reset();
    formRef3.current.reset();
    formRef4.current.reset();
    formRef5.current.reset();

    setButonState(1);
  }

  const { CreateStudentloading, error, CreateStudent, Successfetch } = student;
  useEffect(() => {
    if (error) {
      dispatch(reset());

      toast.error('Error Creating New Student');
    }
    if (CreateStudent?.success == 1) {
      dispatch(reset());
      // setTimeout(() => setLoader(false), 1000);

      navigate('/student/studentcredential', {
        state: { pic: null, file: null },
      });
      //  dispatch(reset())
    }
    if (CreateStudent?.success == 0) {
      dispatch(reset());
      toast.error('Error : Unable to Add Student ');
    }
  }, [CreateStudent]);

  function handleNextButton() {
    setButonState(buttonState + 1);
  }

  function handleBackButton() {
    setButonState(buttonState - 1);
  }

  return (
    <DefaultLayout>
      <div className="mx-auto w-full">
        <div
          className="flex flex-row w-full  gap-3"
          style={{ display: checkbuttonState() == 1 ? 'flex' : 'none' }}
        >
          <div className="w-4/6 ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Student Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form ref={formRef1}>
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
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
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
                            values={['Male', 'Female']}
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
                            values={['Christian', 'Muslim', 'Other']}
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
                        className=" w-full rounded border-[1.5px] border-stroke bg-transparent px-2 py-2 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="12/10/2021"
                        // data-class="flatpickr-right"
                        name="dateofbirth"
                        defaultValue={dateofbirth}
                        type="date"
                        onChange={(e) => {
                          setdateofbirth(e.target.value);
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
                          <ClassSelect setsectionprop={setclazz} />
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
                          <SectionSelect2 setsectionprop={setsectionzz} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Student Cartegory{' '}
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <StudentCartegorySelect setsectionprop={setCartegory} />
                        </div>
                      </div>
                </form>
                <div className="flex mt-5  gap-4.5">
                  <button
                    className="flex w-4/12 justify-center rounded bg-primary py-1 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => handleNextButton()}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-row w-full   gap-3"
          style={{ display: buttonState == 2 ? 'flex' : 'none' }}
        >
          <div className="w-full ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Student's Guardian/Parent Information
                </h3>
              </div>
              <div className="flex flex-row">
                <div className=" w-3/6">
                  <div className="p-7">
                    <form ref={formRef2}>
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
                            defaultValue=""
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
                            defaultValue=""
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
                            type="email"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
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
                              defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
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
                            rows={2}
                            placeholder=""
                            // defaultValue={data?.gAddress}
                            onChange={(e) => setgAddress1(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className=" w-3/6">
                  <div className="p-7 pb-1">
                    <form ref={formRef3}>
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
                            defaultValue=""
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
                            defaultValue=""
                            onChange={(e) => setglName2(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className=" flex flex-col gap-3 sm:flex-row">
                        <div className="w-full sm:w-2/4">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="phoneNumber"
                          >
                            Email
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="email"
                            name=""
                            id=""
                            placeholder=""
                            defaultValue=""
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
                                setSelectedOption={(val) => setgsex2(val)}
                                selectedOption={gsex2}
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
                              defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
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
                            rows={2}
                            placeholder=""
                            // defaultValue={data?.gAddress}
                            onChange={(e) => setgAddress2(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="flex p-7 pt-0  w-6/12 justify-end gap-4.5">
                <button
                  className="flex w-full justify-center rounded border border-stroke py-1 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type=""
                  onClick={(e) => handleBackButton()}
                >
                  Back
                </button>
                <button
                  className="flex w-full justify-center rounded bg-primary py-1 px-3 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => handleSubmit()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fees Management info */}

        {/* <div
          className="flex flex-row w-full    gap-3"
          style={{
            display: buttonState == 3 ? 'flex' : 'none',
          }}
        >
          <div className="w-4/6 ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Student Financial Information
                </h3>
              </div>
              <div className="p-7">
                <form ref={formRef4}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Fee Arrears
                      </label>
                      <input
                        className="w-full required rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue="0"
                        onChange={(e) => setFeeArrears(e.target.value)}
                      />
                    </div>

                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Fees Credit
                      </label>
                      <input
                        className="w-full required rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue="0"
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
                  </div>

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
          
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default Admission;
