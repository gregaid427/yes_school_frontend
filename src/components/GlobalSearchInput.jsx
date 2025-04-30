import React, { useEffect, useState } from 'react';
import { GlobalSearchAction1, resetGlobalSearch, resetGlobalSearch1 } from '../redux/slices/studentSlice';
import { useDispatch, useSelector } from 'react-redux';
import ArrowIcon from './Svgs/arrowicon';


const GlobalSearchInput = (props) => {
  const [globalsearch, setGlobalSearch] = useState(null);
  const student = useSelector((state) => state?.student);
  const dispatch = useDispatch();

  const {
    GlobalSearch1
  } = student;
  useEffect(() => {
    if (GlobalSearch1?.success == 1 && GlobalSearch1?.data.length != 0) {
     props.globalResult(GlobalSearch1?.data)
     dispatch(resetGlobalSearch1())
    }
    if (GlobalSearch1?.success == 1 && GlobalSearch1?.data.length == 0) {
      props.globalResult([])
      dispatch(resetGlobalSearch())

     }
  }, [GlobalSearch1]);
  function handleGlobalSearch(val){
    dispatch(GlobalSearchAction1({id:val}))

  }
  return (
    <>
       <div className="  flex row ">
          <input
            className="w-full rounded-full required  border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name=""
            id=""
            placeholder="Search Student"
            defaultValue=""
              onChange={(e) => setGlobalSearch(e.target.value)}
          />
          <button
                    className="flex w-3/12 justify-center bg-primary h-auto text-center py-2 align-middle rounded-full ml-1 font-large text-gray hover:bg-opacity-90"
                    type=""
                   onClick={(e) => handleGlobalSearch(globalsearch)}
                  >
                   <ArrowIcon />
                  </button>
        </div>
    </>
  );
};

export default GlobalSearchInput;
