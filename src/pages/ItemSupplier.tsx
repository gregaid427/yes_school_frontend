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
  { id: 1, item: 'PE Kit', cartegory: 'Outfit', unit: '40', quantity:'30' },
  { id: 1, item: 'PE Kit', cartegory: 'Outfit', unit: '40', quantity:'30' },
  { id: 1, item: 'PE Kit', cartegory: 'Outfit', unit: '40', quantity:'30' },
];
const columns = [
  { columnTitle: 'id' },
  { columnTitle: 'item' },
  { columnTitle: 'cartegory' },
  { columnTitle: 'unit' },
  { columnTitle: 'quantity' },

  {
    columnTitle: 'actions',
    format: (value) => (
      <>
       
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

const AddInventory = () => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const [age, setAge] = useState<string>('');

  return (
    <DefaultLayout>
      <div className="flex gap-3 w-full">
        <Table
          rows={rows}
          columns={columns}
          rowsPerPage={10}
          hideSearchInput={true}
          searchColumnName={'name'}
          tableWidth={'w-8/12'}
          sideComponent={''}
        />
        <div className="w-4/12 mr-5">
          <div className="grid  gap-8">
            <div className="col-span-12">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Add Item Supplier
                  </h3>
                </div>
                <div className="p-7">
                  <form action="#">
                    <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Item 
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

                    <div className="w-full mb-3 sm:w-2/2">
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Item Cartegory{' '}
                        <span className="small-font">(optional)</span>
                      </label>
                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <SelectGroupTwo
                          values={['OutFit', 'Stationery']}
                          setSelectedOption={setAge}
                          selectedOption={age}
                        />
                      </div>
                    </div>
                    <div className="w-full mb-3 sm:w-2/2">
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Unit{' '}
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
                    <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Description/Notes
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bio"
                        id="bio"
                        rows={2}
                        placeholder=""
                        defaultValue=""
                      ></textarea>
                    </div>
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

export default AddInventory;
