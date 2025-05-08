import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';

import { mkConfig, generateCsv, download } from 'export-to-csv';

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

import TableBtn from '../components/Svgs/TableBtn';

import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';
import Downloadicon from './Svgs/downloadicon';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const AccountDetails = (props) => {
  ///////////////////////////////////

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const [position, setPosition] = useState('top');

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  //////////////////////////////////////

  const [searchval, setSearchval] = useState('First Name');
  const [pagesval, setpagesval] = useState(30);

  const [searcher, setSearcher] = useState('firstName');
  const [isChecked2, setIsChecked2] = useState(false);

  const [age, setAge] = useState('');
  const [nodes, setdata] = useState([]);
  const [classs, setClasss] = useState();
  const [session, setsession] = useState();
  const [clazz, setclazz] = useState();
  const [sectionzz, setsectionzz] = useState('All Sections');
  const [propp, setProp] = useState();
  const [cartz, setcartegory] = useState();
  const [info, setinfo] = useState();
  const [receipt, setReceipt] = useState('');
  const [name, SetName] = useState('');
  const [singleCart, setSingleCart] = useState([]);

  console.log(nodes);


  const dispatch = useDispatch();

  useEffect(() => {

    setdata(props.data);
  }, []);

  // useEffect(() => {

  //   if (fetchSection?.success == 1) {
  //    let arrr = ['All Sections']
  //     let i = 0;
  //     while (i < classes?.fetchSection?.data.length) {
  //       arrr.push(classes?.fetchSection?.data[i]?.sectionName
  //         );
  //       i++;
  //     }

  //     setsections(arrr);
  //     setsectionzz(arrr[0])
  //   }
  // }, [sectionloading]);

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
  --data-table-library_grid-template-columns:  20% 40% 15% 10% 15%;
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
      size: pagesval == 'All' ? 90000000000000000 : pagesval,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  data = {
    nodes: data.nodes.filter((item) =>
      searchval === 'First Name'
        ? item.firstName.toLowerCase().includes(search.toLowerCase())
        : searchval == 'Last Name'
          ? item.lastName.toLowerCase().includes(search.toLowerCase())
          : item.student_id.toLowerCase().includes(search.toLowerCase()),
    ),
  };
  const [sessionoption, setSessionoption] = useState('');

  function setModalVisible() {
    setVisible(false);
  }

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `${clazz} : ${sectionzz} `,
  });

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table1' });

    doc.save(`${nodes[0].class}`);
  };

  return (
    <div className=" flex-col">
      <div
        className={
          'rounded-sm border max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-2 '
        }
      >
        <div className="border-b border-stroke   dark:border-strokedark">
          <div className="flex justify-between">
            <h3 className="font-medium  text-black dark:text-white">
              Students' Session Account Records{' '}
            </h3>
            <div className="flex gap-4">
              <label
                className=" block w-full my-auto  text-sm font-medium text-ash dark:text-white"
                // style={{ color: '#A9B5B3' }}
                onClick={(e) => {
                  handleDownloadPdf();
                }}
              >
                Download (PDF)
              </label>

              <button
                className="flex  justify-center rounded bg-primary py-1 px-2 font-medium text-gray hover:bg-opacity-90"
                type=""
                onClick={(e) => {
                  e.preventDefault();
                  props.close(false);
                }}
              >
                close
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <div className="w-full  flex justify-between ">
            <div className=" flex w-6/12 gap-3">
              {/* <div className="w-full sm:w-1/3 flex  justify-end align-top  ">
                    <button onClick={(e)=>{handleDownloadPdf()}}
                      className="btn sm:w-2/3 h-10    flex justify-center rounded  bg-black py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Search
                    </button>
                  </div> */}
            </div>

            <div className={' w-3/12 flex flex-col mt-1 float-right '}>
              <div className="flex justify-between align-middle mb-1">
                <label
                  className="mb-1 w-2/2 pt-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor=" "
                >
                  Search By{' '}
                </label>
                <div className="relative  z-20 w-3/5 bg-white dark:bg-form-input">
                  <SelectGroupTwo
                    values={['First Name', 'Last Name', 'ID']}
                    setSelectedOption={(val) => setSearchval(val)}
                    selectedOption={searchval}
                  />
                </div>
              </div>

              <input
                className="w-full rounded border border-stroke bg-gray py-1 px-1.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                key={1}
                type="search"
                placeholder={'type here'}
                onChange={(e) => {
                  setSearch(e.target.value.trim());
                }}
              />
              {/* <button onClick={() => toPDF()}>Download PDF</button> */}
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          'rounded-sm  w-full border border-stroke bg-white px-7  pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
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
                      <HeaderCell className="">ID</HeaderCell>
                      <HeaderCell>Name</HeaderCell>
                      {/* <HeaderCell>Class</HeaderCell> */}
                      <HeaderCell> Current Arrears</HeaderCell>
                      <HeaderCell>Fee Paid</HeaderCell>

                      <HeaderCell>Balance</HeaderCell>
                    </HeaderRow>
                  </Header>

                  <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                    {tableList?.map((item) => (
                      <Row
                        key={item.student_id}
                        item={item}
                        className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
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
                          <span>{item.arrears}</span>
                        </Cell>
                        <Cell className="  ">
                          <span>
                            {item.amountpaid == null ? '0.00' : item.amountpaid}
                          </span>
                        </Cell>
                        <Cell className="flex   justify-between  ">
                          <span className="">
                            {item.accountbalance > 0
                              ? '⚪' + ' ' + item.accountbalance
                              : ' ' + '🟢' + item.accountbalance}
                          </span>{' '}
                          {/* <span className="float-right mr-15">
                              {item?.accountbalance < 0 ? (
                                <TableBtn
                                  clickFunction={() => {}}
                                  text={' Debit '}
                                  color={'bg-[#6D343E]'}
                                />
                              ) : item?.accountbalance == 0 ? (
                                ''
                              ) : (
                                <TableBtn
                                  clickFunction={() => {}}
                                  text={'Credit'}
                                  color={'bg-success'}
                                />
                              )}
                            </span> */}
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
              id="my-table1"
              data={data}
              theme={theme}
            >
               {(tableList) => (
                <>
                  <Header>
                    <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                      <HeaderCell className="">ID</HeaderCell>
                      <HeaderCell>Name</HeaderCell>
                      {/* <HeaderCell>Class</HeaderCell> */}
                      <HeaderCell> Current Arrears</HeaderCell>
                      <HeaderCell>Fee Paid</HeaderCell>

                      <HeaderCell>Balance</HeaderCell>
                    </HeaderRow>
                  </Header>

                  <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex ">
                    {tableList?.map((item) => (
                      <Row
                        key={item.student_id}
                        item={item}
                        className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex "
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
                          <span>{item.arrears}</span>
                        </Cell>
                        <Cell className="  ">
                          <span>
                            {item.amountpaid == null ? '0.00' : item.amountpaid}
                          </span>
                        </Cell>
                        <Cell className="flex   justify-between  ">
                          <span className="">
                            {item.accountbalance > 0
                              ? ' ' + ' ' + item.accountbalance
                              : ' ' + '' + item.accountbalance}
                          </span>{' '}
                          {/* <span className="float-right mr-15">
                              {item?.accountbalance < 0 ? (
                                <TableBtn
                                  clickFunction={() => {}}
                                  text={' Debit '}
                                  color={'bg-[#6D343E]'}
                                />
                              ) : item?.accountbalance == 0 ? (
                                ''
                              ) : (
                                <TableBtn
                                  clickFunction={() => {}}
                                  text={'Credit'}
                                  color={'bg-success'}
                                />
                              )}
                            </span> */}
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
  );
};

export default AccountDetails;
