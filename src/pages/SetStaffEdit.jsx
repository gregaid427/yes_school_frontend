import { useEffect, useRef, useState } from 'react';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../layout/DefaultLayout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import Loader from '../common/Loader';
import toast from 'react-hot-toast';
import { fetchSingleClassAction } from '../redux/slices/classSlice';
import InactiveSVG from '../components/Svgs/Inactive';
import {
  activeStaffAction,
  CreatesStaffAction,
  deleteStaffAction,
  fetchAllstaffAction,
  inactiveStaffAction,
  UpdateStaffAction,
} from '../redux/slices/usersSlice';
import ActiveSVG from '../components/Svgs/active';

const StaffEdit = () => {
  const [pagesval, setpagesval] = useState(30);
  const [loader, setLoader] = useState(true);

  const [gender, setGender] = useState('Male');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState(null);
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [info, setInfo] = useState('');
  const [address, setAddress] = useState('');
  const [rolecode, setRolecode] = useState('000000');
  const [student, setstudent] = useState(false);
  const [fees, setFees] = useState(false);
  const [expenses, setExpenses] = useState(false);
  const [settings, setsettings] = useState(false);
  const [Academics, setAcademics] = useState(false);
  const [inventory, setInventory] = useState(false);

  const [value, setVal] = useState();

  const [nodes, setdata] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state?.user);
  const formRef1 = useRef();

  const { allstaff, allStaffloading, allstaff1 } = users;
  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }
  const location = useLocation();

  useEffect(() => {
   
    if (location?.state == null) {
      // return navigate(-1);
    } else {
      const { value } = location?.state;

      setVal(value);
      let myArr = value?.rolecode?.split(',');
      setstudent(myArr.includes('1'));
      setAcademics(myArr.includes('2'));
      setInventory(myArr.includes('3'));
      setExpenses(myArr.includes('4'));
      setFees(myArr.includes('5'));
      setsettings(myArr.includes('6'));
      setFname(value?.sFirstName);
      setLname(value?.sLastName);
      setContact1(value?.contact1);
      setContact2(value?.contact2);
      setGender(value?.sGender);
      setRole(value?.role);
      setEmail(value?.sEmail);
    }
    setTimeout(() => setLoader(false), 1000);
  }, [value]);

  // useEffect(() => {
  //   setTimeout(() => setLoader(false), 1000);

  //   if (allstaff?.success == 1) {
  //     let data = allstaff?.data;
  //     setdata(data);
  //     setsettings(false);
  //     setAcademics(false);
  //     setExpenses(false);
  //     setFees(false);
  //     setstudent(false);
  //     setInventory(false);
  //     setFname(value?.sFirstName)
  //     setLname(value?.sLastName)
  //     setContact1(value?.contact1)
  //     setContact2(value?.contact2)
  //     setGender(value?.sGender)
  //     setRole(value?.role)
  //     setEmail(value?.sEmail)
  //   }
  // }, [allstaff]);
  // useEffect(() => {
  //   if (allstaff1?.success == 1) {
  //     resetFormStates();
  //   }
  // }, [allstaff1]);

  let data = { nodes };

  const theme = useTheme([
    {
      // HeaderRow: `
      // background-color: #313D4A;
      // border-bottom: 1px solid #fff !important;

      // `,
      Table: `
      --data-table-library_grid-template-columns:  47% 15% 38%;
    `,
      HeaderRow: `
    .th {
      border-bottom: 1px solid #a0a8ae;
      padding: 5px 0px;
    }
  `,
      BaseCell: `
        font-size: 15px;
        //color:white;
      //   border-bottom: 1px solid #313D4A !important;
      //   //  background-color: #24303F;

      `,
      //       Row: `
      //   &:nth-of-type(odd) {
      //     background-color: #24303F;
      //   }

      //   &:nth-of-type(even) {
      //     background-color: #202B38;
      //   }
      // `,
    },
  ]);

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 30,
    },
    onChange: onPaginationChange,
  });



  data = {
    nodes: data.nodes.filter((item) =>
      item.sFirstName.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  function onPaginationChange(action, state) {}

  const handleViewbtn = (value) => {
    dispatch(
      fetchSingleClassAction({
        classId: value.classId,
        classTitle: value.title,
      }),
    );
    navigate('/academics/class/editclass', {
      state: { action: 1, value: value },
    });
  };

  let codes = `${student ? 1 : 0},${Academics ? 2 : 0},${inventory ? 3 : 0},${expenses ? 4 : 0},${fees ? 5 : 0},${settings ? 6 : 0}`;
  const user = useSelector((state) => state?.user);
const { username, userMail} = user;

  const classdata = {
    fname: fname,
    lname: lname,
    email: email,
    sex: gender,
    contact1: contact1,
    contact2: contact2,
    role: role,
    rolecode: codes,
    password: password,
    address: address,
    info: info,
    userId: value?.userId,
    createdby: username?.payload,
  };
  const handlecreateStaff = () => {
    if (fname == '') {
      toast.error('Error - Name Cannot Be Empty');
    } else {
    //  console.log(classdata);
       dispatch(UpdateStaffAction(classdata));

    }
  };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(`All-Classes-List`);
  };

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `All-Classes-List`,
  });

  const handleDownloadCSV = async () => {
    const csv = generateCsv(csvConfig)(nodes);
    download(csvConfig)(csv);
  };

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      
      <div className={'flex gap-2  w-full'}>
        <div className="w-10/12">
          <div className=" gap-8">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Update Staff
                </h3>
              </div>
              <div className="flex gap-3">
                <div className="p-4 w-full ">
                  <form ref={formRef1}>
                    <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-small text-black dark:text-white"
                        htmlFor=""
                      >
                        First Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={value?.sFirstName}
                        onChange={(e) => setFname(e.target.value.trim())}
                      />
                    </div>

                    <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Last Name{' '}
                        {/* <span className="small-font">(optional)</span> */}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={value?.sLastName}
                        onChange={(e) => setLname(e.target.value.trim())}
                      />
                    </div>
                    <div className="flex row gap-1 mb-4 ">
                      {' '}
                      <div className="w-full sm:w-2/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Contact 1{' '}
                          {/* <span className="small-font">(optional)</span> */}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name=""
                          id=""
                          placeholder=""
                          defaultValue={value?.contact1}
                          onChange={(e) => setContact1(e.target.value.trim())}
                        />
                      </div>
                      <div className="w-full sm:w-2/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Contact 2{' '}
                          {/* <span className="small-font">(optional)</span> */}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name=""
                          id=""
                          placeholder=""
                          defaultValue={value?.contact2}
                          onChange={(e) => setContact2(e.target.value.trim())}
                        />
                      </div>
                    </div>
                    <div className="flex row gap-1 mb-4 ">
                      {' '}
                      <div className="w-full sm:w-2/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Sex{' '}
                          {/* <span className="small-font">(optional)</span> */}
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <SelectGroupTwo
                            values={[value?.sGender, 'Male', 'Female']}
                            setSelectedOption={(val) => setGender(val)}
                            selectedOption={gender}
                          />
                        </div>
                      </div>
                      <div className="w-full sm:w-2/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Role{' '}
                          {/* <span className="small-font">(optional)</span> */}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name=""
                          id=""
                          placeholder=""
                          defaultValue={value?.role}
                          onChange={(e) => setRole(e.target.value.trim())}
                        />
                      </div>
                    </div>
                    <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-small text-black dark:text-white"
                        htmlFor=""
                      >
                        Email
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={value?.sEmail}
                        onChange={(e) => setEmail(e.target.value.trim())}
                      />
                    </div>

                    <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-small text-black dark:text-white"
                        htmlFor=""
                      >
                        Password
                        <span className="small-font float-end">
                          Leave field empty to mantain old password
                        </span>
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        // defaultValue={value?.sEmail}
                        onChange={(e) => setPassword(e.target.value.trim())}
                      />
                    </div>

                    <div className="flex justify-end my-5 gap-4.5">
                      <button
                        className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={(e) => {
                          e.preventDefault();
                          handlecreateStaff();
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type=""
                        onClick={(e) => {
                          navigate('/settings/staff')
                        }}
                      >
                        Back
                      </button>
                    </div>
                  </form>
                </div>
                <div className="p-4 w-full mb-4 ">
                  <form ref={formRef1}>
                    <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-small text-black dark:text-white"
                        htmlFor=""
                      >
                        Address
                      </label>
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bio"
                        id="bio"
                        rows={2}
                        placeholder=""
                        defaultValue={value?.address}
                        onChange={(e) => setAddress(e.target.value.trim())}
                      ></textarea>
                    </div>
                    <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-small text-black dark:text-white"
                        htmlFor=""
                      >
                        Notes
                      </label>
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name=""
                        id=""
                        rows={2}
                        placeholder=""
                        defaultValue={value?.info}
                        onChange={(e) => setInfo(e.target.value.trim())}
                      ></textarea>
                    </div>

                    <div className="pb-10 mt-3">
                      <div className="flex my-5 justify-between align-middle">
                        <label className=" block text-sm align-middle font-medium text-black dark:text-white">
                          User Roles
                        </label>
                      </div>

                      <div className="mb-2 flex gap-20 sm:flex-row">
                        <div className=" flex w-2/4 ">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="checkboxLabelOne"
                          >
                            - {'Student Management'}
                          </label>
                        </div>

                        <div className="flex">
                          <label
                            htmlFor={'nameg'}
                            className="flex cursor-pointer select-none "
                          >
                            <div className="relative ">
                              <input
                                title={'nameg'}
                                type="checkbox"
                                id={'nameg'}
                                className="sr-only"
                                onChange={() => {
                                  setstudent(!student);
                                }}
                              />
                              <div
                                className={` flex h-5 w-5 items-center justify-center rounded border ${
                                  student &&
                                  'border-primary bg-gray dark:bg-transparent'
                                }`}
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-sm ${student && 'bg-primary'}`}
                                ></span>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="mb-2 flex gap-20 sm:flex-row">
                        <div className=" flex w-2/4 ">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="checkboxLabelOne"
                          >
                            - {'Academics'}
                          </label>
                        </div>

                        <div className="flex">
                          <label
                            htmlFor={'academics'}
                            className="flex cursor-pointer select-none "
                          >
                            <div className="relative ">
                              <input
                                title={'academics'}
                                type="checkbox"
                                id={'academics'}
                                className="sr-only"
                                onChange={() => {
                                  setAcademics(!Academics);
                                }}
                              />
                              <div
                                className={` flex h-5 w-5 items-center justify-center rounded border ${
                                  Academics &&
                                  'border-primary bg-gray dark:bg-transparent'
                                }`}
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-sm ${Academics && 'bg-primary'}`}
                                ></span>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="mb-2 flex gap-20 sm:flex-row">
                        <div className=" flex w-2/4 ">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="checkboxLabelOne"
                          >
                            - {'Inventory'}
                          </label>
                        </div>

                        <div className="flex">
                          <label
                            htmlFor={'name'}
                            className="flex cursor-pointer select-none "
                          >
                            <div className="relative ">
                              <input
                                title={'name'}
                                type="checkbox"
                                id={'name'}
                                className="sr-only"
                                onChange={() => {
                                  setInventory(!inventory);
                                }}
                              />
                              <div
                                className={` flex h-5 w-5 items-center justify-center rounded border ${
                                  inventory &&
                                  'border-primary bg-gray dark:bg-transparent'
                                }`}
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-sm ${inventory && 'bg-primary'}`}
                                ></span>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="mb-2 flex gap-20 sm:flex-row">
                        <div className=" flex w-2/4 ">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="checkboxLabelOne"
                          >
                            - {'Expenses'}
                          </label>
                        </div>

                        <div className="flex">
                          <label
                            htmlFor={'b'}
                            className="flex cursor-pointer select-none "
                          >
                            <div className="relative ">
                              <input
                                title={'b'}
                                type="checkbox"
                                id={'b'}
                                className="sr-only"
                                onChange={() => {
                                  setExpenses(!expenses);
                                }}
                              />
                              <div
                                className={` flex h-5 w-5 items-center justify-center rounded border ${
                                  expenses &&
                                  'border-primary bg-gray dark:bg-transparent'
                                }`}
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-sm ${expenses && 'bg-primary'}`}
                                ></span>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="mb-2 flex gap-20 sm:flex-row">
                        <div className=" flex w-2/4 ">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="checkboxLabelOne"
                          >
                            - {'Fees'}
                          </label>
                        </div>

                        <div className="flex">
                          <label
                            htmlFor={'f'}
                            className="flex cursor-pointer select-none "
                          >
                            <div className="relative ">
                              <input
                                title={'f'}
                                type="checkbox"
                                id={'f'}
                                className="sr-only"
                                onChange={() => {
                                  setFees(!fees);
                                }}
                              />
                              <div
                                className={` flex h-5 w-5 items-center justify-center rounded border ${
                                  fees &&
                                  'border-primary bg-gray dark:bg-transparent'
                                }`}
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-sm ${fees && 'bg-primary'}`}
                                ></span>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="mb-2 flex gap-20 sm:flex-row">
                        <div className=" flex w-2/4 ">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="checkboxLabelOne"
                          >
                            - {'Settings'}
                          </label>
                        </div>

                        <div className="flex">
                          <label
                            htmlFor={'named'}
                            className="flex cursor-pointer select-none "
                          >
                            <div className="relative ">
                              <input
                                title={'named'}
                                type="checkbox"
                                id={'named'}
                                className="sr-only"
                                onChange={() => {
                                  setsettings(!settings);
                                }}
                              />
                              <div
                                className={` flex h-5 w-5 items-center justify-center rounded border ${
                                  settings &&
                                  'border-primary bg-gray dark:bg-transparent'
                                }`}
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-sm ${settings && 'bg-primary'}`}
                                ></span>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </DefaultLayout>
  );
};

export default StaffEdit;
