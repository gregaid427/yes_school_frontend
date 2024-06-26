import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Class from './pages/Class';
import Fees from './pages/Fees';
import Expense from './pages/Expense';
import Users from './pages/Users';
import Staff from './pages/Staff';
import Teachers from './pages/teachers';
import Examination from './pages/Examination';
import NewStaff from './pages/Newstaff';
import NewStudents from './pages/Newstudent';
import UserStudents from './pages/UserStudents';
import Grades from './pages/Grades';
import Marks from './pages/Marks';
import Promotion from './pages/Promotion';
import AddExpense from './pages/AddExpense';
import ManageExpense from './pages/ManageExpense';
import Section from './pages/section';
import Subject from './pages/Subject';
import GeneralSettings from './pages/GeneralSettings';
import Session from './pages/session';
import StudentCartegory from './pages/StudentCartegory';
import AddInventory from './pages/AddInventory';
import RequireAuth from './pages/RequireAuth';
import Layout from './pages/Layout';
import Student from './pages/students';
import { useDispatch } from 'react-redux';
import { fetchAllClassAction, fetchAllSectionAction } from './redux/slices/classSlice';
import StudentCredential from './pages/Studentscredential';
import { Toaster } from 'react-hot-toast';
import SingleStudent from './pages/SingleStudent';
import SingleStudentEdit from './pages/SingleStudentEdit';
import SingleClassEdit from './pages/SingleClassEdit';
import SingleSectionEdit from './pages/SingleSectionedit';
import SingleSubjectEdit from './pages/SingleSubjectEdit';
import AddInventoryStock from './pages/AddInventoryStock';
import AddInventoryCartegory from './pages/AddInventoryCartegory';
import EditInventoryCartegory from './pages/EditInventorycartegory';

  
function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const dispatch = useDispatch();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);



  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    dispatch(fetchAllClassAction());
    dispatch(fetchAllSectionAction());


  }, []);
 

  const roles = {
    parent: '100',
    student: '200',
    teacher: '300',
    expenseManage: '400',
    examManage: '500',
    FeesManage: '600',
    admin: '700',
    superAdmin: '800',
    test: '0',

  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <PageTitle title="Authentication | " />
                <SignIn />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <PageTitle title="Dashboard Dashboard | " />
                <Dashboard />
              </>
            }
          />
            <Route
              path="/academics/class"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <Class />
                </>
              }
            />
              <Route
              path="/academics/class/editclass"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <SingleClassEdit />
                </>
              }
            />
        
          <Route
            path="/academics/promotion"
            element={
              <>
                <PageTitle title="Calendar | " />
                <Promotion />
              </>
            }
          />
          <Route
            path="/academics/section"
            element={
              <>
                <PageTitle title="Calendar | " />
                <Section />
              </>
            }
          />
          t
          <Route
            path="/academics/subject/editsubject"
            element={
              <>
                <PageTitle title="Calendar | " />
                <SingleSubjectEdit />
              </>
            }
          />
             <Route
            path="/academics/section/edit"
            element={
              <>
                <PageTitle title="Calendar | " />
                <SingleSectionEdit />
              </>
            }
          />
          <Route
            path="/academics/subjects"
            element={
              <>
                <PageTitle title="Calendar | " />
                <Subject />
              </>
            }
          />
          <Route
            path="/student/admission"
            element={
              <>
                <PageTitle title="Calendar | " />
                <NewStudents  />
              </>
            }
          />{' '}
            <Route
            path="/student/editinfo"
            element={
              <>
                <PageTitle title="Student | Edit " />
                <SingleStudentEdit  />
              </>
            }
          />{' '}
              <Route
            path="/student/singlestudent"
            element={
              <>
                <PageTitle title="student | " />
                <SingleStudent  />
              </>
            }
          />{' '}
          <Route
            path="/student/cartegory"
            element={
              <>
                <PageTitle title="Calendar | " />
                <StudentCartegory />
              </>
            }
          />{' '}
          <Route
            path="/student/details"
            element={
              <>
                <PageTitle title="Calendar | " />
                {/* <Students /> */}
              </>
            }
          />{' '}
          <Route
            path="/inventory/itemsupplier"
            element={
              <>
                <PageTitle title="Calendar | " />
                <StudentCartegory />
              </>
            }
          />
          <Route
            path="/inventory/additem"
            element={
              <>
                <PageTitle title="Calendar | " />
                <AddInventory />
              </>
            }
          />
               <Route
            path="/inventory/addstock"
            element={
              <>
                <PageTitle title="Calendar | " />
                <AddInventoryStock />
              </>
            }
          />
               <Route
            path="/inventory/addcartegory"
            element={
              <>
                <PageTitle title="Calendar | " />
                <AddInventoryCartegory/>
              </>
            }
          />
             <Route
            path="/inventory/editcartegory"
            element={
              <>
                <PageTitle title="Calendar | " />
                <EditInventoryCartegory/>
              </>
            }
          />
          <Route
            path="/settings/general"
            element={
              <>
                <PageTitle title="Calendar | " />
                <GeneralSettings />
              </>
            }
          />{' '}
          <Route
            path="/settings/session"
            element={
              <>
                <PageTitle title="Calendar | " />
                <Session />
              </>
            }
          />{' '}
          <Route
            path="/fees"
            element={
              <>
                <PageTitle title="Calendar | " />
                <Fees />
              </>
            }
          />{' '}
         
                   <Route element={<RequireAuth allowedRoles={[roles.test]} />}>

          <Route
            path="/expense/list"
            element={
              <>
                <PageTitle title="Calendar | " />
                <Expense />
              </>
            }
          />         
          </Route> 
          <Route
            path="/expense/add"
            element={
              <>
                <PageTitle title="Calendar | " />
                <AddExpense />
              </>
            }
          />
          <Route
            path="/expense/manage"
            element={
              <>
                <PageTitle title="Calendar | " />
                <ManageExpense />
              </>
            }
          />
          <Route
            path="/exam/examination"
            element={
              <>
                <PageTitle title="Calendar | " />
                <Examination />
              </>
            }
          />
          <Route
            path="/exam/grades"
            element={
              <>
                <PageTitle title="Calendar | " />
                <Grades />
              </>
            }
          />
          <Route
            path="/exam/marks"
            element={
              <>
                <PageTitle title="Calendar | " />
                <Marks />
              </>
            }
          />
          <Route
            path="/exam/promotion"
            element={
              <>
                <PageTitle title="Calendar | " />
                <Promotion />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | " />
                <Profile />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | " />
                <FormElements />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | " />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Users | " />
                <Tables />
              </>
            }
          />

          <Route
            path="/student/info"
            element={
              <>
                <PageTitle title="Students | " />
                <Student />
              </>
            }
          />
              <Route
            path="/student/studentcredential"
            element={
              <>
                <PageTitle title="Students | " />
                <StudentCredential />
              </>
            }
          />
          <Route
            path="/student/admission"
            element={
              <>
                <PageTitle title="Students | " />
                <NewStudents />
              </>
            }
          />
          <Route
            path="/newstudent"
            element={
              <>
                <PageTitle title="Students | " />
                <NewStudents />
              </>
            }
          />
          <Route
            path="/users/student"
            element={
              <>
                <PageTitle title="Students | " />
                <UserStudents />
              </>
            }
          />
          <Route
            path="/staff"
            element={
              <>
                <PageTitle title="Staff | " />
                <Staff />
              </>
            }
          />
          <Route
            path="/newstaff"
            element={
              <>
                <PageTitle title="Staff | " />
                <NewStaff />
              </>
            }
          />
          <Route
            path="/teachers"
            element={
              <>
                <PageTitle title="Teachers | " />
                <Teachers />
              </>
            }
          />
          <Route
            path="/settings/users"
            element={
              <>
                <PageTitle title="Users | " />
                <Users />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | " />
                <Settings />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | " />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | " />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | " />
                <Buttons />
              </>
            }
          />
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | " />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/newuser"
            element={
              <>
                <PageTitle title="Signin | " />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/forgotPassword"
            element={
              <>
                <PageTitle title="Signup | " />
                <ForgotPassword />
              </>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
