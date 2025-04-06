import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const ExpenseHeadSelect = (props) => {
  const [cart, setcart] = useState([]);
  const [cartzz, setcartzz] = useState();
  const [selecter, setselecter] = useState([]);

  const expense = useSelector((state) => state?.expense);

  const { fetchexpensehead} =
  expense;

    useEffect(() => {


        props.setsectionprop(cartzz)
    }, [cartzz]);


  useEffect(() => {
    if (fetchexpensehead?.success == 1) {
      let arrr = [];
      let select = [];

      let i = 0;
      while (i < expense?.fetchexpensehead?.data.length) {
        arrr.push(expense?.fetchexpensehead?.data[i]?.expensehead);
        select.push(expense?.fetchexpensehead?.data[i]);

        i++;
      }
      setselecter(select)

      setcart(arrr);
      setcartzz(arrr[0]);
    }
  }, [fetchexpensehead]);
  useEffect(() => {
    props.setsectionprop(clazz);
    props.selectinfo(selecter.filter((item) =>
      item.expensehead === clazz))
  }, [clazz]);

  return (
    <>
      <SelectGroupTwo
        values={cart}
        setSelectedOption={setcartzz}
        selectedOption={cartzz}
      />
    </>
  );
};

export default ExpenseHeadSelect;
