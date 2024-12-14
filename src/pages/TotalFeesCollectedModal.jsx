import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import userThree from '../images/user/user-03.png';
import DefaultLayout from '../layout/DefaultLayout';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ViewSVG from '../components/Svgs/View';
import DeleteSVG from '../components/Svgs/delete';
import EditSVG from '../components/Svgs/edit';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Dialog } from 'primereact/dialog';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSingleStudentAction,
  fetchBulkStudent,
  fetchCustomStudentsClassAction,
  fetchSingleStudent,
  fetchStudentsClassAction,
} from '../redux/slices/studentSlice';
import Loader from '../common/Loader';
import StudentModal from '../components/StudentModal';

import SectionSelect1 from '../components/SectionsSelect1';
import ClassSelect from '../components/ClassSelect';
import { fetchUserdataAction } from '../redux/slices/usersSlice';
import ExamResultModal from '../components/ExamResultModal';
import AttendanceModal from '../components/AttendanceModal';
import DeleteModal from '../components/DeleteModal';
import TableBtn from '../components/Svgs/TableBtn';
import GenerateFeeModalStudent from '../components/GenerateFeeModalStudent';
import toast from 'react-hot-toast';
import { FetchTotalFeesAction } from '../redux/slices/feeSlice';

const TotalFeesCollectedModal = (props) => {
  ///////////////////////////////////

  const [visible9, setVisible9] = useState(false);
  const [position, setPosition] = useState('top');

  //////////////////////////////////////

  const [loader, setLoader] = useState(true);

  const [searchval, setSearchval] = useState('First Name');
  const [pagesval, setpagesval] = useState(30);

  const [searcher, setSearcher] = useState('firstName');
  const [Modaldata, setModaldata] = useState(null);

  const [total, setTotal] = useState([{'total':0}]);
  const [period, setPeriod] = useState(null);

  const [nodes, setdata] = useState([]);
  const [info, setinfo] = useState('');
  const [CSVTemplate, setCSVTemplate] = useState([]);
  const [clazz, setclazz] = useState();
  const [sectionzz, setsectionzz] = useState();
  const [id, setid] = useState();
  const dispatch = useDispatch();
  const session = useSelector((state) => state?.session);
  const classes = useSelector((state) => state?.classes);
  const fees = useSelector((state) => state?.fees);


  const {
fetchsessionactive
  } = session;

  const {
    FetchTotalFee
  } = fees;

  const { fetchAllClassloading, fetchAllClass } = classes;

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (FetchTotalFee?.success == 1) {
      let data = FetchTotalFee?.data;
      setTotal(data);

   
    }

    // if (fetchAllClass?.success == 1) {
    //   let i = 0;
    //   let arr = []
    //   while (i < classes?.fetchAllClass?.data.length) {
    //     arr.push(classes?.fetchAllClass?.data[i].title);
    //     i++;
    //   }
    //   setClasss(arr);
    // //  setclazz(arr[0])
    // }
  }, [FetchTotalFee]);




  const theme = useTheme([
    {
      HeaderRow: `
  .th {
    border-bottom: 1px solid #a0a8ae;
    padding: 5px 0px;
  }
`,

      BaseCell: `
      font-size: 15px;
    

     `,

      Table: `
  --data-table-library_grid-template-columns:  17% 40% 23% 10% 10%;
`,
    },
  ]);


  function handleGetClassData() {

    let data = {
      period: period,
      session: fetchsessionactive?.data[0]
    };
    if (period == null || period == 'None' ) {
      return toast.error('Please Select Period');
    } else {
      dispatch(FetchTotalFeesAction(data));
    }
  }

  return (
    <>
      

      <div className=" flex-col rounded-sm border max-w-full shadow-default border-stroke bg-white  dark:border-strokedark dark:dark:bg-form-input pb-5 ">
        <div
          className={
            'rounded-sm border max-w-full  px-5 pt-6 shadow-default border-stroke bg-white  dark:border-strokedark dark:dark:bg-form-input pb-5 '
          }
        >
          <div className="max-w-full overflow-x-auto">
            <div className="w-full  flex justify-between ">
              <div className=" flex w-full gap-3">
                <div className="w-full">
                  <label
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Select Period
                  </label>

                  <div className="relative z-20  bg-white dark:bg-form-input">
                    <SelectGroupTwo
                      values={['None', 'Current Session', 'Today']}
                      setSelectedOption={(val) => setPeriod(val)}
                      selectedOption={period}
                    />
                  </div>
                </div>

                <div className="w-full ">
                  <label
                    className="mb-2 block text-sm font-medium  dark:text-black"
                    htmlFor=""
                  >
                    .{' '}
                  </label>
                  <button
                    onClick={() => handleGetClassData()}
                    className="btn h-10 w-full   flex justify-center rounded  bg-primary py-2 px-3 font-medium text-gray hover:shadow-1"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <label
            className="mb-2 block my-4 text-sm font-medium text-black dark:text-white"
            htmlFor="fullName"
          >
            Total Fees : {total[0].total} GHS
          </label>
        </div>
        <div
          className={
            'rounded-sm  w-full  bg-white px-2  shadow-default   dark:border-strokedark dark:dark:bg-form-input'
          }
        >
     
          <div className=" bg-white  dark:border-strokedark dark:dark:bg-form-input">
            <button
              className="flex w-6/12 mx-auto justify-center bg-primary rounded py-2 px-6 font-medium text-black  dark:text-white"
              type=""
              onClick={(e) => {
                e.preventDefault();
                props.close(false);
              }}
            >
              close
            </button>
          </div>{' '}
        </div>
      </div>
    </>

    //  </DefaultLayout>
  );
};

export default TotalFeesCollectedModal;
