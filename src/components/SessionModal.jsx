import React, { useEffect, useRef, useState } from 'react';
import { createsessionAction, fetchActivesessionAction, resetcreatesession, resetUpdatesession } from '../redux/slices/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createSectionAction, resetcreatesection } from '../redux/slices/classSlice';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';


const SessionModal = (props) => {
  const [startmonth, setStartMonth] = useState('January');

  const [isChecked, setIsChecked] = useState(false);
  const [sectionTitle, setsectionTitle] = useState('');
  const [activesession, setactivesession] = useState('');

  
  const dispatch = useDispatch();

  const clad = useSelector((state) => state?.classes);

  const {createClassSection} =
    clad;

  useEffect(() => {
    if (createClassSection?.success == 0) {
      toast.error("Error - Section Name Already Exists");
       dispatch(resetcreatesection())
      // dispatch(fetchAllClassAction())


      }
    if (createClassSection?.success == 1) {
      toast.success('New Section Added Successfully');
       dispatch(resetcreatesection())
    //   dispatch(fetchAllSectionAction())
    props.close(false)



      }
    
    // if (fetchAllClass?.success == 1) {
    //   let i = 0;
    //   let arr = [];
    //   while (i < clad?.fetchAllClass?.data.length) {
    //     arr.push(clad?.fetchAllClass?.data[i].title);
    //     i++;
    //   }

    //   setClasss(arr);
    // }
  }, [createClassSection]);

  
  useEffect(() => {
    dispatch(fetchActivesessionAction());

  }, []);

 

  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;
  const session = useSelector((state) => state?.session);

  const { fetchsession, createsession,updatesession,fetchsessionactive } = session;
  useEffect(() => {
    if (fetchsessionactive?.success == 1) {
   setactivesession(fetchsessionactive?.data[0].sessionname)
    }
  }, [fetchsessionactive]);
  useEffect(() => {
    if (createsession?.success == 0) {
      toast.error('Error - Section Name Already Exists');
      dispatch(resetcreatesession());
      // dispatch(fetchAllClassAction())
    }
    if (createsession?.success == 1) {
      toast.success('Session Created Successfully');
      dispatch(resetcreatesession());
      dispatch(fetchActivesessionAction());
      props.close(false)
     
      //   dispatch(fetchAllSectionAction())
    }
    
    if (updatesession?.success == 1) {
     // toast.success('New Section Added Successfully');
     dispatch(resetUpdatesession());
     dispatch(fetchActivesessionAction());
      //   dispatch(fetchAllSectionAction())
    }

    // if (fetchAllClass?.success == 1) {
    //   let i = 0;
    //   let arr = [];
    //   while (i < clad?.fetchAllClass?.data.length) {
    //     arr.push(clad?.fetchAllClass?.data[i].title);
    //     i++;
    //   }

    //   setClasss(arr);
    // }
  }, [updatesession,createsession]);


  const classdata = {
    sessionname: sectionTitle.toUpperCase(),
    createdby: username?.payload,
    active: isChecked,
    startmonth: startmonth.toUpperCase(),
    currentsession: activesession == undefined ? ectionTitle.toUpperCase() : activesession
  };

  const handlecreateSection = (e) => {
    if (sectionTitle == '') {
      toast.error('Error - Section Name Cannot Be Empty');
    } else {
      dispatch(createsessionAction(classdata));
    }
  };
 


  return (
    <div className="w-full">
      <div className="grid mb-2 gap-8">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add New Academic Session
                </h3>
              </div>
              <div className="p-7">
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
                      placeholder=""
                      defaultValue=""
                      onChange={(e) => {
                        e.preventDefault();
                        setsectionTitle(e.target.value.trim());
                      }}
                    />
                    <div>
                      <div className="mt-4 flex gap-3 flex-row">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="checkboxLabelOne"
                        >
                          {'Current Session'}
                        </label>
{/* 
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
                        </div> */}
                      </div>
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
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        handlecreateSection();
                        e.preventDefault();
               
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
                      onClick={(e) => {
                        props.openModal(false)

               
                      }}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
       
  );
};

export default SessionModal;