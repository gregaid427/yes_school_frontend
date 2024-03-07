import { useState } from 'react';



const CheckboxOne = (props)=> {

  return (
    <div>
      <label
        htmlFor={props.id}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={props.id}
            className="sr-only"
            onChange={() => {
              props.toggle(!props.isChecked);
            }}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              props.isChecked && 'border-primary bg-gray dark:bg-transparent'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${props.isChecked && 'bg-primary'}`}
            ></span>
          </div>
        </div>
       {props.title}
      </label>
    </div>
  );
};

export default CheckboxOne;
