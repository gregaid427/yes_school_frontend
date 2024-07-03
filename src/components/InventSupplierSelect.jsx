import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const InventSupplierSelect = (props) => {
  const [cart, setcart] = useState([]);
  const [cartzz, setcartzz] = useState();

  const inventory = useSelector((state) => state?.inventory);

  const { cartegory ,CreateInventorycart,fetchAllInventory} =
  inventory;

    useEffect(() => {
        props.setsectionprop(cartzz)
    }, [cartzz]);


  useEffect(() => {
    console.log(cartegory)
    if (cartegory?.success == 1) {
      let arrr = [props.default];
      let i = 0;
      while (i < inventory?.fetchAllInventory?.data.length) {
        arrr.push(inventory?.fetchAllInventory?.data[i]?.supplier);
        i++;
      }

      setcart(arrr);
      setcartzz(arrr[0]);
    }
  }, [fetchAllInventory]);

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

export default InventSupplierSelect;
