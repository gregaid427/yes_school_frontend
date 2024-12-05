import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const StudentCartegorySelect = (props) => {
  const [sections, setsections] = useState([]);
  const [sectionzz, setsectionzz] = useState();

  const student = useSelector((state) => state?.student);

  const {  fetchstdCartegory} =
    student;

    useEffect(() => {
        props.setsectionprop(sectionzz)
    }, [sectionzz]);


  // useEffect(() => {
  //   console.log(fetchstdCartegory?.data?.title)

  //     setsections(fetchstdCartegory?.data?.title);
  //    // setsectionzz(fetchstdCartegory?.data == [] ? '' : fetchstdCartegory?.data[0]?.title);
  //     console.log(fetchstdCartegory?.data)
  //   // }
  // }, [fetchstdCartegory]);


  useEffect(() => {
    if (fetchstdCartegory?.success == 1) {
      let i = 0;
      let arr = ['GENERAL'];
      while (i < fetchstdCartegory?.data.length) {
        arr.push(fetchstdCartegory?.data[i].title);
        i++;
      }

      setsections(arr);
      setsectionzz(arr[0]);
    }
  }, [fetchstdCartegory]);


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

export default StudentCartegorySelect;