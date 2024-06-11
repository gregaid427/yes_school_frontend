import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import userThree from '../images/user/user-03.png';
import DefaultLayout from '../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import { Table } from './mytable/Table';
import GradesSideElement from './GradesSideElement';
import ExpenseSideElement from './ExpenseSideElement';
import ViewSVG from '../components/Svgs/View';
import DeleteSVG from '../components/Svgs/delete';
import EditSVG from '../components/Svgs/edit';
import CheckboxOne from '../components/Checkboxes/CheckboxOne';

const packageData = [
  {
    amount: '100.00',

    name: '1',
    price: '01/01/2024',
    invoiceDate: `Notebooks For Staff`,
    status: 'Miscellenous',
  },
  {
    amount: '100.00',

    name: '1',
    price: '01/01/2024',
    invoiceDate: `Notebooks For Staff`,
    status: 'Miscellenous',
  },
  {
    amount: '100.00',

    name: '1',
    price: '01/01/2024',
    invoiceDate: `Notebooks For Staff`,
    status: 'Miscellenous',
  },
  {
    amount: '100.00',

    name: '1',
    price: '01/01/2024',
    invoiceDate: `Notebooks For Staff`,
    status: 'Miscellenous',
  },
];

const rows = [
  { id: 1, subject: 'English', code: '00111', type: 'Theory' },
  { id: 2, subject: 'English', code: '00111', type: 'Theory' },

  { id: 3, subject: 'English', code: '00111', type: 'Theory' },

  { id: 4, subject: 'English', code: '00111', type: 'Theory' },

  { id: 5, subject: 'English', code: '00111', type: 'Theory' },



];
const columns = [
  { columnTitle: 'id' },
  { columnTitle: 'subject' },
  { columnTitle: 'code' },
  { columnTitle: 'type' },
  {
    columnTitle: 'actions',
    format: (value) => (
      <>
        <button
          onMouseDown={() => {
            console.log(value);
          }}
        >
          <ViewSVG />
        </button>{' '}
        <EditSVG />
        <button
          onMouseDown={() => {
            console.log('click');
          }}
        >
          <DeleteSVG />
        </button>
      </>
    ),
  },
];

const Subject = () => {
  
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const [age, setAge] = useState<string>('');


  return (
    <DefaultLayout>
      <div className='flex gap-3 w-full' >
      <Table
        rows={rows}
        columns={columns}
        rowsPerPage={10}
        hideSearchInput={true}
        searchColumnName={'name'}
        tableWidth={"w-8/12"}
        sideComponent={''}
      />
      <div className="w-4/12 mr-5">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add Subject
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
               

                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Subject Name
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

                  <div className="w-full sm:w-2/2 mb-6">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Subject Code
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
                    
                  
            

                  <div className="pb-10">
                    <CheckboxOne
                      title="Theory"
                      isChecked={isChecked1}
                      toggle={setIsChecked1}
                      id="checkboxLabelOne"
                    />
                    <CheckboxOne
                      title="Practicals"
                      isChecked={isChecked2}
                      toggle={setIsChecked2}
                      id="checkboxLabelOne1"
                    />
            
                  </div>

                  <div className="flex justify-end gap-4.5">
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
      </div>
    </DefaultLayout>
  );
};

export default Subject;
