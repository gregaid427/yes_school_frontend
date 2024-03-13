import CheckboxFive from './../components/Checkboxes/CheckboxFive';
import CheckboxFour from './../components/Checkboxes/CheckboxFour';
import CheckboxOne from '../components/Checkboxes/CheckboxOne';
import CheckboxThree from './../components/Checkboxes/CheckboxThree';
import CheckboxTwo from './../components/Checkboxes/CheckboxTwo';
import SwitcherFour from './../components/Switchers/SwitcherFour';
import SwitcherOne from './../components/Switchers/SwitcherOne';
import SwitcherThree from './../components/Switchers/SwitcherThree';
import SwitcherTwo from './../components/Switchers/SwitcherTwo';
import DatePickerOne from './../components/Forms/DatePicker/DatePickerOne';
import DatePickerTwo from './../components/Forms/DatePicker/DatePickerTwo';
import SelectGroupTwo from './../components/Forms/SelectGroup/SelectGroupTwo';
import MultiSelect from './../components/Forms/MultiSelect';
import DefaultLayout from '../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Table } from './mytable/Table';
import ExpenseSideElement from './ExpenseSideElement';
import StudentSideElement from './studentSideElement';
import ViewSVG from '../components/Svgs/View';
import EditSVG from '../components/Svgs/edit';
import DeleteSVG from '../components/Svgs/delete';

const packageData = [
  {
    name: 'Greg Elson',
    price: 0.0,
    invoiceDate: `1234567`,
    status: 'Paid',
  },
  {
    name: 'Greg Elson',
    price: 59.0,
    invoiceDate: `1234567`,
    status: 'Paid',
  },
  {
    name: 'Greg Elson',
    price: 99.0,
    invoiceDate: `1234567`,
    status: 'Unpaid',
  },
  {
    name: 'Greg Elson',
    price: 59.0,
    invoiceDate: `1234567`,
    status: 'Pending',
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
  { columnTitle: 'actions' ,format: (value) => (<><button  onMouseDown={()=>{console.log(value)}}><ViewSVG /></button> <EditSVG/><button  onMouseDown={()=>{console.log('click')}}><DeleteSVG /></button></>) },

]



const Students = () => {
  const [age, setAge] = useState<string>('');

  return (
    <DefaultLayout>
    
      <Table rows={rows} columns={columns} rowsPerPage={10} hideSearchInput={false} searchColumnName = {'name'}  tableWidth ={"sm:w-12/12"}  sideComponent={< StudentSideElement/>}/>

    
    </DefaultLayout>
  );
};

export default Students;
