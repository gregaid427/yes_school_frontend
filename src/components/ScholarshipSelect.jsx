import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';
import { fetchScholarshipAction } from '../redux/slices/feeSlice';

const ScholarshipSelect = (props) => {
  const dispatch = useDispatch();
  const [classs, setClasss] = useState([]);
  const [clazz, setclazz] = useState(props.clazz);

  const fee = useSelector((state) => state?.fees);
  const { CreateScholar } = fee;

  useEffect(() => {
    dispatch(fetchScholarshipAction());
  }, []);
  console.log(CreateScholar?.data);
  useEffect(() => {
    if (CreateScholar?.success == 1) {
      let i = 0;
      let arr = ['None'];
      while (i < CreateScholar?.data.length) {
        arr.push(CreateScholar?.data[i].title);
        i++;
      }

      setClasss(arr);
      setclazz(arr[0]);
    }
  }, [CreateScholar]);

  useEffect(() => {
    props.setsectionprop(clazz);
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
