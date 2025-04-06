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
  SchoollogoAction,
  updateschoolinfoAction,
} from '../redux/slices/usersSlice';
import toast from 'react-hot-toast';
import { fetchAllClassAction, fetchAllSectionAction } from '../redux/slices/classSlice';

const GeneralSettings = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };
  
  // useEffect(() => {
  //   dispatch(fetchAllClassAction());
  //   dispatch(fetchAllSectionAction());
  // }, []);
  const user = useSelector((state) => state?.user);
  const { allschool,logo } = user;
  const [picture, setPicture] = useState();
  const [picturename, setPicturename] = useState();
  const [pictureurl, setPictureurl] = useState(null);
  const [pictureurlshow, setPictureurlshow] = useState(null);
  const [classinfo, setclassinfo] = useState();


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
    }
  }, [allschool]);
  console.log(pictureurl)
  const handleSetsession = () => {
    const data = {
      session: sessionoption,
      startmonth: startmonth.toUpperCase(),
    };

    dispatch(updatesessionStatusAction(data));
  };

  useEffect(() => {
    if (updatesession?.success == 1) {
       toast.success('Session Updated Successfully');
      show('top-right');
      dispatch(resetUpdatesession());
      dispatch(fetchActivesessionAction());

      //   dispatch(fetchAllSectionAction())
    }

    if (logo?.success == 1) {
     setPictureurlshow(null)
    }
  }, [fetchsession,logo]);

  return (
    <DefaultLayout>
      <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '50%' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      >
        <SetSessionAlert setYes={setYes} yes={yes} close={setVisible} />
      </Dialog>
      <div className="flex gap-2 row">
        <div className="w-6/12">
          <div className="mb-4">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  General Setting
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
                          setName(e.target.value);
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
                        setCode(e.target.value);
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
                          setEmail(e.target.value);
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
                          setContact1(e.target.value);
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
                          setContact2(e.target.value);
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
                        className="w-full rounded border border-stroke bg-gray py-2  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bio"
                        defaultValue={allschool?.data[0]?.address}
                        rows={2}
                        placeholder=""
                        onChange={(e) => {
                          e.preventDefault();
                          setAddress(e.target.value);
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
          <div className="grid  gap-8">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Set Current Academic Session
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="w-full mb-4 sm:w-2/2">
                    <div className=" flex gap-2 ">
                      <div className="w-full mb-1 sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Session
                        </label>

                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <SessionSelect setsectionprop={setSessionoption} selectinfo={setclassinfo} />
                        </div>
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label
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
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end  gap-4.5">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        handleSetsession();
                      }}
                    >
                      Update
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
        </div>
        <div className="w-3/12">
          <div className="rounded-sm border p-3 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black text-center dark:text-white">
                School Logo
              </h3>
            </div>
            <div className="p-2 ">
              <div className="w-full flex justify-center items-center">
                <img
                  src={ pictureurl == null ? userThree : pictureurl}
                  className="h-40"
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
                      setPictureurlshow(true)
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
                <div className={!pictureurlshow ? 'hidden' :""}>
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
    </DefaultLayout>
  );
};

export default GeneralSettings;
