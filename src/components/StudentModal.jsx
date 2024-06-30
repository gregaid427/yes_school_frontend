import React, { useEffect, useState } from 'react';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';
import userThree from '../images/user/user-03.png';
import { useDispatch, useSelector } from 'react-redux';

const StudentModal = (props) => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [otherName, setotherName] = useState('');
  const [contact1, setcontact1] = useState('');
  const [contact2, setcontact2] = useState('');
  const [gender, setgender] = useState('Male');
  const [password, setpassword] = useState('');
  const [classes, setclasses] = useState('Grade 1');
  const [religion, setreligion] = useState('Christianity');
  const [dateofbirth, setdateofbirth] = useState('01-01-2020');
  const [createdBy, setcreatedBy] = useState('');
  const [active, setactive] = useState('');
  const [section, setsection] = useState('A');
  const [age, setAge] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);
  const { singleStudentloading, singleStudent } = student;
  const [data, setdata] = useState();
  const [data1, setdata1] = useState();
  const [studentName, setstudentName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianName2, setGuardianName2] = useState('');

  function joinName(fn, on, ln) {
    return fn + ' ' + on + ' ' + ln;
  }

  useEffect(() => {
    // setTimeout(() => setLoader(false), 1000);

    if (singleStudent?.success == 1) {
      let data = singleStudent?.data;
      setdata(data[0]);

      if (data[1] != null) setdata1(data[1]);

      setstudentName(
        joinName(data[0]?.firstName, data[0]?.otherName, data[0]?.lastName),
      );
      setGuardianName(
        joinName(data[0]?.gFirstName, data[0]?.gOtherName, data[0]?.gLastName),
      );
      setGuardianName2(
        joinName(data[1]?.gFirstName, data[1]?.gOtherName, data[1]?.gLastName),
      );
    }
    if (singleStudentloading == true) {
      // setTimeout(() => setLoader(false), 1000);
    }
  }, [singleStudentloading]);

  return (
    <div className="mx-auto w-full  ">
      <div className="rounded-sm py-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Student Personal Information
          </h3>
        </div> */}
        <div className="px-3">
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3 flex flex-row  sm:flex-row">
              <div className="sm:w-3/4  mb-4 flex flex-col">
                <div className="flex mb-3 gap-1 flex-row">
                  <div className="w-full sm:w-3/4">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Name
                    </label>
                    <input
                      className="w-full dark:bg-form-input rounded capitalize border border-stroke  py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      defaultValue={studentName}
                      //   onChange={(e) => setotherName(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-1/4">
                    <label
                      className=" block text-sm  font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Student ID{' '}
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <input
                        className="w-full rounded uppercase border border-stroke  py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        defaultValue={data?.student_id}
                        // onChange={ (e)  => setuser(e.target.value)  }
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-1 ">
                  <div className="w-full sm:w-1/4">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Date of Birth
                    </label>

                    <input
                      className="w-full rounded capitalize border border-stroke  py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      defaultValue={data?.dateofbirth}
                      // onChange={ (e)  => setuser(e.target.value)  }
                    />
                  </div>
                  <div className="w-full sm:w-1/4">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Sex
                    </label>

                    <input
                      className="w-full rounded capitalize border border-stroke  py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      defaultValue={data?.gender}
                      // onChange={ (e)  => setuser(e.target.value)  }
                    />
                  </div>
                  <div className="w-full sm:w-1/4 flex flex-col ">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Class
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <input
                        className="w-full rounded capitalize border border-stroke  py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        defaultValue={data?.class}
                        // onChange={ (e)  => setuser(e.target.value)  }
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/4 flex flex-col ">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Section
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <input
                        className="w-full rounded capitalize border border-stroke  py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        defaultValue={data?.section}
                        // onChange={ (e)  => setuser(e.target.value)  }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:w-1/4 w-full">
                <div className="px-4 w-full text-center ">
                  <div className="relative z-30 mx-auto   w-full h-full rounded-5 bg-white/20 p-1 backdrop-blur   sm:p-3">
                    <div className="relative drop-shadow-2">
                      <img src={userThree} alt="profile" />
                      <label
                        htmlFor="profile"
                        className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                      >
                        <svg
                          className="fill-current"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                            fill=""
                          />
                        </svg>
                        <input
                          type="file"
                          name="profile"
                          id="profile"
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ color: '#475569' }} />

            <div className="mb-5 mt-3 flex flex-col gap-1 sm:flex-row">
              <div className="w-full sm:w-[57%]">
                <label
                  className=" block text-sm font-medium text-black dark:text-white"
                  htmlFor="phoneNumber"
                >
                  Parent/Guardian Name
                </label>
                <input
                  className="w-full rounded capitalize border border-stroke  py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name=""
                  id=""
                  defaultValue={guardianName}
                  // onChange={ (e)  => setuser(e.target.value)  }
                />
              </div>
              <div className="w-full sm:w-[44%] gap-3 flex ">
                <div className="w-full sm:w-[43%]">
                  <label
                    className=" block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Sex
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <input
                      className="w-full rounded border border-stroke  dark:bg-form-input py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={data?.gSex}
                      // onChange={ (e)  => setuser(e.target.value)  }
                    />
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    className=" block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Relation with Student
                  </label>
                  <input
                    className="w-full rounded border border-stroke  dark:bg-form-input py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    defaultValue={data?.gRelation}
                    // onChange={ (e)  => setuser(e.target.value)  }
                  />
                </div>
              </div>
            </div>

            <div className="mb-5 flex flex-row gap-1 sm:flex-row">
              <div className="sm:w-[50%] gap-3 flex flex-col">
                <div className="flex w-full gap-1">
                  <div className="w-full sm:w-[50%]">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Contact
                    </label>
                    <input
                      className="w-full rounded border border-stroke dark:bg-form-input  py-2 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={data?.gContact1}
                      // onChange={ (e)  => setuser(e.target.value)  }
                    />
                  </div>

                  <div className="w-full sm:w-[50%]">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Contact
                    </label>
                    <input
                      className="w-full rounded border dark:bg-form-input border-stroke  py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={data?.gContact2}
                      // onChange={ (e)  => setuser(e.target.value)  }
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full sm:w-full">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Email
                    </label>
                    <input
                      className="w-full rounded border dark:bg-form-input border-stroke  py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={data?.gEmail}
                      // onChange={ (e)  => setuser(e.target.value)  }
                    />
                  </div>
                </div>
              </div>
              <div className="sm:w-[50%]">
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
                      rows={4}
                      placeholder=""
                      defaultValue={data?.gAddress}
                      // onChange={ (e)  => setuser(e.target.value)  }
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className={!data1 ? 'hidden' : 'block'}>
              <hr style={{ color: '#475569' }} />

              <div className="mb-5 mt-3 flex flex-col gap-1 sm:flex-row">
                <div className="w-full sm:w-[57%]">
                  <label
                    className=" block text-sm font-medium text-black dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Parent/Guardian Name
                  </label>
                  <input
                    className="w-full rounded capitalize border border-stroke  py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    type="text"
                    name=""
                    id=""
                    defaultValue={guardianName2}
                    // onChange={ (e)  => setuser(e.target.value)  }
                  />
                </div>
                <div className="w-full sm:w-[44%] gap-3 flex ">
                  <div className="w-full sm:w-[43%]">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Sex
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <input
                        className="w-full rounded border border-stroke  dark:bg-form-input py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={data1?.gSex}
                        // onChange={ (e)  => setuser(e.target.value)  }
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Relation with Student
                    </label>
                    <input
                      className="w-full rounded border border-stroke  dark:bg-form-input py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={data1?.gRelation}
                      // onChange={ (e)  => setuser(e.target.value)  }
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5 flex flex-row gap-1 sm:flex-row">
                <div className="sm:w-[50%] gap-3 flex flex-col">
                  <div className="flex w-full gap-1">
                    <div className="w-full sm:w-[50%]">
                      <label
                        className=" block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Contact
                      </label>
                      <input
                        className="w-full rounded border border-stroke dark:bg-form-input  py-2 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={data1?.gContact1}
                        // onChange={ (e)  => setuser(e.target.value)  }
                      />
                    </div>

                    <div className="w-full sm:w-[50%]">
                      <label
                        className=" block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Contact
                      </label>
                      <input
                        className="w-full rounded border dark:bg-form-input border-stroke  py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={data1?.gContact2}
                        // onChange={ (e)  => setuser(e.target.value)  }
                      />
                    </div>
                  </div>
                  <div>
                    <div className="w-full sm:w-full">
                      <label
                        className=" block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Email
                      </label>
                      <input
                        className="w-full rounded border dark:bg-form-input border-stroke  py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={data1?.gEmail}
                        // onChange={ (e)  => setuser(e.target.value)  }
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:w-[50%]">
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
                        rows={4}
                        placeholder=""
                        defaultValue={data1?.gAddress}
                        // onChange={ (e)  => setuser(e.target.value)  }
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="mb-5.5">
                <label
                  className=" block text-sm font-medium text-black dark:text-white"
                  htmlFor="Username"
                >
                  Home Address
                </label>
                <input
                  className="w-full rounded border border-stroke  py-2 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                  type="text"
                  name="Username"
                  id="Username"
                  placeholder=""
                  defaultValue=""
                />
              </div> */}
          </form>
          <div className="flex justify-end gap-4.5">
            <button
              className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              onClick={() => {
                props.close();
              }}
            >
              close
            </button>
          </div>
          <div className="flex justify-end gap-4.5">
            <button
              className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              onClick={() => {
                props.close();
              }}
            >
              close
            </button>
          </div>
          <div className="flex justify-end gap-4.5">
            <button
              className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              onClick={() => {
                props.close();
              }}
            >
              close
            </button>
          </div>
        </div>

        {/* <div className="col-span-5 xl:col-span-2">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Student Picture
            </h3>
          </div>
          <div className="p-7">
            <form action="#">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-14 w-14 rounded-full">
                  <img src={userThree} alt="User" />
                </div>
                <div>
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
                </div>
              </div>

              <div
                id="FileUpload"
                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4  sm:py-7.5"
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
              </div>

              <div className="flex justify-end gap-4.5">
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
              </div>
            </form>
          </div>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default StudentModal;
