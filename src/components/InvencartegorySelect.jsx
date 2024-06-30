import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const InvencartegorySelect = (props) => {
  const [cart, setcart] = useState([]);
  const [cartzz, setcartzz] = useState();

  const inventory = useSelector((state) => state?.inventory);

  const { cartegory ,CreateInventorycart} =
  inventory;

    useEffect(() => {
        props.setsectionprop(cartzz)
    }, [cartzz]);


  useEffect(() => {
    console.log(cartegory)
    if (cartegory?.success == 1) {
      let arrr = ['None'];
      let i = 0;
      while (i < inventory?.cartegory?.data.length) {
        arrr.push(inventory?.cartegory?.data[i]?.cartegoryname);
        i++;
      }

      setcart(arrr);
      setcartzz(arrr[0]);
    }
  }, [cartegory]);

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

export default InvencartegorySelect;
