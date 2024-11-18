import React, { useEffect, useRef, useState } from 'react';
import { createsessionAction, resetcreatesession, resetUpdatesession } from '../redux/slices/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createSectionAction, resetcreatesection } from '../redux/slices/classSlice';


const SectionModal = (props) => {

  const [sectionTitle, setsectionTitle] = useState("");

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
    props.change(!props.changeval)



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

  const user = useSelector((state) => state?.user);
  const { username, userMail} = user;

  const classdata = {
    sectionName: sectionTitle.toUpperCase(),
    createdBy: username?.payload,
  };
  const handlecreateSection = (e) => {
    if (sectionTitle == '') {
      toast.error('Error - Section Name Cannot Be Empty');
    } else {
      dispatch(createSectionAction(classdata));
    }
  };

 
 

  return (
    <div className="w-full">
      <div className="grid  gap-8">
        <div className="col-span-12">
         

              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Add New Section
                  </h3>
                </div>
                <div className="p-7">
                  <form action="#">
                    <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-small text-black dark:text-white"
                        htmlFor=""
                      >
                        Section Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue=""
                        onChange={(e) => setsectionTitle(e.target.value)}
                      />
                    </div>

                

                  {/* <div className="pb-10 mt-3">
                 <div className='flex my-5 justify-between align-middle'>
                 <label className=' block text-sm align-middle font-medium text-black dark:text-white'>Class Sections</label>
                 <button
                        className="flex w-7/12 justify-center rounded-full  bg-black  px-1 font-[6px] text-muted hover:bg-opacity-90"
                        type=""
                        onClick={(e) => {
                          // handlecreateSection();
                        }}
                      >
                        Create New Section
                      </button>
                  </div>  
                   { sections.map((item) => (
                     <div className="mb-2 flex   sm:flex-row">
                    <div className=" flex  sm:w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="checkboxLabelOne"
                      >
                        - {item.name}{' '}
                      </label>
                    </div>

                    <div className="flex justify-start sm:w-2/4">
                      <label
                        htmlFor={item.name}
                        className="flex cursor-pointer select-none "
                      >
                        <div className="relative ">
                          <input
                            key={item.id}

                            title={item.name}
                            isChecked={isChecked1}
                            toggle={setIsChecked1}
                            type="checkbox"
                            id={item.name}
                            className="sr-only"
                            onChange={() => {
                              setIsChecked1(!isChecked1);
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

))}

                  </div> */}

                    <div className="flex justify-end mt-5 gap-4.5">
                      <button
                        className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={(e) => {
                          e.preventDefault()
                          handlecreateSection();
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="reset"
                        onClick={()=> props.close((false))}

                      >
                        
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
       
  );
};

export default SectionModal;
