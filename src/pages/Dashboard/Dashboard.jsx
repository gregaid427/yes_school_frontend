import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';

import ChartTwo from '../../components/Charts/ChartTwo';

import DefaultLayout from '../../layout/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import {
  chart1StatAction,
  chartStatAction,
  classStatAction,
  studentStatAction,
  subjectStatAction,
  teacherStatAction,
} from '../../redux/slices/statisticsSlice';
import useAuth from '../../useAuth';
import ChartThree from '../../components/Charts/ChartThree';

const Dashboard = () => {
  const dispatch = useDispatch();

  const statistics = useSelector((state) => state?.statistics);
  const {
    studentStat,
    classStat,
    teacherStat,
    subjectStat,
    chartStat,
    chart1Stat,
  } = statistics;

  const { setAuth, auth } = useAuth();

  useEffect(() => {
    dispatch(studentStatAction());
    dispatch(classStatAction());
    dispatch(subjectStatAction());
    dispatch(teacherStatAction());
    dispatch(chartStatAction());
    dispatch(chart1StatAction());

    // dispatch(());
  }, []);

  const [student, setStudent] = useState('loading...');
  const [classes, setClasses] = useState('loading...');

  const [teachers, setTeachers] = useState('loading...');
  const [subjects, setSubjects] = useState('loading...');
  const [donutclass, setDonutClass] = useState([]);
  const [donutcount, setDonutcount] = useState([]);

  const [n1, setn1] = useState(0);
  const [n2, setn2] = useState(0);
  const [n3, setn3] = useState(0);
  const [n4, setn4] = useState(0);
  const [n5, setn5] = useState(0);
  const [n6, setn6] = useState(0);
  const [n7, setn7] = useState(0);
  const [n8, setn8] = useState(0);
  const [n9, setn9] = useState(0);
  const [n10, setn10] = useState(0);
  const [n11, setn11] = useState(0);
  const [n12, setn12] = useState(0);

  useEffect(() => {
    if (studentStat?.success == 1) {
      setStudent(studentStat?.data[0].noStudent);
    }
  }, [studentStat]);

  useEffect(() => {
    if (classStat?.success == 1) {
      setClasses(classStat?.data[0].noclass);
    }
  }, [classStat]);

  useEffect(() => {
    if (teacherStat?.success == 1) {
      setTeachers(teacherStat?.data[0].noStaff);
    }
  }, [teacherStat]);

  useEffect(() => {
    if (subjectStat?.success == 1) {
      setSubjects(subjectStat?.data[0].nosubject);
    }
  }, [subjectStat]);

  useEffect(() => {
    if (chart1Stat?.success == 1) {
      let myCountArr = [];
      let myclassArr = [];

      for (const element of chart1Stat?.data) {
        myclassArr.push(element.class);
        myCountArr.push(element.count);
        setDonutClass(myclassArr);
        setDonutcount(myCountArr);
      }
    }
  }, [chart1Stat]);

  useEffect(() => {
    if (chartStat?.success == 1) {
      let i = 0;

      let arr = chartStat?.data;
      while (i < chartStat?.data.length) {
        // console.log(arr[i]?.month)
        // console.log(arr[i].total_value)

        if (arr[i]?.month == 1) {
          setn1(arr[i].total_value);
        }
        if (arr[i]?.month == 2) {
          setn2(arr[i].total_value);
        }
        if (arr[i]?.month == 3) {
          setn3(arr[i].total_value);
        }
        if (arr[i]?.month == 4) {
          setn4(arr[i].total_value);
        }
        if (arr[i]?.month == 5) {
          setn5(arr[i].total_value);
        }
        if (arr[i]?.month == 6) {
          setn6(arr[i].total_value);
        }
        if (arr[i]?.month == 7) {
          setn7(arr[i].total_value);
        }
        if (arr[i]?.month == 8) {
          setn8(arr[i].total_value);
        }
        if (arr[i]?.month == 9) {
          setn9(arr[i].total_value);
        }
        if (arr[i]?.month == 10) {
          setn10(arr[i].total_value);
        }
        if (arr[i]?.month == 11) {
          setn11(arr[i].total_value);
        }
        if (arr[i]?.month == 12) {
          setn12(arr[i].total_value);
        }

        ///  arr.push(clad?.fetchAllClass?.data[i].title);
        i++;
      }
    }
  }, [chartStat]);

  console.log([n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Students" total={student}>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Classes" total={classes}>
          <svg
            className="fill-primary dark:fill-white"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_130_9807)">
              <path
                d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V7.53335C0.506348 8.4896 1.29385 9.2771 2.2501 9.2771H15.7501C16.7063 9.2771 17.4938 8.4896 17.4938 7.53335V2.3021C17.4938 1.34585 16.7063 0.55835 15.7501 0.55835ZM16.2563 7.53335C16.2563 7.8146 16.0313 8.0396 15.7501 8.0396H2.2501C1.96885 8.0396 1.74385 7.8146 1.74385 7.53335V2.3021C1.74385 2.02085 1.96885 1.79585 2.2501 1.79585H15.7501C16.0313 1.79585 16.2563 2.02085 16.2563 2.3021V7.53335Z"
                fill=""
              ></path>
              <path
                d="M6.13135 10.9646H2.2501C1.29385 10.9646 0.506348 11.7521 0.506348 12.7083V15.8021C0.506348 16.7583 1.29385 17.5458 2.2501 17.5458H6.13135C7.0876 17.5458 7.8751 16.7583 7.8751 15.8021V12.7083C7.90322 11.7521 7.11572 10.9646 6.13135 10.9646ZM6.6376 15.8021C6.6376 16.0833 6.4126 16.3083 6.13135 16.3083H2.2501C1.96885 16.3083 1.74385 16.0833 1.74385 15.8021V12.7083C1.74385 12.4271 1.96885 12.2021 2.2501 12.2021H6.13135C6.4126 12.2021 6.6376 12.4271 6.6376 12.7083V15.8021Z"
                fill=""
              ></path>
              <path
                d="M15.75 10.9646H11.8688C10.9125 10.9646 10.125 11.7521 10.125 12.7083V15.8021C10.125 16.7583 10.9125 17.5458 11.8688 17.5458H15.75C16.7063 17.5458 17.4938 16.7583 17.4938 15.8021V12.7083C17.4938 11.7521 16.7063 10.9646 15.75 10.9646ZM16.2562 15.8021C16.2562 16.0833 16.0312 16.3083 15.75 16.3083H11.8688C11.5875 16.3083 11.3625 16.0833 11.3625 15.8021V12.7083C11.3625 12.4271 11.5875 12.2021 11.8688 12.2021H15.75C16.0312 12.2021 16.2562 12.4271 16.2562 12.7083V15.8021Z"
                fill=""
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_130_9807">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(0 0.052124)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </CardDataStats>
        <CardDataStats title="Staff" total={teachers}>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Subjects" total={subjects}>
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.21875 18.0625H3.21875C2.90625 18.0625 2.65625 17.8125 2.65625 17.5V2.5C2.65625 2.1875 2.90625 1.9375 3.21875 1.9375H10.2812V5.9375C10.2812 6.3125 10.5938 6.65625 11 6.65625H14.9688V8.75C14.9688 9.125 15.2812 9.46875 15.6875 9.46875C16.0938 9.46875 16.4062 9.15625 16.4062 8.75V6.125C16.4062 5.78125 16.25 5.4375 16 5.1875L11.625 0.937499C11.375 0.687499 11.0312 0.562499 10.6875 0.562499H3.1875C2.125 0.531249 1.25 1.4375 1.25 2.5V17.5C1.25 18.5625 2.125 19.4688 3.21875 19.4688H7.25C7.625 19.4688 7.96875 19.1562 7.96875 18.75C7.96875 18.3438 7.625 18.0625 7.21875 18.0625ZM11.6562 2.9375L14 5.25H11.6562V2.9375Z"
              fill=""
            ></path>
            <path
              d="M18.5 11.75C18.25 11.5 18 11.25 17.75 11C17.5312 10.7813 17.3125 10.5312 17.0625 10.3125C16.9375 10.1563 16.75 10.0313 16.5313 10C16.2813 9.96875 16.0313 10.0312 15.8438 10.1875L10.4062 15.5938C10.25 15.75 10.1562 15.9062 10.0937 16.0938L9.3125 18.4687L9.1875 18.8438L9.40625 19.125C9.5 19.25 9.6875 19.4375 10.0312 19.4375H10.1563L12.625 18.625C12.8125 18.5625 13 18.4687 13.125 18.3125L18.5 12.9688C18.6562 12.8125 18.75 12.5938 18.75 12.3438C18.75 12.125 18.6562 11.9062 18.5 11.75ZM16.4062 11.625C16.5312 11.75 16.6562 11.875 16.75 12C16.875 12.125 17 12.25 17.125 12.375L16.7813 12.7188L16.0625 12L16.4062 11.625ZM12.1563 17.3125L11.0625 17.6562L11.4062 16.5625L15.0312 12.9375L15.75 13.6563L12.1563 17.3125Z"
              fill=""
            ></path>
          </svg>
        </CardDataStats>
      </div>
      <div className="flex gap-4">
        <div className="mt-4 w-full gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          {/* <ChartOne /> */}
          {/* <div className="col-span-12 xl:col-span-5">
          <TableOne />
        </div> */}
          <ChartTwo
            data={[n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]}
          />

          {/* <ChartThree /> */}
          {/* <MapOne /> */}

          {/* <ChatCard /> */}
        </div>
        {/* <div className="mt-4 w-4/12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 ">
            <ChartThree class={donutclass} count={donutcount} />
          </div>
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
