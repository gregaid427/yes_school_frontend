import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CheckboxOne from '../components/Checkboxes/CheckboxOne';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import userThree from '../images/user/user-03.png';
import DefaultLayout from '../layout/DefaultLayout';

const GeneralSettings = () => {
  const [age, setAge] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  General Setting
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 ">
                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        School Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>

                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        School Code{' '}
                        <span className="small-font">(optional)</span>
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 ">
                    <div className="w-full sm:w-4/4">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Email
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                    {/* <div className="w-full sm:w-2/4 flex gap-5">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Sex
                      </label>

                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <SelectGroupTwo
                          values={['Male', 'Female']}
                          setSelectedOption={setAge}
                          selectedOption={age}

                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Religion{' '}
                      </label>
                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <SelectGroupTwo
                          values={['Christian', 'Muslim']}
                          setSelectedOption={setAge}
                          selectedOption={age}

                        />
                      </div>
                    </div>
                  </div> */}
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 ">
                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Contact 1
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>

                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Contact 2
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      School Address
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-2  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bio"
                        id="bio"
                        rows={2}
                        placeholder=""
                        defaultValue=""
                      ></textarea>
                    </div>
                  </div>
                  <div className="border-b border-stroke py-4  dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Current School Session
                    </h3>
                  </div>
                  <div className="mb-5.5 flex gap-2 " >
                  <div className="w-full mb-10 sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Session
                      </label>

                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <SelectGroupTwo
                          values={['1st Term 2024', '2nd Term 2024']}
                          setSelectedOption={setAge}
                          selectedOption={age}

                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Session Start Month
                      </label>

                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <SelectGroupTwo
                          values={['January', 'February']}
                          setSelectedOption={setAge}
                          selectedOption={age}

                        />
                      </div>
                    </div>
                  </div>
                
             

                  <div className="flex  justify-end gap-4.5">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default GeneralSettings;
