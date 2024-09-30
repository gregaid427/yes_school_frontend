import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllClassAction,
} from '../redux/slices/classSlice';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';



const ExamGrading = (props) => {

  
  const dispatch = useDispatch();
  const [classs, setClasss] = useState([]);
  const [clazz, setclazz] = useState();

  const exam = useSelector((state) => state?.exam);
  const {examgroup,fetchGradegroup  } = exam;
  useEffect(() => {

    if (fetchGradegroup?.success == 1) {
      let i = 0;
      let arr = ['None'];
      while (i < fetchGradegroup?.data.length) {
        arr.push(fetchGradegroup?.data[i].gradetitle);
        i++;
      }

      

      setClasss(arr);
      setclazz(arr[0]);


    }

  }, [fetchGradegroup ]);

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

export default ExamGrading;
