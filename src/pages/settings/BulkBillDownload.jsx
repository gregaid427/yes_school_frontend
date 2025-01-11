import { useEffect, useRef, useState } from 'react';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, Navigate, useNavigate } from 'react-router-dom';

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
} from '../../redux/slices/studentSlice';
import Loader from '../../common/Loader';
import StudentModal from '../../components/StudentModal';

import SectionSelect1 from '../../components/SectionsSelect1';
import ClassSelect from '../../components/ClassSelect';
import { fetchUserdataAction } from '../../redux/slices/usersSlice';
import ExamResultModal from '../../components/ExamResultModal';
import AttendanceModal from '../../components/AttendanceModal';
import DeleteModal from '../../components/DeleteModal';
import EditSVG from '../../components/Svgs/edit';
import DeleteSVG from '../../components/Svgs/delete';
import TableBtn from '../../components/Svgs/TableBtn';
import SessionSelect from '../../components/SessionSelect';
import { GetBulkBillAction, GetSingleBillAction } from '../../redux/slices/feeSlice';
import SingleBillModal from '../../components/SingleBillModal';

const BulkBillDownload = () => {
  //BulkBillDownload/////////////////////////////////

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('top');
  const [visible1, setVisible1] = useState(false);
  const [visible4, setVisible4] = useState(false);

  //////////////////////////////////////
  
  const fee = useSelector((state) => state?.fees);
  const {   
    GetSingleBill,GetBulkBill
  } = fee;
  const [loader, setLoader] = useState(true);

  const [searchval, setSearchval] = useState('First Name');
  const [pagesval, setpagesval] = useState(30);

  const [searcher, setSearcher] = useState('firstName');
  const [Modaldata, setModaldata] = useState(null);

  const [age, setAge] = useState('');
  const [info, setinfo] = useState('');

  const [nodes, setdata] = useState([]);
  const [classs, setClasss] = useState();
  const [CSVTemplate, setCSVTemplate] = useState([]);
  const [clazz, setclazz] = useState();
  const [sectionzz, setsectionzz] = useState();
  const [id, setid] = useState();
  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);
  const classes = useSelector((state) => state?.classes);

  const {
    loading,
    error,
    fetchStudent,
    fetchStudentcustom,
    fetchcustom,
    fetchStudentcustomloading,
    fetchcustomloading,
    singleStudent,
    deleteSingleStudent,
  } = student;

  const { fetchAllClassloading, fetchAllClass } = classes;

  const user = useSelector((state) => state?.user);


  const { allschool } = user;

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchcustom?.success == 1) {
      let data = fetchcustom?.data;
      setdata(data);

      let absent = [];
      for (const val of data) {
        absent.push({
          'Student ID': val?.student_id,
          'Student First Name': val?.firstName,
          'Student Other Names': val?.otherName,
          'Student Last Name': val?.lastName,
          Gender: val?.gender,
          Class: val?.class,
          Section: val?.section,
        });
        setCSVTemplate(absent);
      }
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
  }, [fetchAllClassloading, fetchcustomloading]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchStudentcustom?.success == 1) {
      let data = fetchStudentcustom?.data;
      setdata(data);
    }
  }, [fetchStudentcustom]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (deleteSingleStudent?.success == 1) {
      setVisible(false);
    }
  }, [deleteSingleStudent]);

  useEffect(() => {
    setdata([]);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchStudent?.success == 1) {
      let data = fetchStudent?.data;
      setdata(data);
    }
  }, [fetchStudent]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (GetBulkBill?.success == 1) {
     navigate('')
    }
  }, [fetchStudent]);

  useEffect(() => {
    if (GetSingleBill?.success == 1 && GetSingleBill?.data.length != 0) {
    setVisible1(true)
    }
  
  }, [GetSingleBill]);

  let data = { nodes };

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
  --data-table-library_grid-template-columns:  17% 40% 23%  20%;
`,
    },
  ]);

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: pagesval == 'All' ? 90000000000000000 : pagesval,
    },
    onChange: onPaginationChange,
  });
  const pagination1 = usePagination(data, {
    state: {
      page: 0,
      size: 90000000000000000,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  var data2;
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleviewbtn = (value) => {
    navigate('/student/editinfo', { state: { action: 1, value: value } });
    dispatch(
      fetchUserdataAction({
        role: 'student',
        id: value.student_id,
        userid: value.userId,
      }),
    );
  };
  const handleEditbtn = (value) => {
    dispatch(
      GetSingleBillAction({
        id: value.student_id,
        cart: value.cartegory,
        class: value.class,
      }),
    );
    setinfo(value)
    // navigate('/student/editinfo', { state: { action: 2, value: value } });
  };
  const handledeletbtn = () => {
    let data = {
      class: clazz,
      section: sectionzz,
      id: id?.student_id,
    };
    dispatch(deleteSingleStudentAction(data));
  };

  data = {
    nodes: data.nodes.filter((item) =>
      searchval === 'First Name'
        ? item.firstName.toLowerCase().includes(search.toLowerCase())
        : searchval == 'Last Name'
          ? item.lastName.toLowerCase().includes(search.toLowerCase())
          : item.student_id.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(`${clazz} : ${sectionzz}  `);
  };
  function setModalVisible() {
    setVisible(false);
  }

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `${clazz} : ${sectionzz} `,
  });

  const handleDownloadCSV = async () => {
    const csv = generateCsv(csvConfig)(CSVTemplate);
    download(csvConfig)(csv);
  };
  function handleGetClassData() {
    console.log(clazz);

    let data = {
      class: clazz,
      section: sectionzz,
    };
    console.log(data);
    if (sectionzz == 'All Sections') {
      //  setclazz(clazz)
      dispatch(fetchStudentsClassAction(data));
    }
    if (sectionzz != 'All Sections') {
      setsectionzz(sectionzz);
      dispatch(fetchCustomStudentsClassAction(data));
    }
  }

  const [sessionoption, setSessionoption] = useState('');

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
   
    </DefaultLayout>
  );
};

export default BulkBillDownload;
