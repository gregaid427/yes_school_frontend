import React, { useEffect, useState } from 'react';

function ExamResultInput(props) {
  const [examScore, setExamScore] = useState('option1');
  const [classScore, setClassScore] = useState('option1');
  const [otherScore, setOtherScore] = useState('option1');

  const handleInputChangeExam = (e, data, stdid) => {

    for(let i = 0; i < props.resultData?.length; i++ ){
           // console.log(props.cart[i].feeid)
    
           if (stdid == data[i].student_id) {
            // item.examScore = e.target.value.trim();
             console.log(props.resultData[i].examScore)
             let arr = props.resultData
            let bb = arr[i].examScore = 6
            console.log(bb)
            // props.setResult()
           }
          }
        

    //  data.map((item) => {
    //   // if (stdid == item.student_id) {
    //   //  // item.examScore = e.target.value.trim();
    //   //   console.log(stdid)
    //   //   //props.setResult()
    //   // }
   
   
   
   
    // });
   // props.setResult(newItemList);
  };




  
  useEffect(() => {}, [props.reset]);

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  const styles = {
    radioButton: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '4px',
    },
  };

  return (
    <div className="flex row gap-1 w-full">
      <input
        className="w-4/12 rounded border border-stroke bg-gray px-1 mx-1 my-2 py-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        //  key={1}
        type=""
        onChange={(e) => {
          //  console.log(props.info)
            handleInputChangeExam(e,props.resultData,props.info?.student_id)
        }}
      />
      <input
        className="w-4/12 rounded border border-stroke bg-gray px-1 mx-1 my-2 py-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        //key={1}
        type=""
        onChange={(e) => {
          //  setSearch(e.target.value.trim());
        }}
      />
      <input
        className="w-4/12 rounded border border-stroke bg-gray px-1 mx-1 my-2 py-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        // key={1}
        type=""
        onChange={(e) => {
          //  setSearch(e.target.value.trim());
        }}
      />
    </div>
  );
}

export default ExamResultInput;
