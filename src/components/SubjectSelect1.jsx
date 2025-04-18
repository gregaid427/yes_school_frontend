import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const SubjectSelect1 = (props) => {
  const [sections, setsections] = useState([]);
  const [sectionzz, setsectionzz] = useState();
  const [selecter, setselecter] = useState([]);

  const sub = useSelector((state) => state?.subject);
  const { fetchAllSubject } = sub;
    useEffect(() => {
        props.setsectionprop(sectionzz)
    }, [sectionzz]);


  useEffect(() => {
    if (fetchAllSubject?.success == 1) {
      let arrr = ['NONE'];
      let i = 0;
      let select = [];

      while (i < sub?.fetchAllSubject?.data.length) {
        arrr.push(sub?.fetchAllSubject?.data[i]?.subjectname);
        select.push(sub?.fetchAllSubject?.data[i]);

        i++;
      }
      setselecter(select)

      setsections(arrr);
      setsectionzz(arrr[0]);
    }
  }, [fetchAllSubject]);

  
  useEffect(() => {
    props.setsectionprop(sectionzz);
    props.selectinfo(selecter.filter((item) =>
      item.subjectname === sectionzz))
  }, [sectionzz]);

  return (
    <>
      <SelectGroupTwo
        values={sections}
        setSelectedOption={setsectionzz}
        selectedOption={sectionzz}
      />
    </>
  );
};

export default SubjectSelect1;
