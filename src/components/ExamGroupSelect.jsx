import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllClassAction,
} from '../redux/slices/classSlice';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';



const ExamGroupSelect = (props) => {

  
  const dispatch = useDispatch();
  const [classs, setClasss] = useState([]);
  const [clazz, setclazz] = useState();

  const exam = useSelector((state) => state?.exam);
  const {examgroup,createxamgroup  } = exam;
  useEffect(() => {

    if (examgroup?.success == 1) {
      let i = 0;
      let arr = ['None'];
      while (i < examgroup?.data.length) {
        arr.push(examgroup?.data[i].grouptitle);
        i++;
      }

      

      setClasss(arr);
      setclazz(arr[0]);


    }

  }, [examgroup ]);

  useEffect(() => {
    props.setsectionprop(clazz)
  }, [clazz]);




  return (

    <>
      <SelectGroupTwo
        values={classs}
        setSelectedOption={setclazz}
        selectedOption={clazz}
      />
    </>
  );
};

export default ExamGroupSelect;
