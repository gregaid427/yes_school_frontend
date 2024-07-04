import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const ExpenseHeadSelect = (props) => {
  const [cart, setcart] = useState([]);
  const [cartzz, setcartzz] = useState();

  const expense = useSelector((state) => state?.expense);

  const { fetchexpensehead} =
  expense;

    useEffect(() => {


        props.setsectionprop(cartzz)
    }, [cartzz]);


  useEffect(() => {
    if (fetchexpensehead?.success == 1) {
      let arrr = [];
      let i = 0;
      while (i < expense?.fetchexpensehead?.data.length) {
        arrr.push(expense?.fetchexpensehead?.data[i]?.expensehead);
        i++;
      }

      setcart(arrr);
      setcartzz(arrr[0]);
    }
  }, [fetchexpensehead]);

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
