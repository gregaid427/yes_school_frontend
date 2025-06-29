import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
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
import { mkConfig, generateCsv, download } from 'export-to-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import toast from 'react-hot-toast';
import {
  CreatesSubjectAction,
  DeleteSingleSubjectAction,
  fetchSubjectAction,
  resetcreatesubject,
} from '../../redux/slices/subjectSlice';
import SessionSelect from '../../components/SessionSelect';
import EditSVG from '../../components/Svgs/edit';
import DeleteSVG from '../../components/Svgs/delete';
import Loader from '../../common/Loader';
import DefaultLayout from '../../layout/DefaultLayout';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import {
  CreateExamGroupAction,
  CreateExamRemarksAction,
  DeleteCartecoryAction,
  FetchExamGroupAction,
  GetExamRemarksAction,
  resetcreategroup,
  resetExamCart,
  resetexamremarksgroup,
} from '../../redux/slices/examSlice';
import { fetchAllsessionAction } from '../../redux/slices/sessionSlice';
import { Dialog } from 'primereact/dialog';
import NewExamsModal from '../../components/NewExamsModal';
import ExamCartegoryModal from '../../components/ExamCartegoryModal';
import DeleteModal from '../../components/DeleteModal';
import ExamremarksModal from '../../components/ExamremarksModal';
import EditremarksModal from '../../components/EditremarksModal';

const ExamRemarksGroup = () => {
  const [pagesval, setpagesval] = useState(30);
  const [loader, setLoader] = useState(true);

  const [sessionoption, setSessionoption] = useState('');

  const [name, setname] = useState('');
  const [del, setDel] = useState();

  const [nodes, setdata] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const exam = useSelector((state) => state?.exam);
  const { examgroup, GetExamRemark, GetExamRemarks, DeleteCartecory } =
    exam;

  useEffect(() => {
    dispatch(GetExamRemarksAction());
   // dispatch(fetchAllsessionAction());
  }, []);

  // useEffect(() => {
  //   if (GetExamRemarks?.success == 0) {
  //   }
  //   if (GetExamRemarks?.success == 1) {
  //   //  setVisible(false);

  //     //dispatch(resetexamremarksgroup());
  //   }
  // }, [GetExamRemarks]);

  useEffect(() => {
    if (DeleteCartecory?.success == 0) {
    }
    if (DeleteCartecory?.success == 1) {
      setVisible1(false);
    }
  }, [DeleteCartecory]);

  useEffect(() => {
    if (GetExamRemark?.success == 0) {
      dispatch(resetcreategroup());
    }
    if (GetExamRemark?.success == 1) {
      let data = GetExamRemark?.data;
      setdata(data);
      dispatch(resetexamremarksgroup());
      setVisible(false)
          setVisible4(false);

    }
  }, [GetExamRemark]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);

    if (examgroup?.success == 1) {
      let data = examgroup?.data;
      setdata(data);
    }
  }, [examgroup]);

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
  --data-table-library_grid-template-columns:  2% 78%   20%;
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
      size: 30,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {}

  const [search, setSearch] = useState('');
  console.log(data);

  function onPaginationChange(action, state) {}

  const handleEditbtn = (value) => {
    setVisible4(true);
    setVal(value);
  };
  const handledeletebtn = (value) => {
    dispatch(DeleteCartecoryAction({ id: del }));
  };
  const user = useSelector((state) => state?.user);
  const { username, userMail } = user;
  const subdata = {
    // session: sessionoption,
    title: name.toUpperCase(),
    createdby: username?.payload,
  };
  const handlecreateSection = (e) => {
    if (name == '') {
      toast.error('Error - Text Cannot Be Empty');
    } else {
      dispatch(CreateExamRemarksAction(subdata));
    }
  };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    autoTable(doc, { html: '#my-table' });

    doc.save(`All-Subject-List`);
  };

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `All-Subject-List`,
  });

  const handleDownloadCSV = async () => {
    const csv = generateCsv(csvConfig)(nodes);
    download(csvConfig)(csv);
  };
  const [visible1, setVisible1] = useState(false);
  const [visible, setVisible] = useState(false);
    const [visible4, setVisible4] = useState(false);

  const [val, setVal] = useState({});
  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '50%' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <ExamremarksModal close={setVisible} val={val} />
      </Dialog>
       <Dialog
        visible={visible4}
        position={'top'}
        style={{ height: 'auto', width: '50%' }}
        onHide={() => {
          if (!visible4) return;
          setVisible4(false);
        }}
      >
        <EditremarksModal close={setVisible4} val={val} />
      </Dialog>
      <Dialog
        visible={visible1}
        position={'top'}
        style={{ height: 'auto', width: '40%' }}
        onHide={() => {
          if (!visible1) return;
          setVisible1(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DeleteModal delete={handledeletebtn} close={setVisible1} />
      </Dialog>
      <div className={'flex gap-2 w-full'}>
        <div className="w-full flex-col">
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  Remarks Cartegory List
                </h3>
              </div>
            </div>
          </div>
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5  '
            }
          >
            <button
              onClick={() => setVisible(true)}
              className="btn h-10    flex justify-center rounded  bg-primary py-2 px-3 font-medium text-gray hover:shadow-1"
              type="submit"
            >
              Add Remarks
            </button>
          </div>
          <div
            className={
              'rounded-sm  w-full border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
            }
          >
            <div className="flex gap-3  flex-col">
              <div className="px-2">
                <Table
                  data={data}
                  pagination={pagination}
                  layout={{ custom: true }}
                  theme={theme}
                >
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex ">
                          <HeaderCell>#</HeaderCell>
                                                    <HeaderCell>Remarks</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                        {tableList?.map((item) => (
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] "
                          >
                            <Cell className="  ">{item.id} </Cell>
                              <Cell className="  "> {item.text}</Cell>


                            <Cell>
                              <div className="gap-2 flex">
                                <EditSVG
                                  clickFunction={() => handleEditbtn(item)}
                                />

                                <DeleteSVG
                                  clickFunction={() => {
                                    setDel(item.id);
                                    setVisible1(true);
                                  }}
                                />
                              </div>
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
                  layout={{ custom: true }}
                >
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white flex ">
                          <HeaderCell>Subject</HeaderCell>

                          <HeaderCell>Type</HeaderCell>

                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body className="dark:border-strokedark dark:bg-boxdark  text-black  border-stroke bg-white dark:text-white flex dark:hover:bg-black hover:bg-[#EFF4FB] ">
                        {tableList?.map((item) => (
                          <Row
                            key={item?.id}
                            item={item}
                            className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
                          >
                            <Cell className="  ">{item?.subjectname}</Cell>

                            <Cell className="  ">{item?.type}</Cell>
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

export default ExamRemarksGroup;

{
  /* <div className="grid  w-4/12  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
<div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
  <h3 className="font-medium text-black dark:text-white">
    Add Exam Cartegory
  </h3>
</div>

</div> */
}
