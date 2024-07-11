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


const SingleClassEdit = () => {
  const [PageAction, setPageAction] = useState();

  const location = useLocation();
  const { action, value } = location?.state;

  const dispatch = useDispatch();

  const clad = useSelector((state) => state?.classes);

  const {
    singleclass,
    deletesectionbyclass,
    sectionbyclass,
    updatesingleclass
  } = clad;

  const [data, setData] = useState();
  const [paramaction, setParamaction] = useState(1);
  const [instructor, setinstructorName] = useState('');
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [classtitle, setclasstitle] = useState('');
  const [sectiondata, setSectionData] = useState([]);
  const [classIdd, setclassid] = useState(value.classId);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    console.log(paramaction);
    if (singleclass == undefined) {
      toast.error('Error To load Class Data');
      navigate('/academics/class');
    }
    //   // setTimeout(() => toast.success('New Student Added Successfully'), 900);
    //  if(singleStudent?.data == undefined )
    //  navigate("/student/info")
  }, []);

  useEffect(() => {
    if (sectionbyclass?.success == 1) {
      setSectionData(sectionbyclass?.data);
      dispatch(resetUdateClass());
    }

    //  navigate("/student/info")
  }, [sectionbyclass]);

 
  useEffect(() => {
    if (deletesectionbyclass?.success == 1) {
      toast.success('Section Deleted Successfully');
      dispatch(fetchSectionbyclassAction({ classId: classIdd }));
      dispatch(resetdeleteclass());
    }
    if (deletesectionbyclass?.success == 0) {
      toast.error('Error Deleting Section');
      dispatch(resetdeleteclass());

    }
    //  navigate("/student/info")
  }, [deletesectionbyclass]);
 
  useEffect(() => {
    if (updatesingleclass?.success == 1) {
      toast.success('Class Data Updated Successfully');
      dispatch(fetchAllClassAction());

      dispatch(resetUdateClass());
      navigate(-1)

      
    }
    if (updatesingleclass?.success == 0) {
      toast.error('Error Updating Class Data');
      dispatch(resetUdateClass());

    }
  }, [updatesingleclass]);
 
  useEffect(() => {
    if (singleclass?.success == 1) {
      setData(singleclass);
      setSectionData(singleclass?.data);
      setclasstitle(singleclass?.data[0].title)
      setinstructorName(singleclass?.data[0].instructor)
      dispatch(resetUdateClass());
    }
    if (singleclass?.success == 0) {
      toast.error('Error Loadng Data');
      dispatch(resetUdateClass());

    }
    //  navigate("/student/info")
  }, [singleclass]);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (classtitle == '') return toast.error('Please Fill Out Required Fields');

    const data = {
      classId: classIdd,
      title: classtitle,
      instructor: instructor,
      updatedBy: 'Asante',

    };
console.log(data)
    dispatch(updateClassAction(data));
  };

  
  const handlesectionDelete = (position, value) => {
    dispatch(deleteSectionByClass(value));
  };



  function handleBackButton() {
    navigate('/academics/class');
  }

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div className="mx-auto w-full">
        <div className="flex flex-row w-full  gap-0" style={{}}>
          <div className="w-4/6  ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Class Information
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
                        Class Name
                      </label>
                      <input
                        className="w-full readOnly required rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={data.data[0]?.title}
                        onChange={(e) => setclasstitle(e.target.value)}
                      />
                    </div>
                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Assigned Instructor
                      </label>
                      <input
                        className="w-full  required rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={data.data[0]?.instructor}
                        onChange={(e) => setinstructorName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Total Number of Students : {data.nos[0]?.number}
                      </label>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      ></label>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full gap-5.5 sm:w-2/2">
                      <div className="flex gap-5.5 ">
                        <label
                          className="mb-3 block sm:w-1/2 text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Sections <span className='muted font-thin'>( Not Editable )</span>
                        </label>
                        <label
                          className="mb-3 block text-sm sm:w-1/2 font-medium text-black dark:text-white"
                          htmlFor=""
                        ></label>
                      </div>
                      <div className="flex  flex-col">
                        {sectiondata.map((item) => (
                          <div className="flex gap-5.5 mb-1  ">
                            <input
                              className="w-full readOnly sm:w-1/2 required rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name=""
                              id=""
                              placeholder=""
                              defaultValue={item.sectionName}
                            />
                            <button
                              className="flex sm:w-1/4 justify-center rounded bg-black py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                              type=""
                              onClick={(e) => {
                                e.preventDefault();
                                // console.log(sectiondata.indexOf(item))
                                handlesectionDelete(item, {
                                  section: item.sectionName,
                                  class: item.classId,
                                });
                              }}
                            >
                              Delete{' '}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                <div className={action == 1 ? 'hidden' : 'block'} >  
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

export default SingleClassEdit;
