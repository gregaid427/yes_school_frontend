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
import { fetchAllInventoryAction ,updateCartegoryAction,resetUpdateInventory} from '../redux/slices/InventorySlice';


const EditInventoryCartegory = () => {
  const [PageAction, setPageAction] = useState();

  const location = useLocation();
  const { action,info } = location?.state;

  const dispatch = useDispatch();

  const sub = useSelector((state) => state?.inventory);

  const {
    updateCartegory,
  
  } = sub;

  const [isChecked1, setIsChecked1] = useState('');

  const [data, setData] = useState();
  const [paramaction, setParamaction] = useState(1);
  const [instructor, setinstructorName] = useState('');
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [classtitle, setclasstitle] = useState(info.subjectname );
  const [notes, setNotes] = useState([]);
  const [cartegoryName, setcartegoryName] = useState();

  useEffect(() => {
    console.log(info)
    setTimeout(() => setLoader(false), 1000);


    if (info == null) {
      toast.error('Error - Loading Cartegry Data');
      navigate('/inventory/addcartegory');
    }
    //   // setTimeout(() => toast.success('New Student Added Successfully'), 900);
    //  if(singleStudent?.data == undefined )
    //  navigate("/student/info")
  }, []);


 

  useEffect(() => {
    if (updateCartegory?.success == 1) {
      toast.success('Cartegory data Updated Successfully');
      dispatch(fetchAllInventoryAction());

      dispatch(resetUpdateInventory());
      navigate('/inventory/addcartegory');

    }
    if (updateCartegory?.success == 0) {
      toast.error('Error Updating Cartegory Data');
      dispatch(resetUpdateInventory());

    }
    //  navigate("/student/info")
  }, [updateCartegory]);
 


  const handleSubmit = (e) => {
    e.preventDefault()
    if (cartegoryName == '') return toast.error('Please Fill Out Required Fields');
    const data = {
      'id': info.id,
      'cartegoryName': cartegoryName,
      'notes': notes,
    //  createdby: 'asante'

    

    };
    dispatch(updateCartegoryAction(data));
  };

  console.log(isChecked1)
  const handlesectionDelete = (position, value) => {
    dispatch(deleteSectionByClass(value));
  };



  function handleBackButton() {
    navigate('/inventory/addcartegory');
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
                  Item Cartegory Information
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
                        Cartegory Name
                      </label>
                      <input
                        className="w-full  rounded border border-stroke bg-gray py-2 px-1.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={info.cartegoryname}
                        onChange={(e) => setcartegoryName(e.target.value)}
                      />
                    </div>
                   
                  </div>
                  <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Description/Notes <span className="small-font">(optional)</span>
                 

                      </label>
                      <div className="relative">
                        <textarea
                          className="w-full rounded border border-stroke bg-gray py-3  px-1.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="bio"
                          id="bio"
                          rows={2}
                          placeholder=""
                          defaultValue={info.notes}
                          onChange={(e) => setNotes(e.target.value)}

                        ></textarea>
                      </div>
                    </div>
                  
             
                <div className={action == 1 ? 'block':'hidden' } >  
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

export default EditInventoryCartegory;
