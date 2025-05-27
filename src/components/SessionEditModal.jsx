import React, { useEffect, useRef, useState } from 'react';
import { createsessionAction, fetchActivesessionAction, resetcreatesession, resetUpdatesession, updatesessionAction } from '../redux/slices/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createSectionAction, resetcreatesection } from '../redux/slices/classSlice';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';


const SessionEditModal = (props) => {
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
     if (fetchsessionactive?.success == 1 && fetchsessionactive?.data.length == 0) {
  // setactivesession(fetchsessionactive?.data[0]?.sessionname)
    }
    if (fetchsessionactive?.success == 1 && fetchsessionactive?.data.length != 0) {
   setactivesession(fetchsessionactive?.data[0]?.sessionname)
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
    session: sectionTitle.toUpperCase(),
    createdby: username?.payload,
    prevclass: props.info?.sessionname,
    id: props.info?.id
    };

  const handlecreateSection = (e) => {
    if (sectionTitle == '') {
      toast.error('Error - Section Name Cannot Be Empty');
    } else {
      dispatch(updatesessionAction(classdata));
    }
  };
 


  return (
    <div className="w-full">
      <div className="grid mb-2 gap-8">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Edit Academic Session
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
                      defaultValue={props.info?.sessionname}
                      onChange={(e) => {
                        e.preventDefault();
                        setsectionTitle(e.target.value.trim());
                      }}
                    />
              
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
                        props.close(false)

               
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

export default SessionEditModal;
