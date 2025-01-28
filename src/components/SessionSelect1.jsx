import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllClassAction,
} from '../redux/slices/classSlice';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';



const SessionSelect1 = (props) => {

  
  const dispatch = useDispatch();
  const [classs, setClasss] = useState([]);
  const [clazz, setclazz] = useState();

  const session = useSelector((state) => state?.session);

 
  const { fetchsession,fetchsessionactive} =
    session;

  useEffect(() => {

    if (fetchsession?.success == 1) {
      let i = 0;
      let arr = ['None'];
      while (i < session?.fetchsession?.data.length) {
        arr.push(session?.fetchsession?.data[i]?.sessionname);
        i++;
      }

      

      setClasss(arr);
      setclazz('None');


    }

  }, [fetchsession ]);

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

export default SessionSelect1;
