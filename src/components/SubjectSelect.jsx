import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SubjectSelect = (props) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="w-full">
      <div className=" flex mt-2  mb-2 ">
        <div className="flex justify-start mr-2 ">
          <label
            htmlFor={props.index}
            className="flex cursor-pointer select-none "
          >
            <div className="relative ">
              <input
                title={props.index}
                type="checkbox"
                id={props.index}
                className="sr-only"
                onChange={() => {
                  if (props.selectedarr.includes(props.info?.subjectname)) {
                    props.selected(
                      props.selectedarr.filter(
                        (element) => element !== props.info?.subjectname,
                      ),
                    );
                    setIsChecked(!isChecked);
                    console.log(props.selectedarr);
                  } else {
                    setIsChecked(!isChecked);
                    props.selected([
                      ...props.selectedarr,
                      props.info?.subjectname,
                    ]);
                  }
                  console.log(props.selectedarr);
                }}
              />
              <div
                className={` flex h-5 w-5 items-center justify-center rounded border ${
                  isChecked && 'border-primary bg-gray dark:bg-transparent'
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'}`}
                ></span>
              </div>
            </div>
          </label>
        </div>
        <div className=" flex  sm:w-full">
          <label
            className="mb- block text-sm font-medium text-black dark:text-white"
            htmlFor="checkboxLabelOne"
          >
            {props.info?.subjectname}
          </label>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelect;
