import { useEffect, useState } from 'react';

import userThree from '../../images/user/log.jpg';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  createsessionAction,
  deletesessionByIdAction,
  fetchActivesessionAction,
  fetchAllsessionAction,
  resetcreatesession,
  resetUpdatesession,
  updatesessionStatusAction,
} from '../../redux/slices/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import SessionSelect from '../../components/SessionSelect';
import { Dialog } from 'primereact/dialog';
import SetSessionAlert from '../../components/SetSessionAlert';
import {
  fetchschoolinfoAction,
  SchoollogoAction,
  updateschoolinfoAction,
} from '../../redux/slices/usersSlice';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Downloadicon from '../../components/Svgs/downloadicon';
import {
  fetchCustomStudentsClassAction,
  fetchStudentsCustomAction,
} from '../../redux/slices/studentSlice';
import { usePagination } from '@table-library/react-table-library/pagination';
import { download, generateCsv, mkConfig } from 'export-to-csv';
import { useTheme } from '@table-library/react-table-library/theme';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import {
  FetchSingleGradeGroupAction,
  resetsubmitresult,
  setExamResult,
  SubmitResultAction,
} from '../../redux/slices/examSlice';
import {
  fetchAllClassExamAction,
  resetfetchAllClassExam,
} from '../../redux/slices/classSlice';
import ExamResultAlert from '../../components/ExamResultAlert';
import ExamResultModal from '../../components/ExamResultModal';
import {
  FetchAttendanceDetailAction,
  resetFetchAttendanceDetail,
} from '../../redux/slices/attendanceSlice';
import TableBtn from '../../components/Svgs/TableBtn';

const SearchDetail = (props) => {
  const location = useLocation();
  let student = useSelector((state) => state?.student);
  const [pagesval, setpagesval] = useState(30);
  const [value, setVal] = useState('Loading...');
  const [AbsentValue, setAbsentValue] = useState('...Loading');
  const [PresentValue, setPresentValue] = useState('...Loading');
  const [nodes, setdata] = useState([]);
  const [gradingchoice, setGrading] = useState([]);

  const [FinalResult, setFinalResult] = useState([]);
  const [singleGrade, setSingleGrade] = useState();
  const [response, setResponse] = useState();

  const { fetchcustomstudent } = student;

  const attendance = useSelector((state) => state?.attendance);
  const { FetchAttendanceDetail } = attendance;

  useEffect(() => {
    if (location?.state == null) {
      return navigate(-1);
    } else {
      const { value } = location?.state;
      console.log(value);
      dispatch(
        FetchAttendanceDetailAction({
          code: value?.groupecode,
        }),
      );
      setVal(value);
    
    
    }
  }, []);




  useEffect(() => {
    if (FetchAttendanceDetail?.success == 1) {
      let data = FetchAttendanceDetail?.data;
      console.log(data);
      if (data.length != 0) {
        setdata(data);
        let present = [];
        let absent = [];
        for (const val of data) {
          console.log(val)
          val.status == 'Absent' ? present.push('1') : absent.push('2');
          setPresentValue(present.length)
          setAbsentValue(absent.length)

        }
        dispatch(resetFetchAttendanceDetail());
      }
    }
  }, [FetchAttendanceDetail]);

  const navigate = useNavigate();
  console.log(nodes);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const [position, setPosition] = useState('center');

  const user = useSelector((state) => state?.user);

  const [yes, setYes] = useState(undefined);
  const dispatch = useDispatch();

  const [value1, setVal1] = useState('Loading...');

  useEffect(() => {
    setdata([]);
  }, []);

  let data = { nodes };
  const theme = useTheme([
    {
      // HeaderRow: `
      // background-color: #313D4A;
      // border-bottom: 1px solid #fff !important;

      // `,
      HeaderRow: `
    .th {
      border-bottom: 1px solid #a0a8ae;
      padding: 5px 0px;
    }
  `,
      Table: `
  --data-table-library_grid-template-columns:  20% 40% 30%  10%;
`,
      BaseCell: `
        font-size: 15px;
        //color:white;
      //   border-bottom: 1px solid #313D4A !important;
      //   //  background-color: #24303F;

       `,
    //       Row: `
//   &:nth-of-type(odd) {
//     background-color: #24303F;
//   }

//   &:nth-of-type(even) {
//     background-color: #202B38;
//   }
// `,
    },
  ]);

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 900000,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  const [Modaldata, setModaldata] = useState();

  const [search, setSearch] = useState('');
  const [searchval, setSearchval] = useState('First Name');

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `${value?.class} : ${value?.section == null ? '' : value?.section} `,
  });

  const handleDownloadCSV = async () => {
    const csv = generateCsv(csvConfig)(nodes);
    download(csvConfig)(csv);
  };

  return (
    <DefaultLayout>
      <div className="flex gap-2 row">
        <div className="w-full flex-col">
          <div className="mb-4">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <h3 className="font-medium pt-2  px-7 text-black dark:text-white">
                Attendance Detail
              </h3>
              <div className="border-b border-stroke py-4 px-7 flex dark:border-strokedark">
                <div className="w-1/2">
                  <h3 className="text-sm text-black dark:text-white">
                    Class :{' '}
                    <span className="font-medium">
                      {' '}
                      {`${value?.classid} ${' '}`}
                    </span>
                  </h3>
                  <h3 className="text-sm  text-black dark:text-white">
                    Section:{' '}
                    <span className="font-medium ml-1">
                      {value?.section == null ? '' : value?.section}
                    </span>
                  </h3>
                  <h3 className="text-sm  text-black dark:text-white">
                    Date Taken:{' '}
                    <span className="font-medium ml-1">{value?.datetaken}</span>
                  </h3>
                </div>
                <div className="w-1/2  border-l pl-2  border-stroke ">
                  <h3 className="text-sm  text-black dark:text-white">
                    Recorded By:{' '}
                    <span className="font-medium ml-1">{`${value?.createdby}`}</span>
                  </h3>
                  <h3 className="text-sm  text-black dark:text-white">
                    No. Absent: <span className="font-medium ml-1">{AbsentValue}</span>
                  </h3>
                  <h3 className="text-sm  text-black dark:text-white">
                    No. Present: <span className="font-medium ml-1">{PresentValue}</span>
                  </h3>
                </div>
              </div>
              
              <div className={nodes.length != 0 ? 'hidden' : ''}></div>
              <div
                className={
                  'rounded-sm  w-full border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
                }
              >
                <div className="flex gap-3  flex-col">
                  <div>
                    <Table
                      data={data}
                      pagination={pagination}
                      layout={{ custom: true }}
                      theme={theme}
                    >
                      {(tableList) => (
                        <>
                          <Header>
                            <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                              <HeaderCell className="">ID</HeaderCell>
                              <HeaderCell>Name</HeaderCell>
                              <HeaderCell>Class (Section)</HeaderCell>

                              <HeaderCell>Status</HeaderCell>
                            </HeaderRow>
                          </Header>

      
                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                            {tableList.map((item) => (
                              <Row
                                key={item.id}
                                item={item}
                                className=""
                              >
                                <Cell className="  ">
                                  <span>{item.entityid}</span>
                                </Cell>
                                <Cell className="capitalize">
                                  {item.firstName +
                                    ' ' +
                                    item.otherName +
                                    ' ' +
                                    item.lastName}
                                </Cell>
                                <Cell className="  ">
                                  <span>{item.classid}</span> (
                                  <span>
                                    {item.section ? item.section : 'None'}
                                  </span>
                                  )
                                </Cell>

                                {/* <Cell className="  ">
                            <span>{item.status}</span>
                          </Cell> */}

                                <Cell>
                                  <div>
                                  <span>
                                    {item.status == 'Present' ?  <TableBtn
                                  clickFunction={() => {
                                   
                                  }}
                                  text={'Present'}
                                  color={'bg-primary'}
                                />  :   <TableBtn
                                  clickFunction={() => {
                                 
                                  }}
                                  text={'Absent'}
                                  color={'bg-success'}
                                />}
                                  </span>

                                    {/* <AttendanceRadio
                                      reset={radioReset}
                                      setRepeated={setRepeat}
                                      repeat={repeat}
                                      stdId={item.student_id}
                                    /> */}
                                    {/* <ViewSVG
                                clickFunction={() => handleviewbtn(item)}
                              />
                              <EditSVG
                                clickFunction={() => handleEditbtn(item)}
                              />

                              <DeleteSVG
                                clickFunction={() => handledeletbtn(item.student_id)}
                              /> */}
                                  </div>
                                </Cell>
                              </Row>
                            ))}
                          </Body>
                        </>
                      )}
                    </Table>
                
                  </div>
                </div>
                <div className="hidden">
                  <Table
                    id="my-table"
                    data={data}
                    pagination={pagination}
                    theme={theme}
                  >
                    {(tableList) => (
                      <>
                        <Header>
                          <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                            <HeaderCell className="">ID</HeaderCell>
                            <HeaderCell>Name</HeaderCell>
                            <HeaderCell>Section</HeaderCell>
                            <HeaderCell>Gender</HeaderCell>
                          </HeaderRow>
                        </Header>

    
                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                          {tableList.map((item) => (
                            <Row
                              key={item.student_id}
                              item={item}
                              className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
                            >
                              <Cell className="  ">
                                <span>{item.student_id}</span>
                              </Cell>
                              <Cell className="capitalize">
                                {item.firstName +
                                  ' ' +
                                  item.otherName +
                                  ' ' +
                                  item.lastName}
                              </Cell>
                              <Cell className="  ">
                                <span>{item.section}</span>
                              </Cell>
                              <Cell className="  ">
                                <span>{item.gender}</span>
                              </Cell>
                            </Row>
                          ))}
                        </Body>
                      </>
                    )}
                  </Table>
                </div>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SearchDetail;
