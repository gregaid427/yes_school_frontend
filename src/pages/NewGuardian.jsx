import CheckboxFive from '../components/Checkboxes/CheckboxFive';
import CheckboxFour from '../components/Checkboxes/CheckboxFour';
import CheckboxOne from '../components/Checkboxes/CheckboxOne';
import CheckboxThree from '../components/Checkboxes/CheckboxThree';
import CheckboxTwo from '../components/Checkboxes/CheckboxTwo';
import SwitcherFour from '../components/Switchers/SwitcherFour';
import SwitcherOne from '../components/Switchers/SwitcherOne';
import SwitcherThree from '../components/Switchers/SwitcherThree';
import SwitcherTwo from '../components/Switchers/SwitcherTwo';
import DatePickerOne from '../components/Forms/DatePicker/DatePickerOne';
import DatePickerTwo from '../components/Forms/DatePicker/DatePickerTwo';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import MultiSelect from '../components/Forms/MultiSelect';
import DefaultLayout from '../layout/DefaultLayout';
import userThree from '../images/user/user-03.png';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import flatpickr from 'flatpickr';
import {
  CreateGuardianAction,
  CreateUserAction,
  resetcreateGuardian,
} from '../redux/slices/usersSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import SetSessionAlert from '../components/SetSessionAlert';
import NewGuardModal from '../components/NewGuardianModal';

const NewGuardian = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };


  const formRef5 = useRef();

  const location = useLocation();

  let value  = location?.state.value;
  console.log(value);

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const { loading, error, CreateUser,createguard } = user;

  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [otherName, setotherName] = useState('');
  const [contact1, setcontact1] = useState('');
  const [contact2, setcontact2] = useState('');
  const [gender, setgender] = useState('Male');
  const [password, setpassword] = useState(null);
  const [email, setemail] = useState(null);
  const [relation, setRelation] = useState('');
  const [createdBy, setcreatedBy] = useState('');
  const [active, setactive] = useState('');
  const [address, setaddress] = useState('');
  const [info, setinfo] = useState('');


  const handleSubmit = (e) => {
    const data = {
      userId: value.student_id,
      firstName: firstName,
      lastName: lastName,
      otherName: otherName,
      contact1: contact1,
      contact2: contact2,
      sex: gender,
      password: password,
      email: email,
      relation: relation,
      address: address,
      createdBy: createdBy,
      active: active,
      role: 'guardian',
    };
    dispatch(CreateGuardianAction(data));
  };


  useEffect(() => {
    setinfo(CreateUser?.data)

    if (CreateUser?.success === undefined) {
      dispatch(resetcreateGuardian())

    }
    if (error) {
      toast.error('Error Creating New User');
      dispatch(resetcreateGuardian())

    }
    if (CreateUser?.success == 1) {
      formRef5.current.reset();
      setinfo(createguard.data)

      dispatch(resetcreateGuardian())
      toast.success('New User created Successfully');
      show('top-right');

    }
    if (CreateUser?.success == 0) {
      toast.error('Email Already Taken');
      dispatch(resetcreateGuardian())
    }
    console.log(CreateUser)
  }, [CreateUser,loading]);

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
console.log(info)
  return (
    <DefaultLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '30%' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      >
        <NewGuardModal guardinfo={createguard?.data} info={value} close={setVisible} />
      </Dialog>
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Guardian Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form ref={formRef5} onSubmit={(e) => handleSubmit(e)}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
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
                        onChange={(e) => setfirstName(e.target.value)}
                        placeholder=""
                        defaultValue=""
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
                        onChange={(e) => setlastName(e.target.value)}
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                  </div>

                  {/* <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
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
                        onChange={(e) => setotherName(e.target.value)}
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                    <div className="w-full sm:w-2/4 flex gap-5">
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
                          htmlFor="phoneNumber"
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
                    </div>
                  </div> */}

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
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
                        onChange={(e) => setcontact1(e.target.value)}
                        placeholder=""
                        defaultValue=""
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
                        onChange={(e) => setcontact2(e.target.value)}
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email Address   <span className="text-xs">(optional)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute  top-4"></span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2  px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder=""
                        defaultValue=""
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                       Password  <span className="text-xs">(optional)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute  top-4"></span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2  px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        onChange={(e) => setpassword(e.target.value)}
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Relation With Student
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        onChange={(e) => setRelation(e.target.value)}
                        placeholder=""
                        defaultValue=""
                      />
                    </div>

                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Sex
                      </label>
                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <SelectGroupTwo
                          values={['Male', 'Female']}
                          setSelectedOption={(val) => setgender(val)}
                          selectedOption={gender}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
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
                        onChange={(e) => setaddress(e.target.value)}
                        placeholder=""
                        defaultValue=""
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
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
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NewGuardian;
