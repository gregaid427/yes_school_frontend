import React, { useEffect, useState } from 'react';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';
import userThree from '../images/user/user-03.png';
import { useDispatch, useSelector } from 'react-redux';

const StudentModall = (props) => {
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
  const [studentName, setstudentName] = useState('');
  const [guardianName, setGuardianName] = useState('');



function joinName(fn,on,ln){
    return fn +" "+ on + " "+ ln;
           }

  useEffect(() => {
    // setTimeout(() => setLoader(false), 1000);

    if (singleStudent?.success == 1) {
      let data = singleStudent?.data;
      console.log(data)
       setdata(data[0]);
    
       setstudentName( joinName((data[0].firstName),(data[0].otherName),(data[0].lastName)) )
       setGuardianName( joinName((data[0].gFirstName),(data[0].gOtherName),(data[0].gLastName)) )





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
        <div className="px-7">
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-2/4">
                <label
                  className=" block text-sm font-medium text-black dark:text-white"
                  htmlFor="phoneNumber"
                >
                  Name 
                </label>
                <input
                  className="w-full rounded capitalize border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name=""
                  id=""
                  defaultValue={studentName}
                //   onChange={(e) => setotherName(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-2/4 flex gap-5">
                <div className="w-full sm:w-1/2">
                  <label
                    className=" block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Sex
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <SelectGroupTwo
                      values={['Male', 'Female']}
                    //   setSelectedOption={(val) => setgender(val)}
                    //   selectedOption={gender}
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className=" block text-sm font-medium text-black dark:text-white"
                    htmlFor=""
                  >
                    Religion{' '}
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <SelectGroupTwo
                      values={['Christian', 'Muslim', 'Other']}
                    //   setSelectedOption={(val) => setreligion(val)}
                    //   selectedOption={religion}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-2/4">
                <label
                  className=" block text-sm font-medium text-black dark:text-white"
                  htmlFor="fullName"
                >
                  Date of Birth
                </label>

                <input
                  className=" w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  //   placeholder="dd/mm/yyyy"
                  // data-class="flatpickr-right"
                  name="dateofbirth"
                  defaultValue={dateofbirth}
                  type="text"
                //   onChange={(e) => {
                //     setdateofbirth(e.target.value);
                //     console.log(e.target.value);
                //   }}
                />
              </div>

              <div className="w-full sm:w-2/4 flex gap-5">
                <div className="w-full sm:w-1/2">
                  <label
                    className=" block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Class
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <SelectGroupTwo
                      values={['Grade 1', 'Grade 2']}
                      setSelectedOption={(val) => setclasses(val)}
                      selectedOption={classes}
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className=" block text-sm font-medium text-black dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Section{' '}
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <SelectGroupTwo
                      values={['A', 'B']}
                      setSelectedOption={(val) => setsection(val)}
                      selectedOption={section}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ color: '#3d3d52' }} />

            <div className="mb-5 mt-3 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-2/4">
                <label
                  className=" block text-sm font-medium text-black dark:text-white"
                  htmlFor="phoneNumber"
                >
                   Parent/Guardian  Name
                </label>
                <input
                  className="w-full rounded capitalize border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name=""
                  id=""
                  defaultValue={guardianName}
                  // onChange={ (e)  => setuser(e.target.value)  }
                />
              </div>
              <div className="w-full sm:w-2/4 flex gap-5">
                <div className="w-full sm:w-1/2">
                  <label
                    className=" block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Sex
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <SelectGroupTwo
                      values={['Male', 'Female']}
                      setSelectedOption={setAge}
                      selectedOption={age}
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
                    className="w-full rounded border border-stroke bg-gray dark:bg-form-input py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
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

            <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/3">
                <label
                  className=" block text-sm font-medium text-black dark:text-white"
                  htmlFor="fullName"
                >
                   Parent/Guardian  Contact 1
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name=""
                  id=""
                  placeholder=""
                  Value={data?.gContact1}
                  // onChange={ (e)  => setuser(e.target.value)  }
                />
              </div>

              <div className="w-full sm:w-1/3">
                <label
                  className=" block text-sm font-medium text-black dark:text-white"
                  htmlFor="phoneNumber"
                >
                   Parent/Guardian  Contact 2
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name=""
                  id=""
                  placeholder=""
                  defaultValue={data?.gContact2}
                  // onChange={ (e)  => setuser(e.target.value)  }
                />
              </div>

              <div className="w-full sm:w-1/3">
                <label
                  className=" block text-sm font-medium text-black dark:text-white"
                  htmlFor="fullName"
                >
                  Email
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name=""
                  id=""
                  placeholder=""
                  defaultValue={data?.gEmail}
                  // onChange={ (e)  => setuser(e.target.value)  }
                />
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
                  className="w-full rounded border border-stroke bg-gray py-2 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="Username"
                  id="Username"
                  placeholder=""
                  defaultValue=""
                />
              </div> */}

            <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className=" block text-sm font-medium text-black dark:text-white"
                  htmlFor="Username"
                >
                  Home Address
                </label>
                <div className="relative">
                  <textarea
                    className="w-full rounded border border-stroke bg-gray py-2  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="bio"
                    id="bio"
                    rows={2}
                    placeholder=""
                    defaultValue={data?.gAddress}
                    // onChange={ (e)  => setuser(e.target.value)  }
                  ></textarea>
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <label
                  className=" block text-sm font-medium text-black dark:text-white"
                  htmlFor="Username"
                >
                Home Nearest Landmark
                </label>
                <div className="relative">
                  <textarea
                    className="w-full rounded border border-stroke bg-gray py-2  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="bio"
                    id="bio"
                    rows={2}
                    placeholder=""
                    defaultValue={data?.gAddressLandmark}
                    // onChange={ (e)  => setuser(e.target.value)  }
                  ></textarea>
                </div>
              </div>
            </div>

           

          
          </form>
          <div className="flex justify-end gap-4.5">
              <button
                className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                onClick={() => { props.close() ; }  }              >
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

export default StudentModall;
