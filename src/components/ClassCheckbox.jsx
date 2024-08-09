import React, { useEffect, useRef, useState } from 'react';


const ClassCheckbox = (props) => {
  const [isChecked1, setIsChecked1] = useState(false);

  return (
    <div className="flex justify-start sm:w-2/4">
      <label
        htmlFor={props.item.name}
        className="flex cursor-pointer select-none "
      >
        <div className="relative ">
          <input
            key={props.item.id}
            title={props.item.name}
          
            type="checkbox"
            id={props.item.name}
            className="sr-only"
            onChange={() => {
              setIsChecked1(!isChecked1);
              props.updatesection(props.item.name);
            }}
          />
          <div
            className={` flex h-5 w-5 props.items-center justify-center rounded border ${
              isChecked1 && 'border-primary bg-gray dark:bg-transparent'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked1 && 'bg-primary'}`}
            ></span>
          </div>
        </div>
      </label>
    </div>
  );
};

export default ClassCheckbox;
