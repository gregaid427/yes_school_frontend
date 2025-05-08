import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const StaffSelect = (props) => {
  const dispatch = useDispatch();
  const [classs, setClasss] = useState([]);
  const [clazz, setclazz] = useState('-');
  const [selecter, setselecter] = useState([]);

  const users = useSelector((state) => state?.user);

  const {  allstaff } = users;

  useEffect(() => {
    if (allstaff?.success == 1) {
      let i = 0;
      // let arr = [];
      let arr = ['-'];
      let select = [];


      while (i < allstaff?.data.length) {
        arr.push(allstaff?.data[i].sLastName +' '+ allstaff?.data[i].sLastName +' '+ ':' +' '+ allstaff?.data[i].userId);
        select.push(allstaff?.data[i]);

        i++;
      }
      setselecter(select)

      setClasss(arr);
      setclazz(arr[0]);
    }
  }, [allstaff]);

  useEffect(() => {

let uid =  clazz.split(':')
uid = uid[1] == undefined ? 0 : uid[1].trim()
console.log(uid)
    props.setsectionprop(clazz);
    console.log(clazz)
    props.selectinfo(selecter.filter((item) =>
      item.userId === uid ))
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

export default StaffSelect;
