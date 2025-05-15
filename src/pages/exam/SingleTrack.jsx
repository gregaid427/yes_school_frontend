import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
  DeleteCartecoryAction,
  FetchExamGroupAction,
  resetcreategroup,
  resetExamCart,
} from '../../redux/slices/examSlice';
import { fetchAllsessionAction } from '../../redux/slices/sessionSlice';
import { Dialog } from 'primereact/dialog';
import NewExamsModal from '../../components/NewExamsModal';
import ExamCartegoryModal from '../../components/ExamCartegoryModal';
import DeleteModal from '../../components/DeleteModal';
import ChartTwo from '../../components/Charts/ChartTwo';
import Chartfour from '../../components/Charts/Chartfour';

const SingleTrack = (props) => {
  const [info, setinfo] = useState(['']);
  const [stdinfo, setstdinfo] = useState('');

  const [loader, setLoader] = useState(true);

  const [value, setval] = useState([0]);

  const [name, setname] = useState('');
  const [del, setDel] = useState();

  const [nodes, setdata] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
   console.log(props)
     
      let key = props.value.map((obj) => obj.session);
      let val = props.value.map((obj) => obj.overallscore);

      setinfo(key);
      setval(val);
      setstdinfo(props.info);
    
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
  --data-table-library_grid-template-columns:  70%   30%;
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
  data = {
    nodes: data.nodes.filter((item) =>
      item.grouptitle.toLowerCase().includes(search.toLowerCase()),
    ),
  };
  useEffect(() => {
    setdata([]);
  }, []);
  function onPaginationChange(action, state) {}

  const handleEditbtn = (value) => {
    setVisible(true);
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
      toast.error('Error - Title Cannot Be Empty');
    } else {
      dispatch(CreateExamGroupAction(subdata));
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

  const options = {
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '25%',
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        columnWidth: '50%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: {
      enabled: true,
    },

    xaxis: {
      categories: info,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',

      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const [visible1, setVisible1] = useState(false);
  const [visible, setVisible] = useState(false);
  const [val, setVal] = useState('Loading...');
  return false ? (
    <Loader />
  ) : (
    <>
      <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '30%' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <ExamCartegoryModal close={setVisible} val={val} />
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
        <div className="w-full flex-col">
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto flex justify-between">
              <div className="w-full  flex justify-between  ">
                <h3 className="font-medium text-black py-3 dark:text-white">
                  Student Performance Tracker
                </h3>
              </div>
              <button
            className="flex w-2/12 justify-center rounded bg-primary py-2 px-2 h-10 mt-1 font-medium text-gray hover:bg-opacity-90"
            type=""
            onClick={(e) => {
              e.preventDefault();
              props.close(false);
            }}
            
          >
            Close
          </button>
            </div>
          </div>
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full   ">
                <div className=" flex w-7/12 ">
                  <div className="w-2/12 ">
                    <label className=" block text-sm font-medium text-ash dark:text-white">
                      Student Id
                    </label>
                  </div>

                  <div className=" w-full">
                    <label className=" block text-sm font-medium text-ash dark:text-white">
                      {stdinfo?.student_id}
                    </label>
                  </div>
                </div>
                <div className=" flex w-7/12 ">
                  <div className="w-2/12 ">
                    <label className="block text-sm font-medium text-ash dark:text-white">
                      Name
                    </label>
                  </div>

                  <div className=" w-full">
                    <label className="block text-sm font-medium text-ash dark:text-white">
                      {stdinfo?.firstName +
                        ' ' +
                        stdinfo?.otherName +
                        ' ' +
                        stdinfo?.lastName}
                    </label>
                  </div>
                </div>
                <div className=" flex w-7/12 ">
                  <div className="w-2/12 ">
                    <label className="block text-sm font-medium text-ash dark:text-white">
                      Class
                    </label>
                  </div>

                  <div className=" w-full">
                    <label className="block text-sm font-medium text-ash dark:text-white">
                      {stdinfo?.class} ({stdinfo?.section})
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              'rounded-sm  w-full border border-stroke bg-white px-2 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark '
            }
          >
            <div>
              <Chartfour options={options} data={value} />
            </div>
          </div>{' '}
        </div>
      </>
  );
};

export default SingleTrack;

{
  /* <div className="grid  w-4/12  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
<div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
  <h3 className="font-medium text-black dark:text-white">
    Add Exam Cartegory
  </h3>
</div>

</div> */
}
