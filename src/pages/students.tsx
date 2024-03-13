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
import ViewSVG from '../components/Svgs/View';
import EditSVG from '../components/Svgs/edit';
import DeleteSVG from '../components/Svgs/delete';
import StudentSideElement from './StudentSideElement';

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
  { id: 1, name: 'Fred Thomson', Gender: 'Male', class: 'Grade 1', cartegory: 'blue' },
  { id: 1, name: 'Fred Thomson', Gender: 'Male', class: 'Grade 1', cartegory: 'blue' },
  { id: 1, name: 'Fred Thomson', Gender: 'Male', class: 'Grade 1', cartegory: 'blue' },


]
const columns = [
  { columnTitle: 'id' },
  { columnTitle: 'name'},
  { columnTitle: 'Gender'},
  { columnTitle: 'class' },
  { columnTitle: 'cartegory' },
  { columnTitle: 'actions' ,format: (value) => (<><button  onMouseDown={()=>{console.log(value)}}><ViewSVG /></button> <EditSVG/><button  onMouseDown={()=>{console.log('click')}}><DeleteSVG /></button></>) },

]



const Students = () => {
  const [age, setAge] = useState<string>('');

  return (
    <DefaultLayout>
    
      <Table rows={rows} columns={columns} rowsPerPage={10} hideSearchInput={false} searchColumnName = {'name'}  tableWidth ={"sm:w-12/12"}  sideComponent={< StudentSideElement />}/>

    
    </DefaultLayout>
  );
};

export default Students;
