
import React, { useState } from 'react'
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo'

const GradesSideElement = () => {
  const [age, setAge] = useState<string>('');

  return (
    <>
           <div className="w-full sm:w-1/3">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="fullName"
                >
                  Class
                </label>

                <div className="relative z-20 bg-white dark:bg-form-input">
                  <SelectGroupTwo
                    values={['Grade1', 'Grade 2']}
                    setSelectedOption={setAge}
                    selectedOption={age}
                  />
                </div>
              </div>

              <div className="w-full sm:w-1/3">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="phoneNumber"
                >
                  Section{' '}
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <SelectGroupTwo
                    values={['A', 'B']}
                    setSelectedOption={setAge}
                    selectedOption={age}
                  />
                </div>
              </div>
              <div className="w-full sm:w-1/3 flex flex-col justify-end  ">
                <button
                  className="btn sm:w-2/3     flex justify-center rounded  bg-black py-2 px-3 font-medium text-gray hover:shadow-1"
                  type="submit"
                >
                  Search
                </button>
              </div>
    </>
  )
}

export default GradesSideElement
