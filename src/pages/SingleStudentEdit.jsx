import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../layout/DefaultLayout';
import userThree from '../images/user/user-03.png';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CreatestudentImageAction,
  UpdatestudentAction,
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

const fetchUserdatEdit = () => {
  const [PageAction, setPageAction] = useState();

  const location = useLocation();
  const { action, value } = location?.state;
  console.log(action);

  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);
  const { fetchUserdatloading, updateStudent } = student;

  const [data, setData] = useState(null);
  const [paramaction, setParamaction] = useState(1);
  const [pictureurlshow, setPictureurlshow] = useState(null);

  const [studentID, setStudentID] = useState('');

  const [firstName, setStudentfirstName] = useState('');
  const [lastName, setStudentlastName] = useState('');
  const [otherName, setStudentotherName] = useState('');
  const [gender, setGender] = useState('Male');
  const [picture, setPicture] = useState();
  const [picturecam, setPicturecam] = useState();

  const [gfName1, setgfName1] = useState('');
  const [glName1, setglName1] = useState('');
  const [gfName2, setgfName2] = useState('');
  const [glName2, setglName2] = useState('');

  const [gcontact1, setgcontact1] = useState('');
  const [gcontact2, setgcontact2] = useState('');
  const [gcontact3, setgcontact3] = useState('');
  const [gcontact4, setgcontact4] = useState('');
  const [ID, setID] = useState('');

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
  const [file, setfileName] = useState();
  const [link, setimagelink] = useState();
  const [picturename, setPicturename] = useState();

  const [pictureurl, setPictureurl] = useState(null);

  const pic = location.state.pic;
  const files = location.state.file;
  const captureimage = location.state.captureimage;

  useEffect(() => {
    if (captureimage == 1) {
      setPictureurl(pic);
      setPictureurlshow(true);
    } else {
      setPictureurl(value.imagelink);
    }
    setPicturecam(files);
    setPicture(files);
    setfileName(files?.name + 'student');

    setPicturename(files?.name);
    console.log(files);
    setTimeout(() => setLoader(false), 1000);

    // console.log(fetchUserdat);
    // if (fetchUserdat == undefined) {
    //   toast.error('Error loading Student Data');
    //   navigate('/student/info');
    // }

    //   // setTimeout(() => toast.success('New Student Added Successfully'), 900);
    //  if(fetchUserdat?.data == undefined )
    //  navigate("/student/info")
  }, []);
  console.log(pictureurl);
  useEffect(() => {
    if (updateStudent?.success == 1) {
      toast.success('Student Records Updated Successfully');
      dispatch(resetUdateStudent());
      navigate('/student/info');
    }
    if (updateStudent?.success == 0) {
      toast.error('Error Updating Student Info');
    }

    //  navigate("/student/info")
  }, [updateStudent]);

  const handleSubmit = () => {
    if (firstName == '') return toast.error('Please Fill Out Required Fields');

    const Mydata = {
      studentId: studentID,
      ID: ID,
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
      feeArrears: feeArrears,
      feeCredit: feeCredit,
    };

    dispatch(UpdatestudentAction(Mydata));
  };

  const handlesubmitPic = () => {
    function hashgenerator() {
      return Math.floor(Math.random() * (90000 - 10000 + 1)) + 10000;
    }
    let customfile = hashgenerator() + picturename;
    const datay = new FormData();

    let Mydata = JSON.stringify({
      id: value.userId,
      filename: customfile,
    });
    datay.append(customfile, picture);
    datay.append(customfile, picturecam);
    datay.append('data', Mydata);
    dispatch(CreatestudentImageAction(datay));
  };

  const clad = useSelector((state) => state?.classes);
  const users = useSelector((state) => state?.user);

  const { sectionloading, fetchSection, fetchAllClass } = clad;
  const { fetchUserdat } = users;

  useEffect(() => {
    if (fetchUserdat?.success == 1) {
      setData(fetchUserdat?.data);
      setLoader(false);
      //let data = fetchUserdat?.data[0];
      setStudentID(value.student_id);
      setID(value.userId);

      setStudentfirstName(value.firstName);
      setStudentlastName(value.lastName);
      setStudentotherName(value.otherName);
      setGender(value.gender);
      setPicture(value.imagelink);
      setgfName1(fetchUserdat?.data[0]?.gFirstName);
      setglName1(fetchUserdat?.data[0]?.gLastName);
      setgfName2(fetchUserdat?.data[1]?.gFirstName);
      setglName2(fetchUserdat?.data[1]?.gLastName);
      setgcontact1(fetchUserdat?.data[0]?.gContact1);
      setgcontact2(fetchUserdat?.data[0]?.gContact2);
      setgcontact3(fetchUserdat?.data[1]?.gContact1);
      setgcontact4(fetchUserdat?.data[1]?.gContact2);
      setemail1(fetchUserdat?.data[0]?.gEmail);
      setemail2(fetchUserdat?.data[1]?.gEmail);
      setgAddress1(fetchUserdat?.data[0]?.gAddress);
      setgAddress2(fetchUserdat?.data[1]?.gAddress);
      setgsex2(fetchUserdat?.data[1]?.gSex);
      setgsex1(fetchUserdat?.data[0]?.gSex);
      setRelation1(fetchUserdat?.data[0]?.gRelation);
      setRelation2(fetchUserdat?.data[1]?.gRelation);
      setreligion(value.religion);
      setdateofbirth(value.dateofbirth);
      setclazz(value.class);
      setsectionzz(value.section);
      setfileName(value.filename);
      setimagelink(value.imagelink);

      if (fetchSection?.success == 1) {
        let arrr = [value.section];
        let i = 0;
        while (i < clad?.fetchSection?.data.length) {
          arrr.push(clad?.fetchSection?.data[i]?.sectionName);
          i++;
        }

        setsections(arrr);
        setsectionzz(arrr[0]);

        if (fetchAllClass?.success == 1) {
          let i = 0;
          let arr = [value.class];
          while (i < clad?.fetchAllClass?.data.length) {
            arr.push(clad?.fetchAllClass?.data[i].title);
            i++;
          }

          setClasss(arr);
        }
      }
    }
    if (fetchUserdat?.success == 0) {
      toast.error('Unable To load Student Data');
      navigate(-1);
    }
  }, [fetchUserdat]);

  const [sections, setsections] = useState([]);

  function hashgenerator() {
    return Math.floor(Math.random() * (90000 - 10000 + 1)) + 10000;
  }
  let customfile = hashgenerator() + picturename;

  function handleBackButton() {
    navigate(-1);
  }

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div className="mx-auto w-full">
        <div className="flex flex-row w-full  gap-1" style={{}}>
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
                        defaultValue={value.firstName}
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
                        defaultValue={value.lastName}
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
                        defaultValue={value.otherName}
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
                            values={[value.gender, 'Male', 'Female']}
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
                              value.religion,
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
                        defaultValue={value.dateofbirth}
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
                  {/* <div className="border-b border-stroke py-6  dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Login Credentials
                </h3>
              </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    
                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Username
                      </label>
                      <input
                        className="w-full required rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={value.firstName}
                        onChange={(e) => setStudentfirstName(e.target.value)}
                      />
                    </div>
                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Password
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
                  </div>     */}
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
          <div className="w-3/12  ">
            <div className="rounded-sm border p-3 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black text-center dark:text-white">
                  Student Picture
                </h3>
              </div>
              <div className="p-2 ">
                <div className="w-full flex justify-center items-center">
                  <img
                    src={pictureurl == null ? userThree : pictureurl}
                    className="h-40"
                  />
                </div>
              </div>
              <div className="w-full ">
                <label className="mb-3 block text-xs text-center text-black dark:text-white">
                  Upload Student Picture
                </label>
                <div>
                  <div
                    className={
                      pictureurlshow != null ? 'hidden' : 'flex flex-col gap-1'
                    }
                  >
                    {' '}
                    <input
                      onChange={(event) => {
                        setPicture(event.target.files[0]);
                        setPicturename(event.target.files[0].name);
                        setPictureurl(
                          URL.createObjectURL(event.target.files[0]),
                        );
                        setPictureurlshow(true);
                      }}
                      type="file"
                      accept="image/*"
                      className=" rounded-md border border-stroke p-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                    />{' '}
                    <div className="text-center">or</div>
                    <button
                      className="flex  justify-center rounded bg-black py-2 px- font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) =>
                        navigate('/student/editcapture', {
                          state: { value: value },
                        })
                      }
                    >
                      Camera Capture
                    </button>
                  </div>
                  <div className={!pictureurlshow ? 'hidden' : ''}>
                    <button
                      className="flex mt-2  w-full justify-center rounded bg-primary py-2 px- font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        handlesubmitPic();
                      }}
                    >
                      Save{' '}
                    </button>
                  </div>
                  <div className={!pictureurlshow ? 'hidden' : ''}>
                    <button
                      className="flex mt-2  w-full justify-center rounded bg-black py-2 px- font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        setPictureurl(null);
                      }}
                    >
                      Cancel{' '}
                    </button>
                  </div>
                </div>
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
                <div className={!data[0] ? 'hidden' : ''}>
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
                              defaultValue={data[0]?.gFirstName}
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
                              defaultValue={data[0]?.gLastName}
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
                              defaultValue={data[0]?.gEmail}
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
                                  values={[data[0]?.gSex, 'Male', 'Female']}
                                  setSelectedOption={(val) => setgsex1(val)}
                                  selectedOption={data[0]?.gSex}
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
                                defaultValue={data[0]?.gRelation}
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
                              defaultValue={data[0]?.gContact1}
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
                              defaultValue={data[0]?.gContact2}
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
                              className="w-full dark:bg-form-input rounded border border-stroke  py-2  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                              name="bio"
                              id="bio"
                              rows={2}
                              placeholder=""
                              defaultValue={data[0]?.gAddress}
                              // defaultValue={data?.gAddress}
                              onChange={(e) => setgAddress1(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>{' '}
                </div>

                <div className={!data[1] ? 'hidden' : ''}>
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
                              defaultValue={data[1]?.gFirstName}
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
                              defaultValue={data[1]?.gLastName}
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
                              defaultValue={data[0]?.gEmail}
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
                                  values={[data[1]?.gSex, 'Male', 'Female']}
                                  setSelectedOption={(val) => setgsex1(val)}
                                  selectedOption={data[1]?.gsex}
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
                                defaultValue={data[1]?.gRelation}
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
                              defaultValue={data[0]?.gContact1}
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
                              defaultValue={data[0]?.gContact2}
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
                              className="w-full dark:bg-form-input rounded border border-stroke  py-2  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                              name="bio"
                              id="bio"
                              rows={2}
                              placeholder=""
                              defaultValue={data[0]?.gAddress}
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
                    className={
                      action == 1
                        ? 'hidden'
                        : 'flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90'
                    }
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

export default fetchUserdatEdit;
