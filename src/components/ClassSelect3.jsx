import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllClassAction,
} from '../redux/slices/classSlice';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const ClassSelect3 = (props) => {
  const dispatch = useDispatch();
  const [classs, setClasss] = useState([]);
  const [clazz, setclazz] = useState(props.clazz);

  const clad = useSelector((state) => state?.classes);

 
  const { fetchAllClassloading, fetchAllClass } =
    clad;

  useEffect(() => {

    if (fetchAllClass?.success == 1) {
      let i = 0;
      let arr = ['None'];
      while (i < clad?.fetchAllClass?.data.length) {
        arr.push(clad?.fetchAllClass?.data[i].title);
        i++;
      }

      

      setClasss(arr);
      setclazz(arr[0]);


    }

  }, [fetchAllClassloading ]);

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

export default ClassSelect3;
