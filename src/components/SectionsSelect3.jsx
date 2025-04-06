import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const SectionSelect3 = (props) => {
  const [sections, setsections] = useState([]);
  const [sectionzz, setsectionzz] = useState();

  const clad = useSelector((state) => state?.classes);

  const {  sectionloading, fetchSection ,customSection1} =
    clad;

    useEffect(() => {
        props.setsectionprop(sectionzz)
        props.selectinfo(customSection1[0])
    }, [sectionzz]);

    useEffect(() => {
  

      
      setsections(customSection1);
      setsectionzz(customSection1[0]);
      console.log(customSection1)
    // }
  }, [customSection1]);
 
 
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

export default SectionSelect3;
