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
  { id: 1, name: 'Notebooks For Staff', cartegory: 'Miscellenous', date: '01/01/2024', amount: '300.00' },
  { id: 2, name: 'Notebooks For Staffll', cartegory: 'Miscellenous', date: '01/01/2024', amount: '300.00' },
  { id: 3, name: 'Notebooks For Staff', cartegory: 'Miscellenous', date: '01/01/2024', amount: '300.00' },
  { id: 4, name: 'Notebooks For Staff', cartegory: 'Miscellenous', date: '01/01/2024', amount: '300.00' },
  { id: 5, name: 'Notebooks For Staff', cartegory: 'Miscellenous', date: '01/01/2024', amount: '300.00' },

]
const columns = [
  { columnTitle: 'id' },
  { columnTitle: 'name'},
  { columnTitle: 'cartegory'},
  { columnTitle: 'date' },
  { columnTitle: 'amount' },
  { columnTitle: 'actions' ,format: (value) => (<><button  onMouseDown={()=>{console.log(value)}}><ViewSVG /></button> <EditSVG /><button  onMouseDown={()=>{console.log('click')}}><DeleteSVG /></button></>) },

]


const StudentSideElement = () => {

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

  );
};

export default StudentSideElement;
