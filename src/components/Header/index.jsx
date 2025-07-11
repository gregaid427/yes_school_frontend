import { Link, useNavigate } from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchActivesessionAction,
  fetchAllsessionAction,
} from '../../redux/slices/sessionSlice';
import { fetchschoolinfoAction } from '../../redux/slices/usersSlice';
import { GlobalSearchAction } from '../../redux/slices/studentSlice';
import ArrowIcon from '../Svgs/arrowicon';

const Header = (props) => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);
  const { GlobalSearch } = student;
  const user = useSelector((state) => state?.user);
  const { allschool } = user;
  const session = useSelector((state) => state?.session);
  const { fetchsessionactive, fetchsession } = session;
  const [sessionz, setsession] = useState(null);
  const [school, setschool] = useState([]);
  const [globalsearch, setGlobalSearch] = useState(null);
  useEffect(() => {
    if (allschool?.success == undefined) dispatch(fetchschoolinfoAction());
        if (fetchsessionactive?.success == undefined) dispatch(fetchActivesessionAction());

  }, []);
  useEffect(() => {
    if (fetchsessionactive?.success == 1) {
      let data = fetchsessionactive?.data[0];
      setsession(data);
    }
  }, [fetchsessionactive]);
  const navigate = useNavigate();

  useEffect(() => {
    if (GlobalSearch?.success == 1 && GlobalSearch?.data.length != 0) {
      navigate('/student/search', {
        state: { value: GlobalSearch },
      });
    }
  }, [GlobalSearch]);
  useEffect(() => {
    if (allschool?.success == 1) {
      let data = allschool?.data;
      setschool(data);
    }
  }, [allschool]);

  function handleGlobalSearch(val) {
    dispatch(GlobalSearchAction({ id: val }));
  }

  return (
    <header className="sticky top-0 z-999 flex w-full bg-[#f4f4fa] drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          {/* <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={LogoIcon} alt="Logo" />
          </Link> */}
        </div>
        <span className="float-start block text-sm font-medium text-black dark:text-white">
          {school[0]?.name ? school[0]?.name : ''}
        </span>
        <span className=" float-start block text-sm font-medium text-black dark:text-white">
          Session : {sessionz?.sessionname}
        </span>
        <div className="  flex row ">
          <input
            className="w-full rounded-full required  border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name=""
            id=""
            placeholder="Search Student"
            defaultValue=""
            onChange={(e) => setGlobalSearch(e.target.value.trim())}
          />
          <button
            className="flex w-3/12 justify-center bg-primary h-auto text-center py-2 align-middle rounded-full ml-1 font-large text-gray hover:bg-opacity-90"
            type=""
            onClick={(e) => handleGlobalSearch(globalsearch)}
          >
            <ArrowIcon />
          </button>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <div className="">
              <DarkModeSwitcher />
            </div>
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
