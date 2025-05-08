import React, { useEffect, useRef, useState } from 'react';
import {
  createsessionAction,
  resetcreatesession,
  resetUpdatesession,
} from '../redux/slices/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  AddClassSection,
  CreatesClassAction,
  createSectionAction,
  deleteSectionByClass,
  deleteSingleClassAction,
  FetchClassWithSectionAction,
  resetcreateClass,
  resetcreatesection,
  resetdeleteclass,
} from '../redux/slices/classSlice';
import ClassCheckbox from './ClassCheckbox';
import DeleteSVG from './Svgs/delete';

const ClassListModal = (props) => {
  console.log(props);
  const [mydata, setdata] = useState([]);
  console.log(props);
  const dispatch = useDispatch();

  const clad = useSelector((state) => state?.classes);

  const {
    fetchAllClass,
    createClassSection,
    fetchSection,
    ClassWithSection,
    CreateClasses,
    deletesectionbyclass,
  } = clad;

  useEffect(() => {
    props.sett(null);
    
  }, []);
  useEffect(() => {
    if (CreateClasses?.success == 1) {
      dispatch(resetcreateClass());
      props.close(false);
    }
  }, [CreateClasses]);

  useEffect(() => {
    if (createClassSection?.success == 0) {
      toast.error('Error - Section Name Already Exists');
      dispatch(resetcreatesection());
      // dispatch(fetchAllClassAction())
    }
    if (createClassSection?.success == 1) {
      toast.success('New Section Added Successfully');
      dispatch(resetcreatesection());
      //   dispatch(fetchAllSectionAction())
      props.close(false);
      props.change(!props.changeval);
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
  const { username, userMail } = user;

  useEffect(() => {
 setdata(props.old)
  }, []);

  // useEffect(() => {
  //   //   setTimeout(() => setLoader(false), 1000);

  //   if (fetchAllClass?.success == 1) {
  //     let data = fetchAllClass?.data;
  //     setdata(data);
  //     // setVisible1(false);
  //   }
  // }, [fetchAllClass]);
  useEffect(() => {
    //   setTimeout(() => setLoader(false), 1000);

    if (deletesectionbyclass?.success == 1) {
      let data = deletesectionbyclass?.data;
      setdata(data);
      dispatch(resetdeleteclass());
    //  props.close(false);
    }
  }, [deletesectionbyclass]);


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
    oldsection: props?.old,
    classId: props.data?.classId,
    id: props.data?.id,
  };

 
  return (
    <div className="w-full  flex-col">
      <div
        className={
          'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
        }
      >
        <div className="max-w-full overflow-x-auto">
          <div className="w-full  flex justify-between  ">
            <h3 className="font-medium text-black py-3 dark:text-white">
              Delete Classes For {props.name}
            </h3>
          </div>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full gap-5.5 sm:w-2/2">
              <div className="flex gap-5.5 mb-5 justify-between">
                <label
                  className="mb-3 block  text-sm font-medium align-middle text-black dark:text-white"
                  htmlFor=""
                >
                  Sections{' '}
                  <span className="muted font-thin">
                    {/* ( Not Editable ) */}
                  </span>
                </label>
              </div>
              <div className="flex  flex-col">
                {/* <div className={sectiondata.length  2 ? '' : 'hidden'}>
                          <label
                            className="mb-3 block sm:w-1/2 text-sm font-medium text-black dark:text-white"
                            htmlFor=""
                          >
                            No Sections Created for Class{' '}
                            <span className="muted font-thin">
                            </span>
                          </label>
                        </div> */}
                {mydata?.map((item) => (
                  <div
                    key={item.section}
                   className='flex gap-2 mb-1'
                  >
                    <input
                      className=" readOnly w-full required rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={item.section == null ? 'NONE' :item.section }
                    />
                    <button
                      className="flex sm:w-1/4 justify-center rounded bg-black py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        // console.log(sectiondata.indexOf(item))
                        if( mydata.length == 1){
                          toast.error('Delete Entire Class Instead');

                        }else{
                          dispatch(
                            deleteSectionByClass({
                              id:item.id,
                              section: item.section,
                              title: item.title,
                            }),
                          );
                        }
                       
                      }}
                    >
                      Delete{' '}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex my-3 gap-2 ">
          <button
              className="flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              type=""
              onClick={(e) => {
             
                  dispatch(deleteSingleClassAction(props.del));

                e.preventDefault();
                props.close(false);
              }}
            >
              Delete Entire Class{' '}
            </button>
            <button
              className="flex w-full justify-center rounded dark:border-strokedark py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              type=""
              onClick={(e) => {
                e.preventDefault();
                props.close(false);
              }}
            >
              Close{' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassListModal;
