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
  resetUpdateSection,
  resetdeleteclass,
  updateClassAction,
  updateSectionAction,
  fetchAllSectionAction
} from '../redux/slices/classSlice';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../common/Loader';


const SingleSectionEdit = () => {
  const [PageAction, setPageAction] = useState();

  const location = useLocation();
  const { sectionName, sectionId } = location?.state;

  const dispatch = useDispatch();

  const clad = useSelector((state) => state?.classes);

  const {
    singleclass,
    deletesectionbyclass,
    sectionbyclass,
    updatesingleclass,
    updateSection
  } = clad;

  const [data, setData] = useState();
  const [paramaction, setParamaction] = useState(1);
  const [instructor, setinstructorName] = useState('');
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [classtitle, setclasstitle] = useState(sectionName);
  const [sectiondata, setSectionData] = useState([]);
  const [classIdd, setclassid] = useState();

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    console.log(paramaction);
    if (sectionName == '') {
      toast.error('Error - Loading Section Data');
      navigate('/academics/section/edit');
    }
    //   // setTimeout(() => toast.success('New Student Added Successfully'), 900);
    //  if(singleStudent?.data == undefined )
    //  navigate("/student/info")
  }, []);


 
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
    if (updateSection?.success == 1) {
      toast.success('Section Data Updated Successfully');
      dispatch(fetchAllSectionAction());

      dispatch(resetUpdateSection());
    }
    if (updateSection?.success == 0) {
      toast.error('Error Updating Section Data');
      dispatch(fetchAllSectionAction());
      dispatch(resetUpdateSection());


    }
    //  navigate("/student/info")
  }, [updateSection]);
 
  useEffect(() => {
    if (singleclass?.success == 1) {
      setData(singleclass);
      setSectionData(singleclass?.data);
      setclassid(singleclass?.data[0].classId);
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
      id: sectionId,
      sectionName: classtitle,
    

    };
console.log(data)
    dispatch(updateSectionAction(data));
  };

  
  const handlesectionDelete = (position, value) => {
    dispatch(deleteSectionByClass(value));
  };



  function handleBackButton() {
    navigate('/academics/section');
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
                        Section Name
                      </label>
                      <input
                        className="w-full readOnly required rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={sectionName}
                        onChange={(e) => setclasstitle(e.target.value)}
                      />
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

export default SingleSectionEdit;
