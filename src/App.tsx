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
import Students from './pages/students';
import Staff from './pages/Staff';
import Teachers from './pages/teachers';
import Examination from './pages/Examination';
import NewStaff from './pages/Newstaff';
import NewStudents from './pages/Newstudent';


function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
      <Route
          index
          element={
            <>
              <PageTitle title="Dashboard Dashboard | " />
              <Dashboard />
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
          path="/class"
          element={
            <>
              <PageTitle title="Calendar | " />
              <Class />
            </>
          }
        />
                <Route
          path="/fees"
          element={
            <>
              <PageTitle title="Calendar | " />
              <Fees />
            </>
          }
        />        <Route
        path="/expense"
        element={
          <>
            <PageTitle title="Calendar | " />
            <Expense />
          </>
        }
      />        <Route
      path="/examination"
      element={
        <>
          <PageTitle title="Calendar | " />
          <Examination />
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
          path="/students"
          element={
            <>
              <PageTitle title="Students | " />
              <Students />
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
          path="/users"
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
      </Routes>
    </>
  );
}

export default App;
