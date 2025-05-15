import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';

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
  fetchCustomStudentsClassAccountAction,
  fetchCustomStudentsClassAction,
  fetchSingleStudent,
  fetchStudentsClassAccountAction,
  fetchStudentsClassAction,
} from '../../redux/slices/studentSlice';
import Loader from '../../common/Loader';

import SectionSelect1 from '../../components/SectionsSelect1';
import ClassSelect from '../../components/ClassSelect';
import {
  fetchAllstaffAction,
  fetchschoolinfoAction,
  fetchUserdataAction,
} from '../../redux/slices/usersSlice';
import TableBtn from '../../components/Svgs/TableBtn';
import CollectFeesModal from '../../components/collectFeesModal';
import FeesReceiptModal from '../../components/FeesReceiptModal';
import {
  fetchfeeCartegoryAction,
  fetchRepoert1Action,
  fetchRepoertAction,
  GetFeeRecordAction,
  resetGetFeeRecord,
  resetpayfee,
  totalfeebyclassreport,
} from '../../redux/slices/feeSlice';
import { fetchActivesessionAction } from '../../redux/slices/sessionSlice';
import PaymentRecordsModal from '../../components/PaymentRecordsMordal';
import GlobalSearchInput from '../../components/GlobalSearchInput';
import FeeCartSelect2 from '../../components/FeecartSelect2';
import StaffSelect from '../../components/StaffSelect';
import toast from 'react-hot-toast';

const ClassFeeReport = () => {
  ///////////////////////////////////
  let date = new Date();
  date = date.toLocaleDateString('en-CA');
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [classinfo, setclassinfo] = useState();

  const [position, setPosition] = useState('top');
  const [duration, setDuration] = useState('Today');

  //////////////////////////////////////

  const [loader, setLoader] = useState(true);

  const [staff, setstaff] = useState(null);
  const [staffid, setstaffid] = useState(null);

  const [pagesval, setpagesval] = useState(30);

  const [feecartegory, setfeecart] = useState(null);
  const [selectedinfo, setSelectedInfo] = useState(false);
  const [selectedinfo1, setSelectedInfo1] = useState(false);

  const [age, setAge] = useState('');
  const [nodes, setdata] = useState([]);
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [clazz, setclazz] = useState('-');
  const [sectionzz, setsectionzz] = useState('All Sections');
  const [propp, setProp] = useState();
  const [cartz, setcartegory] = useState(null);
  const [info, setinfo] = useState();
  const [receipt, setReceipt] = useState('');
  const [record, setRecord] = useState([]);
  const [session, setsession] = useState();
  const [result11, setResult1] = useState([]);
  const [result22, setResult2] = useState([]);
  const dispatch = useDispatch();
  const [sessionid, setsessionid] = useState();

  const fee = useSelector((state) => state?.fees);
  const session1 = useSelector((state) => state?.session);

  const { totalfeebyclass } = fee;
  const { fetchsessionactive } = session1;
  useEffect(() => {
    if (fetchsessionactive?.success == 1) {
      let data = fetchsessionactive?.data[0];
      setTimeout(() => setLoader(false), 1000);
      setsessionid(data.sessioncode);
      //   console.log('sessionz');
    }
  }, [fetchsessionactive]);
  useEffect(() => {
    dispatch(totalfeebyclassreport({ sessionid: sessionid }));
  }, [sessionid]);
  useEffect(() => {
    dispatch(fetchActivesessionAction());
  }, []);
  console.log(sessionid);

  useEffect(() => {
    if (totalfeebyclass?.success == 1) {
      let data = totalfeebyclass?.data;
      let result = totalfeebyclass?.result[0];
      let result1 = totalfeebyclass?.result1;
      let result2 = totalfeebyclass?.result2;

      setsession(result);
      setResult1(result1);
      setResult2(result2);

      setdata(data);
    }
  }, [totalfeebyclass]);

  function returnnodes(nodes) {
    return { nodes };
  }
  let data = { nodes };
  let data1 = returnnodes(result11);
  let data2 = returnnodes(result22);

  console.log(data);
  console.log(data1);

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
  --data-table-library_grid-template-columns:  35% 13% 13% 13% 13% 13% ;
`,
      BaseCell: `
        font-size: 14px;
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

  const user = useSelector((state) => state?.user);
  const { allschool } = user;

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: pagesval == 'All' ? 90000000000000000 : pagesval,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  const navigate = useNavigate();

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `${clazz} : ${sectionzz} `,
  });

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div className=" flex-col">
        <div
          className={
            'rounded-sm border text-black text-lg dark:text-white max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
          }
        >
          Fees Collection - Overall Report
        </div>
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
                theme={theme}
                layout={{ custom: true }}
              >
                {(tableList) => (
                  <>
                    <Header>
                      <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                        {/* <HeaderCell className="">Date(d/m/y)</HeaderCell>
                        <HeaderCell>Name</HeaderCell> */}
                        <HeaderCell>Class</HeaderCell>

                        <HeaderCell> Arrears</HeaderCell>
                        <HeaderCell> Fees Payable</HeaderCell>

                        <HeaderCell> Paid Fees</HeaderCell>
                        <HeaderCell> Balance</HeaderCell>
                        <HeaderCell> Discount</HeaderCell>

                      </HeaderRow>
                    </Header>

                    <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                      {tableList?.map((item) => (
                        <>
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
                          >
                            {/* <Cell className="  ">
                            <span>{item.datecollected}</span>
                          </Cell>
                          <Cell className="capitalize">
                            {item.stdname}
                          </Cell> */}

                            <Cell className="flex   justify-between  ">
                              <span className="">
                                {item.class} ({item.section})
                              </span>{' '}
                            </Cell>
                            <Cell>{item.arrears}</Cell>
                           
                            <Cell>{item.payable}</Cell>
                           
                            <Cell>{item.paid}</Cell>
                            <Cell>
                              {Math.abs(eval(item.arrears + item.payable - item.paid))}
                            </Cell>
                            <Cell>
                              {Math.abs(eval(item.scholar + item.pref ))}
                            </Cell>
                          </Row>
                        </>
                      ))}
                      <Row
                        key={1}
                        className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
                      >
                        {/* <Cell className="  ">
                           <span>{item.datecollected}</span>
                         </Cell>
                         <Cell className="capitalize">
                           {item.stdname}
                         </Cell> */}

                        <Cell className="flex  font-bold justify-between  ">
                          <span className=""> Total</span>{' '}
                        </Cell>

                        <Cell>: {session.totalfpayable}</Cell>
                        <Cell>: {session.totalpaid}</Cell>
                        <Cell>
                          :{' '}
                          {Math.abs(
                            eval(session.totalfpayable - session.totalpaid),
                          )}
                        </Cell>
                        <Cell>: {session.totalarears}</Cell>
                        <Cell>
                              {Math.abs(eval(session.shol + session.prefamount ))}
                            </Cell>
                      </Row>
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

                    <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                      {tableList?.map((item) => (
                        <Row
                          key={item.id}
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
      <div className="mt-5 flex gap-3">
        <div className="w-full flex-col">
          <div
            className={
              'rounded-sm border text-black text-lg dark:text-white max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
            }
          >
            Fees Collection - Fee Items Cartegory Report
          </div>
          <div
            className={
              'rounded-sm  w-full border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
            }
          >
            <div className="flex gap-3  flex-col">
              <div>
                <Table
                  data={data1}
                  pagination={pagination}
                  theme={theme}
                  //  layout={{ custom: false }}
                >
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                          <HeaderCell>Fee Item</HeaderCell>

                          <HeaderCell>Total Paid Fees</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
                          <>
                            <Row
                              key={item.id}
                              item={item}
                              className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
                            >
                              <Cell className="flex   justify-between  ">
                                <span className="">{item.feeitem}</span>{' '}
                              </Cell>

                              <Cell>{item.amount}</Cell>
                            </Row>
                          </>
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

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
                          <Row
                            key={item.id}
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
        <div className="w-full flex-col">
          <div
            className={
              'rounded-sm border text-black text-lg dark:text-white max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
            }
          >
            Fees Collection - Class/Fee Items Cartegory Report
          </div>
          <div
            className={
              'rounded-sm  w-full border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
            }
          >
            <div className="flex gap-3  flex-col">
              <div>
                <Table
                  data={data2}
                  pagination={pagination}
                  theme={theme}
                  //    layout={{ custom: true }}
                >
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                          {/* <HeaderCell className="">Date(d/m/y)</HeaderCell>
                        <HeaderCell>Name</HeaderCell> */}
                          <HeaderCell>Class</HeaderCell>
                          <HeaderCell>Fee Item</HeaderCell>

                          <HeaderCell>Total Session Fees</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
                          <>
                            <Row
                              key={item}
                              item={item}
                              className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
                            >
                              {/* <Cell className="  ">
                            <span>{item.datecollected}</span>
                          </Cell>
                          <Cell className="capitalize">
                            {item.stdname}
                          </Cell> */}

                              <Cell className="flex   justify-between  ">
                                <span className="">
                                  {item.class} ({item.section})
                                </span>{' '}
                              </Cell>
                              <Cell>{item.feeitem}</Cell>

                              <Cell>{item.amount}</Cell>
                            </Row>
                          </>
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

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                        {tableList?.map((item) => (
                          <Row
                            key={item.id}
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
    </DefaultLayout>
  );
};

export default ClassFeeReport;
