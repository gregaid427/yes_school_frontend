import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';

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

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const ExamResultModal = (props) => {
  const location = useLocation();
  let student = useSelector((state) => state?.student);
  const [pagesval, setpagesval] = useState('All');

  const [nodes, setdata] = useState([]);
  const [gradingchoice, setGrading] = useState([]);

  const [FinalResult, setFinalResult] = useState([]);

  const { fetchcustomstudent } = student;

  const exam = useSelector((state) => state?.exam);
  const { SingleGradegroup, FetchExamResult } = exam;

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  const user = useSelector((state) => state?.user);

  const [yes, setYes] = useState(undefined);
  const dispatch = useDispatch();

  const [value, setVal] = useState('Loading...');

  console.log(value);

  useEffect(() => {
    setdata(props.value);
  }, []);

  console.log(FinalResult);
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
  --data-table-library_grid-template-columns:  15% 38%  17% 8% 6% 10% 6%;
`,
      BaseCell: `
        font-size: 15px;
        padding:  7px 0px;
        color:white;
      //   border-bottom: 1px solid #313D4A !important;
      //   //  background-color: #24303F;

       `,
      Row: `
  &:nth-of-type(odd) {
    background-color: #24303F;
  }

  &:nth-of-type(even) {
    background-color: #202B38;
  }
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

  function onPaginationChange(action, state) {}

  const [search, setSearch] = useState('');
  const [searchval, setSearchval] = useState('First Name');

  console.log('propsssssssssssss');
  console.log(props.value);

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(`${value?.title} : ${value?.section}  `);
  };
  function setModalVisible() {
    setVisible(false);
  }

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `${value?.title} : ${value?.section == null ? '' : value?.section} `,
  });

  const handleDownloadCSV = async () => {
    const csv = generateCsv(csvConfig)(nodes);
    download(csvConfig)(csv);
  };

  return (
    <div className="flex gap-2 row">
      <div className="w-full flex-col">
        <div className="mb-4 ">
          <div className="rounded-sm border flex justify-between border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <h3 className="font-medium py-3 px-2 text-black dark:text-white">
              Examination Result
            </h3>
            <div className=" flex  gap-1">
              <div className="sm:w-2/5 ">
                <label
                  className="pt-2 block text-sm font-medium text-ash dark:text-white"
                  style={{ color: '#A9B5B3' }}
                  onClick={(e) => {
                    handleDownloadPdf();
                  }}
                >
                  Download Page (PDF)
                </label>
              </div>

              <div className="w-full sm:w-2/5">
                <label
                  className="pt-2 block text-sm font-medium text-ash dark:text-white"
                  style={{ color: '#A9B5B3' }}
                  onClick={(e) => {
                    handleDownloadCSV();
                  }}
                >
                  Download Page (Excel)
                </label>
              </div>
              
              <div className="w-full sm:w-2/5">
                <label
                  className="pt-2 block text-sm font-medium text-ash dark:text-white"
                  style={{ color: '#A9B5B3' }}
                  onClick={(e) => {
                    props.close(false);
                  }}
                >
            Close Page
                </label>
              </div>
            </div>
          </div>
          <div
            className={
              'rounded-sm  w-full border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
            }
          >
            <div className="flex gap-3  flex-col">
              <div>
                <Table
                  id="my-table"
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

                          <HeaderCell>
                            {' '}
                            <div className="flex gap-1">
                              {' '}
                              <div className="w-4/12">Exam</div>
                              <div className="w-4/12">Class</div>{' '}
                              <div className="w-4/12">Other</div>
                            </div>
                          </HeaderCell>
                          <HeaderCell>Total %</HeaderCell>

                          <HeaderCell>Grade</HeaderCell>

                          <HeaderCell>Remarks</HeaderCell>
                          <HeaderCell>Position</HeaderCell>

                          {/* <HeaderCell>Class({gradingchoice[3]}%)</HeaderCell>
                            <HeaderCell>Other({gradingchoice[4]}%)</HeaderCell> */}
                        </HeaderRow>
                      </Header>

                      <Body>
                        {tableList.map((item, index) => (
                          <Row key={item.student_id} item={item} className="">
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

                            <Cell>
                              <div className="flex row gap-1 w-full">
                                <div className="w-4/12 ml-1">
                                  {' '}
                                  <span>{item.examscore}</span>
                                </div>
                                <div className="w-4/12 ml-1">
                                  {' '}
                                  <span>{item.classworkscore}</span>
                                </div>
                                <div className="w-4/12 ml-1">
                                  {' '}
                                  <span>{item.othersscore}</span>
                                </div>
                              </div>
                            </Cell>
                            <Cell className="  ">
                              <span className="ml-1">
                                {item.totalscore ? item.totalscore + ' %' : '-'}
                              </span>
                            </Cell>
                            <Cell className="  ">
                              <span className="ml-1">{item.grade}</span>
                            </Cell>
                            <Cell className="  ">
                              <span>{item.examremark}</span>
                            </Cell>
                            <Cell className="  ">
                              <span>{item.classposition}</span>
                            </Cell>
                          </Row>
                        ))}
                      </Body>
                    </>
                  )}
                </Table>
              </div>
              <div
                className=" align-middle"
                style={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <button
                  className="flex  justify-center rounded bg-primary  border border-stroke py-2 px-12 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    props.close(false);
                  }}
                >
                  Close
                </button>
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

                      <Body>
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
  );
};

export default ExamResultModal;
