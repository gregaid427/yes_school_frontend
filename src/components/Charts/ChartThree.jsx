import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';




const ChartThree  = (props) => {
  const options= {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF','#FFAB47','#65AB0A','#FFAB0A','#EE82EE','#3CB371','#DCDCDC','#FFA500','#0000FF','#F8F8F8','#404040','#686868','#650F0A','#650FAC','#650F1E','#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF','#FFAB47','#65AB0A','#FFAB0A','#EE82EE','#3CB371','#DCDCDC','#FFA500','#0000FF','#F8F8F8','#404040','#686868','#650F0A','#650FAC','#650F1E'],
    labels: props.class,
    legend: {
      show: true,
      position: 'bottom',
    },
  
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };
  const [count, setcount] = useState([]);

  const [state, setState] = useState({
    series: props.count,
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: props.count,
    }));
  };
  handleReset;


//   const [clas, setclass] = useState([])

//   const [state, setState] = useState({
//     series: count,
//   });
// ;

//   const handleReset = () => {
//     setState((prevState) => ({
//       ...prevState,
//       series: count,
//     }));
//   };
  
  useEffect(() => {
setcount(props.count)
    setState((prevState) => ({
      ...prevState,
      series: count,
    }));
  }, [props]);

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-5 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Class Sizes
          </h5>
        </div>
      
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
