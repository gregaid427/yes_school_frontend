import DefaultLayout from '../layout/DefaultLayout';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
;
import { toast } from 'react-hot-toast';

import {
  deleteSectionByClass,
  fetchAllClassAction,
  fetchSectionbyclassAction,
  resetUdateClass,
  resetdeleteclass,
  updateClassAction,
} from '../redux/slices/classSlice';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../common/Loader';
import { UpdateSubjectAction,fetchSubjectAction,resetUdateSubject, } from '../redux/slices/subjectSlice';


const SingleSubjectEdit = () => {
  const [PageAction, setPageAction] = useState();

  const location = useLocation();
  const { info } = location?.state;

  const dispatch = useDispatch();

  const sub = useSelector((state) => state?.subject);

  const {
    updateSubjectError,
    updateSubject,
  
  } = sub;

  const [isChecked1, setIsChecked1] = useState('');

  const [data, setData] = useState();
  const [paramaction, setParamaction] = useState(1);
  const [instructor, setinstructorName] = useState('');
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [classtitle, setclasstitle] = useState(info.subjectname );
  const [sectiondata, setSectionData] = useState([]);
  const [classIdd, setclassid] = useState();
  useEffect(() => {
    console.log(info)
    setTimeout(() => setLoader(false), 1000);

    setIsChecked1(info.type == 'Theory' ? true : false)

    if (info == null) {
      toast.error('Error - Loading Subject Data');
      navigate('/academics/subjects');
    }
    //   // setTimeout(() => toast.success('New Student Added Successfully'), 900);
    //  if(singleStudent?.data == undefined )
    //  navigate("/student/info")
  }, []);


 

  useEffect(() => {
    if (updateSubject?.success == 1) {
      console.log(updateSubject)
      toast.success('Subject Updated Successfully');
      dispatch(fetchSubjectAction());

      dispatch(resetUdateSubject());
      navigate('/academics/subjects');

    }
    if (updateSubject?.success == 0) {
      toast.error('Error Updating Subject Data');
      dispatch(resetUdateSubject());

    }
    //  navigate("/student/info")
  }, [updateSubject]);
 

  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;
  const handleSubmit = (e) => {
    e.preventDefault()
    if (classtitle == '') return toast.error('Please Fill Out Required Fields');
    const data = {
      id: info.id,
      subjectname: classtitle.toUpperCase(),
      type: isChecked1 == true ? 'Theory' : 'Practical',
      createdby: username?.payload,
      formersubject: info.subjectname
    

    };
    dispatch(UpdateSubjectAction(data));
  };

  console.log(isChecked1)
  const handlesectionDelete = (position, value) => {
    dispatch(deleteSectionByClass(value));
  };



  function handleBackButton() {
    navigate('/academics/subjects');
  }

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div className="mx-auto w-full">
        <div className="flex flex-row w-full  gap-0" style={{}}>
          <div className="w-2/4  ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Section Information
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
                        Subject Name
                      </label>
                      <input
                        className="w-full  rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={info.subjectname}
                        onChange={(e) => setclasstitle(e.target.value.trim())}
                      />
                    </div>
                   
                  </div>
                  <div className=" mt-3">
                 <div className='flex my-5 justify-between align-middle'>
                 <label className=' block text-sm align-middle font-medium text-black dark:text-white'>Subject Type</label>
              
                  </div>  
                     <div className='flex w-full flex-col' >
                     <div className="mb-2 flex   sm:w-1/2">
                    <div className=" flex  sm:w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="checkboxLabelOne"
                      >
                        {'Theory'}
                      </label>
                    </div>

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
                              setIsChecked1(!isChecked1);
                           //   setType('Theory')
                            }}
                          />
                          <div
                            className={` flex h-5 w-5 items-center justify-center rounded border ${
                              isChecked1 &&
                              'border-primary bg-gray dark:bg-transparent'
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-sm ${isChecked1 && 'bg-primary'}`}
                            ></span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>




                  <div className="mb-2 flex   sm:w-1/2">
                    <div className=" flex  sm:w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="checkboxLabelOne"
                      >
                        {'Practical'}
                      </label>
                    </div>

                    <div className="flex justify-start sm:w-2/4">
                      <label
                        htmlFor={'type2'}
                        className="flex cursor-pointer select-none "
                      >
                        <div className="relative ">
                          <input

                            title={'type2'}
                   
                            type="checkbox"
                            id={'type2'}
                            className="sr-only"
                            onChange={() => {
                              setIsChecked1(!isChecked1);
                            //  setType('Practcal')

                            }}
                          />
                          <div
                            className={` flex h-5 w-5 items-center justify-center rounded border ${
                              !isChecked1 &&
                              'border-primary bg-gray dark:bg-transparent'
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-sm ${!isChecked1 && 'bg-primary'}`}
                            ></span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                     </div>


                  </div> 
             
                <div >  
                  <div  className="flex mt-10 justify-end gap-4.5">
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
                      onClick={(e) =>{    e.preventDefault()
                       handleSubmit(e)}}
                    >
                      Save{' '}
                    </button>
                  </div>
                  </div>
                </form>
        
              </div>
            </div>
          </div>
        </div>

        {/* Fees Management info */}
      </div>
    </DefaultLayout>
  );
};

export default SingleSubjectEdit;
