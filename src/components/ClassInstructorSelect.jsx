import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const classInstructorSelect = (props) => {
  const [sections, setsections] = useState([]);
  const [sectionzz, setsectionzz] = useState();

  const clad = useSelector((state) => state?.classes);

  const {  sectionloading, fetchSection } =
    clad;

    useEffect(() => {
        props.setsectionprop(sectionzz)
    }, [sectionzz]);


  useEffect(() => {
    if (fetchSection?.success == 1) {
      let arrr = ['All Sections'];
      let i = 0;
      while (i < clad?.fetchSection?.data.length) {
        arrr.push(clad?.fetchSection?.data[i]?.sectionName);
        i++;
      }

      setsections(arrr);
      setsectionzz(arrr[0]);
    }
  }, [sectionloading]);

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

export default classInstructorSelect;
