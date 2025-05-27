import { useEffect, useRef, useState } from 'react';
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
;
import Loader from '../../common/Loader';


import {

  totalfeereportAction,
} from '../../redux/slices/feeSlice';
import { fetchActivesessionAction } from '../../redux/slices/sessionSlice';
;
import toast from 'react-hot-toast';

const ClassFeeReportTotal = () => {
  ///////////////////////////////////
  let date = new Date();
  date = date.toLocaleDateString("en-CA");
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
  const [total, settotal] = useState(0);
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [clazz, setclazz] = useState('-');
  const [sectionzz, setsectionzz] = useState('All Sections');
  const [propp, setProp] = useState();
  const [cartz, setcartegory] = useState(null);
  const [info, setinfo] = useState();
  const [receipt, setReceipt] = useState('');
  const [record, setRecord] = useState([]);

  const dispatch = useDispatch();

  const fee = useSelector((state) => state?.fees);

  

  const {  totalfeereport } = fee;


 
  

  useEffect(() => {
    if (totalfeereport?.success == 1) {
      let data = totalfeereport?.data;
      let total = totalfeereport?.result;

      settotal(total[0].amount == undefined ? 0 : total[0].amount);
      setdata(data);

    }
   
  }, [totalfeereport]);

 

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
  --data-table-library_grid-template-columns:  11% 24% 18% 15% 24%  8%;
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

    
  const [session, setsession] = useState();
  const [sessionid, setsessionid] = useState();

  const session1 = useSelector((state) => state?.session);
  const { fetchsessionactive, fetchsession } = session1;
  useEffect(() => {
    if (fetchsessionactive?.success == 1) {
      let data = fetchsessionactive?.data[0];
      setsession(data?.sessionname); 
      setsessionid(data?.sessioncode); 

   //   console.log('sessionz');
    }
  }, [fetchsessionactive]);



  useEffect(() => {

  if(duration == 'Custom Period'){
    setVisible(false)
  }
 else{
    setVisible(true)
  }  
  }, [duration]);
  useEffect(() => {
    dispatch(fetchActivesessionAction());
    setTimeout(() => setLoader(false), 1000);

  }, []);
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

  var data2;
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  let searchval = 'l'
console.log(nodes)
console.log(clazz)

 
  // useEffect(() => {
  // let cc =  nodes.filter((item) =>
  //     item.class === clazz
       
  //   )
  //   if(clazz == '-'){
  //     return setdata(fetchRepoert?.data)

  //   }else{
  //     return setdata(cc)

  //   }
    
 
  // }, [clazz]);
//   console.log(nodes)
// console.log(clazz)

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `${clazz} : ${sectionzz} `,
  });

  function handleGetClassData() {


    if(duration == 'Custom Period' & enddate == null & startdate == null) return toast.error('Select Start & End Dates');
    
    let data = {
   
      duration: duration,
      startdate: startdate,
      enddate: enddate,
      sessionid: sessionid

    };
    console.log(data);
  
    dispatch(totalfeereportAction(data));
  }
  
  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
     
      <div className=" flex-col">
        <div
          className={
            'rounded-sm border w-8/12 border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
          }
        >
          <div className="max-w-full overflow-x-auto">
            <div className="w-full  flex justify-between ">
               
                <div className={"flex w-full gap-3"} >
                <div className="">
                    <label
                      className="mb-2 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Select Period{' '}
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <SelectGroupTwo
                        values={['Today', 'Custom Period','Current Session']}
                        setSelectedOption={(val) => {setDuration(val)}}
                        selectedOption={duration}
                      />{' '}
                    </div>
                  </div>
                  <div className="flex gap-2 ">
                    <div className={visible ? 'hidden' :"w-full sm:w-5/12"}>
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Start Date{' '}
                      </label>
                      <div className="relative z-20 bg-white dark:bg-form-input">
                      <input
                        className=" w-full rounded border-[1.5px] border-stroke bg-transparent px-2 py-2 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="12/10/2021"
                        // data-class="flatpickr-right"
                        name="dateofbirth"
                        defaultValue=''
                        type="date"
                        onChange={(e) => {
                          setstartdate(e.target.value.trim());
                        }}
                      />                      </div>
                    </div>
                    <div className={visible ? 'hidden' :"w-full sm:w-5/12"}>
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        End Date{' '}
                      </label>
                      <div className="relative z-20 bg-white dark:bg-form-input">
                      <input
                        className=" w-full rounded border-[1.5px] border-stroke bg-transparent px-2 py-2 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="12/10/2021"
                        // data-class="flatpickr-right"
                        name="dateofbirth"
                        defaultValue=''
                        type="date"
                        onChange={(e) => {
                          setenddate(e.target.value.trim());
                        }}
                      />                      </div>
                    </div>
                    <div className=" w-2/12">
                      <label
                        className="mb-2 block text-sm font-medium  dark:text-black"
                        htmlFor=""
                      >
                        .{' '}
                      </label>
                      <div className="relative sm:w-2/12 z-20 bg-white dark:bg-form-input">
                        <button
                          onClick={() => handleGetClassData()}
                          className="btn h-10    flex justify-center rounded  bg-black py-2 px-6 font-medium text-gray hover:shadow-1"
                          type="submit"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              {/* <button onClick={() => toPDF()}>Download PDF</button> */}

              {/* <div className={' w-3/12 flex flex-col float-right '}>
                <div className="flex justify-between align-middle ">
                  <label
                    className="mb-1 w-2/2 pt-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor=" "
                  >
                    Search By ID / Firstname / LastName
                  </label>
                </div>

                <GlobalSearchInput globalResult={setdata} />
              </div> */}
            </div>
          </div>
        </div>
        <div
          className={
            'rounded-sm  w-8/12 border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
          }
        >
           <div className="flex gap-3  flex-col">
              <div>
                <Table
                  data={data}
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

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                        {tableList?.map((item) => (
                          <>
                            <Row
                              key={item.id}
                              item={item}
                              className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] "
                            >
                              <Cell className="flex   justify-between  ">
                                <span className="">{item.feeitem}</span>{' '}
                              </Cell>

                              <Cell>{item.amount}</Cell>
                            </Row>
                          </>
                        ))}
                         <Row
                            
                              className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] "
                            >
                              <Cell className="flex   justify-between  ">
                                <span className="">Total :</span>{' '}
                              </Cell>

                              <Cell>{total}</Cell>
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

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
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
    </DefaultLayout>
  );
};

export default ClassFeeReportTotal;
