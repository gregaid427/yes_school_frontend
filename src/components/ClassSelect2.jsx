import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllClassAction } from '../redux/slices/classSlice';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const ClassSelect2 = (props) => {
  const dispatch = useDispatch();
  const [classs, setClasss] = useState([]);
  const [clazz, setclazz] = useState();
  const [selecter, setselecter] = useState([]);

  const clad = useSelector((state) => state?.classes);

  const { fetchAllClassloading, fetchAllClass } = clad;

  useEffect(() => {
    if (fetchAllClass?.success == 1) {
      let i = 0;
      let arr = [];
      let select = [];

      while (i < clad?.fetchAllClass?.data.length) {
        arr.push(clad?.fetchAllClass?.data[i].title);
        select.push(clad?.fetchAllClass?.data[i]);

        i++;
      }
      setselecter(select)

      setClasss(arr);
      setclazz(arr[0]);
      clazz == undefined ? setclazz(arr[0]): setclazz(props.clazz);

    }
  }, [fetchAllClassloading]);

  useEffect(() => {
    props.setsectionprop(clazz);
    props.selectinfo(selecter.filter((item) =>
      item.title === clazz))
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

export default ClassSelect2;
