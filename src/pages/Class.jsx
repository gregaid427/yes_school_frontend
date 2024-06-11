import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import SelectGroupTwo from '../components/Forms/SelectGroup/SelectGroupTwo';
import userThree from '../images/user/user-03.png';
import DefaultLayout from '../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import GradesSideElement from './GradesSideElement';
import ExpenseSideElement from './ExpenseSideElement';
import ViewSVG from '../components/Svgs/View';
import DeleteSVG from '../components/Svgs/delete';
import EditSVG from '../components/Svgs/edit';
import CheckboxOne from '../components/Checkboxes/CheckboxOne';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
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
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBulkStudent } from '../redux/slices/studentSlice';
import StudentSideElement from './StudentSideElement';
import Loader from '../common/Loader';


const Class = () => {
  const [loader, setLoader] = useState(true);

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const [age, setAge] = useState<string>('');
  const [nodes, setdata] = useState([]);

  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student);
  const { loading, error, fetchStudent } = student;

  useEffect(() => {
      dispatch(fetchBulkStudent());
      console.log('mm')

  }, []);

  useEffect(() => {
    console.log('kkkkkkkkk')
    setTimeout(() => setLoader(false), 1000);

    if (fetchStudent?.success == 1) {
      let data = fetchStudent?.data;
      setdata(data);
    }
    // if (loading == false) {
    //   dispatch(fetchBulkStudent());
    // }

 
    // }
    // datas = data;

  }, [loading]);

 


  let data = { nodes };

  let vv = '#eaf5fd';
  const theme = useTheme([
    getTheme(),
    {
    },
  ]);

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 2,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
  }



  const [search, setSearch] = useState('');

  const handleviewbtn = (value) => {
    console.log(value);
  };

  data = {
    nodes: data.nodes.filter((item) =>
      item.firstName.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(printRef.current);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('print.pdf');
  };

  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});



  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div className={'flex gap-2  w-full'}>
        <div className="w-8/12 flex-col">
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-6 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full  flex justify-between ">
                <div className=" flex w-9/12 gap-3">
                  <div className="sm:w-1/3 ">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Class
                    </label>

                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <SelectGroupTwo
                        values={['Grade1', 'Grade 2']}
                        setSelectedOption={setAge}
                        selectedOption={age}
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/3">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Section{' '}
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <SelectGroupTwo
                        values={['A', 'B']}
                        setSelectedOption={setAge}
                        selectedOption={age}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/3 flex flex-col justify-end  ">
                    <button
                      className="btn sm:w-2/3     flex justify-center rounded  bg-black py-2 px-3 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                </div>

                <div className={' w-3/12 flex flex-col float-right '}>
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Search Result{' '}
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-2 px-1.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    key={1}
                    type="search"
                    placeholder={'search by name'}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                           {/* <button onClick={() => toPDF()}>Download PDF</button> */}

                </div>
              </div>
            </div>
          </div>
          <div
            className={
              'rounded-sm  w-full border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
            }
          >
            <div  className="flex gap-3  flex-col">
              <div ref={printRef}>
                <Table ref={targetRef} data={data} pagination={pagination} theme={theme}>
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow className="dark:bg-meta-4 dark:text-white  ">
                          <HeaderCell>id</HeaderCell>
                          <HeaderCell>Class</HeaderCell>
                          <HeaderCell>Section</HeaderCell>
                          <HeaderCell>Actions</HeaderCell>
                        </HeaderRow>
                      </Header>

                      <Body>
                        {tableList.map((item) => (
                          <Row
                            key={item.id}
                            item={item}
                            className="dark:bg-dark border dark:bg-boxdark dark:border-strokedark dark:text-white dark:hover:text-white "
                          >
                            <Cell className="  "><span >{item.id}</span></Cell>
                            <Cell>
                              {/* {item.firstName +
                                ' ' +
                                item.otherName +
                                ' ' +
                                item.lastName} */}
                              Grade 1
                            </Cell>
                            <Cell>A</Cell>
                            <Cell>
                              <div className="gap-2 flex">
                                <ViewSVG
                                  clickFunction={() => handleviewbtn(item.id)}
                                />
                                <EditSVG
                                  clickFunction={() => handleviewbtn(item.id)}
                                />

                                <DeleteSVG
                                  clickFunction={() => handleviewbtn(item.id)}
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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  Total Pages: {pagination.state.getTotalPages(data.nodes)}
                </span>

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
            </div>{' '}
          </div>
        </div>
        <div className="w-4/12 mr-5">
          <div className="grid  gap-8">
            <div className="col-span-12">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Add Class
                  </h3>
                </div>
                <div className="p-7">
                  <form action="#">
                    <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Class Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>

                    <div className="w-full sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Class Instructor{' '}
                        <span className="small-font">(optional)</span>
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>

                    <div className="pb-10">
                      <CheckboxOne
                        title="A"
                        isChecked={isChecked1}
                        toggle={setIsChecked1}
                        id="checkboxLabelOne"
                      />
                      <CheckboxOne
                        title="B"
                        isChecked={isChecked2}
                        toggle={setIsChecked2}
                        id="checkboxLabelOne1"
                      />
                      <CheckboxOne
                        title="C"
                        isChecked={isChecked2}
                        toggle={setIsChecked2}
                        id="checkboxLabelOne1"
                      />
                    </div>

                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                      >
                        Save
                      </button>
                      <button
                        className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="reset"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </DefaultLayout>
  );
};

export default Class;
