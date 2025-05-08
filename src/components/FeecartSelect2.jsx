import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const FeeCartSelect2 = (props) => {
  const dispatch = useDispatch();
  const [classs, setClasss] = useState([]);
  const [clazz, setclazz] = useState(props.clazz);
  const [selecter, setselecter] = useState([]);

  const fees = useSelector((state) => state?.fees);

  const { cartegory, CreateScholar } = fees;

  useEffect(() => {
    if (cartegory?.success == 1) {
      let i = 0;
      // let arr = [];
      let arr = ['-'];
      let select = [];


      while (i < fees?.cartegory?.data.length) {
        arr.push(fees?.cartegory?.data[i].name);
        select.push(fees?.cartegory?.data[i]);

        i++;
      }
      setselecter(select)

      setClasss(arr);
      setclazz(arr[0]);
    }
  }, [cartegory]);

  useEffect(() => {
    props.setsectionprop(clazz);
    console.log(clazz)
    props.selectinfo(selecter.filter((item) =>
      item.name === clazz))
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

export default FeeCartSelect2;
