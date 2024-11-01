import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';

import useAuth from './useAuth';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Unauthorized from './pages/Authentication/Unauthorized';
import Cookies from 'js-cookie';

const RequireAuth = ({ allowedRoles }) => {
 
  const user = useSelector((state) => state?.user);
  const { userMail, roleCode } = user;

  const navigate = useNavigate();
  function goBack() {
    toast.error('Unauthorised Page');
  }
 
  let myArray = Cookies.get('VyQHVzZXIuY29tIiwia');
  if (myArray == undefined) return [];
  function getCookie(myArray) {
    let bb = myArray.slice(-7);
    return bb.split('');
  }

  let kk = getCookie(myArray);



  return allowedRoles.some((element) => kk.includes(element)) ? (
    // return true

    <Outlet />
  ) : myArray ? (
    <div>
      <Unauthorized />
    </div>
  ) : (
    // <Navigate to="/unauthorized" state={{ from: location }} replace />
    <Navigate to="/auth/signin" state={{ from: location }}  />
  );
};

export default RequireAuth;
