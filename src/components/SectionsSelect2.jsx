import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const SectionSelect2 = (props) => {
  const [sections, setsections] = useState([]);
  const [sectionzz, setsectionzz] = useState();

  const clad = useSelector((state) => state?.classes);

  const {  sectionloading, fetchSection ,customSection} =
    clad;

    useEffect(() => {
        props.setsectionprop(sectionzz)
    }, [sectionzz]);


  useEffect(() => {
    

      setsections(customSection);
      setsectionzz(customSection[0]);
      console.log(customSection)
    // }
  }, [customSection]);
  const [selecter, setselecter] = useState([]);
console.log(fetchSection)
console.log(selecter)
console.log(sectionzz)



  useEffect(() => {

    setselecter(fetchSection?.data);
   }, [fetchSection?.data]);

  useEffect(() => {
   // props.setsectionprop(clazz);
   console.log(selecter)
   console.log(sectionzz)
   selecter?.filter((item) =>
    console.log(item.sectionName) )
    props.selectinfo(selecter?.filter((item) =>
      item.sectionName === sectionzz))
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

export default SectionSelect2;
