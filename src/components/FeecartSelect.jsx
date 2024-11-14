import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const FeeCartSelect = (props) => {
  const dispatch = useDispatch();
  const [classs, setClasss] = useState([]);
  const [clazz, setclazz] = useState(props.clazz);

  const fees = useSelector((state) => state?.fees);

  const { cartegory, CreateScholar } = fees;

  useEffect(() => {
    if (cartegory?.success == 1) {
      let i = 0;
      let arr = [];
     // let arr = ['FEE PAYABLE'];

      while (i < fees?.cartegory?.data.length) {
        arr.push(fees?.cartegory?.data[i].name);
        i++;
      }

      setClasss(arr);
      setclazz(arr[0]);
    }
  }, [cartegory]);

  useEffect(() => {
    props.setsectionprop(clazz);
    console.log(clazz)
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

export default FeeCartSelect;
