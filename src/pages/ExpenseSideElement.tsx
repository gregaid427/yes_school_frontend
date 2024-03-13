import React, { useState } from 'react';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import { Link } from 'react-router-dom';

const ExpenseSideElement = () => {
  const [age, setAge] = useState<string>('');

  return (
    <>
      <div className="w-full sm:w-1/3">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="fullName"
        >
          Search Expense By Cartegory
        </label>

        <div className="relative z-20 bg-white dark:bg-form-input">
          <SelectGroupTwo
            values={['Miscellanous', 'Transportation']}
            setSelectedOption={setAge}
            selectedOption={age}
          />
        </div>
      </div>

      <div className="w-full sm:w-1/3 flex flex-col justify-end ">
        <button
          className="btn sm:w-2/3    flex justify-center rounded  bg-black py-2 px-2 font-medium text-gray hover:shadow-1"
          type="submit"
        >
          Search
        </button>
      </div>

      {/* <div className="w-full sm:w-1/3 flex flex-col t  justify-end">
        <Link to={'/expense/add'}>
          <button
            className="btn sm:w-2/3  float-right  flex justify-center rounded  bg-primary py-2 px-2 font-medium text-gray hover:shadow-1"
            type="submit"
          >
            + Add Expense
          </button>
        </Link>
      </div> */}
    </>
  );
};

export default ExpenseSideElement;
