import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  customSectionAction,
  fetchAllClassAction,
  fetchAllClassNoAction,
} from '../redux/slices/classSlice';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const ClassSelect4 = (props) => {
  useEffect(() => {
    // dispatch(fetchAllClass());
    dispatch(fetchAllClassNoAction());
  }, []);
  const dispatch = useDispatch();
  const [classs, setClasss] = useState([]);
  const [clazz, setclazz] = useState(props.clazz);
  const clad = useSelector((state) => state?.classes);
  const [val, setVal] = useState([]);
  const [selecter, setselecter] = useState([]);

console.log(selecter)
  const { fetchAllClassloading, fetchAllClass, fetchAllClassNo } = clad;

  useEffect(() => {
    let arr = [];
    let i = 0;

    if (fetchAllClassNo) {
      for (const element of fetchAllClassNo?.data) {
        if (clazz == element?.title) {
          arr.push(element?.section);

        }

        i++;
        setVal(arr);

      }
    }
  }, [clazz]);

  useEffect(() => {
    dispatch(customSectionAction(val));
  }, [val]);

  useEffect(() => {
    if (fetchAllClass?.success == 1) {
      let i = 0;
      let arr = ['-','GRADUATED'];
      let select = [];

      while (i < clad?.fetchAllClass?.data.length) {
        arr.push(clad?.fetchAllClass?.data[i].title);
        select.push(clad?.fetchAllClass?.data[i]);

        i++;
      }
      setselecter(select)

      setClasss(arr);
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

export default ClassSelect4;

