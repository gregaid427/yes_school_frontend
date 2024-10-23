import { useEffect, useRef, useState } from 'react';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';
import ViewSVG from '../components/Svgs/View';
import DeleteSVG from '../components/Svgs/delete';
import EditSVG from '../components/Svgs/edit';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { useDispatch, useSelector } from 'react-redux';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import Loader from '../common/Loader';
import toast from 'react-hot-toast';
import {
  CreatesClassAction,
  deleteSingleClassAction,
  fetchAllClassAction,
  fetchSingleClassAction,
  resetcreateClass,
} from '../redux/slices/classSlice';
import InactiveSVG from '../components/Svgs/Inactive';
import { activeStaffAction, CreatesStaffAction, deleteStaffAction, fetchAllstaffAction, inactiveStaffAction } from '../redux/slices/usersSlice';
import ActiveSVG from '../components/Svgs/active';

const Staff = () => {
  const [pagesval, setpagesval] = useState(30);
  const [loader, setLoader] = useState(true);

  const [gender, setGender] = useState('Male');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
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


  const [isChecked, setIsChecked] = useState(true);

  const [nodes, setdata] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state?.user);
  const formRef1 = useRef();

  const { allstaff, allStaffloading,allstaff1} = users;
  function resetFormStates() {
    // formRef.current.reset();
    formRef1.current.reset();
  }
  useEffect(() => {
    dispatch(fetchAllstaffAction());
  }, []);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (allstaff?.success == 1) {
      let data = allstaff?.data;
      setdata(data);


    }
  }, [allstaff]);
  useEffect(() => {

    if (allstaff1?.success == 1) {
    
      resetFormStates()

    }
  }, [allstaff1]);

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

  function onPaginationChange(action, state) {}

  const [search, setSearch] = useState('');
console.log(data.nodes)
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
  const handleEditbtn = (value) => {
    dispatch(
      fetchSingleClassAction({
        classId: value.classId,
        classTitle: value.title,
      }),
    );
    navigate('/academics/class/editclass', {
      state: { action: 2, value: value },
    });
  };
  const handledeletbtn = (value) => {
    dispatch(deleteStaffAction(value));
    // dispatch(fetchAllClassAction());
  }
  const handleinactivebtn = (value) => {
    dispatch(inactiveStaffAction(value));
    // dispatch(fetchAllClassAction());
  }

  const handleactivebtn = (value) => {
    dispatch(activeStaffAction(value));
    // dispatch(fetchAllClassAction());
  }

  let codes = `${student? 1 : 0}${Academics? 1 : 0}${inventory? 1 : 0}${expenses? 1 : 0}${fees? 1 : 0}${settings? 1 : 0}`;

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

  };
  const handlecreateStaff = () => {
    if (fname == '') {
      toast.error('Error - Name Cannot Be Empty');
    } else {
      dispatch(CreatesStaffAction(classdata));
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
      <div className="w-4/12 ">
          <div className=" gap-8">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Add New Staff
                  </h3>
                </div>
                <div className="p-4">
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
                        defaultValue=""
                        onChange={(e) => setFname(e.target.value)}
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
                        defaultValue=""
                        onChange={(e) => setLname(e.target.value)}
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
                          defaultValue=""
                          onChange={(e) => setContact1(e.target.value)}
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
                          defaultValue=""
                          onChange={(e) => setContact2(e.target.value)}
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
                            values={['Male', 'Female']}
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
                          defaultValue=""
                          onChange={(e) => setRole(e.target.value)}
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
                        defaultValue=""
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-small text-black dark:text-white"
                        htmlFor=""
                      >
                        Password
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue=""
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

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
                          defaultValue=""
                          onChange={(e) => setAddress(e.target.value)}

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
                          defaultValue=""
                          onChange={(e) => setInfo(e.target.value)}

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

                    <div className="flex justify-end mt-5 gap-4.5">
                      <button
                        className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={(e) => {
                          e.preventDefault()
                          handlecreateStaff();
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
        <div className="w-8/12 flex-col">
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  Staff
                </h3>
              </div>
            </div>
          </div>
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between ">
                <div className=" flex w-7/12 gap-3">
                  <div className="sm:w-2/5 ">
                    <label
                      className="pt-2 block text-sm font-medium text-ash dark:text-white"
                      style={{ color: '#A9B5B3' }}
                      onClick={(e) => {
                        handleDownloadPdf();
                      }}
                    >
                      Download Page (PDF)
                    </label>
                  </div>

                  <div className="w-full sm:w-2/5">
                    <label
                      className="pt-2 block text-sm font-medium text-ash dark:text-white"
                      style={{ color: '#A9B5B3' }}
                      onClick={(e) => {
                        handleDownloadCSV();
                      }}
                    >
                      Download Page (Excel)
                    </label>
                  </div>
                </div>

                <div className={' w-5/12 flex flex-col float-right '}>
                  <div className="flex justify-between align-middle mb-2">
                    <label
                      className=" w-2/2 pt-2 block text-sm font-medium text-black dark:text-white"
                      htmlFor=" "
                    >
                      Search Staff{' '}
                    </label>
                  </div>

                  <input
                    className="w-full rounded border border-stroke bg-gray py-2 px-1.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    key={1}
                    type="search"
                    placeholder={'type here'}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  {/* <button onClick={() => toPDF()}>Download PDF</button> */}
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              'rounded-sm  w-full border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
            }
          >
            <div className="flex gap-3  flex-col">
              <div className="px-2">
                <Table
                  data={data}
                  pagination={pagination}
                  layout={{ custom: true }}
                  theme={theme}
                >
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex  ">
                          <HeaderCell>Name</HeaderCell>
                          <HeaderCell>Status</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

  
                      <Body className="dark:bg-meta-4  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList.map((item) => (
                          <Row key={item.id}
                            item={item}
                            className="dark:bg-meta-4  text-black  border-stroke bg-white dark:text-white flex "
                          
                          >
                            <Cell className="  ">
                              {item.sFirstName} {item.sOtherName}{' '}
                              {item.sLastName}
                            </Cell>
                            <Cell className="  ">
                              {item.active == "True" ? "Active":"Inactive"}
                        
                            </Cell>

                            <Cell>
                              <div className="gap-2 flex">
                                <EditSVG
                                  clickFunction={() => handleEditbtn(item)}
                                />
                              {item.active == 'True' ? <InactiveSVG
                                  clickFunction={() => handleinactivebtn(item.userId)}
                                />: <ActiveSVG
                                clickFunction={() => handleactivebtn(item.userId)}
                              />}

                                <DeleteSVG
                                  clickFunction={() =>
                                    handledeletbtn(item.userId)
                                  }
                                />
                              </div>
                            </Cell>
                          </Row>
                        ))}
                      </Body>
                    </>
                  )}
                </Table>
              </div>
              <div
                className=" align-middle"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div className="flex">
                  <span className="mt-2">
                    Total Pages: {pagination.state.getTotalPages(data.nodes)}
                  </span>
                  <div className="flex  align-middle  flex-row mr-3">
                    <span className="flex mt-2 ml-8 align-middle">
                      Records Per Page:{' '}
                    </span>
                    <div className="relative flex align-middle ml-3  z-20   bg-white dark:bg-form-input">
                      <SelectGroupTwo
                        values={[30, 50, 100, 200, 500, 'All']}
                        setSelectedOption={(val) => setpagesval(val)}
                        selectedOption={pagesval}
                      />
                    </div>
                  </div>
                </div>

                <span>
                  Page:{' '}
                  {pagination.state.getPages(data.nodes).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className="rounded"
                      style={{
                        color: pagination.state.page === index ? 'white' : '',
                        width: '20px',
                        margin: '0px 5px',
                        padding: '2px',
                        backgroundColor:
                          pagination.state.page === index ? '#3C50E0' : '',
                      }}
                      onClick={() => pagination.fns.onSetPage(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </span>
              </div>
              <div className="hidden">
                <Table
                  id="my-table"
                  data={data}
                  pagination={pagination}
                  theme={theme}
                >
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                          <HeaderCell>ID</HeaderCell>
                          <HeaderCell>Name</HeaderCell>
                          <HeaderCell>Role</HeaderCell>
                        </HeaderRow>
                      </Header>

  
                      <Body className="dark:bg-meta-4  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList.map((item) => (
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
                          >
                            <Cell className="  ">
                              <span>{item.title}</span>
                            </Cell>

                            <Cell className="  ">
                              <span>{item.instructor}</span>
                            </Cell>
                          </Row>
                        ))}
                      </Body>
                    </>
                  )}
                </Table>
              </div>
            </div>
          </div>{' '}
        </div>
      
      </div>{' '}
    </DefaultLayout>
  );
};

export default Staff;
