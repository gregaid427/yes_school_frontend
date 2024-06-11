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


const Expense = () => {

  const [age, setAge] = useState<string>('');
 

  return (
    <DefaultLayout>

    <Table rows={rows} columns={columns} rowsPerPage={10} hideSearchInput={false} searchColumnName = {'name'}  tableWidth ={"sm:w-12/12"}  sideComponent={< ExpenseSideElement/>}/>

  </DefaultLayout>
  );
};

export default Expense;
