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
import { resetfetchAllAssignRecord } from '../redux/slices/feeSlice';

const GenerateAssignedModalStudent = (props) => {
  ///////////////////////////////////

  const [visible9, setVisible9] = useState(false);

  //////////////////////////////////////

  const [loader, setLoader] = useState(true);

  const [searchval, setSearchval] = useState('First Name');
  const [pagesval, setpagesval] = useState(30);

  const [nodes, setdata] = useState([]);

  const fee = useSelector((state) => state?.fees);
  const { fetchAllAssignRecord } = fee;

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (fetchAllAssignRecord?.success == 1) {
      let data = fetchAllAssignRecord?.data;
      setdata(data);
      console.log(data);
    }
  }, [fetchAllAssignRecord]);

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
  --data-table-library_grid-template-columns:   30% 25% 15% 15% 15%;
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
      fetchUserdataAction({
        role: 'student',
        id: value.student_id,
        userid: value.userId,
      }),
    );
    navigate('/student/editinfo', { state: { action: 2, value: value } });
  };
  const handledeletbtn = () => {
    let data = {
      class: clazz,
      section: sectionzz,
      id: id?.student_id,
    };
    dispatch(deleteSingleStudentAction(data));
  };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(`${clazz} : ${sectionzz}  `);
  };
  function setModalVisible() {
    setVisible(false);
  }

  const dispatch = useDispatch();

  return (
    <>
      <div className=" flex-col rounded-sm border max-w-full shadow-default border-stroke bg-white  dark:border-strokedark dark:dark:bg-form-input ">
        <div className="flex justify-between px-4 pt-3 ">
          <label
            className="mb-3 w-2/2 block text-lg font-medium text-black dark:text-white"
            htmlFor=" "
          >
            Assigned Fee Report{' '}
          </label>
          <button
            className="flex  justify-center bg-primary rounded h-9 px-4  py-1 text-center font-medium text-black  dark:text-white"
            type=""
            onClick={(e) => {
              e.preventDefault();
              props.close(false);
              dispatch(resetfetchAllAssignRecord());
            }}
          >
            close
          </button>
        </div>
        <div
          className={
            'rounded-sm border max-w-full  px-5  shadow-default border-stroke bg-white  dark:border-strokedark dark:dark:bg-form-input  '
          }
        ></div>

        <div
          className={
            'rounded-sm  w-full  bg-white px-2  shadow-default   dark:border-strokedark dark:dark:bg-form-input'
          }
        >
          <div className="flex gap-3  flex-col">
            <div>
              <Table
                data={data}
                pagination={pagination}
                theme={theme}
                layout={{ custom: true }}
              >
                {(tableList) => (
                  <>
                    <Body className="dark:border-strokedark  dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                      <Row className="dark:border-strokedark border border-b  font-extrabold Uppercase dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        <Cell className="capitalize">Class</Cell>
                        <Cell className="  ">Student Cartegory</Cell>
                        <Cell className="  ">Amount</Cell>
                        <Cell className="  ">
                          <span>Created By</span>
                        </Cell>
                        <Cell>
                          <div className="gap-2 flex">Date Created</div>
                        </Cell>
                      </Row>
                      {tableList?.map((item) => (
                        <>
                          <Row
                            key={item.student_id}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
                          >
                            <Cell className="  ">
                              <span>{item.class}</span>
                            </Cell>
                            <Cell className="capitalize">{item.cartegory}</Cell>
                            <Cell className="  ">
                              <span>{item.total}</span>
                            </Cell>
                            <Cell className="  ">
                              <span>{item.createdby}</span>
                            </Cell>

                            <Cell className="  ">
                              <span>{item.createdat}</span>
                            </Cell>
                          </Row>
                        </>
                      ))}
                    </Body>
                  </>
                )}
              </Table>
            </div>
            <div className={nodes == [] ? 'hidden' : ''}>
              <div
                className={nodes == [] ? 'hidden' : 'flex'}
                style={{ display: '', justifyContent: 'space-between' }}
              >
                <div className="flex">
                  <span className="mt-2">
                    Total Pages: {pagination.state.getTotalPages(data.nodes)}
                  </span>
                  <div className="flex  align-middle  flex-row mr-3">
                    <span className="flex mt-2 ml-8 align-middle">
                      Records Per Page:{' '}
                    </span>
                    <div className="relative flex align-middle ml-3  z-20   bg-white dark:bg-form-input">
                      <SelectGroupTwo
                        values={[30, 50, 100, 200, 500, 'All']}
                        setSelectedOption={(val) => setpagesval(val)}
                        selectedOption={pagesval}
                      />
                    </div>
                  </div>
                </div>

                <span>
                  Page:{' '}
                  {pagination.state.getPages(data.nodes).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className="rounded"
                      style={{
                        color: pagination.state.page === index ? 'white' : '',
                        width: '20px',
                        margin: '0px 5px',
                        padding: '2px',
                        backgroundColor:
                          pagination.state.page === index ? '#3C50E0' : '',
                      }}
                      onClick={() => pagination.fns.onSetPage(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </span>
              </div>
            </div>
          </div>
          <div className=" bg-white  dark:border-strokedark dark:dark:bg-form-input"></div>{' '}
        </div>
      </div>
    </>

    //  </DefaultLayout>
  );
};

export default GenerateAssignedModalStudent;
