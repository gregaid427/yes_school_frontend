import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CheckboxOne from '../components/Checkboxes/CheckboxOne';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import userThree from '../images/user/log.jpg';
import DefaultLayout from '../layout/DefaultLayout';
import {
  createsessionAction,
  deletesessionByIdAction,
  fetchActivesessionAction,
  fetchAllsessionAction,
  resetcreatesession,
  resetUpdatesession,
  updatesessionStatusAction,
} from '../redux/slices/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import SessionSelect from '../components/SessionSelect';
import { Dialog } from 'primereact/dialog';
import SetSessionAlert from '../components/SetSessionAlert';
import {
  fetchschoolinfoAction,
  resetschoolinfo,
  SchoollogoAction,
  updateschoolinfoAction,
} from '../redux/slices/usersSlice';
import toast from 'react-hot-toast';
import {
  fetchAllClassAction,
  fetchAllSectionAction,
} from '../redux/slices/classSlice';
import {
  CreatestdCartegoryAction,
  resetcreatestdcart,
} from '../redux/slices/studentSlice';

const AppUpdateAlert = (props) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };
  const statistics = useSelector((state) => state?.statistics);
  const { AppUpdate } = statistics;
  // useEffect(() => {
  //   dispatch(fetchAllClassAction());
  //   dispatch(fetchAllSectionAction());
  // }, []);
  const user = useSelector((state) => state?.user);
  const { allschool, logo, updateschoolinfo } = user;
  const [picture, setPicture] = useState();
  const [picturename, setPicturename] = useState();
  const [pictureurl, setPictureurl] = useState(null);
  const [pictureurlshow, setPictureurlshow] = useState(null);
  const [space, setspace] = useState(true);

  const [startmonth, setStartMonth] = useState('JANUARY');
  const [sessionoption, setSessionoption] = useState('');

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [contact1, setContact1] = useState('');
  const [id, setId] = useState(null);
  const [contact2, setContact2] = useState('');
  const [address, setAddress] = useState('');
  const [link, setLink] = useState('');
  const [yes, setYes] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchschoolinfoAction());
    dispatch(fetchAllsessionAction());
  }, []);
  const session = useSelector((state) => state?.session);
  const [cartegoryName, setcartegoryName] = useState('');
  const [studentCart, setStudentCart] = useState(false);
  const [schoolinfo, setSchoolInfo] = useState(false);
  const [academicSession, setAcademicSession] = useState(false);

  const [logoimage, setlogoimage] = useState(false);

  const [description, setDesription] = useState();
  const student = useSelector((state) => state?.student);

  const { createstdcart } = student;
  const { fetchsession, createsession, updatesession } = session;
  const handlesubmit = () => {
    const datay = new FormData();

    let Mydata = JSON.stringify({
      filename: picturename,
    });

    datay.append('file', picture);

    datay.append(picturename, picture);
    datay.append('data', Mydata);
    dispatch(SchoollogoAction(datay));
  };
  const submit = () => {
    if (name == '') {
      return toast.error('Schol Name Cannot Be Empty');
    } else if (email == '') {
      return toast.error('Email Cannot Be Empty');
    } else if (contact1 == '') {
      return toast.error('Contact Cannot Be Empty');
    } else if (address == '') {
      return toast.error('Address Cannot Be Empty');
    }

    const data = {
      address: address,
      name: name,
      contact1: contact1,
      contact2: contact2,
      email: email,
      id: id,
    };
    dispatch(updateschoolinfoAction(data));
  };
  useEffect(() => {
    // setTimeout(() => setLoader(false), 1000);
    console.log(allschool?.data[0]?.id);
    if (allschool?.success == 1) {
      let data = allschool?.data;
      setId(
        allschool?.data[0]?.id == undefined ? null : allschool?.data[0]?.id,
      );
      setName(
        allschool?.data[0]?.name == undefined ? '' : allschool?.data[0]?.name,
      );
      setAddress(
        allschool?.data[0]?.address == undefined
          ? ''
          : allschool?.data[0]?.address,
      );
      setContact1(
        allschool?.data[0]?.contact1 == undefined
          ? ''
          : allschool?.data[0]?.contact1,
      );
      setContact2(
        allschool?.data[0]?.contact2 == undefined
          ? ''
          : allschool?.data[0]?.contact2,
      );
      setEmail(
        allschool?.data[0]?.email == undefined ? '' : allschool?.data[0]?.email,
      );
      setPictureurl(
        allschool?.data[0]?.logolink == undefined
          ? ''
          : allschool?.data[0]?.logolink,
      );
      setlogoimage(allschool?.data[0]?.logolink ? true : false);
    }
  }, [allschool]);
  console.log(pictureurl);

  const { username, userMail } = user;

  const [isChecked, setIsChecked] = useState(false);
  const [sectionTitle, setsectionTitle] = useState('');

  const classdata = {
    sessionname: sectionTitle.toUpperCase(),
    createdby: username?.payload,
    active: true,
    startmonth: startmonth.toUpperCase(),
    financeaccount: true
  };

  const handlecreateSection = (e) => {
    if (sectionTitle == '') {
      toast.error('Section Name Cannot Be Empty');
    } else {
      dispatch(createsessionAction(classdata));
    }
  };

  let data1 = {
    name: cartegoryName,
    createdby: username?.payload,
    description: description,
  };
  const handleSubmit = (e) => {
    if (cartegoryName == '') {
      toast.error('Cartegory Title Cannot Be Empty');
    } else {
      dispatch(CreatestdCartegoryAction(data1));
    }
  };

  useEffect(() => {
    if (updateschoolinfo?.success == 1) {
      setcartegoryName('');
      dispatch(resetschoolinfo());
      setSchoolInfo(true);
    }
  }, [updateschoolinfo]);
  useEffect(() => {
    if (createstdcart?.success == 1) {
      setcartegoryName('');
      dispatch(resetcreatestdcart());
      setStudentCart(true);
    }
  }, [createstdcart]);

  //set modal to false when all states are true
  useEffect(() => {
    if (academicSession && schoolinfo && studentCart && logoimage) {
      props.close(true);
    }
  }, [academicSession, schoolinfo, studentCart, logoimage]);

  useEffect(() => {
    if (AppUpdate?.success == 1) {
      AppUpdate?.school == 1 ? setSchoolInfo(true) : setSchoolInfo(false);
      AppUpdate?.session == 1
        ? setAcademicSession(true)
        : setAcademicSession(false);
      AppUpdate?.stdcart == 1 ? setStudentCart(true) : setStudentCart(false);
      AppUpdate?.logoimg == 1 ? setlogoimage(true) : setlogoimage(false);

      if (
        AppUpdate?.school == 1 &&
        AppUpdate?.session == 1 &&
        AppUpdate?.stdcart == 1 &&
        AppUpdate?.logoimg == 0
      ) {
        setspace(false);
      }
    }
  }, [AppUpdate]);
  useEffect(() => {
    if (createsession?.success == 1) {
      dispatch(resetcreatesession());
      dispatch(fetchActivesessionAction());
      setAcademicSession(true);
      //   dispatch(fetchAllSectionAction())
    }

    if (logo?.success == 1) {
      setPictureurlshow(null);
      setlogoimage(true);
    }
  }, [fetchsession, logo, createsession]);
  console.log(space);
  return (
    <div className="flex dark:bg-boxdark bg-white gap-2 row">
      <div className={space == true ? 'w-9/12 ' : 'hidden'}>
        <div className={schoolinfo != true ? 'mb-4' : 'hidden'}>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py- px-7 dark:border-strokedark">
              <h3 className="font-medium text-lg text-black dark:text-white">
                General School Information
              </h3>
              <h3 className="font-small text-sm text-black dark:text-white">
                Fill out the following info for School
              </h3>
            </div>
            <div className="p-7">
              <form action="#">
                <div className="mb-3 flex flex-col gap-2 ">
                  <div className="w-full sm:w-2/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      School Name
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={allschool?.data[0]?.name}
                      onChange={(e) => {
                        e.preventDefault();
                        setName(e.target.value.trim());
                      }}
                    />
                  </div>

                  {/* <div className="w-full sm:w-2/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      School Code <span className="small-font">(optional)</span>
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      onChange={(e) => {
                        e.preventDefault();
                        setCode(e.target.value.trim());
                      }}
                    />
                  </div> */}
                </div>

                <div className="mb-3 flex flex-col gap-2 ">
                  <div className="w-full sm:w-4/4">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Email
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      defaultValue={allschool?.data[0]?.email}
                      placeholder=""
                      onChange={(e) => {
                        e.preventDefault();
                        setEmail(e.target.value.trim());
                      }}
                    />
                  </div>
                  {/* <div className="w-full sm:w-2/4 flex gap-5">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
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
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Religion{' '}
                      </label>
                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <SelectGroupTwo
                          values={['Christian', 'Muslim']}
                          setSelectedOption={setAge}
                          selectedOption={age}

                        />
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="mb-3 flex flex-col gap-2 ">
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
                      defaultValue={allschool?.data[0]?.contact1}
                      placeholder=""
                      onChange={(e) => {
                        e.preventDefault();
                        setContact1(e.target.value.trim());
                      }}
                    />
                  </div>

                  <div className="w-full sm:w-2/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Contact 2
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      defaultValue={allschool?.data[0]?.contact2}
                      onChange={(e) => {
                        e.preventDefault();
                        setContact2(e.target.value.trim());
                      }}
                    />
                  </div>
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Username"
                  >
                    School Address
                  </label>
                  <div className="relative">
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-2  px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="bio"
                      defaultValue={allschool?.data[0]?.address}
                      rows={2}
                      placeholder=""
                      onChange={(e) => {
                        e.preventDefault();
                        setAddress(e.target.value.trim());
                      }}
                    ></textarea>
                  </div>
                </div>

                <div className="flex  justify-end gap-4.5">
                  <button
                    className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    onClick={(e) => {
                      e.preventDefault();
                      submit();
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
              </form>
            </div>
          </div>
        </div>
        <div className={academicSession != true ? '' : 'hidden'}>
          <hr></hr>
          <div className="w-full mb-7 ">
            <div className="grid  gap-8">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Enter Current Academic Session
                  </h3>
                </div>
                <div className="px-7">
                  <form action="#">
                    <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-small text-black dark:text-white"
                        htmlFor=""
                      >
                        Session Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder="1st Term 2025"
                        defaultValue=""
                        onChange={(e) => {
                          e.preventDefault();
                          setsectionTitle(e.target.value.trim());
                        }}
                      />
                      <div>
                        {/* <div className="mt-4 flex gap-3 flex-row">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="checkboxLabelOne"
                        >
                          {'Current Session'}
                        </label>

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
                      </div> */}
                        {/* <div style={{ display: !isChecked ? 'none' : 'block' }}> */}{' '}
                        {/* <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Session Start Month
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <SelectGroupTwo
                            values={[
                              'January',
                              'February',
                              'March',
                              'April',
                              'May',
                              'June',
                              'July',
                              'August',
                              'September',
                              'October',
                              'November',
                              'December',
                            ]}
                            setSelectedOption={setStartMonth}
                            selectedOption={startmonth}
                          />
                        </div> */}
                      </div>
                      {/* </div> */}
                    </div>

                    <div className="flex justify-end mt-5 gap-4.5">
                      <button
                        className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={(e) => {
                          handlecreateSection();
                          e.preventDefault();
                        }}
                      >
                        Save
                      </button>
                      {/* <button
                        className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="reset"
                        onClick={(e) => {
                          props.openModal(false);
                        }}
                      >
                        Close
                      </button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={studentCart != true ? '' : 'hidden'}>
          <hr></hr>
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-2 mb-8 shadow-default dark:border-strokedark dark:bg-boxdark '
            }
          >
            <div className="border-b border-stroke mt-8 px-5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Enter A Student Cartegory
              </h3>
            </div>
            <div className="px-5">
              <div className="w-full mb-2 sm:w-2/2">
                <label
                  className="mb-1 block text-sm font-medium text-black dark:text-white"
                  htmlFor=""
                >
                  Title
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name=""
                  id=""
                  placeholder="General"
                  defaultValue=""
                  onChange={(e) =>
                    setcartegoryName(e.target.value.trim().toUpperCase())
                  }
                />
              </div>

              <div className="mb-3">
                <label
                  className="mb-1 block text-sm font-medium text-black dark:text-white"
                  htmlFor="emailAddress"
                >
                  Description/Notes{' '}
                  <span className="small-font">(optional)</span>
                </label>
                <div className="relative">
                  <textarea
                    className="w-full rounded border border-stroke bg-gray py-3  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="bio"
                    id="bio"
                    rows={2}
                    placeholder=""
                    defaultValue=""
                    onChange={(e) => setDesription(e.target.value.trim())}
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-4.5">
                <button
                  className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  Save
                </button>
                {/* <button
                  className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    props.close(false);
                  }}
                >
                  close
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={logoimage == false ? 'w-3/12  ' : 'hidden'}>
        <div className="rounded-sm border p-3 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black text-center dark:text-white">
              School Logo
            </h3>
          </div>
          <div className="p- w-full">
            <div className="w-full flex justify-center items-center">
              <img
                alt="No Image"
                src={pictureurl == '' ? userThree : pictureurl}
                className="h-40  w-full"
              />
            </div>
          </div>
          <div className="w-full ">
            <label className="mb-3 block text-xs text-center text-black dark:text-white">
              Upload School Logo
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
                    setPictureurl(URL.createObjectURL(event.target.files[0]));
                    setPictureurlshow(true);
                  }}
                  type="file"
                  accept="image/*"
                  className=" rounded-md border border-stroke p-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />{' '}
              </div>
              <div className={!pictureurlshow ? 'hidden' : ''}>
                <button
                  className="flex mt-2  w-full justify-center rounded bg-primary py-2 px- font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => {
                    handlesubmit();
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
                    setPictureurlshow(null);
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
  );
};

export default AppUpdateAlert;
