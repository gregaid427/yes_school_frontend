import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllClassAction } from '../redux/slices/classSlice';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const SessionSelect = (props) => {
  const dispatch = useDispatch();
  const [classs, setClasss] = useState([]);
  const [clazz, setclazz] = useState(props.clazz);

  const session = useSelector((state) => state?.session);
  const [selecter, setselecter] = useState([]);

  const { fetchsession, fetchsessionactive } = session;

  useEffect(() => {
    if (fetchsession?.success == 1) {
      let i = 0;
      let arr = [];
      let select = [];

      while (i < session?.fetchsession?.data.length) {
        arr.push(session?.fetchsession?.data[i].sessionname);
        select.push(session?.fetchsession?.data[i]);

        i++;
      }
      setselecter(select)
      setClasss(arr);
    }
  }, [fetchsession]);

  useEffect(() => {
    if (fetchsessionactive?.success == 1) {
      setclazz(fetchsessionactive?.data[0]?.sessionname);
    }
  }, [fetchsessionactive]);

  useEffect(() => {
    props.setsectionprop(clazz);
    props.selectinfo(selecter.filter((item) =>
      item.sessionname === clazz))
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

export default SessionSelect;
