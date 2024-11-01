import { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Cookies from 'js-cookie';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import ForgotPassword from './pages/Authentication/ForgotPassword';

import Dashboard from './pages/Dashboard/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';

import Class from './pages/Class';
import Fees from './pages/Fees/Fees';
import Users from './pages/Users';

import Teachers from './pages/teachers';
import NewStaff from './pages/Newstaff';
import NewStudents from './pages/Admission';

import Grades from './pages/Grades';
import Marks from './pages/Marks';
import Promotion from './pages/Promotion';
// import AddExpense from './pages/AddExpense';
// import ManageExpense from './pages/ManageExpense';
import Section from './pages/section';
import Subject from './pages/Subject';
import GeneralSettings from './pages/GeneralSettings';
import Session from './pages/session';
import StudentCartegory from './pages/StudentCartegory';
import AddInventory from './pages/AddInventory';
import RequireAuth from './RequireAuth';
import Layout from './pages/Layout';
import Student from './pages/Students';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllClassAction,
  fetchAllSectionAction,
} from './redux/slices/classSlice';
import StudentCredential from './pages/Studentscredential';
import { Toaster } from 'react-hot-toast';
import SingleStudent from './pages/SingleStudent';
import SingleStudentEdit from './pages/SingleStudentEdit';
import SingleClassEdit from './pages/SingleClassEdit';
import SingleSectionEdit from './pages/SingleSectionedit';
import SingleSubjectEdit from './pages/SingleSubjectEdit';
import AddInventoryStock from './pages/AddInventoryStock';
import AddInventoryCartegory from './pages/AddInventoryCartegory';
import EditInventoryitem from './pages/EditInventoryitem';
import AddExpenseHead from './pages/addExpenseHead';
import SearchExpense from './pages/SearchExpense';
import AddExpenses from './pages/AddExpense';
import AdmissionCapture from './pages/Admiissioncamera';
import EditCamera from './pages/editCamera';
import SetStudent from './pages/Setstudent';
import SetStaff from './pages/SetStaff';
import SetGuardian from './pages/SetGuardian';
import NewGuardian from './pages/NewGuardian';
import BulkAdmission from './pages/BulkAdmission';
import FeesGroup from './pages/Fees/FeesCartegory';
import CollectFees from './pages/Fees/CollectFees';
import AssignFees from './pages/Fees/AssignFees';
import Scholarship from './pages/Fees/Scholarship';
import EnrollScholarship from './pages/Fees/EnrollScholarship';
import StudentPreference from './pages/Fees/StudentPreference';
import { fetchActivesessionAction } from './redux/slices/sessionSlice';
import {
  fetchschoolinfoAction,
  fetchuserbyidAction,
  setRoleCode,
  setUser,
  setUserMail,
  setUsername,
} from './redux/slices/usersSlice';
import ManageFee from './pages/Fees/ManageFee';
import ScholarshipList from './pages/Fees/ScholarshipList';
import PreferenceList from './pages/Fees/PreferenceList';
import SearchRecords from './pages/Fees/SearchRecords';
import Finance from './pages/settings/Finance';
import ExamList from './pages/exam/ExamList';
// import ExamResult from './pages/exam/ExamResult';
import ExamGrade from './pages/exam/ExamGrade';
import ExamGroup from './pages/exam/ExamGroup';
import AddExam from './pages/exam/NewExam';
// import ViewResult from './pages/exam/AddExamResult';
// import AddResult from './pages/exam/ViewExamResult';
import ViewExamResult from './pages/exam/ViewExamResult';
import AddExamResult from './pages/exam/AddExamResult';
import AddExam1 from './pages/exam/NewExam copy';
import ExamReport from './pages/exam/ExamReport';
import ExamReportDetail from './pages/exam/ReportDetail';
import ExamReportModal from './components/SingleExamReport';
import ClassReportModal from './components/ClassReportModal';
import AddExamResultImport from './pages/exam/AddExamResultImport';
import EditExamResult from './pages/exam/EditExamResult';
import MarkAttendance from './pages/Attendance/MarkAttendance';
import SearchAttendance from './pages/Attendance/SearchAttendance';
import SearchDetail from './pages/Attendance/SearchDetail';
import UpdateDetail from './pages/Attendance/UpdateDetail';
import AttendanceList from './pages/Attendance/AttendanceList';
import AuthContext, { AuthProvider } from './AuthProvider';
import Missing from './pages/Authentication/Missing';
import Unauthorized from './pages/Authentication/Unauthorized';
import useAuth from './useAuth';
import StaffEdit from './pages/SetStaffEdit';

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState([1]);
  // const { pathname } = useLocation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  useEffect(() => {
    dispatch(fetchAllClassAction());
    dispatch(fetchAllSectionAction());
    dispatch(fetchActivesessionAction());
    dispatch(fetchschoolinfoAction());
  }, []);

  const {  auth,setAuth } = useAuth();
  // const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    //check token exist in cookies
    let myArray = Cookies.get('VyQHVzZXIuY29tIiwia');
 
    
    if (myArray != undefined) {
      let tokenArray = myArray.split('{|-');
      console.log('token exist');
      console.log(tokenArray);
      let bb = myArray.slice(-7);
      setCode([bb]);
      dispatch(fetchuserbyidAction({ id: tokenArray[1] }));
      // setTimeout(() => setLoading(false), 0);
    } else {
      setTimeout(() => setLoading(false), 0);
      console.log('no token');
      navigate('/auth/signin');
    }
  }, []);
  console.log(code);
  const location = useLocation();
  const { pathname } = location;

  const users = useSelector((state) => state?.user);
  const { fetchuserbyid, UserData } = users;
  useEffect(() => {
    if (fetchuserbyid?.success == 1) {
      let data = fetchuserbyid?.data;
      let dataArray = [
        {
          userId: data[0]?.userId,
          rolecode: data[0]?.rolecode,
          data: [
            {
              userId: data[0].userId,
              sEmail: data[0].sEmail,
              sGender: data[0].sGender,
              sLastName: data[0].sLastName,
              sFirstName: data[0].sFirstName,
              contact1: data[0].contact1,
              contact2: data[0].contact2,
              address: data[0].address,
              staffId: data[0].staffId,
              definedRole: data[0].definedRole,
              rolecode: data[0].rolecode,
              info: data[0].info,
              id: data[0].id,
              active: data[0].active,
            },
          ],
          role: data[0]?.role,
          email: data[0]?.email,
        },
      ];
      setAuth(dataArray);

      dispatch(setUser(dataArray));
      dispatch(setUsername(data[0].sFirstName + ' ' + data[0].sLastName));
      dispatch(setUserMail(data[0]?.email));
      dispatch(setRoleCode(data[0]?.rolecode));

      setTimeout(() => setLoading(false), 100);
      // if(pathname.includes('auth')) return  navigate('/dashboard');
      // if(pathname.includes('')) return  navigate('/dashboard');
    }
    if (fetchuserbyid?.success == 0) {
      setTimeout(() => setLoading(false), 0);
      navigate('/auth/signin');
    }

    //  navigate("/student/info")
  }, [fetchuserbyid]);

  console.log(auth);

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
      <AuthProvider>
        <Routes>
          <Route
            index
            element={
              <>
                <PageTitle title="Authentication | " />
                <SignIn />
              </>
            }
          />{' '}
          {/* <Route element={<RequireAuth allowedRoles={['0']}  code={code} />}> */}
          <Route
            path="/dashboard"
            element={
              <>
                <PageTitle title="Dashboard" />
                <Dashboard />
              </>
            }
          />{' '}
          {/* </Route> */}
          <Route element={<RequireAuth allowedRoles={['2']} code={'0'} />}>
            <Route
              path="/academics/class"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <Class />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['5']} code={code} />}>
            <Route
              path="/fees/collectfees"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <CollectFees />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['5']} code={code} />}>
            <Route
              path="/fees/preferencelist"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <PreferenceList />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['5']} code={code} />}>
            <Route
              path="/fees/scholarship"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <Scholarship />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['5']} code={code} />}>
            <Route
              path="/fees/scholarshipenroll"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <ScholarshipList />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['5']} code={code} />}>
            <Route
              path="/fees/manage"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <ManageFee />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['5']} code={code} />}>
            <Route
              path="/fees/enrollscholarship"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <EnrollScholarship />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['5']} code={code} />}>
            <Route
              path="/fees/studentpreference"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <StudentPreference />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['5']} code={code} />}>
            <Route
              path="/fees/addfeesgroup"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <FeesGroup />
                </>
              }
            />{' '}
          </Route>
          {/* <Route
            path="/fees/Collectfees"
            element={
                <>
                  <PageTitle title="Calendar | " />
                  <EditCamera />
                </>
              }
            /> */}
          <Route element={<RequireAuth allowedRoles={['5']} code={code} />}>
            <Route
              path="/fees/records"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <SearchRecords />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/academics/class/editclass"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <SingleClassEdit />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/academics/promotion"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <Promotion />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/academics/section"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <Section />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/academics/subject/editsubject"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <SingleSubjectEdit />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['3']} code={code} />}>
            <Route
              path="/inventory/editinventory"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <EditInventoryitem />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/academics/section/edit"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <SingleSectionEdit />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/academics/subjects"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <Subject />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['1']} code={code} />}>
            <Route
              path="/student/admission"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <NewStudents />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['1']} code={code} />}>
            <Route
              path="/student/editcapture"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <EditCamera />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['1']} code={code} />}>
            <Route
              path="/student/admissioncapture"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <AdmissionCapture />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['1']} code={code} />}>
            <Route
              path="/student/bulkAdmission"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <BulkAdmission />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['1']} code={code} />}>
            <Route
              path="/student/editinfo"
              element={
                <>
                  <PageTitle title="Student | Edit " />
                  <SingleStudentEdit />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['1']} code={code} />}>
            <Route
              path="/student/singlestudent"
              element={
                <>
                  <PageTitle title="student | " />
                  <SingleStudent />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['1']} code={code} />}>
            <Route
              path="/student/cartegory"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <StudentCartegory />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['1']} code={code} />}>
            <Route
              path="/student/details"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  {/* <Students /> */}
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['3']} code={code} />}>
            <Route
              path="/inventory/itemsupplier"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <StudentCartegory />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['3']} code={code} />}>
            <Route
              path="/inventory/additem"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <AddInventory />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['3']} code={code} />}>
            <Route
              path="/inventory/addstock"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <AddInventoryStock />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['3']} code={code} />}>
            <Route
              path="/inventory/addcartegory"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <AddInventoryCartegory />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['6']} />}>
            <Route
              path="/settings/general"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <GeneralSettings />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['6']} code={code} />}>
            <Route
              path="/settings/staff"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <SetStaff />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['6']} code={code} />}>
            <Route
              path="/settings/updatestaff"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <StaffEdit />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['6']} code={code} />}>
            <Route
              path="/settings/finance"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <Finance />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['6']} code={code} />}>
            <Route
              path="/settings/guardian"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <SetGuardian />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['6']} code={code} />}>
            <Route
              path="/settings/students"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <SetStudent />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['6']} code={code} />}>
            <Route
              path="/settings/newstaff"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <NewStaff />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['6']} code={code} />}>
            <Route
              path="/settings/newguardian"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <NewGuardian />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['7']} code={code} />}>
            <Route
              path="/settings/session"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <Session />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['4']} code={code} />}>
            <Route
              path="/fees"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <Fees />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['4']} code={code} />}>
            <Route
              path="/expense/addexpense"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <AddExpenses />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['4']} code={code} />}>
            <Route
              path="/expense/search"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <SearchExpense />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['5']} code={code} />}>
            <Route
              path="/fees/Assignfees"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <AssignFees />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/expense/addexpensehead"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <AddExpenseHead />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/examgroup"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <ExamGroup />
                </>
              }
            />{' '}
          </Route>{' '}
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/singlereport"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <ExamReportModal />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/addimportresult"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <AddExamResultImport />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/editresult"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <EditExamResult />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/classreport"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <ClassReportModal />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/viewresult"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <ViewExamResult />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/addresult"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <AddExamResult />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/newexam"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <AddExam />
                </>
              }
            />{' '}
          </Route>
         
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/examlist"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <ExamList />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/examgrading"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <ExamGrade />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/report"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <ExamReport />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/reportdetail"
              element={
                <>
                  <PageTitle title="Calendar " />
                  <ExamReportDetail />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/grades"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <Grades />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/marks"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <Marks />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['2']} code={code} />}>
            <Route
              path="/exam/promotion"
              element={
                <>
                  <PageTitle title="Calendar | " />
                  <Promotion />
                </>
              }
            />{' '}
          </Route>
        
            <Route
              path="/attendance/list"
              element={
                <>
                  <PageTitle title="Profile | " />
                  {/* <AttendanceList /> */}
                  <AttendanceList />
                </>
              }
            />{' '}
         
      
            <Route
              path="/attendance/search"
              element={
                <>
                  <PageTitle title="Profile | " />
                  {/* <SearchchAttendance /> */}
                  <SearchAttendance />
                </>
              }
            />{' '}
       

            <Route
              path="/attendance/searchdetail"
              element={
                <>
                  <PageTitle title="Profile | " />
                  {/* <SearchchAttendance /> */}
                  <SearchDetail />
                </>
              }
            />{' '}
      
       
            <Route
              path="/attendance/updatedetail"
              element={
                <>
                  <PageTitle title="Profile | " />
                  {/* <SearchchAttendance /> */}
                  <UpdateDetail />
                </>
              }
            />{' '}
        
        
            <Route
              path="/attendance/markattendance"
              element={
                <>
                  <PageTitle title="Attendance | " />
                  <MarkAttendance />
                </>
              }
            />{' '}
       
          <Route element={<RequireAuth allowedRoles={['0']} code={code} />}>
            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile | " />
                  <Profile />
                </>
              }
            />{' '}
          </Route>
       
         
        
          <Route element={<RequireAuth allowedRoles={['1']} code={code} />}>
            <Route
              path="/student/info"
              element={
                <>
                  <PageTitle title="Students | " />
                  <Student />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['1']} code={code} />}>
            <Route
              path="/student/studentcredential"
              element={
                <>
                  <PageTitle title="Students | " />
                  <StudentCredential />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['1']} code={code} />}>
            <Route
              path="/student/admission"
              element={
                <>
                  <PageTitle title="Students | " />
                  <NewStudents />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['1']} />}>
            <Route
              path="/newstudent"
              element={
                <>
                  <PageTitle title="Students | " />
                  <NewStudents />
                </>
              }
            />{' '}
          </Route>
         
          <Route element={<RequireAuth allowedRoles={['6']} />}>
            <Route
              path="/newstaff"
              element={
                <>
                  <PageTitle title="Staff | " />
                  <NewStaff />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['6']} />}>
            <Route
              path="/teachers"
              element={
                <>
                  <PageTitle title="Teachers | " />
                  <Teachers />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['6']} />}>
            <Route
              path="/settings/users"
              element={
                <>
                  <PageTitle title="Users | " />
                  <Users />
                </>
              }
            />{' '}
          </Route>
          <Route element={<RequireAuth allowedRoles={['6']} />}>
            <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Settings | " />
                  <Settings />
                </>
              }
            />{' '}
          </Route>
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | " />
                <SignIn />
              </>
            }
          />{' '}
          {/* <Route
              path="/auth/newuser"
              element={
                <>
                  <PageTitle title="Signin | " />
                  <SignIn />
                </>
              }
            />{' '} */}
          <Route
            path="/auth/forgotPassword"
            element={
              <>
                <PageTitle title="Signup | " />
                <ForgotPassword />
              </>
            }
          />{' '}
          {/*  */}
          {/* catch all */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
