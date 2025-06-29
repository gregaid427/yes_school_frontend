

import { useEffect, useState } from 'react';

import DefaultLayout from '../../layout/DefaultLayout';

import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import SetSessionAlert from '../../components/SetSessionAlert';

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
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';

import {
  FetchExamResultByIdAction
} from '../../redux/slices/examSlice';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ViewExamResult = (props) => {
  const location = useLocation();
  let student = useSelector((state) => state?.student);
  const [pagesval, setpagesval] = useState(30);

  const [nodes, setdata] = useState([]);
  const [gradingchoice, setGrading] = useState([]);

  const [FinalResult, setFinalResult] = useState([]);
  const [examgroup, setExamGroup] = useState('Loading...');
  const [session, setSession] = useState('Loading...');
  const [chosensubject, setChosensubject] = useState('Loading...');
  const [createdby, setCreatedaby] = useState('Loading...');
  const [createdat, setCreatedat] = useState('Loading...');

  const { fetchcustomstudent } = student;

  const exam = useSelector((state) => state?.exam);
  const { SingleGradegroup, FetchExamResult } = exam;
  useEffect(() => {
    if (location?.state == null) {
      return navigate(-1);
    } else {
      const { value, chosensubject, session, examgroup,createdby,createdat,examid } = location?.state;
      console.log(value);
      console.log(chosensubject);

      setCreatedaby(createdby);
      setCreatedat(createdat);

      setVal(value);
      setVal1(chosensubject);
      setExamGroup(examgroup);
      setSession(session);
      setChosensubject(chosensubject);

      dispatch(
        FetchExamResultByIdAction({
          examgroup: examgroup,
          examid: examid,
          subject: chosensubject,
          session: session,
          class:value?.title == undefined ? value?.class : value?.title,
          section: value?.section == "-" ? null : value?.section
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (FetchExamResult?.success == 1) {
      let data = FetchExamResult?.data;
      setdata(data);
    }
  }, [FetchExamResult]);

  const navigate = useNavigate();
  console.log(nodes);
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
  const [value1, setVal1] = useState('Loading...');

  console.log(value);

  useEffect(() => {
    setdata([]);
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
  --data-table-library_grid-template-columns:  10% 33%  13%  14% 8% 6% 10% 6%;
`,
      BaseCell: `
        font-size: 15px;
        padding:  7px 0px;
      //  color:white;
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
      size: pagesval == 'All' ? 90000000000000000 : pagesval,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  const [search, setSearch] = useState('');
  const [searchval, setSearchval] = useState('First Name');

  // data = {
  //   nodes: data.nodes.filter((item) =>
  //     searchval === 'First Name'
  //       ? item.firstName.toLowerCase().includes(search.toLowerCase())
  //       : searchval == 'Last Name'
  //         ? item.lastName.toLowerCase().includes(search.toLowerCase())
  //         : item.student_id.toLowerCase().includes(search.toLowerCase()),
  //   ),
  // };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(`${value?.class} : ${value?.section}  `);
  };
  function setModalVisible() {
    setVisible(false);
  }

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
      <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '50%' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      >
        <SetSessionAlert setYes={setYes} yes={yes} close={setVisible} />
      </Dialog>
      <div className="flex gap-2 row">
        <div className="w-full flex-col">
          <div className="mb-4">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <h3 className="font-medium pt-2  px-7 text-black dark:text-white">
                Examination Result
              </h3>
              <div className="border-b border-stroke py-4 px-7 flex dark:border-strokedark">
      

                <div className="w-1/2">
                  <div className="flex ">
                    <h3 className="text-sm  text-black w-3/12 dark:text-white">
                      Class/Section {' '}
                    </h3>
                    <h3 className="text-sm  text-black   dark:text-white">
                      <span className=" font-medium">
                        
                        {`${value?.class} ${' '}  ${value?.section == null ? '' : value?.section == '-' ? ' ' : '/' + value?.section}`}
                      </span>
                    </h3>
                  </div>
                  <div className="flex ">
                    <h3 className="text-sm  text-black w-3/12 dark:text-white">
                      Subject{' '}
                    </h3>
                    <h3 className="text-sm  text-black   dark:text-white">
                      <span className="font-medium ">
                      {`${chosensubject}`}{' '}
                      </span>
                    </h3>
                  </div>
                  <div className="flex ">
                    <h3 className="text-sm  text-black  w-3/12 dark:text-white">
                    Recorded By :{' '}
                    </h3>
                    <h3 className="text-sm  text-black   dark:text-white">
                      <span className="font-medium ">
                      {`${createdby}`}                       </span>
                    </h3>
                  </div>
                </div>



                <div className="w-1/2">
                  <div className="flex ">
                    <h3 className="text-sm  text-black w-3/12 dark:text-white">
                    Exam Group:{' '}
                    </h3>
                    <h3 className="text-sm  text-black   dark:text-white">
                      <span className=" font-medium">
                        
                      {`${examgroup}`}                      </span>
                    </h3>
                  </div>
                  <div className="flex ">
                    <h3 className="text-sm  text-black w-3/12 dark:text-white">
                    Session :{' '}
                    </h3>
                    <h3 className="text-sm  text-black   dark:text-white">
                      <span className="font-medium ">
                      {`${session}`}
                      </span>
                    </h3>
                  </div>
                  <div className="flex ">
                    <h3 className="text-sm  text-black  w-3/12 dark:text-white">
                    Recorded At :{' '}
                    </h3>
                    <h3 className="text-sm  text-black   dark:text-white">
                      <span className="font-medium ">
                      {`${createdat.slice(0,25)}`}                      </span>
                    </h3>
                  </div>
                </div>


              
              </div>
              <div className=" flex px-7 py-2 w-7/12 gap-3">
                  <div className="sm:w-2/5 ">
                    <label
                      className="pt-2 block text-sm font-medium text-ash cursor-pointer dark:text-white"
             // style={{ color: '#A9B5B3' }}
                      onClick={(e) => {
                        handleDownloadPdf();
                      }}
                    >
                      Download Page (PDF)
                    </label>
                  </div>

                  <div className="w-full sm:w-2/5">
                    <label
                      className="pt-2 block text-sm font-medium text-ash cursor-pointer dark:text-white"
             // style={{ color: '#A9B5B3' }}
                      onClick={(e) => {
                        handleDownloadCSV();
                      }}
                    >
                      Download Page (Excel)
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

                            <HeaderCell>Section</HeaderCell>

                            <HeaderCell>
                              {' '}
                              <div className="flex gap-1">
                                {' '}
                                <div className="w-6/12">Exam</div>
                                <div className="w-6/12">Class</div>{' '}
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

    
                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                          {tableList?.map((item, index) => (
                            <Row key={item.student_id}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] "
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

                              <Cell>
                                <div className="flex row gap-1 w-full">
                                  <div className="w-6/12 ml-1">
                                    {' '}
                                    <span>{item.examscore == undefined ? 'n/a' : item.examscore}</span>
                                  </div>
                                  <div className="w-6/12 ml-1">
                                    {' '}
                                    <span>{item.classworkscore == undefined ? 'n/a' : item.classworkscore}</span>
                                  </div>
                                  {/* <div className="w-6/12 ml-1">
                                    {' '}
                                    <span>{item.othersscore == undefined ? 'n/a' : item.examscore}</span>
                                  </div> */}
                                </div>
                              </Cell>
                              <Cell className="  ">
                                <span className="ml-1">
                                  {item.totalscore 
                                    ? item.totalscore + ' %'
                                    : 'n/a'}
                                </span>
                              </Cell>
                              <Cell className="  ">
                                <span className="ml-1">{item.grade}</span>
                              </Cell>
                              <Cell className="  ">
                                <span>{item.examremark}</span>
                              </Cell>
                              <Cell className="  ">
                              <span>{item.position}</span>
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
                  style={{ display: 'flex', justifyContent: 'space-between' }}
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

    
                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                          {tableList?.map((item) => (
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

export default ViewExamResult;
