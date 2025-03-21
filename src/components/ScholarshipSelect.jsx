import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';
import { fetchScholarshipAction } from '../redux/slices/feeSlice';

const ScholarshipSelect = (props) => {
  const dispatch = useDispatch();
  const [classs, setClasss] = useState([]);
  const [clazz, setclazz] = useState(props.clazz);
  const [selecter, setselecter] = useState([]);

  const fee = useSelector((state) => state?.fees);
  const { CreateScholar } = fee;

  useEffect(() => {
    dispatch(fetchScholarshipAction());
  }, []);
  console.log(CreateScholar?.data);
  let selectArr = [];

  useEffect(() => {
    if (CreateScholar?.success == 1) {
      let i = 0;
      let arr = ['None'];
      let select = [];

      while (i < CreateScholar?.data.length) {
        arr.push(CreateScholar?.data[i].title);
        select.push(CreateScholar?.data[i]);
        i++;
      }
      console.log(select)

      setselecter(select)
      setClasss(arr);
      setclazz(arr[0]);
    }
  }, [CreateScholar]);
  console.log(selecter)


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

export default ScholarshipSelect;
