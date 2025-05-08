import React, { useEffect, useRef, useState } from 'react';
import { createsessionAction, resetcreatesession, resetUpdatesession } from '../redux/slices/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { AddClassSection, CreatesClassAction, createSectionAction, resetcreateClass, resetcreatesection } from '../redux/slices/classSlice';
import ClassCheckbox from './ClassCheckbox';


const SectionClassModal = (props) => {
console.log(props)

  const dispatch = useDispatch();

  const clad = useSelector((state) => state?.classes);

  const {createClassSection,fetchSection,ClassWithSection,CreateClasses} =
    clad;


    useEffect(() => {
      props.sett(null)

    }, []);
     useEffect(() => {
    
        if ((CreateClasses?.success == 1)) {
          dispatch(resetcreateClass())
          props.close(false)

        }
     
      }, [CreateClasses]);

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


  
  
  
  
    const [del, setDel] = useState();
    const handledeletbtn = () => {
      dispatch(deleteSingleClassAction(del));
      // dispatch(fetchAllClassAction());
    };
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [position, setPosition] = useState('center');
    const show = (position) => {
      setPosition(position);
      setVisible(true);
    };
    const [selectedsection, setselectedsection] = useState([]);
    const [selectedsection1, setselectedsection1] = useState([]);
  
  

  
    const classdata = {
      title: props.data?.title,
      createdBy: username?.payload,
      instructor: props.data?.instructor,
      sections: selectedsection,
      oldsection : props?.old,
      classId: props.data?.classId,
      id: props.data?.id
    };

  const handlecreateClass = () => {
    if (props.data?.title == '') {
      toast.error('Error - Class Name Cannot Be Empty');
    } else {
      console.log(classdata)

      dispatch(AddClassSection(classdata));
    }
  };
 
  function updatesection(val) {
    if (selectedsection1.includes(val)) {
      setselectedsection1(selectedsection1.filter((element) => element.sectionName !== val.sectionName));
      setselectedsection(selectedsection.filter((element) => element.sectionName !== val.sectionName));
    } else {
      setselectedsection1([val, ...selectedsection1]);
      setselectedsection([val, ...selectedsection]);

    }
  }
  return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                 <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                   <h3 className="font-medium text-black dark:text-white">
                     Add New Section To Class
                   </h3>
                 </div>
                 <div className="py-3 px-7">
                   <form action="#">
                    
                   <div className="w-full mb-2 sm:w-2/2">
                  <label
                    className="mb-1 block text-sm font-small text-black dark:text-white"
                    htmlFor=""
                  >
                    Class Name
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name=""
                    id=""
                    disabled
                    placeholder=""
                    defaultValue={props?.data?.title}
                    //onChange={(e) => setClassTitle(e.target.value.trim())}
                  />
                </div>
                   
   
                     <div className="pb-5 ">
                       <div className="flex my-2 justify-between align-middle">
                         <label className=" block text-sm py-1 align-middle font-medium text-black dark:text-white">
                           Class Sections
                         </label>
                       
                       </div>
                       {fetchSection?.data?.map((item) => (
                         <div key={item.id} className="mb- flex gap-2   sm:flex-row">
                            <ClassCheckbox
                             updatesection={() => updatesection(item)}
                             item={item}
                           />
                           <div className=" flex  sm:w-full">
                             <label
                               className="mb-1 block text-sm font-medium text-black dark:text-white"
                               htmlFor="checkboxLabelOne"
                             >
                               {item.sectionName}{' '}
                             </label>
                           </div>
   
                          
                         </div>
                       ))}
                     </div>
   
                     <div className="flex justify-end mt-53gap-4.5">
                       <button
                         className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                         type=""
                         onClick={(e) => {
                           e.preventDefault();
                           handlecreateClass();
                         }}
                       >
                         Save
                       </button>
                       <button
                         className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                         type="reset"
                         onClick={()=>props.close(false)}
                       >
                         Close
                       </button>
                     </div>
                   </form>
                 </div>
               </div>
       
  );
};

export default SectionClassModal;
